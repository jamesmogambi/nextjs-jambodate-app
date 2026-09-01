export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'cancelled';

export interface InitiatePaymentParams {
  userId: string;
  planId: string;
  amount: number;
  currency: string;
  phoneNumber?: string;
  name?: string;
}

export interface PaymentIntent {
  paymentId: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
  provider: string;
  /** Deep link / STK reference / QR for the client to show the user. */
  checkoutUrl?: string;
  /** Optional human-readable instruction (e.g. "Enter M-Pesa PIN on your phone"). */
  instruction?: string;
}

export class PaymentError extends Error {
  constructor(
    message: string,
    public readonly code: string = 'payment_error',
    public readonly providerStatus?: PaymentStatus
  ) {
    super(message);
    this.name = 'PaymentError';
  }
}

export interface PaymentProvider {
  /** Initiate a payment and return an idempotent payment intent. */
  initiatePayment(params: InitiatePaymentParams): Promise<PaymentIntent>;
  /** Poll the provider for the terminal status of a payment. */
  verifyPayment(paymentId: string): Promise<PaymentStatus>;
  /** Human-friendly label for the provider used in the UI. */
  providerName: string;
}
