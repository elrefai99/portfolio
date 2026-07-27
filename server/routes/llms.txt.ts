import { siteUrl, sitePaths } from '../../shared/utils/site'
import { sitemapEntries } from '../../shared/utils/sitemap'
import { blogs } from '../../shared/utils/blogs'
import { caseStudies } from '../../shared/utils/caseStudies'

// llms.txt is the file answer engines read as this site's self-declared index,
// so a dead link in it is a direct trust cost. The previous hand-maintained
// public/llms.txt drifted the moment /contact was deleted and kept advertising
// a 404 for weeks.
//
// The page list is therefore derived from `sitemapEntries` rather than written
// out by hand: a URL can only appear here if it is also in the sitemap, which
// means it is prerendered, which means it resolves. Adding a page to
// sitemapEntries is the only step needed to surface it here.
const pageLabels: Record<string, { name: string; blurb: string }> = {
  [sitePaths.home]: {
    name: 'Home',
    blurb: 'Introduction, selected work, and experience timeline',
  },
  [sitePaths.projects]: {
    name: 'Projects',
    blurb: 'Production systems with full engineering deep dives',
  },
  [sitePaths.blogs]: {
    name: 'Blog',
    blurb: 'Backend engineering articles',
  },
  [sitePaths.resume]: {
    name: 'Resume',
    blurb: 'Experience, skills, and education',
  },
}

const absolute = (path: string) => new URL(path, siteUrl).toString()

const createLlmsTxt = () => {
  const caseStudySlugs = new Set(caseStudies.map((cs) => `${sitePaths.projects}/${cs.slug}`))
  const blogSlugs = new Set(blogs.map((blog) => `${sitePaths.blogs}/${blog.slug}`))

  // Top-level pages only — case studies and posts get their own sections below,
  // with descriptions pulled from the corpus.
  const pages = sitemapEntries
    .map((entry) => entry.path as string)
    .filter((path) => !caseStudySlugs.has(path) && !blogSlugs.has(path))

  return [
    '# Mohammed Mostafa (elrefai99) — Backend Software Engineer',
    '',
    '> Portfolio and technical blog of Mohammed Mostafa (also known as Elrefai /',
    '> elrefai99), a backend engineer based in Cairo, Egypt. Production Node.js and',
    '> TypeScript systems: payment integrations (PayMob, Amazon Payment Services),',
    '> background job processing (BullMQ, Redis), real-time infrastructure',
    '> (WebSockets, SSE, CRDTs/Yjs), MongoDB, PostgreSQL, Docker, Kubernetes, and AWS.',
    '',
    'Software Engineer II at Lesoll (https://lesoll.com), building production',
    'marketplace and booking platforms. Every article below is a first-hand account',
    'of a system I built and operated, with the code and the numbers included.',
    '',
    '## Pages',
    '',
    ...pages.map((path) => {
      const label = pageLabels[path]
      return label
        ? `- [${label.name}](${absolute(path)}): ${label.blurb}`
        : `- ${absolute(path)}`
    }),
    `- [RSS feed](${absolute('/rss.xml')}): Blog post feed (RSS 2.0, full content)`,
    '',
    '## Project case studies',
    '',
    ...caseStudies.map(
      (cs) =>
        `- [${cs.name}](${absolute(`${sitePaths.projects}/${cs.slug}`)}): ${cs.summary}`,
    ),
    '',
    '## Blog posts',
    '',
    ...blogs.map(
      (blog) =>
        `- [${blog.title}](${absolute(`${sitePaths.blogs}/${blog.slug}`)}): ${blog.metaDescription ?? blog.excerpt}`,
    ),
    '',
    '## Contact',
    '',
    '- Email: elrefai99@gmail.com',
    '- GitHub: https://github.com/elrefai99',
    '- LinkedIn: https://www.linkedin.com/in/elrefai99/',
    '- X: https://x.com/elrefai99',
    '- Bluesky: https://bsky.app/profile/elrefai.me',
    '- ORCID: https://orcid.org/0009-0003-3680-2750',
    '',
  ].join('\n')
}

export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return createLlmsTxt()
})
