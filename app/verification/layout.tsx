import type { Metadata } from 'next';
import VerificationPage from './page';

export const metadata: Metadata = {
  title: 'Identity Verification | JamboDate Kenya',
  description: 'Get verified on JamboDate with a selfie and Kenyan ID. Build trust with the green verification badge and get 3x more meaningful connections.',
  alternates: { canonical: 'https://jambodate.co.ke/verification' },
  openGraph: {
    title: 'Identity Verification | JamboDate Kenya',
    description: 'Get verified on JamboDate with a selfie and Kenyan ID. Build trust with the green verification badge and get 3x more meaningful connections.',
    url: 'https://jambodate.co.ke/verification',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
