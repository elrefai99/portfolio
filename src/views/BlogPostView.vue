<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import { getBlogBySlug } from '../utils/blogs'
import { caseStudies } from '../utils/caseStudies'
import { createBlogPostSEO } from '../utils/seo/blog'
import { notFoundSEO } from '../utils/seo/shared'

const route = useRoute()

const slug = computed(() => String(route.params.slug || ''))
const blog = computed(() => getBlogBySlug(slug.value))

useHead(computed(() => (blog.value ? createBlogPostSEO(blog.value) : notFoundSEO)))

// Reverse of the case studies' relatedBlogSlugs: link back to the deep dives
// this post supports, so posts aren't internal-link dead ends.
const relatedCaseStudies = computed(() =>
  caseStudies.filter((cs) => cs.relatedBlogSlugs?.includes(slug.value)),
)

const panelClass = 'bp-card'
const tagClass = 'bp-chip'
</script>

<template>
  <FloorSection level="L-04" name="Journal / Article" elevation="+0.00 m" :top-slab="false" eager>
  <div max-w-4xl mx-auto min-h-screen text-black dark:text-white flex justify-center items-start>
    <main w-full max-w-4xl p-4 md:p-10>
      <article v-if="blog" class="space-y-6">
        <router-link to="/blogs" class="bp-tab inline-flex items-center gap-2">
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

          <h1 class="text-4xl font-bold leading-tight text-black dark:text-gray-300 md:text-5xl">{{ blog.title }}</h1>
          <p class="mt-4 max-w-3xl text-base leading-7 text-black dark:text-gray-400 md:text-lg">
            {{ blog.excerpt }}
          </p>

          <div class="mt-6 flex flex-wrap gap-2">
            <span v-for="tag in blog.tags" :key="tag" :class="tagClass">{{ tag }}</span>
          </div>
        </header>

        <section :class="`${panelClass} p-6 md:p-8`">
          <ContentBlocks :blocks="blog.blocks" />
        </section>

        <!-- Project deep dives this post supports -->
        <aside v-if="relatedCaseStudies.length" :class="`${panelClass} p-6 md:p-8`" aria-label="Related project deep dives">
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            From the projects behind this post
          </p>
          <ul class="mt-4 space-y-4">
            <li v-for="cs in relatedCaseStudies" :key="cs.slug">
              <router-link :to="`/projects/${cs.slug}`" class="group block">
                <span class="block text-lg font-semibold text-black transition-opacity group-hover:opacity-70 dark:text-gray-300">
                  {{ cs.name }} — deep dive
                </span>
                <span class="mt-1 block text-sm leading-6 text-gray-700 dark:text-gray-400">{{ cs.summary }}</span>
              </router-link>
            </li>
          </ul>
        </aside>

      </article>

      <section v-else :class="`${panelClass} p-6 text-center md:p-8`">
        <h1 class="text-3xl font-semibold text-black dark:text-white">Blog not found</h1>
        <p class="mt-3 text-gray-700 dark:text-gray-300">This post does not exist or was moved.</p>
        <router-link to="/blogs" class="bp-tab is-active mt-6 inline-flex items-center gap-2">
          <i class="i-carbon:arrow-left w-4 h-4" />
          Back to blogs
        </router-link>
      </section>
    </main>
  </div>
  </FloorSection>
</template>
