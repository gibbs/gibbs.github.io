const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const site = require('../_data/site')

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
 * @param {*integer} quality
 */
async function scaleImage (src, format = 'jpeg', width = null, height = null, quality = 60) {
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
        quality: quality,
        reductionEffort: 6
      })
      .toFile(destFilepath)
  } else {
    await sharp(src).rotate().toFile(destFilepath)
  }

  // Return filename
  return '/assets/images/scaled/' + destFilename
}

module.exports = {
  scaleImage
}
