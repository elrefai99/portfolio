import { sendContactEmail } from '../server/utils/contact-email'

// Vercel serverless function (root api/ directory — built independently of the
// static `nuxt generate` output, so the contact form works even though the site
// itself has no runtime server). Vercel rejects non-POST methods with 405
// because only POST is exported. In `nuxt dev`, the equivalent Nitro route
// server/api/contact.post.ts serves the same path and JSON shape.
export async function POST(request: Request): Promise<Response> {
  const payload = await request.json().catch(() => null)
  const result = await sendContactEmail(payload ?? {})
  const body = result.ok ? { ok: true } : { ok: false, error: result.error }
  return new Response(JSON.stringify(body), {
    status: result.ok ? 200 : result.status,
    headers: { 'content-type': 'application/json' },
  })
}
