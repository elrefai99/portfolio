<script setup lang="ts">
// Public-path strings (not imports from ../../public) so Vite doesn't emit a
// second hashed copy of each logo into dist/assets.
const logo = "/projects/lesoll-logo.png"
const egystayLogo = "/projects/egy-stay-logo.png"

// Static text — this H1 is the homepage's LCP element. It used to be wiped
// to '' on mount and retyped letter-by-letter, which delayed LCP by ~1.6s
// and made the largest element on the page visibly disappear on hydration.
const fullText = "Mohammed Mostafa"
</script>

<template>
  <!-- No opacity animation on the section: it wraps the h1 (LCP element), and
       animating it from opacity:0 delays LCP by the animation duration. -->
  <section
    max-w-4xl mx-auto p-6 md:p-10 space-y-16
  >
    <!-- Hero Section -->
    <div text-center py-12>
      <div max-w-700px mx-auto>
        <!-- Main Heading with Typing Effect -->
        <div mb-8>
          <p 
            text-xl font-medium text-gray-600 dark:text-gray-400 mb-2
            class="animate-slide-down-delay-1"
          >
            Hello, I'm
          </p>
          
          <!-- LCP element: transform-only entry (no opacity) so paint counts immediately -->
          <h1
            text="5xl md:6xl lg:7xl"
            font-extrabold
            leading-tight
            text-black dark:text-white
            tracking-tight
            my-2
            class="animate-slide-down-lcp"
          >
            {{ fullText }}<span class="cursor-blink" aria-hidden="true" text-gray-600 dark:text-gray-400 font-light></span>
          </h1>

          <p
            text-base md:text-lg font-medium text-gray-600 dark:text-gray-400 mt-2
            class="animate-slide-down-delay-2"
          >
            also known as
            <a href="https://github.com/elrefai99" target="_blank" rel="noopener noreferrer" underline-offset-3 dark:text-gray-100 text-gray-900>elrefai99</a>
          </p>
          
          <div 
            inline-flex items-center gap-3 
            px-6 py-3 mt-6
            bg="black/3 dark:white/8"
            border="1 black/8 dark:white/14"
            rounded-full
            class="animate-slide-down-delay-3"
          >
            <span text-sm text-gray-600 dark:text-gray-400 font-medium>
              Software Engineer II 
            </span>
            <!-- <a 
              href="https://lesoll.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              flex items-center gap-2
              transition-transform duration-200
              hover:scale-105
            >
              <img :src="logo" alt="Lesoll Logo" decoding="async" width="20" height="20" w-5 h-auto/>
              <span font-bold text-black dark:text-white>Lesoll</span>
            </a> -->
          </div>

          <!-- Location -->
          <div
            inline-flex items-center gap-3 ml-2
            px-6 py-3 mt-3
            bg="black/4 dark:white/8"
            border="1 black/8 dark:white/14"
            rounded-full
            class="animate-slide-down-delay-3"
          >
            <i class="i-carbon:location" text-sm text-gray-600 dark:text-gray-400></i>
            <span text-sm text-gray-600 dark:text-gray-400 font-medium>Based in</span>
            <span font-bold text-black dark:text-white>Cairo, Egypt</span>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div 
          flex gap-4 justify-center flex-wrap
          class="animate-slide-down-delay-4"
        >
          <a 
            href="mailto:elrefai99@gmail.com" 
            inline-flex items-center gap-2
            px-8 py-4 rounded-xl
            bg-black dark:bg-white
            text-white dark:text-black
            font-semibold
            shadow-lg
            transition-all duration-300
            hover=" shadow-2xl"
          >
            <i class="i-carbon:email"></i>
            <span>Get in Touch</span>
          </a>
          <router-link
            to="/resume"
            inline-flex items-center gap-2
            px-8 py-4 rounded-xl
            bg-transparent
            text-black dark:text-white
            border="2 black/20 dark:white/20"
            font-semibold
            transition-all duration-300
            hover=" bg-black/5 dark:bg-white/5 border-black/30 dark:border-white/30"
          >
            <i class="i-carbon:document"></i>
            <span>View Resume</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- About Section -->
    <div class="animate-slide-up-delay-5">
      <div max-w-700px mx-auto space-y-6>
        <p 
          text-lg leading-relaxed
          text-gray-700 dark:text-gray-300
          text-left
        >
          I'm Mohammed Mostafa,
          a software engineer specializing in backend development, scalable APIs,
          payment integrations, and production systems with
          <span inline-flex items-center gap-1.5 font-semibold text-black dark:text-white>
            <i class="i-logos:nodejs-icon-alt"></i>Node.js
          </span>. 
          I work across TypeScript, Express.js, MongoDB, PostgreSQL, Redis, Docker, and AWS, and
          I recently expanded into frontend development with Vue.js.
          As a backend developer, I built and shipped the systems behind production platforms like
          <a href="https://lesoll.com" target="_blank" rel="noopener noreferrer" inline-flex items-center gap-1.5 font-semibold text-black dark:text-white class="underline underline-offset-3 align-middle">
            <img :src="logo" alt="Lesoll logo" loading="lazy" decoding="async" width="16" height="16" class="inline-block h-4 w-auto" />Lesoll
          </a>
          and
          <a href="https://egystay.com/en" target="_blank" rel="noopener noreferrer" inline-flex items-center gap-1.5 font-semibold text-black dark:text-white class="underline underline-offset-3 align-middle">
             <img :src="egystayLogo" alt="Egystay logo" loading="lazy" decoding="async" width="31" height="8" class="inline-block h-2 w-auto" /> Egystay
          </a>.
        </p>

        <p 
          text-lg leading-relaxed
          text-gray-700 dark:text-gray-300
          text-left
        >
          Turning ideas into real, functional systems is what drives me most. 
          I'm passionate about building backend solutions, APIs, and tools that make life easier 
          and boost productivity—whether for myself, my projects, or the developer community. 
          You can explore my full list of 
          <router-link 
            to="/projects" 
            font-semibold text-black dark:text-white
            underline 
            underline-offset-3
            transition-all duration-200
            class="decoration-black/30 dark:decoration-white/30 hover:decoration-black/80 dark:hover:decoration-white/80 "
          >
            projects
          </router-link>.
        </p>
        
        <p 
          text-lg leading-relaxed
          text-gray-700 dark:text-gray-300
          text-left
        >
          Outside of coding, I enjoy photography and traveling. 
          I'm also into anime, movies, and dramas, and I like to keep track of what I watch.
        </p>
      </div>
    </div>
    <div class="animate-slide-up-delay-7">
      <div 
        max-w-700px mx-auto
        p-6
        bg="black/2 dark:white/1"
        rounded-2xl
      >
        <a
          href="https://github.com/elrefai99"
          target="_blank"
          rel="noopener noreferrer"
          block
        >
          <img
            src="https://ghchart.rshah.org/6e7681/elrefai99"
            alt="Mohammed Mostafa (elrefai99) GitHub contribution graph"
            loading="lazy"
            decoding="async"
            width="720"
            height="112"
            w-full h-auto
            class="github-chart bg-black/2 dark:bg-white/6"
          />
        </a>
        <div flex items-center justify-between mt-4>
          <a
            href="https://github.com/elrefai99"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View elrefai99 on GitHub (opens in a new tab)"
            inline-flex items-center gap-2
            text-sm font-medium
            text-gray-600 dark:text-gray-400
            transition-colors duration-200
            hover="text-black dark:text-white"
          >
            <i class="i-carbon:logo-github" aria-hidden="true" />
            <span>@elrefai99 on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Animations */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-down {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.animate-fade-in {
  animation: fade-in 1s ease-in-out;
}

.animate-slide-down {
  animation: slide-down 0.8s ease-out;
}

/* Transform-only variant for the LCP h1 — never animate its opacity */
@keyframes slide-down-lcp {
  from { transform: translateY(-20px); }
  to { transform: translateY(0); }
}
.animate-slide-down-lcp {
  animation: slide-down-lcp 0.8s ease-out;
}

.animate-slide-down-delay-1 {
  animation: slide-down 0.6s ease-out 0.2s backwards;
}

.animate-slide-down-delay-2 {
  animation: slide-down 0.6s ease-out 0.3s backwards;
}

.animate-slide-down-delay-3 {
  animation: slide-down 0.6s ease-out 0.4s backwards;
}

.animate-slide-down-delay-4 {
  animation: slide-down 0.6s ease-out 0.6s backwards;
}

.animate-slide-up-delay-5 {
  animation: slide-up 0.8s ease-out 0.7s backwards;
}

.animate-slide-up-delay-6 {
  animation: slide-up 0.8s ease-out 0.8s backwards;
}

.animate-slide-up-delay-7 {
  animation: slide-up 0.8s ease-out 0.9s backwards;
}

.cursor-blink {
  animation: blink 1s infinite;
}

.cursor-blink::after {
  content: '|';
}

.github-chart {
  border-radius: 8px;
  filter: brightness(1.1);
}

.dark .github-chart {
  filter: brightness(0.9) invert(1) hue-rotate(180deg);
}
</style>
