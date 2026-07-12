import { sitePaths } from './shared/utils/site'
import { blogs } from './shared/utils/blogs'
import { caseStudies } from './shared/utils/caseStudies'
import { projects } from './shared/utils/projects'

// The `caseStudy` flag on projects.ts exists so entry-chunk components never
// import the case-study corpus just to know a deep dive exists. Fail the build
// (and dev server) the moment the flag and the corpus disagree.
{
  const corpusSlugs = new Set(caseStudies.map((cs) => cs.slug))
  const flaggedSlugs = new Set(projects.filter((p) => p.caseStudy).map((p) => p.slug))
  const missingFlag = [...corpusSlugs].filter((slug) => !flaggedSlugs.has(slug))
  const staleFlag = [...flaggedSlugs].filter((slug) => !corpusSlugs.has(slug))
  if (missingFlag.length || staleFlag.length) {
    throw new Error(
      `projects.ts caseStudy flags out of sync with caseStudies.ts — ` +
      `missing flag: [${missingFlag.join(', ')}], stale flag: [${staleFlag.join(', ')}]`,
    )
  }
}

const blogRoutes = blogs.map((blog) => `${sitePaths.blogs}/${blog.slug}`)
const caseStudyRoutes = caseStudies.map((cs) => `${sitePaths.projects}/${cs.slug}`)

// Every OG card gets prerendered to a static PNG via the server route. Compute
// the URL list here without importing the renderer (keeps @resvg out of the
// config graph). Mirrors staticCards + projectCard + blogCard in server/utils/og-image.ts.
const ogRoutes = [
  '/og/page-home.png',
  '/og/page-projects.png',
  '/og/page-blogs.png',
  '/og/page-resume.png',
  ...caseStudies.map((cs) => `/og/project-${cs.slug}.png`),
  ...blogs.map((blog) => `/og/blog-${blog.slug}.png`),
]

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  ssr: true,

  modules: ['@unocss/nuxt', '@vueuse/nuxt'],

  css: ['@unocss/reset/tailwind.css', '~/assets/main.css', '~/assets/blueprint.css'],

  nitro: {
    // Fully static output to .output/public. Explicit so Vercel's environment
    // detection can't switch to a serverful preset.
    preset: 'static',
    prerender: {
      crawlLinks: true,
      failOnError: true,
      routes: [
        sitePaths.home,
        sitePaths.projects,
        sitePaths.blogs,
        sitePaths.resume,
        '/sitemap.xml',
        '/rss.xml',
        ...caseStudyRoutes,
        ...blogRoutes,
        ...ogRoutes,
      ],
    },
    // Native addon — keep it required at runtime, never bundled into the output.
    externals: { external: ['@resvg/resvg-js'] },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'theme-color', content: '#faf9f5', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#141413', media: '(prefers-color-scheme: dark)' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon', sizes: '48x48' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
        { rel: 'manifest', href: '/manifest.json' },
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          title: 'Blog • Mohammed Mostafa',
          href: '/rss.xml',
        },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/alexandria-latin.woff2',
          crossorigin: '',
        },
      ],
      script: [
        {
          // FOUC prevention — reads the same 'theme-mode' key that darkmode.vue's
          // useDark writes, and toggles the `dark` class before first paint.
          innerHTML:
            "(function(){try{var mode=localStorage.getItem('theme-mode');var dark=mode==='dark'||(mode!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',dark)}catch(e){}})()",
          tagPosition: 'head',
          tagPriority: 'critical',
        },
      ],
    },
  },
})
