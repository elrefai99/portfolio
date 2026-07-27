import { sitePaths, siteUrl } from '../site'
import { projects } from '../projects'
import { caseStudyWordCount, type CaseStudy } from '../caseStudies'
import {
  brandKeywords,
  createBreadcrumb,
  createSeo,
  ogImageObject,
  organizationSchema,
  personId,
  personSchema,
  publisherId,
  toIsoDateTime,
  uniqueKeywords,
  websiteId,
} from './shared'

export const createCaseStudySEO = (cs: CaseStudy) => {
  const path = `${sitePaths.projects}/${cs.slug}`
  const url = new URL(path, siteUrl).toString()
  const ogImage = `${siteUrl}/og/project-${cs.slug}.png`
  const modifiedDate = cs.dateModified ?? cs.datePublished
  const projectEntry = projects.find((p) => p.slug === cs.slug)
  const projectKeywords = projectEntry?.keywords
    ? Array.isArray(projectEntry.keywords)
      ? projectEntry.keywords
      : [projectEntry.keywords]
    : []

  return createSeo({
    title: `${cs.name} • Mohammed Mostafa`,
    description: cs.metaDescription,
    path,
    image: ogImage,
    ogType: 'article',
    imageAlt: `${cs.name} • Backend Engineering Deep Dive`,
    // Real terms only — see the note in seo/blog.ts about the generated
    // `${name} deep dive` / `${name} case study` permutations that were here.
    keywords: uniqueKeywords([
      cs.name,
      `${cs.name} case study`,
      ...brandKeywords,
      ...projectKeywords,
      ...cs.keywords,
      ...cs.stack,
      'Backend engineering case study',
      'Production backend architecture',
    ]),
    extraMeta: [
      { property: 'article:published_time', content: toIsoDateTime(cs.datePublished) },
      { property: 'article:modified_time', content: toIsoDateTime(modifiedDate) },
      // The OG protocol wants a profile URL here, not a name string.
      { property: 'article:author', content: siteUrl },
      { property: 'article:section', content: 'Engineering Deep Dive' },
      ...cs.stack.map((tech) => ({ property: 'article:tag', content: tech })),
    ],
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        headline: cs.metaTitle ?? `${cs.name} — Backend Engineering Deep Dive`,
        name: `${cs.name} • Backend Engineering Deep Dive`,
        description: cs.metaDescription,
        image: ogImageObject(ogImage),
        url,
        datePublished: toIsoDateTime(cs.datePublished),
        dateModified: toIsoDateTime(modifiedDate),
        author: { '@id': personId },
        publisher: { '@id': publisherId },
        inLanguage: 'en',
        articleSection: 'Engineering Deep Dive',
        wordCount: caseStudyWordCount(cs),
        keywords: cs.keywords,
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', '.case-prose'],
        },
        isPartOf: { '@id': websiteId },
        about: {
          '@type': 'SoftwareApplication',
          name: cs.name,
          ...(projectEntry?.altNames?.length ? { alternateName: projectEntry.altNames } : {}),
          ...(cs.logo ? { image: new URL(cs.logo, siteUrl).toString() } : {}),
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Web',
          ...(cs.link ? { sameAs: cs.link } : {}),
          ...(cs.github ? { codeRepository: cs.github } : {}),
          keywords: cs.stack,
          author: { '@id': personId },
        },
      },
      personSchema,
      organizationSchema,
      createBreadcrumb([
        { name: 'Home', path: sitePaths.home },
        { name: 'Projects', path: sitePaths.projects },
        { name: cs.name, path },
      ]),
    ],
  })
}
