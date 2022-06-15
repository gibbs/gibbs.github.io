const { promisify } = require('util')
const crypto = require('crypto')
const fs = require('fs')
const imageSize = promisify(require('image-size'))
const { JSDOM } = require('jsdom')
const path = require('path')
const site = require('../_data/site')
const sharp = require('sharp')
const tools = require('./tools')

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
 * Asset Content
 *
 * @param {string} filename
 * @returns mixed
 */
function assetContent (filename) {
  const filePath = path.join(site.path.public, manifestAssetPath(filename))

  return fs.readFileSync(filePath, { encoding: 'utf8' })
}

/**
 * CSS Shortcode
 *
 * @returns {string}
 */
function cssShortcode () {
  return assetContent('main.css')
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
  const srcFilePath = path.join(site.path.src, src)

  // MIME types for each conversion
  const mime = {
    avif: 'image/avif',
    webp: 'image/webp',
    jpeg: 'image/jpeg'
  }

  // Default sizing for full width images
  const sizes = {
    maxWidth: 1320,
    widths: [1320, 1140, 960, 720, 540],
    quality: 60,
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
  img.setAttribute('class', 'img-fallback')
  img.setAttribute('decoding', 'async')

  // Traverse each image format
  await Object.keys(mime).forEach(async (format) => {
    const srcset = []
    const srcsetSizes = []

    // Create the source element
    const sourceElement = doc.createElement('source')
    sourceElement.setAttribute('type', mime[format])

    await sizes.widths.forEach(async (width) => {
      let imageWidth = width

      // Specify sizes
      if (Array.isArray(width) && width.length === 2) {
        imageWidth = width[0]
        srcsetSizes.push(`(max-width: ${width[1]}px) ${width[0]}px`)
      }

      // Scale image
      const scaledImagePath = await tools.scaleImage(srcFilePath, format, imageWidth, null, sizes.quality)

      // Push current image and width srcset
      srcset.push(`${scaledImagePath} ${imageWidth}w`)

      // Set the fallback src attribute
      if (format === 'jpeg' && !img.hasAttribute('src')) {
        img.setAttribute('src', scaledImagePath)
      }
    })

    // Add the image size
    srcsetSizes.push(`${sizes.maxWidth}px`)

    // Add the sizes
    sourceElement.setAttribute('sizes', srcsetSizes.join(', '))

    // Add the srcset
    sourceElement.setAttribute('srcset', srcset.join(', '))

    // Append the source element
    picture.appendChild(sourceElement)
  })

  // Append the fallback
  picture.appendChild(img)

  // Return markup
  return picture.outerHTML
}

module.exports = (config) => {
  config.addShortcode('asset', assetContent)
  config.addShortcode('css', cssShortcode)
  config.addShortcode('manifest', manifestAssetPath)
  config.addAsyncShortcode('image', imageShortcode)
  config.addAsyncShortcode('sri', sriShortcode)
  config.addAsyncShortcode('responsiveImage', responsiveImageShortcode)
}
