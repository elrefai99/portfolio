import { sitePaths, siteUrl } from '../site'
import { projects } from '../projects'
import { caseStudyWordCount, type CaseStudy } from '../caseStudies'
import {
  author,
  brandKeywords,
  createBreadcrumb,
  createSeo,
  personId,
  personSchema,
  toIsoDateTime,
  uniqueKeywords,
  websiteId,
} from './shared'

export const createCaseStudySEO = (cs: CaseStudy) => {
  const path = `${sitePaths.projects}/${cs.slug}`
  const url = new URL(path, siteUrl).toString()
  const ogImage = `${siteUrl}/og/project-${cs.slug}.png`
  const modifiedDate = cs.dateModified ?? cs.datePublished
  // The matching projects.ts entry carries the richest, hand-curated keyword
  // list for this product — reuse it instead of duplicating in caseStudies.ts.
  const projectEntry = projects.find((p) => p.slug === cs.slug)
  const projectKeywords = projectEntry?.keywords
    ? Array.isArray(projectEntry.keywords)
      ? projectEntry.keywords
      : [projectEntry.keywords]
    : []

  return createSeo({
    title: cs.metaTitle ?? `Mohammed Mostafa • ${cs.name}`,
    description: cs.metaDescription,
    path,
    image: ogImage,
    ogType: 'article',
    imageAlt: `${cs.name} • Backend Engineering Deep Dive`,
    keywords: uniqueKeywords([
      cs.name,
      `${cs.name} deep dive`,
      `${cs.name} case study`,
      `${cs.name} backend`,
      `${cs.name} architecture`,
      `${cs.name} engineering`,
      ...brandKeywords,
      ...projectKeywords,
      ...cs.keywords,
      ...cs.stack,
      'Backend engineering deep dive',
      'Backend engineering case study',
      'Production backend architecture',
      'Node.js case study',
      'Real-world backend engineering',
    ]),
    extraMeta: [
      { property: 'article:published_time', content: toIsoDateTime(cs.datePublished) },
      { property: 'article:modified_time', content: toIsoDateTime(modifiedDate) },
      { property: 'article:author', content: author },
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
        image: ogImage,
        url,
        datePublished: cs.datePublished,
        dateModified: modifiedDate,
        author: personSchema,
        publisher: personSchema,
        inLanguage: 'en',
        articleSection: 'Engineering Deep Dive',
        wordCount: caseStudyWordCount(cs),
        keywords: cs.keywords,
        isPartOf: { '@id': websiteId },
        about: {
          '@type': 'SoftwareApplication',
          name: cs.name,
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Web',
          ...(cs.link ? { sameAs: cs.link } : {}),
          ...(cs.github ? { codeRepository: cs.github } : {}),
          keywords: cs.stack,
          author: { '@id': personId },
        },
      },
      createBreadcrumb([
        { name: 'Home', path: sitePaths.home },
        { name: 'Projects', path: sitePaths.projects },
        { name: cs.name, path },
      ]),
    ],
  })
}
