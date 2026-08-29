/**
 * Server-side Boost business logic.
 *
 * This module MUST only be imported by server-side code (Next.js route handlers).
 * It relies on the Firebase Admin SDK so that boost activation & price validation
 * happen with trusted server credentials and bypass Firestore security rules.
 */
import { getAdminDb } from '@/lib/server/firebaseAdmin';
import { getPaymentProvider } from '@/lib/payments';
import type { InitiatePaymentParams, PaymentStatus } from '@/lib/payments/types';
import { assertBoostPlan, BOOST_CURRENCY } from '@/lib/boost/config';
import type { BoostPlanId, BoostStatus } from '@/types';
import { Timestamp } from 'firebase-admin/firestore';

export interface PaymentIntentResult {
  paymentId: string;
  planId: BoostPlanId;
  amount: number;
  currency: string;
  status: PaymentStatus;
  provider: string;
  instruction?: string;
  checkoutUrl?: string;
}

/**
 * Validate the plan on the server (never trust client-supplied price/duration),
 * persist an idempotent payment record, and initiate the provider payment.
 */
export async function createPaymentIntent(
  userId: string,
  planId: string,
  phoneNumber?: string
): Promise<PaymentIntentResult> {
  const plan = assertBoostPlan(planId); // throws on invalid plan
  const paymentProvider = getPaymentProvider();

  let intent;
  try {
    intent = await paymentProvider.initiatePayment({
      userId,
      planId: plan.id,
      amount: plan.price,
      currency: plan.currency,
      phoneNumber,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Payment initiation failed';
    throw new Error(message);
  }

  const db = getAdminDb();
  const paymentRef = db.collection('boost_payments').doc(intent.paymentId);
  await paymentRef.set(
    {
      userId,
      planId: plan.id,
      durationDays: plan.durationDays,
      price: plan.price,
      currency: plan.currency,
      status: 'pending',
      provider: intent.provider,
      amount: intent.amount,
      phone: phoneNumber || null,
      createdAt: Timestamp.now(),
    },
    { merge: true }
  );

  return {
    paymentId: intent.paymentId,
    planId: plan.id,
    amount: plan.price,
    currency: plan.currency,
    status: intent.status,
    provider: intent.provider,
    instruction: intent.instruction,
    checkoutUrl: intent.checkoutUrl,
  };
}

/**
 * Verify a payment with the provider and, on success, activate the boost.
 * Idempotent: a successful payment can only activate a boost once.
 */
export async function verifyAndActivate(userId: string, paymentId: string): Promise<{
  activated: boolean;
   status: PaymentStatus | BoostStatus;
  planId: BoostPlanId | null;
  startedAt: Timestamp | null;
  expiresAt: Timestamp | null;
}> {
  const db = getAdminDb();
  const paymentSnap = await db.collection('boost_payments').doc(paymentId).get();
  if (!paymentSnap.exists) {
    throw new Error('Payment record not found.');
  }
  const payment = paymentSnap.data() as {
    userId: string;
    planId: BoostPlanId;
    durationDays: number;
    price: number;
    currency: string;
    status: PaymentStatus;
    provider: string;
  };

  if (payment.userId !== userId) {
    throw new Error('Payment does not belong to the authenticated user.');
  }

  const paymentProvider = getPaymentProvider();
  const providerStatus = await paymentProvider.verifyPayment(paymentId);

  if (providerStatus !== 'succeeded') {
    await paymentSnap.ref.update({ status: providerStatus });
    return { activated: false, status: providerStatus, planId: null, startedAt: null, expiresAt: null };
  }

  // Idempotency: a deterministic boost id keys the write so re-activation is safe.
  const boostId = `boost_${userId}_${paymentId}`;
  const boostRef = db.collection('boosts').doc(boostId);
  const existing = await boostRef.get();
  if (existing.exists && (existing.data() as { status: BoostStatus }).status === 'active') {
    return {
      activated: false,
      status: 'active',
      planId: payment.planId,
      startedAt: existing.data()?.startedAt ?? null,
      expiresAt: existing.data()?.expiresAt ?? null,
    };
  }

  const now = Timestamp.now();
  const expiresAt = Timestamp.fromMillis(now.toMillis() + payment.durationDays * 24 * 60 * 60 * 1000);
  const status: BoostStatus = 'active';

  const boostRecord = {
    userId,
    planId: payment.planId,
    durationDays: payment.durationDays,
    price: payment.price,
    currency: payment.currency,
    startedAt: now,
    expiresAt,
    status,
    paymentId,
    createdAt: now,
  };

  await boostRef.set(boostRecord, { merge: true });
  await paymentSnap.ref.update({ status: 'succeeded' });

  // Source of truth on the private user doc...
  const updateUser: Record<string, unknown> = {
    boostActive: true,
    boostPlan: payment.planId,
    boostStartedAt: now,
    boostExpiresAt: expiresAt,
  };
  await db.collection('users').doc(userId).set(updateUser, { merge: true });

  // ...denormalized onto the public profile for discovery ranking & UI reads.
  await db.collection('profiles').doc(userId).set(updateUser, { merge: true });

  return { activated: true, status, planId: payment.planId, startedAt: now, expiresAt };
}

export { BOOST_CURRENCY };
