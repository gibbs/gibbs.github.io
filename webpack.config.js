const path = require('path')
const site = require('./src/_data/site.js')
const webpack = require('webpack')

// Plugins
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

// The output filename
const filename = '[name]' + (site.environment === 'production' ? '.[contenthash]' : '')

module.exports = {
  entry: {
    main: {
      import: [
        path.resolve(__dirname, 'src/js', 'index.js'),
        path.resolve(__dirname, 'src/css', 'main.css')
      ]
    },
    homepage: {
      filename: filename + '.js',
      import: path.resolve(__dirname, 'src/js', 'homepage.js')
    },
    homepage_worker: {
      filename: filename + '.js',
      import: path.resolve(__dirname, 'src/js/homepage', 'worker.js')
    },
    tools: {
      filename: filename + '.js',
      import: path.resolve(__dirname, 'src/js', 'tools.js')
    }
  },
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
    },
    library: {
      name: 'tools',
      type: 'assign-properties'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          },
          'postcss-loader'
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
        test: /\.(jpg|jpeg|gif|png)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
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
    }),
    new webpack.DefinePlugin({
      APP_SERVICE_URL: JSON.stringify(process.env.APP_SERVICE_URL)
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      swDest: '../service-worker.js'
    })
  ]
}
