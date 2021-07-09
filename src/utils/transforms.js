const htmlmin = require('./transforms/htmlmin')

module.exports = (config) => {
  htmlmin(config)
}
