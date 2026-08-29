'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { DEFAULT_APP_ROUTE } from '@/lib/auth/routes';

interface GuestRouteProps {
  children: React.ReactNode;
  /** Where to send an already-authenticated user (defaults to the app home). */
  destination?: string;
}

/**
 * Guards a public "guest-only" route (e.g. /login, /register).
 *
 * Authenticated users are redirected to `destination` so they do not see the
 * sign-in/sign-up forms. The check is driven by a real Firebase session
 * (`firebaseUser`) rather than the demo session: JamboDate's demo/preview mode
 * is always present as a `currentUser` without a Firebase token, so gating on
 * `currentUser` would wrongly bounce demo users (and fresh visitors) away from
 * the authentication pages and make it impossible to sign in with a real
 * account. A genuine Firebase session is the authoritative "logged in" signal
 * for public auth pages.
 */
export function GuestRoute({ children, destination = DEFAULT_APP_ROUTE }: GuestRouteProps) {
  const router = useRouter();
  const { firebaseUser, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (firebaseUser) {
      router.replace(destination);
    }
  }, [firebaseUser, isLoading, router, destination]);

  // Render the auth form immediately (auth pages should not block on init),
  // then redirect once we know a real session exists.
  if (isLoading || !firebaseUser) {
    return <>{children}</>;
  }

  return null;
}
