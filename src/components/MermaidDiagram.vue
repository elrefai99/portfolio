<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  code: string
  filename?: string
}>()

// Stays empty during SSG so crawlers and no-JS clients get the <pre> source
// fallback; the diagram is rendered client-side only.
const svg = ref('')

// High-contrast, warm-neutral palettes. Mermaid's stock dark/neutral themes
// render signal + label text too dim against the translucent shell, so we drive
// every text/line variable explicitly for both schemes.
const darkThemeVariables = {
  background: 'transparent',
  primaryColor: '#2a2824',
  primaryBorderColor: '#6f6a5c',
  primaryTextColor: '#ece7db',
  secondaryColor: '#35322b',
  tertiaryColor: '#35322b',
  lineColor: '#b4ad9c',
  textColor: '#ece7db',
  actorBkg: '#2a2824',
  actorBorder: '#6f6a5c',
  actorTextColor: '#ece7db',
  actorLineColor: '#b4ad9c',
  signalColor: '#b4ad9c',
  signalTextColor: '#ece7db',
  labelBoxBkgColor: '#2a2824',
  labelBoxBorderColor: '#6f6a5c',
  labelTextColor: '#ece7db',
  loopTextColor: '#ece7db',
  noteBkgColor: '#3b372f',
  noteTextColor: '#ece7db',
  noteBorderColor: '#6f6a5c',
  activationBkgColor: '#3b372f',
  activationBorderColor: '#6f6a5c',
  sequenceNumberColor: '#1a1815',
} as const

const lightThemeVariables = {
  background: 'transparent',
  primaryColor: '#f4f1ea',
  primaryBorderColor: '#c9c1af',
  primaryTextColor: '#2b2822',
  secondaryColor: '#eae5d9',
  tertiaryColor: '#eae5d9',
  lineColor: '#8f8875',
  textColor: '#2b2822',
  actorBkg: '#f4f1ea',
  actorBorder: '#c9c1af',
  actorTextColor: '#2b2822',
  actorLineColor: '#8f8875',
  signalColor: '#8f8875',
  signalTextColor: '#2b2822',
  labelBoxBkgColor: '#f4f1ea',
  labelBoxBorderColor: '#c9c1af',
  labelTextColor: '#2b2822',
  loopTextColor: '#2b2822',
  noteBkgColor: '#efe9dc',
  noteTextColor: '#2b2822',
  noteBorderColor: '#c9c1af',
  activationBkgColor: '#efe9dc',
  activationBorderColor: '#c9c1af',
  sequenceNumberColor: '#f8f6f0',
} as const

type MermaidModule = typeof import('mermaid')['default']
let mermaidMod: MermaidModule | null = null
let observer: MutationObserver | null = null
let lastDark: boolean | null = null

const renderDiagram = async () => {
  try {
    if (!mermaidMod) {
      mermaidMod = (await import('mermaid')).default
    }
    const isDark = document.documentElement.classList.contains('dark')
    lastDark = isDark
    mermaidMod.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: 'base',
      themeVariables: isDark ? darkThemeVariables : lightThemeVariables,
    })
    const id = `mermaid-${Math.random().toString(36).slice(2)}`
    const { svg: rendered } = await mermaidMod.render(id, props.code)
    svg.value = rendered
  } catch (error) {
    console.error('Mermaid render failed:', error)
  }
}

onMounted(() => {
  renderDiagram()
  // Re-render on the dark/light toggle so a diagram is never left low-contrast.
  observer = new MutationObserver(() => {
    if (document.documentElement.classList.contains('dark') !== lastDark) {
      renderDiagram()
    }
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div
    class="overflow-hidden rounded-xl border border-slate-300/30 bg-white/74 shadow-[0_18px_48px_rgba(148,163,184,0.18)] dark:border-white/14 dark:bg-white/8 dark:shadow-[0_18px_48px_rgba(0,0,0,0.34)]"
  >
    <div
      class="flex items-center justify-between gap-4 border-b border-slate-300/30 px-4 py-3 text-xs text-gray-500 dark:border-white/10 dark:text-white/70"
    >
      <span class="font-mono">{{ filename || 'diagram' }}</span>
      <span class="rounded-full bg-black/5 px-2 py-1 font-mono uppercase dark:bg-white/10">mermaid</span>
    </div>
    <!-- min-height reserves space so the client-side <pre> → <svg> swap doesn't shift the page (CLS) -->
    <div class="mermaid-body flex min-h-64 items-center justify-center">
      <div v-if="svg" class="mermaid-diagram w-full overflow-x-auto p-4" v-html="svg" />
      <pre
        v-else
        class="w-full overflow-x-auto p-4 text-sm leading-7 text-gray-700 dark:text-gray-300"
      ><code>{{ code }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.mermaid-diagram :deep(svg) {
  max-width: 100%;
  height: auto;
}
</style>
