# @unyu/eslint-config

[![npm](https://img.shields.io/npm/v/@unyu/eslint-config?color=a1b858&label=)](https://npmjs.com/package/@unyu/eslint-config)

- Single quotes, must semi;
- Auto fix for formatting (aimed to be used standalone **without** Prettier)
- Designed to work with TypeScript, Vue out-of-box
- Lint also for json, yaml, markdown
- Sorted imports, dangling commas
- Reasonable defaults, best practices, only one-line of config
- **Style principle**: Minimal for reading, stable for diff

## Version lines

| Version | ESLint | Config format |
| --- | --- | --- |
| 1.x | `^8.57.0` | `.eslintrc` + flat config |
| 2.x | `^9.0.0` | `.eslintrc` + flat config |
| 3.x | `^10.0.0` | flat config only |

Install the line that matches your ESLint major. All lines require Node.js >= 20.19.0.

## Usage

### Install

```bash
pnpm add -D eslint @unyu/eslint-config
```

### Config `eslint.config.js`

From v3 the package itself exports a flat config array:

```js
// eslint.config.js
const unyu = require('@unyu/eslint-config');

module.exports = [
  ...unyu,
];
```

> ESLint 10 removed the `.eslintrc` format entirely, so v3 only ships flat config.
> If you are still on `.eslintrc` / ESLint 8 or 9, use v1.x / v2.x.
> `@unyu/eslint-config/flat` is kept as an alias of the same entry point, so an
> existing `require('@unyu/eslint-config/flat')` keeps working after upgrading.
>
> `eslint-plugin-import` and `eslint-plugin-react` do not declare ESLint 10 support yet
> (their peer range still ends at `^9`). Their rules work fine on ESLint 10; to silence
> the install warning, allow it in your root `package.json`:
>
> ```json
> {
>   "pnpm": {
>     "peerDependencyRules": {
>       "allowedVersions": {
>         "eslint-plugin-import>eslint": "10",
>         "eslint-plugin-react>eslint": "10"
>       }
>     }
>   }
> }
> ```

### Add script for package.json

For example:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### Config VS Code auto fix

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and create `.vscode/settings.json`

```json
{
  "prettier.enable": false,
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### TypeScript Aware Rules

Type aware rules are enabled when a `tsconfig.eslint.json` is found in the project root, which will introduce some stricter rules into your project. If you want to enable it while have no `tsconfig.eslint.json` in the project root, you can change tsconfig name by modifying `ESLINT_TSCONFIG` env. 

```js
// eslint.config.js
process.env.ESLINT_TSCONFIG = 'tsconfig.json';

const unyu = require('@unyu/eslint-config');

module.exports = [
  ...unyu,
];
```

### Lint Staged

If you want to apply lint and auto-fix before every commit, you can add the following to your `package.json`:

```json
{
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

and then

```bash
npm i -D lint-staged simple-git-hooks
```
