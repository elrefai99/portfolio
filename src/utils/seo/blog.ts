import { sitePaths, siteUrl } from '../site'
import { blogs, blogReadMinutes, blogWordCount, type BlogPost } from '../blogs'
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
        datePublished: blog.date,
        dateModified: modifiedDate,
        url,
        author: personSchema,
        publisher: personSchema,
        articleSection: blog.category,
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
