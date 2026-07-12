import { sitePaths, siteUrl } from '../site'
import { projects, type IProject } from '../projects'
import { brandKeywords, createBreadcrumb, createSeo, personId, personSchema } from './shared'

export const projectDescriptionText = (desc: string | string[]) =>
  Array.isArray(desc) ? desc.join(' ') : desc

const projectListItems = projects.map((project: IProject, index) => {
  const projectUrl = project.link || project.github || project.npm
  const anchorUrl = project.slug
    ? project.caseStudy
      ? new URL(`${sitePaths.projects}/${project.slug}`, siteUrl).toString()
      : `${new URL(sitePaths.projects, siteUrl).toString()}#${project.slug}`
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
      author: { '@id': personId },
      creator: { '@id': personId },
    },
  }
})

export const projectsSEO = createSeo({
  title: 'Mohammed Mostafa • Projects',
  description:
    'Projects by Elrefai (Mohammed Mostafa) — Lesoll, EGYStay, SRVJ, KeepITs, 0Gosha, Gen-Import, Elrecord: backend, API, payment, cloud, and developer tooling.',
  path: sitePaths.projects,
  keywords: [
    ...brandKeywords,
    'Mohammed Mostafa projects',
    'Elrefai projects',
    ...projects.map((project) => project.name),
    'Backend projects',
    'Node.js projects',
    'API projects',
    'Developer tooling',
  ],
  image: `${siteUrl}/og/page-projects.png`,
  imageAlt: 'Mohammed Mostafa • Node.js and TypeScript Projects Portfolio',
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Mohammed Mostafa Projects',
      url: new URL(sitePaths.projects, siteUrl).toString(),
      about: 'Backend, API, cloud, payment, and developer tooling projects by Elrefai (Mohammed Mostafa).',
      author: { '@id': personId },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: projectListItems.length,
        itemListElement: projectListItems,
      },
    },
    personSchema,
    createBreadcrumb([
      { name: 'Home', path: sitePaths.home },
      { name: 'Projects', path: sitePaths.projects },
    ]),
  ],
})
