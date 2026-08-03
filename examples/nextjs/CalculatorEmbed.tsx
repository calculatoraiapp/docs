'use client'

import { useEffect, useRef } from 'react'

const SITE = 'https://calculatorai.app'

export type EmbedLocale = 'en' | 'ru' | 'es' | 'de' | 'fr' | 'it' | 'pt' | 'ja' | 'tr' | 'zh'
export type EmbedTheme = 'light' | 'dark' | 'auto'

export interface CalculatorEmbedProps {
  /** Any slug from docs/calculators.md — e.g. 'mortgage-calculator'. */
  slug: string
  /** Used for the iframe title and the credit line. */
  title?: string
  lang?: EmbedLocale
  /** 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'CHF' | 'JPY' | 'PLN' | 'INR' | 'BRL'. Omit to follow the visitor's region. */
  currency?: string
  theme?: EmbedTheme
  /** Container max width in px. ~1600 gets the two-column desktop layout. */
  maxWidth?: number
  /** Render the attribution link below the frame. */
  credit?: boolean
}

interface HeightMessage {
  type: 'calculatorai:embed:height'
  slug: string
  height: number
}

/**
 * CalculatorAI embed for the Next.js App Router.
 *
 * Must be a client component — it listens for postMessage and reads layout.
 * Import it from a server page directly; 'use client' above is enough.
 *
 * Guide: https://github.com/calculatoraiapp/docs/blob/main/docs/embed-widget.md
 */
export default function CalculatorEmbed({
  slug,
  title = 'Calculator',
  lang,
  currency,
  theme,
  maxWidth = 1600,
  credit = true,
}: CalculatorEmbedProps) {
  const frameRef = useRef<HTMLIFrameElement>(null)

  const query = new URLSearchParams()
  if (lang && lang !== 'en') query.set('lang', lang)
  if (currency) query.set('currency', currency)
  if (theme && theme !== 'light') query.set('theme', theme)
  const qs = query.toString()
  const src = `${SITE}/embed/${slug}${qs ? `?${qs}` : ''}`

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    const onMessage = (e: MessageEvent) => {
      if (e.origin !== SITE) return
      const d = e.data as HeightMessage | undefined
      if (!d || d.type !== 'calculatorai:embed:height' || d.slug !== slug) return
      if (d.height > 0) frame.style.height = `${d.height}px`
    }

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

  const wrapStyle = { maxWidth: `${maxWidth}px`, margin: '0 auto' }
  const frameStyle = { border: '1px solid #e5e7eb', borderRadius: 16, width: '100%', minWidth: 320 }
  const creditStyle = { font: '400 13px/1.5 system-ui, sans-serif', margin: '8px 0 0', textAlign: 'right' as const }

  return (
    <div className="calculatorai-embed" style={wrapStyle}>
      <iframe
        ref={frameRef}
        src={src}
        title={`${title} — CalculatorAI`}
        width="100%"
        height="720"
        style={frameStyle}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      {credit && (
        <p style={creditStyle}>
          <a href={`${SITE}/calculators`} target="_blank" rel="noopener noreferrer">
            {title} by CalculatorAI
          </a>
        </p>
      )}
    </div>
  )
}
