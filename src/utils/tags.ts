import { sitePaths, siteUrl } from './site'
import type { BlogPost } from './blogs'

const author = 'Mohammed Mostafa (elrefai99)'
const siteName = 'Mohammed Mostafa Portfolio'
const defaultImage = `${siteUrl}/og-image.png`

const coreKeywords = [
  'Mohammed Mostafa',
  'Mohamed Mostafa',
  'elrefai99',
  'Software Engineer',
  'Backend Engineer',
  'Backend Developer Egypt',
  'Backend Developer Cairo',
  'Node.js Developer',
  'TypeScript Developer',
  'Express.js Developer',
  'REST API Developer',
  'MongoDB',
  'PostgreSQL',
  'Redis',
  'BullMQ',
  'Socket.IO',
  'Docker',
  'AWS EC2',
  'AWS EKS',
  'Payment Integration',
  'Paymob',
  'Amazon Payment Services',
  'Vue.js Portfolio',
]

const blogTopicKeywords = [
  'Backend engineering articles',
  'Software engineering blog',
  'Node.js backend blog',
  'TypeScript backend blog',
  'Express.js backend blog',
  'API architecture blog',
  'Authentication security',
  'Payment token security',
  'Redis queues',
  'BullMQ queues',
  'Production backend systems',
  'Backend architecture notes',
]

const sameAs = [
  'https://github.com/elrefai99',
  'https://www.linkedin.com/in/elrefai99/',
  'https://www.instagram.com/elrefai99/',
  'https://x.com/elrefai99',
  'https://bsky.app/profile/elrefai99.bsky.social',
]

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mohammed Mostafa',
  alternateName: ['Mohamed Mostafa', 'elrefai99'],
  url: siteUrl,
  jobTitle: 'Software Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Lesoll',
    url: 'https://lesoll.com',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cairo',
    addressCountry: 'EG',
  },
  knowsAbout: [
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
    'AWS',
    'Kubernetes',
    'Payment integrations',
    'Backend architecture',
  ],
  sameAs,
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteName,
  url: siteUrl,
  author: {
    '@type': 'Person',
    name: 'Mohammed Mostafa',
  },
  inLanguage: 'en',
}

const createJsonLd = (schema: Record<string, unknown> | Record<string, unknown>[]) => ({
  type: 'application/ld+json',
  children: JSON.stringify(schema),
})

type SeoMeta = ({ name: string } | { property: string }) & { content: string }

const uniqueKeywords = (keywords: string[]) => [...new Set(keywords.filter(Boolean))]

const createSeo = ({
  title,
  description,
  path,
  keywords = [],
  image = defaultImage,
  imageAlt,
  ogType = 'website',
  robots = 'index, follow, max-image-preview:large',
  extraMeta = [],
  schema,
}: {
  title: string
  description: string
  path: string
  keywords?: string[]
  image?: string
  imageAlt: string
  ogType?: 'website' | 'article'
  robots?: string
  extraMeta?: SeoMeta[]
  schema?: Record<string, unknown> | Record<string, unknown>[]
}) => {
  const url = new URL(path, siteUrl).toString()
  const keywordContent = uniqueKeywords([...coreKeywords, ...keywords]).join(', ')

  return {
    title,
    htmlAttrs: {
      lang: 'en',
    },
    link: [
      {
        rel: 'canonical',
        href: url,
      },
    ],
    meta: [
      { name: 'title', content: title },
      { name: 'author', content: author },
      { name: 'description', content: description },
      { name: 'keywords', content: keywordContent },
      { name: 'robots', content: robots },
      { property: 'og:type', content: ogType },
      { property: 'og:url', content: url },
      { property: 'og:site_name', content: siteName },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:image:secure_url', content: image },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: imageAlt },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
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

export const homeSEO = createSeo({
  title: 'Mohammed Mostafa | Backend Software Engineer in Cairo',
  description:
    'Mohammed Mostafa is a Cairo-based Software Engineer specializing in Node.js, TypeScript, Express.js, scalable APIs, payments, Redis, Docker, and AWS systems.',
  path: sitePaths.home,
  keywords: [
    'Mohammed Mostafa portfolio',
    'Mohamed Mostafa portfolio',
    'Software Engineer Cairo',
    'Node.js Backend Engineer Egypt',
    'Lesoll Backend Engineer',
  ],
  imageAlt: 'Mohammed Mostafa - Backend Software Engineer Portfolio',
  schema: [personSchema, websiteSchema],
})

export const resumeSEO = createSeo({
  title: 'Mohammed Mostafa Resume | Node.js TypeScript Backend Engineer',
  description:
    'Resume of Mohammed Mostafa, a Software Engineer with experience in Node.js, TypeScript, scalable APIs, payment integrations, MongoDB, PostgreSQL, Redis, Docker, and AWS.',
  path: sitePaths.resume,
  keywords: [
    'Mohammed Mostafa resume',
    'Mohamed Mostafa CV',
    'Backend Engineer resume',
    'Node.js TypeScript resume',
    'Software Engineer Egypt CV',
  ],
  imageAlt: 'Mohammed Mostafa - Software Engineer Resume',
  schema: [
    personSchema,
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: 'Mohammed Mostafa Resume',
      url: new URL(sitePaths.resume, siteUrl).toString(),
      about: personSchema,
    },
  ],
})

export const projectsSEO = createSeo({
  title: 'Mohammed Mostafa Projects | Node.js, TypeScript, AWS Portfolio',
  description:
    'Explore Mohammed Mostafa projects including Lesoll, EGYStay, 0Gosha, gen-import, Smart Parser, and real-time backend systems built with Node.js, TypeScript, AWS, Docker, Redis, and PostgreSQL.',
  path: sitePaths.projects,
  keywords: [
    'Mohammed Mostafa projects',
    'elrefai99 projects',
    'Node.js portfolio projects',
    'TypeScript backend portfolio',
    'Lesoll',
    'EGYStay',
    '0Gosha',
    'gen-import',
    'Smart Parser',
    'Elrecord',
  ],
  image: `${siteUrl}/og/projects_page_og.png`,
  imageAlt: 'Mohammed Mostafa - Node.js and TypeScript Projects Portfolio',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Mohammed Mostafa Projects',
    url: new URL(sitePaths.projects, siteUrl).toString(),
    about: 'Backend, API, cloud, payment, and developer tooling projects by Mohammed Mostafa.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        'Lesoll',
        'EGYStay',
        '0Gosha',
        'gen-import',
        'Doc-Station',
        'Smart Parser',
        'Elrecord',
      ].map((name, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
      })),
    },
  },
})

