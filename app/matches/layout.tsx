import type { Metadata } from 'next';
import MatchesPage from './page';

export const metadata: Metadata = {
  title: 'Your Matches | JamboDate Kenya',
  description: 'View your mutual matches on JamboDate. Singles who liked you back and share your relationship intentions for meaningful connections.',
  alternates: { canonical: 'https://jambodate.co.ke/matches' },
  openGraph: {
    title: 'Your Matches | JamboDate Kenya',
    description: 'View your mutual matches on JamboDate. Singles who liked you back and share your relationship intentions for meaningful connections.',
    url: 'https://jambodate.co.ke/matches',
    type: 'website',
  },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
