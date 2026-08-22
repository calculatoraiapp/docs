# CalculatorAI — Documentation

<!-- gen:summary start -->
**[CalculatorAI](https://calculatorai.app)** is a personal financial workspace — not a directory of calculators. **75 calculators**, **11 trackers** and **14 document generators** live under one account in **10 languages**, and an AI copilot reads the numbers you actually put in.
<!-- gen:summary end -->

> *"We are building the first AI-powered platform that serves as a personal financial decisions hub for millions of people."*

This repository is the public documentation for that platform — what it does, how each number is calculated, what the AI can and cannot see, and how to **embed any calculator on your own website with one line of HTML**, for free.

> **Website:** <https://calculatorai.app> · **Embed builder:** <https://calculatorai.app/embed> · **Pricing:** <https://calculatorai.app/pricing>

---

## What it is — and what it deliberately isn't

CalculatorAI is **not a website**. It is **not a directory**. It is **not a collection of calculators**.

Those exist in abundance, and they all stop at the same place: they give you a number and forget you. You compute a mortgage payment, close the tab, and next month you start from zero — retyping the same figures into the same box, with no record that you ever asked.

CalculatorAI is a **workspace your numbers live in**:

| | |
|---|---|
| **Calculate** | the numbers that actually decide something — what a mortgage costs, whether a trade was good, what a client owes you |
| **Save & store** | every result, scenario and document, in an account only you can read |
| **Analyze** | performance over time, not a snapshot — an equity curve, a cash-flow trend, a debt-free date that moves as you pay |
| **Plan** | future milestones against your real figures, with scenarios compared side by side |
| **Import** | a paystub, a bank statement, a broker screenshot or a receipt — the AI reads the document and fills the fields |
| **Ask** | an assistant that already knows your portfolio, your trades, your budget and your overdue invoices |
| **Return** | to all of it, whenever you need, from any device |

That is the difference between a calculator and a decisions hub. A calculator answers the question you typed. A workspace remembers what you decided, notices what changed since you last looked, and tells you about it before you ask.

The [calculators](docs/calculators.md) are the doorway — free, fast, no account, embeddable anywhere. The [trackers](docs/trackers.md) and the [AI](docs/ai-assistant.md) are what makes staying worth it.

---

## Contents

| Document | What's in it |
|---|---|
| **[Embed a calculator on your site](docs/embed-widget.md)** | The one-line snippet, every option, the resize protocol, framework examples, terms of use |
| **[Calculator index](docs/calculators.md)** | Every calculator with a direct link and its embed slug, grouped by category |
| **[Trackers](docs/trackers.md)** | The long-running trackers and what each one records |
| **[Document generators](docs/documents.md)** | The business document tools (invoice, quote, PO, receipt…) |
| **[AI assistant](docs/ai-assistant.md)** | The six AI surfaces, what each one knows, and the privacy boundary |
| **[Pricing & limits](docs/pricing-and-limits.md)** | Free vs Pro, the 30-day no-card trial, exact caps |
| **[Security & privacy](docs/security-and-privacy.md)** | Encryption, row-level isolation, read-only connections, no AI training |
| **[Architecture](docs/architecture.md)** | The stack behind it and the engineering rules that keep it fast |
| **[FAQ](docs/faq.md)** | Short answers to the questions that come up most |

---

## Quick start — put a calculator on your website

Every calculator on [CalculatorAI](https://calculatorai.app) is embeddable. No account, no API key, no approval, no fee.

```html
<div class="calculatorai-embed" style="max-width:1600px;margin:0 auto">
  <iframe
    src="https://calculatorai.app/embed/mortgage-calculator"
    title="Mortgage Calculator — CalculatorAI"
    width="100%"
    height="720"
    style="border:1px solid #e5e7eb;border-radius:16px;width:100%;min-width:320px"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
  ></iframe>
  <p style="font:400 13px/1.5 system-ui,sans-serif;margin:8px 0 0;text-align:right">
    <a href="https://calculatorai.app/calculators" target="_blank" rel="noopener">Mortgage Calculator by CalculatorAI</a>
  </p>
</div>
```

Swap `mortgage-calculator` for any slug in the **[calculator index](docs/calculators.md)**. Add the auto-resize script and the language / currency / theme options from the **[embed guide](docs/embed-widget.md)**, or generate the whole snippet visually at **<https://calculatorai.app/embed>**.

Ready-made integrations live in **[`examples/`](examples/)** — plain HTML, React, Next.js, Vue and WordPress.

---

## What the platform is, in one table

<!-- gen:glance start -->
| | |
|---|---|
| Calculators | **75**, across **13 categories** |
| Trackers | **11** — Trading Journal, Portfolio Tracker, Dividend Tracker, Invoices Tracker, Expenses Tracker, QR Codes, Rental Income Tracker, Budget Tracker, Debt Payoff Tracker, Net Worth Tracker, Habit Tracker |
| Document generators | **14** — QR Code Generator, Invoice Generator, Quote Template, Receipt Generator, Credit Note Template, Purchase Order Template, Proforma Invoice, Delivery Note Template, Debit Note Template, Timesheet Template, Commercial Invoice, Expense Report, Statement of Account, Progress Billing |
| Languages | **10** — English, Russian, Chinese, Spanish, German, Italian, French, Japanese, Portuguese, Turkish |
| Price | Free tier with daily limits · **30 days of Pro on signup, no credit card, no auto-charge** · Pro **$14.99/mo** or **$119/yr** |
| Exports | CSV export of your own data is free on every tier, with no row caps |
| Read-only connections | Binance, Bybit, OKX, KuCoin, Kraken and Coinbase via API key; EVM, Solana, Bitcoin and 20+ other chains by wallet address |
| Public API | None. Calculators and the QR generator are instead **embeddable** on any site with one line of HTML, free |
| Embedding | Free for commercial sites, no key, no cap — see the [embed guide](docs/embed-widget.md) |
<!-- gen:glance end -->

---

## Who it's for

People whose money has moving parts: freelancers and contractors invoicing clients, self-employed people and small businesses, active stock and crypto traders, landlords running one property or several, startups watching runway, and anyone who wants one place for personal and business numbers instead of five spreadsheets.

It's normally used **alongside** a brokerage account, an exchange or wallet, and a bank account — pulling those numbers into one workspace rather than replacing them.

---

## About this repository

It documents a hosted product; the application source is not open. What *is* here is meant to be useful on its own:

- the complete, accurate **embed integration guide** and working code samples (MIT licensed),
- a stable, linkable **index of every calculator**,
- honest documentation of **what the AI sees** and **how data is isolated**.

Found something wrong or out of date? [Open an issue](https://github.com/calculatoraiapp/docs/issues) — documentation corrections are welcome.

**License:** code samples in [`examples/`](examples/) are MIT ([LICENSE](LICENSE)). Documentation prose is © CalculatorAI.
