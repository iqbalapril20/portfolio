import { PortfolioApp } from '@/components/PortfolioApp';
import { portfolioData } from '@/data/portfolio';

export default function HomePage() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: portfolioData.profile.fullName,
    jobTitle: portfolioData.profile.heroRoles[0],
    description: portfolioData.profile.shortBio,
    email: `mailto:${portfolioData.contact.email}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <PortfolioApp data={portfolioData} />
    </>
  );
}
