---
title: CalculatorAI security and privacy
description: Encryption, row-level data isolation, read-only exchange connections, and why your data is never used to train AI models.
---

# Security & privacy

Salaries, portfolios, trades, invoices, net worth — the numbers people keep on [CalculatorAI](https://calculatorai.app) are among the most sensitive data they own. This page states, in plain language, how they're protected. Where it matters, it links to the infrastructure providers' own documentation so the claims can be verified independently.

Live version: **<https://calculatorai.app/handbook/data-security>**

**The short version:** your data is encrypted, isolated to your account alone, never sold, and never used to train AI.

---

## Encryption

- **In transit** — every connection uses HTTPS/TLS.
- **At rest** — data lives in a managed [Supabase](https://supabase.com/security) Postgres database on AWS, encrypted at rest with AES-256. Backups are encrypted too.
- **Credentials get a second layer** — a read-only exchange or wallet key is encrypted again with AES-256-GCM *before* storage, using a key that never leaves the server environment.

## Isolation is enforced by the database, not the app

The most important guarantee. Every table holding user content carries a Postgres **[Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)** policy of the form *"you may only see rows where the owner is you"*, enforced by the database on **every single query**.

In practice: even a bug in the frontend cannot leak one account's trades to another, because the database itself refuses to return rows that aren't yours.

## Sign-in

Authentication runs on [Supabase Auth](https://supabase.com/docs/guides/auth). Passwords are hashed with bcrypt before storage — never stored, seen or logged in plain form. Google sign-in is available, in which case no password touches CalculatorAI at all. Sessions use secure, http-only cookies.

## Payments

CalculatorAI runs no payment form and never sees a card number. Billing goes through **[Stripe](https://stripe.com/docs/security)** (PCI-DSS Level 1). Card details are entered on Stripe's own checkout; CalculatorAI receives only a token saying "this customer is subscribed".

## What the AI does with your data

The assistant can talk about your portfolio value, your win rate, your overdue invoices — so the question deserves a complete answer:

- **It sees your data only when you ask.** Each message assembles a compact snapshot of *your* data — protected by the same row-level security — and passes it to the model to compute that answer. Nothing sits watching your account.
- **No cross-user access**, in either direction.
- **It is not trained on your data.** The assistant runs on **[Anthropic's Claude](https://www.anthropic.com/)** via the business API; under Anthropic's terms, API inputs and outputs are **not used to train their models**. CalculatorAI trains no model of its own.

References: [Anthropic Privacy Center](https://privacy.anthropic.com/) · [Anthropic Privacy Policy](https://www.anthropic.com/legal/privacy).

## Connected accounts are read-only

Linking an exchange or wallet to the [Portfolio Tracker](trackers.md#portfolio-tracker) asks only for **read-only** access. Such a key can show balances; it **cannot trade, transfer or withdraw**. Wallet sync needs only a public address — no connection, no signing. CalculatorAI never takes custody of funds and has no ability to move them.

## What is never done

- Your data is never **sold**, and never shared with advertisers or data brokers.
- Entries are never read for any purpose beyond providing the service (or supporting you when you ask).
- Personal or financial values never go into URLs, analytics events or third-party trackers.

## You stay in control

- **Export anytime, free**, on every tier.
- **Delete anytime** — removed items disappear from view immediately and are purged on a rolling schedule; whole-account deletion is available.
- **Read-only after a trial ends** — expiry limits new items, it never deletes existing ones.

Full detail: [Privacy Policy](https://calculatorai.app/legal/privacy) · [Terms](https://calculatorai.app/legal/terms) · [Cookie Policy](https://calculatorai.app/legal/cookies).

## Reporting a vulnerability

If you believe you've found one, email through the [contact page](https://calculatorai.app/support/contact) with details and steps to reproduce, and allow a reasonable window to fix it before public disclosure. Responsible disclosure is genuinely appreciated. See [SECURITY.md](../SECURITY.md).

## An honest note

No online service — this one included — can promise it is impossible to breach; anyone claiming otherwise isn't being straight with you. What can be promised: the same battle-tested, independently audited infrastructure that fintechs rely on (Supabase, Stripe, Vercel, Anthropic), data encrypted and isolated to you, never sold, never used to train AI, exportable and deletable whenever you want. If these practices change, this page changes with them.

---

*Back to the [documentation index](../README.md) · [AI assistant](ai-assistant.md) · [Architecture](architecture.md)*
