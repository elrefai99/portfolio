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
    'Backend engineer building production Node.js and TypeScript systems — payment webhooks, BullMQ queues, CRDT real-time sync, and Kubernetes on AWS. Deep dives from real production work.',
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
