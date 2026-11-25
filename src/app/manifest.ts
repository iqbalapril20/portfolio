import type { MetadataRoute } from 'next';
import { portfolioData } from '@/data/portfolio';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: portfolioData.settings.siteTitle,
    short_name: portfolioData.profile.brandMark,
    description: portfolioData.settings.siteDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#fafbfc',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
