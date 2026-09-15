import { createRequire } from 'node:module';
import { RuleTester } from '@typescript-eslint/utils/ts-eslint';
import { it } from 'vitest';
import rule, { RULE_NAME } from './prefer-inline-type-import';

const require = createRequire(import.meta.url);

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
    parser: require.resolve('@typescript-eslint/parser'),
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
