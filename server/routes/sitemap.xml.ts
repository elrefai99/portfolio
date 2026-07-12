import { execSync } from 'node:child_process'
import { sitePaths, siteUrl } from '../../shared/utils/site'
import { sitemapEntries } from '../../shared/utils/sitemap'
import { caseStudies } from '../../shared/utils/caseStudies'

// Prerendered to .output/public/sitemap.xml (and served live in `nuxt dev`).
// <lastmod> comes from git commit dates of the source files behind each route,
// falling back to the hand-set lastmod in sitemapEntries when git is
// unavailable (e.g. Docker builds that exclude .git).

// Every route renders through these — a change to any of them changes every
// page's HTML, so they feed every route's <lastmod>.
const globalSources = [
  'shared/utils/seo',
  'app/assets/blueprint.css',
  'app/assets/main.css',
  'app/app.vue',
  'app/components/NavBar.vue',
  'app/components/footer.vue',
  'app/components/FloorSection.vue',
  'uno.config.ts',
  'nuxt.config.ts',
]

const routeSources: Record<string, string[]> = {
  [sitePaths.home]: ['app/pages/index.vue', 'app/components/aboutme.vue', 'app/components/SelectedProjects.vue', 'app/components/timeline.vue', 'shared/utils/projects.ts', ...globalSources],
  [sitePaths.projects]: ['app/pages/projects/index.vue', 'shared/utils/projects.ts', 'shared/utils/caseStudies.ts', ...globalSources],
  [sitePaths.blogs]: ['app/pages/blogs/index.vue', 'shared/utils/blogs.ts', ...globalSources],
  [sitePaths.resume]: ['app/pages/resume.vue', ...globalSources],
  ...Object.fromEntries(
    caseStudies.map((cs) => [
      `${sitePaths.projects}/${cs.slug}`,
      ['app/pages/projects/[slug].vue', 'shared/utils/caseStudies.ts', ...globalSources],
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

export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return createSitemapXml()
})
