<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute, useRouter } from 'vue-router'
import { sitePaths } from '../utils/site'
import { notFoundSEO } from '../utils/seo/shared'

const route = useRoute()
const router = useRouter()

useHead(notFoundSEO)

const quickLinks = [
  {
    title: 'Home',
    description: 'Return to the main landing page and recent highlights.',
    to: sitePaths.home,
    icon: 'i-carbon:home',
  },
  {
    title: 'Projects',
    description: 'Browse shipped work, experiments, and maintained products.',
    to: sitePaths.projects,
    icon: 'i-carbon:folder-open',
  },
  {
    title: 'Blogs',
    description: 'Read technical notes with code examples and backend patterns.',
    to: sitePaths.blogs,
    icon: 'i-carbon:blog',
  },
  {
    title: 'Resume',
    description: 'Open the experience summary and resume view.',
    to: sitePaths.resume,
    icon: 'i-carbon:document',
  },
] as const

const requestedPath = computed(() => {
  const candidate = route.fullPath || route.path || sitePaths.home

  try {
    return decodeURIComponent(candidate)
  } catch {
    return candidate
  }
})

const compactPath = computed(() => {
  if (requestedPath.value.length <= 56) {
    return requestedPath.value
  }

  return `${requestedPath.value.slice(0, 56)}...`
})

const handleBack = () => {
  if (window.history.length > 1) {
    router.back()
    return
  }

  router.push(sitePaths.home)
}
</script>

<template>
  <main class="not-found-page px-4 pb-10 pt-6 sm:px-6 lg:px-8">
    <section
      class="not-found-shell relative mx-auto grid w-full max-w-6xl gap-10 overflow-hidden rounded-[32px] border border-black/10 bg-white/60 p-6 shadow-[0_30px_120px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/14 dark:bg-white/8 sm:p-8 lg:min-h-[calc(100vh-12rem)] lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-10"
    >
      <div class="orb orb-one"></div>
      <div class="orb orb-two"></div>

      <div class="panel-enter relative z-10 space-y-6" style="animation-delay: 0.05s">
        <div class="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-black/70 dark:border-white/14 dark:bg-white/10 dark:text-white/78">
          <span class="status-dot"></span>
          Missing Route
        </div>

        <div>
          <p class="mb-3 text-sm uppercase tracking-[0.3em] text-black/45 dark:text-white/45">Error 404</p>
          <h1 class="error-code text-[clamp(5.2rem,18vw,11rem)] font-black leading-none text-black dark:text-white">404</h1>
        </div>

        <div class="max-w-xl space-y-3">
          <h2 class="text-3xl font-semibold tracking-tight text-black dark:text-white sm:text-4xl">
            This route fell out of the map.
          </h2>
          <p class="text-base leading-7 text-black/65 dark:text-white/65 sm:text-lg">
            The URL may be mistyped, the page may have moved, or the link is no longer active. Use a stable route below to get back into the site.
          </p>
        </div>

        <div class="path-card max-w-xl rounded-[24px] p-4 sm:p-5">
          <p class="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-black/45 dark:text-white/45">
            Requested Path
          </p>
          <code
            class="block break-all text-sm font-semibold text-black dark:text-white sm:text-base"
            :title="requestedPath"
          >
            {{ compactPath }}
          </code>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            class="action-button primary-action"
            @click="handleBack"
          >
            <i class="i-carbon:arrow-left text-lg"></i>
            Go Back
          </button>

          <router-link
            :to="sitePaths.home"
            class="action-button ghost-action"
          >
            <i class="i-carbon:home text-lg"></i>
            Take Me Home
          </router-link>
        </div>
      </div>

      <div class="panel-enter relative z-10" style="animation-delay: 0.15s">
        <div class="info-panel rounded-[28px] p-5 sm:p-6">
          <div class="mb-5 flex items-start justify-between gap-4">
            <div>
              <p class="text-xs uppercase tracking-[0.24em] text-black/45 dark:text-white/45">Recovery Routes</p>
              <h3 class="mt-2 text-2xl font-semibold text-black dark:text-white">
                Pick a stable starting point.
              </h3>
            </div>

            <div class="scan-chip hidden items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-black/60 dark:text-white/60 sm:inline-flex">
              <i class="i-carbon:route text-sm"></i>
              route.log
            </div>
          </div>

          <div class="grid gap-3">
            <router-link
              v-for="item in quickLinks"
              :key="item.to"
              :to="item.to"
              class="route-card group flex items-start gap-4 rounded-[24px] p-4 transition-all duration-300"
            >
              <span class="icon-tile flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl text-black dark:text-white">
                <i :class="item.icon"></i>
              </span>

              <span class="min-w-0 flex-1">
                <span class="mb-1 block text-lg font-semibold text-black dark:text-white">
                  {{ item.title }}
                </span>
                <span class="block text-sm leading-6 text-black/60 dark:text-white/60">
                  {{ item.description }}
                </span>
              </span>

              <i class="i-carbon:arrow-up-right mt-1 text-lg text-black/35 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-white/35"></i>
            </router-link>
          </div>

          <div class="terminal-panel mt-5 rounded-[24px] p-4 font-mono text-sm">
            <div class="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-black/45 dark:text-white/45">
              <span class="terminal-dot"></span>
              Diagnosis
            </div>

            <p class="text-black/70 dark:text-white/70">
              GET <span class="break-all text-black dark:text-white">{{ requestedPath }}</span>
            </p>
            <p class="mt-2 text-black/55 dark:text-white/55">Response: 404 Not Found</p>
            <p class="mt-2 text-black/55 dark:text-white/55">
              Next step: choose one of the routes above or return to the landing page.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.not-found-page {
  --nf-surface: rgba(255, 255, 255, 0.72);
  --nf-surface-strong: rgba(255, 255, 255, 0.84);
  --nf-panel: rgba(255, 255, 255, 0.56);
  --nf-border: rgba(15, 23, 42, 0.12);
  --nf-border-strong: rgba(15, 23, 42, 0.18);
  --nf-glow: rgba(15, 23, 42, 0.1);
  --nf-grid: rgba(15, 23, 42, 0.06);
}

