import type { Metadata } from 'next';
import ChatRoomPage from './page';

export const metadata: Metadata = {
  title: 'Chat | JamboDate Kenya',
  description: 'Private conversation on JamboDate. Message your verified match safely and thoughtfully.',
  alternates: { canonical: 'https://jambodate.xyz/messages' },
  openGraph: {
    title: 'Chat | JamboDate Kenya',
    description: 'Private conversation on JamboDate. Message your verified match safely and thoughtfully.',
    url: 'https://jambodate.xyz/messages',
    type: 'website',
  },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
