import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Quintin Vizza",
  jobTitle: "Software Engineer",
  ...(siteUrl ? { url: siteUrl } : {}),
  sameAs: [
    "https://www.linkedin.com/in/quintin-vizza/",
    "https://github.com/Vizzaq23",
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}
