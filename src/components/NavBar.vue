<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header 
    sticky top-0 z-50
    transition-all duration-300
    :class="isScrolled 
      ? 'backdrop-blur-md bg-white/80 dark:bg-black/80 shadow-lg' 
      : 'bg-transparent'"
  >
    <nav w-full>
      <div max-w-xl mx-auto flex items-center justify-center px-6 py-4>
        <div 
          text="lg md:md" 
          flex flex-wrap justify-center items-center 
          gap="4 md:8" 
          opacity-80
        >
          <router-link 
            to="/" 
            class="nav-link"
            text-black dark:text-white
            transition-all duration-200
            hover="text-gray-600 dark:text-gray-300"
            active-class="border-b-2 border-current pb-1"
          >
            Home
          </router-link>
          <router-link 
            to="/projects" 
            class="nav-link"
            text-black dark:text-white
            transition-all duration-200
            hover="text-gray-600 dark:text-gray-300"
            active-class="border-b-2 border-current pb-1"
          >
            Projects
          </router-link>
          <router-link
            to="/resume"
            class="nav-link"
            text-black dark:text-white
            transition-all duration-200
            hover="text-gray-600 dark:text-gray-300"
            active-class="border-b-2 border-current pb-1"
          >
            Resume
          </router-link>
          <darkmode />
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}
</style>
