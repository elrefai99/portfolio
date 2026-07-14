import { sitePaths, siteUrl } from '../site'
import {
  brandKeywords,
  createBreadcrumb,
  createSeo,
  personId,
  personSchema,
  roleLocationKeywords,
} from './shared'

export const contactSEO = createSeo({
  title: 'Mohammed Mostafa • Contact',
  description:
    'Contact Mohammed Mostafa — Software Engineer in Cairo, Egypt. Reach out about backend engineering, freelance work, or collaboration via the contact form, email, GitHub, LinkedIn, or X.',
  path: sitePaths.contact,
  keywords: [
    ...brandKeywords,
    'Contact Mohammed Mostafa',
    'Hire backend engineer',
    'Hire Node.js developer',
    ...roleLocationKeywords,
  ],
  image: `${siteUrl}/og/page-contact.png`,
  imageAlt: 'Mohammed Mostafa • Contact',
  schema: [
    personSchema,
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Mohammed Mostafa',
      url: new URL(sitePaths.contact, siteUrl).toString(),
      mainEntity: { '@id': personId },
      about: { '@id': personId },
    },
    createBreadcrumb([
      { name: 'Home', path: sitePaths.home },
      { name: 'Contact', path: sitePaths.contact },
    ]),
  ],
})
