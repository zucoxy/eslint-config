const fs = require('node:fs');
const { join } = require('node:path');
const basic = require('@unyu/eslint-config-basic');

const tsconfig = process.env.ESLINT_TSCONFIG || 'tsconfig.eslint.json';

module.exports = {
  extends: [
    '@unyu/eslint-config-basic',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'] },
    },
  },
  overrides: basic.overrides.concat(
    [
      {
        // 这些规则依赖 @typescript-eslint/parser 提供的 parser services，
        // 必须限定在 TS 语法文件上，否则 json/yaml 等文件会直接报错
        files: ['*.ts', '*.tsx', '*.mts', '*.cts', '*.vue'],
        excludedFiles: ['**/*.md/*.*'],
        rules: {
          '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', disallowTypeAnnotations: false }],
        },
      },
    ],
    !fs.existsSync(join(process.cwd(), tsconfig))
      ? []
      : [{
          parserOptions: {
            tsconfigRootDir: process.cwd(),
            project: [tsconfig],
          },
          parser: '@typescript-eslint/parser',
          excludedFiles: ['**/*.md/*.*'],
          files: ['*.ts', '*.tsx', '*.mts', '*.cts'],
          // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts
          rules: {
            'no-throw-literal': 'off',
            '@typescript-eslint/only-throw-error': 'error',
            'no-implied-eval': 'off',
            '@typescript-eslint/no-implied-eval': 'error',
            'dot-notation': 'off',
            '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-misused-promises': 'error',
            '@typescript-eslint/await-thenable': 'error',
            '@typescript-eslint/no-for-in-array': 'error',
            '@typescript-eslint/no-unnecessary-type-assertion': 'error',
            '@typescript-eslint/no-unsafe-argument': 'error',
            '@typescript-eslint/no-unsafe-assignment': 'error',
            '@typescript-eslint/no-unsafe-call': 'error',
            '@typescript-eslint/no-unsafe-member-access': 'error',
            '@typescript-eslint/no-unsafe-return': 'error',
            'require-await': 'off',
            '@typescript-eslint/require-await': 'error',
            '@typescript-eslint/restrict-plus-operands': 'error',
            '@typescript-eslint/restrict-template-expressions': 'error',
            '@typescript-eslint/unbound-method': 'error',
          },
        }, {
          // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/unbound-method.md
          files: ['**/__tests__/**/*.ts', '**/*.spec.ts', '**/*.test.ts'],
          plugins: ['jest'],
          rules: {
            // you should turn the original rule off *only* for test files
            '@typescript-eslint/unbound-method': 'off',
            'jest/unbound-method': 'error',
          },
        }],
  ),
  rules: {
    'import/named': 'off',

    // TS
    '@typescript-eslint/ban-ts-comment': ['off'],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/prefer-ts-expect-error': 'off',
    '@typescript-eslint/no-require-imports': 'error',

    // Override JS
    'no-useless-constructor': 'off',
    'no-invalid-this': 'off',
    '@typescript-eslint/no-invalid-this': 'error',
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': 'error',

    // unyu
    'unyu/generic-spacing': 'error',

    // off
    '@typescript-eslint/consistent-indexed-object-style': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/parameter-properties': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-restricted-types': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    'prefer-promise-reject-errors': 'off',
    // handled by unused-imports/no-unused-imports
    '@typescript-eslint/no-unused-vars': 'off',
  },
};
