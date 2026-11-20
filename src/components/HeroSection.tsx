'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Mail, MapPin, Pause, Play, Terminal } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import type { ContactInfo, Profile, WebsiteSetting } from '@/types/portfolio';
import { HeroPortraitInteractive } from './HeroPortraitInteractive';

export type PortfolioTabKey = 'projects' | 'certificates' | 'techstack';

interface HeroSectionProps {
  profile: Profile;
  settings: WebsiteSetting;
  contact: ContactInfo;
  projectCount: number;
  certificateCount: number;
  techCount: number;
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
    <span className="font-mono text-xs sm:text-sm font-semibold text-[#0F172A] truncate">
      {displayed}
    </span>
  );
});

export function HeroSection({
  profile,
  settings,
  contact,
  projectCount,
  certificateCount,
  techCount,
  onJumpToTab,
  onOpenCli,
}: HeroSectionProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [isRolePaused, setIsRolePaused] = useState(false);

  const metrics: Array<{ label: string; count: number; tab: PortfolioTabKey }> = [
    { label: 'Proyek Terpublikasi', count: projectCount, tab: 'projects' },
    { label: 'Sertifikasi Terverifikasi', count: certificateCount, tab: 'certificates' },
    { label: 'Teknologi Dikuasai', count: techCount, tab: 'techstack' },
  ];

  return (
    <section
      id="top"
      className="relative w-full pt-24 sm:pt-26 pb-10 sm:pb-14 bg-[#FAFBFD] border-b border-[#E2E8F0] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Editorial Intro */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col gap-4 sm:gap-5 min-w-0"
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs sm:text-sm text-[#475569]">
              <span className="font-semibold text-[#0F172A]">{profile.fullName}</span>
              <span className="text-slate-300" aria-hidden="true">
                /
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#1D4ED8]" aria-hidden="true" />
                <span>{contact.location}</span>
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-[clamp(2.25rem,4.8vw,4rem)] text-[#0F172A] leading-[1.06] tracking-[-0.025em]">
              {profile.headline}
            </h1>

            {/* Role Typewriter + Accessible Pause Control (R-39) */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div
                aria-live="polite"
                className="inline-flex items-center gap-2 min-h-[40px] px-3.5 py-2 rounded-lg bg-white border border-[#E2E8F0] shadow-xs max-w-full"
              >
                <span className="font-mono text-xs text-[#1D4ED8] font-semibold">Fokus:</span>
                <TypewriterRole
                  roles={profile.heroRoles}
                  isPaused={isRolePaused}
                  shouldReduceMotion={shouldReduceMotion}
                />
                <span
                  className={`inline-block w-[2px] h-4 bg-[#1D4ED8] shrink-0 ${
                    isRolePaused ? 'opacity-35' : ''
                  }`}
                  aria-hidden="true"
                />
              </div>

              {profile.heroRoles.length > 1 && (
                <button
                  type="button"
                  onClick={() => setIsRolePaused((p) => !p)}
                  aria-label={isRolePaused ? 'Lanjutkan animasi peran' : 'Jeda animasi peran'}
                  aria-pressed={isRolePaused}
                  className="min-w-[40px] min-h-[40px] rounded-lg border border-[#E2E8F0] bg-white text-[#475569] hover:text-[#1D4ED8] hover:border-[#1D4ED8] inline-flex items-center justify-center transition-colors"
                >
                  {isRolePaused ? (
                    <Play className="w-3.5 h-3.5" aria-hidden="true" />
                  ) : (
                    <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                </button>
              )}
            </div>

            <p className="text-base sm:text-lg text-[#334155] leading-relaxed max-w-2xl">
              {profile.shortBio}
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#portfolio"
                className="min-h-[44px] px-6 py-3 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] active:scale-[0.99] text-white font-semibold text-sm inline-flex items-center gap-2 transition-all shadow-sm"
              >
                <span>{settings.heroCtaPrimaryLabel}</span>
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="min-h-[44px] px-5 py-3 rounded-lg bg-white border border-[#E2E8F0] text-[#0F172A] hover:border-[#1D4ED8] hover:text-[#1D4ED8] font-semibold text-sm inline-flex items-center gap-2 transition-colors"
              >
                <Mail className="w-4 h-4 text-[#1D4ED8]" aria-hidden="true" />
                <span>{settings.heroCtaSecondaryLabel}</span>
              </a>

              <button
                type="button"
                onClick={onOpenCli}
                className="min-h-[44px] px-4 py-3 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] text-[#334155] hover:text-[#0F172A] hover:border-slate-300 font-mono text-xs font-semibold inline-flex items-center gap-2 transition-colors"
              >
                <Terminal className="w-4 h-4 text-[#1D4ED8]" aria-hidden="true" />
                <span>Mode CLI</span>
              </button>
            </div>

            {/* Verified Portfolio Counts Strip (Real DB Counts Only, R-17) */}
            <div className="grid grid-cols-3 gap-3 pt-5 mt-2 border-t border-[#E2E8F0]">
              {metrics.map((m) => (
                <button
                  key={m.tab}
                  type="button"
                  onClick={() => onJumpToTab(m.tab)}
                  aria-label={`Lihat ${m.count} ${m.label}`}
                  className="group text-left p-3 rounded-xl border border-transparent hover:border-[#E2E8F0] hover:bg-white transition-all"
                >
                  <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0F172A] group-hover:text-[#1D4ED8] transition-colors block tabular-nums">
                    {m.count}
                  </span>
                  <span className="text-xs font-medium text-[#475569] block mt-0.5 leading-snug">
                    {m.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Interactive Draggable & Hover-Tilting Portrait Stage */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, x: 24, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <HeroPortraitInteractive
              imageUrl={profile.profileImageUrl}
              fullName={profile.fullName}
              brandMark={profile.brandMark}
              degreeLabel={profile.degreeLabel}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
