<script setup lang="ts">
import { ref } from "vue"

const isOpen = ref(false)

function toggleMenu() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <nav class="flex items-center justify-between px-4 py-3 md:px-12">
    <!-- Logo -->
    <h1 class="text-3xl font-serif opacity-70">
      <router-link to="/">
        <span class="font-bold italic">el</span>
      </router-link>
    </h1>

    <!-- Desktop Menu -->
    <div class="hidden md:flex items-center gap-6 text-2xl font-serif opacity-70">
      <router-link to="/projects">Projects</router-link>
      <router-link to="/resume">Resume</router-link>
      <router-link to="/packages">Packages</router-link>

      <a class="hidden md:flex text-2xl font-serif op100 icon-btn i-carbon-logo-github" href="https://github.com/elrefai99" target="_blank" title="GitHub" />
      <a class="hidden md:flex text-2xl font-serif op100 icon-btn i-carbon-logo-x" href="https://x.com/elrefai99" target="_blank" title="X.com" />
      <a class="hidden md:flex text-2xl font-serif op100 icon-btn i-carbon-logo-linkedin" href="https://www.linkedin.com/in/elrefai99/" target="_blank" title="LinkedIn" />
      <a class="hidden md:flex text-2xl font-serif op100 icon-btn i-carbon-logo-instagram" href="https://www.instagram.com/elrefai99/" target="_blank" title="Instagram" />
      <a class="hidden md:flex text-2xl font-serif op100 icon-btn i-carbon-logo-facebook" href="https://www.facebook.com/hamada.mostafa.18007" target="_blank" title="Facebook" />
    </div>

    <!-- Mobile Hamburger -->
    <button @click="toggleMenu" class="md:hidden text-3xl">
      <i :class="isOpen ? 'i-carbon-close' : 'i-carbon-menu'" />
    </button>

    <!-- Mobile Dropdown -->
    <div v-if="isOpen" class="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md flex flex-col items-center gap-4 py-6 text-xl font-serif">
      <router-link @click="toggleMenu" to="/projects">Projects</router-link>
      <router-link @click="toggleMenu" to="/resume">Resume</router-link>
      <router-link @click="toggleMenu" to="/packages">Packages</router-link>

      <div class="flex gap-4 mt-4 text-2xl">
        <a class="icon-btn i-carbon-logo-github" href="https://github.com/elrefai99" target="_blank" title="GitHub" />
        <a class="icon-btn i-carbon-logo-x" href="https://x.com/elrefai99" target="_blank" title="X.com" />
        <a class="icon-btn i-carbon-logo-linkedin" href="https://www.linkedin.com/in/elrefai99/" target="_blank" title="LinkedIn" />
        <a class="icon-btn i-carbon-logo-instagram" href="https://www.instagram.com/elrefai99/" target="_blank" title="Instagram" />
        <a class="icon-btn i-carbon-logo-facebook" href="https://www.facebook.com/hamada.mostafa.18007" target="_blank" title="Facebook" />
      </div>
    </div>
  </nav>
</template>
