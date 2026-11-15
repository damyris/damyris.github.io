// @ts-check
import { defineConfig } from 'astro/config';

// Test builds (PORTFOLIO_CONTENT=fixtures) go to their own folder so they
// never overwrite the real site in dist/.
const outDir = process.env.PORTFOLIO_CONTENT === 'fixtures' ? './dist-fixtures' : './dist';

export default defineConfig({
  site: 'https://damyris.github.io',
  outDir,
});
