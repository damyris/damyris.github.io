---
title: Fixture Delta
order: 4
status: shipped
summary: Fixture project number 4 for end-to-end tests.

sheet:
  type: terminal
  lines:
    - $ echo fixture 4
    - fixture 4
---

Fixture project body for project 4.

```bash
nmap -sC -sV -oA scans/initial 10.10.10.10 --script "default,safe,vuln" --min-rate 5000 --max-retries 2 -p- --open --reason
```
