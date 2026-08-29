import type { Metadata } from 'next';
import EditProfilePage from './page';

export const metadata: Metadata = {
  title: 'Edit Profile | JamboDate Kenya',
  description: 'Update your JamboDate profile photos, bio, location, and preferences. Keep your profile fresh to attract more meaningful connections.',
  alternates: { canonical: 'https://jambodate.co.ke/profile/edit' },
  openGraph: {
    title: 'Edit Profile | JamboDate Kenya',
    description: 'Update your JamboDate profile photos, bio, location, and preferences. Keep your profile fresh to attract more meaningful connections.',
    url: 'https://jambodate.co.ke/profile/edit',
    type: 'website',
  },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
