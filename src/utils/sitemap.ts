import { blogs } from './blogs'
import { caseStudies } from './caseStudies'
import { sitePaths } from './site'

// Build-time only (vite.config.ts sitemap plugin). Never import from app code:
// it pulls the full blog + case-study corpus, which must stay out of the
// entry chunk — that's why this lives apart from site.ts.

const staticPagesLastmod = '2026-07-01'

export const sitemapEntries = [
  {
    path: sitePaths.home,
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: staticPagesLastmod,
  },
  {
    path: sitePaths.projects,
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: staticPagesLastmod,
  },
  {
    path: sitePaths.blogs,
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: '2026-06-27',
  },
  {
    path: sitePaths.resume,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: staticPagesLastmod,
  },
  ...caseStudies.map((cs) => ({
    path: `${sitePaths.projects}/${cs.slug}`,
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: '2026-07-09',
  })),
  ...blogs.map((blog) => ({
    path: `${sitePaths.blogs}/${blog.slug}`,
    changefreq: 'weekly',
    priority: '0.7',
    lastmod: blog.updated || blog.date,
  })),
] as const
