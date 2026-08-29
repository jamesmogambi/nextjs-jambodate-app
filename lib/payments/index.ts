import type { PaymentProvider } from './types';
import { StubPaymentProvider } from './stubProvider';

let provider: PaymentProvider | null = null;

/**
 * Returns the active payment provider.
 *
 * In production, read the provider from env configuration and instantiate the
 * real integration here (e.g. Safaricom Daraja or Stripe). For local dev the
 * stub provider is used when `ENABLE_STUB_PAYMENTS=true`.
 *
 * TODO: add provider selection from env and integrate a real M-Pesa / card provider.
 */
export function getPaymentProvider(): PaymentProvider {
  if (provider) return provider;
  provider = new StubPaymentProvider();
  return provider;
}
