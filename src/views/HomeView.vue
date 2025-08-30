<script setup lang="ts">
import { homeSEO } from '../utils/tags';
import { useHead } from '@vueuse/head';

useHead(homeSEO)

</script>

<template>
  <main>
    <Aboutme />
    <Timeline />
</main>
</template>