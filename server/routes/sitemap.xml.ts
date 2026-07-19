import { execSync } from 'node:child_process'
import { sitePaths, siteUrl } from '../../shared/utils/site'
import { sitemapEntries } from '../../shared/utils/sitemap'
import { caseStudies } from '../../shared/utils/caseStudies'

const routeSources: Record<string, string[]> = {
  [sitePaths.home]: ['app/pages/index.vue', 'app/components/aboutme.vue', 'app/components/SelectedProjects.vue', 'app/components/SelectedWriting.vue', 'app/components/timeline.vue', 'shared/utils/projects.ts', 'shared/utils/seo/home.ts'],
  [sitePaths.projects]: ['app/pages/projects/index.vue', 'shared/utils/projects.ts', 'shared/utils/caseStudies.ts', 'shared/utils/seo/projects.ts'],
  [sitePaths.blogs]: ['app/pages/blogs/index.vue', 'shared/utils/blogs.ts', 'shared/utils/seo/blog.ts'],
  [sitePaths.resume]: ['app/pages/resume.vue', 'shared/utils/seo/resume.ts'],
  [sitePaths.contact]: ['app/pages/contact.vue', 'shared/utils/seo/contact.ts'],
  ...Object.fromEntries(
    caseStudies.map((cs) => [
      `${sitePaths.projects}/${cs.slug}`,
      ['shared/utils/caseStudies.ts', 'shared/utils/seo/case-study.ts'],
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
  const urls = sitemapEntries.map(({ path, lastmod }) => {
    const sources = routeSources[path]
    const resolvedLastmod = (sources && gitLastmod(sources)) || lastmod
    return `  <url>
    <loc>${new URL(path, siteUrl).toString()}</loc>
    <lastmod>${resolvedLastmod}</lastmod>
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
