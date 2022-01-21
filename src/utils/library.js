const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItAttrs = require('markdown-it-attrs')
const markdownItMark = require('markdown-it-mark')

module.exports = (config) => {
  // Set markdown library
  config.setLibrary('md', markdownIt({
    linkify: false,
    html: true
  })
    .use(markdownItAnchor, {
      slugify: s => `goto-${markdownItAnchor.defaults.slugify(s)}`
    })
    .use(markdownItAttrs, {
      leftDelimiter: '{',
      rightDelimiter: '}',
      allowedAttributes: ['id', 'class', 'width', 'height']
    })
    .use(markdownItMark))
}
