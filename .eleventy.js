const fs = require('fs')
const yaml = require('yamljs')

// Plugins
const setFilters = require('./src/utils/filters')
const setPlugins = require('./src/utils/plugins')
const setShortcodes = require('./src/utils/shortcodes')
const setTransforms = require('./src/utils/transforms')

module.exports = (eleventyConfig) => {
  // YAML extension
  eleventyConfig.addDataExtension('yaml', contents => yaml.parse(contents))

  // Copy the favicon
  eleventyConfig.addPassthroughCopy('src/favicon.ico')

  // Setup
  setPlugins(eleventyConfig)
  setFilters(eleventyConfig)
  setShortcodes(eleventyConfig)
  setTransforms(eleventyConfig)

  // Browsersync
  eleventyConfig.setBrowserSyncConfig({
    ghostMode: false,
    ui: false,
    callbacks: {
      ready: function (error, browserSync) {
        const content = fs.readFileSync('public/404.html')

        if (error) {
          throw Error(error)
        }

        // Add 404 middleware during testing
        browserSync.addMiddleware('*', (req, res) => {
          res.writeHead(404, { 'content-type': 'text/html; charset=UTF-8' })
          res.write(content)
          res.end()
        })
      }
    }
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
