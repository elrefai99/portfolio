export type BlogBlock =
  | {
      type: 'paragraph'
      text: string
    }
  | {
      type: 'heading'
      text: string
    }
  | {
      type: 'list'
      items: string[]
    }
  | {
      type: 'code'
      language: string
      filename?: string
      code: string
    }

export type BlogPost = {
  id: number
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  tags: string[]
  blocks: BlogBlock[]
}

export const blogs: BlogPost[] = [
  {
    id: 1,
    slug: 'building-express-apis-with-typescript',
    title: 'Building Express APIs with TypeScript',
    excerpt:
      'A practical pattern for keeping Express route handlers small, typed, and easy to validate.',
    category: 'Backend',
    date: '2026-05-12',
    readTime: '4 min read',
    tags: ['TypeScript', 'Express.js', 'Zod', 'API Design'],
    blocks: [
      {
        type: 'paragraph',
        text:
          'Typed request handlers make backend code easier to review because validation, service calls, and responses each have a clear place.',
      },
      {
        type: 'heading',
        text: 'Keep the controller thin',
      },
      {
        type: 'paragraph',
        text:
          'The controller should translate HTTP input into application intent. Business rules belong in services where they can be reused and tested without a web server.',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'create-user.controller.ts',
        code:
          "import type { Request, Response } from 'express'\n" +
          "import { z } from 'zod'\n" +
          "import { usersService } from './users.service'\n\n" +
          "const createUserSchema = z.object({\n" +
          "  email: z.string().email(),\n" +
          "  name: z.string().min(2),\n" +
          "})\n\n" +
          "export const createUser = async (req: Request, res: Response) => {\n" +
          "  const input = createUserSchema.parse(req.body)\n" +
          "  const user = await usersService.create(input)\n\n" +
          "  return res.status(201).json({ data: user })\n" +
          "}\n",
      },
      {
        type: 'list',
        items: [
          'Validate at the edge of the app.',
          'Pass typed data into services.',
          'Keep response shapes consistent across routes.',
        ],
      },
    ],
  },
  {
    id: 2,
    slug: 'job-queues-that-stay-observable',
    title: 'Job Queues That Stay Observable',
    excerpt:
      'Small conventions that make BullMQ jobs easier to debug in production.',
    category: 'Infrastructure',
    date: '2026-05-10',
    readTime: '3 min read',
    tags: ['BullMQ', 'Redis', 'Node.js', 'Observability'],
    blocks: [
      {
        type: 'paragraph',
        text:
          'A queue is only useful when failures are visible. Job names, stable payloads, and structured logs make retries less mysterious.',
      },
      {
        type: 'heading',
        text: 'Give every job a useful shape',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'email.queue.ts',
        code:
          "type WelcomeEmailJob = {\n" +
          "  userId: string\n" +
          "  email: string\n" +
          "  requestedBy: 'signup' | 'admin'\n" +
          "}\n\n" +
          "await emailQueue.add('welcome-email', payload, {\n" +
          "  attempts: 3,\n" +
          "  backoff: { type: 'exponential', delay: 2000 },\n" +
          "  removeOnComplete: 1000,\n" +
          "  removeOnFail: 5000,\n" +
          "})\n",
      },
      {
        type: 'paragraph',
        text:
          'The goal is not to add ceremony. The goal is to make each failed job answer the first two questions quickly: what happened and what should be retried.',
      },
    ],
  },
]

export const getBlogBySlug = (slug: string) => blogs.find((blog) => blog.slug === slug)
