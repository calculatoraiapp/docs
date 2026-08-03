---
title: CalculatorAI FAQ
description: Short answers about embedding calculators, pricing, the AI, data ownership, languages and connected accounts.
---

# FAQ

## Embedding

**Can I put a CalculatorAI calculator on my website?**
Yes — any calculator in the [index](calculators.md), on any site including commercial ones. One line of HTML, no account, no API key, no approval, no fee. [Full guide](embed-widget.md).

**What does it cost?**
Nothing. The condition is that the CalculatorAI credit stays visible — the brand line inside the widget and the link beneath it.

**Do I need to maintain it?**
No. You paste the snippet once; improvements ship to your page on their own.

**Can I change the language or currency?**
Yes — `?lang=` and `?currency=` on the embed URL. Ten languages, ten pinned currencies, or let each visitor's own region decide. [Options table](embed-widget.md#3-options).

**Why does my embed look like the mobile layout on desktop?**
Because media queries inside an iframe measure the **iframe**, not the screen. Give the container ~1600px for the two-column desktop layout. [More](embed-widget.md#width--the-one-setting-that-isnt-a-url-parameter).

**Can I embed the QR code generator too?**
Yes — slug `qr-code-generator`, same snippet and options. Your readers get the full generator including PNG and vector SVG download, with no account and no watermark. Dynamic (tracked) codes are the one thing left out, because they need a short link hosted on our domain and an account to own it. [Details](embed-widget.md#9-the-qr-code-generator-widget).

**What about the invoice generator and the other document tools?**
Not yet. Their PDF is rendered on a server, and a widget on someone else's page has no ceiling on how often that gets called. They become embeddable once the render moves into the browser — the same property that makes the calculators and the QR generator free to hand out.

**Is there a public API?**
No. Embedding is the supported integration path.

**Can I remove the attribution link under the widget?**
You can drop the caption paragraph if you'd rather not link out. The credit **inside** the widget must stay. Modifying the snippet to strip attribution, hiding it with CSS or cropping the frame ends access.

## Pricing

**Is it free?**
The calculators, the document generators and the trackers in demo mode are free with no account. A free signed-in account keeps working forever with daily caps. Pro is **$14.99/month** or **$119/year**. [Details](pricing-and-limits.md).

**Is there a trial, and does it need a card?**
Every new account gets **30 days of full Pro, free, with no credit card** — so there is nothing to auto-charge. When it ends the account drops to Free and everything created during the trial stays visible and exportable.

**What happens to my data if I stop paying?**
Nothing is deleted. Expiry limits creating *new* items; existing data stays visible and exportable. CSV export is free on every tier.

**Are generated documents watermarked?**
No — never, on any plan. Invoices, quotes, receipts, QR codes and PDF reports come out clean.

## The AI

**Which model runs it?**
[Anthropic's Claude](https://www.anthropic.com/), via the business API.

**Is my data used to train it?**
No. Under Anthropic's API terms, inputs and outputs are not used to train their models, and CalculatorAI trains no model of its own.

**Can the AI see other people's data?**
No — never, in either direction. Every query is scoped to the signed-in user by Postgres row-level security. [Details](security-and-privacy.md).

**Can it trade or move money?**
No. Exchange and wallet connections are read-only by design, and cross-tracker actions open a prefilled form for you to confirm rather than writing anything on their own.

## Data & accounts

**Can I export my data?**
Yes, as CSV, free on every tier, with no row caps.

**What happens when I delete something?**
It goes to a Trash bin you can restore from for 30 days, then it's purged. Deleting the whole account is also available.

**Do you sell data or run ad trackers?**
No, and no. Personal or financial values never enter URLs, analytics events or third-party trackers.

**Is connecting an exchange safe?**
Use a **read-only** key with trading and withdrawals disabled — that's all that's asked for. It's encrypted a second time before storage and only ever reads balances. Wallet sync needs only a public address, with no connection or signing.

## Coverage

**What languages?**
Ten: English, Russian, Spanish, German, French, Italian, Portuguese, Japanese, Turkish, Chinese.

**Is it US-only?**
No. Tax-specific calculators are US-focused where tax law demands it; everything else — mortgages, ROI, crypto, budgeting, invoices — works anywhere, in 30+ currencies.

**What is it usually used instead of?**
A spreadsheet — the Excel or Google Sheets file that started as one tab and grew into a fragile system nobody else can open. It's used *alongside* a brokerage, an exchange or wallet, and a bank account, pulling those numbers into one workspace rather than replacing them.

---

*Back to the [documentation index](../README.md) · Ask something else on the [contact page](https://calculatorai.app/support/contact)*
