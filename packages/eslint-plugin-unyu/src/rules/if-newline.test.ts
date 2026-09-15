import { createRequire } from 'node:module';
import { RuleTester } from '@typescript-eslint/utils/ts-eslint';
import { it } from 'vitest';
import rule, { RULE_NAME } from './if-newline';

const require = createRequire(import.meta.url);

const valids = [
  `if (true)
  console.log('hello')
`,
  `if (true) {
  console.log('hello')
}`,
];
const invalids = [
  ['if (true) console.log(\'hello\')', 'if (true) \nconsole.log(\'hello\')'],
];

it('runs', () => {
  const ruleTester: RuleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
  });

  ruleTester.run(RULE_NAME, rule, {
    valid: valids,
    invalid: invalids.map(i => ({
      code: i[0],
      output: i[1],
      errors: [{ messageId: 'missingIfNewline' }],
    })),
  });
});
