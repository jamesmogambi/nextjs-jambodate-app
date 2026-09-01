const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'JamboDate',
  alternateName: 'JamboDate Kenya',
  url: 'https://jambodate.xyz',
  description: 'A modern, trustworthy dating platform designed for Kenyan singles seeking genuine, meaningful connections.',
  inLanguage: 'en-KE',
  publisher: {
    '@type': 'Organization',
    name: 'JamboDate Technologies Ltd',
    url: 'https://jambodate.xyz',
    logo: 'https://jambodate.xyz/favicon.svg',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://jambodate.xyz/discover?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://jambodate.xyz/#organization',
  name: 'JamboDate Technologies Ltd',
  alternateName: 'JamboDate',
  url: 'https://jambodate.xyz',
  logo: {
    '@type': 'ImageObject',
    url: 'https://jambodate.xyz/favicon.svg',
    width: 48,
    height: 48,
  },
  description: 'A modern, trustworthy dating platform designed for Kenyan singles seeking genuine, meaningful connections.',
  foundingDate: '2024',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Kenya',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    areaServed: 'KE',
    availableLanguage: ['English'],
  },
};

export function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
    </>
  );
}