export const blogsSEO = createSeo({
  title: 'Mohammed Mostafa Blog | Backend Engineering, TypeScript, APIs',
  description:
    'Read backend engineering notes by Mohammed Mostafa about Node.js, TypeScript, Express.js, API architecture, queues, Redis, authentication, payment tokens, and production systems.',
  path: sitePaths.blogs,
  keywords: uniqueKeywords([
    'Mohammed Mostafa blog',
    'Mohamed Mostafa blog',
    'elrefai99 blog',
    'Mohammed Mostafa articles',
    'Backend engineering blog',
    'Backend software engineering articles',
    'Node.js backend articles',
    'TypeScript backend articles',
    'Express.js API architecture',
    'REST API design blog',
    'Authentication security blog',
    'JWT PASETO blog',
    'Payment token security blog',
    'BullMQ Redis queues',
    'Production systems blog',
    ...blogTopicKeywords,
  ]),
  imageAlt: 'Mohammed Mostafa - Backend Engineering Blog',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Mohammed Mostafa Blog',
    description:
      'Backend engineering notes about Node.js, TypeScript, Express.js, APIs, queues, Redis, authentication, payment tokens, and production systems.',
    url: new URL(sitePaths.blogs, siteUrl).toString(),
    author: personSchema,
    inLanguage: 'en',
    keywords: blogTopicKeywords,
    about: [
      'Backend engineering',
      'Node.js',
      'TypeScript',
      'Express.js',
      'API architecture',
      'Authentication security',
      'Payment token security',
      'Redis queues',
      'Production architecture',
    ],
  },
})

export const createBlogPostSEO = (blog: BlogPost) => {
  const path = `${sitePaths.blogs}/${blog.slug}`
  const url = new URL(path, siteUrl).toString()
  const keywords = uniqueKeywords([
    blog.title,
    blog.category,
    `${blog.title} Mohammed Mostafa`,
    `${blog.title} elrefai99`,
    `${blog.category} blog`,
    `${blog.category} article`,
    'Backend engineering blog',
    'Node.js security',
    'TypeScript security',
    'API security',
    'Authentication tokens',
    'Payment tokens',
    ...blog.tags,
    ...blog.tags.map((tag) => `${tag} blog`),
    ...blog.tags.map((tag) => `${tag} article`),
  ])

  return createSeo({
    title: `${blog.title} | Mohammed Mostafa Blog`,
    description: blog.excerpt,
    path,
    keywords,
    ogType: 'article',
    imageAlt: `${blog.title} - Mohammed Mostafa Blog`,
    extraMeta: [
      { property: 'article:published_time', content: blog.date },
      { property: 'article:modified_time', content: blog.date },
      { property: 'article:author', content: author },
      { property: 'article:section', content: blog.category },
      ...blog.tags.map((tag) => ({ property: 'article:tag', content: tag })),
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
      headline: blog.title,
      name: blog.title,
      description: blog.excerpt,
      image: defaultImage,
      datePublished: blog.date,
      dateModified: blog.date,
      url,
      author: personSchema,
      publisher: personSchema,
      articleSection: blog.category,
      inLanguage: 'en',
      keywords,
    },
  })
}

export const notFoundSEO = createSeo({
  title: 'Mohammed Mostafa | 404',
  description: 'The requested page could not be found on Mohammed Mostafa’s portfolio.',
  path: sitePaths.home,
  imageAlt: 'Mohammed Mostafa - Software Engineer Portfolio',
  robots: 'noindex, follow',
})
