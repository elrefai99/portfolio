import { execSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { resolve } from 'node:path'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import { defineConfig, type ViteDevServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { } from 'vite-ssg'
import { sitePaths, siteUrl } from './src/utils/site'
import { sitemapEntries } from './src/utils/sitemap'
import { blogs, type BlogBlock } from './src/utils/blogs'
import { caseStudies } from './src/utils/caseStudies'
import { projects } from './src/utils/projects'
import { allCards, ensureFonts, renderOgPng } from './build/og-image'

// The `caseStudy` flag on projects.ts exists so entry-chunk components never
// import the case-study corpus just to know a deep dive exists. Fail the
// build (and dev server) the moment the flag and the corpus disagree.
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

// Every route renders through these — a change to any of them changes every
// page's HTML, so they feed every route's <lastmod>.
const globalSources = [
  'src/utils/seo',
  'src/assets/blueprint.css',
  'src/assets/main.css',
  'src/App.vue',
  'src/components/NavBar.vue',
  'src/components/footer.vue',
  'src/components/FloorSection.vue',
  'uno.config.ts',
  'index.html',
]

const routeSources: Record<string, string[]> = {
  [sitePaths.home]: ['src/views/HomeView.vue', 'src/components/aboutme.vue', 'src/components/SelectedProjects.vue', 'src/components/timeline.vue', 'src/utils/projects.ts', ...globalSources],
  [sitePaths.projects]: ['src/views/projectsView.vue', 'src/utils/projects.ts', 'src/utils/caseStudies.ts', ...globalSources],
  [sitePaths.blogs]: ['src/views/BlogsView.vue', 'src/utils/blogs.ts', ...globalSources],
  [sitePaths.resume]: ['src/views/ResumeView.vue', ...globalSources],
  ...Object.fromEntries(
    caseStudies.map((cs) => [
      `${sitePaths.projects}/${cs.slug}`,
      ['src/views/ProjectCaseView.vue', 'src/utils/caseStudies.ts', ...globalSources],
    ]),
  ),
}

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

const escapeXml = (value: string) =>
  value.replace(/[&<>"']/g, (char) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] as string,
  )

// Render the block content model to plain HTML for the feed's full-text
// content:encoded — same inline rules as ContentBlocks.vue (`code`, [label](url)).
const inlineHtml = (text: string) =>
  text
    .split('`')
    .map((segment, index) => {
      if (index % 2 === 1) return `<code>${escapeXml(segment)}</code>`
      return escapeXml(segment).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label, href) => {
        const abs = /^https?:\/\//.test(href) ? href : new URL(href, siteUrl).toString()
        return `<a href="${abs}">${label}</a>`
      })
    })
    .join('')

const blockToHtml = (block: BlogBlock): string => {
  switch (block.type) {
    case 'paragraph':
      return `<p>${inlineHtml(block.text)}</p>`
    case 'heading': {
      const level = block.level ?? 2
      return `<h${level}>${escapeXml(block.text)}</h${level}>`
    }
    case 'list':
      return `<ul>${block.items.map((item) => `<li>${inlineHtml(item)}</li>`).join('')}</ul>`
    case 'code':
      return `<pre><code>${escapeXml(block.code)}</code></pre>`
  }
}

const createRssXml = () => {
  const sorted = [...blogs].sort((a, b) => b.date.localeCompare(a.date))
  const lastBuildDate = new Date(
    sorted
      .map((post) => post.updated ?? post.date)
      .sort()
      .at(-1)!,
  ).toUTCString()
  const items = sorted
    .map((post) => {
      const url = new URL(`${sitePaths.blogs}/${post.slug}`, siteUrl).toString()
      const fullHtml = post.blocks.map(blockToHtml).join('').replaceAll(']]>', ']]&gt;')
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <description>${escapeXml(post.metaDescription ?? post.excerpt)}</description>
      <content:encoded><![CDATA[${fullHtml}]]></content:encoded>
    </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Blogs • Mohammed Mostafa</title>
    <link>${new URL(sitePaths.blogs, siteUrl).toString()}</link>
    <atom:link href="${new URL('/rss.xml', siteUrl).toString()}" rel="self" type="application/rss+xml"/>
    <description>Backend engineering notes about Node.js, TypeScript, Express.js, APIs, queues, Redis, authentication, payment tokens, and production systems.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`
}

const rssPlugin = () => ({
  name: 'generate-rss',
  configureServer(server: ViteDevServer) {
    server.middlewares.use('/rss.xml', (_req: IncomingMessage, res: ServerResponse) => {
      res.setHeader('Content-Type', 'application/rss+xml')
      res.end(createRssXml())
    })
  },
  closeBundle() {
    writeFileSync(resolve(process.cwd(), 'dist', 'rss.xml'), createRssXml(), 'utf8')
  },
})

const ogImagePlugin = () => ({
  name: 'generate-og-images',
  configureServer(server: ViteDevServer) {
    server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
      const match = req.url?.match(/^\/og\/((?:page|blog|project)-[a-z0-9-]+\.png)(?:\?.*)?$/)
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
const caseStudyRoutes = caseStudies.map((cs) => `${sitePaths.projects}/${cs.slug}`)

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
    rssPlugin(),
    ogImagePlugin(),
  ],
  ssgOptions: {
    formatting: 'minify',
    includedRoutes(paths: string[]) {
      const staticPaths = paths.filter((p) => !p.includes(':'))
      return Array.from(new Set([...staticPaths, ...caseStudyRoutes, ...blogRoutes]))
    },
  },
})
