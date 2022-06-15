const htmlmin = require('html-minifier')
const site = require('../_data/site')

module.exports = (config) => {
  config.addTransform('htmlmin', (content, output) => {
    // Remove empty anchors
    content = content.replace(/<a[^>]*><\/a>/g, '')

    // HTML replacements - @todo improve
    const replacements = [
      // Puppet references
      {
        search: /<h1 id="goto-reference" tabindex="-1">Reference<\/h1>/,
        content: '<h2 id="goto-reference" tabindex="-1">Reference</h2>'
      },
      {
        search: /<h2 id="goto-table-of-contents" tabindex="-1">Table of Contents<\/h2>/,
        content: '<h3 id="goto-table-of-contents" tabindex="-1">Table of Contents</h3>'
      },
      {
        search: /<h3 id="goto-defined-types" tabindex="-1">Defined types<\/h3>/,
        content: '<h4 id="goto-defined-types" tabindex="-1">Defined types</h4>'
      },
      {
        search: /<h3 id="goto-defined-types" tabindex="-1">Data types<\/h3>/,
        content: '<h4 id="goto-defined-types" tabindex="-1">Data types</h4>'
      },
      {
        search: /<h3 id="goto-data-types" tabindex="-1">Data types<\/h3>/,
        content: '<h4 id="goto-data-types" tabindex="-1">Data types</h4>'
      },
      {
        search: /<h3 id="goto-classes-1" tabindex="-1">Classes<\/h3>/,
        content: '<h4 id="goto-classes-1" tabindex="-1">Classes</h4>'
      },
      {
        search: /<h2 id="goto-defined-types-1" tabindex="-1">Defined types<\/h2>/,
        content: '<h3 id="goto-defined-types-1" tabindex="-1">Defined types</h3>'
      },
      {
        search: /<h2 id="goto-data-types-1" tabindex="-1">Data types<\/h2>/,
        content: '<h3 id="goto-data-types-1" tabindex="-1">Data types</h3>'
      },
      // Changelog
      {
        search: /<h1 id="goto-changelog" tabindex="-1">Changelog<\/h1>/,
        content: '<h2 id="goto-changelog" tabindex="-1">Changelog</h2>'
      },
      {
        search: /<h1 id="goto-change-log" tabindex="-1">Change log<\/h1>/,
        content: '<h2 id="goto-change-log" tabindex="-1">Change log</h2>'
      },
      {
        search: /<p>All notable changes to this project will be documented in this file\. The format is based on <a href="http:\/\/keepachangelog\.com\/en\/1\.0\.0\/">Keep a Changelog<\/a> and this project adheres to <a href="http:\/\/semver\.org">Semantic Versioning<\/a>\.<\/p>/,
        content: ''
      },
      {
        search: /<p>\* <em>This Changelog was automatically generated by <a href="https:\/\/github\.com\/github-changelog-generator\/github-changelog-generator">github_changelog_generator<\/a><\/em><\/p>/,
        content: ''
      }
    ]

    replacements.forEach((replacement) => {
      content = content.replace(replacement.search, replacement.content)
    })

    // Prefix goto anchors
    content = content.replace(/a href="#(((?!goto-).)*?)"/g, (m, g) => {
      return g ? `a href="#goto-${g}"` : m
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
