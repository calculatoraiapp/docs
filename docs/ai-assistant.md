---
title: How CalculatorAI's AI assistant works
description: Six AI surfaces built on Anthropic's Claude — what each one knows, what it can do, and the privacy boundary it never crosses.
---

# The AI assistant

The AI isn't bolted onto CalculatorAI — it runs through every product. There are **six distinct AI surfaces**, each with its own focus and its own knowledge, all built on **[Anthropic's Claude](https://www.anthropic.com/)** via the business API.

**The boundary, stated once and enforced everywhere:** the AI sees **only your own data, only when you ask**. Another person's data is never in your assistant's context, and yours is never in theirs. Inputs and outputs sent through Anthropic's API are **not used to train their models**, and CalculatorAI trains no model of its own. See [security & privacy](security-and-privacy.md).

---

## 1. Calculator chat

Inside any calculator, a chat tab that knows your **current inputs and the live computed result**.

> *"Why is my monthly mortgage payment $1,847 — what's driving most of it?"*
> *"What happens if I increase the down payment by $20,000?"*
> *"Compare this with a 15-year loan instead of 30."*

Because it sees your numbers, the answer is grounded in your situation rather than a textbook. It will not invent prices, rates or jurisdictions you didn't enter.

**It also fills the inputs for you.** Describe the situation in plain language — *"I earn $80,000 a year, 20% down on a $400k home, 30-year loan"* — and the fields populate, with a chip confirming how many landed.

## 2. AI Insights on a result

One tap asks for a **one-shot expert reading** of the numbers: what the result actually means, risks or red flags, two or three recommended next actions, and trade-offs you might not have noticed. Use chat for back-and-forth; use Insights when you want a verdict.

## 3. Trading Journal AI

The deepest integration on the platform, because the data is rich enough to find real patterns:

- **Per-trade analysis** — open a trade, press *AI Analyze*: entry, exit, stop, take-profit, size, strategy and notes read together, with what went well and what to improve.
- **Journal chat & form auto-fill** — ask *"what's my win rate by strategy?"*, or describe a trade (*"buy AAPL at 180, sell at 195, size 100"*) and watch the form fill.
- **Screenshot import** — drop a TradingView or broker screenshot and vision extraction pulls out symbol, type, side, prices, quantity and dates.
- **Weekly insights** — a pattern report: best setups, worst times of day, drawdown triggers, edge decay, recovery patterns.
- **Pre-trade checklist** — maintained with the AI and shown before you add a trade.

## 4. Invoices AI

Knows your client base, billing history and who is late.

> *"Which invoices are overdue, and by how much?"*
> *"Draft a polite-but-firm follow-up to Globex about INV-2026-004."*
> *"Which clients always pay on time? Which always drag?"*

Follow-up tone is tuned to the situation — a gentle nudge at three days, firmer at 30+, formal escalation at 60+. You always review before anything sends.

## 5. Document AI fill

In every [document generator](documents.md): a natural-language prompt that writes the whole document, a file scanner that reads a PDF or photo of an existing one into the template, and CSV import with AI column mapping.

## 6. Site assistant — the floating button

The chat on every page, and the **only** surface with cross-product context.

> *"How am I doing this month — both trading and invoices?"*
> *"Which calculator should I use to figure out a 401(k) rollover?"*
> *"What's the difference between a quote and a proforma invoice?"*

It has read every methodology page on the site and carries a compact snapshot of your data across the trackers and your calculator history. Upload a photo of a paystub, bank statement, brokerage screen or subscriptions list and it opens the matching calculator **with the numbers already filled in**.

---

## What it remembers

Two levels, both visible to you:

**Durable facts it curates** — name, country, currency, financial goals, preferences. Saved when you state them (*"remember I'm saving for a house"*) and lightly extracted from conversation. Every fact is listed in **Settings → "What the assistant remembers"**, and you can delete any of them. The memory updates existing facts instead of duplicating them and prunes loose observations, so it stays clean as it grows.

**A live snapshot of your real data** each session — portfolio value and largest positions, journal win rate and P&L, invoice totals and the longest-overdue one, habit streaks, this month's budget plan versus actual, every debt with its rate and the projected debt-free date, and saved calculator scenarios **with their inputs and results**. It never treats seeded demo data as yours.

## Proactive, not just reactive

- A **"Welcome back"** bubble on arrival with the actual change chips — `Portfolio +6.0%` · `+2 overdue` · `+3 trades` — from one cheap, AI-free check.
- A greeting that diffs against your **last visit**: portfolio moves, newly overdue invoices, new trades, budget spend since you were here.
- A guided start for brand-new accounts with two or three concrete first steps.

## What it will not do

- It does not move money, place trades, or act on your accounts. Connected exchanges and wallets are **read-only** by design.
- It does not create records in another tracker behind your back — cross-tracker hand-offs open a **prefilled form you confirm**.
- It does not quote a figure the page itself disagrees with: projections come from the same simulator the tracker runs, not a second guess.

---

*Back to the [documentation index](../README.md) · [Security & privacy](security-and-privacy.md) · [Pricing & limits](pricing-and-limits.md)*
