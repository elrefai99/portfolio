import { blogs } from './blogs'

export const siteUrl = 'https://elrefai.me'

export const sitePaths = {
  home: '/',
  projects: '/projects',
  blogs: '/blogs',
  resume: '/resume',
  contact: '/contact',
} as const

export const sitemapEntries = [
  {
    path: sitePaths.home,
    changefreq: 'weekly',
    priority: '1.0',
  },
  {
    path: sitePaths.projects,
    changefreq: 'weekly',
    priority: '0.8',
  },
  {
    path: sitePaths.blogs,
    changefreq: 'weekly',
    priority: '0.8',
  },
  {
    path: sitePaths.resume,
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    path: sitePaths.contact,
    changefreq: 'yearly',
    priority: '0.6',
  },
  ...blogs.map((blog) => ({
    path: `${sitePaths.blogs}/${blog.slug}`,
    changefreq: 'weekly',
    priority: '0.7',
  })),
] as const
