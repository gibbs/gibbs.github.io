const site = require('./src/_data/site')

const plugins = [
  require('autoprefixer'),
  require('postcss-import'),
  require('postcss-preset-env'),
  require('postcss-nested'),
]

if (site.environment == 'production') {
  plugins.push(require('cssnano')({
    preset: ['default', {
      discardComments: {
        removeAll: (site.environment == 'production')
      }
    }]
  }))
}

module.exports = {
  syntax: 'postcss-scss',
  parser: 'postcss-scss',
  plugins: plugins
}
