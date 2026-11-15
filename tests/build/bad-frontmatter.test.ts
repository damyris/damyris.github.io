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
    expect(output).toContain('bad-status');
    expect(output).toContain('status');
  } finally {
    rmSync(outDir, { recursive: true, force: true });
  }
}, 120_000);
