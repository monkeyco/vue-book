module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // vueファイル名が複数単語じゃないとエラーが出るのでその対応
    'vue/multi-word-component-names': 0,
    // 使用していない変数があるとエラーが出るので止める
    'no-unused-vars': 'off'
  }
}
