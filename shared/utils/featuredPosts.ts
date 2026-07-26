export type FeaturedPost = {
  slug: string
  title: string
  category: string
}

export const featuredPosts: FeaturedPost[] = [
  {
    slug: 'crdts-yjs-collaborative-editing-srvj',
    title: 'CRDTs & Yjs in Production: The Day I Stopped Writing Conflict-Resolution Code',
    category: 'Distributed Systems',
  },
  {
    slug: 'paymob-amazon-payment-services-integration',
    title: 'PayMob Webhooks in Node.js: HMAC, Idempotency & What the Docs Don\'t Cover',
    category: 'Payment Integration',
  },
  {
    slug: 'jwt-vs-paseto-tokens',
    title: 'PASETO vs JWT in Node.js: Choosing the Right Token for the Job',
    category: 'Backend Security',
  },
]
