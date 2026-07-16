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
    lastmod: staticPagesLastmod,
  },
  {
    path: sitePaths.projects,
    lastmod: staticPagesLastmod,
  },
  {
    path: sitePaths.blogs,
    lastmod: '2026-06-27',
  },
  {
    path: sitePaths.resume,
    lastmod: staticPagesLastmod,
  },
  {
    path: sitePaths.contact,
    lastmod: '2026-07-14',
  },
  ...caseStudies.map((cs) => ({
    path: `${sitePaths.projects}/${cs.slug}`,
    lastmod: cs.dateModified ?? cs.datePublished,
  })),
  ...blogs.map((blog) => ({
    path: `${sitePaths.blogs}/${blog.slug}`,
    lastmod: blog.updated || blog.date,
  })),
] as const
