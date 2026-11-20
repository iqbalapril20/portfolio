'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Mail, Pause, Play, Terminal } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { getTranslations, type Locale } from '@/lib/i18n';
import { scrollToSection } from '@/lib/scroll';
import type { Profile, WebsiteSetting } from '@/types/portfolio';
import { HeroPortraitInteractive } from './HeroPortraitInteractive';

export type PortfolioTabKey = 'projects' | 'certificates' | 'techstack';

interface HeroSectionProps {
  profile: Profile;
  settings: WebsiteSetting;
  projectCount: number;
  certificateCount: number;
  techCount: number;
  locale: Locale;
  onJumpToTab: (tab: PortfolioTabKey) => void;
  onOpenCli: () => void;
}

const TypewriterRole = memo(function TypewriterRole({
  roles,
  isPaused,
  shouldReduceMotion,
}: {
  roles: string[];
  isPaused: boolean;
  shouldReduceMotion: boolean;
}) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [charCount, setCharCount] = useState(() => roles[0]?.length ?? 0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentRole = roles[roleIdx] || roles[0] || 'Full-Stack Web Developer';

  useEffect(() => {
    if (shouldReduceMotion || isPaused || roles.length <= 1) return;

    let delay = isDeleting ? 34 : 58;

    if (!isDeleting && charCount === currentRole.length) {
      delay = 1900;
      const t = window.setTimeout(() => setIsDeleting(true), delay);
      return () => window.clearTimeout(t);
    }

    if (isDeleting && charCount === 0) {
      delay = 240;
      const t = window.setTimeout(() => {
        setIsDeleting(false);
        setRoleIdx((prev) => (prev + 1) % roles.length);
      }, delay);
      return () => window.clearTimeout(t);
    }

    const t = window.setTimeout(() => {
      setCharCount((prev) =>
        isDeleting ? Math.max(0, prev - 1) : Math.min(currentRole.length, prev + 1),
      );
    }, delay);

    return () => window.clearTimeout(t);
  }, [charCount, isDeleting, isPaused, currentRole, roles.length, shouldReduceMotion]);

  const displayed = shouldReduceMotion ? currentRole : currentRole.slice(0, charCount);

  return (
    <span className="text-[#1d4ed8]">
      {displayed}
    </span>
  );
});

export function HeroSection({
  profile,
  settings,
  projectCount,
  certificateCount,
  techCount,
  locale,
  onJumpToTab,
  onOpenCli,
}: HeroSectionProps) {
  const t = getTranslations(locale);
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [isRolePaused, setIsRolePaused] = useState(false);

  const metrics: Array<{ label: string; count: number; tab: PortfolioTabKey; accent: boolean }> = [
    { label: t.hero.statProjects, count: projectCount, tab: 'projects', accent: true },
    { label: t.hero.statCertificates, count: certificateCount, tab: 'certificates', accent: false },
    { label: t.hero.statTech, count: techCount, tab: 'techstack', accent: true },
  ];

  return (
    <section className="relative w-full py-10 sm:py-14 lg:py-20 overflow-hidden bg-white hero-grid-pattern border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Text & Actions Column */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col gap-4 sm:gap-5 min-w-0"
          >
            {/* Punchy Integrated Hero Headline with Running Typewriter Role */}
            <div className="space-y-2.5">
              <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-[58px] text-slate-900 leading-[1.08] tracking-tight">
                {t.hero.greetingPrefix}{' '}
                <span className="italic font-serif font-normal text-[#1d4ed8] underline decoration-blue-200 decoration-wavy decoration-2 underline-offset-4">
                  Iqbal
                </span>
                .
              </h1>

              <div className="flex flex-wrap items-center gap-2.5">
                <div
                  aria-live="polite"
                  className="flex flex-wrap items-center gap-2 font-heading font-bold text-2xl sm:text-3xl lg:text-[34px] text-slate-800 leading-tight"
                >
                  <span>{t.hero.rolePrefix}</span>
                  <TypewriterRole
                    roles={profile.heroRoles}
                    isPaused={isRolePaused}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                  <span
                    className={`inline-block w-[3px] h-7 sm:h-8 bg-[#1d4ed8] rounded-full shrink-0 ${
                      isRolePaused ? 'opacity-35' : 'animate-pulse'
                    }`}
                    aria-hidden="true"
                  />
                </div>

                {profile.heroRoles.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setIsRolePaused((p) => !p)}
                    aria-label={isRolePaused ? t.hero.playRole : t.hero.pauseRole}
                    aria-pressed={isRolePaused}
                    className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-[#1d4ed8] hover:border-blue-300 inline-flex items-center justify-center transition-colors shrink-0"
                  >
                    {isRolePaused ? (
                      <Play className="w-3 h-3" aria-hidden="true" />
                    ) : (
                      <Pause className="w-3 h-3" aria-hidden="true" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Tight Bio */}
            <p className="text-sm sm:text-base lg:text-lg text-[#475569] leading-relaxed max-w-xl font-normal">
              {profile.shortBio}
            </p>

            {/* Mobile Portrait Display */}
            <div className="lg:hidden w-full flex justify-center py-2">
              <HeroPortraitInteractive
                imageUrl={profile.heroImageUrl || profile.profileImageUrl}
                fullName={profile.fullName}
                degreeLabel={profile.degreeLabel}
                locale={locale}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => scrollToSection('portfolio')}
                className="btn-glow min-h-[44px] px-6 py-3.5 rounded-full bg-[#1d4ed8] text-white font-semibold text-sm hover:bg-[#0d5bff] transition-colors flex items-center justify-center gap-2"
              >
                <span>{settings.heroCtaPrimaryLabel}</span>
                <ArrowDown className="w-4 h-4 btn-icon-move" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="btn-glow min-h-[44px] px-5 py-3.5 rounded-full bg-white text-slate-700 font-semibold text-sm border border-slate-300 hover:border-[#1d4ed8] hover:text-[#1d4ed8] hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-[#1d4ed8]" aria-hidden="true" />
                <span>{settings.heroCtaSecondaryLabel}</span>
              </button>

              <button
                type="button"
                onClick={onOpenCli}
                className="btn-glow min-h-[44px] px-5 py-3.5 rounded-full bg-slate-100 text-slate-700 hover:text-[#1d4ed8] font-semibold text-sm border border-slate-200 hover:bg-slate-200/70 transition-colors flex items-center justify-center gap-1.5"
              >
                <Terminal className="w-4 h-4 text-[#1d4ed8]" aria-hidden="true" />
                <span>{t.hero.cliMode}</span>
              </button>
            </div>

            {/* Key Stats Row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-5 mt-2 border-t border-slate-200/90 text-left">
              {metrics.map((m) => (
                <button
                  key={m.tab}
                  type="button"
                  onClick={() => onJumpToTab(m.tab)}
                  aria-label={`${t.hero.statAriaPrefix} ${m.count} ${m.label}`}
                  className="group flex flex-col text-left p-2 -m-2 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <span
                    className={`font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl tabular-nums transition-colors ${
                      m.accent
                        ? 'text-[#1d4ed8] group-hover:text-[#0d5bff]'
                        : 'text-slate-900 group-hover:text-[#1d4ed8]'
                    }`}
                  >
                    {m.count}
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-600 mt-0.5">
                    {m.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Desktop Right Column: Interactive Hero Portrait */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, x: 24, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex lg:col-span-5 relative justify-center items-center"
          >
            <HeroPortraitInteractive
              imageUrl={profile.heroImageUrl || profile.profileImageUrl}
              fullName={profile.fullName}
              degreeLabel={profile.degreeLabel}
              locale={locale}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
