import { existsSync } from 'node:fs';
import { expect, test } from 'vitest';
import { distPath, loadPage } from './helpers';

test('home page is built', () => {
  expect(existsSync(distPath('index.html'))).toBe(true);
  expect(loadPage('/')('h1').text()).toContain('damaris ingram');
});
