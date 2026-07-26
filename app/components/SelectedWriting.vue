<script setup lang="ts">
import { featuredPosts } from '~~/shared/utils/featuredPosts'
import { sitePaths } from '~~/shared/utils/site'

const cardClass = 'bp-card flex flex-col p-6'
const footerLinkClass = 'bp-link'
</script>

<template>
  <div max-w-4xl mx-auto p-6 md:p-10>
    <div class="flex items-center justify-between mb-8">
      <h2 text-2xl font-bold text-black dark:text-white tracking-tight>Writing</h2>
      <router-link to="/blogs" :class="footerLinkClass">
        View all
        <i class="i-carbon:arrow-right w-4 h-4" />
      </router-link>
    </div>

    <div class="grid grid-cols-1 gap-4">
      <router-link
        v-for="post in featuredPosts"
        :key="post.slug"
        :to="`${sitePaths.blogs}/${post.slug}`"
        :class="cardClass"
      >
        <p
          class="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
        >
          {{ post.category }}
        </p>
        <h3 class="text-lg font-semibold text-black dark:text-gray-300">
          {{ post.title }}
        </h3>
      </router-link>
    </div>
  </div>
</template>
