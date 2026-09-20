---
title: CalculatorAI trackers
description: Long-running trackers — trading journal, portfolio, expenses, budget, debt payoff, rental income, invoices, habits and QR codes — under one account.
---

# Trackers

Where a calculator answers one question now, a **tracker** remembers. They all share one account, one Pro tier and one bill. Every tracker: multi-currency, CSV export free on any plan, soft-delete with a Trash bin, and a demo mode so you can see the full UI before signing up.

Index page: **<https://calculatorai.app/trackers>**

<!-- gen:trackers start -->
| Tracker | URL | What it records |
|---|---|---|
| [Trading Journal](https://calculatorai.app/trading-journal) | `/trading-journal` | Log trades across crypto, forex, stock, futures, options, swing, scalping and sports betting. Live stats, win rate, P&L curve. |
| [Portfolio Tracker](https://calculatorai.app/portfolio-tracker) | `/portfolio-tracker` | Free live portfolio tracker for stocks, crypto & ETFs. Auto-import, real-time prices, and smart AI insights in one place. |
| [Dividend Tracker](https://calculatorai.app/dividend-tracker) | `/dividend-tracker` | Forecast monthly dividend income, track yield-on-cost, and project compounded growth. |
| [Business P&L Tracker](https://calculatorai.app/profit-loss-tracker) | `/profit-loss-tracker` | Live profit-and-loss for a small business: revenue by channel and product, cost of goods, expenses, margins, sales tax owed and goals. |
| [Subscription Tracker](https://calculatorai.app/subscription-tracker) | `/subscription-tracker` | Every subscription in one place: what you pay per month and year, the next charge, trials about to convert, price rises, and what to cancel. |
| [Invoices Tracker](https://calculatorai.app/invoices) | `/invoices` | Issue, send, track paid / overdue invoices, and project receivables. |
| [Income & Expense Tracker](https://calculatorai.app/expenses) | `/expenses` | Every income and expense in one ledger — categories with auto-rules, receipts, budgets, statement import and export for accounting. |
| [QR Codes](https://calculatorai.app/qr-codes) | `/qr-codes` | Manage your dynamic QR codes and track scans — devices, locations and trends. |
| [Rental Income Tracker](https://calculatorai.app/rental-income) | `/rental-income` | Per-property rental cash-flow, occupancy, expenses, repairs and ROI. |
| [Budget Tracker](https://calculatorai.app/budget-tracker) | `/budget-tracker` | Zero-based budgeting, envelopes, sinking funds — built to keep you on plan. |
| [Debt Payoff Tracker](https://calculatorai.app/debt-payoff-tracker) | `/debt-payoff-tracker` | Snowball / avalanche schedules, payoff dates, interest saved. |
| [Savings Goals](https://calculatorai.app/savings-goals-tracker) | `/savings-goals-tracker` | Set targets, auto-allocate per pay cycle, visualise progress. |
| [Net Worth Tracker](https://calculatorai.app/net-worth-tracker) | `/net-worth-tracker` | Everything you own minus everything you owe, read live from your other trackers. Any currency, monthly history, FIRE plan. |
| [Habit Tracker](https://calculatorai.app/habit-tracker) | `/habit-tracker` | Free habit tracker for daily routines, streaks, weekly consistency and simple progress reviews. |
<!-- gen:trackers end -->

Every tracker also has a **public methodology handbook** explaining how each number is calculated and what the tool deliberately does not model — no login required. Index: <https://calculatorai.app/handbook>.

---

## Trading Journal

One unified journal covering **every asset class**: crypto, forex, stock, futures, options, swing and scalp — plus sports betting on the same engine. Not eight separate trackers; one workspace with a type discriminator, so the analytics layer is shared.

- **Trades** — the full ledger, filterable by symbol, side, account, strategy, status.
- **Dashboard** — equity curve, win/loss donut, win rate, profit factor, max drawdown, average win/loss, R-multiple, expectancy, longest streaks, Kelly criterion, and a calendar of daily P&L. Filter by period, account or strategy.
- **Setup** — your rule book: strategies library, ticker registry (with point value for futures), pre-trade checklist, monthly profit goals, and a one-click link to publish your stats publicly.
- **Accounts** — live, demo and prop-firm accounts with starting balance, deposits, withdrawals and per-account analytics.

Add trades via Quick Add from anywhere, a CSV/MT4 broker import, a **screenshot of your trade read by AI**, or by describing the trade to the assistant in plain language. The full editor records partial entries and exits, risk amount, MAE/MFE, market regime, emotional state, mistakes, screenshots and tags — it's built to find the patterns behind the numbers, not just store them.

Public methodology: <https://calculatorai.app/handbook/trading-journal>

## Portfolio Tracker

Position-level tracking of what you **own** — stocks, ETFs, crypto, indices, commodities, or anything priced by hand.

- **Live prices** for stocks, ETFs, crypto, indices and commodities, cached server-side; a **manual price** override for anything private or illiquid.
- **Annualized return (XIRR)** — money-weighted, so positions held for different lengths of time compare fairly.
- **Benchmark comparison** — overlay S&P 500, Nasdaq, Bitcoin or Gold on your value chart.
- **Tax report** — realized gains with FIFO / LIFO / HIFO lot accounting, short vs long-term split, per-year summary, CSV for your accountant.
- **Dividend forecast & calendar** — forward annual income and a month-by-month payment calendar.
- **Watchlist** and **price alerts** with push notification when a target is crossed.
- **Wallet sync** — paste a public address (Ethereum + ~20 EVM chains, Solana, Bitcoin, Tron, Aptos, Sui, Stellar, Litecoin, Dogecoin, Starknet). Read-only, no signing, spam filtered.
- **Exchange sync** — a **read-only** API key from Binance, Bybit, OKX, KuCoin, Kraken or Coinbase. Trading and withdrawals must be off; the key is encrypted at rest and only ever reads balances.
- **Multi-currency** — each trade recorded in the currency you paid in, with that day's FX locked to the cost basis.
- **Share** — a public, read-only link showing only the figures you choose, revocable in one click.

Public methodology: <https://calculatorai.app/handbook/portfolio-tracker>

## Expenses Tracker

A personal ledger of income and spending. Accounts (cash, cards, banks) with opening and live balances, cross-currency transfers that don't count as income or expense, per-category budgets, and recurring subscriptions that materialise their own occurrences.

Import in one button, three ways: a **bank or card statement PDF** (any bank, any language, including digitally-signed statements), a **receipt photo**, or a **CSV with AI column mapping**.

Public methodology: <https://calculatorai.app/handbook/expenses-tracker>

## Budget Tracker

Zero-based budgeting plus 50/30/20 allocation. Monthly planner, categories grouped into Needs / Wants / Savings & Debt / Income, a calendar of income and due bills, and rollover of what you under- or over-spent.

Two things make it behave like a real budget rather than a spreadsheet: **actuals fill themselves in** from the Expenses Tracker (a figure you type yourself is never overwritten), and **recurring lines get their own row in each month**, so recording August doesn't disturb September.

Public methodology: <https://calculatorai.app/handbook/budget-tracker>

## Debt Payoff Tracker

Every balance in one place with a real debt-free date. Avalanche, snowball or your own order — all three costed on the same money, so the choice between "cheapest" and "most motivating" is a number rather than an argument.

The projection is a month-by-month simulation with **rolling payments**: when a debt is cleared, its minimum joins the attack on the next one. If the budget doesn't cover the interest, the tracker says so instead of projecting a date that will never arrive. What-if scenarios test a one-off payment, a balance transfer (fee included, because that's what decides it) or a consolidation loan without saving anything.

Public methodology: <https://calculatorai.app/handbook/debt-payoff>

## Rental Income Tracker

The landlord's books: a card per unit with rent, mortgage, purchase price, current value, tenant and lease dates, plus per-property cash flow, cap rate and a lease countdown. Portfolio-wide net cash flow, occupancy, rent roll and blended cap rate are **derived from what you log, never typed in**.

Public methodology: <https://calculatorai.app/handbook/rental-income>

## Invoices Tracker

Bookkeeping for invoices you've **issued** (the [Invoice Generator](documents.md) creates them; this tracks them). Total billed / paid / outstanding, collections rate, overdue exposure, average days to pay, an interactive payment calendar, a three-month forward cash-flow projection, and AI-drafted follow-ups whose tone matches how late the invoice actually is.

## Habit Tracker

Active habits with cadence, weekly target, icon and colour; seven-day check-in grid; weekly completion rate and streak signals. Pro adds an **AI habit coach** that knows your habits and streaks, flags what's slipping and suggests the next small step.

Public methodology: <https://calculatorai.app/handbook/habit-tracker>

## QR Codes Tracker

The management side of the [QR generator](https://calculatorai.app/qr-code-generator). Static codes are one-and-done downloads; **dynamic** codes route through a short link you own, so they can be edited and measured after printing.

Repoint any code to a new URL without reprinting, pause or retire it, and read scan analytics: totals, a 30-day trend, and breakdowns by country, device and browser. **Privacy-first** — scans record coarse location and device class only; the raw IP is never stored, just an irreversible fingerprint.

Pro adds the layer you need once there are more than a handful of codes:

- **Folders and tags** — one folder per code, filed from the sidebar; tags cut across folders. Personal to your account: there are no team seats or roles here.
- **Campaign parameters (UTM)** — attached to the destination at the moment someone scans, so a printed code shows up in your own analytics as its own source instead of as direct traffic. A parameter already in your URL is never overwritten.
- **Your own short-link domain** — point a hostname you own at the redirect with one DNS record and new codes print as `qr.yourcompany.com/AbC123`. Codes already printed keep the hostname they were printed with; nothing on paper is ever silently moved.

**Nothing on Pro is metered:** no cap on dynamic codes, no cap on scans, no cap on how often you re-point a code.

---

## How trackers connect to calculators

The link runs both ways, by design:

- **Forward** — a tracker hands its real numbers to a calculator. The Portfolio's dividends and tax tabs open passive-income and capital-gains calculators pre-populated with your holdings; the Journal's dashboard opens compound-interest and risk-reward planners against your actual balance.
- **Reverse** — a calculator result can be saved into a tracker. Stock, crypto, dividend, staking and options calculators carry a "Save to Portfolio" button; debt, rental, invoice and journal rows can be handed to the Expenses ledger as a **prefilled entry you confirm** — nothing is created behind your back.

---

*Back to the [documentation index](../README.md) · [Calculators](calculators.md) · [Documents](documents.md) · [AI assistant](ai-assistant.md)*
