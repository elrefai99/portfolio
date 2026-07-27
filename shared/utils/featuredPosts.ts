export type FeaturedPost = {
  slug: string
  title: string
  category: string
}

export const featuredPosts: FeaturedPost[] = [
  {
    slug: 'nodejs-pino-s3-log-archiving-cron',
    title: 'Automated Log Archiving in Node.js: Pino, Cron Rotation, and AWS S3',
    category: 'Cloud & DevOps',
  },
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
