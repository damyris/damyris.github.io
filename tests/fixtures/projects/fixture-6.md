---
title: Fixture Zeta
order: 6
status: shipped
summary: Fixture project number 6 for end-to-end tests.
color: pink
sheet:
  type: terminal
  lines:
    - $ echo fixture 6
    - fixture 6
---

Fixture project body for project 6.

```bash
nmap -sC -sV -oA scans/initial 10.10.10.10 --script "default,safe,vuln" --min-rate 5000 --max-retries 2 -p- --open --reason
```
