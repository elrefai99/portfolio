// HTML email template for contact-form notifications.
// Inline styles + table layout so it renders consistently across email
// clients (Gmail, Outlook, Apple Mail). Visually mirrors the site:
// dark canvas (#111 / #1a1a1a), monochrome glass card, "Elrefai" wordmark.

export interface ContactEmailData {
  name: string
  email: string
  message: string
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

/**
 * Renders the contact-form notification email as a full HTML document.
 * All dynamic values are HTML-escaped, so pass raw user input directly.
 */
export const contactEmailTemplate = ({ name, email, message }: ContactEmailData): string => {
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, '<br />')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="dark light" />
  <title>New portfolio message</title>
</head>
<body style="margin:0;padding:0;background-color:#111111;">
  <!-- preheader (hidden) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#111111;">
    New message from ${safeName} via elrefai.me
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
         style="background-color:#111111;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
               style="max-width:560px;width:100%;">

          <!-- Wordmark -->
          <tr>
            <td style="padding:0 8px 20px;">
              <span style="font-size:20px;font-weight:700;letter-spacing:-0.02em;color:#ffffff;">Elrefai</span>
              <span style="font-size:13px;color:#8a8a8a;padding-left:8px;">elrefai.me</span>
            </td>
          </tr>

          <!-- Glass card -->
          <tr>
            <td style="background-color:#1a1a1a;border:1px solid rgba(255,255,255,0.10);border-radius:20px;padding:32px 28px;box-shadow:0 18px 36px rgba(0,0,0,0.36);">

              <p style="margin:0 0 4px;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#7c7c7c;">
                New contact-form message
              </p>
              <h1 style="margin:0 0 24px;font-size:24px;font-weight:700;letter-spacing:-0.02em;color:#ffffff;">
                ${safeName} reached out
              </h1>

              <!-- Meta rows -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
                    <span style="font-size:12px;color:#7c7c7c;">Name</span><br />
                    <span style="font-size:15px;color:#ededed;">${safeName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
                    <span style="font-size:12px;color:#7c7c7c;">Email</span><br />
                    <a href="mailto:${safeEmail}" style="font-size:15px;color:#ffffff;text-decoration:none;">${safeEmail}</a>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <span style="font-size:12px;color:#7c7c7c;">Message</span>
              <div style="margin-top:8px;padding:16px 18px;background-color:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;">
                <p style="margin:0;font-size:15px;line-height:1.6;color:#dcdcdc;">${safeMessage}</p>
              </div>

              <!-- Reply button -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
                <tr>
                  <td style="border-radius:10px;background-color:#ffffff;">
                    <a href="mailto:${safeEmail}"
                       style="display:inline-block;padding:11px 22px;font-size:14px;font-weight:600;color:#111111;text-decoration:none;border-radius:10px;">
                      Reply to ${safeName}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 8px 0;">
              <p style="margin:0;font-size:12px;color:#6a6a6a;">
                Sent from the contact form on
                <a href="https://elrefai.me" style="color:#9a9a9a;text-decoration:none;">elrefai.me</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
