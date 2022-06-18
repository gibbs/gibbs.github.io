const templateElements = require('./template.js')

module.exports = {
  url: process.env.APP_URL,
  elements: [
    templateElements.elements
  ]
}
