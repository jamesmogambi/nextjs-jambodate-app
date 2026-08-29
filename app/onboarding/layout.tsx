import type { Metadata } from 'next';
import OnboardingPage from './page';

export const metadata: Metadata = {
  title: 'Complete Your Profile | JamboDate Kenya',
  description: 'Finish setting up your JamboDate profile in 7 steps. Add photos, bio, and preferences to start meeting genuine Kenyan singles.',
  alternates: { canonical: 'https://jambodate.co.ke/onboarding' },
  openGraph: {
    title: 'Complete Your Profile | JamboDate Kenya',
    description: 'Finish setting up your JamboDate profile in 7 steps. Add photos, bio, and preferences to start meeting genuine Kenyan singles.',
    url: 'https://jambodate.co.ke/onboarding',
    type: 'website',
  },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
