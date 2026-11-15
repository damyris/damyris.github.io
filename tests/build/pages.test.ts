import { existsSync, readdirSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import { distPath, loadPage } from './helpers';

describe('project page', () => {
  test('study app page', () => {
    expect(existsSync(distPath('projects', 'study-app', 'index.html'))).toBe(true);
    const $ = loadPage('/projects/study-app/');
    expect($('a[href="https://damyris.github.io/networking-study-tool/"]').length).toBeGreaterThan(0);
    expect($('a[href="https://github.com/damyris/networking-study-tool"]').length).toBeGreaterThan(0);
    expect($('main').text()).toContain('Not affiliated with or endorsed by CompTIA');
    const imgs = $('main img');
    expect(imgs.length).toBe(3);
    imgs.each((_, img) => expect($(img).attr('alt')?.trim()).toBeTruthy());
    expect($.html()).not.toContain('inbox');
  });

  test('no page for externally linked project', () => {
    expect(existsSync(distPath('projects', 'this-portfolio', 'index.html'))).toBe(false);
  });
});

describe('writeups', () => {
  test('writeups index empty state', () => {
    const text = loadPage('/writeups/')('main').text();
    expect(text).toContain('COMING SOON');
    expect(text).toContain('No writeups yet');
    expect(text).toContain('authorized');
  });

  test('template is not published', () => {
    expect(readdirSync(distPath('writeups'))).toEqual(['index.html']);
  });
});

describe('links', () => {
  // Résumé PDF arrives in Task 7.
  const pending = new Set(['/damaris-ingram-resume.pdf']);

  test('internal links resolve', () => {
    for (const route of ['/', '/writeups/', '/projects/study-app/']) {
      const $ = loadPage(route);
      $('a[href^="/"]').each((_, a) => {
        const href = ($(a).attr('href') ?? '').split('#')[0];
        if (!href || pending.has(href)) return;
        const parts = href.split('/').filter(Boolean);
        const asDir = distPath(...parts, 'index.html');
        const asFile = distPath(...parts);
        expect(existsSync(asDir) || (parts.length > 0 && existsSync(asFile)), `${route} → ${href}`).toBe(true);
      });
    }
  });
});
