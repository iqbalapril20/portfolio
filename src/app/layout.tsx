import type { Metadata } from 'next';
import { JetBrains_Mono, League_Spartan, Plus_Jakarta_Sans } from 'next/font/google';
import { portfolioData } from '@/data/portfolio';
import './globals.css';

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-league-spartan',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
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
      className={`${leagueSpartan.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[#FAFBFD] text-[#0F172A] font-sans antialiased selection:bg-[#EFF6FF] selection:text-[#1D4ED8]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-[#0F172A] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold focus:shadow-lg"
        >
          Lewati ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}
