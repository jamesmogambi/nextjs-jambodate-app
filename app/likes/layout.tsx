import type { Metadata } from 'next';
import LikesPage from './page';

export const metadata: Metadata = {
  title: 'Likes & Admirers | JamboDate Kenya',
  description: 'See who liked your profile on JamboDate. Connect with singles who expressed interest and start meaningful conversations.',
  alternates: { canonical: 'https://jambodate.co.ke/likes' },
  openGraph: {
    title: 'Likes & Admirers | JamboDate Kenya',
    description: 'See who liked your profile on JamboDate. Connect with singles who expressed interest and start meaningful conversations.',
    url: 'https://jambodate.co.ke/likes',
    type: 'website',
  },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
