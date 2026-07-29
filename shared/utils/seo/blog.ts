import { sitePaths, siteUrl } from '../site'
import { blogs, blogReadMinutes, blogWordCount, type BlogEntity, type BlogPost } from '../blogs'
import { slugifyHeading } from '../headingIds'
import {
  brandKeywords,
  createBreadcrumb,
  createSeo,
  defaultImage,
  ogImageObject,
  organizationSchema,
  personId,
  personSchema,
  publisherId,
  toIsoDateTime,
  uniqueKeywords,
  websiteId,
} from './shared'

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
  'Node.js logging',
  'Structured logging',
  'Observability',
  'AWS S3',
  'Cloud infrastructure blog',
  'Log rotation',
  'Log retention',
]

// /blogs is page 1; deeper pages live at /blogs/page/<n> (see
// shared/utils/blogs.ts's BLOGS_PER_PAGE / blogsPageCount). Each page gets its
// own canonical + title so they aren't duplicate-content against each other,
// but all pages describe the same Blog entity (`#blog`) and enumerate the
// full post corpus — pagination is a presentation slice, not a different
// collection.
export const blogsIndexPath = (page: number) =>
  page <= 1 ? sitePaths.blogs : `${sitePaths.blogs}/page/${page}`

export const createBlogsIndexSEO = (page: number) => {
  const path = blogsIndexPath(page)
  const pageSuffix = page > 1 ? ` — Page ${page}` : ''

  return createSeo({
    title: `Mohammed Mostafa • Blog${pageSuffix}`,
    description:
      page > 1
        ? `Page ${page} of production backend engineering write-ups by Mohammed Mostafa: queues, payments, real-time systems, authentication, observability, and AWS.`
        : 'Production backend engineering write-ups by Mohammed Mostafa: queues, payments, real-time systems, authentication, observability, and AWS — with the code and the numbers.',
    path,
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
        publisher: { '@id': publisherId },
        isPartOf: { '@id': websiteId },
        inLanguage: 'en',
        keywords: blogTopicKeywords,
        // Enumerate the posts so crawlers see the collection's members and dates,
        // independent of which page of the archive is currently rendering.
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
          'Structured logging',
          'Observability',
          'AWS',
        ],
      },
      personSchema,
      createBreadcrumb([
        { name: 'Home', path: sitePaths.home },
        { name: 'Blog', path: sitePaths.blogs },
        ...(page > 1 ? [{ name: `Page ${page}`, path }] : []),
      ]),
    ],
  })
}

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
  // Real terms only. The generated permutations that used to live here
  // (`${tag} blog`, `${tag} article`, `${title} elrefai99`) were a
  // keyword-stuffing pattern with no upside: these keywords now feed the
  // JSON-LD, where they are read for entity association, and a machine-made
  // list of near-duplicates helps nothing there either.
  const keywords = uniqueKeywords([
    blog.title,
    blog.category,
    ...brandKeywords,
    'Backend engineering blog',
    ...blog.tags,
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
        // Dual-typed on purpose. These are technical articles that happen to
        // live on a blog: TechArticle is the type Google's developer-content
        // understanding keys on, and it carries proficiencyLevel/dependencies,
        // which BlogPosting has no equivalent for.
        '@type': ['BlogPosting', 'TechArticle'],
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
        proficiencyLevel: blog.proficiencyLevel ?? 'Expert',
        ...(blog.dependencies?.length ? { dependencies: blog.dependencies.join(', ') } : {}),
        headline: blog.title,
        name: blog.title,
        description: blog.excerpt,
        image: ogImageObject(ogImage),
        datePublished: toIsoDateTime(blog.date),
        dateModified: toIsoDateTime(modifiedDate),
        url,
        author: { '@id': personId },
        publisher: { '@id': publisherId },
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
      // FAQPage / HowTo are emitted only when the post actually carries the
      // content — the page renders the same questions and steps visibly, which
      // is what the structured-data policy requires.
      ...(blog.faq?.length
        ? [{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${url}#faq`,
          isPartOf: { '@id': url },
          inLanguage: 'en',
          mainEntity: blog.faq.map((entry) => ({
            '@type': 'Question',
            name: entry.question,
            acceptedAnswer: { '@type': 'Answer', text: entry.answer },
          })),
        }]
        : []),
      ...(blog.howTo
        ? [{
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          '@id': `${url}#howto`,
          name: blog.howTo.name,
          description: blog.metaDescription ?? blog.excerpt,
          totalTime: blog.howTo.totalTime,
          inLanguage: 'en',
          ...(blog.howTo.tool?.length
            ? { tool: blog.howTo.tool.map((name) => ({ '@type': 'HowToTool', name })) }
            : {}),
          ...(blog.howTo.supply?.length
            ? { supply: blog.howTo.supply.map((name) => ({ '@type': 'HowToSupply', name })) }
            : {}),
          step: blog.howTo.steps.map((step, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: step.name,
            text: step.text,
            url: `${url}#${step.anchor ?? slugifyHeading(step.name)}`,
          })),
        }]
        : []),
      personSchema,
      organizationSchema,
      createBreadcrumb([
        { name: 'Home', path: sitePaths.home },
        { name: 'Blog', path: sitePaths.blogs },
        { name: blog.title, path },
      ]),
    ],
  })
}
