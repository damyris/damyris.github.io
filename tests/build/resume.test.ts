import { existsSync, readFileSync, statSync } from 'node:fs';
import { expect, test } from 'vitest';
import { distPath } from './helpers';

test('résumé is published', () => {
  const file = distPath('damaris-ingram-resume.pdf');
  expect(existsSync(file)).toBe(true);
  expect(readFileSync(file).subarray(0, 5).toString('latin1')).toBe('%PDF-');
  expect(statSync(file).size).toBeLessThan(2 * 1024 * 1024);
});
