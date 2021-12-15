const path = require('path')
const site = require('./src/_data/site.js')

// Plugins
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// The output filename
const filename = '[name]' + (site.environment === 'production' ? '.[contenthash]' : '')

module.exports = {
  entry: [
    path.resolve(__dirname, 'src', 'assets', 'js', 'index.js'),
    path.resolve(__dirname, 'src', 'assets', 'css', 'main.scss')
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules/')
    }
  },
  output: {
    path: path.resolve(__dirname, 'docs', 'assets'),
    filename: filename + '.js',
    publicPath: '/assets/',
    clean: {
      keep: /images|videos/
    }
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          'sass-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.woff(2)?(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }]
      },
      {
        test: /\.(ttf|eot|svg)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: filename + '.css'
    }),
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
      publicPath: '/assets/'
    })
  ]
}
