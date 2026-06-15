import { blogs } from './blogs'

export const siteUrl = 'https://elrefai.me'

export const sitePaths = {
  home: '/',
  projects: '/projects',
  blogs: '/blogs',
  resume: '/resume',
} as const

// Bump when the content of the static pages meaningfully changes —
// a fresh lastmod on every build teaches crawlers to ignore the value.
const staticPagesLastmod = '2026-06-12'

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
    lastmod: staticPagesLastmod,
  },
  {
    path: sitePaths.resume,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: staticPagesLastmod,
  },
  // Subdomain apps. Absolute URLs override the siteUrl base in createSitemapXml.
  {
    path: 'https://srvj.elrefai.me/',
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: staticPagesLastmod,
  },
  {
    path: 'https://keepit.elrefai.me/',
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: staticPagesLastmod,
  },
  ...blogs.map((blog) => ({
    path: `${sitePaths.blogs}/${blog.slug}`,
    changefreq: 'weekly',
    priority: '0.7',
    lastmod: blog.date,
  })),
] as const
