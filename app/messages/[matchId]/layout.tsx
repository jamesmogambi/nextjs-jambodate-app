import type { Metadata } from 'next';
import ChatRoomPage from './page';

export const metadata: Metadata = {
  title: 'Chat | JamboDate Kenya',
  description: 'Private conversation on JamboDate. Message your verified match safely and thoughtfully.',
  alternates: { canonical: 'https://jambodate.co.ke/messages' },
  openGraph: {
    title: 'Chat | JamboDate Kenya',
    description: 'Private conversation on JamboDate. Message your verified match safely and thoughtfully.',
    url: 'https://jambodate.co.ke/messages',
    type: 'website',
  },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
