import type { Metadata } from 'next';
import PremiumPage from './page';

export const metadata: Metadata = {
  title: 'Boost Your Profile | JamboDate Kenya',
  description: 'Get priority placement in Discovery with JamboDate Premium. Boost your profile starting at KSh 100 and get seen by more Kenyan singles.',
  alternates: { canonical: 'https://jambodate.xyz/premium' },
  openGraph: {
    title: 'Boost Your Profile | JamboDate Kenya',
    description: 'Get priority placement in Discovery with JamboDate Premium. Boost your profile starting at KSh 100 and get seen by more Kenyan singles.',
    url: 'https://jambodate.xyz/premium',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
