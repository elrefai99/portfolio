<template> 
  <footer 
    class="mt-16 px-6 pb-6 pt-8 sm:mt-24 sm:py-12"
    border="t-1 black/5 dark:white/10"
    bg="black/1 dark:white/3"
  >
    <div max-w-1200px mx-auto text-center relative>
      <!-- Social Links -->
      <div flex gap-4 justify-center mb-8>
        <a 
          class="social-link" 
          href="https://github.com/elrefai99" 
          target="_blank" 
          title="GitHub"
          aria-label="GitHub"
        >
          <i class="i-carbon-logo-github social-icon" aria-hidden="true"></i>
        </a>
        <a 
          class="social-link" 
          href="https://www.linkedin.com/in/elrefai99/" 
          target="_blank" 
          title="LinkedIn"
          aria-label="LinkedIn"
        >
          <i class="i-carbon-logo-linkedin social-icon" aria-hidden="true"></i>
        </a>
        <a 
          class="social-link" 
          href="https://x.com/elrefai99" 
          target="_blank" 
          title="X (Twitter)"
          aria-label="X"
        >
          <i class="i-carbon-logo-x social-icon" aria-hidden="true"></i>
        </a>
        <a 
          class="social-link" 
          href="https://bsky.app/profile/elrefai99.bsky.social" 
          target="_blank" 
          title="Bluesky"
          aria-label="Bluesky"
        >
          <i class="i-ri:bluesky-fill social-icon" aria-hidden="true"></i>
        </a>
        <a 
          class="social-link" 
          href="mailto:elrefai99@gmail.com"
          title="Email"
          aria-label="Email"
        >
          <i class="i-mdi:email-outline social-icon" aria-hidden="true"></i>
        </a>
      </div>

      <!-- Divider -->
      <div 
        class="mx-auto my-8 h-px max-w-300px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10"
      ></div>

      <!-- Copyright -->
      <p text-sm text-gray-600 dark:text-gray-400 font-normal>
        © {{ new Date().getFullYear() }} 
        <a 
          href="https://github.com/elrefai99" 
          text-black dark:text-white font-semibold
          transition-colors duration-200
          hover="text-gray-600 dark:text-gray-300"
        >
          elrefai99
        </a>. 
        All rights reserved.
      </p>

      <!-- Back to Top Button -->
      <button 
        @click="scrollToTop" 
        title="Back to top"
        aria-label="Scroll to top"
        fixed bottom-8 right-8
        w-12 h-12
        flex items-center justify-center
        bg-black dark:bg-white
        text-white dark:text-black
        text-xl
        border-none rounded-xl
        cursor-pointer
        shadow-lg
        transition-all duration-300
        z-40
        hover="translate-y--1 shadow-2xl"
        active:translate-y--0.5
      >
        <i class="i-carbon:arrow-up"></i>
      </button>
    </div>
  </footer>
</template>

<script setup>
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>
