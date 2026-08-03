---
title: How CalculatorAI is built
description: The stack behind CalculatorAI — Next.js, Supabase, Vercel, Stripe and Claude — and the engineering rules that keep thousands of pages fast and indexable.
---

# How it's built

[CalculatorAI](https://calculatorai.app) is a hosted product and its application source is closed. This page documents the stack and the engineering constraints it lives under — partly so integrators know what they're framing, partly because a few of these lessons cost real money to learn and are worth writing down.

## Stack

| Layer | What runs it |
|---|---|
| Framework | **Next.js** (App Router, React Server Components, partial prerendering) |
| Hosting & CDN | **[Vercel](https://vercel.com/security)** |
| Database & auth | **[Supabase](https://supabase.com/security)** — Postgres with Row Level Security, Supabase Auth |
| AI | **[Anthropic Claude](https://www.anthropic.com/)** (business API — no training on inputs) |
| Payments | **[Stripe](https://stripe.com/docs/security)** — Checkout, Customer Portal, webhooks |
| Transactional email | **[Resend](https://resend.com/)** |
| Internationalisation | **next-intl**, 10 locales, deep-merge fallback to English |
| Notifications | Web Push (service worker + VAPID) |

## Rendering: static by default

Every public page — calculators, programmatic-SEO variants, document tools, landing pages, blog, handbook — is served from the CDN as **prerendered HTML**. This is not a performance nicety; it is the difference between a page that ranks and one that doesn't.

Two rules make it hold:

**Nothing request-specific above the page content.** Reading headers, cookies or connection data anywhere in a public page tree turns the whole subtree into a per-request render, and the page silently stops being cached. It still *looks* fine in a browser — you only see it in the response headers.

**No query-param hooks inside a calculator.** Reading search params client-side opts the surrounding boundary out of prerendering, so the component renders client-only and **vanishes from the served HTML**. When this was live, calculator pages kept their heading and FAQ but lost roughly 40% of their indexable text. Query params are instead read by one tiny isolated reader that renders nothing and publishes values to a store.

A corollary that surprises people: **the pre-hydration viewport default is desktop**, and that is an SEO decision rather than a guess about the visitor. The desktop layout renders inputs *and* results; a mobile tab layout renders only the open tab. Nobody sees that state — a loader covers it — but a crawler reads exactly it.

And: **CSS-hide, never conditionally render.** Hidden content is still indexed; unrendered content is not.

### Verify, don't reason

"Partial prerender" in a build log means a route *has* a prerendered shell. It does **not** mean responses are being cached. The only proof is the response header:

```bash
curl -s -o /dev/null -D - https://calculatorai.app/<path> | grep -i x-nextjs-cache
```

`HIT` is good. `private, no-cache, no-store` means the page is rendering per request.

## Two lessons that generalise

**1. Deploy count, not traffic, can dominate an ISR bill.** Under modern partial prerendering, one page is not one cache entry — a per-segment prefetch payload is emitted per route as well, so a single page can mean eight or nine written entries. Every one is rewritten on **every deploy**, whether or not a visitor ever asks for the page. If writes vastly exceed reads, the driver is deploy frequency, and batching pushes beats any config change.

**2. Realtime subscriptions cost while idle.** A table in a Postgres logical-replication publication makes the database decode the write-ahead log continuously — a fixed cost driven by the *existence* of the subscription, not by how often the table changes. On this project one such table quietly consumed the large majority of all database time to deliver a handful of notifications. It was replaced by a visibility-aware poll for the notification bell and Web Push for anything genuinely time-critical, which costs nothing while idle.

## The embed widget

The [embeddable calculator](embed-widget.md) — [try the builder](https://calculatorai.app/embed) — is a normal route rendered for framing. Because a cross-origin iframe can neither read its parent's scroll position nor inherit its theme, the host and widget exchange two namespaced `postMessage` types — the widget reports its content height, the host forwards its viewport position. Full protocol in the [embed guide](embed-widget.md#5-the-postmessage-protocol).

One consequence worth knowing before you frame it: **CSS media queries inside an iframe measure the iframe, not the screen.** The desktop two-column layout switches on at 1366px, so a widget in a 900px column renders the compact layout on a 27-inch monitor. That is correct behaviour and the most common integration surprise.

## Data rules

- **Migrations are additive only.** No destructive schema changes.
- **Soft delete on every user-content table** — the delete button sets a timestamp, reads filter it out, the UI offers a Trash view, and a daily job hard-deletes after 30 days. User content is never hard-deleted by a button press.
- **Row Level Security on everything** — isolation is enforced by Postgres, not by application code that could be bypassed. See [security & privacy](security-and-privacy.md).
- **Export must carry every field the form collects.** An incomplete export quietly loses what the user typed.

## Internationalisation

Ten locales (`en` `ru` `es` `de` `fr` `it` `pt` `ja` `tr` `zh`) with deep-merge fallback to English. English is the default locale and serves unprefixed URLs; the other nine are path-prefixed. SEO metadata and structured data are translated for all ten — canonical plus `hreflang` on every multi-locale page, so the same calculator in ten languages is not read as duplicate content.

---

*Back to the [documentation index](../README.md) · [Embed guide](embed-widget.md) · [Security & privacy](security-and-privacy.md)*
