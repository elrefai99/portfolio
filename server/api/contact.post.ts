import { sendContactEmail } from '../utils/contact-email'

// Dev-only in practice: the deployed site is static (`nuxt generate`), so this
// Nitro route never ships to production. There, api/contact.ts (a Vercel
// serverless function at the repo root) serves the same /api/contact path with
// the same JSON shape. Both delegate to server/utils/contact-email.ts.
export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => null)
  const result = await sendContactEmail(body ?? {})
  if (!result.ok) {
    setResponseStatus(event, result.status)
    return { ok: false, error: result.error }
  }
  return { ok: true }
})
