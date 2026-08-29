import type { Metadata } from 'next';
import SettingsPage from './page';

export const metadata: Metadata = {
  title: 'Settings & Preferences | JamboDate Kenya',
  description: 'Manage your JamboDate account settings, discovery preferences, privacy controls, and notification alerts.',
  alternates: { canonical: 'https://jambodate.xyz/settings' },
  openGraph: {
    title: 'Settings & Preferences | JamboDate Kenya',
    description: 'Manage your JamboDate account settings, discovery preferences, privacy controls, and notification alerts.',
    url: 'https://jambodate.xyz/settings',
    type: 'website',
  },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
