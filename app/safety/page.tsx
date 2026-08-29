import type { Metadata } from 'next';
import SafetyCenterPage from './SafetyCenterPage';

export const metadata: Metadata = {
  title: 'Safety Center & Kenyan Dating Guidelines',
  description: 'Essential safety guidelines for dating in Kenya. Learn about JamboDate verification, emergency hotlines, and how to stay safe while meeting new people.',
  alternates: {
    canonical: 'https://jambodate.co.ke/safety',
  },
  openGraph: {
    title: 'JamboDate Safety Center | Kenyan Dating Guidelines',
    description: 'Essential safety guidelines for dating in Kenya. Learn about JamboDate verification, emergency hotlines, and how to stay safe while meeting new people.',
    url: 'https://jambodate.co.ke/safety',
    type: 'article',
  },
};

export default function Page() {
  return <SafetyCenterPage />;
}
