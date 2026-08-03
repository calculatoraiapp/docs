# Integration examples

Working, copy-pasteable integrations of the [CalculatorAI embed widget](../docs/embed-widget.md). All MIT licensed — take them, change them, ship them.

| Folder | Stack | Notes |
|---|---|---|
| [`plain-html/`](plain-html/index.html) | Static HTML | One file. Open it in a browser and it works. |
| [`react/`](react/CalculatorEmbed.jsx) | React 18+ | Hooks, listener cleanup on unmount. |
| [`nextjs/`](nextjs/CalculatorEmbed.tsx) | Next.js App Router | Typed, `'use client'`, importable from a server page. |
| [`vue/`](vue/CalculatorEmbed.vue) | Vue 3 | Single-file component, `<script setup>`. |
| [`wordpress/`](wordpress/calculatorai-shortcode.php) | WordPress | A shortcode plugin plus its front-end script. |

## The common shape

Every example does the same three things:

1. **Frame** `https://calculatorai.app/embed/<slug>` with optional `lang`, `currency` and `theme` query parameters.
2. **Listen** for `calculatorai:embed:height` and set the iframe height — the widget measures itself, so the frame always fits its content and never shows an inner scrollbar. **Always check `e.origin`.**
3. **Send** `calculatorai:embed:viewport` on scroll and resize, throttled with `requestAnimationFrame`, so the widget's inputs column can stay in view while results scroll.

## Getting the pieces

- **Slugs** — the [calculator index](../docs/calculators.md), all 75 of them.
- **Options** — [`lang`, `currency`, `theme` and container width](../docs/embed-widget.md#3-options).
- **A generated snippet** — the visual builder at <https://calculatorai.app/embed>.

## React usage

```jsx
import CalculatorEmbed from './CalculatorEmbed'

export default function MortgagePost() {
  return (
    <article>
      <h1>How much house can you actually afford?</h1>
      <p>…</p>
      <CalculatorEmbed slug="mortgage-calculator" title="Mortgage Calculator" theme="auto" />
    </article>
  )
}
```

## WordPress usage

Copy both files in [`wordpress/`](wordpress/) into `wp-content/plugins/calculatorai-embed/`, activate the plugin, then in any post or page:

```
[calculatorai slug="mortgage-calculator"]
[calculatorai slug="compound-interest-calculator" lang="es" currency="EUR" theme="auto" width="1600"]
```

## One thing that catches everyone

The calculator's desktop two-column layout switches on at **1366px**, and inside an iframe that media query measures the **iframe**, not the visitor's screen. A widget in a 900px column renders the compact tabbed layout on a 27-inch monitor. Give the container ~1600px if you want the desktop layout; anything down to 320px works fine, it just stacks.

---

*[Embed guide](../docs/embed-widget.md) · [All calculators](../docs/calculators.md) · [Documentation index](../README.md)*
