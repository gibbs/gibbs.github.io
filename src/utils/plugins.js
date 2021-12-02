const rss = require('@11ty/eleventy-plugin-rss')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

module.exports = (config) => {
  config.addPlugin(rss, {
    posthtmlRenderOptions: {
      closingSingleTag: '>',
      replaceQuote: true,
      quoteAllAttributes: true
    }
  })

  config.addPlugin(syntaxHighlight, {
    templateFormats: ['*'],
    alwaysWrapLineHighlights: false,
    trim: false,
    lineSeparator: '<br>',
    preAttributes: {
      tabindex: 0
    }
  })
}
