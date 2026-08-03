import { useEffect, useRef } from 'react'

const SITE = 'https://calculatorai.app'

/**
 * Embeds any CalculatorAI calculator.
 *
 * <CalculatorEmbed slug="mortgage-calculator" title="Mortgage Calculator" theme="auto" />
 *
 * Slugs: https://github.com/Gadzilla1995/calculatorai-docs/blob/main/docs/calculators.md
 * Guide: https://github.com/Gadzilla1995/calculatorai-docs/blob/main/docs/embed-widget.md
 */
export default function CalculatorEmbed({
  slug,
  title = 'Calculator',
  lang,          // 'en' | 'ru' | 'es' | 'de' | 'fr' | 'it' | 'pt' | 'ja' | 'tr' | 'zh'
  currency,      // 'USD' | 'EUR' | 'GBP' | … — omit to follow the visitor's region
  theme,         // 'light' (default) | 'dark' | 'auto'
  maxWidth = 1600,
  credit = true,
}) {
  const frameRef = useRef(null)

  const query = new URLSearchParams()
  if (lang && lang !== 'en') query.set('lang', lang)
  if (currency) query.set('currency', currency)
  if (theme && theme !== 'light') query.set('theme', theme)
  const qs = query.toString()
  const src = SITE + '/embed/' + slug + (qs ? '?' + qs : '')

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    // Widget → host: content height.
    const onMessage = (e) => {
      if (e.origin !== SITE) return
      const d = e.data
      if (!d || d.type !== 'calculatorai:embed:height' || d.slug !== slug) return
      if (d.height > 0) frame.style.height = d.height + 'px'
    }

    // Host → widget: viewport position, so the sticky inputs column works.
    let queued = false
    const send = () => {
      queued = false
      if (!frame.contentWindow) return
      const r = frame.getBoundingClientRect()
      frame.contentWindow.postMessage(
        { type: 'calculatorai:embed:viewport', slug, top: r.top, viewport: window.innerHeight },
        SITE,
      )
    }
    const schedule = () => {
      if (queued) return
      queued = true
      window.requestAnimationFrame(send)
    }

    window.addEventListener('message', onMessage)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    frame.addEventListener('load', send)
    schedule()

    return () => {
      window.removeEventListener('message', onMessage)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      frame.removeEventListener('load', send)
    }
  }, [slug])

  // Container width decides the layout: the desktop two-column breakpoint
  // (1366px) measures the IFRAME, not the screen. ~1600 clears it safely.
  const wrapStyle = { maxWidth: maxWidth + 'px', margin: '0 auto' }
  const frameStyle = {
    border: '1px solid #e5e7eb',
    borderRadius: 16,
    width: '100%',
    minWidth: 320,
  }
  const creditStyle = {
    font: '400 13px/1.5 system-ui, sans-serif',
    margin: '8px 0 0',
    textAlign: 'right',
  }

  return (
    <div className="calculatorai-embed" style={wrapStyle}>
      <iframe
        ref={frameRef}
        src={src}
        title={title + ' — CalculatorAI'}
        width="100%"
        height="720"
        style={frameStyle}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      {credit && (
        <p style={creditStyle}>
          <a href={SITE + '/calculators'} target="_blank" rel="noopener noreferrer">
            {title} by CalculatorAI
          </a>
        </p>
      )}
    </div>
  )
}
