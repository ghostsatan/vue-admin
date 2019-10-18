module.exports = {
  root: true,
  env: {
    "browser": true,
    "node":true,
    "es6": true,
  },
  // "parser": "babel-eslint",
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  "globals":{
    "document": true,
    "localStorage": true,
    "window": true,
    "global": true
  },
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // 强制一行的最大长度
    "max-len":[1,160],
    'no-unused-vars': 0,
    //关闭禁用console
    "no-console": "off",
    "indent": [2, 2, { "SwitchCase": 1, "VariableDeclarator": 2}],
    // 强制在parseInt()使用基数参数
    "radix": 2,
    // 禁止出现空函数.如果一个函数包含了一条注释，它将不会被认为有问题。
    "no-empty-function":2,
    // 禁止不必要的分号
    "no-extra-semi": 0,
    //不能用多余的空格
    "no-multi-spaces": 2,
    //函数调用时 函数名与()之间不能有空格
    "no-spaced-func": 2,
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
