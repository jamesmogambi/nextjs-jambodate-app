import type { Metadata } from 'next';
import RegisterPage from './page';

export const metadata: Metadata = {
  title: 'Create Free Profile | JamboDate Kenya',
  description: 'Join JamboDate and create your free dating profile. Meet genuine Kenyan singles seeking meaningful connections. Verified profiles, intentional matching.',
  alternates: { canonical: 'https://jambodate.xyz/register' },
  openGraph: {
    title: 'Create Free Profile | JamboDate Kenya',
    description: 'Join JamboDate and create your free dating profile. Meet genuine Kenyan singles seeking meaningful connections. Verified profiles, intentional matching.',
    url: 'https://jambodate.xyz/register',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
