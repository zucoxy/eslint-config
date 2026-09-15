import * as parser from '@typescript-eslint/parser';
import { RuleTester } from '@typescript-eslint/utils/ts-eslint';
import { it } from 'vitest';
import rule, { RULE_NAME } from './if-newline';

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
    languageOptions: { parser },
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
