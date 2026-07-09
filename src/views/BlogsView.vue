<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { blogs } from '../utils/blogs'
import { blogsSEO } from '../utils/seo/blog'

useHead(blogsSEO)

const shellClass = 'bp-card animate-project-rise overflow-hidden'
const tagClass = 'bp-chip'
</script>

<template>
  <FloorSection level="L-04" name="Journal / Field Notes" elevation="+0.00 m" :top-slab="false" eager>
  <div max-w-4xl mx-auto space-y-10 min-h-screen text-black dark:text-white flex justify-center items-start>
    <div w-full max-w-4xl p-4 md:p-10>
      <section>
        <div class="mb-6 flex flex-col items-center text-center">
          <h1 text-5xl font-bold mb-2 text-black dark:text-white>Blogs</h1>
          <p text-sm text-gray-500 dark:text-gray-400 mb-4>
            Notes about backend architecture, TypeScript, queues, APIs, and the small decisions behind reliable software.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <router-link
            v-for="(blog, index) in blogs"
            :key="blog.slug"
            :to="`/blogs/${blog.slug}`"
            :class="shellClass"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
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
                  <h2 class="text-2xl font-semibold text-black dark:text-gray-300">{{ blog.title }}</h2>
                  <p class="mt-3 leading-7 text-black dark:text-gray-400">{{ blog.excerpt }}</p>
                </div>
                <span class="bp-icon-btn mt-1 shrink-0">
                  <i class="i-carbon:arrow-up-right" />
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
  </FloorSection>
</template>
