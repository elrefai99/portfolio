import { sitePaths, siteUrl } from './site'
import { projects } from './projects'
import { blogs, blogReadMinutes, blogWordCount, type BlogPost } from './blogs'

const author = 'elrefai99'
const siteName = 'Mohammed Mostafa Portfolio'
const defaultImage = `${siteUrl}/og-image.png`

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

// Curated keyword targets. Kept tight (no stuffing) — Google largely ignores the
// keywords meta, but Bing/Yandex weakly use it and it documents intent per route.
const brandKeywords = [
  'Mohammed Mostafa',
  'Mohamed Mostafa',
  'Elrefai',
  'Mohammed Elrefai',
  'Mohamed Elrefai',
  'elrefai99',
]

const roleLocationKeywords = [
  'Software Engineer',
  'Backend Engineer',
  'Backend Developer',
  'Software Engineer Cairo',
  'Software Engineer Egypt',
  'Backend Developer Egypt',
  'Node.js Developer Egypt',
]

const skillKeywords = [
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
  'https://bsky.app/profile/elrefai99.bsky.social',
]

const personId = `${siteUrl}/#person`
const websiteId = `${siteUrl}/#website`

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': personId,
  name: 'Mohammed Mostafa • Software Engineer',
  alternateName: ['Elrefai', 'Mohamed Mostafa', 'Mohammed Elrefai', 'elrefai99'],
  description:
    'Mohammed Mostafa (Elrefai, elrefai99) is a Software Engineer in Cairo, Egypt, building backend APIs, payment integrations, and cloud systems with Node.js, TypeScript, and AWS.',
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
  knowsLanguage: [
    { '@type': 'Language', name: 'English' },
    { '@type': 'Language', name: 'Arabic' },
  ],
  nationality: { '@type': 'Country', name: 'Egypt' },
  sameAs,
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': websiteId,
  name: siteName,
  alternateName: ['Elrefai', 'elrefai99', 'Mohammed Mostafa Portfolio'],
  url: siteUrl,
  // Reference the Person by @id so the site and its author resolve to one entity.
  author: { '@id': personId },
  publisher: { '@id': personId },
  inLanguage: 'en',
}

const createJsonLd = (schema: Record<string, unknown> | Record<string, unknown>[]) => ({
  type: 'application/ld+json',
  // Must be `innerHTML` (raw script content), not `children` — this unhead
  // version renders unknown keys like `children` as an attribute, which leaves
  // the <script> empty and makes the JSON-LD invisible to crawlers.
  innerHTML: JSON.stringify(schema),
})

const createBreadcrumb = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: new URL(item.path, siteUrl).toString(),
  })),
})

