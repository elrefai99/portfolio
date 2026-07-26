import { sitePaths, siteUrl } from '../site'
import {
  brandKeywords,
  createBreadcrumb,
  createSeo,
  personId,
  personSchema,
  skillKeywords,
  websiteId,
} from './shared'

export const resumeSEO = createSeo({
  title: 'Mohammed Mostafa • Resume',
  description:
    'Resume of Mohammed Mostafa — Software Engineer: Node.js, TypeScript, scalable APIs, payment integrations, MongoDB, PostgreSQL, Redis, Docker, and AWS.',
  path: sitePaths.resume,
  keywords: [
    ...brandKeywords,
    'Mohammed Mostafa resume',
    'Mohammed Mostafa CV',
    'Software Engineer resume',
    'Backend Engineer CV',
    ...skillKeywords,
  ],
  image: `${siteUrl}/og/page-resume.png`,
  imageAlt: 'Mohammed Mostafa • Resume',
  schema: [
    personSchema,
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${new URL(sitePaths.resume, siteUrl).toString()}#webpage`,
      name: 'Mohammed Mostafa Resume',
      url: new URL(sitePaths.resume, siteUrl).toString(),
      isPartOf: { '@id': websiteId },
      about: { '@id': personId },
      inLanguage: 'en',
    },
    createBreadcrumb([
      { name: 'Home', path: sitePaths.home },
      { name: 'Resume', path: sitePaths.resume },
    ]),
  ],
})
