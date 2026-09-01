import type { MetadataRoute } from 'next';

const PRIVATE_PATHS = [
  '/api/',
  '/admin/',
  '/discover/',
  '/likes/',
  '/matches/',
  '/messages/',
  '/onboarding/',
  '/profile/',
  '/settings/',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
    ],
    sitemap: 'https://jambodate.xyz/sitemap.xml',
  };
}
