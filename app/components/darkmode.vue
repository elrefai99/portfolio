<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
// storageKey must stay 'theme-mode' — the FOUC-prevention inline script in
// nuxt.config.ts app.head reads the same key before first paint.
const isDark = useDark({ storageKey: "theme-mode" });
const toggleDark = useToggle(isDark);
</script>

<template>
  <button
    type="button"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    class="grid place-items-center -m-2 p-2 min-w-11 min-h-11"
    @click="toggleDark()"
  >
    <span i-carbon-sun dark:i-carbon-moon class="text-xl" aria-hidden="true" />
  </button>
</template>
