/**
 * JamboDate route protection policy.
 *
 * This is the single source of truth for which routes are publicly
 * accessible (no authenticated session required) and which require an
 * authenticated session. Everything not listed in {@link PUBLIC_ROUTES} is
 * treated as authenticated-only.
 *
 * Public routes are intended for the landing page and the authentication
 * entry points (sign in / sign up). All other routes — discovery, matches,
 * messaging, profile, settings, onboarding, verification, premium and the
 * admin dashboard — are private and are guarded by `<ProtectedRoute>` (see
 * `components/auth/ProtectedRoute.tsx`) via the `AppShell` chrome.
 *
 * NOTE: This manifest is client-compatible but intentionally framework
 * agnostic so it can be consumed by a future Next.js middleware once the
 * app moves to server-side sessions (Firebase session cookies). Today,
 * JamboDate runs in dual-mode (real Firebase Auth sessions *and* a
 * localStorage-backed demo session that has no server token), therefore
 * enforcement lives in client-side route guards integrated with
 * `AuthContext`, which can evaluate both session kinds.
 */

export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const DEFAULT_APP_ROUTE = '/discover';

export const PUBLIC_ROUTES: readonly string[] = [
  '/',
  LOGIN_ROUTE,
  REGISTER_ROUTE,
];

export const AUTHENTICATED_ONLY_ROUTES: readonly string[] = [
  '/discover',
  '/matches',
  '/likes',
  '/messages',
  '/profile',
  '/profile/edit',
  '/settings',
  '/safety',
  '/onboarding',
  '/verification',
  '/premium',
  '/admin',
];

/**
 * Returns `true` when `pathname` is a public route (no session required).
 * Sub-paths of a public route (e.g. `/login?redirect=/`) are also public.
 */
export function isPublicRoute(pathname: string | undefined): boolean {
  if (!pathname) return false;
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/'),
  );
}

/**
 * Returns `true` when `pathname` requires an authenticated session.
 */
export function requiresAuth(pathname: string | undefined): boolean {
  return !isPublicRoute(pathname);
}
