// 用 FlatCompat 把 eslintrc 配置转换为 flat config，
// 保证两种入口共用同一份规则，无需维护两套配置
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

module.exports = compat.config(require('./index.js'));
