const fs = require('fs')
const path = require('path')
const yaml = require('yamljs')

// Plugins
const setFilters = require('./src/utils/filters')
const setPlugins = require('./src/utils/plugins')
const setLibrary = require('./src/utils/library')
const setShortcodes = require('./src/utils/shortcodes')
const setTransforms = require('./src/utils/transforms')

module.exports = (eleventyConfig) => {
  // YAML extension
  eleventyConfig.addDataExtension('yaml', contents => yaml.parse(contents))

  // Wait
  eleventyConfig.setWatchThrottleWaitTime(1500)

  // Watch for CSS/JS changes
  eleventyConfig.setUseGitIgnore(false)
  eleventyConfig.addWatchTarget(path.join(__dirname, 'src/**/*.{css,js}'))
  eleventyConfig.addWatchTarget(path.join(__dirname, 'docs/assets/*.{css,js}'))

  // Copy the favicon
  eleventyConfig.addPassthroughCopy({ 'src/assets/icons/favicon.ico': 'favicon.ico' })

  // Setup
  setPlugins(eleventyConfig)
  setFilters(eleventyConfig)
  setLibrary(eleventyConfig)
  setShortcodes(eleventyConfig)
  setTransforms(eleventyConfig)

  // Browsersync
  eleventyConfig.setBrowserSyncConfig({
    ghostMode: false,
    ui: false,
    callbacks: {
      ready: function (error, browserSync) {
        const content = fs.readFileSync('docs/404.html')

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
      input: 'content',
      output: 'docs',
      // Relative to input dir
      data: '../src/_data',
      includes: '../src/_includes',
      layouts: '../src/_layouts'
    },
    htmlOutputSuffix: '-o',
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    pathPrefix: '/',
    templateFormats: ['md', 'njk', 'html']
  }
}
