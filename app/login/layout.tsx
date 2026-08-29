import type { Metadata } from 'next';
import LoginPage from './page';

export const metadata: Metadata = {
  title: 'Sign In | JamboDate Kenya',
  description: 'Sign in to your JamboDate account to connect with genuine Kenyan singles. Secure login for verified dating profiles.',
  alternates: { canonical: 'https://jambodate.xyz/login' },
  openGraph: {
    title: 'Sign In | JamboDate Kenya',
    description: 'Sign in to your JamboDate account to connect with genuine Kenyan singles. Secure login for verified dating profiles.',
    url: 'https://jambodate.xyz/login',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
