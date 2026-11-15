import { describe, expect, test } from 'vitest';
import { buildFolders, statusLabel, tabLayout } from '../../src/lib/folders';
import type { ProjectData, WriteupData } from '../../src/lib/schemas';

const project = (id: string, over: Partial<ProjectData> = {}) => ({
  id,
  data: {
    title: id,
    order: 1,
    status: 'shipped',
    summary: `${id} summary`,
    sheet: { type: 'stamp' },
    ...over,
  } as ProjectData,
});

const writeup = (id: string, date: string) => ({
  id,
  data: { title: `Box ${id}`, platform: 'TryHackMe', date: new Date(date), summary: 's' } as WriteupData,
});

describe('buildFolders', () => {
  test('orders projects and numbers them', () => {
    const folders = buildFolders([project('b', { order: 2 }), project('a', { order: 1 })], []);
    expect(folders.map((f) => [f.number, f.title])).toEqual([
      ['01', 'a'],
      ['02', 'b'],
      ['03', 'Lab Writeups'],
    ]);
  });

  test('no writeups → coming soon stamp', () => {
    const last = buildFolders([project('a')], []).at(-1)!;
    expect(last.status).toBe('coming-soon');
    expect(last.statusText).toBe('coming soon');
    expect(last.sheet.type).toBe('stamp');
    expect(last.href).toBe('/writeups/');
    expect(last.color).toBe('green');
  });

  test('writeups → newest three and a count', () => {
    const ws = [
      writeup('w1', '2026-01-01'),
      writeup('w5', '2026-05-01'),
      writeup('w3', '2026-03-01'),
      writeup('w4', '2026-04-01'),
      writeup('w2', '2026-02-01'),
    ];
    const last = buildFolders([project('a')], ws).at(-1)!;
    expect(last.status).toBe('in-progress');
    expect(last.sheet).toMatchObject({ type: 'list', count: 5 });
    if (last.sheet.type !== 'list') throw new Error('expected list sheet');
    expect(last.sheet.items.map((i) => i.title)).toEqual(['Box w5', 'Box w4', 'Box w3']);
    expect(last.sheet.items[0].href).toBe('/writeups/w5/');
  });

  test('external link', () => {
    const [linked, internal] = buildFolders(
      [project('portfolio', { order: 1, link: 'https://github.com/damyris/damyris.github.io' }), project('study-app', { order: 2 })],
      [],
    );
    expect(linked.href).toBe('https://github.com/damyris/damyris.github.io');
    expect(linked.external).toBe(true);
    expect(internal.href).toBe('/projects/study-app/');
    expect(internal.external).toBe(false);
    expect(internal.linkLabel).toBe('View project ↗');
  });

  test('colours cycle when unset', () => {
    const folders = buildFolders([project('a', { order: 1 }), project('b', { order: 2 })], []);
    expect(folders.slice(0, 2).map((f) => f.color)).toEqual(['blue', 'ink']);
  });

  test('explicit colour wins', () => {
    expect(buildFolders([project('a', { color: 'pink' })], [])[0].color).toBe('pink');
  });
});

describe('statusLabel', () => {
  test('human labels', () => {
    expect(['shipped', 'in-progress', 'planned', 'coming-soon'].map((s) => statusLabel(s as never))).toEqual([
      'shipped',
      'in progress',
      'planned',
      'coming soon',
    ]);
  });
});

describe('tabLayout', () => {
  test('compact labels when crowded', () => {
    expect(tabLayout(2)).toEqual({ compactWide: false, compactNarrow: false });
    expect(tabLayout(3)).toEqual({ compactWide: false, compactNarrow: true });
    expect(tabLayout(7)).toEqual({ compactWide: true, compactNarrow: true });
  });
});
