import { siteUrl, sitePaths } from '../site'

export const author = 'elrefai99'
export const siteName = 'Mohammed Mostafa Portfolio'
export const defaultImage = `${siteUrl}/og-image.png`

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
  knowsAbout: [
    'Backend Engineering',
    'Software Architecture',
    'Distributed Systems',
    'Real-Time Systems',
    'Cloud Computing',
    'System Design',
    'Node.js',
    'TypeScript',
    'Express.js',
    'REST APIs',
    'MongoDB',
    'PostgreSQL',
    'Redis',
    'BullMQ',
    'Socket.IO',
    'Docker',
    'Kubernetes',
    'AWS',
    'CI/CD',
    'GitHub Actions',
    'NGINX',
    'Payment Gateway Integration',
    'Real-Time Collaboration',
    'CRDT',
    'Yjs',
    'Server-Sent Events',
    'WebSockets',
    'PASETO',
    'Authentication',
    'Authorization',
    'RBAC',
    'Caching',
    'Background Job Processing',
    'Message Queues',
    'Performance Optimization',
    'Scalable Backend Systems'
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

const MAX_KEYWORDS = 25

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
      ...(keywords.length
        ? [{ name: 'keywords', content: uniqueKeywords(keywords).slice(0, MAX_KEYWORDS).join(', ') }]
        : []),
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
