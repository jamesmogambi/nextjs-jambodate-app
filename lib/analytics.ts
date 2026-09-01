/**
 * Minimal analytics/event tracking abstraction.
 *
 * In development, events are logged to the console. In production, wire a real
 * backend (GA4 Measurement Protocol, PostHog, Mixpanel, etc.) in `trackEvent`.
 *
 * TODO: integrate a production analytics sink.
 */
export type AnalyticsProperties = Record<string, unknown>;

export type AnalyticsEvent =
  | 'boost_viewed'
  | 'boost_plan_selected'
  | 'boost_payment_started'
  | 'boost_payment_success'
  | 'boost_payment_failed'
  | 'boost_activated'
  | 'boost_expired';

export function trackEvent(name: AnalyticsEvent, properties: AnalyticsProperties = {}): void {
  if (typeof window === 'undefined') return;
  const event = { name, properties, ts: new Date().toISOString() };
  // eslint-disable-next-line no-console
  console.debug('[analytics]', event);
  // TODO: forward to production analytics provider here.
}
