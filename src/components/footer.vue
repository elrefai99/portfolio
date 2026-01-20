<template> 
  <footer 
    py-12 px-6 mt-24
    border="t-1 black/8 dark:white/8"
    bg="black/1 dark:white/1"
  >
    <div max-w-1200px mx-auto text-center relative>
      <!-- Social Links -->
      <div flex gap-4 justify-center mb-8>
        <a 
          class="i-carbon-logo-github" 
          href="https://github.com/elrefai99" 
          target="_blank" 
          title="GitHub"
          aria-label="GitHub"
          w-10 h-10
          flex items-center justify-center
          text-xl text-gray-600 dark:text-gray-400
          bg="black/50 dark:white/50"
          border="1 black/6 dark:white/6"
          rounded-xl
          transition-all duration-300
          hover="text-black dark:text-white bg-black dark:bg-white border-black/12 dark:border-white/12 translate-y--1"
        />
        <a 
          class="i-carbon-logo-linkedin" 
          href="https://www.linkedin.com/in/elrefai99/" 
          target="_blank" 
          title="LinkedIn"
          aria-label="LinkedIn"
          w-10 h-10
          flex items-center justify-center
          text-xl text-gray-600 dark:text-gray-400
          bg="black/50 dark:white/50"
          border="1 black/6 dark:white/6"
          rounded-xl
          transition-all duration-300
          hover="text-black dark:text-white bg-black dark:bg-white border-black/12 dark:border-white/12 translate-y--1"
        />
        <a 
          class="i-carbon-logo-x" 
          href="https://x.com/elrefai99" 
          target="_blank" 
          title="X (Twitter)"
          aria-label="X"
          w-10 h-10
          flex items-center justify-center
          text-xl text-gray-600 dark:text-gray-400
          bg="black/50 dark:white/50"
          border="1 black/6 dark:white/6"
          rounded-xl
          transition-all duration-300
          hover="text-black dark:text-white bg-black dark:bg-white border-black/12 dark:border-white/12 translate-y--1"
        />
        <a 
          class="i-ri:bluesky-fill" 
          href="https://bsky.app/profile/elrefai99.bsky.social" 
          target="_blank" 
          title="Bluesky"
          aria-label="Bluesky"
          w-10 h-10
          flex items-center justify-center
          text-xl text-gray-600 dark:text-gray-400
          bg="black/50 dark:white/50"
          border="1 black/6 dark:white/6"
          rounded-xl
          transition-all duration-300
          hover="text-black dark:text-white bg-black dark:bg-white border-black/12 dark:border-white/12 translate-y--1"
        />
        <a 
          class="i-mdi:email-outline" 
          href="mailto:elrefai99@gmail.com"
          title="Email"
          aria-label="Email"
          w-10 h-10
          flex items-center justify-center
          text-xl text-gray-600 dark:text-gray-400
          bg="black/50 dark:white/50"
          border="1 black/6 dark:white/6"
          rounded-xl
          transition-all duration-300
          hover="text-black dark:text-white bg-black dark:bg-white border-black/12 dark:border-white/12 translate-y--1"
        />
      </div>

      <!-- Divider -->
      <div 
        h-px my-8 mx-auto max-w-300px
        class="footer-divider"
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
          Mohammed Mostafa
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

<style scoped>
.footer-divider {
  background: linear-gradient(
    to right,
    transparent,
    rgba(0, 0, 0, 0.1),
    transparent
  );
}

.dark .footer-divider {
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
}

@media (max-width: 640px) {
  footer {
    padding-top: 2rem;
    padding-bottom: 1.5rem;
    margin-top: 4rem;
  }
}
</style>
