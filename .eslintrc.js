module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  ignorePatterns: ['sample_app/'],
  rules: {
    'array-bracket-spacing': ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'consistent-return': 'off',
    'func-names': 'off',
    'function-paren-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'linebreak-style': ['error', 'unix'],
    'max-len': 'off',
    'no-await-in-loop': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'no-undef': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'off',
    'no-use-before-define': 'off',
    'object-curly-newline': 'off',
    'object-curly-spacing': ['error', 'never'],
    'operator-linebreak': 'off',
    'prefer-destructuring': 'off',
    camelcase: 'off',
    indent: 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'always']
  }
};
