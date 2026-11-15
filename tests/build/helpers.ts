import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import * as cheerio from 'cheerio';

const root = fileURLToPath(new URL('../../', import.meta.url));

/** Absolute path to a file inside the built site (`dist/`). */
export function distPath(...parts: string[]): string {
  return path.join(root, 'dist', ...parts);
}

/** Load a built page by route, e.g. '/' or '/writeups/'. */
export function loadPage(route: string): cheerio.CheerioAPI {
  const clean = route.replace(/^\/+|\/+$/g, '');
  const file = clean ? distPath(clean, 'index.html') : distPath('index.html');
  return cheerio.load(readFileSync(file, 'utf8'));
}
