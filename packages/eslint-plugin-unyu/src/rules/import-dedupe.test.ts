import * as parser from '@typescript-eslint/parser';
import { RuleTester } from '@typescript-eslint/utils/ts-eslint';
import { it } from 'vitest';
import rule, { RULE_NAME } from './import-dedupe';

const valids = [
  'import { a } from \'foo\'',
];
const invalids = [
  [
    'import { a, b, a, a, c, a } from \'foo\'',
    'import { a, b,   c,  } from \'foo\'',
  ],
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
      errors: [{ messageId: 'importDedupe' }, { messageId: 'importDedupe' }, { messageId: 'importDedupe' }],
    })),
  });
});
