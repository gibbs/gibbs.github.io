const Image = require('@11ty/eleventy-img')
const htmlmin = require('html-minifier')
const yaml = require('js-yaml')

// Plugins
const pluginRss = require('@11ty/eleventy-plugin-rss')

// Environment variables
const environment = process.env.APP_ENV || 'production'
const url = process.env.APP_URL || 'https://dangibbs.uk'

/**
 * Raw Image Shortcode
 *
 * Return processed image URLs
 *
 * @param {string} src
 * @param {string} alt
 * @returns {string}
 */
function rawImageShortcode (src, alt) {
  const options = {
    formats: ['webp', 'jpeg'],
    outputDir: './public/assets/images/',
    urlPath: url + '/assets/images/',
    useCache: true,
    sharpJpegOptions: {
      quality: 99,
      progressive: true
    }
  }

  // Image plugin
  Image(src, options)

  // Image meta data
  const metadata = Image.statsSync(src, options)

  // Generate the image
  // Image.generateObject(metadata, { alt })

  // Return the URL
  return metadata.jpeg[0].url
}

module.exports = (eleventyConfig) => {
  // YAML extendssion
  eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents))

  // Copy the favicon
  eleventyConfig.addPassthroughCopy('src/favicon.ico')

  // Raw images
  eleventyConfig.addNunjucksShortcode('rawImage', rawImageShortcode)

  // Atom feed plugin
  eleventyConfig.addPlugin(pluginRss, {
    posthtmlRenderOptions: {
      closingSingleTag: '>',
      replaceQuote: true,
      quoteAllAttributes: true
    }
  })

  // Minify HTML in production
  eleventyConfig.addTransform('htmlmin', (content, output) => {
    if (environment === 'production' && output && output.endsWith('.html')) {
      return htmlmin.minify(content, {
        caseSensitive: false,
        removeComments: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: false,
        minifyJS: false,
        minifyURLs: false,
        useShortDoctype: true
      })
    }

    return content
  })

  return {
    dataTemplateEngine: 'njk',
    dir: {
      data: '_data',
      input: 'src',
      includes: '_includes',
      layouts: '_layouts',
      output: 'public'
    },
    htmlOutputSuffix: '-o',
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    pathPrefix: '/',
    templateFormats: ['md', 'njk', 'html']
  }
}
