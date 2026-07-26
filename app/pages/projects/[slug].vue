<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { getCaseStudyBySlug, type CaseBuiltItem, type CaseIncident } from '~~/shared/utils/caseStudies'
import { createCaseStudySEO } from '~~/shared/utils/seo/case-study'
import { getBlogBySlug } from '~~/shared/utils/blogs'

const route = useRoute()

const slug = computed(() => String(route.params.slug || ''))
const cs = computed(() => getCaseStudyBySlug(slug.value))

// Unknown slug → genuine 404 (see blogs/[slug].vue for the full rationale).
if (!cs.value) {
  throw createError({ statusCode: 404, statusMessage: 'Not Found', fatal: true })
}

useHead(computed(() => createCaseStudySEO(cs.value!)))

const relatedPosts = computed(() =>
  (cs.value?.relatedBlogSlugs ?? [])
    .map(getBlogBySlug)
    .filter((post): post is NonNullable<ReturnType<typeof getBlogBySlug>> => Boolean(post)),
)

const sections = computed(() => {
  const c = cs.value
  if (!c) return []
  return [
    { id: 'overview', label: 'Overview', has: c.overview.length > 0 },
    { id: 'challenges', label: 'Challenges', has: c.challenges.length > 0 },
    { id: 'built', label: 'What I Built', has: c.built.length > 0 },
    { id: 'production', label: 'Production Problems', has: c.incidents.length > 0 },
    { id: 'decisions', label: 'Engineering Decisions', has: c.decisions.length > 0 },
    { id: 'performance', label: 'Performance', has: c.performance.length > 0 },
    { id: 'security', label: 'Security', has: c.security.length > 0 },
    { id: 'lessons', label: 'Lessons Learned', has: c.lessons.length > 0 },
    { id: 'result', label: 'Result', has: c.result.length > 0 },
  ].filter((s) => s.has)
})

const sectionNumber = (id: string) =>
  String(sections.value.findIndex((s) => s.id === id) + 1).padStart(2, '0')

const builtFields = (item: CaseBuiltItem): [string, string][] =>
  ([
    ['Problem', item.problem],
    ['Approach', item.approach],
    ['Implementation', item.implementation],
    ['Outcome', item.outcome],
  ] as [string, string | undefined][]).filter((f): f is [string, string] => Boolean(f[1]))

const incidentFields = (item: CaseIncident): [string, string][] => [
  ['Problem', item.problem],
  ['Root cause', item.rootCause],
  ['Solution', item.solution],
  ['Result', item.result],
]

