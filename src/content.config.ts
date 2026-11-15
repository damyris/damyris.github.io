import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { projectSchema, writeupSchema } from './lib/schemas';

// PORTFOLIO_CONTENT lets tests build the site from fixture content.
//   unset      → src/content/<name>          (the real site)
//   'fixtures' → tests/fixtures/<name>       (e2e tests)
//   'bad'      → tests/fixtures/bad/<name>   (build must fail)
function base(name: 'projects' | 'writeups'): string {
  switch (process.env.PORTFOLIO_CONTENT) {
    case 'fixtures':
      return `./tests/fixtures/${name}`;
    case 'bad':
      return `./tests/fixtures/bad/${name}`;
    default:
      return `./src/content/${name}`;
  }
}

// Files starting with "_" (like _TEMPLATE.md) are never published.
const pattern = '**/[^_]*.md';

export const collections = {
  projects: defineCollection({ loader: glob({ pattern, base: base('projects') }), schema: projectSchema }),
  writeups: defineCollection({ loader: glob({ pattern, base: base('writeups') }), schema: writeupSchema }),
};
