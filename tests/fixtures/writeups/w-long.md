---
title: A Very Long Writeup Title That Keeps Going To Check Wrapping On Small Phone Screens
platform: TryHackMe
date: 2026-04-10
difficulty: Medium
tags: [linux, privesc]
summary: The newest fixture writeup, with a very long code line.
---

## Recon

```bash
nmap -sC -sV -oA scans/initial 10.10.10.10 --script "default,safe,vuln" --min-rate 5000 --max-retries 2 -p- --open --reason --stats-every 10s
```

## Foothold

Got in with the hash `aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0` and then browsed to http://10.10.123.45/admin/uploads/reverse-shell-payload-for-testing-only.php?cmd=whoami to confirm.
