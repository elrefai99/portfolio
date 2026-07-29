<script setup lang="ts">
import { computed } from "vue";
import { getBlogsPage, blogsPageCount, type BlogPost } from "~~/shared/utils/blogs";
import { blogsIndexPath } from "~~/shared/utils/seo/blog";

const props = defineProps<{ page: number }>();

// Newest-first slice for this page; grouped by category within the slice so
// the archive still carries the topical <h2>/<h3> structure per page rather
// than flattening into one undifferentiated list.
const groupedPosts = computed(() => {
  const groups = new Map<string, BlogPost[]>();
  for (const post of getBlogsPage(props.page)) {
    const bucket = groups.get(post.category);
    if (bucket) bucket.push(post);
    else groups.set(post.category, [post]);
  }
  return [...groups.entries()];
});

const hasPrev = computed(() => props.page > 1);
const hasNext = computed(() => props.page < blogsPageCount);

const shellClass = "bp-card animate-project-rise overflow-hidden";
const tagClass = "bp-chip";
</script>

<template>
  <div>
    <!-- Visible breadcrumb corroborating the Blog BreadcrumbList JSON-LD -->
    <nav aria-label="Breadcrumb" class="bp-mono mb-6 text-xs">
      <ol class="flex flex-wrap items-center gap-2">
        <li><router-link to="/" class="bp-tab">Home</router-link></li>
        <li aria-hidden="true">/</li>
        <li v-if="page > 1"><router-link to="/blogs" class="bp-tab">Blog</router-link></li>
        <li v-else aria-current="page" class="opacity-70">Blog</li>
        <template v-if="page > 1">
          <li aria-hidden="true">/</li>
          <li aria-current="page" class="opacity-70">Page {{ page }}</li>
        </template>
      </ol>
    </nav>
    <section>
      <div class="mb-6 flex flex-col items-center text-center">
        <h1 text-5xl font-bold mb-2 class="text-[var(--bp-blue)]">Blog</h1>
        <p text-sm text-[var(--bp-muted)] mb-4 max-w-2xl>
          Backend engineering notes by Mohammed Mostafa on Node.js, TypeScript,
          Express.js, API architecture, message queues (BullMQ / Redis),
          authentication and payment-token security, and real-time systems
          (WebSockets, SSE, CRDTs) on AWS. Practical write-ups with code and diagrams
          from real projects like Lesoll, EgyStay, and SRVJ.
        </p>
      </div>

      <div
        v-for="([category, posts], groupIndex) in groupedPosts"
        :key="category"
        class="mb-12"
      >
        <h2 class="bp-mono mb-4 text-sm">{{ category }}</h2>
        <div class="grid grid-cols-1 gap-4">
          <router-link
            v-for="(blog, index) in posts"
            :key="blog.slug"
            :to="`/blogs/${blog.slug}`"
            :class="shellClass"
            :style="{ animationDelay: `${(groupIndex + index) * 0.1}s` }"
          >
            <article class="relative p-5 sm:p-6">
              <div
                class="mb-4 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-semibold uppercase tracking-wide text-[var(--bp-muted)]"
              >
                <time :datetime="blog.date">{{ blog.date }}</time>
                <span aria-hidden="true">/</span>
                <span>{{ blog.readTime }}</span>
              </div>

              <div class="mb-4 flex items-start justify-between gap-3 sm:gap-4">
                <div class="min-w-0">
                  <h3 class="text-xl sm:text-2xl font-semibold text-[var(--bp-blue)]">
                    {{ blog.title }}
                  </h3>
                  <p class="mt-3 leading-7 text-[var(--bp-blue-dim)]">
                    {{ blog.excerpt }}
                  </p>
                </div>
                <span class="bp-icon-btn mt-1 shrink-0">
                  <i class="i-carbon:arrow-up-right" />
                </span>
              </div>

              <div class="flex flex-wrap gap-2">
                <span v-for="tag in blog.tags" :key="tag" :class="tagClass">{{
                  tag
                }}</span>
              </div>
            </article>
          </router-link>
        </div>
      </div>

      <nav
        v-if="blogsPageCount > 1"
        aria-label="Blog archive pagination"
        class="mt-4 flex items-center justify-between gap-4"
      >
        <router-link
          v-if="hasPrev"
          :to="blogsIndexPath(page - 1)"
          class="bp-tab flex min-h-11 items-center gap-2 px-4"
        >
          <i class="i-carbon:arrow-left" aria-hidden="true" />
          Newer posts
        </router-link>
        <span v-else aria-hidden="true"></span>

        <p class="bp-mono text-xs text-[var(--bp-muted)]">
          Page {{ page }} of {{ blogsPageCount }}
        </p>

        <router-link
          v-if="hasNext"
          :to="blogsIndexPath(page + 1)"
          class="bp-tab flex min-h-11 items-center gap-2 px-4"
        >
          Older posts
          <i class="i-carbon:arrow-right" aria-hidden="true" />
        </router-link>
        <span v-else aria-hidden="true"></span>
      </nav>
    </section>
  </div>
</template>
