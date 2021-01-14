const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.web.ts',
  output: {
    path: path.resolve('./dist'),
    publicPath: '/',
    filename: 'js/[name].[hash:5].js',
  },
  module: {
    rules: [
      {
        test: /\.(png)|(gif)|(jp?g)|(svg)|(bmp)|(eot)|(woff)|(ttf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/[name].[hash:5].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(js|jsx|web.js|ts|tsx|d.ts)$/,
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(
            __dirname,
            '../node_modules/react-native-web-refresh-control',
          ),
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: false,
              presets: [
                'module:metro-react-native-babel-preset',
                '@babel/preset-typescript',
              ],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify('/'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('./web/index.html'),
      title: 'React Native H5',
      favicon: path.resolve(
        './android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png',
      ),
    }),
  ],
  resolve: {
    extensions: [
      '.web.ts',
      '.web.js',
      '.web.tsx',
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.d.ts',
    ],
    alias: {
      'react-native$': 'react-native-web',
    },
  },
};
