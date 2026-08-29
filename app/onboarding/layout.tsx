import type { Metadata } from 'next';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DEFAULT_APP_ROUTE } from '@/lib/auth/routes';

export const metadata: Metadata = {
  title: 'Complete Your Profile | JamboDate Kenya',
  description: 'Finish setting up your JamboDate profile in 7 steps. Add photos, bio, and preferences to start meeting genuine Kenyan singles.',
  alternates: { canonical: 'https://jambodate.xyz/onboarding' },
  openGraph: {
    title: 'Complete Your Profile | JamboDate Kenya',
    description: 'Finish setting up your JamboDate profile in 7 steps. Add photos, bio, and preferences to start meeting genuine Kenyan singles.',
    url: 'https://jambodate.xyz/onboarding',
    type: 'website',
  },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute completedRedirect={DEFAULT_APP_ROUTE}>
      {children}
    </ProtectedRoute>
  );
}
