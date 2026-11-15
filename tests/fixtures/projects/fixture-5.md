---
title: Fixture Epsilon
order: 5
status: shipped
summary: Fixture project number 5 for end-to-end tests.

sheet:
  type: terminal
  lines:
    - $ echo fixture 5
    - fixture 5
---

Fixture project body for project 5.

```bash
nmap -sC -sV -oA scans/initial 10.10.10.10 --script "default,safe,vuln" --min-rate 5000 --max-retries 2 -p- --open --reason
```
