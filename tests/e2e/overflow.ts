import type { Page } from '@playwright/test';

/**
 * Elements that stick out past the right edge of the notebook page.
 * The page clips its overflow, so scrollWidth can't see these; measure boxes instead.
 */
export function overflowing(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const pageBox = document.querySelector('.page')!.getBoundingClientRect();
    const out: string[] = [];
    for (const el of document.querySelectorAll('.page *')) {
      // Content inside its own horizontal scroller (code blocks) is fine.
      const scroller = el.closest('pre');
      if (scroller && scroller !== el) continue;
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.right > pageBox.right + 1) {
        out.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} "${(el.textContent ?? '').trim().slice(0, 40)}"`);
      }
    }
    return out;
  });
}
