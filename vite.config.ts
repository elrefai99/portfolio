import { execSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { resolve } from 'node:path'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import { defineConfig, type ViteDevServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import type {} from 'vite-ssg'
import { sitemapEntries, sitePaths, siteUrl } from './src/utils/site'
import { blogs } from './src/utils/blogs'
import { allCards, ensureFonts, renderOgPng } from './build/og-image'

// Source files whose last git commit date drives a route's <lastmod>. Keeps the
// sitemap freshness honest instead of relying on a hand-typed constant. Blog
// posts already carry their own `date`, and absolute (subdomain) URLs are skipped.
// Files that change the rendered output of *every* route (SEO head, theme,
// document shell). A commit touching these legitimately refreshes all lastmods.
const globalSources = ['src/utils/tags.ts', 'src/assets/blueprint.css', 'uno.config.ts', 'index.html']

const routeSources: Record<string, string[]> = {
  [sitePaths.home]: ['src/views/HomeView.vue', 'src/components/aboutme.vue', 'src/components/timeline.vue', ...globalSources],
  [sitePaths.projects]: ['src/views/projectsView.vue', 'src/utils/projects.ts', ...globalSources],
  [sitePaths.blogs]: ['src/views/BlogsView.vue', 'src/utils/blogs.ts', ...globalSources],
  [sitePaths.resume]: ['src/views/ResumeView.vue', ...globalSources],
}

// Most recent commit date (YYYY-MM-DD) across the given files, or undefined if
// git is unavailable (e.g. shallow CI checkout) so callers fall back gracefully.
const gitLastmod = (files: string[]): string | undefined => {
  const dates = files
    .map((file) => {
      try {
        return execSync(`git log -1 --format=%cs -- "${file}"`, { encoding: 'utf8' }).trim()
      } catch {
        return ''
      }
    })
    .filter(Boolean)
    .sort()
  return dates.at(-1)
}

const createSitemapXml = () => {
  const urls = sitemapEntries.map(({ path, changefreq, priority, lastmod }) => {
    const sources = routeSources[path]
    const resolvedLastmod = (sources && gitLastmod(sources)) || lastmod
    return `  <url>
    <loc>${new URL(path, siteUrl).toString()}</loc>
    <lastmod>${resolvedLastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

const sitemapPlugin = () => ({
  name: 'generate-sitemap',
  configureServer(server: ViteDevServer) {
    server.middlewares.use('/sitemap.xml', (_req: IncomingMessage, res: ServerResponse) => {
      res.setHeader('Content-Type', 'application/xml')
      res.end(createSitemapXml())
    })
  },
  closeBundle() {
    writeFileSync(resolve(process.cwd(), 'dist', 'sitemap.xml'), createSitemapXml(), 'utf8')
  },
})

// Renders one blueprint OG PNG per page and per post. Dev: on-demand middleware
// so social debuggers + local preview work. Build: writes dist/og/*.png so the
// per-page/post `image` URLs resolve to real files.
const ogImagePlugin = () => ({
  name: 'generate-og-images',
  configureServer(server: ViteDevServer) {
    server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
      const match = req.url?.match(/^\/og\/((?:page|blog)-[a-z0-9-]+\.png)(?:\?.*)?$/)
      if (!match) return next()
      const card = allCards(blogs).find((c) => c.fileName === match[1])
      if (!card) return next()
      try {
        ensureFonts()
        res.setHeader('Content-Type', 'image/png')
        res.end(renderOgPng(card))
      } catch {
        next()
      }
    })
  },
  closeBundle() {
    ensureFonts()
    const dir = resolve(process.cwd(), 'dist', 'og')
    mkdirSync(dir, { recursive: true })
    for (const card of allCards(blogs)) {
      writeFileSync(resolve(dir, card.fileName), renderOgPng(card))
    }
  },
})

const blogRoutes = blogs.map((blog) => `${sitePaths.blogs}/${blog.slug}`)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components(),
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        '@vueuse/core',
      ],
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),
    UnoCSS(),
    sitemapPlugin(),
    ogImagePlugin(),
  ],
  ssgOptions: {
    formatting: 'minify',
    includedRoutes(paths: string[]) {
      const staticPaths = paths.filter((p) => !p.includes(':'))
      return Array.from(new Set([...staticPaths, ...blogRoutes]))
    },
  },
})
