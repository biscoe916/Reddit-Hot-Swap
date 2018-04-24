var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
  entry: {
    content: './src/content.js',
    background: './src/background.js'
  },
  output: {
    filename: 'js/[name].reddithotswap.js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/manifests/chrome.json', to: 'manifest.json' },
      { from: './src/assets/reddithotswap_16.png', to: 'icons/' },
      { from: './src/assets/reddithotswap_48.png', to: 'icons/' },
      { from: './src/assets/reddithotswap_128.png', to: 'icons/' }
    ])
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      { test: /\.html$/, loader: "raw-loader" }
    ],
  },
  stats: {
    colors: true
  }
};