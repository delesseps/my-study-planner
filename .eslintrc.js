const path = require('path')

module.exports = {
  extends: [
    'react-app',
    'plugin:jest-dom/recommended',
    'plugin:testing-library/recommended',
    'plugin:testing-library/react',
    'plugin:prettier/recommended',
    'eslint-config-prettier/@typescript-eslint',
  ],
  rules: {
    'additional-typescript-only-rule': 'off',
    'additional-rule': 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/**'],
      settings: {
        'import/resolver': {
          jest: {
            jestConfigFile: path.join(__dirname, 'jest.config.js'),
          },
        },
      },
    },
  ],
}
