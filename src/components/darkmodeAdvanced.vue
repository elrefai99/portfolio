<script setup lang="ts">
import { useTheme } from '../composables/useTheme'

const { themeMode, isDark, toggleTheme } = useTheme()

// Get icon based on current mode
const getIcon = () => {
  if (themeMode.value === 'auto') {
    return isDark.value ? 'i-carbon-moon' : 'i-carbon-sun'
  }
  return isDark.value ? 'i-carbon-moon' : 'i-carbon-sun'
}

const getTitle = () => {
  const modeText = themeMode.value === 'auto' ? 'Auto (System)' : themeMode.value.charAt(0).toUpperCase() + themeMode.value.slice(1)
  return `Theme: ${modeText}`
}
</script>

<template>
  <button
    :class="getIcon()"
    @click="toggleTheme()"
    :title="getTitle()"
    :aria-label="`Toggle theme - Current: ${themeMode}`"
    class="theme-toggle-btn"
  />
</template>

<style scoped>
.theme-toggle-btn {
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-toggle-btn:hover {
  transform: scale(1.1);
}

.theme-toggle-btn:active {
  transform: scale(0.95);
}
</style>
