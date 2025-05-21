<script setup>
import { useHead } from '@vueuse/head'
import background from "./components/BackGround.vue"
import { seoMeta } from './utils/tages.js'

useHead(seoMeta)
</script>

<template>
  <background />
  <header>
    <div bg-red-500>
      Mohamed Mostafa
    </div>
  </header>
  
</template>

