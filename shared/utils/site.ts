// Keep this module dependency-free: every page imports it (routes, SEO), so
// pulling content data (blogs, case studies) in here would drag the whole
// corpus into the entry chunk. Sitemap data lives in ./sitemap.ts (build-only).
export const siteUrl = 'https://elrefai.me'

export const sitePaths = {
  home: '/',
  projects: '/projects',
  blogs: '/blogs',
  resume: '/resume',
  contact: '/contact',
} as const
