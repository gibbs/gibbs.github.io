const fs = require('fs')
const crypto = require('crypto')
const path = require('path')
const site = require('../../_data/site')
const Image = require('@11ty/eleventy-img')

/**
 * SRI Shortcode
 *
 * @param {string} filepath 
 * @param {string} algo 
 * @returns {string}
 */
async function sriShortcode (filepath, algo = 'sha384') {
  const hash = crypto.createHash(algo)
  const file = fs.readFileSync(path.join(site.path.public, filepath))

  // Set the hash
  hash.update(file)

  // Return <algo>-<hash>
  return `${algo}-${hash.digest('hex')}`
}

/**
 * SRI Image Shortcode
 *
 * @param {string} filepath 
 * @param {string} algo 
 * @returns {string}
 */
 async function sriImageShortcode (filepath, algo = 'sha384') {
  const hash = crypto.createHash(algo)
  let publicPath

  await rawImage(filepath, true).then((filePath) => {
    publicPath = filePath
  })

  const file = fs.readFileSync(publicPath)

  // Set the hash
  hash.update(file)

  // Return <algo>-<hash>
  return `${algo}-${hash.digest('hex')}`
}

/**
 * Raw Image Shortcode
 *
 * Return processed image URLs
 *
 * @param {string} src
 * @param {boolean} filepath
 * @returns {string}
 */
 async function rawImage (src) {
  const options = {
    formats: ['avif', 'webp', 'jpeg', 'svg', 'png'],
    outputDir: path.join(site.path.public, '/assets/images/'),
    urlPath: '/assets/images/',
    useCache: false,
    sharpJpegOptions: {
      quality: 99,
      progressive: true
    },
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src)
      const name = path.basename(src, extension)

      return `${name}-${id}.${format}`
    }
  }

  // Image plugin
  const metadata = await Image(src, options)

  switch (path.extname(src)) {
    case '.jpg':
      return metadata.jpeg[0].outputPath
    case '.png':
      return metadata.png[0].outputPath
    case '.svg':
      return metadata.svg[0].outputPath
    default:
      return metadata.jpeg[0].outputPath
  }
}

module.exports = (config) => {
  config.addAsyncShortcode('sri', sriShortcode)
  config.addAsyncShortcode('sriImage', sriImageShortcode)
}
