<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
// storageKey must stay 'theme-mode' — the FOUC-prevention inline script in
// nuxt.config.ts app.head reads the same key before first paint.
const isDark = useDark({ storageKey: "theme-mode" });
const toggleDark = useToggle(isDark);
</script>

<template>
  <button i-carbon-sun dark:i-carbon-moon @click="toggleDark()" />
</template>
