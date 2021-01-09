module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  // 0 代表关闭  1 代表警告  2 代表开启
  rules: {
    'no-extend-native': 0, //是否允许扩展native对象
    'no-undef': 0, //是否能有未定义的变量
    'dot-notation': 0,
    'react-native/no-inline-styles': 0,
    'prettier/prettier': 2,
    'no-var': 2, //是否能用var，用let和const代替
  },
};
