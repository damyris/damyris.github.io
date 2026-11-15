---
title: Fixture Beta
order: 2
status: shipped
summary: Fixture project number 2 for end-to-end tests.
link: https://example.com/beta
sheet:
  type: terminal
  lines:
    - $ echo fixture 2
    - fixture 2
---

Fixture project body for project 2.

```bash
nmap -sC -sV -oA scans/initial 10.10.10.10 --script "default,safe,vuln" --min-rate 5000 --max-retries 2 -p- --open --reason
```
