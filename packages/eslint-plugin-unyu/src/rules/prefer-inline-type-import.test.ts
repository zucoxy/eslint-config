import * as parser from '@typescript-eslint/parser';
import { RuleTester } from '@typescript-eslint/utils/ts-eslint';
import { it } from 'vitest';
import rule, { RULE_NAME } from './prefer-inline-type-import';

const valids = [
  'import { type Foo } from \'foo\'',
  'import type Foo from \'foo\'',
  'import type * as Foo from \'foo\'',
];
const invalids = [
  ['import type { Foo } from \'foo\'', 'import { type Foo } from \'foo\''],
];

it('runs', () => {
  const ruleTester: RuleTester = new RuleTester({
    languageOptions: { parser },
  });

  ruleTester.run(RULE_NAME, rule, {
    valid: valids,
    invalid: invalids.map(i => ({
      code: i[0],
      output: i[1].trim(),
      errors: [{ messageId: 'preferInlineTypeImport' }],
    })),
  });
});
