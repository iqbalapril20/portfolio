import { PortfolioApp } from '@/components/PortfolioApp';
import { portfolioData } from '@/data/portfolio';
import { getSiteUrl } from '@/lib/site';

export default function HomePage() {
  const siteUrl = getSiteUrl();
  const sameAs = [
    portfolioData.contact.githubUrl,
    portfolioData.contact.linkedinUrl,
    portfolioData.contact.instagramUrl,
  ].filter((value): value is string => Boolean(value));

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: portfolioData.profile.fullName,
        alternateName: ['Iqbal Aprilianto', portfolioData.profile.brandMark],
        jobTitle: portfolioData.profile.heroRoles[0],
        description: portfolioData.profile.shortBio,
        url: siteUrl,
        image: `${siteUrl}${portfolioData.profile.heroImageUrl ?? portfolioData.profile.profileImageUrl}`,
        email: `mailto:${portfolioData.contact.email}`,
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'ID',
          addressRegion: 'Jawa Timur',
        },
        alumniOf: portfolioData.educations.map((edu) => ({
          '@type': 'EducationalOrganization',
          name: edu.institution,
        })),
        knowsAbout: portfolioData.techStacks.map((tech) => tech.name),
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: portfolioData.settings.siteTitle,
        description: portfolioData.settings.siteDescription,
        inLanguage: ['id-ID', 'en-US'],
        author: {
          '@id': `${siteUrl}/#person`,
        },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/#profilepage`,
        url: siteUrl,
        name: portfolioData.settings.siteTitle,
        description: portfolioData.settings.siteDescription,
        mainEntity: {
          '@id': `${siteUrl}/#person`,
        },
        isPartOf: {
          '@id': `${siteUrl}/#website`,
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${siteUrl}/#projects`,
        name: `Portfolio Proyek ${portfolioData.profile.fullName}`,
        numberOfItems: portfolioData.projects.length,
        itemListElement: portfolioData.projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'CreativeWork',
            name: project.title,
            description: project.shortDescription,
            keywords: project.techStacks.map((tech) => tech.name).join(', '),
            creator: {
              '@id': `${siteUrl}/#person`,
            },
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PortfolioApp data={portfolioData} />
    </>
  );
}
