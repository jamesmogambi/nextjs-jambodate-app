const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'JamboDate',
  alternateName: 'JamboDate Kenya',
  url: 'https://jambodate.co.ke',
  description: 'A modern, trustworthy dating platform designed for Kenyan singles seeking genuine, meaningful connections.',
  inLanguage: 'en-KE',
  publisher: {
    '@type': 'Organization',
    name: 'JamboDate Technologies Ltd',
    url: 'https://jambodate.co.ke',
    logo: 'https://jambodate.co.ke/favicon.svg',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://jambodate.co.ke/discover?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://jambodate.co.ke/#organization',
  name: 'JamboDate Technologies Ltd',
  alternateName: 'JamboDate',
  url: 'https://jambodate.co.ke',
  logo: {
    '@type': 'ImageObject',
    url: 'https://jambodate.co.ke/favicon.svg',
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
