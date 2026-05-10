<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';

// useDark with options to respect system preference
// By default, it will use system preference and allow user override
const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
  // Start in dark mode so the global black background matches the content contrast.
  initialValue: 'dark',
  // Store user preference in localStorage
  storageKey: 'theme-preference',
  // Listen to system preference changes
  listenToStorageChanges: true,
})

const toggleDark = useToggle(isDark)
</script>

<template>
  <button
    class="theme-toggle i-carbon-sun dark:i-carbon-moon"
    @click="toggleDark()"
    title="Toggle theme"
    aria-label="Toggle dark mode"
  />
</template>

<style scoped>
.theme-toggle {
  width: 2.4rem;
  height: 2.4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.6);
  color: #0f172a;
  backdrop-filter: blur(16px);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
  transition:
    transform 0.25s ease,
    background 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.theme-toggle:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.82);
  border-color: rgba(15, 23, 42, 0.14);
}

.dark .theme-toggle {
  border-color: rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.08);
  color: #f8fafc;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.3);
}

.dark .theme-toggle:hover {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.2);
}
</style>
