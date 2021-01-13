const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const path = require('path');
const friendlyPlugin = require('friendly-errors-webpack-plugin');

const config = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: {
      index: '',
    },
    host: '0.0.0.0',
    port: 9090,
    contentBase: path.resolve('./web'),
  },
  stats: 'errors-warnings',
  plugins: [new friendlyPlugin()],
};

module.exports = merge(baseConfig, config);
