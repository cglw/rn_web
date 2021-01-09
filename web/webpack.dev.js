const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: {
      index: '',
    },
    host: 'localhost',
    port: 9090,
    contentBase: path.resolve('./web'),
  },
  stats: 'minimal',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./web/index.html'),
      filename: 'index.html',
      inject: 'body',
      title: 'React Native H5',
      favicon: path.resolve(
        './android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png',
      ),
    }),
  ],
};

module.exports = merge(baseConfig, config);
