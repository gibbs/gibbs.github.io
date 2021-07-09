const htmlmin = require('html-minifier')
const site = require('../../_data/site')

module.exports = (config) => {
  config.addTransform('htmlmin', (content, output) => {
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
