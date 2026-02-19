module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-invalid-this': 'off',
    '@typescript-eslint/no-invalid-this': 'off',
    'require-jsdoc': 'off',
    newIsCap: 0,
    'space-before-function-paren': ['off'],
    quotes: ['error', 'double', { allowTemplateLiterals: true }],
  },
};
