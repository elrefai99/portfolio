import { siteUrl, sitePaths } from '../site'

export const author = 'elrefai99'
export const siteName = 'Mohammed Mostafa Portfolio'
// The generated home card, not the hand-made public/og-image.png. That file is
// 277KB — 92% of the ~300KB ceiling above which WhatsApp silently drops link
// previews — while the rendered cards come in around 70KB with the same
// branding. public/og-image.png stays on disk so previously shared links keep
// resolving; nothing points at it any more.
export const defaultImage = `${siteUrl}/og/page-home.png`

export const brandKeywords = [
  'Mohammed Mostafa',
  'Mohamed Mostafa',
  'Elrefai',
  'Mohammed Elrefai',
  'Mohamed Elrefai',
  'elrefai99',
]

export const roleLocationKeywords = [
  'Software Engineer',
  'Backend Engineer',
  'Backend Developer',
  'Software Engineer Cairo',
  'Software Engineer Egypt',
  'Backend Developer Egypt',
  'Node.js Developer Egypt',
]

export const skillKeywords = [
  'Node.js Developer',
  'TypeScript Developer',
  'Express.js Developer',
  'REST API Developer',
  'Payment Integration Engineer',
  'AWS Cloud Developer',
  'MongoDB',
  'PostgreSQL',
  'Redis',
  'Docker',
  'Kubernetes',
]

const sameAs = [
  'https://github.com/elrefai99',
  'https://www.linkedin.com/in/elrefai99/',
  'https://www.instagram.com/elrefai99/',
  'https://x.com/elrefai99',
  'https://bsky.app/profile/elrefai.me',
  'https://orcid.org/0009-0003-3680-2750',
]

export const personId = `${siteUrl}/#person`
export const websiteId = `${siteUrl}/#website`

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': personId,
  name: 'Mohammed Mostafa',
  alternateName: [
    'Mohamed Mostafa',
    'Mohammed Elrefai',
    'Mohamed Elrefai',
    'Elrefai',
    'elrefai99',
  ],
  description:
    'Mohammed Mostafa (Elrefai, elrefai99) is a Software Engineer based in Cairo, Egypt, specializing in backend engineering, distributed systems, real-time collaboration, cloud infrastructure, and scalable Node.js applications using TypeScript, Express.js, Docker, Kubernetes, and AWS.',
  url: siteUrl,
  mainEntityOfPage: siteUrl,
  image: defaultImage,
  email: 'mailto:elrefai99@gmail.com',
  jobTitle: 'Software Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Lesoll',
    url: 'https://lesoll.com',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Modern Academy in Maadi',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cairo',
      addressCountry: 'EG',
    },
  },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Software Engineer',
    occupationLocation: {
      '@type': 'City',
      name: 'Cairo',
    },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cairo',
    addressCountry: 'EG',
  },
  // The technologies that have a Knowledge Graph node are declared as linked
  // Things rather than bare strings. A bare string is an unresolvable claim
  // ("knows about something called Redis"); a `sameAs` pointing at the
  // canonical entity is a disambiguated one, and disambiguated claims are what
  // entity understanding can actually act on. The same technique is already
  // used for per-post `entities[]` in blogs.ts.
  knowsAbout: [
    { '@type': 'Thing', name: 'Node.js', sameAs: ['https://en.wikipedia.org/wiki/Node.js', 'https://nodejs.org'] },
    { '@type': 'Thing', name: 'TypeScript', sameAs: ['https://en.wikipedia.org/wiki/TypeScript', 'https://www.typescriptlang.org'] },
    { '@type': 'Thing', name: 'Express.js', sameAs: ['https://en.wikipedia.org/wiki/Express.js', 'https://expressjs.com'] },
    { '@type': 'Thing', name: 'MongoDB', sameAs: ['https://en.wikipedia.org/wiki/MongoDB', 'https://www.mongodb.com'] },
    { '@type': 'Thing', name: 'PostgreSQL', sameAs: ['https://en.wikipedia.org/wiki/PostgreSQL', 'https://www.postgresql.org'] },
    { '@type': 'Thing', name: 'Redis', sameAs: ['https://en.wikipedia.org/wiki/Redis', 'https://redis.io'] },
    { '@type': 'Thing', name: 'Docker', sameAs: ['https://en.wikipedia.org/wiki/Docker_(software)', 'https://www.docker.com'] },
    { '@type': 'Thing', name: 'Kubernetes', sameAs: ['https://en.wikipedia.org/wiki/Kubernetes', 'https://kubernetes.io'] },
    { '@type': 'Thing', name: 'Amazon Web Services', sameAs: ['https://en.wikipedia.org/wiki/Amazon_Web_Services', 'https://aws.amazon.com'] },
    { '@type': 'Thing', name: 'Nginx', sameAs: ['https://en.wikipedia.org/wiki/Nginx', 'https://nginx.org'] },
    { '@type': 'Thing', name: 'WebSocket', sameAs: 'https://en.wikipedia.org/wiki/WebSocket' },
    { '@type': 'Thing', name: 'Server-sent events', sameAs: 'https://en.wikipedia.org/wiki/Server-sent_events' },
    { '@type': 'Thing', name: 'Conflict-free replicated data type', sameAs: 'https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type' },
    { '@type': 'Thing', name: 'Distributed computing', sameAs: 'https://en.wikipedia.org/wiki/Distributed_computing' },
    { '@type': 'Thing', name: 'Representational state transfer', sameAs: 'https://en.wikipedia.org/wiki/REST' },
    { '@type': 'Thing', name: 'Message queue', sameAs: 'https://en.wikipedia.org/wiki/Message_queue' },
    { '@type': 'Thing', name: 'CI/CD', sameAs: 'https://en.wikipedia.org/wiki/CI/CD' },
    { '@type': 'Thing', name: 'Role-based access control', sameAs: 'https://en.wikipedia.org/wiki/Role-based_access_control' },
    { '@type': 'Thing', name: 'Authentication', sameAs: 'https://en.wikipedia.org/wiki/Authentication' },
    { '@type': 'Thing', name: 'Cache (computing)', sameAs: 'https://en.wikipedia.org/wiki/Cache_(computing)' },
    { '@type': 'Thing', name: 'PASETO', sameAs: ['https://paseto.io', 'https://github.com/paseto-standard/paseto-spec'] },
    { '@type': 'Thing', name: 'Yjs', sameAs: 'https://github.com/yjs/yjs' },
    { '@type': 'Thing', name: 'BullMQ', sameAs: 'https://docs.bullmq.io' },
    { '@type': 'Thing', name: 'Socket.IO', sameAs: 'https://socket.io' },
    { '@type': 'Thing', name: 'GitHub Actions', sameAs: 'https://github.com/features/actions' },
    // No canonical entity to point at — these stay as plain strings.
    'Backend Engineering',
    'Software Architecture',
    'Real-Time Systems',
    'System Design',
    'Payment Gateway Integration',
    'Background Job Processing',
    'Performance Optimization',
    'Scalable Backend Systems',
  ],
  knowsLanguage: [
    { '@type': 'Language', name: 'English' },
    { '@type': 'Language', name: 'Arabic' },
  ],
  nationality: { '@type': 'Country', name: 'Egypt' },
  sameAs,
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': websiteId,
  name: siteName,
  alternateName: ['Elrefai', 'elrefai99', 'Mohammed Mostafa Portfolio'],
  url: siteUrl,
  author: { '@id': personId },
  publisher: { '@id': personId },
  inLanguage: 'en',
}

