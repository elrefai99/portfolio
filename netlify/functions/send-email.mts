// Netlify Function (v2) — sends contact-form messages through Resend.
//
// Required environment variable:
//   RESEND_API_KEY   – your Resend API key (Site settings → Environment variables)
//
// Optional environment variables:
//   CONTACT_TO_EMAIL   – where messages are delivered (default: mohamed.mostafa0699@gmail.com)
//   CONTACT_FROM_EMAIL – verified Resend sender (default: contact@elrefai.me)

import { resendFunction } from './resendFunction.mjs'
import { contactEmailTemplate } from './emailTemplate.mjs'

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'mohamed.mostafa0699@gmail.com'

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return json(405, { error: 'Method not allowed' })
  }

  if (!process.env.RESEND_API_KEY) {
    return json(500, { error: 'Email service is not configured.' })
  }

  let body: { name?: string; email?: string; message?: string; company?: string }
  try {
    body = (await req.json()) as typeof body
  } catch {
    return json(400, { error: 'Invalid request body.' })
  }

  // Honeypot — bots fill hidden fields, humans leave them empty.
  if (body.company) {
    return json(200, { ok: true })
  }

  const name = (body.name ?? '').trim()
  const email = (body.email ?? '').trim()
  const message = (body.message ?? '').trim()

  if (!name || !email || !message) {
    return json(400, { error: 'Name, email, and message are required.' })
  }
  if (!isEmail(email)) {
    return json(400, { error: 'Please provide a valid email address.' })
  }
  if (message.length > 5000) {
    return json(400, { error: 'Message is too long.' })
  }

  const html = contactEmailTemplate({ name, email, message })

  try {
    await resendFunction(TO_EMAIL, html, `New portfolio message from ${name}`, email)
    return json(200, { ok: true })
  } catch {
    return json(502, { error: 'Failed to send message. Please try again later.' })
  }
}
