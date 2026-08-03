---
title: Embed a free calculator widget on your website
description: Put any CalculatorAI calculator on your own site with one line of HTML. Free, no API key, 10 languages, auto-resizing.
---

# Embed a calculator widget on your website

Every calculator on [CalculatorAI](https://calculatorai.app) can live on **someone else's** site — a blog post explaining mortgages, an agency page, a course, a broker's help centre, a company intranet.

**It takes one line of code, it costs nothing, and it works on any platform that lets you paste HTML.** There is nothing to install, no account to create, no API key to request, and nothing to approve.

- **Visual builder:** <https://calculatorai.app/embed> — pick a calculator, set the options, copy the snippet.
- **Every available widget:** the [calculator index](calculators.md).

---

## 1. The URL

```
https://calculatorai.app/embed/<slug>
```

`<slug>` is any calculator slug — `mortgage-calculator`, `compound-interest-calculator`, `roi-calculator`, `bmi-calculator`, and [every other one in the index](calculators.md).

That URL is a complete, self-contained calculator page designed to be framed. Open it directly in a browser to preview exactly what your readers will see.

## 2. The minimal snippet

```html
<iframe
  src="https://calculatorai.app/embed/mortgage-calculator"
  title="Mortgage Calculator — CalculatorAI"
  width="100%"
  height="720"
  style="border:1px solid #e5e7eb;border-radius:16px;min-width:320px"
  loading="lazy"
  referrerpolicy="strict-origin-when-cross-origin"
></iframe>
```

This works immediately. It has one weakness — a fixed height — which the [full snippet](#4-the-full-snippet-recommended) below solves.

## 3. Options

All options are query parameters on the embed URL.

| Parameter | Values | Default | What it does |
|---|---|---|---|
| `lang` | `en` `ru` `es` `de` `fr` `it` `pt` `ja` `tr` `zh` | `en` | Widget UI language. Omit for English. |
| `currency` | `USD` `EUR` `GBP` `CAD` `AUD` `CHF` `JPY` `PLN` `INR` `BRL` | visitor's region | Pins the currency. Omit to let each visitor's own region decide. |
| `theme` | `light` `dark` `auto` | `light` | `auto` follows the reader's OS colour scheme. |

```
https://calculatorai.app/embed/mortgage-calculator?lang=es&currency=EUR&theme=auto
```

**Why `auto` exists:** a cross-origin iframe takes no styling from its parent, so a widget cannot see that your page is in dark mode. `theme=auto` makes it follow the reader's device setting instead, which is what a dark-mode-aware host page wants.

### Width — the one setting that isn't a URL parameter

Width is set on **your** container, not on the widget:

```html
<div class="calculatorai-embed" style="max-width:1600px;margin:0 auto">…</div>
```

It matters more than it looks. The calculator's desktop two-column layout switches on at **1366px**, and inside an iframe that media query measures the **iframe**, not the visitor's screen. A widget in a narrower box renders the compact tabbed layout even on a large monitor — correct responsive behaviour that surprises everyone the first time.

- Want the full desktop layout? Give the container **≥ 1600px** (the default). Exactly 1366 is not enough — the frame loses a couple of pixels to its border and ~15px to a scrollbar on first paint, and lands back on the tablet layout.
- Narrower column? Anything down to **320px** works; the widget just stacks, like the site does on phones.

### There is no `height` option, on purpose

The widget measures itself and reports its height to your page (see below), so any value you pick is overwritten a few hundred milliseconds later. A height field only ever let someone pin a value that produced an inner scrollbar and a half-cropped calculator. Set `height="720"` as the pre-measurement fallback and let the script take over.

## 4. The full snippet (recommended)

This is what the [builder](https://calculatorai.app/embed) generates. It adds two things: **auto-resize**, so the widget always grows to fit its content, and **viewport forwarding**, so the inputs column can stay in view while results scroll.

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

<script>
  (function () {
    var SITE = 'https://calculatorai.app'
    var SLUG = 'mortgage-calculator'
    var f = document.querySelector('.calculatorai-embed iframe[src^="' + SITE + '/embed/' + SLUG + '"]')
    if (!f) return

    // 1. The widget tells us how tall it needs to be.
    window.addEventListener('message', function (e) {
      if (e.origin !== SITE) return
      var d = e.data
      if (!d || d.type !== 'calculatorai:embed:height' || d.slug !== SLUG) return
      if (d.height > 0) f.style.height = d.height + 'px'
    })

    // 2. We tell the widget where it sits in the reader's viewport.
    var queued = false
    function send() {
      queued = false
      if (!f.contentWindow) return
      var r = f.getBoundingClientRect()
      f.contentWindow.postMessage(
        { type: 'calculatorai:embed:viewport', slug: SLUG, top: r.top, viewport: window.innerHeight },
        SITE
      )
    }
    function schedule() {
      if (queued) return
      queued = true
      window.requestAnimationFrame(send)
    }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    f.addEventListener('load', send)
    schedule()
  })()
</script>
```

## 5. The postMessage protocol

Two message types, both namespaced so they can't collide with other widgets on your page.

### Widget → host: height

```js
{ type: 'calculatorai:embed:height', slug: 'mortgage-calculator', height: 1042 }
```

Sent on load and whenever the content grows or shrinks (a result panel opening, a breakdown expanding). Always verify `e.origin === 'https://calculatorai.app'` before trusting it — the snippet above does.

### Host → widget: viewport position

```js
{ type: 'calculatorai:embed:viewport', slug: 'mortgage-calculator', top: -320, viewport: 900 }
```

`top` is the iframe's `getBoundingClientRect().top`; `viewport` is `window.innerHeight`.

This one is optional but worth sending. Because the frame is sized to its content it **never scrolls itself**, so `position: sticky` inside it has nothing to stick to, and the scroll that actually happens belongs to a document the widget cannot read across origins. Forwarding your scroll position is the only way the sticky inputs column can work inside an embed.

Throttle it with `requestAnimationFrame` — scroll events fire far faster than a repaint needs.

## 6. Framework examples

Complete, copy-pasteable files live in [`examples/`](../examples/):

| File | Stack |
|---|---|
| [`examples/plain-html/index.html`](../examples/plain-html/index.html) | Static HTML |
| [`examples/react/CalculatorEmbed.jsx`](../examples/react/CalculatorEmbed.jsx) | React (hooks, cleanup on unmount) |
| [`examples/nextjs/CalculatorEmbed.tsx`](../examples/nextjs/CalculatorEmbed.tsx) | Next.js App Router, typed |
| [`examples/vue/CalculatorEmbed.vue`](../examples/vue/CalculatorEmbed.vue) | Vue 3 SFC |
| [`examples/wordpress/calculatorai-shortcode.php`](../examples/wordpress/calculatorai-shortcode.php) | WordPress shortcode plugin |

WordPress in one line, once the snippet plugin is installed:

```
[calculatorai slug="mortgage-calculator" lang="en" currency="USD" theme="auto" width="1600"]
```

## 7. What's inside a widget — and what isn't

**Included:** the calculator itself — the same math, the same instant results, the same breakdown, in the language and currency you chose.

**Deliberately excluded:** everything that belongs to a CalculatorAI *account* — PDF reports, saving to history, favourites, screenshot export, scenario comparison, the AI chat, the hand-off buttons into the trackers. A widget can't sign anyone in, so offering those would only produce dead ends. Readers who want them follow the CalculatorAI link under the widget and get the full tool on the site.

## 8. Terms, in plain words

- **Free for any website, commercial ones included.** No signup, no key, no cap on how many calculators you embed.
- **It keeps itself up to date.** You paste the snippet once; improvements ship to your page on their own.
- **The CalculatorAI credit stays visible** — the one inside the widget and the link beneath it. That is the whole price.
- **Don't** modify the snippet to remove attribution, hide the credit with CSS, or crop the frame so parts are cut off. Sites that do lose access.

### A note on the two links

The snippet contains two links, doing two different jobs. The brand line **inside** the iframe belongs to CalculatorAI's document and earns referral clicks — a search engine attributes it to us, not to you. The caption **below** the iframe is a plain anchor in **your** markup; that is the part that reads as your site linking out.

Its anchor text is branded and identical for everybody on purpose. Distributing widgets whose links carry keyword-stuffed, per-site anchor text is a documented link scheme, and the penalty would land on CalculatorAI, not on the sites that embedded it. If you'd rather not link out at all, remove the caption paragraph and keep the iframe — the in-frame credit is the part that must stay.

## 9. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Widget shows the compact tabbed layout on desktop | Container narrower than ~1600px — the breakpoint measures the *iframe* | Widen the container, or accept the tabbed layout |
| Inner scrollbar, content cut off | The resize script isn't running | Check the `<script>` is on the page and the `src` selector matches your URL exactly, query string included |
| Height never updates | `e.origin` check failing, or `slug` mismatch | Origin must be exactly `https://calculatorai.app`; `SLUG` must match the URL path |
| Sticky inputs column doesn't stick | Viewport messages aren't being sent | Add the `scroll` / `resize` listeners from part 4 |
| Blank frame | Content blocker, or a CSP on your site | Allow `https://calculatorai.app` in `frame-src` |
| Widget in the wrong language | `lang` not set | Add `?lang=de` — without it the widget renders English |

Still stuck? [Open an issue](https://github.com/calculatoraiapp/docs/issues) or use the [contact page](https://calculatorai.app/support/contact).

---

*Back to the [documentation index](../README.md) · Browse [every calculator](calculators.md) · Build a snippet at [calculatorai.app/embed](https://calculatorai.app/embed)*
