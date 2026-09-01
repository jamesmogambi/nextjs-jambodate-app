import { NextResponse } from 'next/server';
import {
  sendAdminVerificationNotification,
  sendUserVerificationAck,
  isEmailConfigured,
  type VerificationNotificationData,
} from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface VerificationRequestBody {
  userId: string;
  userName: string;
  userEmail?: string;
  userPhoto?: string;
  selfieUrl: string;
  idDocumentUrl?: string;
  submittedAt: string;
}

export async function POST(request: Request) {
  if (!isEmailConfigured()) {
    console.warn(
      '[verification] EMAIL_USER/EMAIL_PASSWORD not configured — emails will not be sent.'
    );
    return NextResponse.json(
      {
        ok: false,
        error: 'Email service is not configured on the server.',
        adminNotified: false,
        userNotified: false,
      },
      { status: 503 }
    );
  }

  const body = (await request.json().catch(() => null)) as VerificationRequestBody | null;

  if (!body) {
    return NextResponse.json(
      { ok: false, error: 'Invalid or missing request body.' },
      { status: 400 }
    );
  }

  const { userId, userName, userEmail, selfieUrl } = body;
  if (!userId || !userName || !selfieUrl) {
    return NextResponse.json(
      { ok: false, error: 'userId, userName, and selfieUrl are required.' },
      { status: 400 }
    );
  }

  const data: VerificationNotificationData = {
    userId,
    userName,
    userEmail,
    userPhoto: body.userPhoto,
    selfieUrl,
    idDocumentUrl: body.idDocumentUrl,
    submittedAt: body.submittedAt || new Date().toISOString(),
  };

  const results: { adminNotified: boolean; userNotified: boolean; errors: string[] } = {
    adminNotified: false,
    userNotified: false,
    errors: [],
  };

  try {
    await sendAdminVerificationNotification(data);
    results.adminNotified = true;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[verification] Failed to send admin notification:', message);
    results.errors.push(`admin: ${message}`);
  }

  if (userEmail) {
    try {
      await sendUserVerificationAck(data);
      results.userNotified = true;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('[verification] Failed to send user acknowledgment:', message);
      results.errors.push(`user: ${message}`);
    }
  }

  const ok = results.adminNotified && results.userNotified;

  return NextResponse.json(
    {
      ok,
      adminNotified: results.adminNotified,
      userNotified: results.userNotified,
      errors: results.errors.length ? results.errors : undefined,
    },
    { status: ok ? 200 : 206 }
  );
}

export async function GET() {
  return NextResponse.json(
    { ok: true, message: 'JamboDate verification notification endpoint. POST to submit.' },
    { status: 200 }
  );
}
