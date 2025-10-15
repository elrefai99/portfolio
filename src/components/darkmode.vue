<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button
    icon-btn
    i-carbon-sun dark:i-carbon-moon
    @click="toggleDark()"
  />
</template>
