const site = require('./src/_data/site')

const plugins = [
  require('autoprefixer'),
  require('postcss-import'),
  require('postcss-preset-env')({
    stage: 4
  }),
  require('postcss-custom-media'),
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
  plugins: plugins
}
