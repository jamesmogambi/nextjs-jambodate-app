import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/discover/',
          '/likes/',
          '/matches/',
          '/messages/',
          '/onboarding/',
          '/profile/',
          '/settings/',
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/discover/',
          '/likes/',
          '/matches/',
          '/messages/',
          '/onboarding/',
          '/profile/',
          '/settings/',
        ],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/discover/',
          '/likes/',
          '/matches/',
          '/messages/',
          '/onboarding/',
          '/profile/',
          '/settings/',
        ],
      },
    ],
    sitemap: 'https://jambodate.xyz/sitemap.xml',
    host: 'https://jambodate.xyz',
  };
}