// Widen a date-only string ('YYYY-MM-DD') to a full ISO 8601 instant, which the
// Open Graph article spec expects. Already-full timestamps pass through untouched.
const toIsoDateTime = (date: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(date) ? `${date}T00:00:00+00:00` : date

type SeoMeta = ({ name: string } | { property: string }) & { content: string }

const uniqueKeywords = (keywords: string[]) => [...new Set(keywords.filter(Boolean))]

const createSeo = ({
  title,
  description,
  path,
  image = defaultImage,
  imageAlt,
  imageWidth = '1200',
  imageHeight = '630',
  ogType = 'website',
  robots = 'index, follow, max-image-preview:large',
  keywords = [],
  extraMeta = [],
  schema,
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
}) => {
  const url = new URL(path, siteUrl).toString()

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
      { name: 'robots', content: robots },
      ...(keywords.length
        ? [{ name: 'keywords', content: uniqueKeywords(keywords).join(', ') }]
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

export const homeSEO = createSeo({
  title: 'Mohammed Mostafa • Software Engineer',
  description:
    'Elrefai (Mohammed Mostafa, elrefai99) — Software Engineer in Cairo, Egypt at Lesoll, EGYStay backend developer. APIs, payments & cloud systems with Node.js, TypeScript and AWS.',
  path: sitePaths.home,
  keywords: [...brandKeywords, ...roleLocationKeywords, ...skillKeywords],
  imageAlt: 'Mohammed Mostafa • Software Engineer Portfolio',
  schema: [
    // ProfilePage is Google's recommended type for a person's primary page; it
    // names the Person as the page's mainEntity so the homepage *is* the entity.
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: 'Mohammed Mostafa — Software Engineer',
      isPartOf: { '@id': websiteId },
      mainEntity: { '@id': personId },
      about: { '@id': personId },
    },
    personSchema,
    websiteSchema,
  ],
})

export const resumeSEO = createSeo({
  title: 'Mohammed Mostafa • Resume',
  description:
    'Resume of Mohammed Mostafa, a Software Engineer with experience in Node.js, TypeScript, scalable APIs, payment integrations, MongoDB, PostgreSQL, Redis, Docker, and AWS.',
  path: sitePaths.resume,
  keywords: [
    ...brandKeywords,
    'Mohammed Mostafa resume',
    'Mohammed Mostafa CV',
    'Software Engineer resume',
    'Backend Engineer CV',
    ...skillKeywords,
  ],
  imageAlt: 'Mohammed Mostafa • Resume',
  schema: [
    personSchema,
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: 'Mohammed Mostafa Resume',
      url: new URL(sitePaths.resume, siteUrl).toString(),
      mainEntity: { '@id': personId },
      about: { '@id': personId },
    },
  ],
})

type ProjectShape = {
  name: string
  slug?: string
  category?: string
  link?: string
  github?: string
  npm?: string
  desc: string | string[]
  tags: string[]
}

const projectDescriptionText = (desc: string | string[]) =>
  Array.isArray(desc) ? desc.join(' ') : desc

const projectListItems = (projects as ProjectShape[]).map((project, index) => {
  const projectUrl = project.link || project.github || project.npm
  const anchorUrl = project.slug
    ? `${new URL(sitePaths.projects, siteUrl).toString()}#${project.slug}`
    : undefined
  return {
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': project.npm ? 'SoftwareSourceCode' : 'SoftwareApplication',
      name: project.name,
      description: projectDescriptionText(project.desc),
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      ...(anchorUrl ? { url: anchorUrl } : {}),
      ...(projectUrl ? { sameAs: projectUrl } : {}),
      ...(project.github ? { codeRepository: project.github } : {}),
      keywords: project.tags,
      author: personSchema,
      creator: personSchema,
    },
  }
})

export const projectsSEO = createSeo({
  title: 'Mohammed Mostafa • Projects',
  description:
    'Projects by Elrefai (Mohammed Mostafa, elrefai99) including Lesoll, EGYStay, 0Gosha, Gen-Import, Doc-Station, Smart Parser, Elrecord — backend, API, payment, cloud, and developer tooling.',
  path: sitePaths.projects,
  keywords: [
    ...brandKeywords,
    'Mohammed Mostafa projects',
    'Elrefai projects',
    ...(projects as ProjectShape[]).map((project) => project.name),
    'Backend projects',
    'Node.js projects',
    'API projects',
    'Developer tooling',
  ],
  image: `${siteUrl}/og/projects_page_og.png`,
  // Real file is 498x202, not the site's default 1200x630 — declaring the
  // wrong size breaks Facebook/LinkedIn/Slack/Discord link-preview cards.
  imageWidth: '498',
  imageHeight: '202',
  imageAlt: 'Mohammed Mostafa • Node.js and TypeScript Projects Portfolio',
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Mohammed Mostafa Projects',
      url: new URL(sitePaths.projects, siteUrl).toString(),
      about: 'Backend, API, cloud, payment, and developer tooling projects by Elrefai (Mohammed Mostafa).',
      author: personSchema,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: projectListItems.length,
        itemListElement: projectListItems,
      },
    },
    createBreadcrumb([
      { name: 'Home', path: sitePaths.home },
      { name: 'Projects', path: sitePaths.projects },
    ]),
  ],
})

