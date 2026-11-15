import { describe, expect, test } from 'vitest';
import { projectSchema, writeupSchema } from '../../src/lib/schemas';

const studyApp = {
  title: 'Study App',
  order: 1,
  status: 'shipped',
  color: 'blue',
  summary: 'Quick, instant-feedback practice for CompTIA A+ Core 1, A+ Core 2 and Linux+ exams.',
  sheet: {
    type: 'quiz',
    label: 'A+ CORE 2 · D3',
    question: "Windows became unstable after last night's update. What's the quickest targeted fix?",
    answers: ['Roll back the update or use System Restore', 'Reset the router', 'Replace the RAM', 'Reimage the PC'],
    correct: 0,
  },
};

const firstPath = (r: { success: boolean; error?: { issues: { path: PropertyKey[] }[] } }) =>
  r.error?.issues[0]?.path ?? [];

describe('projectSchema', () => {
  test('accepts the study-app frontmatter', () => {
    expect(projectSchema.safeParse(studyApp).success).toBe(true);
  });

  test('rejects an unknown status', () => {
    const r = projectSchema.safeParse({ ...studyApp, status: 'done' });
    expect(r.success).toBe(false);
    expect(firstPath(r)).toEqual(['status']);
  });

  test('rejects a quiz with three answers', () => {
    const r = projectSchema.safeParse({ ...studyApp, sheet: { ...studyApp.sheet, answers: ['a', 'b', 'c'] } });
    expect(r.success).toBe(false);
    expect(firstPath(r).slice(0, 2)).toEqual(['sheet', 'answers']);
  });

  test('rejects an unknown sheet type', () => {
    expect(projectSchema.safeParse({ ...studyApp, sheet: { type: 'video' } }).success).toBe(false);
  });

  test('color is optional', () => {
    const { color: _color, ...noColor } = studyApp;
    expect(projectSchema.safeParse(noColor).success).toBe(true);
  });

  test('rejects a non-url link', () => {
    expect(projectSchema.safeParse({ ...studyApp, link: 'damyris.github.io' }).success).toBe(false);
  });
});

describe('writeupSchema', () => {
  const writeup = { title: 'Pickle Rick', platform: 'TryHackMe', date: '2026-11-20', summary: 'A web box.' };

  test('writeup requires platform', () => {
    const { platform: _p, ...noPlatform } = writeup;
    const r = writeupSchema.safeParse(noPlatform);
    expect(r.success).toBe(false);
    expect(firstPath(r)).toEqual(['platform']);
  });

  test('writeup coerces a date string', () => {
    const r = writeupSchema.safeParse(writeup);
    expect(r.success).toBe(true);
    expect(r.data?.date).toBeInstanceOf(Date);
    expect(r.data?.date.getUTCFullYear()).toBe(2026);
    expect(writeupSchema.safeParse({ ...writeup, date: 'next tuesday' }).success).toBe(false);
  });

  test('writeup rejects a blank date', () => {
    const r = writeupSchema.safeParse({ ...writeup, date: null });
    expect(r.success).toBe(false);
    expect(firstPath(r)).toEqual(['date']);
  });

  test('writeup rejects a number as a date', () => {
    expect(writeupSchema.safeParse({ ...writeup, date: 20261120 }).success).toBe(false);
  });

  test('writeup rejects an impossible date', () => {
    expect(writeupSchema.safeParse({ ...writeup, date: '2026-02-30' }).success).toBe(false);
  });

  test('writeup accepts a YAML date object', () => {
    expect(writeupSchema.safeParse({ ...writeup, date: new Date('2026-11-20') }).success).toBe(true);
  });
});
