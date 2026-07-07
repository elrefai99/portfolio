import { blogs } from './blogs'

export const siteUrl = 'https://elrefai.me'

export const sitePaths = {
  home: '/',
  projects: '/projects',
  blogs: '/blogs',
  resume: '/resume',
} as const

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
    lastmod: blog.updated || blog.date,
  })),
] as const
