import { expect, test } from '@playwright/test';

const onlyOn = (name: 'desktop' | 'phone') =>
  test.skip(test.info().project.name !== name, `${name} only`);

test('no horizontal scroll on content pages', async ({ page }) => {
  onlyOn('phone');
  for (const route of ['/', '/writeups/', '/writeups/w-long/', '/projects/fixture-3/']) {
    await page.goto(route);
    const [scroll, inner] = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
    expect(scroll, `${route} scrolls sideways`).toBeLessThanOrEqual(inner);
  }
});

test('long code scrolls inside its sheet', async ({ page }) => {
  onlyOn('phone');
  await page.goto('/writeups/w-long/');
  const pre = page.locator('main pre').first();
  const [scrollW, clientW, overflowX] = await pre.evaluate((el) => [
    el.scrollWidth,
    el.clientWidth,
    getComputedStyle(el).overflowX,
  ]);
  expect(scrollW).toBeGreaterThan(clientW as number);
  expect(overflowX).toBe('auto');
});

test('writeups index is newest first', async ({ page }) => {
  await page.goto('/writeups/');
  await expect(page.locator('main ol li > a')).toHaveText([
    'A Very Long Writeup Title That Keeps Going To Check Wrapping On Small Phone Screens',
    'Third Box',
    'Second Box',
    'Oldest Box',
  ]);
});

test('writeup page shows its meta line', async ({ page }) => {
  await page.goto('/writeups/w-second/');
  await expect(page.locator('main .meta')).toHaveText('HackTheBox · 2026-02-10 · Easy · web');
});
