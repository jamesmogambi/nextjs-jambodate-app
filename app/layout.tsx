import type { Metadata } from 'next';
import './globals.css';
import { ClientProviders } from '@/components/providers/ClientProviders';
import { StructuredData } from '@/components/seo/StructuredData';
import { GEOMetaTags } from '@/components/seo/GEOMetaTags';

export const metadata: Metadata = {
  metadataBase: new URL('https://jambodate.co.ke'),
  title: {
    default: 'JamboDate | Real People. Meaningful Connections',
    template: '%s | JamboDate Kenya',
  },
  description: 'A modern, trustworthy dating platform designed for Kenyan singles seeking genuine, meaningful connections. Verified profiles, intentional matching, and safety-first design.',
  keywords: [
    'Kenyan dating app',
    'Kenya dating site',
    'Nairobi singles',
    'Mombasa dating',
    'Kenyan matchmaking',
    'serious relationships Kenya',
    'marriage-minded dating Kenya',
    'verified dating Kenya',
    'JamboDate',
    'African dating app',
    'Kenyan singles',
    'meaningful connections',
    'dating in Nairobi',
    'Kenya marriage',
    'authentic dating Kenya',
  ],
  authors: [{ name: 'JamboDate Technologies Ltd' }],
  creator: 'JamboDate Technologies Ltd',
  publisher: 'JamboDate Technologies Ltd',
  applicationName: 'JamboDate',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  alternates: {
    canonical: 'https://jambodate.co.ke',
    languages: {
      'en-KE': 'https://jambodate.co.ke',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://jambodate.co.ke',
    siteName: 'JamboDate',
    title: 'JamboDate | Real People. Meaningful Connections',
    description: 'A modern, trustworthy dating platform designed for Kenyan singles seeking genuine, meaningful connections. Verified profiles, intentional matching, and safety-first design.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@jambodate',
    creator: '@jambodate',
    title: 'JamboDate | Real People. Meaningful Connections',
    description: 'A modern, trustworthy dating platform designed for Kenyan singles seeking genuine, meaningful connections.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'dating',
  classification: 'Dating & Social',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'JamboDate',
    statusBarStyle: 'black-translucent',
  },
  other: {
    'theme-color': '#0D1110',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <StructuredData />
        <GEOMetaTags />
      </head>
      <body className="bg-[#0D1110] text-[#F5F3EF] min-h-screen antialiased selection:bg-[#D85B7A]/30 selection:text-white">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
