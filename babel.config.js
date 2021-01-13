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
  ],
};
