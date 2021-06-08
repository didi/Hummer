const DOMGlobals = ['window', 'document']
const NodeGlobals = ['module', 'require']

// eslint-disable-next-line no-restricted-globals
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  extends: [
    'prettier',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  rules: {
    "no-unused-vars": "off",
    "prefer-const": "off",
    '@typescript-eslint/no-unused-vars': [
      'error',
      // we are only using this rule to check for unused arguments since TS
      // catches unused variables but not args.
      // {varsIgnorePattern: '.*', args: 'after-used', argsIgnorePattern: '^_'},
    ],
    // most of the codebase are expected to be env agnostic
    'no-restricted-globals': ['error', ...DOMGlobals, ...NodeGlobals],
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-this-alias': 0,
    "@typescript-eslint/ban-types": 1
    // since we target ES2015 for baseline support, we need to forbid object
    // rest spread usage (both assign and destructure)
  },
  overrides: [
    // tests, no restrictions (runs in Node / jest with jsdom)
    {
      files: ['**/__tests__/**', 'test-dts/**'],
      rules: {
        'no-restricted-globals': 'off',
        'no-restricted-syntax': 'off',
      },
    },
  ],
}
