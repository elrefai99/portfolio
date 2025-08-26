<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}
</style>

<template>
  <nav class="w-full bg-transparent">
    <div class="max-w-xl mx-auto flex items-center justify-between px-6 py-4">
      <!-- Logo -->
      <h1 class="text-3xl font-serif opacity-80">
        <router-link to="/" class="flex items-center gap-1">
          <span class="font-bold italic">el</span>
        </router-link>
      </h1>

      <!-- Desktop Menu -->
      <div class="flex items-center gap-8 text-lg font-medium opacity-80">
        <router-link to="/" class="hover:text-white-400 transition">Home</router-link>
        <router-link to="/about" class="hover:text-white-400 transition">About</router-link>
        <router-link to="/resume" class="hover:text-white-400 transition">Resume</router-link>
      </div>

      <!-- Mobile Menu Button -->
      <button 
        @click="isOpen = !isOpen" 
        class="md:hidden text-2xl opacity-80 focus:outline-none"
      >
        <i :class="isOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" />
      </button>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div 
      v-if="isOpen" 
      class="md:hidden flex flex-col items-center gap-4 pb-6 text-lg font-medium opacity-80 animate-fadeIn"
    >
      <router-link to="/about" class="hover:text-blue-400 transition">About</router-link>
      <router-link to="/resume" class="hover:text-blue-400 transition">Resume</router-link>
    </div>
  </nav>
</template>
