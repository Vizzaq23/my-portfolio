const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Quintin Vizza",
  jobTitle: "Computer Engineering Student",
  url: "https://github.com/Vizzaq23",
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
