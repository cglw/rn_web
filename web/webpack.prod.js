const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  mode: 'production',
  devtool: 'none',
  optimization: {
    splitChunks: {
      //分包配置
      chunks: 'all',
    },
  },
  plugins: [new CleanWebpackPlugin()],
};

module.exports = merge(baseConfig, config);
