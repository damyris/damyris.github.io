# damyris.github.io

Damaris Ingram's portfolio: a notebook-style site with projects shown as a stack of file folders, and lab writeups written in Markdown. Built with [Astro](https://astro.build), hosted free on GitHub Pages.

## One-time setup

You need Node.js (version 22.23 or newer; this project uses 26).

```bash
npm install
```

## Preview while you edit

```bash
npm run dev
```

Open the address it prints (usually http://localhost:4321). The page reloads as you save files.

## Add a lab writeup

1. Copy the template:
   ```bash
   cp src/content/writeups/_TEMPLATE.md src/content/writeups/pickle-rick.md
   ```
   The file name becomes the page address: `/writeups/pickle-rick/`. Don't start it with `_`; files starting with `_` are never published.
2. Fill in the fields at the top: `title`, `platform`, `date` (YYYY-MM-DD) and `summary`. `difficulty` and `tags` are optional.
3. Write the four sections: Recon, Foothold, Privilege escalation, What I'd patch.

**Only write up machines you're authorized to attack:** TryHackMe, HackTheBox, or your own lab.

The writeup shows up automatically on the Writeups page and in the "Lab Writeups" folder on the home page (the 3 newest are listed there).

## Add a project

Create a new file in `src/content/projects/`, e.g. `port-scanner.md`:

```yaml
---
title: Port Scanner
order: 3              # position in the folder stack (1 = first)
status: shipped       # shipped | in-progress | planned | coming-soon
color: pink           # optional: blue | ink | yellow | green | pink
summary: One line about what it does.
link: https://github.com/damyris/port-scanner   # optional: "View project" goes here instead of a page on this site
sheet:                # the little paper preview inside the folder
  type: terminal      # quiz | terminal | ascii | stamp
  lines:
    - $ python scan.py 192.168.1.10
    - 22/tcp open ssh
---

Longer description (only shown when there's no `link`).
```

Sheet types:
- `terminal`: `lines` (a list of text lines; lines starting with `$` get a green prompt)
- `quiz`: `label`, `question`, `answers` (exactly 4), `correct` (0–3)
- `ascii`: `art` (multi-line text) and `caption`
- `stamp`: no extra fields, shows "COMING SOON"

If you make a typo in these fields, the build stops and tells you which file and which field.

## Edit your personal info

Everything personal (name, bio, certs, skills, links, email) is in `src/config/site.ts`. To add a TryHackMe button, fill in `tryhackme` there; buttons without a link are hidden.

The résumé is `public/damaris-ingram-resume.pdf`. Replace that file to update it.

## Publish

```bash
git add .
git commit -m "add pickle rick writeup"
git push
```

GitHub Actions builds and publishes the site in about a minute. Watch it under the repo's **Actions** tab.

## Tests

```bash
npm test             # content rules and folder logic
npm run test:build   # builds the site and checks the pages
npm run test:e2e     # opens the site in a browser at phone and desktop sizes
```
