import { expect, test } from 'vitest';
import { Koucogen } from './script';

test('sample returns ok', () => {
  let calc = new Koucogen(1, 2, 3, 4);
  let result = calc.getKou();
  expect(result).toBe(1);
});
