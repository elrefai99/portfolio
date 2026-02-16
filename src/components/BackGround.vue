<script setup lang="ts">
import { ref } from 'vue'
import StarBackground from './StarBackground.vue'
// import BranchBackground from './BranchBackground.vue'

// Randomly choose background type on component mount
const backgroundType = ref<'stars' | 'branches'>(Math.random() > 0.5 ? 'stars' : 'branches')
</script>

<template>
  <StarBackground v-if="backgroundType === 'stars'" />
  <!-- <BranchBackground v-else /> -->
</template>

