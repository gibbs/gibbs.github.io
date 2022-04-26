const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItAttrs = require('markdown-it-attrs')
const markdownItCodetabs = require('markdown-it-codetabs')
const markdownItInclude = require('markdown-it-include')
const markdownItMark = require('markdown-it-mark')
const path = require('path')

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
    .use(markdownItInclude, {
      root: path.join(__dirname, '../../src/files/')
    })
    .use(markdownItCodetabs)
    .use(markdownItMark))
}
