import type { Metadata } from 'next';
import ProfilePage from './page';

export const metadata: Metadata = {
  title: 'My Profile | JamboDate Kenya',
  description: 'Manage your JamboDate profile. View your verification status, profile completion, and boost visibility to attract more Kenyan singles.',
  alternates: { canonical: 'https://jambodate.co.ke/profile' },
  openGraph: {
    title: 'My Profile | JamboDate Kenya',
    description: 'Manage your JamboDate profile. View your verification status, profile completion, and boost visibility to attract more Kenyan singles.',
    url: 'https://jambodate.co.ke/profile',
    type: 'website',
  },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
