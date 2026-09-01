import type { BoostPlanId } from '@/types';

export type { BoostPlanId };

export interface BoostPlan {
  id: BoostPlanId;
  name: string;
  durationDays: number;
  price: number;
  currency: string;
  description: string;
  recommended?: boolean;
}
