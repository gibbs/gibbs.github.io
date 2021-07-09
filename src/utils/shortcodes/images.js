const Image = require('@11ty/eleventy-img')
const path = require('path')
const site = require('../../_data/site')

/**
 * Raw Image Shortcode
 *
 * Return processed image URLs
 *
 * @param {string} src
 * @param {boolean} filepath
 * @returns {string}
 */
async function rawImageShortcode (src) {
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
      return metadata.jpeg[0].url
    case '.png':
      return metadata.png[0].url
    case '.svg':
      return metadata.svg[0].url
    default:
      return metadata.jpeg[0].url
  }
}

module.exports = (config) => {
  config.addAsyncShortcode('rawImage', rawImageShortcode)
}
