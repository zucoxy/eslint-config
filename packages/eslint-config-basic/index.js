const globals = require('globals');
const importPlugin = require('eslint-plugin-import');
const jsoncPlugin = require('eslint-plugin-jsonc');
const jsoncParser = require('jsonc-eslint-parser');
const markdownPlugin = require('eslint-plugin-markdown');
const noOnlyTestsPlugin = require('eslint-plugin-no-only-tests');
// eslint-plugin-unicorn 是 ESM-only，CJS require 拿到的是 { default: plugin }
const unicornModule = require('eslint-plugin-unicorn');
const unusedImportsPlugin = require('eslint-plugin-unused-imports');
const unyuPlugin = require('eslint-plugin-unyu');
const ymlPlugin = require('eslint-plugin-yml');
const yamlParser = require('yaml-eslint-parser');
const commentsConfig = require('@eslint-community/eslint-plugin-eslint-comments/configs');
const standard = require('./standard');

const unicornPlugin = unicornModule.rules ? unicornModule : unicornModule.default;

module.exports = [
  {
    name: '@unyu/basic/ignores',
    ignores: [
      '**/*.min.*',
      '**/*.d.ts',
      '**/CHANGELOG.md',
      '**/dist',
      '**/LICENSE*',
      '**/output',
      '**/out',
      '**/coverage',
      '**/public',
      '**/temp',
      '**/package-lock.json',
      '**/pnpm-lock.yaml',
      '**/yarn.lock',
      '**/__snapshots__',
      // ignore for in lint-staged
      '**/*.css',
      '**/*.png',
      '**/*.ico',
      '**/*.toml',
      '**/*.patch',
      '**/*.txt',
      '**/*.crt',
      '**/*.key',
      '**/Dockerfile',
      '**/.vitepress/cache',
    ],
  },
  standard,
  importPlugin.flatConfigs.recommended,
  commentsConfig.recommended,
  ...jsoncPlugin.configs['recommended-with-jsonc'],
  ...ymlPlugin.configs.standard,
  ...markdownPlugin.configs.recommended,
  {
    name: '@unyu/basic/setup',
    languageOptions: {
      globals: {
        ...globals.es2015,
        ...globals.browser,
        ...globals.node,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
    plugins: {
      unicorn: unicornPlugin,
      unyu: unyuPlugin,
      'no-only-tests': noOnlyTestsPlugin,
      'unused-imports': unusedImportsPlugin,
    },
    settings: {
      'import/resolver': {
        node: { extensions: ['.js', '.mjs'] },
      },
    },
    rules: {
      // import
      'import/order': 'error',
      'import/first': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-unresolved': 'off',
      'import/no-absolute-path': 'off',
      'import/newline-after-import': ['error', { count: 1, considerComments: true }],

      // Common
      semi: ['error', 'always'],
      curly: ['error', 'multi-line'],
      quotes: ['error', 'single'],
      'quote-props': ['error', 'as-needed'],

      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],

      'no-param-reassign': 'off',
      'no-mixed-operators': 'off',
      'array-bracket-spacing': ['error', 'never'],
      'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
      'block-spacing': ['error', 'always'],
      camelcase: 'off',
      'comma-spacing': ['error', { before: false, after: true }],
      'comma-style': ['error', 'last'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-constant-condition': 'warn',
      'no-debugger': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-cond-assign': ['error', 'always'],
      'func-call-spacing': ['off', 'never'],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'no-restricted-syntax': [
        'error',
        'DebuggerStatement',
        'LabeledStatement',
        'WithStatement',
      ],
      'object-curly-spacing': ['error', 'always'],
      'no-return-await': 'off',
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],

      // es6
      'no-var': 'error',
      'prefer-const': [
        'error',
        {
          destructuring: 'all',
          ignoreReadBeforeAssign: true,
        },
      ],
      'prefer-arrow-callback': [
        'error',
        {
          allowNamedFunctions: false,
          allowUnboundThis: true,
        },
      ],
      'object-shorthand': [
        'error',
        'always',
        {
          ignoreConstructors: false,
          avoidQuotes: true,
        },
      ],
      'prefer-exponentiation-operator': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'template-curly-spacing': 'error',
      'arrow-parens': ['error', 'as-needed'],
      'generator-star-spacing': 'off',
      'spaced-comment': ['error', 'always', {
        line: {
          markers: ['/'],
          exceptions: ['/', '#'],
        },
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true,
        },
      }],

      // best-practice
      'array-callback-return': 'error',
      'block-scoped-var': 'error',
      'consistent-return': 'off',
      complexity: ['off', 11],
      eqeqeq: ['error', 'smart'],
      'no-alert': 'warn',
      'no-case-declarations': 'error',
      'no-multi-spaces': 'error',
      'no-multi-str': 'error',
      'no-with': 'error',
      'no-void': 'error',
      'no-useless-escape': 'off',
      'no-invalid-this': 'error',
      'vars-on-top': 'error',
      'require-await': 'off',
      'no-return-assign': 'off',
      'operator-linebreak': ['off'],
      'max-statements-per-line': ['error', { max: 1 }],

      // node
      // 'n/prefer-global/process': ['error', 'never'], // Not sure if we need it as we are using `process.env.NODE_ENV` a lot in front-end.
      'n/prefer-global/buffer': ['error', 'never'],
      'n/no-callback-literal': 'off',

      // unicorns
      // Pass error message when throwing errors
      'unicorn/error-message': 'error',
      // Uppercase regex escapes
      'unicorn/escape-case': 'error',
      // Array.isArray instead of instanceof
      'unicorn/no-instanceof-array': 'error',
      // Prevent deprecated `new Buffer()`
      'unicorn/no-new-buffer': 'error',
      // Lowercase number formatting for octal, hex, binary (0x1'error' instead of 0X1'error')
      'unicorn/number-literal-case': 'error',
      // includes over indexOf when checking for existence
      'unicorn/prefer-includes': 'error',
      // String methods startsWith/endsWith instead of more complicated stuff
      'unicorn/prefer-string-starts-ends-with': 'error',
      // textContent instead of innerText
      'unicorn/prefer-dom-node-text-content': 'error',
      // Enforce throwing type error when throwing error while checking typeof
      'unicorn/prefer-type-error': 'error',
      // Use new when throwing error
      'unicorn/throw-new-error': 'error',
      // Prefer using the node: protocol
      'unicorn/prefer-node-protocol': 'error',

      'no-use-before-define': ['error', { functions: false, classes: false, variables: true }],
      '@eslint-community/eslint-comments/disable-enable-pair': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',
      'import/namespace': 'off',

      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: false,
        },
      ],

      // yml
      'yml/quotes': ['error', { prefer: 'single', avoidEscape: false }],
      'yml/no-empty-document': 'off',

      // unyu
      'unyu/if-newline': 'off',
      'unyu/import-dedupe': 'error',
      'unyu/top-level-function': 'off',
      // 'unyu/prefer-inline-type-import': 'error',
    },
  },
  {
    name: '@unyu/basic/json',
    files: ['**/*.json', '**/*.json5'],
    languageOptions: { parser: jsoncParser },
    rules: {
      'jsonc/array-bracket-spacing': ['error', 'never'],
      'jsonc/comma-dangle': ['error', 'never'],
      'jsonc/comma-style': ['error', 'last'],
      'jsonc/indent': ['error', 2],
      'jsonc/key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'jsonc/no-octal-escape': 'error',
      'jsonc/object-curly-newline': ['error', { multiline: true, consistent: true }],
      'jsonc/object-curly-spacing': ['error', 'always'],
      'jsonc/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
    },
  },
  {
    name: '@unyu/basic/yaml',
    files: ['**/*.yaml', '**/*.yml'],
    languageOptions: { parser: yamlParser },
    rules: {
      'spaced-comment': 'off',
    },
  },
  {
    name: '@unyu/basic/package-json',
    files: ['**/package.json'],
    languageOptions: { parser: jsoncParser },
    rules: {
      'jsonc/sort-keys': [
        'error',
        {
          pathPattern: '^$',
          order: [
            'publisher',
            'name',
            'displayName',
            'type',
            'version',
            'private',
            'packageManager',
            'description',
            'author',
            'license',
            'funding',
            'homepage',
            'repository',
            'bugs',
            'keywords',
            'categories',
            'sideEffects',
            'exports',
            'main',
            'module',
            'unpkg',
            'jsdelivr',
            'types',
            'typesVersions',
            'bin',
            'icon',
            'files',
            'engines',
            'activationEvents',
            'contributes',
            'scripts',
            'peerDependencies',
            'peerDependenciesMeta',
            'dependencies',
            'optionalDependencies',
            'devDependencies',
            'pnpm',
            'overrides',
            'resolutions',
            'husky',
            'simple-git-hooks',
            'lint-staged',
            'eslintConfig',
          ],
        },
        {
          pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
          order: { type: 'asc' },
        },
        {
          pathPattern: '^exports.*$',
          order: [
            'types',
            'require',
            'import',
          ],
        },
      ],
    },
  },
  {
    name: '@unyu/basic/dts',
    files: ['**/*.d.ts'],
    rules: {
      'import/no-duplicates': 'off',
    },
  },
  {
    name: '@unyu/basic/ts',
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    rules: {
      'no-void': ['error', { allowAsStatement: true }],
    },
  },
  {
    name: '@unyu/basic/scripts',
    files: ['**/scripts/**/*.*', '**/cli.*'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    name: '@unyu/basic/tests',
    files: ['**/*.test.ts', '**/*.test.js', '**/*.spec.ts', '**/*.spec.js'],
    rules: {
      'no-unused-expressions': 'off',
      'no-only-tests/no-only-tests': 'error',
    },
  },
  {
    // Code blocks in markdown file（只处理 js/ts 代码块，避免把 ```bash 之类的块当 JS 解析）
    name: '@unyu/basic/markdown-code-blocks',
    files: ['**/*.md/*.?(c|m)[jt]s?(x)', '**/*.md/*.vue'],
    rules: {
      'import/no-unresolved': 'off',
      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': 'off',
      'no-alert': 'off',
      'no-console': 'off',
      'no-restricted-imports': 'off',
      'no-undef': 'off',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
    },
  },
];
