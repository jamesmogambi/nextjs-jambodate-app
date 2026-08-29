import type { BoostPlan, BoostPlanId } from './types';
import { BOOST_BONUS_DISCOVERY } from './config';

export type TimestampLike = string | number | Date | { seconds: number; nanoseconds?: number } | { toDate: () => Date };

export function toDate(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === 'string' || typeof value === 'number') {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  if (typeof value === 'object') {
    const v = value as {
      seconds?: number;
      nanoseconds?: number;
      toDate?: () => Date;
      _seconds?: number;
      _nanoseconds?: number;
    };
    if (typeof v.toDate === 'function') {
      try {
        return v.toDate();
      } catch {
        /* fall through */
      }
    }
    const seconds = v.seconds ?? v._seconds;
    const nanoseconds = v.nanoseconds ?? v._nanoseconds ?? 0;
    if (typeof seconds === 'number') {
      return new Date(seconds * 1000 + nanoseconds / 1e6);
    }
  }
  return null;
}

export interface BoostStatusView {
  active: boolean;
  status: 'active' | 'expired' | 'failed' | 'pending';
  planId: BoostPlanId | null;
  startedAt: Date | null;
  expiresAt: Date | null;
  remainingMs: number;
}

export function getBoostStatus(
  boostActive: boolean | null | undefined,
  boostPlan: BoostPlanId | null | undefined,
  boostStartedAt: TimestampLike | null | undefined,
  boostExpiresAt: TimestampLike | null | undefined
): BoostStatusView {
  const expiresAt = toDate(boostExpiresAt);
  const startedAt = toDate(boostStartedAt) ?? expiresAt ?? null;
  // Always derive active state from the expiration timestamp — never trust a client-side timer.
  const isExpired = expiresAt ? Date.now() >= expiresAt.getTime() : false;
  const active = Boolean(boostActive) && !isExpired;

  return {
    active,
    status: active ? 'active' : isExpired ? 'expired' : 'pending',
    planId: boostPlan ?? null,
    startedAt,
    expiresAt,
    remainingMs: isExpired || !expiresAt ? 0 : expiresAt.getTime() - Date.now(),
  };
}

export function isBoostActive(
  boostActive: boolean | null | undefined,
  boostExpiresAt: TimestampLike | null | undefined
): boolean {
  return getBoostStatus(boostActive, undefined, undefined, boostExpiresAt).active;
}

export function computeDiscoveryScore(
  profile: { compatibility?: number | null; boostActive?: boolean | null; boostExpiresAt?: TimestampLike | null },
  boostBonus = BOOST_BONUS_DISCOVERY
): number {
  const base = typeof profile.compatibility === 'number' ? profile.compatibility : 0;
  return base + (isBoostActive(profile.boostActive, profile.boostExpiresAt) ? boostBonus : 0);
}
