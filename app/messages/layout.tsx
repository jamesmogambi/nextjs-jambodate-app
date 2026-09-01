import type { Metadata } from 'next';
import MessagesInboxPage from './page';

export const metadata: Metadata = {
  title: 'Conversations | JamboDate Kenya',
  description: 'Your private message inbox on JamboDate. Chat safely with verified mutual matches and build genuine connections.',
  alternates: { canonical: 'https://jambodate.xyz/messages' },
  openGraph: {
    title: 'Conversations | JamboDate Kenya',
    description: 'Your private message inbox on JamboDate. Chat safely with verified mutual matches and build genuine connections.',
    url: 'https://jambodate.xyz/messages',
    type: 'website',
  },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
