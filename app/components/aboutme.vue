<script setup lang="ts">
const logo = "/projects/lesoll-logo.png";
const egystayLogo = "/projects/egy-stay-logo.png";
const fullText = "Mohammed Mostafa";

const chartFailed = ref(false);
</script>

<template>
  <section max-w-4xl mx-auto p-6 md:p-10 space-y-16>
    <div text-center py-12>
      <div max-w-700px mx-auto>
        <div mb-8>
          <p
            text-xl
            font-medium
            mb-2
            class="animate-slide-down-delay-1 text-[var(--bp-blue-dim)]"
          >
            Hello, I'm
          </p>

          <h1
            text="5xl md:6xl lg:7xl"
            font-extrabold
            leading-tight
            tracking-tight
            my-2
            class="animate-slide-down-lcp text-[var(--bp-blue)]"
          >
            {{ fullText
            }}<span
              class="cursor-blink text-[var(--bp-blue-dim)]"
              aria-hidden="true"
              font-light
            ></span>
          </h1>

          <p
            text-base
            md:text-lg
            font-medium
            mt-2
            class="animate-slide-down-delay-2 text-[var(--bp-blue-dim)]"
          >
            also known as
            <a
              href="https://github.com/elrefai99"
              target="_blank"
              rel="noopener noreferrer"
              underline-offset-3
              class="text-[var(--bp-blue)]"
              >elrefai99</a
            >
          </p>

          <div
            inline-flex
            items-center
            gap-3
            px-6
            py-3
            mt-6
            border-1
            rounded-full
            class="animate-slide-down-delay-3 bg-[rgba(var(--bp-accent-rgb),0.03)] dark:bg-[rgba(var(--bp-accent-rgb),0.08)] border-[rgba(var(--bp-accent-rgb),0.08)] dark:border-[rgba(var(--bp-accent-rgb),0.14)]"
          >
            <span text-sm font-medium class="text-[var(--bp-blue-dim)]">
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
            inline-flex
            items-center
            gap-3
            ml-2
            px-6
            py-3
            mt-3
            border-1
            rounded-full
            class="animate-slide-down-delay-3 bg-[rgba(var(--bp-accent-rgb),0.04)] dark:bg-[rgba(var(--bp-accent-rgb),0.08)] border-[rgba(var(--bp-accent-rgb),0.08)] dark:border-[rgba(var(--bp-accent-rgb),0.14)]"
          >
            <i class="i-carbon:location text-[var(--bp-blue-dim)]" text-sm></i>
            <span text-sm font-medium class="text-[var(--bp-blue-dim)]">Based in</span>
            <span font-bold class="text-[var(--bp-blue)]">Cairo, Egypt</span>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div flex gap-4 justify-center flex-wrap class="animate-slide-down-delay-4">
          <a
            href="mailto:elrefai99@gmail.com"
            inline-flex
            items-center
            gap-2
            px-8
            py-4
            rounded-xl
            font-semibold
            shadow-lg
            transition-all
            duration-300
            hover=" shadow-2xl"
            class="bg-[var(--bp-blue)] text-[var(--bp-canvas)]"
          >
            <i class="i-carbon:email"></i>
            <span>Get in Touch</span>
          </a>
          <router-link
            to="/resume"
            inline-flex
            items-center
            gap-2
            px-8
            py-4
            rounded-xl
            bg-transparent
            border-2
            font-semibold
            transition-all
            duration-300
            class="text-[var(--bp-blue)] border-[rgba(var(--bp-accent-rgb),0.2)] hover:bg-[rgba(var(--bp-accent-rgb),0.05)] hover:border-[rgba(var(--bp-accent-rgb),0.3)]"
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
        <p text-lg leading-relaxed text-left class="text-[var(--bp-blue-dim)]">
          I'm Mohammed Mostafa, a software engineer specializing in backend development,
          scalable APIs, payment integrations, and production systems with
          <span inline-flex items-center gap-1.5 font-semibold class="text-[var(--bp-blue)]">
            <TagIcon tag="Node.js" size="h-4 w-4" />Node.js </span
          >. I work across TypeScript, Express.js, MongoDB, PostgreSQL, Redis, Docker, and
          AWS, and I recently expanded into frontend development with Vue.js. As a backend
          developer, I built and shipped the systems behind production platforms like
          <a
            href="https://lesoll.com"
            target="_blank"
            rel="noopener noreferrer"
            inline-flex
            items-center
            gap-1.5
            font-semibold
            class="underline underline-offset-3 align-middle text-[var(--bp-blue)]"
          >
            <img
              :src="logo"
              alt="Lesoll logo"
              loading="lazy"
              decoding="async"
              width="16"
              height="16"
              class="inline-block h-4 w-auto"
            />Lesoll
          </a>
          and
          <a
            href="https://egystay.com"
            target="_blank"
            rel="noopener noreferrer"
            inline-flex
            items-center
            gap-1.5
            font-semibold
            class="underline underline-offset-3 align-middle text-[var(--bp-blue)]"
          >
            <img
              :src="egystayLogo"
              alt="EgyStay logo"
              loading="lazy"
              decoding="async"
              width="31"
              height="8"
              class="inline-block h-2 w-auto"
            />
            EgyStay </a
          >.
        </p>

        <p text-lg leading-relaxed text-left class="text-[var(--bp-blue-dim)]">
          Turning ideas into real, functional systems is what drives me most. I'm
          passionate about building backend solutions, APIs, and tools that make life
          easier and boost productivity—whether for myself, my projects, or the developer
          community. You can explore my full list of
          <router-link
            to="/projects"
            font-semibold
            underline
            underline-offset-3
            transition-all
            duration-200
            class="text-[var(--bp-blue)] decoration-[rgba(var(--bp-accent-rgb),0.3)] hover:decoration-[rgba(var(--bp-accent-rgb),0.8)]"
          >
            projects </router-link
          >, or read my
          <router-link
            to="/blogs"
            font-semibold
            underline
            underline-offset-3
            transition-all
            duration-200
            class="text-[var(--bp-blue)] decoration-[rgba(var(--bp-accent-rgb),0.3)] hover:decoration-[rgba(var(--bp-accent-rgb),0.8)]"
          >
            backend engineering writing </router-link
          >.
        </p>

        <p text-lg leading-relaxed text-left class="text-[var(--bp-blue-dim)]">
          Outside of coding, I enjoy photography and traveling. I'm also into anime,
          movies, and dramas, and I like to keep track of what I watch.
        </p>
      </div>
    </div>
    <div class="animate-slide-up-delay-7">
      <div max-w-700px mx-auto p-6 rounded-2xl class="bg-[rgba(var(--bp-accent-rgb),0.02)] dark:bg-[rgba(var(--bp-accent-rgb),0.01)]">
        <a
          href="https://github.com/elrefai99"
          target="_blank"
          rel="noopener noreferrer"
          block
        >
          <img
            v-if="!chartFailed"
            src="https://ghchart.rshah.org/6e7681/elrefai99"
            alt="Mohammed Mostafa (elrefai99) GitHub contribution graph"
            loading="lazy"
            decoding="async"
            width="720"
            height="112"
            w-full
            h-auto
            class="github-chart bg-[rgba(var(--bp-accent-rgb),0.02)] dark:bg-[rgba(var(--bp-accent-rgb),0.06)]"
            @error="chartFailed = true"
          />
        </a>
        <div flex items-center justify-between mt-4>
          <a
            href="https://github.com/elrefai99"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View elrefai99 on GitHub (opens in a new tab)"
            inline-flex
            items-center
            min-h-11
            gap-2
            text-sm
            font-medium
            transition-colors
            duration-200
            class="text-[var(--bp-blue-dim)] hover:text-[var(--bp-blue)]"
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
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-in-out;
}

.animate-slide-down {
  animation: slide-down 0.8s ease-out;
}

/* Transform-only variant for the LCP h1 — never animate its opacity */
@keyframes slide-down-lcp {
  from {
    transform: translateY(-20px);
  }
  to {
    transform: translateY(0);
  }
}
.animate-slide-down-lcp {
  animation: slide-down-lcp 0.8s ease-out;
}

.animate-slide-down-delay-1 {
  animation: slide-down 0.6s ease-out 0.2s backwards;
}

.animate-slide-down-delay-2 {
  animation: slide-down 0.6s ease-out 0.2s backwards;
}

.animate-slide-down-delay-3 {
  animation: slide-down 0.6s ease-out 0.2s backwards;
}

.animate-slide-down-delay-4 {
  animation: slide-down 0.6s ease-out 0.2s backwards;
}

.animate-slide-up-delay-5 {
  animation: slide-up 0.8s ease-out 0.2s backwards;
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
  content: "|";
}

.github-chart {
  border-radius: 8px;
  filter: brightness(1.1);
}

.dark .github-chart {
  filter: brightness(0.9) invert(1) hue-rotate(180deg);
}
</style>
