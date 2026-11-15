import { describe, expect, test } from 'vitest';
import { loadPage } from './helpers';

const $ = loadPage('/');

describe('nav and footer', () => {
  test('title names the owner', () => {
    expect($('title').text()).toContain('Damaris Ingram');
  });

  test('nav links', () => {
    const hrefs = $('nav a').map((_, a) => $(a).attr('href')).get();
    expect(hrefs).toEqual(expect.arrayContaining(['#top', '#about', '#projects']));
    const labs = $('nav a').filter((_, a) => $(a).text().trim() === 'Labs');
    expect(labs.attr('href')).toBe('/writeups/');
  });

  test('socials render only when set', () => {
    expect($('a[href="https://github.com/damyris"]').length).toBeGreaterThan(0);
    expect($('a[href="https://www.linkedin.com/in/damarisingram/"]').length).toBeGreaterThan(0);
    expect($('a[href*="tryhackme"]').length).toBe(0);
  });

  test('résumé button downloads the PDF', () => {
    expect($('nav a[href="/damaris-ingram-resume.pdf"][download]').length).toBe(1);
  });

  test('footer', () => {
    const footer = $('footer');
    expect(footer.text()).toContain('ping me →');
    expect(footer.text()).toContain('damarisingramprof@gmail.com');
    expect(footer.find('a[href="/damaris-ingram-resume.pdf"]').length).toBe(1);
    expect($('body').text().toLowerCase()).not.toContain('say hi');
  });

  test('fonts load', () => {
    const href = $('link[rel="stylesheet"][href*="fonts.googleapis.com"]').attr('href') ?? '';
    for (const family of ['Pixelify+Sans', 'Gochi+Hand', 'Space+Mono', 'Inter']) {
      expect(href).toContain(family);
    }
  });
});
