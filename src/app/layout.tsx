import type { Metadata } from 'next';
import { League_Spartan, Montserrat, Space_Grotesk } from 'next/font/google';
import { portfolioData } from '@/data/portfolio';
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

export const metadata: Metadata = {
  title: portfolioData.settings.siteTitle,
  description: portfolioData.settings.siteDescription,
  keywords: portfolioData.settings.siteKeywords,
  openGraph: {
    type: 'website',
    title: portfolioData.settings.siteTitle,
    description: portfolioData.settings.siteDescription,
  },
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
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-[#0f172a] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold focus:shadow-lg"
        >
          Lewati ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}
