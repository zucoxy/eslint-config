const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const ts = require('@unyu/eslint-config-ts');

module.exports = [
  reactPlugin.configs.flat.recommended,
  reactHooksPlugin.configs.flat.recommended,
  ...ts,
  {
    name: '@unyu/react/setup',
    settings: {
      react: {
        version: '17.0',
      },
    },
    rules: {
      'jsx-quotes': [
        'error',
        'prefer-double',
      ],
      'react/react-in-jsx-scope': 'off',
    },
  },
];
