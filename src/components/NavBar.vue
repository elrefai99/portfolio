<script setup lang="ts">
import { ref } from "vue"

const isOpen = ref(false)

function toggleMenu() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <nav class="flex items-center justify-between px-4 py-3 md:px-12">
    <h1 class="text-3xl font-serif opacity-70">
      <router-link to="/">
        <span class="font-bold italic">el</span>
      </router-link>
    </h1>

    <!-- Desktop Menu -->
    <div class="hidden md:flex items-center gap-6 text-2xl opacity-70">
      <router-link to="/about">About</router-link>
      <router-link to="/resume">Resume</router-link>
    </div>
  </nav>
</template>
