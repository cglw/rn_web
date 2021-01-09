const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./web/index.html'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
      },
      title: 'React Native H5',
      favicon: path.resolve(
        './android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png',
      ),
    }),
    new CleanWebpackPlugin(),
  ],
};

module.exports = merge(baseConfig, config);
