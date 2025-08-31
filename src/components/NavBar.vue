<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
</script>
<template>
  <header>
    <nav w-full bg-transparent>
      <div max-w-xl mx-auto flex items-center justify-between px-6 py-4>
        <!-- Logo -->
        <h2 text-4xl font-serif opacity-80>
          <router-link to="/" flex items-center gap-1>
            <span font-bold italic>el</span>
          </router-link>
        </h2>
      
        <!-- Desktop Menu -->
        <div text-md hidden md:flex items-center gap-8 opacity-80>
          <router-link to="/" hover:text-white-400 transition active-class="border-b-2 border-current pb-1">Home</router-link>
          <router-link to="/projects" hover:text-white-400 transition active-class="border-b-2 border-current pb-1">Projects</router-link>
          <a hover:text-white-400 transition href="/resume.pdf">Resume</a>
        </div>
      
        <!-- Mobile Hamburger -->
        <button md:hidden flex flex-col gap-1.5 @click="isOpen = !isOpen" aria-label="Toggle Menu">
          <span i-carbon:menu text-3xl></span>
        </button>
      </div>
    
      <!-- Mobile Dropdown -->
      <div v-if="isOpen" text-center md:hidden flex flex-col gap-4 px-6 pb-4 opacity-90 class="animate-fadeIn">
        <router-link @click="isOpen=false" to="/" hover:text-white-400 transition active-class="border-b-2 border-current pb-1">Home</router-link>
        <router-link @click="isOpen=false" to="/projects" hover:text-white-400 transition active-class="border-b-2 border-current pb-1">Projects</router-link>
        <a @click="isOpen=false" hover:text-white-400 transition href="/resume.pdf">Resume</a>
      </div>
    </nav>
  </header>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}
</style>
