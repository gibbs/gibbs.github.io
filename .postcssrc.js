const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const postcssImport = require('postcss-import')
const postcssPresetEnv = require('postcss-preset-env')
const postcssScss = require('postcss-scss')

module.exports = {
  syntax: 'postcss-scss',
  parser: 'postcss-scss',
  plugins: [
    autoprefixer(),
    postcssScss(),
    postcssImport(),
    postcssPresetEnv(),
    cssnano(),
  ]
}
