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

Got in.
