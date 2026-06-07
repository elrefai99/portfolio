import { Resend } from 'resend';

interface Attachment {
     filename: string
     content: Buffer | string
}

export const resendFunction = async (
     to: string,
     html: string,
     subject: string,
     replyTo?: string,
     attachments: Attachment[] = [],
) => {
     const resend = new Resend(process.env.RESEND_API_KEY);
     try {
          const payload: {
               from: string
               to: string
               subject: string
               html: string
               replyTo?: string
               attachments?: Attachment[]
          } = {
               from: process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <contact@elrefai.me>',
               to,
               subject,
               html,
               replyTo,
          };

          if (attachments.length > 0) {
               payload.attachments = attachments;
          }

          const { data, error } = await resend.emails.send(payload);

          if (error) {
               console.error("❌ Resend error:", error);
               throw error;
          }
          console.log("✅ Email sent successfully via Resend:", data?.id);
          return data;
     } catch (error) {
          console.error("❌ Failed to send email via Resend:", error);
          throw error;
     }
}
