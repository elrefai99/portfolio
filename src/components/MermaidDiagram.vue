<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  code: string
  filename?: string
}>()

// Stays empty during SSG so crawlers and no-JS clients get the <pre> source
// fallback; the diagram is rendered client-side only.
const svg = ref('')

onMounted(async () => {
  try {
    const { default: mermaid } = await import('mermaid')
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'neutral',
    })
    const id = `mermaid-${Math.random().toString(36).slice(2)}`
    const { svg: rendered } = await mermaid.render(id, props.code)
    svg.value = rendered
  } catch (error) {
    console.error('Mermaid render failed:', error)
  }
})
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
    <div v-if="svg" class="mermaid-diagram flex justify-center overflow-x-auto p-4" v-html="svg" />
    <pre
      v-else
      class="overflow-x-auto p-4 text-sm leading-7 text-gray-700 dark:text-gray-300"
    ><code>{{ code }}</code></pre>
  </div>
</template>

<style scoped>
.mermaid-diagram :deep(svg) {
  max-width: 100%;
  height: auto;
}
</style>