.dark .not-found-page {
  --nf-surface: rgba(8, 8, 8, 0.72);
  --nf-surface-strong: rgba(255, 255, 255, 0.12);
  --nf-panel: rgba(255, 255, 255, 0.09);
  --nf-border: rgba(255, 255, 255, 0.14);
  --nf-border-strong: rgba(255, 255, 255, 0.22);
  --nf-glow: rgba(255, 255, 255, 0.08);
  --nf-grid: rgba(255, 255, 255, 0.06);
}

.not-found-shell::before,
.not-found-shell::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.not-found-shell::before {
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.28), transparent 35%),
    radial-gradient(circle at bottom right, rgba(15, 23, 42, 0.08), transparent 30%);
}

.dark .not-found-shell::before {
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.08), transparent 35%),
    radial-gradient(circle at bottom right, rgba(255, 255, 255, 0.05), transparent 30%);
}

.not-found-shell::after {
  background-image:
    linear-gradient(var(--nf-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--nf-grid) 1px, transparent 1px);
  background-position: center;
  background-size: 32px 32px;
  -webkit-mask-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8) 18%, rgba(0, 0, 0, 0.8) 82%, transparent);
  mask-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8) 18%, rgba(0, 0, 0, 0.8) 82%, transparent);
  opacity: 0.8;
}

.orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(10px);
  opacity: 0.9;
  pointer-events: none;
}

.orb-one {
  top: -5rem;
  right: 12%;
  width: 14rem;
  height: 14rem;
  background: rgba(15, 23, 42, 0.12);
  animation: drift 13s ease-in-out infinite;
}

.orb-two {
  bottom: -4rem;
  left: 8%;
  width: 12rem;
  height: 12rem;
  background: rgba(255, 255, 255, 0.6);
  animation: drift 16s ease-in-out infinite reverse;
}

.dark .orb-one {
  background: rgba(255, 255, 255, 0.08);
}

.dark .orb-two {
  background: rgba(255, 255, 255, 0.04);
}

.panel-enter {
  animation: rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) backwards;
}

.error-code {
  letter-spacing: -0.08em;
  text-shadow: 0 14px 40px var(--nf-glow);
  animation: pulse 8s ease-in-out infinite;
}

.path-card,
.info-panel,
.route-card,
.terminal-panel,
.scan-chip,
.ghost-action {
  border: 1px solid var(--nf-border);
  background: var(--nf-panel);
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(18px);
}

.action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border-radius: 999px;
  padding: 0.9rem 1.35rem;
  font-weight: 600;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease,
    background 0.25s ease,
    color 0.25s ease;
}

.action-button:hover,
.route-card:hover {
  transform: translateY(-2px);
  border-color: var(--nf-border-strong);
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.1);
}

.primary-action {
  background: rgba(15, 23, 42, 0.94);
  color: #fff;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);
}

.dark .primary-action {
  background: rgba(255, 255, 255, 0.92);
  color: #050505;
}

.ghost-action {
  color: inherit;
}

.route-card {
  position: relative;
  overflow: hidden;
}

.route-card::after {
  content: '';
  position: absolute;
  top: -2rem;
  right: -2rem;
  width: 6rem;
  height: 6rem;
  border-radius: 999px;
  background: radial-gradient(circle, var(--nf-glow), transparent 70%);
  transform: scale(0.7);
  transition: transform 0.3s ease;
}

.route-card:hover::after {
  transform: scale(1);
}

.icon-tile {
  border: 1px solid var(--nf-border);
  background: var(--nf-surface-strong);
}

.status-dot,
.terminal-dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  background: currentColor;
  animation: beacon 2.2s ease-in-out infinite;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes drift {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(0, 18px, 0) scale(1.04);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, -4px, 0);
  }
}

@keyframes beacon {
  0%,
  100% {
    opacity: 0.55;
    box-shadow: 0 0 0 0 rgba(148, 163, 184, 0.2);
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 0 8px rgba(148, 163, 184, 0);
  }
}

@media (max-width: 640px) {
  .action-button {
    width: 100%;
  }

  .not-found-shell::after {
    background-size: 24px 24px;
  }
}
</style>