export const blogsSEO = createSeo({
  title: 'Mohammed Mostafa • Blog',
  description:
    'Read backend engineering notes by Mohammed Mostafa about Node.js, TypeScript, Express.js, API architecture, queues, Redis, and production systems.',
  path: sitePaths.blogs,
  keywords: [
    ...brandKeywords,
    'Mohammed Mostafa blog',
    'Elrefai blog',
    ...blogTopicKeywords,
  ],
  imageAlt: 'Mohammed Mostafa Blog',
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${new URL(sitePaths.blogs, siteUrl).toString()}#blog`,
      name: 'Mohammed Mostafa Blog',
      description:
        'Backend engineering notes about Node.js, TypeScript, Express.js, APIs, queues, Redis, authentication, payment tokens, and production systems.',
      url: new URL(sitePaths.blogs, siteUrl).toString(),
      author: personSchema,
      inLanguage: 'en',
      keywords: blogTopicKeywords,
      // Enumerate the posts so crawlers see the collection's members and dates.
      blogPost: blogs.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        name: post.title,
        description: post.metaDescription ?? post.excerpt,
        url: new URL(`${sitePaths.blogs}/${post.slug}`, siteUrl).toString(),
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        articleSection: post.category,
        keywords: post.tags,
        author: { '@id': personId },
      })),
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
    createBreadcrumb([
      { name: 'Home', path: sitePaths.home },
      { name: 'Blog', path: sitePaths.blogs },
    ]),
  ],
})

export const createBlogPostSEO = (blog: BlogPost) => {
  const path = `${sitePaths.blogs}/${blog.slug}`
  const url = new URL(path, siteUrl).toString()
  const modifiedDate = blog.updated || blog.date
  // Per-post OG image when provided, else the site default. Root-relative
  // paths are resolved against siteUrl so crawlers get an absolute URL.
  const ogImage = blog.ogImage
    ? new URL(blog.ogImage, siteUrl).toString()
    : defaultImage
  const keywords = uniqueKeywords([
    blog.title,
    blog.category,
    ...brandKeywords,
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
    title: blog.metaTitle ?? `${blog.title} • Blog`,
    description: blog.metaDescription ?? blog.excerpt,
    path,
    image: ogImage,
    ogType: 'article',
    keywords,
    imageAlt: `${blog.title} • Blog`,
    extraMeta: [
      { property: 'article:published_time', content: toIsoDateTime(blog.date) },
      { property: 'article:modified_time', content: toIsoDateTime(modifiedDate) },
      { property: 'article:author', content: author },
      { property: 'article:section', content: blog.category },
      ...blog.tags.map((tag) => ({ property: 'article:tag', content: tag })),
    ],
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
        headline: blog.title,
        name: blog.title,
        description: blog.excerpt,
        image: ogImage,
        datePublished: blog.date,
        dateModified: modifiedDate,
        url,
        author: personSchema,
        publisher: personSchema,
        articleSection: blog.category,
        // Google Article-recommended signals: length and reading time (ISO 8601 duration).
        wordCount: blogWordCount(blog),
        timeRequired: `PT${blogReadMinutes(blog)}M`,
        isPartOf: { '@id': `${new URL(sitePaths.blogs, siteUrl).toString()}#blog` },
        inLanguage: 'en',
        keywords,
      },
      createBreadcrumb([
        { name: 'Home', path: sitePaths.home },
        { name: 'Blog', path: sitePaths.blogs },
        { name: blog.title, path },
      ]),
    ],
  })
}

export const notFoundSEO = createSeo({
  title: 'Mohammed Mostafa • 404',
  description: 'The requested page could not be found on Mohammed Mostafa’s portfolio.',
  path: sitePaths.home,
  imageAlt: 'Mohammed Mostafa • Software Engineer Portfolio',
  robots: 'noindex, follow',
})
