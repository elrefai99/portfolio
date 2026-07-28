<script setup lang="ts">
import { computed } from 'vue'
import { getBlogBySlug, type BlogPost } from '~~/shared/utils/blogs'
import { caseStudies } from '~~/shared/utils/caseStudies'
import { createBlogPostSEO } from '~~/shared/utils/seo/blog'
import { slugifyHeading } from '~~/shared/utils/headingIds'

const route = useRoute()

const slug = computed(() => String(route.params.slug || ''))
const blog = computed(() => getBlogBySlug(slug.value))

// Unknown slug → genuine 404: unlisted slugs are never prerendered (the host
// serves 404.html), and a runtime hit renders the Nuxt error page with a 404.
if (!blog.value) {
  throw createError({ statusCode: 404, statusMessage: 'Not Found', fatal: true })
}

useHead(computed(() => createBlogPostSEO(blog.value!)))

// Reverse of the case studies' relatedBlogSlugs: link back to the deep dives
// this post supports, so posts aren't internal-link dead ends.
const relatedCaseStudies = computed(() =>
  caseStudies.filter((cs) => cs.relatedBlogSlugs?.includes(slug.value)),
)

// Post-to-post internal links (relatedSlugs in blogs.ts). The anchor text is
// the full post title — keyword-rich anchors are a ranking signal for the
// linked post's target terms.
const relatedPosts = computed(() =>
  (blog.value?.relatedSlugs ?? [])
    .map((relatedSlug) => getBlogBySlug(relatedSlug))
    .filter((post): post is BlogPost => Boolean(post)),
)

const panelClass = 'bp-card'
const tagClass = 'bp-chip'
</script>

<template>
  <!-- <main> wraps the floor here (matching every other page) rather than
       sitting inside it, so the document has one top-level main landmark. -->
  <main>
    <FloorSection
      level="L-04"
      name="Journal / Article"
      elevation="+0.00 m"
      :top-slab="false"
      eager
    >
      <div
        max-w-4xl
        mx-auto
        min-h-screen
        flex
        justify-center
        items-start
      >
        <div w-full max-w-4xl p-4 md:p-10>
        <article v-if="blog" class="space-y-6">
          <!-- Visible breadcrumb corroborating the BreadcrumbList JSON-LD -->
          <nav aria-label="Breadcrumb" class="bp-mono text-xs">
            <ol class="flex flex-wrap items-center gap-2">
              <li><router-link to="/" class="bp-tab">Home</router-link></li>
              <li aria-hidden="true">/</li>
              <li><router-link to="/blogs" class="bp-tab">Blog</router-link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" class="max-w-56 truncate opacity-70 sm:max-w-md">
                {{ blog.title }}
              </li>
            </ol>
          </nav>

          <header :class="`${panelClass} overflow-hidden p-6 md:p-8`">
            <div
              class="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-[var(--bp-muted)]"
            >
              <span>{{ blog.category }}</span>
              <span aria-hidden="true">/</span>
              <time :datetime="blog.date">{{ blog.date }}</time>
              <span aria-hidden="true">/</span>
              <span>{{ blog.readTime }}</span>
            </div>

            <h1
              class="text-4xl font-bold leading-tight text-[var(--bp-blue)] md:text-5xl"
            >
              {{ blog.title }}
            </h1>
            <p
              class="mt-4 max-w-3xl text-base leading-7 text-[var(--bp-blue-dim)] md:text-lg"
            >
              {{ blog.excerpt }}
            </p>

            <!-- Visible authorship + freshness (E-E-A-T: schema dates need on-page corroboration) -->
            <p class="mt-4 text-sm text-[var(--bp-blue-dim)]">
              By
              <router-link
                to="/"
                class="font-semibold text-[var(--bp-blue)] underline underline-offset-3"
                >Mohammed Mostafa</router-link
              >
              · Published <time :datetime="blog.date">{{ blog.date }}</time>
              <template v-if="blog.updated && blog.updated !== blog.date">
                · Updated <time :datetime="blog.updated">{{ blog.updated }}</time>
              </template>
            </p>

            <div class="mt-6 flex flex-wrap gap-2">
              <span v-for="tag in blog.tags" :key="tag" :class="tagClass">{{ tag }}</span>
            </div>
          </header>

          <TableOfContents :blocks="blog.blocks" />

          <section :class="`${panelClass} p-6 md:p-8`">
            <ContentBlocks :blocks="blog.blocks" />
          </section>

          <!-- FAQ: rendered visibly because the FAQPage JSON-LD describes it.
               Structured data for content that is not on the page is a policy
               violation, so these two must always ship together. -->
          <section
            v-if="blog.faq?.length"
            :class="`${panelClass} p-6 md:p-8`"
            aria-labelledby="faq-heading"
          >
            <h2
              id="faq-heading"
              class="scroll-mt-24 text-2xl font-semibold text-[var(--bp-blue)]"
            >
              Frequently asked questions
            </h2>
            <dl class="mt-6 space-y-6">
              <div v-for="entry in blog.faq" :key="entry.question">
                <dt
                  :id="`faq-${slugifyHeading(entry.question)}`"
                  class="scroll-mt-24 text-lg font-semibold text-[var(--bp-blue)]"
                >
                  {{ entry.question }}
                </dt>
                <dd class="mt-2 text-base leading-8 text-[var(--bp-blue-dim)]">
                  {{ entry.answer }}
                </dd>
              </div>
            </dl>
          </section>

          <!-- Related posts: keyword-rich internal links between articles -->
          <aside
            v-if="relatedPosts.length"
            :class="`${panelClass} p-6 md:p-8`"
            aria-label="Related blog posts"
          >
            <p
              class="text-xs font-semibold uppercase tracking-wide text-[var(--bp-muted)]"
            >
              Related notes
            </p>
            <ul class="mt-4 space-y-4">
              <li v-for="related in relatedPosts" :key="related.slug">
                <router-link :to="`/blogs/${related.slug}`" class="group block">
                  <span
                    class="block text-lg font-semibold text-[var(--bp-blue)] transition-opacity group-hover:opacity-70"
                  >
                    {{ related.title }}
                  </span>
                  <span
                    class="mt-1 block text-sm leading-6 text-[var(--bp-blue-dim)]"
                    >{{ related.excerpt }}</span
                  >
                </router-link>
              </li>
            </ul>
          </aside>

          <!-- Project deep dives this post supports -->
          <aside
            v-if="relatedCaseStudies.length"
            :class="`${panelClass} p-6 md:p-8`"
            aria-label="Related project deep dives"
          >
            <p
              class="text-xs font-semibold uppercase tracking-wide text-[var(--bp-muted)]"
            >
              From the projects behind this post
            </p>
            <ul class="mt-4 space-y-4">
              <li v-for="cs in relatedCaseStudies" :key="cs.slug">
                <router-link :to="`/projects/${cs.slug}`" class="group block">
                  <span
                    class="block text-lg font-semibold text-[var(--bp-blue)] transition-opacity group-hover:opacity-70"
                  >
                    {{ cs.name }} — deep dive
                  </span>
                  <span
                    class="mt-1 block text-sm leading-6 text-[var(--bp-blue-dim)]"
                    >{{ cs.summary }}</span
                  >
                </router-link>
              </li>
            </ul>
          </aside>
        </article>
        </div>
      </div>
    </FloorSection>
  </main>
</template>
