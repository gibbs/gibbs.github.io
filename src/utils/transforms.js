const htmlmin = require('html-minifier')
const site = require('../_data/site')

module.exports = (config) => {
  config.addTransform('htmlmin', (content, output) => {
    // Remove empty anchors
    content = content.replace(/<a[^>]*><\/a>/g, '')

    // Prefix goto anchors
    content = content.replace(/a href="#(((?!goto-).)*)"/g, (m, g) => {
      return `a href="#goto-${g}"`
    })

    if (site.environment === 'production' && output && output.endsWith('.html')) {
      return htmlmin.minify(content, {
        caseSensitive: false,
        removeComments: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: false,
        minifyJS: false,
        minifyURLs: false,
        useShortDoctype: false
      })
    }

    return content
  })
}
