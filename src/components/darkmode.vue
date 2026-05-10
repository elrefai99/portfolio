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
    i-carbon-sun dark:i-carbon-moon
    @click="toggleDark()"
    title="Toggle theme"
    aria-label="Toggle dark mode"
  />
</template>
