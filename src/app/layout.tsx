import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { League_Spartan, Montserrat, Space_Grotesk } from 'next/font/google';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { portfolioData } from '@/data/portfolio';
import { getSiteUrl } from '@/lib/site';
import './globals.css';

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  variable: '--font-league-spartan',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const siteUrl = getSiteUrl();
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

const expandedKeywords = Array.from(
  new Set([
    ...portfolioData.settings.siteKeywords,
    'Iqbal Aprilianto',
    'Portfolio Iqbal',
    'Full-Stack Web Developer Indonesia',
    'Web Developer Jombang',
    'Laravel Developer Indonesia',
    'Next.js TypeScript Developer',
    'React.js Developer',
    'Jasa Pembuatan Website',
  ]),
);

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: portfolioData.settings.siteTitle,
    template: `%s | ${portfolioData.profile.fullName}`,
  },
  description: portfolioData.settings.siteDescription,
  keywords: expandedKeywords,
  authors: [{ name: portfolioData.profile.fullName, url: siteUrl }],
  creator: portfolioData.profile.fullName,
  publisher: portfolioData.profile.fullName,
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    alternateLocale: ['en_US'],
    url: '/',
    siteName: `${portfolioData.profile.fullName} Portfolio`,
    title: portfolioData.settings.siteTitle,
    description: portfolioData.settings.siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: portfolioData.settings.siteTitle,
    description: portfolioData.settings.siteDescription,
  },
  ...(googleSiteVerification
    ? {
        verification: {
          google: googleSiteVerification,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${leagueSpartan.variable} ${montserrat.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-screen bg-[#fafbfc] text-[#0f172a] font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-[#0f172a] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
        >
          Lewati ke konten utama
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
