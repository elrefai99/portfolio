<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import { getBlogBySlug } from '../utils/blogs'
import { createBlogPostSEO, notFoundSEO } from '../utils/tags'

const route = useRoute()

const slug = computed(() => String(route.params.slug || ''))
const blog = computed(() => getBlogBySlug(slug.value))

useHead(computed(() => (blog.value ? createBlogPostSEO(blog.value) : notFoundSEO)))

const panelClass = 'rounded-xl border border-slate-300/30 bg-white/74 backdrop-blur-[18px] shadow-[0_18px_48px_rgba(148,163,184,0.18)] dark:border-white/14 dark:bg-white/8 dark:shadow-[0_18px_48px_rgba(0,0,0,0.34)]'
const tagClass = 'rounded-full border border-slate-300/30 bg-white/82 px-2 py-1 text-xs text-black backdrop-blur-[18px] shadow-[0_18px_48px_rgba(148,163,184,0.18)] dark:border-white/12 dark:bg-white/9 dark:text-white dark:shadow-[0_18px_48px_rgba(0,0,0,0.34)]'
</script>

<template>
  <div max-w-4xl mx-auto min-h-screen text-black dark:text-white flex justify-center items-start>
    <main w-full max-w-4xl p-4 md:p-10>
      <article v-if="blog" class="space-y-6">
        <router-link
          to="/blogs"
          class="inline-flex items-center gap-2 rounded-lg border border-slate-300/30 bg-white/74 px-3 py-1.5 text-sm font-medium text-black backdrop-blur-[18px] shadow-[0_18px_48px_rgba(148,163,184,0.18)] transition-all duration-200 hover:border-slate-500/32 hover:bg-white/92 dark:border-white/14 dark:bg-white/8 dark:text-white dark:shadow-[0_18px_48px_rgba(0,0,0,0.34)] dark:hover:border-white/22 dark:hover:bg-white/14"
        >
          <i class="i-carbon:arrow-left w-4 h-4" />
          Blogs
        </router-link>

        <header :class="`${panelClass} overflow-hidden p-6 md:p-8`">
          <div class="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            <span>{{ blog.category }}</span>
            <span aria-hidden="true">/</span>
            <time :datetime="blog.date">{{ blog.date }}</time>
            <span aria-hidden="true">/</span>
            <span>{{ blog.readTime }}</span>
          </div>

          <h1 class="text-4xl font-bold leading-tight text-black dark:text-white md:text-5xl">{{ blog.title }}</h1>
          <p class="mt-4 max-w-3xl text-base leading-7 text-gray-700 dark:text-gray-300 md:text-lg">
            {{ blog.excerpt }}
          </p>

          <div class="mt-6 flex flex-wrap gap-2">
            <span v-for="tag in blog.tags" :key="tag" :class="tagClass">{{ tag }}</span>
          </div>
        </header>

        <section :class="`${panelClass} p-6 md:p-8`">
          <div class="blog-content space-y-6">
            <template v-for="(block, index) in blog.blocks" :key="index">
              <p
                v-if="block.type === 'paragraph'"
                class="text-base leading-8 text-gray-700 dark:text-gray-300"
              >
                {{ block.text }}
              </p>

              <h2
                v-else-if="block.type === 'heading'"
                class="pt-2 text-2xl font-semibold text-black dark:text-white"
              >
                {{ block.text }}
              </h2>

              <ul
                v-else-if="block.type === 'list'"
                class="list-disc space-y-2 pl-5 text-base leading-7 text-gray-700 dark:text-gray-300"
              >
                <li v-for="item in block.items" :key="item">{{ item }}</li>
              </ul>

              <div
                v-else-if="block.type === 'code'"
                class="overflow-hidden rounded-xl border border-slate-300/30 bg-slate-950 text-white shadow-[0_18px_48px_rgba(15,23,42,0.24)] dark:border-white/14"
              >
                <div class="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 text-xs text-white/70">
                  <span class="font-mono">{{ block.filename || 'snippet' }}</span>
                  <span class="rounded-full bg-white/10 px-2 py-1 font-mono uppercase">{{ block.language }}</span>
                </div>
                <pre class="overflow-x-auto p-4 text-sm leading-7"><code>{{ block.code }}</code></pre>
              </div>
            </template>
          </div>
        </section>
      </article>

      <section v-else :class="`${panelClass} p-6 text-center md:p-8`">
        <h1 class="text-3xl font-semibold text-black dark:text-white">Blog not found</h1>
        <p class="mt-3 text-gray-700 dark:text-gray-300">This post does not exist or was moved.</p>
        <router-link
          to="/blogs"
          class="mt-6 inline-flex items-center gap-2 rounded-lg border border-slate-300/30 bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-slate-700 dark:border-white/14 dark:bg-white/92 dark:text-black dark:hover:bg-white"
        >
          <i class="i-carbon:arrow-left w-4 h-4" />
          Back to blogs
        </router-link>
      </section>
    </main>
  </div>
</template>
