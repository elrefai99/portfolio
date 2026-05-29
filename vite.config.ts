import { writeFileSync } from 'node:fs'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { resolve } from 'node:path'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import { defineConfig, type ViteDevServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import { sitemapEntries, siteUrl } from './src/utils/site'

const createSitemapXml = () => {
  const lastmod = new Date().toISOString()
  const urls = sitemapEntries.map(({ path, changefreq, priority }) => `  <url>
    <loc>${new URL(path, siteUrl).toString()}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')

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
  ],
})
