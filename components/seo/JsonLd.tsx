export default function JsonLd({ baseUrl }: { baseUrl: string }) {
  const personId = `${baseUrl}/#person`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": personId,
      name: "Andy Lyek",
      jobTitle: "Software Engineer",
      email: "andy@lyek.me",
      url: baseUrl,
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Stanford University",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Andy Lyek",
      url: baseUrl,
      description:
        "Software engineer and EECS student at Stanford University. I build web, mobile, and backend systems.",
      inLanguage: "en",
      publisher: { "@id": personId },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
