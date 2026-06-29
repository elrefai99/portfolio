<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

/**
 * One "floor" of the building section. Renders a reinforced-concrete slab
 * separator, a blueprint header annotation (level code / name / elevation),
 * structural side columns, and corner registration marks around the content.
 */
const props = withDefaults(defineProps<{
  level: string            // e.g. "L-00"
  name: string             // e.g. "HERO / INTRODUCTION"
  elevation?: string       // e.g. "+0.00 m"
  slab?: string            // concrete slab annotation text
  topSlab?: boolean        // draw the slab separator on top (default true)
  id?: string
}>(), {
  elevation: '',
  slab: 'RC SLAB · 300mm',
  topSlab: true,
})

const root = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  const el = root.value
  if (!el) return
  if (typeof IntersectionObserver === 'undefined') {
    el.classList.add('is-visible')
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer?.unobserve(el)
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  )
  observer.observe(el)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section ref="root" :id="props.id" class="bp-floor scroll-mt-28">
    <!-- reinforced concrete slab separator -->
    <div v-if="props.topSlab" class="bp-slab" aria-hidden="true">
      <span class="bp-slab__label bp-slab__label--left">{{ props.slab }}</span>
      <span class="bp-slab__label">↕ SECTION A–A</span>
    </div>

    <div class="bp-floor__frame">
      <!-- header annotation block -->
      <header class="bp-floor__head">
        <span class="bp-floor__level">
          <span class="bp-dot" aria-hidden="true" />
          {{ props.level }}
        </span>
        <span class="bp-floor__name">{{ props.name }}</span>
        <span v-if="props.elevation" class="bp-floor__elev">EL {{ props.elevation }}</span>
      </header>
      <div class="bp-floor__rule" aria-hidden="true" />

      <!-- content -->
      <div class="bp-floor__body relative">
        <span class="bp-corner bp-corner--tl" aria-hidden="true" />
        <span class="bp-corner bp-corner--tr" aria-hidden="true" />
        <span class="bp-corner bp-corner--bl" aria-hidden="true" />
        <span class="bp-corner bp-corner--br" aria-hidden="true" />
        <slot />
      </div>
    </div>
  </section>
</template>
