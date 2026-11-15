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

describe('hero and about', () => {
  const text = () => $('body').text().replace(/\s+/g, ' ');

  test('name in the pixel box', () => {
    expect($('h1').text().trim()).toBe('damaris ingram');
    expect(text()).toContain("hello, i'm");
    expect(text().toLowerCase()).not.toContain('my name is');
  });

  test('hero tags', () => {
    for (const s of [
      'breaks things',
      'learns in public',
      'Atlantic Tech College',
      'Aspiring Pentester',
      'open to labs, CTFs and good problems',
      'I learn how networks work',
      'so I can learn how they break.',
    ]) {
      expect(text()).toContain(s);
    }
  });

  test('about headings', () => {
    const about = $('#about').text();
    expect(about).toContain('~/about');
    expect(about).toContain('whoami');
    expect(text().toLowerCase()).not.toContain('about me!');
    expect(text().toLowerCase()).not.toContain("what's up");
  });

  test('bio', () => {
    expect($('#about').text().replace(/\s+/g, ' ')).toContain(
      "I'm a networking student at Atlantic Tech College who gets a little too curious about how things break.",
    );
    expect($('#about').text()).toContain('one lab at a time.');
  });

  test('certs', () => {
    const certs = $('#about [data-cert]').map((_, el) => $(el).text().trim()).get();
    expect(certs).toEqual(['CompTIA A+', 'CompTIA Tech+', 'CompTIA AI Fundamentals']);
    const about = $('#about').text();
    expect(about).not.toContain('Linux+');
    expect(about).not.toContain('Cisco');
  });

  test('other badges', () => {
    const badges = $('#about [data-other-badges]');
    expect(badges.length).toBe(1);
    for (const b of [
      'IC3 Digital Literacy GS6 Master',
      'PMI Project Management Ready',
      'ESB: Entrepreneurship and Small Business',
      'Intuit QuickBooks Online Certified User',
    ]) {
      expect(badges.text()).toContain(b);
    }
    expect(badges.find('a[href="https://www.credly.com/users/damaris-ingram"]').length).toBe(1);
  });

  test('skills', () => {
    const about = $('#about').text();
    for (const s of [
      'Linux (Arch · Debian · Ubuntu · Fedora)',
      'Networking fundamentals',
      'Hardware & troubleshooting',
      'HTML/CSS/JavaScript',
      'Git & GitHub Pages',
    ]) {
      expect(about).toContain(s);
    }
  });

  test('polaroids', () => {
    const imgs = $('#about img');
    expect(imgs.length).toBeGreaterThan(0);
    imgs.each((_, img) => expect($(img).attr('alt')?.trim()).toBeTruthy());
    expect($('#about').text()).toContain('my study app');
    expect($('#about').text()).toContain('my setup');
  });

  test('no placeholders', () => {
    for (const s of ['YOUR NAME', 'you@example.com', 'your photo']) {
      expect(text()).not.toContain(s);
    }
  });
});

describe('folder stack', () => {
  const folders = () => $('#projects .folder');

  test('three folders with tabs', () => {
    expect(folders().length).toBe(3);
    const tabs = folders().map((_, f) => $(f).find('.tab').text()).get();
    ['01', '02', '03'].forEach((n, i) => expect(tabs[i]).toContain(n));
  });

  test('study app folder', () => {
    const first = folders().eq(0);
    expect(first.text()).toContain('Study App');
    expect(first.text()).toContain('shipped');
    expect(first.text()).toContain("Windows became unstable after last night's update.");
    expect(first.find('a[href="/projects/study-app/"]').length).toBe(1);
  });

  test('portfolio folder links out', () => {
    expect(folders().eq(1).find('a.view').attr('href')).toBe('https://github.com/damyris/damyris.github.io');
  });

  test('writeups folder is last and coming soon', () => {
    const last = folders().last();
    expect(last.text()).toContain('Lab Writeups');
    expect(last.text()).toContain('coming soon');
    expect(last.text()).toContain('COMING SOON');
    expect(last.find('a[href="/writeups/"]').length).toBe(1);
  });

  test('folders are focusable', () => {
    folders().each((_, f) => expect($(f).attr('tabindex')).toBe('0'));
  });
});
