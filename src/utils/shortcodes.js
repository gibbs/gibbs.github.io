const { promisify } = require('util')
const crypto = require('crypto')
const fs = require('fs')
const imageSize = promisify(require('image-size'))
const { JSDOM } = require('jsdom')
const path = require('path')
const site = require('../_data/site')
const sharp = require('sharp')

/**
 * Hash
 *
 * @param {string} content
 * @param {*string} algo
 * @returns
 */
function hash (content, algo = 'md5') {
  const hashSum = crypto.createHash(algo)

  hashSum.update(content)

  return hashSum.digest('hex')
}

/**
 * Scale Image
 *
 * @param {string} src
 * @param {*string} format
 * @param {*integer} width
 * @param {*integer} height
 */
async function scaleImage (src, format = 'jpeg', width = null, height = null) {
  const srcFileExtension = path.extname(src)
  const srcBasename = path.basename(src, srcFileExtension)
  let postfix = width

  // Check source file exists
  if (!fs.existsSync(src)) {
    throw Error(`File does not exist ${src}`)
  }

  // Get the source file hash
  const srcSum = hash(fs.readFileSync(src))

  // Add the height to the filename
  if (height !== null) {
    postfix += height
  }

  // Generate a hash of source + dimensions
  const destSum = hash(srcSum + postfix)
  const destFilename = `${srcBasename}-${destSum}.${format}`
  const destFilepath = path.join(site.path.public, '/assets/images/scaled/' + destFilename)

  // Return existing file
  if (fs.existsSync(destFilepath)) {
    return '/assets/images/scaled/' + destFilename
  }

  // Image scale and write
  if (width || height) {
    await sharp(src)
      .rotate()
      .resize(width, height)[format]({
        quality: 60,
        reductionEffort: 6
      })
      .toFile(destFilepath)
  } else {
    await sharp(src).rotate().toFile(destFilepath)
  }

  // Return filename
  return '/assets/images/scaled/' + destFilename
}

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
  const srcFilePath = path.join(site.path.src, src)

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
  img.setAttribute('class', 'fallback--img')
  img.setAttribute('decoding', 'async')

  // Traverse each image format
  await Object.keys(mime).forEach(async (format) => {
    const srcset = []

    // Create the source element
    const sourceElement = doc.createElement('source')
    sourceElement.setAttribute('type', mime[format])
    sourceElement.setAttribute('sizes', `(max-width: ${sizes.max}px) 100vw, ${sizes.max}px`)

    await sizes.widths.forEach(async (width) => {
      const scaledImagePath = await scaleImage(srcFilePath, format, width)
      srcset.push(`${scaledImagePath} ${width}w`)

      // Set the fallback src attribute
      if (format === 'jpeg' && !img.hasAttribute('src')) {
        img.setAttribute('src', scaledImagePath)
      }
    })

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
  config.addShortcode('css', cssShortcode)
  config.addShortcode('manifest', manifestAssetPath)
  config.addAsyncShortcode('image', imageShortcode)
  config.addAsyncShortcode('sri', sriShortcode)
  config.addAsyncShortcode('responsiveImage', responsiveImageShortcode)
}
