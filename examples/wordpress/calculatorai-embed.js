/**
 * CalculatorAI embed — auto-resize + viewport forwarding.
 * Handles every [calculatorai] shortcode on the page, including several at once.
 *
 * MIT licensed. https://github.com/Gadzilla1995/calculatorai-docs
 */
(function () {
  'use strict'

  var wraps = document.querySelectorAll('.calculatorai-embed[data-slug]')
  if (!wraps.length) return

  var widgets = []

  Array.prototype.forEach.call(wraps, function (wrap) {
    var frame = wrap.querySelector('iframe')
    if (!frame) return
    widgets.push({
      site: wrap.getAttribute('data-site') || 'https://calculatorai.app',
      slug: wrap.getAttribute('data-slug'),
      frame: frame
    })
  })

  // Widget -> host: content height.
  window.addEventListener('message', function (e) {
    var d = e.data
    if (!d || d.type !== 'calculatorai:embed:height' || !(d.height > 0)) return
    for (var i = 0; i < widgets.length; i++) {
      var w = widgets[i]
      if (e.origin === w.site && d.slug === w.slug) {
        w.frame.style.height = d.height + 'px'
      }
    }
  })

  // Host -> widget: viewport position, so the sticky inputs column works.
  var queued = false

  function send() {
    queued = false
    for (var i = 0; i < widgets.length; i++) {
      var w = widgets[i]
      if (!w.frame.contentWindow) continue
      var r = w.frame.getBoundingClientRect()
      w.frame.contentWindow.postMessage(
        { type: 'calculatorai:embed:viewport', slug: w.slug, top: r.top, viewport: window.innerHeight },
        w.site
      )
    }
  }

  function schedule() {
    if (queued) return
    queued = true
    window.requestAnimationFrame(send)
  }

  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule, { passive: true })
  for (var i = 0; i < widgets.length; i++) {
    widgets[i].frame.addEventListener('load', send)
  }
  schedule()
})()