export const publisherId = `${siteUrl}/#organization`

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': publisherId,
  name: 'Mohammed Mostafa',
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/icon-512.png`,
    width: 512,
    height: 512,
  },
  sameAs,
}

export const ogImageObject = (url: string) => ({
  '@type': 'ImageObject',
  url,
  width: 1200,
  height: 630,
})

const createJsonLd = (schema: Record<string, unknown> | Record<string, unknown>[]) => ({
  type: 'application/ld+json',
  innerHTML: JSON.stringify(schema),
})

export const createBreadcrumb = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: new URL(item.path, siteUrl).toString(),
  })),
})

export const toIsoDateTime = (date: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(date) ? `${date}T00:00:00+00:00` : date

export type SeoMeta = ({ name: string } | { property: string }) & { content: string }

const normalizeKeyword = (keyword: string) =>
  keyword.replace(/[,;]+/g, ' ').replace(/\s+/g, ' ').trim()

export const uniqueKeywords = (keywords: string[]) => [
  ...new Set(keywords.map(normalizeKeyword).filter(Boolean)),
]

export const createSeo = ({
  title,
  description,
  path,
  image = defaultImage,
  imageAlt,
  imageWidth = '1200',
  imageHeight = '630',
  ogType = 'website',
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  keywords = [],
  extraMeta = [],
  schema,
  canonical = true,
}: {
  title: string
  description: string
  path: string
  image?: string
  imageAlt: string
  imageWidth?: string
  imageHeight?: string
  ogType?: 'website' | 'article'
  robots?: string
  keywords?: string[]
  extraMeta?: SeoMeta[]
  schema?: Record<string, unknown> | Record<string, unknown>[]
  canonical?: boolean
}) => {
  const url = new URL(path, siteUrl).toString()

  return {
    title,
    htmlAttrs: {
      lang: 'en',
    },
    link: canonical
      ? [
        {
          rel: 'canonical',
          href: url,
        },
      ]
      : [],
    meta: [
      { name: 'title', content: title },
      { name: 'author', content: author },
      { name: 'description', content: description },
      { name: 'robots', content: robots },
      { property: 'og:type', content: ogType },
      { property: 'og:url', content: url },
      { property: 'og:site_name', content: siteName },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:image:secure_url', content: image },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: imageWidth },
      { property: 'og:image:height', content: imageHeight },
      { property: 'og:image:alt', content: imageAlt },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@elrefai99' },
      { name: 'twitter:creator', content: '@elrefai99' },
      { name: 'twitter:url', content: url },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: imageAlt },
      { name: 'publisher', content: 'elrefai99' },
      ...extraMeta,
    ],
    script: schema ? [createJsonLd(schema)] : undefined,
  }
}

export const notFoundSEO = createSeo({
  title: 'Mohammed Mostafa • 404',
  description: 'The requested page could not be found on Mohammed Mostafa’s portfolio.',
  path: '/404',
  imageAlt: 'Mohammed Mostafa • Software Engineer Portfolio',
  robots: 'noindex, follow',
  canonical: false,
})

export { sitePaths, siteUrl }
