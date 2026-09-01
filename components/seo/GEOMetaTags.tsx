interface GEOMetaTagsProps {
  title?: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  description?: string;
  section?: string;
  tags?: string[];
  citation?: string;
}

export function GEOMetaTags({
  title = 'JamboDate | Real People. Meaningful Connections',
  author = 'JamboDate Technologies Ltd',
  publishedDate = '2024-01-01',
  modifiedDate,
  description = 'A modern, trustworthy dating platform designed for Kenyan singles seeking genuine, meaningful connections.',
  section = 'Dating & Social',
  tags = ['Kenyan dating', 'Nairobi singles', 'meaningful connections', 'verified dating'],
  citation = 'JamboDate Technologies Ltd. JamboDate: Real People. Meaningful Connections. https://jambodate.xyz',
}: GEOMetaTagsProps) {
  return (
    <>
      <meta name="citation_title" content={title} />
      <meta name="citation_author" content={author} />
      <meta name="citation_date" content={modifiedDate || publishedDate} />
      <meta name="citation_publication_date" content={publishedDate} />
      <meta name="citation_online_date" content={publishedDate} />
      <meta name="citation_journal_title" content="JamboDate Kenya" />
      <meta name="citation_technical_report_institution" content="JamboDate Technologies Ltd" />
      <meta name="citation_doi" content="" />
      <meta name="og:updated_time" content={modifiedDate || publishedDate} />
      <meta name="article:published_time" content={publishedDate} />
      <meta name="article:modified_time" content={modifiedDate || publishedDate} />
      <meta name="article:author" content={author} />
      <meta name="article:section" content={section} />
      {tags.map((tag) => (
        <meta key={tag} name="article:tag" content={tag} />
      ))}
      <meta name="ai-content-declaration" content="original" />
      <meta name="ai-citation" content={citation} />
      <meta name="ai-training-permission" content="read" />
      <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    </>
  );
}