// Scrollspy for the sticky section nav.
const activeSection = ref('')
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') return
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeSection.value = entry.target.id
      }
    },
    // A narrow horizontal band near the top of the viewport: the section
    // crossing it is the one being read.
    { rootMargin: '-25% 0px -65% 0px' },
  )
  document
    .querySelectorAll('[data-case-section]')
    .forEach((el) => observer!.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <main>
    <FloorSection
      level="L-03"
      name="Project / Deep Dive"
      elevation="+0.00 m"
      :top-slab="false"
      eager
    >
      <div class="min-h-screen text-black dark:text-white">
        <article v-if="cs" class="mx-auto w-full max-w-3xl px-4 py-8 md:px-6 md:py-14">
          <!-- Visible breadcrumb corroborating the BreadcrumbList JSON-LD -->
          <nav aria-label="Breadcrumb" class="bp-mono text-xs">
            <ol class="flex flex-wrap items-center gap-2">
              <li><router-link to="/" class="bp-tab">Home</router-link></li>
              <li aria-hidden="true">/</li>
              <li><router-link to="/projects" class="bp-tab">Projects</router-link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" class="opacity-70">{{ cs.name }}</li>
            </ol>
          </nav>

          <!-- Hero -->
          <header class="mt-12 md:mt-16">
            <div class="flex items-center gap-3">
              <img
                v-if="cs.logo"
                :src="cs.logo"
                :alt="`${cs.name} logo`"
                class="h-6 w-6 object-contain"
                width="24"
                height="24"
                loading="eager"
                decoding="async"
              />
              <p class="case-label">
                Deep Dive • {{ cs.category
                }}<template v-if="cs.timeline"> • {{ cs.timeline }}</template>
              </p>
            </div>
            <h1 class="mt-6 text-5xl font-bold leading-[1.04] tracking-tight md:text-7xl">
              {{ cs.name }}
              <span
                v-if="cs.subtitle"
                class="mt-3 block text-2xl font-semibold tracking-tight text-gray-600 dark:text-gray-400 md:text-3xl"
              >
                {{ cs.subtitle }}
              </span>
            </h1>
            <p
              class="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400 md:text-xl"
            >
              {{ cs.summary }}
            </p>

            <!-- Visible authorship + freshness matching the TechArticle schema dates -->
            <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
              By
              <router-link
                to="/"
                class="font-semibold text-black underline underline-offset-3 dark:text-gray-200"
                >Mohammed Mostafa</router-link
              >
              · Published <time :datetime="cs.datePublished">{{ cs.datePublished }}</time>
              <template v-if="cs.dateModified && cs.dateModified !== cs.datePublished">
                · Updated <time :datetime="cs.dateModified">{{ cs.dateModified }}</time>
              </template>
            </p>

            <div class="mt-10 flex flex-wrap gap-3">
              <a
                v-if="cs.link"
                :href="cs.link"
                target="_blank"
                rel="noopener noreferrer"
                class="case-btn"
              >
                Live Website
                <i class="i-carbon:arrow-up-right w-3.5 h-3.5" aria-hidden="true" />
              </a>
              <a
                v-if="cs.github"
                :href="cs.github"
                target="_blank"
                rel="noopener noreferrer"
                class="case-btn"
              >
                GitHub
                <i class="i-carbon:logo-github w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            <dl class="case-rule mt-12 grid grid-cols-1 gap-8 pt-8 sm:grid-cols-3">
              <div>
                <dt class="case-label">Role</dt>
                <dd class="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
                  {{ cs.role }}
                </dd>
              </div>
              <div>
                <dt class="case-label">Timeline</dt>
                <dd class="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
                  {{ cs.timeline || "—" }}
                </dd>
              </div>
              <div>
                <dt class="case-label">Stack</dt>
                <dd class="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  <span
                    v-for="tech in cs.stack"
                    :key="tech"
                    class="inline-flex items-center gap-1.5 text-sm leading-6 text-gray-700 dark:text-gray-300"
                  >
                    <TagIcon :tag="tech" size="h-4 w-4" />
                    {{ tech }}
                  </span>
                </dd>
              </div>
            </dl>
          </header>

          <!-- Sticky section nav -->
          <nav class="case-sticky mt-14" aria-label="Case study sections">
            <ul class="flex gap-6 overflow-x-auto py-3 whitespace-nowrap">
              <li v-for="section in sections" :key="section.id">
                <a
                  :href="`#${section.id}`"
                  class="case-nav-link"
                  :class="{ 'is-active': activeSection === section.id }"
                >
                  {{ section.label }}
                </a>
              </li>
            </ul>
          </nav>

          <!-- Overview -->
          <section
            v-if="cs.overview.length"
            id="overview"
            data-case-section
            class="case-section"
          >
            <p class="case-label">{{ sectionNumber("overview") }}</p>
            <h2 class="case-h2">Overview</h2>
            <div class="case-prose mt-8 space-y-5">
              <p v-for="(paragraph, i) in cs.overview" :key="i">{{ paragraph }}</p>
            </div>
          </section>

          <!-- Challenges -->
          <section
            v-if="cs.challenges.length"
            id="challenges"
            data-case-section
            class="case-section case-rule"
          >
            <p class="case-label">{{ sectionNumber("challenges") }}</p>
            <h2 class="case-h2">Challenges</h2>
            <div class="mt-8 space-y-10">
              <div v-for="challenge in cs.challenges" :key="challenge.title">
                <h3 class="text-lg font-semibold">{{ challenge.title }}</h3>
                <p class="case-prose mt-3">{{ challenge.body }}</p>
              </div>
            </div>
          </section>

          <!-- What I Built -->
          <section
            v-if="cs.built.length"
            id="built"
            data-case-section
            class="case-section case-rule"
          >
            <p class="case-label">{{ sectionNumber("built") }}</p>
            <h2 class="case-h2">What I Built</h2>
            <div class="mt-8 space-y-14">
              <div v-for="item in cs.built" :key="item.title">
                <h3 class="text-xl font-semibold tracking-tight">{{ item.title }}</h3>
                <dl class="mt-5 space-y-5">
                  <div v-for="[label, text] in builtFields(item)" :key="label">
                    <dt class="case-microlabel">{{ label }}</dt>
                    <dd class="case-prose mt-1.5">{{ text }}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          <!-- Production Problems -->
          <section
            v-if="cs.incidents.length"
            id="production"
            data-case-section
            class="case-section case-rule"
          >
            <p class="case-label">{{ sectionNumber("production") }}</p>
            <h2 class="case-h2">Production Problems</h2>
            <div class="mt-8 space-y-14">
              <div v-for="incident in cs.incidents" :key="incident.title">
                <h3 class="text-xl font-semibold tracking-tight">{{ incident.title }}</h3>
                <dl class="mt-5 space-y-5">
                  <div v-for="[label, text] in incidentFields(incident)" :key="label">
                    <dt class="case-microlabel">{{ label }}</dt>
                    <dd class="case-prose mt-1.5">{{ text }}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          <!-- Engineering Decisions -->
          <section
            v-if="cs.decisions.length"
            id="decisions"
            data-case-section
            class="case-section case-rule"
          >
            <p class="case-label">{{ sectionNumber("decisions") }}</p>
            <h2 class="case-h2">Engineering Decisions</h2>
            <div class="mt-8 space-y-12">
              <div v-for="decision in cs.decisions" :key="decision.title">
                <h3 class="text-xl font-semibold tracking-tight">{{ decision.title }}</h3>
                <p class="case-prose mt-4">{{ decision.reasoning }}</p>
                <div v-if="decision.tradeoff" class="mt-4">
                  <p class="case-microlabel">Tradeoff</p>
                  <p class="case-prose mt-1.5">{{ decision.tradeoff }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Performance -->
          <section
            v-if="cs.performance.length"
            id="performance"
            data-case-section
            class="case-section case-rule"
          >
            <p class="case-label">{{ sectionNumber("performance") }}</p>
            <h2 class="case-h2">Performance</h2>
            <div class="mt-8 space-y-10">
              <div v-for="note in cs.performance" :key="note.title">
                <h3 class="text-lg font-semibold">{{ note.title }}</h3>
                <p class="case-prose mt-3">{{ note.body }}</p>
              </div>
            </div>
          </section>

          <!-- Security -->
          <section
            v-if="cs.security.length"
            id="security"
            data-case-section
            class="case-section case-rule"
          >
            <p class="case-label">{{ sectionNumber("security") }}</p>
            <h2 class="case-h2">Security</h2>
            <div class="mt-8 space-y-10">
              <div v-for="note in cs.security" :key="note.title">
                <h3 class="text-lg font-semibold">{{ note.title }}</h3>
                <p class="case-prose mt-3">{{ note.body }}</p>
              </div>
            </div>
          </section>

          <!-- Lessons Learned -->
          <section
            v-if="cs.lessons.length"
            id="lessons"
            data-case-section
            class="case-section case-rule"
          >
            <p class="case-label">{{ sectionNumber("lessons") }}</p>
            <h2 class="case-h2">Lessons Learned</h2>
            <div class="mt-8 space-y-10">
              <div v-for="note in cs.lessons" :key="note.title">
                <h3 class="text-lg font-semibold">{{ note.title }}</h3>
                <p class="case-prose mt-3">{{ note.body }}</p>
              </div>
            </div>
          </section>

          <!-- Result -->
          <section
            v-if="cs.result.length"
            id="result"
            data-case-section
            class="case-section case-rule"
          >
            <p class="case-label">{{ sectionNumber("result") }}</p>
            <h2 class="case-h2">Result</h2>
            <div class="case-prose mt-8 space-y-5">
              <p v-for="(paragraph, i) in cs.result" :key="i">{{ paragraph }}</p>
            </div>
          </section>

          <!-- Further reading: related blog posts -->
          <section v-if="relatedPosts.length" class="case-rule py-16">
            <h2 class="case-h2">Further Reading</h2>
            <ul class="mt-8 space-y-6">
              <li v-for="post in relatedPosts" :key="post.slug">
                <router-link :to="`/blogs/${post.slug}`" class="group block">
                  <span
                    class="block text-lg font-semibold tracking-tight transition-opacity group-hover:opacity-70"
                  >
                    {{ post.title }}
                  </span>
                  <span class="case-prose mt-1 block">{{ post.excerpt }}</span>
                </router-link>
              </li>
            </ul>
          </section>

          <footer class="case-rule mt-4 pt-10">
            <router-link :to="'/projects'" class="case-nav-link">
              ← All projects
            </router-link>
          </footer>
        </article>
      </div>
    </FloorSection>
  </main>
</template>

<!-- Styles live in app/assets/blueprint.css under "Editorial case-study system". -->
