import { blogs } from './blogs'
import { caseStudies } from './caseStudies'
import { sitePaths } from './site'

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
  ...caseStudies.map((cs) => ({
    path: `${sitePaths.projects}/${cs.slug}`,
    lastmod: cs.dateModified ?? cs.datePublished,
  })),
  ...blogs.map((blog) => ({
    path: `${sitePaths.blogs}/${blog.slug}`,
    lastmod: blog.updated || blog.date,
  })),
] as const
