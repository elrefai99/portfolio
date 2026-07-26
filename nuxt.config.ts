import { sitePaths } from './shared/utils/site'
import { blogs } from './shared/utils/blogs'
import { caseStudies } from './shared/utils/caseStudies'
import { projects } from './shared/utils/projects'
import { featuredPosts } from './shared/utils/featuredPosts'

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

// SelectedWriting.vue renders featuredPosts (slug/title/category only) so the
// home chunk never imports the blog corpus. That copy has to stay identical to
// the real posts or the homepage links carry stale anchor text — fail the build
// the moment they diverge.
{
  for (const featured of featuredPosts) {
    const post = blogs.find((blog) => blog.slug === featured.slug)
    if (!post) {
      throw new Error(`featuredPosts references unknown blog slug: ${featured.slug}`)
    }
    if (post.title !== featured.title || post.category !== featured.category) {
      throw new Error(
        `featuredPosts is out of sync with blogs.ts for "${featured.slug}" — ` +
        `expected title "${post.title}" / category "${post.category}", ` +
        `got "${featured.title}" / "${featured.category}"`,
      )
    }
  }
}

const blogRoutes = blogs.map((blog) => `${sitePaths.blogs}/${blog.slug}`)
const caseStudyRoutes = caseStudies.map((cs) => `${sitePaths.projects}/${cs.slug}`)

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
    externals: { external: ['@resvg/resvg-js'] },
  },

  hooks: {
    // MermaidDiagram.vue defers the diagram renderer behind an
    // IntersectionObserver so it never touches the critical path. Nuxt's client
    // manifest undid that: it emitted <link rel="prefetch"> for the whole
    // mermaid + katex graph on every article page — ~140KB gz downloaded at
    // idle even on the posts that contain no diagram at all.
    //
    // Name-matching alone is not enough: mermaid's ~600KB core lands in an
    // anonymous shared chunk (`_Cyw4XVvq.js`), so walk the import graph out
    // from the named mermaid/katex modules and clear the hint on everything
    // reachable. Only `prefetch` is cleared — `preload` still applies when a
    // page genuinely needs the chunk.
    'build:manifest'(manifest) {
      const isRoot = (key: string) => /(^|\/)(mermaid|katex)([/@.-]|$)/i.test(key)
      const seen = new Set<string>()
      const queue = Object.keys(manifest).filter(isRoot)

      while (queue.length) {
        const key = queue.pop()!
        if (seen.has(key)) continue
        seen.add(key)
        const entry = manifest[key]
        if (!entry) continue
        entry.prefetch = false
        for (const next of [...(entry.imports ?? []), ...(entry.dynamicImports ?? [])]) {
          if (!seen.has(next)) queue.push(next)
        }
      }
    },
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
        { rel: 'dns-prefetch', href: 'https://ghchart.rshah.org' },
        // dns-prefetch alone still leaves TLS on the path when the lazy image
        // fires; preconnect completes the handshake up front. crossorigin is
        // required — the chart is fetched as an anonymous image.
        { rel: 'preconnect', href: 'https://ghchart.rshah.org', crossorigin: '' },
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
      noscript: [
        {
          innerHTML: '<style>.bp-floor .bp-floor__body{opacity:1;transform:none}</style>',
        },
      ],
      script: [
        {
          innerHTML:
            "(function(){try{var mode=localStorage.getItem('theme-mode');var dark=mode==='dark'||(mode!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',dark)}catch(e){}})()",
          tagPosition: 'head',
          tagPriority: 'critical',
        },
      ],
    },
  },
})
