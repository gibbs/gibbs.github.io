const images = require('./shortcodes/images')
const sri = require('./shortcodes/sri')

module.exports = (config) => {
  images(config)
  sri(config)
}
