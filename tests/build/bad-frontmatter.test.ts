import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { expect, test } from 'vitest';

test('bad frontmatter fails the build', () => {
  const outDir = mkdtempSync(path.join(tmpdir(), 'portfolio-bad-'));
  try {
    const r = spawnSync('npx', ['astro', 'build', '--outDir', outDir], {
      env: { ...process.env, PORTFOLIO_CONTENT: 'bad' },
      encoding: 'utf8',
    });
    const output = `${r.stdout}\n${r.stderr}`;
    expect(r.status).not.toBe(0);
    // Astro stops at the first invalid collection, and which one it checks
    // first varies, so accept either bad file — but it must name file and field.
    expect(output).toMatch(/bad-status[\s\S]*status:|no-platform[\s\S]*platform/);
  } finally {
    rmSync(outDir, { recursive: true, force: true });
  }
}, 120_000);
