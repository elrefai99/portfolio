<script setup lang="ts">
import { homeSEO } from '../utils/tags';
import { useHead } from '@vueuse/head';

useHead(homeSEO)

</script>

<template>
  <main>
    <Aboutme />
    <SelectedProjects />
    <Timeline />
</main>
</template>