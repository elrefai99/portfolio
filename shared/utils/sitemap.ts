import { blogs } from './blogs'
import { caseStudies } from './caseStudies'
import { sitePaths } from './site'

// Consumed only by the sitemap server route (server/routes/sitemap.xml.ts).
// Never import from app code: it pulls the full blog + case-study corpus, which
// must stay out of the entry chunk — that's why this lives apart from site.ts.

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
  {
    path: sitePaths.contact,
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: '2026-07-14',
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
