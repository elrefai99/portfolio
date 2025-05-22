<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useHead } from '@vueuse/head'
import {tagsSEO} from './utils/tags'
useHead(tagsSEO)
</script>

<template>
  <BackGround />
  <RouterView />
</template>

<style>
html.dark {
  background: #222;
  color: white;
  color-scheme: dark;
}
</style>
