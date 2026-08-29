import type { BoostPlan, BoostPlanId } from './types';

export const BOOST_CURRENCY = 'KES';

/**
 * Authoritative, server-owned Boost plan catalogue.
 * Prices and durations are defined here ONLY — never trusted from the client.
 */
export const BOOST_PLANS: BoostPlan[] = [
  {
    id: '1_day',
    name: '1 Day',
    durationDays: 1,
    price: 100,
    currency: BOOST_CURRENCY,
    description: 'A single-day spike in visibility — ideal for high-traffic evenings.',
    recommended: false,
  },
  {
    id: '1_week',
    name: '1 Week',
    durationDays: 7,
    price: 500,
    currency: BOOST_CURRENCY,
    description: 'Our most popular plan — consistent top placement all week.',
    recommended: true,
  },
  {
    id: '1_month',
    name: '1 Month',
    durationDays: 30,
    price: 1500,
    currency: BOOST_CURRENCY,
    description: 'Maximum exposure with priority placement for a full month.',
    recommended: false,
  },
];

export const RECOMMENDED_BOOST_PLAN_ID: BoostPlanId = '1_week';

export const BOOST_PLAN_MAP: Record<BoostPlanId, BoostPlan> = BOOST_PLANS.reduce(
  (acc, plan) => {
    acc[plan.id] = plan;
    return acc;
  },
  {} as Record<BoostPlanId, BoostPlan>
);

export const BOOST_BONUS_DISCOVERY = 25;

export function getBoostPlan(id: string): BoostPlan | undefined {
  return BOOST_PLAN_MAP[id as BoostPlanId];
}

export function assertBoostPlan(id: string): BoostPlan {
  const plan = getBoostPlan(id);
  if (!plan) {
    throw new Error(`Invalid boost plan id: ${id}`);
  }
  return plan;
}
