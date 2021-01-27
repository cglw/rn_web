module.exports = {
  presets: [
    '@babel/preset-typescript',
    ['module:metro-react-native-babel-preset'],
  ],
  plugins: [
    // ['@babel/plugin-proposal-decorators', { legacy: true }],
    // ['@babel/plugin-proposal-class-properties', { loose: false }],
    'transform-class-properties',
    ['import', { libraryName: '@ant-design/react-native' }],
    ['import', { libraryName: 'antd-mobile', style: 'css' }, 'antd-mobile'],
    [
      'module-resolver',
      {
        root: ['.'], //表示哪个目录开始设置绝对路径
        alias: {
          //别名的配置
          '@': './src',
          '@design': './src/design',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
