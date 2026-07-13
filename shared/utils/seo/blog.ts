import { sitePaths, siteUrl } from '../site'
import { blogs, blogReadMinutes, blogWordCount, type BlogEntity, type BlogPost } from '../blogs'
import {
  brandKeywords,
  createBreadcrumb,
  createSeo,
  defaultImage,
  personId,
  personSchema,
  toIsoDateTime,
  uniqueKeywords,
} from './shared'

// This module (and the views that import it) is the only SEO entry that pulls
// the full blog corpus — keep it out of shared.ts so other pages stay light.

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

export const blogsSEO = createSeo({
  // Mirrors the page h1 so the title carries topic keywords, not just brand.
  title: 'Blog • Mohammed Mostafa',
  description:
    'Read backend engineering notes by Mohammed Mostafa about Node.js, TypeScript, Express.js, API architecture, queues, Redis, and production systems.',
  path: sitePaths.blogs,
  keywords: [
    ...brandKeywords,
    'Mohammed Mostafa blog',
    'Elrefai blog',
    ...blogTopicKeywords,
  ],
  image: `${siteUrl}/og/page-blogs.png`,
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
      author: { '@id': personId },
      inLanguage: 'en',
      keywords: blogTopicKeywords,
      // Enumerate the posts so crawlers see the collection's members and dates.
      blogPost: blogs.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        name: post.title,
        description: post.metaDescription ?? post.excerpt,
        url: new URL(`${sitePaths.blogs}/${post.slug}`, siteUrl).toString(),
        datePublished: toIsoDateTime(post.date),
        dateModified: toIsoDateTime(post.updated ?? post.date),
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
    personSchema,
    createBreadcrumb([
      { name: 'Home', path: sitePaths.home },
      { name: 'Blog', path: sitePaths.blogs },
    ]),
  ],
})

// Entity SEO: emit each post's named topics as schema.org Things with
// authoritative sameAs URLs (Wikipedia/spec/docs) so search and AI engines can
// tie the article to the exact concept — first three are the primary `about`
// topics, the rest are `mentions`.
const toSchemaThing = (entity: BlogEntity) => ({
  '@type': 'Thing',
  name: entity.name,
  sameAs: entity.sameAs,
})

export const createBlogPostSEO = (blog: BlogPost) => {
  const path = `${sitePaths.blogs}/${blog.slug}`
  const url = new URL(path, siteUrl).toString()
  const modifiedDate = blog.updated || blog.date
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
      // The OG protocol wants a profile URL here, not a name string.
      { property: 'article:author', content: siteUrl },
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
        datePublished: toIsoDateTime(blog.date),
        dateModified: toIsoDateTime(modifiedDate),
        url,
        author: { '@id': personId },
        publisher: { '@id': personId },
        articleSection: blog.category,
        wordCount: blogWordCount(blog),
        timeRequired: `PT${blogReadMinutes(blog)}M`,
        isPartOf: { '@id': `${new URL(sitePaths.blogs, siteUrl).toString()}#blog` },
        inLanguage: 'en',
        // Voice / answer-engine hint: read the headline and the article body.
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', '.blog-content'],
        },
        keywords,
        ...(blog.entities?.length
          ? {
            about: blog.entities.slice(0, 3).map(toSchemaThing),
            ...(blog.entities.length > 3
              ? { mentions: blog.entities.slice(3).map(toSchemaThing) }
              : {}),
          }
          : {}),
      },
      personSchema,
      createBreadcrumb([
        { name: 'Home', path: sitePaths.home },
        { name: 'Blog', path: sitePaths.blogs },
        { name: blog.title, path },
      ]),
    ],
  })
}
