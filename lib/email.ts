import nodemailer from 'nodemailer';

export interface VerificationNotificationData {
  userName: string;
  userId: string;
  userEmail?: string;
  userPhoto?: string;
  selfieUrl: string;
  idDocumentUrl?: string;
  submittedAt: string;
  reviewTakesHours?: number;
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'support@kenyadesires.com';
const FROM_EMAIL = process.env.EMAIL_USER || '';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_SECURE =
  process.env.SMTP_SECURE === 'true' || Number(process.env.SMTP_PORT) === 465;

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: FROM_EMAIL,
        pass: process.env.EMAIL_PASSWORD || '',
      },
    });
  }
  return transporter;
}

export function isEmailConfigured(): boolean {
  return Boolean(FROM_EMAIL && process.env.EMAIL_PASSWORD);
}

const APP_NAME = 'JamboDate';
const HOME_URL = process.env.APP_URL || 'https://www.jambodate.com';

export async function sendAdminVerificationNotification(
  data: VerificationNotificationData
): Promise<void> {
  const transp = getTransporter();

  const cardColor = '#D99A52';
  const docLinks = [
    data.idDocumentUrl && `- ID Document: ${data.idDocumentUrl}`,
    `- Verification Selfie: ${data.selfieUrl}`,
  ].filter(Boolean).join('\n');

  const html = `<div style="font-family:ui-serif,Georgia,serif;color:#151A18;background:#FFFFFF;padding:32px;border-radius:16px;max-width:640px;margin:0 auto;border:1px solid #E5E7EB">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
      <div style="width:40px;height:40px;border-radius:10px;background:${cardColor}/15;color:${cardColor};display:flex;align-items:center;justify-content:center;font-weight:bold">JD</div>
      <h1 style="font-size:20px;font-weight:700;margin:0;color:#111816">New Verification Submission — ${APP_NAME}</h1>
    </div>
    <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px">
      <tr><td style="padding:4px 0 4px 0;color:#6B7280;width:140px;font-weight:600">Member</td><td style="padding:4px 0 4px 0;color:#111816;font-weight:600">${data.userName}</td></tr>
      <tr><td style="padding:4px 0 4px 0;color:#6B7280">Member ID</td><td style="padding:4px 0 4px 0;color:#111816;font-family:monospace;font-size:13px">${data.userId}</td></tr>
      <tr><td style="padding:4px 0 4px 0;color:#6B7280">Email</td><td style="padding:4px 0 4px 0;color:#111816">${data.userEmail || '—'}</td></tr>
      <tr><td style="padding:4px 0 4px 0;color:#6B7280">Submitted</td><td style="padding:4px 0 4px 0;color:#111816">${new Date(data.submittedAt).toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' })}</td></tr>
    </table>
    <div style="margin:16px 0;background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px;padding:12px 14px">
      <p style="font-size:13px;color:#6B7280;margin:0 0 6px;font-weight:600">Attached Documents</p>
      <pre style="font-size:13px;color:#374151;white-space:pre-wrap;word-break:break-all;margin:0;line-height:1.5">${docLinks}</pre>
    </div>
    <p style="font-size:14px;color:#374151">Review the member's selfie against their profile photo for liveness and likeness consistency, then approve or reject via the moderation dashboard.</p>
    <div style="margin-top:24px;text-align:center">
      <a href="${HOME_URL}/admin" style="background:#0EA5E9;color:#FFFFFF;padding:12px 22px;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;border:1px solid #0EA5E9">Open Moderation Dashboard</a>
    </div>
    <p style="font-size:12px;color:#9CA3AF;margin-top:24px">This is an automated notification from ${APP_NAME}.</p>
  </div>`;

  await transp.sendMail({
    from: `"${APP_NAME} Trust & Safety" <${FROM_EMAIL}>`,
    to: ADMIN_EMAIL,
    subject: `New Verification Request — ${APP_NAME}`,
    html,
  });
}

export async function sendUserVerificationAck(
  data: VerificationNotificationData
): Promise<void> {
  const transp = getTransporter();
  const reviewHours = data.reviewTakesHours ?? 3;

  const html = `<div style="font-family:ui-serif,Georgia,serif;color:#151A18;background:#FFFFFF;padding:32px;border-radius:16px;max-width:640px;margin:0 auto;border:1px solid #E5E7EB">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
      <div style="width:40px;height:40px;border-radius:10px;background:#3FAF72/15;color:#3FAF72;display:flex;align-items:center;justify-content:center;font-weight:bold">JD</div>
      <h1 style="font-size:20px;font-weight:700;margin:0;color:#111816">Documents Received — ${APP_NAME}</h1>
    </div>
    <p style="font-size:15px;color:#374151;line-height:1.6">
      Hi ${data.userName}, thanks for submitting your verification documents.
    </p>
    <p style="font-size:14px;color:#374151;line-height:1.6">
      Our moderation team has received your verification selfie${
      data.idDocumentUrl ? ' and ID document' : ''
    }. We're reviewing your submission now. Please allow up to a few hours — typically around ${reviewHours} hours — for the review to complete.
    </p>
    <p style="font-size:14px;color:#374151;line-height:1.6">
      As soon as your identity is confirmed, your profile will be awarded the green Kenyan Citizen Verified badge and your account gains priority placement in discovery feeds. You will receive a follow-up email once the review is finalized.
    </p>
    <div style="margin-top:24px;text-align:center">
      <a href="${HOME_URL}/verification" style="background:#3FAF72;color:#FFFFFF;padding:12px 22px;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;border:1px solid #3FAF72">Check Verification Status</a>
    </div>
    <p style="font-size:12px;color:#9CA3AF;margin-top:24px">This is an automated notification from ${APP_NAME}.</p>
  </div>`;

  await transp.sendMail({
    from: `"${APP_NAME} Trust & Safety" <${FROM_EMAIL}>`,
    to: data.userEmail,
    subject: `We've received your documents — ${APP_NAME} verification`,
    html,
  });
}
