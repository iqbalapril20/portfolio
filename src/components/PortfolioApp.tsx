'use client';

import { useState } from 'react';
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
  const [activePortfolioTab, setActivePortfolioTab] = useState<PortfolioTabKey>('projects');
  const [cliOpen, setCliOpen] = useState(false);

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
        brandMark={data.profile.brandMark}
        isAvailable={data.profile.isAvailable}
        onJumpToTab={handleJumpToTab}
        onOpenCli={() => setCliOpen(true)}
      />

      <main id="main-content" tabIndex={-1} className="w-full pt-20 focus:outline-none">
        <HeroSection
          profile={data.profile}
          settings={data.settings}
          projectCount={data.projects.length}
          certificateCount={data.certificates.length}
          techCount={data.techStacks.length}
          onJumpToTab={handleJumpToTab}
          onOpenCli={() => setCliOpen(true)}
        />

        <TechMarqueeStrip techStacks={data.techStacks} />

        <AboutSection
          profile={data.profile}
          experiences={data.experiences}
          educations={data.educations}
          skills={data.skills}
        />

        <PortfolioShowcase
          projects={data.projects}
          categories={data.categories}
          certificates={data.certificates}
          techStacks={data.techStacks}
          activeTab={activePortfolioTab}
          onTabChange={setActivePortfolioTab}
        />

        <ContactSection
          contact={data.contact}
          profile={data.profile}
          settings={data.settings}
        />
      </main>

      <SiteFooter
        profile={data.profile}
        contact={data.contact}
        settings={data.settings}
      />

      <BackToTopButton />

      <CliTerminalModal
        open={cliOpen}
        onClose={() => setCliOpen(false)}
        data={data}
      />
    </>
  );
}
