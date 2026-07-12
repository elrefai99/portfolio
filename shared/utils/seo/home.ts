import { sitePaths, siteUrl } from '../site'
import {
  brandKeywords,
  createSeo,
  personId,
  personSchema,
  roleLocationKeywords,
  skillKeywords,
  websiteId,
  websiteSchema,
} from './shared'

export const homeSEO = createSeo({
  title: 'Mohammed Mostafa • Software Engineer',
  description:
    'Elrefai (Mohammed Mostafa, elrefai99) — Software Engineer at Lesoll in Cairo, Egypt. Backend APIs, payments & cloud systems with Node.js, TypeScript and AWS.',
  path: sitePaths.home,
  keywords: [...brandKeywords, ...roleLocationKeywords, ...skillKeywords],
  image: `${siteUrl}/og/page-home.png`,
  imageAlt: 'Mohammed Mostafa • Software Engineer Portfolio',
  schema: [
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
