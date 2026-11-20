'use client';

import { ArrowRight, Briefcase, ChevronRight, Code2, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { getTranslations, type Locale } from '@/lib/i18n';
import { scrollToSection } from '@/lib/scroll';
import type { Education, Experience, Profile, Skill } from '@/types/portfolio';
import { ScrollReveal, TiltCard } from './MotionPrimitives';
import { type SelectedTimelineItem, TimelineDetailModal } from './TimelineDetailModal';

interface AboutSectionProps {
  profile: Profile;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  locale: Locale;
}

interface TimelineDisplayRow {
  key: string;
  index: number;
  organization: string;
  title: string;
  subtitle: string;
  period: string;
  logoUrl?: string | null;
  badgeText?: string | null;
  kind: 'education' | 'experience';
  source: SelectedTimelineItem;
}

function TimelineList({
  heading,
  rows,
  clickHint,
  onSelect,
}: {
  heading: string;
  rows: TimelineDisplayRow[];
  clickHint: string;
  onSelect: (selected: SelectedTimelineItem) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <h3 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900">{heading}</h3>
      </div>

      <div className="relative space-y-6 before:absolute before:left-5 before:top-4 before:bottom-6 before:w-[1.5px] before:bg-slate-200">
        {rows.map((row, idx) => {
          const isPrimary = idx === 0;
          const FallbackIcon = row.kind === 'education' ? GraduationCap : Briefcase;

          return (
            <div key={row.key} className="relative pl-14">
              {/* Numbered circle matching reference timeline */}
              <div
                className={`absolute left-0 top-1.5 w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm transition-colors ${
                  isPrimary
                    ? 'bg-[#1d4ed8] text-white'
                    : 'bg-slate-100 border border-slate-300 text-slate-600'
                }`}
                aria-hidden="true"
              >
                {row.index}
              </div>

              <button
                type="button"
                onClick={() => onSelect(row.source)}
                className="group w-full text-left rounded-xl p-2.5 -m-2.5 hover:bg-slate-50/90 border border-transparent hover:border-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]"
              >
                {/* Row 1: Logo + Institution/Company + Period Pill */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                      {row.logoUrl ? (
                        <Image
                          src={row.logoUrl}
                          alt={row.organization}
                          fill
                          unoptimized
                          sizes="32px"
                          className="object-contain p-0.5"
                        />
                      ) : (
                        <FallbackIcon className="w-4 h-4 text-[#1d4ed8]" aria-hidden="true" />
                      )}
                    </div>
                    <span className="font-heading font-semibold text-base text-slate-800 group-hover:text-[#1d4ed8] transition-colors truncate">
                      {row.organization}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 whitespace-nowrap shrink-0">
                    {row.period}
                  </span>
                </div>

                {/* Row 2: Bold Degree / Role Title */}
                <h4 className="font-heading font-bold text-lg sm:text-xl text-slate-900 mt-1.5 leading-snug">
                  {row.title}
                </h4>

                {/* Row 3: Subtitle + Badge + Subtle Detail Cue */}
                <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#475569]">
                    <span>{row.subtitle}</span>
                    {row.badgeText && (
                      <>
                        <span className="text-slate-400" aria-hidden="true">
                          ·
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-[11px] font-medium text-slate-700">
                          {row.badgeText}
                        </span>
                      </>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-0.5 font-mono text-[11px] font-semibold text-[#1d4ed8] opacity-75 group-hover:opacity-100 transition-opacity">
                    <span>{clickHint}</span>
                    <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AboutSection({
  profile,
  experiences,
  educations,
  skills,
  locale,
}: AboutSectionProps) {
  const t = getTranslations(locale);
  const [selectedItem, setSelectedItem] = useState<SelectedTimelineItem | null>(null);

  const educationRows: TimelineDisplayRow[] = educations.map((edu, idx) => ({
    key: `edu-${edu.id}`,
    index: idx + 1,
    organization: edu.institution,
    title: edu.degree,
    subtitle: edu.major,
    period: `${edu.startYear ?? ''} - ${edu.isCurrent ? t.about.present : (edu.endYear ?? '')}`,
    logoUrl: edu.logoUrl,
    badgeText: edu.startYear === 2018 ? t.about.educationBadgeHighSchool : t.about.educationBadgeUni,
    kind: 'education',
    source: { kind: 'education', item: edu },
  }));

  const experienceRows: TimelineDisplayRow[] = experiences.map((exp, idx) => ({
    key: `exp-${exp.id}`,
    index: idx + 1,
    organization: exp.organization,
    title: exp.title,
    subtitle: exp.location || 'Indonesia',
    period: `${exp.startDate} - ${exp.isCurrent ? t.about.present : exp.endDate}`,
    logoUrl: exp.logoUrl,
    badgeText: exp.employmentType,
    kind: 'experience',
    source: { kind: 'experience', item: exp },
  }));

  return (
    <section
      id="about"
      className="scroll-mt-20 relative w-full py-16 sm:py-20 bg-white about-contour-pattern border-b border-slate-200/80 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Centered Section Title */}
        <ScrollReveal direction="up" className="text-center mb-12 sm:mb-14">
          <h2 className="font-heading font-bold text-3xl sm:text-5xl text-slate-900 tracking-tight">
            {t.about.sectionTitle}
          </h2>
        </ScrollReveal>

        {/* Upper 3-Column Showcase matching Reference Image 3 (Light Theme) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column */}
          <ScrollReveal
            direction="left"
            className="lg:col-span-4 min-w-0 flex flex-col items-center lg:items-start text-center lg:text-left gap-4"
          >
            <div className="space-y-1.5">
              <p className="font-heading font-bold text-2xl sm:text-3xl text-[#1d4ed8]">
                {t.about.greeting}
              </p>
              <h3 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[40px] text-slate-900 leading-[1.1] tracking-tight">
                {profile.fullName}
              </h3>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="btn-glow min-h-[44px] px-5 py-2.5 rounded-xl bg-[#1d4ed8] hover:bg-[#0d5bff] text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors"
              >
                <span>{t.about.contactCta}</span>
                <ArrowRight className="w-4 h-4 btn-icon-move" aria-hidden="true" />
              </button>

              {profile.isAvailable && (
                <span className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#047857] text-xs font-semibold">
                  {t.about.openToWork}
                </span>
              )}
            </div>
          </ScrollReveal>

          {/* Center Column: Clean Portrait */}
          <ScrollReveal direction="up" delay={0.05} className="lg:col-span-4 flex justify-center">
            <TiltCard className="relative w-[250px] sm:w-[285px] rounded-3xl bg-white border border-slate-200 p-2">
              <div className="relative aspect-[4/4.6] w-full rounded-2xl overflow-hidden bg-slate-100">
                <Image
                  src={profile.aboutImageUrl || profile.profileImageUrl}
                  alt={profile.fullName}
                  fill
                  sizes="(max-width: 768px) 250px, 285px"
                  className="object-cover object-top select-none"
                />
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* Right Column */}
          <ScrollReveal
            direction="right"
            delay={0.08}
            className="lg:col-span-4 min-w-0 flex flex-col items-center lg:items-start text-center lg:text-left gap-5"
          >
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              {profile.aboutSummary}
            </p>

            {skills.length > 0 && (
              <div className="flex flex-wrap justify-center lg:justify-start gap-1.5">
                {skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill.id}
                    className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-700"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => scrollToSection('portfolio')}
              className="btn-glow min-h-[44px] px-5 py-2.5 rounded-xl bg-[#1d4ed8] hover:bg-[#0d5bff] text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <Code2 className="w-4 h-4" aria-hidden="true" />
              <span>{t.about.viewProjects}</span>
            </button>
          </ScrollReveal>
        </div>

        {/* Lower 2-Column Compact Numbered Timeline (click opens detail modal) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 mt-14 pt-12 border-t border-slate-200/80">
          <ScrollReveal direction="left">
            <TimelineList
              heading={t.about.educationHeading}
              rows={educationRows}
              clickHint={t.about.clickDetails}
              onSelect={setSelectedItem}
            />
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.06}>
            <TimelineList
              heading={t.about.experienceHeading}
              rows={experienceRows}
              clickHint={t.about.clickDetails}
              onSelect={setSelectedItem}
            />
          </ScrollReveal>
        </div>
      </div>

      <TimelineDetailModal
        selected={selectedItem}
        locale={locale}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
}
