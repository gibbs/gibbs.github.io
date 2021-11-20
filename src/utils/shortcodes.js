const { promisify } = require('util')
const crypto = require('crypto')
const fs = require('fs')
const imageSize = promisify(require('image-size'))
const { JSDOM } = require('jsdom')
const path = require('path')
const site = require('../_data/site')
const sharp = require('sharp')

/**
 * Return a path from the public asset manifest
 *
 * @param {string} key
 * @returns
 */
function manifestAssetPath (key) {
  const manifestPath = path.resolve(site.path.public, 'assets', 'manifest.json')
  const manifest = JSON.parse(fs.readFileSync(manifestPath, {
    encoding: 'utf8'
  }))

  if (manifest[key] === undefined) {
    throw Error(`Failed to find asset in manifest with key ${key}`)
  }

  return manifest[key]
}

/**
 * CSS Shortcode
 *
 * @returns {string}
 */
function cssShortcode () {
  const filePath = path.join(site.path.public, manifestAssetPath('main.css'))

  return fs.readFileSync(filePath, { encoding: 'utf8' })
}

/**
 * SRI Shortcode
 *
 * @param {string} filename
 * @param {bool} manifest
 * @param {string} algo
 * @returns {string}
 */
async function sriShortcode (filename, manifest = false, algo = 'sha512') {
  const hash = crypto.createHash(algo)
  const filepath = (manifest === true) ? manifestAssetPath(filename) : filename
  const file = path.join(site.path.public, filepath)

  if (!fs.existsSync(file)) {
    return
  }

  // Set the hash
  hash.update(fs.readFileSync(file))

  // Return <algo>-<hash>
  return `${algo}-${hash.digest('base64')}`
}

/**
 * Image Shortcode
 *
 * @param {string} src
 * @param {string|null} algo
 * @param {string|null} type
 * @returns
 */
async function imageShortcode (src, algo = null, type = null) {
  const filePath = path.join(site.path.src, src)
  const outputPath = path.join(site.path.public, '/assets/images/')
  const fileName = path.basename(src)
  const outputFilepath = path.join(outputPath, fileName)

  const image = sharp(filePath)

  // Write the image
  if (!fs.existsSync(outputFilepath)) {
    await image.toFile(outputFilepath)
  }

  // Return image path
  if (algo === null) {
    return `/assets/images/${fileName}`
  }

  // Return SRI hash
  const hash = crypto.createHash(algo)
  const file = fs.readFileSync(outputFilepath)
  hash.update(file)

  return `${algo}-${hash.digest('base64')}`
}

/**
 * Responsive Image Shortcode
 *
 * @param {string} src
 * @param {string} alt
 * @param {object} options
 */
async function responsiveImageShortcode (src, alt = '', options = {}) {
  // Various paths
  const srcFilePath = path.join(site.path.src, src)
  const srcFileExtension = path.extname(src)
  const srcBasename = path.basename(src, srcFileExtension)
  const publicPath = path.join(site.path.public, '/assets/images/')

  // MIME types for each conversion
  const mime = {
    avif: 'image/avif',
    webp: 'image/webp',
    jpeg: 'image/jpeg'
  }

  // Default sizing for full width images
  const sizes = {
    max: 1320,
    widths: [1320, 1140, 960, 720, 540],
    width: 1320,
    height: null,
    quality: {
      avif: 50,
      default: 60
    },
    ...options
  }

  // Check source file exists
  if (!fs.existsSync(srcFilePath)) {
    throw Error(`File does not exist ${srcFilePath}`)
  }

  // Get the source image dimensions
  const srcDimensions = await imageSize(srcFilePath)

  // Setup new DOM
  const dom = new JSDOM()
  const doc = dom.window.document

  // Create the initial picture element
  const picture = doc.createElement('picture')

  // Fallback image
  const img = doc.createElement('img')
  img.setAttribute('width', srcDimensions.width)
  img.setAttribute('height', srcDimensions.height)
  img.setAttribute('alt', alt)
  img.setAttribute('style', 'background-size: cover; background-image: none;')
  img.setAttribute('src', `/assets/images/${srcBasename}-${sizes.widths[0]}.jpeg`)
  img.setAttribute('decoding', 'async')
  // img.setAttribute('loading', 'lazy')

  // Traverse each image format
  Object.keys(mime).forEach((format) => {
    const srcset = []

    // Create the source element
    const sourceElement = doc.createElement('source')
    sourceElement.setAttribute('type', mime[format])
    sourceElement.setAttribute('sizes', `(max-width: ${sizes.max}px) 100vw, ${sizes.max}px`)

    sizes.widths.forEach(async (width) => {
      const imageFileName = srcBasename + `-${width}.${format}`
      const publicFilePath = path.join(publicPath, imageFileName)

      // Add the current file to the srcset
      srcset.push(`/assets/images/${imageFileName} ${width}w`)

      // @fixme Check the source md5sum for changes?
      if (!fs.existsSync(publicFilePath)) {
        await sharp(srcFilePath)
          .rotate()
          .resize(width)[format]({
            quality: sizes.quality[format] || sizes.quality.default,
            reductionEffort: 6
          })
          .toFile(publicFilePath)
      }
    })

    // Add the srcset
    sourceElement.setAttribute('srcset', srcset.join(', '))

    // Append the source element
    picture.appendChild(sourceElement)
  })

  // Append the fallback
  picture.appendChild(img)

  return picture.outerHTML
}

module.exports = (config) => {
  config.addShortcode('css', cssShortcode)
  config.addAsyncShortcode('image', imageShortcode)
  config.addShortcode('manifest', manifestAssetPath)
  config.addAsyncShortcode('sri', sriShortcode)
  config.addAsyncShortcode('responsiveImage', responsiveImageShortcode)
}
