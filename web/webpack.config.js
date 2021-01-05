"use strict";
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.argv.indexOf('-p') === -1;
module.exports = {
    entry: {
        entry: './index.web.ts',
    },
    output: {
        path: path.join(process.cwd(), './dist'),
        filename: 'bundle.js',
    },
    devServer: {
        historyApiFallback: {
            index: '',
        },
        host: '0.0.0.0',
        port: 9090,
    },
    module: {
        rules: [
            {
                test: /\.(gif|jpe?g|png|svg)$/,
                use: {
                    loader: 'file-loader',
                },
            },
            {
                test: /\.(js|jsx|ts|tsx|d.ts)$/,
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
        new HtmlWebpackPlugin({
            template: path.join(process.cwd(), './web/index.html'),
            filename: 'index.html',
            inject: 'body',
            minify: {
                removeComments: !isDev,
                collapseWhitespace: !isDev,
                minifyJS: !isDev,
                minifyCSS: !isDev,
            },
            title: 'React Native H5',
            favicon: path.join(process.cwd(), './android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png'),
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
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'cheap-module-eval-source-map' : undefined,
};
