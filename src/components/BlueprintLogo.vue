<script setup lang="ts">
// Architectural monogram mark: drafting square + "M" truss/roofline.
// Inherits color via currentColor (blueprint blue in nav).
withDefaults(defineProps<{ size?: number }>(), { size: 22 })
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 32 32"
    fill="none"
    class="bp-logo"
    aria-hidden="true"
    role="img"
  >
    <!-- drafting frame -->
    <rect x="2.5" y="2.5" width="27" height="27" stroke="currentColor" stroke-width="1" opacity="0.5" />
    <!-- corner registration ticks -->
    <path d="M2.5 7 H6 M2.5 25 H6 M26 2.5 V6 M26 25.5 V29" stroke="currentColor" stroke-width="1" opacity="0.5" />
    <!-- "EL" monogram drawn as structural linework -->
    <g stroke="currentColor" stroke-width="1.7" stroke-linecap="square" stroke-linejoin="miter">
      <!-- E -->
      <path d="M8 9 V23 M8 9 H15 M8 16 H13.5 M8 23 H15" />
      <!-- L -->
      <path d="M20 9 V23 M20 23 H26" />
    </g>
  </svg>
</template>

<style scoped>
.bp-logo {
  display: block;
  filter: drop-shadow(0 0 5px rgba(var(--bp-accent-rgb), 0.45));
}
:root:not(.dark) .bp-logo {
  filter: none;
}
</style>
