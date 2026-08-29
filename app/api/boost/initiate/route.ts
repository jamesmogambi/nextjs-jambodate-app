import { NextResponse } from 'next/server';
import { isFirebaseAdminConfigured } from '@/lib/server/firebaseAdmin';
import { verifyAuthToken, AuthError } from '@/lib/server/auth';
import { createPaymentIntent } from '@/lib/boost/boostService';
import { trackEvent } from '@/lib/analytics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface InitiateBody {
  planId: string;
  phoneNumber?: string;
  idToken: string;
}

export async function POST(request: Request) {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'Payment service is not configured.' },
      { status: 503 }
    );
  }

  const body = (await request.json().catch(() => null)) as InitiateBody | null;
  if (!body || !body.planId || !body.idToken) {
    return NextResponse.json(
      { ok: false, error: 'planId and idToken are required.' },
      { status: 400 }
    );
  }

  try {
    const uid = await verifyAuthToken(body.idToken);
    trackEvent('boost_payment_started', { userId: uid, planId: body.planId });

    const intent = await createPaymentIntent(uid, body.planId, body.phoneNumber);

    return NextResponse.json({
      ok: true,
      paymentId: intent.paymentId,
      status: intent.status,
      planId: intent.planId,
      amount: intent.amount,
      currency: intent.currency,
      provider: intent.provider,
      instruction: intent.instruction,
      checkoutUrl: intent.checkoutUrl,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to initiate boost payment';
    if (err instanceof AuthError || message.toLowerCase().includes('invalid boost plan')) {
      return NextResponse.json({ ok: false, error: message }, { status: 400 });
    }
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    { ok: true, message: 'JamboDate boost payment initiation endpoint. POST to submit.' },
    { status: 200 }
  );
}
