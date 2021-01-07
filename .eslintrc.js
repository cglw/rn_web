module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  // 0 代表关闭  1 代表警告  2 代表开启
  rules: {
    'no-extend-native': 0,
    'no-undef': 0,
    'dot-notation': 0,
    // "prettier/prettier": [
    //   2,
    //   {
    //     bracketSpacing: false,
    //     jsxBracketSameLine: true,
    //     singleQuote: true,
    //     trailingComma: "all",
    //   },
    // ],
  },
};
