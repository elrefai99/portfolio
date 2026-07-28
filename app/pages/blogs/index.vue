<script setup lang="ts">
import { computed } from "vue";
import { blogs, type BlogPost } from "~~/shared/utils/blogs";
import { blogsSEO } from "~~/shared/utils/seo/blog";

useHead(blogsSEO);

// Group the index by category so the archive carries visible topical structure
// (an <h2> per subject, posts as <h3> beneath it) instead of one flat list.
//
// This is deliberately NOT a set of /blogs/tag/<x> routes: at five posts and 33
// distinct tags, all but four tags would resolve to a single-post page — thin,
// near-duplicate URLs that cost more in quality signals than the extra crawl
// paths are worth. Revisit per-topic routes once a topic carries ~4+ posts.
const groupedPosts = computed(() => {
  const groups = new Map<string, BlogPost[]>();
  // blogs is already newest-first; Map preserves insertion order, so the
  // most recently written category leads.
  for (const post of blogs) {
    const bucket = groups.get(post.category);
    if (bucket) bucket.push(post);
    else groups.set(post.category, [post]);
  }
  return [...groups.entries()];
});

const shellClass = "bp-card animate-project-rise overflow-hidden";
const tagClass = "bp-chip";
</script>

<template>
  <main>
    <FloorSection
      level="L-04"
      name="Journal / Field Notes"
      elevation="+0.00 m"
      :top-slab="false"
      eager
    >
      <div
        max-w-4xl
        mx-auto
        space-y-10
        min-h-screen
        flex
        justify-center
        items-start
      >
        <div w-full max-w-4xl p-4 md:p-10>
          <!-- Visible breadcrumb corroborating the Blog BreadcrumbList JSON-LD -->
          <nav aria-label="Breadcrumb" class="bp-mono mb-6 text-xs">
            <ol class="flex flex-wrap items-center gap-2">
              <li><router-link to="/" class="bp-tab">Home</router-link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" class="opacity-70">Blog</li>
            </ol>
          </nav>
          <section>
            <div class="mb-6 flex flex-col items-center text-center">
              <h1 text-5xl font-bold mb-2 class="text-[var(--bp-blue)]">
                Blog
              </h1>
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
          </section>
        </div>
      </div>
    </FloorSection>
  </main>
</template>
