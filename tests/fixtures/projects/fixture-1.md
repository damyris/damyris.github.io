---
title: Fixture Alpha
order: 1
status: shipped
summary: Fixture project number 1 for end-to-end tests.
color: blue
sheet:
  type: terminal
  lines:
    - $ echo fixture 1
    - fixture 1
---

Fixture project body for project 1.

```bash
nmap -sC -sV -oA scans/initial 10.10.10.10 --script "default,safe,vuln" --min-rate 5000 --max-retries 2 -p- --open --reason
```
