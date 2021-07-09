const rss = require('@11ty/eleventy-plugin-rss')

module.exports = (config) => {
  config.addPlugin(rss, {
    posthtmlRenderOptions: {
      closingSingleTag: '>',
      replaceQuote: true,
      quoteAllAttributes: true
    }
  })
}
