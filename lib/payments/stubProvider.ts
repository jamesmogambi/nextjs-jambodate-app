/**
 * ⚠️ DEVELOPMENT / STUB PAYMENT PROVIDER — DO NOT USE IN PRODUCTION.
 *
 * Simulates an M-Pesa STK-push style flow for local development and demos only.
 * It is gated behind the `ENABLE_STUB_PAYMENTS=true` environment variable so it
 * can NEVER fake a successful payment in production.
 *
 * TODO: Replace with a real provider (Safaricom Daraja / Stripe / Flutterwave).
 * Implement the `PaymentProvider` interface and register it in `lib/payments/index.ts`.
 */
import type { PaymentProvider, PaymentIntent, PaymentStatus, InitiatePaymentParams } from './types';
import { PaymentError } from './types';

const STUB_DELAY_MS = Number(process.env.STUB_PAYMENT_DELAY_MS || 3000);

interface StubRecord {
  userId: string;
  planId: string;
  amount: number;
  currency: string;
  createdAt: number;
  phone?: string;
}

const registry = new Map<string, StubRecord>();

export class StubPaymentProvider implements PaymentProvider {
  providerName = 'M-Pesa (Stub)';

  private ensureEnabled(): void {
    if (process.env.ENABLE_STUB_PAYMENTS !== 'true') {
      throw new PaymentError(
        'Stub payments are disabled. Set ENABLE_STUB_PAYMENTS=true to use the dev stub provider, or configure a real payment provider.',
        'stub_disabled',
        'failed'
      );
    }
  }

  async initiatePayment(params: InitiatePaymentParams): Promise<PaymentIntent> {
    this.ensureEnabled();
    const paymentId = `stub_${params.userId}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    registry.set(paymentId, {
      userId: params.userId,
      planId: params.planId,
      amount: params.amount,
      currency: params.currency,
      createdAt: Date.now(),
      phone: params.phoneNumber,
    });
    return {
      paymentId,
      status: 'pending',
      amount: params.amount,
      currency: params.currency,
      provider: this.providerName,
      instruction: 'STK push simulated — enter your PIN when prompted (dev stub).',
    };
  }

  async verifyPayment(paymentId: string): Promise<PaymentStatus> {
    this.ensureEnabled();
    const record = registry.get(paymentId);
    if (!record) {
      throw new PaymentError(`Payment not found: ${paymentId}`, 'payment_not_found', 'failed');
    }
    if (Date.now() - record.createdAt >= STUB_DELAY_MS) {
      return 'succeeded';
    }
    return 'pending';
  }
}
