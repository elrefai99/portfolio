export interface CaseBuiltItem {
  title: string
  problem?: string
  approach?: string
  implementation?: string
  outcome?: string
}

/** A real production incident: what broke, why, and how it was fixed. */
export interface CaseIncident {
  title: string
  problem: string
  rootCause: string
  solution: string
  result: string
}

/** An engineering decision and the tradeoff it accepted. */
export interface CaseDecision {
  title: string
  reasoning: string
  tradeoff?: string
}

/** Titled note used by Challenges / Performance / Security / Lessons. */
export interface CaseNote {
  title: string
  body: string
}

export interface CaseStudy {
  slug: string
  name: string
  category: string
  /**
   * Public-path URL of the project logo (e.g. '/projects/lesoll-logo.png').
   * Must stay a plain string — this module is loaded by vite.config.ts, so
   * asset imports would break the config. Files in public/ are served as-is.
   */
  logo?: string
  /** One line under the title in the hero. */
  summary: string
  role: string
  timeline?: string
  /** Curated short stack for the hero meta row (full tags live on the index). */
  stack: string[]
  link?: string
  github?: string
  overview: string[]
  challenges: CaseNote[]
  built: CaseBuiltItem[]
  incidents: CaseIncident[]
  decisions: CaseDecision[]
  performance: CaseNote[]
  security: CaseNote[]
  lessons: CaseNote[]
  result: string[]
  /** SERP title, ≤60 chars ideally. Falls back to "{name} • Case Study". */
  metaTitle?: string
  metaDescription: string
  keywords: string[]
  /** ISO date the case study went live — feeds TechArticle schema + article meta. */
  datePublished: string
  /** Bump when the study's content meaningfully changes. */
  dateModified?: string
  /** Related blog-post slugs: rendered as "Further reading" internal links. */
  relatedBlogSlugs?: string[]
}

