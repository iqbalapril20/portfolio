'use client';

import { useEffect, useState } from 'react';
import { getPortfolioData } from '@/data/portfolio.en';
import type { Locale } from '@/lib/i18n';
import type { PortfolioData } from '@/types/portfolio';
import { AboutSection } from './AboutSection';
import { BackToTopButton } from './BackToTopButton';
import { CliTerminalModal } from './CliTerminalModal';
import { ContactSection } from './ContactSection';
import { HeroSection, type PortfolioTabKey } from './HeroSection';
import { PortfolioShowcase } from './PortfolioShowcase';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';
import { TechMarqueeStrip } from './TechMarqueeStrip';

interface PortfolioAppProps {
  data: PortfolioData;
}

export function PortfolioApp({ data }: PortfolioAppProps) {
  const [locale, setLocale] = useState<Locale>('id');
  const [activePortfolioTab, setActivePortfolioTab] = useState<PortfolioTabKey>('projects');
  const [cliOpen, setCliOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('portfolio-locale');
      if (saved === 'en' || saved === 'id') {
        setLocale(saved);
      }
    } catch {
      // Ignore storage access restrictions
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      window.localStorage.setItem('portfolio-locale', locale);
    } catch {
      // Ignore storage write restrictions
    }
  }, [locale]);

  const localizedData = locale === 'id' ? data : getPortfolioData('en');

  function handleJumpToTab(tab: PortfolioTabKey) {
    setActivePortfolioTab(tab);
    const el = document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <>
      <SiteHeader
        brandMark={localizedData.profile.brandMark}
        isAvailable={localizedData.profile.isAvailable}
        locale={locale}
        onLocaleChange={setLocale}
        onJumpToTab={handleJumpToTab}
        onOpenCli={() => setCliOpen(true)}
      />

      <main id="main-content" tabIndex={-1} className="w-full pt-20 focus:outline-none">
        <HeroSection
          profile={localizedData.profile}
          settings={localizedData.settings}
          projectCount={localizedData.projects.length}
          certificateCount={localizedData.certificates.length}
          techCount={localizedData.techStacks.length}
          locale={locale}
          onJumpToTab={handleJumpToTab}
          onOpenCli={() => setCliOpen(true)}
        />

        <TechMarqueeStrip techStacks={localizedData.techStacks} locale={locale} />

        <AboutSection
          profile={localizedData.profile}
          experiences={localizedData.experiences}
          educations={localizedData.educations}
          skills={localizedData.skills}
          locale={locale}
        />

        <PortfolioShowcase
          projects={localizedData.projects}
          categories={localizedData.categories}
          certificates={localizedData.certificates}
          techStacks={localizedData.techStacks}
          activeTab={activePortfolioTab}
          locale={locale}
          onTabChange={setActivePortfolioTab}
        />

        <ContactSection
          contact={localizedData.contact}
          profile={localizedData.profile}
          settings={localizedData.settings}
          locale={locale}
        />
      </main>

      <SiteFooter
        profile={localizedData.profile}
        contact={localizedData.contact}
        settings={localizedData.settings}
        locale={locale}
      />

      <BackToTopButton locale={locale} />

      <CliTerminalModal
        open={cliOpen}
        onClose={() => setCliOpen(false)}
        data={localizedData}
        locale={locale}
      />
    </>
  );
}
