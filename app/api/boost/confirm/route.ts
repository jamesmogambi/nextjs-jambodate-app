import { NextResponse } from 'next/server';
import { isFirebaseAdminConfigured } from '@/lib/server/firebaseAdmin';
import { verifyAuthToken, AuthError } from '@/lib/server/auth';
import { verifyAndActivate } from '@/lib/boost/boostService';
import { trackEvent } from '@/lib/analytics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ConfirmBody {
  paymentId: string;
  idToken: string;
}

export async function POST(request: Request) {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'Payment service is not configured.' },
      { status: 503 }
    );
  }

  const body = (await request.json().catch(() => null)) as ConfirmBody | null;
  if (!body || !body.paymentId || !body.idToken) {
    return NextResponse.json(
      { ok: false, error: 'paymentId and idToken are required.' },
      { status: 400 }
    );
  }

  let uid: string;
  try {
    uid = await verifyAuthToken(body.idToken);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unauthorized';
    return NextResponse.json({ ok: false, error: message }, { status: 401 });
  }

  try {
    const result = await verifyAndActivate(uid, body.paymentId);

    if (result.activated) {
      trackEvent('boost_activated', { userId: uid, planId: result.planId ?? undefined });
    }

    return NextResponse.json({
      ok: true,
      activated: result.activated,
      status: result.status,
      planId: result.planId,
      startedAt: result.startedAt ? result.startedAt.toDate().toISOString() : null,
      expiresAt: result.expiresAt ? result.expiresAt.toDate().toISOString() : null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to verify boost payment';
    if (err instanceof AuthError) {
      return NextResponse.json({ ok: false, error: message }, { status: 401 });
    }
    trackEvent('boost_payment_failed', { error: message });
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json(
    { ok: true, message: 'JamboDate boost payment confirmation endpoint. POST to poll.' },
    { status: 200 }
  );
}
