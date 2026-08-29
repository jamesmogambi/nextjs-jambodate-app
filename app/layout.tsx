import type { Metadata } from 'next';
import './globals.css';
import { ClientProviders } from '@/components/providers/ClientProviders';

export const metadata: Metadata = {
  title: 'JamboDate | Real People. Meaningful Connections',
  description: 'A modern, trustworthy dating platform designed for Kenyan singles seeking genuine, meaningful connections.',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'JamboDate | Real People. Meaningful Connections',
    description: 'A modern, trustworthy dating platform designed for Kenyan singles seeking genuine, meaningful connections.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0D1110] text-[#F5F3EF] min-h-screen antialiased selection:bg-[#D85B7A]/30 selection:text-white">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
