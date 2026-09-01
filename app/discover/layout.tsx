import type { Metadata } from 'next';
import DiscoverPage from './page';

export const metadata: Metadata = {
  title: 'Discover Kenyan Singles | JamboDate Kenya',
  description: 'Browse verified Kenyan singles in Nairobi, Mombasa, Kisumu, and beyond. Filter by relationship intention and county to find meaningful connections.',
  alternates: { canonical: 'https://jambodate.xyz/discover' },
  openGraph: {
    title: 'Discover Kenyan Singles | JamboDate Kenya',
    description: 'Browse verified Kenyan singles in Nairobi, Mombasa, Kisumu, and beyond. Filter by relationship intention and county to find meaningful connections.',
    url: 'https://jambodate.xyz/discover',
    type: 'website',
  },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
