import { expect, test, type Locator, type Page } from '@playwright/test';
import { overflowing } from './overflow';

/** Vertical translation (px) of an element's own computed transform. */
const ty = (loc: Locator) => loc.evaluate((el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42);
const folders = (page: Page) => page.locator('#projects .folder');
const onlyOn = (name: 'desktop' | 'phone') =>
  test.skip(test.info().project.name !== name, `${name} only`);

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('hover lifts the folder and its sheet', async ({ page }) => {
  onlyOn('desktop');
  const first = folders(page).nth(0);
  await first.hover({ position: { x: 40, y: 60 } });
  await page.waitForTimeout(600);
  expect(await ty(first)).toBeCloseTo(-34, 0);
  expect(await ty(first.locator('.sheet'))).toBeCloseTo(-22, 0);
});

test('keyboard focus lifts', async ({ page }) => {
  onlyOn('desktop');
  const first = folders(page).nth(0);
  for (let i = 0; i < 60; i++) {
    await page.keyboard.press('Tab');
    if (await first.evaluate((el) => el === document.activeElement)) break;
  }
  await expect(first).toBeFocused();
  await page.waitForTimeout(600);
  expect(await ty(first)).toBeCloseTo(-34, 0);
  const outline = await first.evaluate((el) => getComputedStyle(el).outlineStyle);
  expect(outline).not.toBe('none');
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('reduced motion keeps the lift without animation', async ({ page }) => {
    onlyOn('desktop');
    const first = folders(page).nth(0);
    expect(await first.evaluate((el) => getComputedStyle(el).transitionDuration)).toBe('0s');
    await first.hover({ position: { x: 40, y: 60 } });
    expect(await ty(first)).toBeCloseTo(-34, 0);
  });
});

test('tap toggles one folder at a time on touch', async ({ page }) => {
  onlyOn('phone');
  const two = folders(page).nth(1);
  const three = folders(page).nth(2);
  await two.tap({ position: { x: 16, y: 40 } });
  await expect(two).toHaveClass(/is-lifted/);
  await three.tap({ position: { x: 16, y: 40 } });
  await expect(three).toHaveClass(/is-lifted/);
  await expect(two).not.toHaveClass(/is-lifted/);
  await three.tap({ position: { x: 16, y: 40 } });
  await expect(three).not.toHaveClass(/is-lifted/);
  await page.waitForTimeout(600);
  // Nothing stays stuck "hovered" after a tap.
  expect(await ty(two)).toBeCloseTo(0, 0);
  expect(await ty(three)).toBeCloseTo(0, 0);
});

test('clicking a folder with a mouse does not leave it stuck up', async ({ page }) => {
  onlyOn('desktop');
  const first = folders(page).nth(0);
  await first.locator('h3').click();
  await page.mouse.move(5, 5);
  await page.waitForTimeout(600);
  await expect(first).not.toHaveClass(/is-lifted/);
  expect(await ty(first)).toBeCloseTo(0, 0);
});

test('tapping the folder link navigates', async ({ page }) => {
  onlyOn('phone');
  await folders(page).nth(0).locator('a.view').tap();
  await expect(page).toHaveURL(/\/projects\/fixture-1\/$/);
});

test('every tab number is visible', async ({ page }) => {
  const count = await folders(page).count();
  expect(count).toBe(7);
  for (let i = 0; i < count; i++) {
    const tab = folders(page).nth(i).locator('.tab');
    await tab.scrollIntoViewIfNeeded();
    const visible = await tab.evaluate((t) => {
      const label = [...t.querySelectorAll('span')].find((s) => getComputedStyle(s).display !== 'none');
      if (!label) return false;
      const r = label.getBoundingClientRect();
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return Boolean(hit && t.contains(hit));
    });
    expect(visible, `tab ${i + 1} number is covered`).toBe(true);
  }
});

test('writeups folder lists the newest three', async ({ page }) => {
  const last = folders(page).last();
  await expect(last.locator('.list-sheet li')).toHaveText([
    'A Very Long Writeup Title That Keeps Going To Check Wrapping On Small Phone Screens',
    'Third Box',
    'Second Box',
  ]);
  await expect(last).toContainText('4 writeups');
});

test('no horizontal scroll on home', async ({ page }) => {
  onlyOn('phone');
  expect(await overflowing(page)).toEqual([]);
});