/** Word count across all prose fields — feeds TechArticle schema. */
export const caseStudyWordCount = (cs: CaseStudy) => {
  const texts: string[] = [
    ...cs.overview,
    ...cs.challenges.flatMap((n) => [n.title, n.body]),
    ...cs.built.flatMap((b) => [b.title, b.problem ?? '', b.approach ?? '', b.implementation ?? '', b.outcome ?? '']),
    ...cs.incidents.flatMap((i) => [i.title, i.problem, i.rootCause, i.solution, i.result]),
    ...cs.decisions.flatMap((d) => [d.title, d.reasoning, d.tradeoff ?? '']),
    ...cs.performance.flatMap((n) => [n.title, n.body]),
    ...cs.security.flatMap((n) => [n.title, n.body]),
    ...cs.lessons.flatMap((n) => [n.title, n.body]),
    ...cs.result,
  ]
  return texts.join(' ').split(/\s+/).filter(Boolean).length
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'lesoll',
    logo: '/projects/lesoll-logo.png',
    name: 'Lesoll',
    category: 'Production',
    summary:
      'Backend of a large-scale real-estate classifieds marketplace serving real users in the Egyptian market.',
    role: 'Backend Engineer — primary, 100% of the backend implementation',
    timeline: 'Jun 2023 — Jul 2026',
    stack: [
      'TypeScript',
      'Express.js',
      'MongoDB',
      'Redis',
      'BullMQ',
      'Socket.IO',
      'Paymob',
      'AWS',
      'Docker',
      'NGINX',
      "..."
    ],
    link: 'https://lesoll.com',
    overview: [
      'Lesoll is a large-scale classifieds marketplace for the Egyptian real-estate market. Users buy, sell, and rent residential, commercial, land, and compound properties; the platform also carries premium listing packages, real-time messaging, a blog, and a complete internal administration system.',
      'The business goal is straightforward: connect property owners and seekers directly, and monetize through premium listing packages — which makes the listing lifecycle, search, and payments the load-bearing parts of the backend.',
      'As the Backend Engineer I owned the backend implementation end to end: REST APIs, business logic, database architecture, third-party integrations, and performance work — across the listing lifecycle, authentication, payments, notifications, search, analytics, and internal admin services, on a production platform with real users, where mistakes are visible.',
    ],
    challenges: [
      {
        title: 'Search at scale',
        body: 'Thousands of listings behind dozens of combinable filters, and users who expect results in a few hundred milliseconds.',
      },
      {
        title: 'Media reliability',
        body: 'Listings are created with multiple images. When an upload fails silently, the listing goes live incomplete.',
      },
      {
        title: 'Subscription lifecycle',
        body: 'Package purchases, feature activation, renewals, and expiration all mutate paid state — none of it may ever land in an inconsistent state.',
      },
      {
        title: 'Ranking with premium features',
        body: 'The feed has to surface the most valuable listings while pinned, paid listings keep the exposure they were promised.',
      },
      {
        title: 'SEO for dynamic pages',
        body: 'A large, constantly changing set of listing pages has to stay crawlable and indexable.',
      },
      {
        title: 'Analytics without slowdown',
        body: 'The business needs user-behavior data — visits, calls, WhatsApp clicks, favorites, shares — without the tracking weighing down hot request paths.',
      },
      {
        title: 'Growth',
        body: 'Database size and traffic keep growing; queries that were fine at launch degrade over time.',
      },
    ],
    built: [
      {
        title: 'Search and filtering engine',
        problem:
          'Search is the product’s front door: thousands of listings, dozens of filters, and an expectation of results in a few hundred milliseconds.',
        approach:
          'Do the work inside the database, once — and cache whatever stays expensive.',
        implementation:
          'Optimized MongoDB aggregation pipelines shaped around compound indexes, with unnecessary lookup stages removed rather than tuned, and caching in front of the queries that remained expensive.',
        outcome: 'Faster search responses and lower database load.',
      },
      {
        title: 'Payment and subscription system (Paymob)',
        problem:
          'Premium listing packages are the platform’s revenue. Purchases, feature activation, renewals, and expiration all mutate paid state, and an inconsistency here is a direct money problem.',
        approach:
          'Verify money first, activate features second — and let jobs, not humans, handle time-based transitions.',
        implementation:
          'Paymob integration with payment verification before any package activates, protection against duplicate gateway callbacks, transactional backend logic around subscription state changes, and automated expiration jobs.',
        outcome: 'A stable subscription lifecycle and noticeably less manual support intervention.',
      },
      {
        title: 'Image upload pipeline',
        problem:
          'Multi-image uploads occasionally failed, and listings were created incomplete.',
        implementation:
          'Reworked the upload pipeline: validation before anything is saved, retry and error handling around the uploads, and image processing moved off the blocking request path.',
        outcome: 'More reliable uploads and fewer failed listing creations.',
      },
      {
        title: 'Advertisement ranking',
        problem:
          'Show users the most valuable listings while premium features — like pinning — keep their promised exposure.',
        implementation:
          'A ranking strategy combining pin priority, freshness, listing status, and business rules.',
        outcome: 'Fair exposure for premium listings without degrading the browsing experience.',
      },
      {
        title: 'Real-time chat system',
        problem:
          'Buyers and sellers need to negotiate about a listing inside the platform, in real time, without dropping to phone calls or external messengers.',
        implementation:
          'A real-time messaging system built on Socket.IO, carrying conversations between users on the production platform.',
      },
      {
        title: 'Co-host system',
        implementation:
          'A co-host system that lets property owners delegate management of their listings to other accounts.',
      },
      {
        title: 'SEO backend',
        problem:
          'A large and constantly changing set of dynamic listing pages has to be crawlable.',
        implementation:
          'Dynamic sitemap generation, canonical URL generation, structured metadata APIs, and optimized URL construction.',
        outcome: 'Better indexing and search visibility.',
      },
      {
        title: 'Analytics and tracking',
        problem:
          'Understand user behavior without the tracking itself affecting performance.',
        implementation:
          'Event tracking for page visits and listing interactions — WhatsApp clicks, calls, favorites, shares — aggregated into statistics for internal dashboards.',
      },
    ],
    incidents: [],
    decisions: [],
    performance: [
      {
        title: 'Indexes and aggregation',
        body: 'Search and listing queries run through MongoDB aggregation pipelines shaped around compound indexes. Unnecessary lookup stages were removed instead of tuned — the fastest pipeline stage is the one that no longer exists.',
      },
      {
        title: 'Caching',
        body: 'Expensive, frequently repeated queries are cached, cutting repeated database calls on hot paths and lowering overall database load.',
      },
      {
        title: 'Non-blocking media processing',
        body: 'Image processing runs off the request path, so uploads no longer block API responses.',
      },
    ],
    security: [],
    lessons: [],
    result: [],
    metaTitle: 'Lesoll Deep Dive — Real-Estate Marketplace Backend | Mohammed Mostafa',
    metaDescription:
      'How I built Lesoll’s production real-estate marketplace backend: MongoDB search at scale, Paymob payments and subscriptions, Socket.IO chat, and BullMQ jobs.',
    datePublished: '2026-07-09',
    relatedBlogSlugs: ['paymob-amazon-payment-services-integration'],
    keywords: [
      'Lesoll',
      'Backend Engineering',
      'Software Architecture',
      'Distributed Systems',
      'Real-Time Systems',
      'Cloud Computing',
      'System Design',
      'Node.js',
      'TypeScript',
      'Express.js',
      'REST APIs',
      'MongoDB',
      'PostgreSQL',
      'Redis',
      'BullMQ',
      'Socket.IO',
      'Docker',
      'Kubernetes',
      'AWS',
      'CI/CD',
      'GitHub Actions',
      'NGINX',
      'Payment Gateway Integration',
      'Real-Time Collaboration',
      'CRDT',
      'Yjs',
      'Server-Sent Events',
      'WebSockets',
      'PASETO',
      'Authentication',
      'Authorization',
      'RBAC',
      'Caching',
      'Background Job Processing',
      'Message Queues',
      'Performance Optimization',
      'Scalable Backend Systems'
    ]
  },
  {
    slug: 'egystay',
    logo: '/projects/egy-stay-logo.png',
    name: 'EGYStay',
    category: 'Production',
    summary:
      'Booking and reservation backend for a short-term rental platform, built from the ground up.',
    role: 'Backend Engineer — primary, ~80% of the implementation (1100 of 1300 commits)',
    stack: [
      'TypeScript',
      'Express.js',
      'MongoDB',
      'Redis',
      'BullMQ',
      'Socket.IO',
      'Amazon Payment Services',
      'Paymob',
      'AWS',
      'Docker',
      "..."
    ],
    link: 'https://egystay.com',
    overview: [
      'EGYStay is a short-term rental platform for the Egyptian market. Guests book accommodations; hosts and co-hosts manage their properties through dedicated dashboards. Reservations, availability, and pricing are the core of the product — if any of them is wrong, someone loses money or a place to stay.',
      'I architected and developed the backend from the ground up: reservation workflows, availability management, pricing logic, payments, authentication, messaging, notifications, and administrative services.',
      'I contributed roughly 80% of the implementation — around 63,000 lines of production code across 600+ source files — with maintainability and performance as explicit goals rather than afterthoughts.',
    ],
    challenges: [
      {
        title: 'Reservation conflicts',
        body: 'Two guests must never book the same property for the same nights — even when they try at the same moment.',
      },
      {
        title: 'Calendar consistency',
        body: 'Property availability has to stay synchronized after every booking and cancellation.',
      },
      {
        title: 'Pricing complexity',
        body: 'A total price depends on nights, cleaning fee, service fee, discounts, taxes, and promotions — and must come out identical everywhere it is computed.',
      },
      {
        title: 'Search',
        body: 'Filtering by city, dates, guests, price, amenities, and property type, with responses that stay fast.',
      },
      {
        title: 'Instant updates',
        body: 'Guests and hosts need to hear about booking events as they happen.',
      },
      {
        title: 'Booking integrity',
        body: 'Only valid bookings may ever reach payment.',
      },
      {
        title: 'Operations',
        body: 'Listings, reservations, users, and reports need efficient day-to-day administrative management.',
      },
    ],
    built: [
      {
        title: 'Booking system',
        problem:
          'A booking is only correct when availability, pricing, and reservation state agree — including when two guests race for the same nights.',
        approach:
          'Validate on the server, and make the final booking write atomic so a race cannot produce two winners.',
        implementation:
          'Backend availability validation with overlapping-reservation checks, booking creation protected by atomic database operations, and availability calculation logic that updates automatically on bookings and cancellations.',
        outcome: 'Double bookings were eliminated.',
      },
      {
        title: 'Pricing engine',
        problem:
          'The total price of a stay depends on nights, cleaning fee, service fee, discounts, taxes, and promotions — computed in more than one place, it will eventually disagree with itself.',
        approach: 'One implementation of the math, used everywhere.',
        implementation:
          'Pricing calculations centralized in a reusable service, with every calculation validated on the server — never trusted from the client.',
      },
      {
        title: 'Payment system (Amazon Payment Services + Paymob)',
        problem:
          'Real money moves on every reservation, so payment state has to stay consistent with booking state.',
        implementation:
          'A payment system integrating two gateways — Amazon Payment Services and Paymob — covering payment initiation, gateway callbacks, and payment state tracking for reservations.',
      },
      {
        title: 'Property search',
        problem:
          'Search spans city, dates, guests, price, amenities, and property type — and still has to answer fast.',
        implementation:
          'Optimized filtering queries over indexes on the frequently searched fields, with unnecessary database work stripped out of the hot path.',
      },
      {
        title: 'Real-time chat system',
        problem:
          'Guests and hosts need to communicate about a stay inside the platform, in real time.',
        implementation:
          'A real-time messaging system built on Socket.IO.',
      },
      {
        title: 'Notifications',
        problem:
          'Guests and hosts need instant updates when a booking changes state.',
        implementation:
          'Booking events trigger notifications; confirmations and status changes are processed asynchronously, so delivery never blocks the booking flow.',
      },
      {
        title: 'Co-host system',
        implementation:
          'Hosts can delegate property management to co-hosts, who operate through dedicated dashboards.',
      },
      {
        title: 'Admin platform',
        problem:
          'Listings, reservations, users, and reports need efficient day-to-day management.',
        implementation:
          'Administrative APIs with dashboards and reporting endpoints, gated by role-based authorization.',
      },
    ],
    incidents: [],
    decisions: [],
    performance: [
      {
        title: 'Search indexes',
        body: 'Frequently searched fields are indexed, and the filtering queries are shaped around those indexes.',
      },
      {
        title: 'Less database work',
        body: 'Unnecessary database work was stripped out of request paths rather than optimized in place.',
      },
      {
        title: 'Async processing',
        body: 'Booking confirmations, status changes, and notification delivery run asynchronously, off the request path.',
      },
    ],
    security: [
      {
        title: 'Secure booking flow',
        body: 'Server-side validation, ownership checks, and availability verification all run before a booking is allowed to reach payment.',
      },
      {
        title: 'Role-based authorization',
        body: 'Administrative APIs and dashboards are gated by role-based authorization.',
      },
    ],
    lessons: [],
    result: [],
    metaTitle: 'EGYStay Deep Dive — Booking Platform Backend | Mohammed Mostafa',
    metaDescription:
      'How I built EGYStay’s booking backend from the ground up: atomic reservations with zero double bookings, a centralized pricing engine, and APS + Paymob payments.',
    datePublished: '2026-07-09',
    relatedBlogSlugs: ['paymob-amazon-payment-services-integration'],
    keywords: [
      'EGYStay',
      'Booking Platform Backend',
      'Reservation System',
      'Short-Term Rental Platform',
      'Availability Management',
      'Express.js',
      'MongoDB',
      'Redis',
      'BullMQ',
      'Amazon Payment Services',
      'Paymob',
      'Payment Gateway Integration',
      'Production Backend',
      'Backend Case Study',
    ],
  },
  {
    slug: 'srvj',
    logo: '/projects/srvj.png',
    name: 'SRVJ',
    category: 'Real-time',
    summary:
      'A real-time collaborative diagram editor: CRDT synchronization, presence, and persistence built from protocol level up.',
    role: 'Solo — design and implementation, backend and frontend',
    stack: [
      'TypeScript',
      'Express.js',
      'Yjs (CRDTs)',
      'PostgreSQL',
      'Prisma',
      'MongoDB',
      'Redis',
      'BullMQ',
      'Docker',
      'Vue.js',
      "..."
    ],
    link: 'https://srvj.elrefai.me/',
    overview: [
      'SRVJ is a collaborative diagram editor where multiple people edit the same board at the same time — live cursors, presence, and conflict-free merging of concurrent edits. The interesting work is invisible: keeping every client convergent without a central lock, and persisting a document that is technically a binary CRDT state.',
      'I built it solo, end to end: the synchronization server, authentication and access control, the persistence layer, notifications, background processing, and the Vue frontend. The goal was to understand real-time collaboration infrastructure by building it from the protocol level up, not by wrapping a hosted service.',
    ],
    challenges: [],
    built: [
      {
        title: 'CRDT synchronization server',
        problem:
          'Concurrent edits from multiple clients must converge to the same document without locking or a "last write wins" data loss.',
        approach:
          'Yjs CRDTs carry the conflict resolution; the server’s job is transport and fan-out, not merging.',
        implementation:
          'A custom WebSocket server implementing the Yjs sync and awareness protocols. Each board gets a dedicated room, so collaboration sessions are isolated and a busy board cannot leak updates or presence into another.',
        outcome:
          'Live cursors, presence, and seamless multiplayer editing, with convergence guaranteed by the CRDT rather than by server-side coordination.',
      },
      {
        title: 'Authenticated, authorized WebSocket connections',
        problem:
          'WebSockets bypass the usual per-request middleware chain, so authentication and permissions have to be enforced at the connection boundary.',
        implementation:
          'Connections authenticate with PASETO v4 tokens, and project-level role-based access control is enforced before a client joins a board room.',
        outcome:
          'A client that should not see a board never receives its state or its awareness traffic.',
      },
      {
        title: 'Dual-snapshot persistence',
        problem:
          'The authoritative document is a Yjs binary state — lossless, but opaque to queries. An API that needs to list, search, or render previews cannot work against a binary blob.',
        implementation:
          'Every snapshot is stored twice: the authoritative Yjs binary state for lossless recovery, and a denormalized JSON representation for efficient querying and API reads.',
        outcome:
          'Recovery replays exact CRDT state; read paths never touch or decode the binary format.',
      },
      {
        title: 'Split storage: PostgreSQL and MongoDB',
        implementation:
          'PostgreSQL with Prisma holds the relational data — users, projects, memberships, sharing — where integrity and joins matter. MongoDB with Mongoose absorbs the high-frequency diagram mutation writes.',
      },
      {
        title: 'Scalable notifications and background jobs',
        problem:
          'Server-sent notification streams are pinned to one process; with multiple instances behind a load balancer, an event raised on one instance must reach clients connected to another.',
        implementation:
          'Notifications go out over SSE with Redis Pub/Sub fanning events out across instances. BullMQ workers handle asynchronous email and notification processing off the request path.',
        outcome:
          'Notification delivery scales horizontally, and slow work never blocks an API response.',
      },
      {
        title: 'Reliability and operations baseline',
        implementation:
          'Zod validation on inputs, Helmet and CORS, rate limiting, centralized error handling, structured logging with Pino, and Prometheus metrics. Collaboration behavior is verified with integration tests, and the platform runs containerized via Docker Compose behind Nginx.',
      },
    ],
    incidents: [],
    decisions: [
      {
        title: 'Two snapshot formats instead of one',
        reasoning:
          'The Yjs binary state is the only lossless representation of the document, but it cannot be queried. Rather than force one format to do both jobs badly, each read path gets the format built for it: binary for recovery, denormalized JSON for the API.',
        tradeoff:
          'Every snapshot is written and stored twice, and the two representations must be kept consistent.',
      },
      {
        title: 'PostgreSQL and MongoDB side by side',
        reasoning:
          'Identity, membership, and sharing are relational problems — foreign keys and constraints catch real bugs there. Diagram mutations are high-frequency, schema-light writes that fit a document store.',
        tradeoff:
          'Two databases mean two operational surfaces: separate backups, migrations, and failure modes.',
      },
      {
        title: 'SSE for notifications, WebSockets for collaboration',
        reasoning:
          'Board collaboration is genuinely bidirectional, so it runs over WebSockets. Notifications are one-way server-to-client, and SSE with Redis Pub/Sub fan-out delivers them across horizontally scaled instances without holding a second full-duplex socket per user.',
      },
    ],
    performance: [],
    security: [
      {
        title: 'PASETO v4 tokens',
        body: 'WebSocket connections are secured with PASETO v4 authentication before any board state is exchanged.',
      },
      {
        title: 'Project-level RBAC',
        body: 'Role-based access control is enforced per project, and collaboration sessions are isolated into dedicated board rooms.',
      },
      {
        title: 'Input and transport hardening',
        body: 'Zod validates inputs at the boundary; Helmet, CORS, and rate limiting cover the transport layer; errors flow through one centralized handler so failures never leak internals.',
      },
    ],
    lessons: [],
    result: [],
    metaTitle: 'SRVJ Deep Dive — Real-Time CRDT Collaboration Backend | Mohammed Mostafa',
    metaDescription:
      'Deep dive into SRVJ, a real-time collaborative diagram editor: Yjs CRDT sync, PASETO-authenticated WebSockets, dual-snapshot persistence, and SSE notifications.',
    datePublished: '2026-07-09',
    relatedBlogSlugs: [
      'crdts-yjs-collaborative-editing-srvj',
      'server-sent-events-real-time-notifications-srvj',
      'jwt-vs-paseto-tokens',
      'aws-ec2-s3-kubernetes-production-deployments',
    ],
    keywords: [
      'SRVJ',
      'Real-time Collaborative Editor',
      'Collaborative Diagram Editor',
      'Yjs',
      'CRDT',
      'WebSocket Authentication',
      'PASETO',
      'RBAC',
      'Server-Sent Events',
      'Redis Pub/Sub',
      'PostgreSQL',
      'Prisma',
      'MongoDB',
      'BullMQ',
      'Distributed Systems',
      'Backend Case Study',
    ],
  },
]

export const getCaseStudyBySlug = (slug: string) =>
  caseStudies.find((cs) => cs.slug === slug)
