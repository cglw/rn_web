const path = require('path');

module.exports = {
  entry: './index.web.ts',
  output: {
    path: path.resolve('./dist'),
    publicPath: '/',
    filename: 'js/[name].[chunkhash:5].js',
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
