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
  title: 'Mohamed Mostafa • Resume',
  description:
    'Software Engineer at Lesoll with 4+ years of experience building production APIs, real-time systems, payment integrations, and cloud infrastructure.',
  path: sitePaths.resume,
  keywords: [
    ...brandKeywords,
    'Mohamed Mostafa resume',
    'Mohamed Mostafa CV',
    'Software Engineer resume',
    'Backend Engineer CV',
    ...skillKeywords,
  ],
  image: `${siteUrl}/og/page-resume.png`,
  imageAlt: 'Mohamed Mostafa • Resume',
  schema: [
    personSchema,
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${new URL(sitePaths.resume, siteUrl).toString()}#webpage`,
      name: 'Mohamed Mostafa Resume',
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
