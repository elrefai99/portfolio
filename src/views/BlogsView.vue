<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHead } from '@vueuse/head'
import { blogs } from '../utils/blogs'
import { blogsSEO } from '../utils/tags'

useHead(blogsSEO)

const selectedCategory = ref('All')

const categories = computed(() => [
  'All',
  ...Array.from(new Set(blogs.map((blog) => blog.category))),
])

const filteredBlogs = computed(() => {
  if (selectedCategory.value === 'All') {
    return blogs
  }

  return blogs.filter((blog) => blog.category === selectedCategory.value)
})

const shellClass = 'animate-project-rise relative overflow-hidden rounded-xl border border-slate-300/30 bg-white/74 backdrop-blur-[18px] shadow-[0_18px_48px_rgba(148,163,184,0.18)] transition-all duration-300 hover:border-slate-500/32 hover:bg-white/92 hover:shadow-2xl dark:border-white/14 dark:bg-white/8 dark:shadow-[0_18px_48px_rgba(0,0,0,0.34)] dark:hover:border-white/22 dark:hover:bg-white/14'
const overlayClass = 'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.55),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.24),transparent_65%)] opacity-90 dark:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_65%)] dark:opacity-75'
const chipClass = 'animate-project-tab rounded-lg px-4 py-2 font-semibold transition-all duration-300 border backdrop-blur-[18px] shadow-[0_18px_48px_rgba(148,163,184,0.18)] hover:scale-105 dark:shadow-[0_18px_48px_rgba(0,0,0,0.34)]'
const inactiveChipClass = 'border-slate-300/30 bg-white/74 text-gray-700 hover:border-slate-900 hover:bg-slate-900 hover:text-white dark:border-white/14 dark:bg-white/8 dark:text-gray-200 dark:hover:border-white/92 dark:hover:bg-white/92 dark:hover:text-black'
const activeChipClass = 'border-slate-900 bg-slate-900 text-white shadow-lg scale-105 hover:border-slate-900 hover:bg-slate-900 hover:text-white dark:border-white/92 dark:bg-white/92 dark:text-black dark:hover:border-white/92 dark:hover:bg-white/92 dark:hover:text-black'
const tagClass = 'rounded-full border border-slate-300/30 bg-white/82 px-2 py-1 text-xs text-black backdrop-blur-[18px] shadow-[0_18px_48px_rgba(148,163,184,0.18)] dark:border-white/12 dark:bg-white/9 dark:text-white dark:shadow-[0_18px_48px_rgba(0,0,0,0.34)]'
</script>

<template>
  <div max-w-4xl mx-auto space-y-10 min-h-screen text-black dark:text-white flex justify-center items-start>
    <div w-full max-w-4xl p-4 md:p-10>
      <section>
        <div class="mb-6 flex flex-col items-center text-center">
          <h1 text-5xl font-bold mb-2 text-black dark:text-white>Blogs</h1>
          <p text-sm text-gray-500 dark:text-gray-400 mb-4>
            Notes about backend architecture, TypeScript, queues, APIs, and the small decisions behind reliable software.
          </p>
        </div>

        <div class="category-tabs" flex gap-3 mb-8 flex-wrap>
          <button
            v-for="(category, index) in categories"
            :key="category"
            type="button"
            :class="[chipClass, selectedCategory === category ? activeChipClass : inactiveChipClass]"
            :style="{ animationDelay: `${index * 0.1}s` }"
            @click="selectedCategory = category"
          >
            {{ category }}
          </button>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <router-link
            v-for="(blog, index) in filteredBlogs"
            :key="blog.slug"
            :to="`/blogs/${blog.slug}`"
            :class="shellClass"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div :class="overlayClass"></div>
            <article class="relative p-6">
              <div class="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                <span>{{ blog.category }}</span>
                <span aria-hidden="true">/</span>
                <time :datetime="blog.date">{{ blog.date }}</time>
                <span aria-hidden="true">/</span>
                <span>{{ blog.readTime }}</span>
              </div>

              <div class="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 class="text-2xl font-semibold text-black dark:text-white">{{ blog.title }}</h2>
                  <p class="mt-3 leading-7 text-gray-700 dark:text-gray-300">{{ blog.excerpt }}</p>
                </div>
                <span class="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-300/30 bg-white/74 text-black backdrop-blur-[18px] dark:border-white/14 dark:bg-white/8 dark:text-white">
                  <i class="i-carbon:arrow-up-right text-lg" />
                </span>
              </div>

              <div class="flex flex-wrap gap-2">
                <span v-for="tag in blog.tags" :key="tag" :class="tagClass">{{ tag }}</span>
              </div>
            </article>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>
