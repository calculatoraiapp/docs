<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

const SITE = 'https://calculatorai.app'

const props = defineProps({
  slug: { type: String, required: true },
  title: { type: String, default: 'Calculator' },
  lang: { type: String, default: '' },       // en ru es de fr it pt ja tr zh
  currency: { type: String, default: '' },   // USD EUR GBP … — omit to follow region
  theme: { type: String, default: '' },      // light | dark | auto
  maxWidth: { type: Number, default: 1600 },
  credit: { type: Boolean, default: true },
})

const frame = ref(null)

const src = computed(() => {
  const q = new URLSearchParams()
  if (props.lang && props.lang !== 'en') q.set('lang', props.lang)
  if (props.currency) q.set('currency', props.currency)
  if (props.theme && props.theme !== 'light') q.set('theme', props.theme)
  const qs = q.toString()
  return SITE + '/embed/' + props.slug + (qs ? '?' + qs : '')
})

const wrapStyle = computed(() => ({ maxWidth: props.maxWidth + 'px', margin: '0 auto' }))
const frameStyle = { border: '1px solid #e5e7eb', borderRadius: '16px', width: '100%', minWidth: '320px' }
const creditStyle = { font: '400 13px/1.5 system-ui, sans-serif', margin: '8px 0 0', textAlign: 'right' }

let queued = false

function onMessage(e) {
  if (e.origin !== SITE) return
  const d = e.data
  if (!d || d.type !== 'calculatorai:embed:height' || d.slug !== props.slug) return
  if (d.height > 0 && frame.value) frame.value.style.height = d.height + 'px'
}

function send() {
  queued = false
  const el = frame.value
  if (!el || !el.contentWindow) return
  const r = el.getBoundingClientRect()
  el.contentWindow.postMessage(
    { type: 'calculatorai:embed:viewport', slug: props.slug, top: r.top, viewport: window.innerHeight },
    SITE,
  )
}

function schedule() {
  if (queued) return
  queued = true
  window.requestAnimationFrame(send)
}

onMounted(() => {
  window.addEventListener('message', onMessage)
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule, { passive: true })
  schedule()
})

onBeforeUnmount(() => {
  window.removeEventListener('message', onMessage)
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
})
</script>

<template>
  <div class="calculatorai-embed" :style="wrapStyle">
    <iframe
      ref="frame"
      :src="src"
      :title="title + ' — CalculatorAI'"
      width="100%"
      height="720"
      :style="frameStyle"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      @load="send"
    />
    <p v-if="credit" :style="creditStyle">
      <a :href="SITE + '/calculators'" target="_blank" rel="noopener">
        <span>{{ title }} by CalculatorAI</span>
      </a>
    </p>
  </div>
</template>
