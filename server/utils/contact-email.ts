import { Resend } from 'resend'

// Shared by both contact endpoints: server/api/contact.post.ts (nuxt dev) and
// api/contact.ts (Vercel serverless function in production — the site itself is
// fully static, so Nitro routes don't exist at runtime). Keep this module free
// of Nitro/h3 imports so the Vercel bundler can compile it standalone.

export type ContactPayload = {
  name?: unknown
  email?: unknown
  subject?: unknown
  message?: unknown
  /** Honeypot — hidden field humans never fill. */
  company?: unknown
}

export type ContactResult =
  | { ok: true }
  | { ok: false; status: number; error: string }

const LIMITS = { name: 100, email: 254, subject: 150, message: 5000 } as const

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const clean = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] as string,
  )

export const sendContactEmail = async (payload: ContactPayload): Promise<ContactResult> => {
  // Bots fill the hidden field — report success without sending anything.
  if (typeof payload.company === 'string' && payload.company.trim() !== '') {
    return { ok: true }
  }

  const name = clean(payload.name, LIMITS.name)
  const email = clean(payload.email, LIMITS.email)
  const subject = clean(payload.subject, LIMITS.subject)
  const message = clean(payload.message, LIMITS.message)

  if (!name || !email || !subject || !message) {
    return { ok: false, status: 400, error: 'Name, email, subject, and message are all required.' }
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, status: 400, error: 'Please enter a valid email address.' }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return { ok: false, status: 503, error: 'The contact form is not configured. Please email me directly instead.' }
  }

  const resend = new Resend(apiKey)
  const { data, error } = await resend.emails.send({
    // onboarding@elrefai.me requires the elrefai.me domain to be verified in
    // Resend (SPF + DKIM). Override with CONTACT_FROM if the sender changes.
    from: process.env.CONTACT_FROM || 'Portfolio Contact <onboarding@elrefai.me>',
    to: process.env.CONTACT_TO || 'elrefai99@gmail.com',
    replyTo: `${name} <${email}>`,
    subject: `[elrefai.me] ${subject}`,
    text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
    html: `<div style="font-family:sans-serif;line-height:1.6">
  <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
  <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
  <hr>
  <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
</div>`,
  })

  if (error) {
    console.error('[contact] Resend send failed:', error)
    return { ok: false, status: 502, error: 'Sending failed. Please try again later or email me directly.' }
  }
  // The id is searchable in the Resend dashboard (Emails → delivery status).
  console.log(`[contact] sent via Resend, id: ${data?.id}`)
  return { ok: true }
}
