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
      <h1 class="text-xl font-serif opacity-80">
        <router-link to="/" class="flex items-center gap-1">
          <span class="font-bold italic">el</span>
        </router-link>
      </h1>

      <!-- Mobile Hamburger -->
      <button 
        class="md:hidden flex flex-col gap-1.5"
        @click="isOpen = !isOpen"
        aria-label="Toggle Menu"
      >
        <span class="w-6 h-0.5 bg-current"></span>
        <span class="w-6 h-0.5 bg-current"></span>
        <span class="w-6 h-0.5 bg-current"></span>
      </button>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center gap-8 opacity-80">
        <router-link to="/" class="hover:text-white-400 transition">Home</router-link>
        <!-- <router-link to="/about" class="hover:text-white-400 transition">About</router-link> -->
        <router-link to="/projects" class="hover:text-white-400 transition">Projects</router-link>
        <a class="hover:text-white-400 transition" href="/resume.pdf">Resume</a>
        <DarkMode />
      </div>
    </div>

    <!-- Mobile Dropdown -->
    <div 
      v-if="isOpen"
      class="md:hidden flex flex-col gap-4 px-6 pb-4 animate-fadeIn opacity-90"
    >
      <router-link @click="isOpen=false" to="/" class="hover:text-white-400 transition">Home</router-link>
      <!-- <router-link @click="isOpen=false" to="/about" class="hover:text-white-400 transition">About</router-link> -->
      <router-link @click="isOpen=false" to="/projects" class="hover:text-white-400 transition">Projects</router-link>
      <a @click="isOpen=false" class="hover:text-white-400 transition" href="/resume.pdf">Resume</a>
      <DarkMode />
    </div>
  </nav>
</template>
