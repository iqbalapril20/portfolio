'use client';

import { ArrowRight, Briefcase, Code2, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import { scrollToSection } from '@/lib/scroll';
import type { Education, Experience, Profile, Skill } from '@/types/portfolio';
import { ScrollReveal, TiltCard } from './MotionPrimitives';
import { RichTextContent } from './RichTextContent';

interface AboutSectionProps {
  profile: Profile;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
}

interface TimelineEntry {
  key: string;
  index: number;
  organization: string;
  title: string;
  subtitle: string;
  period: string;
  logoUrl?: string | null;
  logoAlt: string;
  badgeText?: string | null;
  description?: string | null;
  techTags?: string[];
  kind: 'education' | 'experience';
}

function TimelineList({
  heading,
  icon: HeaderIcon,
  entries,
}: {
  heading: string;
  icon: typeof GraduationCap;
  entries: TimelineEntry[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 text-[#1d4ed8] flex items-center justify-center shrink-0">
          <HeaderIcon className="w-5 h-5" aria-hidden="true" />
        </div>
        <h3 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900">{heading}</h3>
      </div>

      <div className="relative space-y-6 before:absolute before:left-5 before:top-5 before:bottom-6 before:w-[1.5px] before:bg-slate-200">
        {entries.map((entry, idx) => {
          const isPrimary = idx === 0;
          const FallbackIcon = entry.kind === 'education' ? GraduationCap : Briefcase;

          return (
            <article key={entry.key} className="relative pl-14 group">
              {/* Numbered timeline node */}
              <div
                className={`absolute left-0 top-1.5 w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm transition-colors ${
                  isPrimary
                    ? 'bg-[#1d4ed8] text-white shadow-md shadow-blue-600/25 ring-4 ring-blue-100'
                    : 'bg-white border-2 border-slate-300 text-slate-600 group-hover:border-[#1d4ed8] group-hover:text-[#1d4ed8]'
                }`}
                aria-hidden="true"
              >
                {entry.index}
              </div>

              <div className="p-5 rounded-2xl bg-slate-50/90 border border-slate-200/90 shadow-xs hover:border-blue-300 hover:bg-white transition-all flex flex-col gap-3">
                {/* Top Row: Institution/Company Logo Slot + Name + Period Pill */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      title={
                        entry.logoUrl
                          ? entry.logoAlt
                          : `Slot logo ${entry.organization} (isi logoUrl di src/data/portfolio.ts)`
                      }
                      className="relative w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center shrink-0 overflow-hidden"
                    >
                      {entry.logoUrl ? (
                        <Image
                          src={entry.logoUrl}
                          alt={entry.logoAlt}
                          fill
                          sizes="44px"
                          className="object-contain p-1.5"
                        />
                      ) : (
                        <FallbackIcon className="w-5 h-5 text-[#1d4ed8]" aria-hidden="true" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="font-heading font-bold text-base sm:text-lg text-slate-900 leading-snug">
                        {entry.organization}
                      </p>
                      <p className="text-xs font-medium text-slate-600 mt-0.5">{entry.subtitle}</p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 whitespace-nowrap shrink-0">
                    {entry.period}
                  </span>
                </div>

                {/* Title & Type Pill */}
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-heading font-bold text-lg text-slate-900">{entry.title}</h4>
                  {entry.badgeText && (
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 text-[11px] font-semibold text-[#1d4ed8]">
                      {entry.badgeText}
                    </span>
                  )}
                </div>

                {/* Optional Description */}
                {entry.description && (
                  <RichTextContent
                    content={entry.description}
                    className="text-xs sm:text-sm text-[#475569] leading-relaxed"
                  />
                )}

                {/* Optional Tech Tags */}
                {entry.techTags && entry.techTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {entry.techTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-[11px] font-medium text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function AboutSection({ profile, experiences, educations, skills }: AboutSectionProps) {
  const educationEntries: TimelineEntry[] = educations.map((edu, idx) => ({
    key: `edu-${edu.id}`,
    index: idx + 1,
    organization: edu.institution,
    title: edu.degree,
    subtitle: edu.major,
    period: `${edu.startYear ?? ''} - ${edu.isCurrent ? 'Sekarang' : (edu.endYear ?? '')}`,
    logoUrl: edu.logoUrl,
    logoAlt: `Logo ${edu.institution}`,
    badgeText: edu.startYear === 2018 ? 'MIPA' : 'S1 Informatika',
    description: edu.description,
    kind: 'education',
  }));

  const experienceEntries: TimelineEntry[] = experiences.map((exp, idx) => ({
    key: `exp-${exp.id}`,
    index: idx + 1,
    organization: exp.organization,
    title: exp.title,
    subtitle: exp.location || 'Indonesia',
    period: `${exp.startDate} - ${exp.isCurrent ? 'Sekarang' : exp.endDate}`,
    logoUrl: exp.logoUrl,
    logoAlt: `Logo ${exp.organization}`,
    badgeText: exp.employmentType,
    description: exp.description,
    techTags: exp.techTags,
    kind: 'experience',
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
            About Me
          </h2>
        </ScrollReveal>

        {/* Upper 3-Column Showcase matching Reference Image 3 (Light Theme) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Intro Greeting & Name */}
          <ScrollReveal
            direction="left"
            className="lg:col-span-4 min-w-0 flex flex-col items-center lg:items-start text-center lg:text-left gap-4"
          >
            <div className="space-y-1.5">
              <p className="font-heading font-bold text-2xl sm:text-3xl text-[#1d4ed8]">
                Hi, I&apos;m
              </p>
              <h3 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[40px] text-slate-900 leading-[1.1] tracking-tight">
                {profile.fullName}
              </h3>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="btn-glow min-h-[44px] px-5 py-2.5 rounded-xl bg-[#1d4ed8] hover:bg-[#0d5bff] text-white text-sm font-semibold inline-flex items-center gap-2 shadow-md shadow-blue-600/20 transition-all"
              >
                <span>Hubungi Saya</span>
                <ArrowRight className="w-4 h-4 btn-icon-move" aria-hidden="true" />
              </button>

              {profile.isAvailable && (
                <span className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#047857] text-xs font-semibold">
                  Open to Work
                </span>
              )}
            </div>
          </ScrollReveal>

          {/* Center Column: Clean Editorial Studio Portrait */}
          <ScrollReveal direction="up" delay={0.05} className="lg:col-span-4 flex justify-center">
            <TiltCard className="relative w-[250px] sm:w-[285px] rounded-3xl bg-white border border-slate-200/90 shadow-xl p-2">
              <div className="relative aspect-[4/4.6] w-full rounded-2xl overflow-hidden bg-slate-100">
                <Image
                  src={profile.aboutImageUrl || profile.profileImageUrl}
                  alt={`Foto profil ${profile.fullName}`}
                  fill
                  sizes="(max-width: 768px) 250px, 285px"
                  className="object-cover object-top select-none"
                />
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* Right Column: Bio Summary & View Projects Action */}
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
              className="btn-glow min-h-[44px] px-5 py-2.5 rounded-xl bg-[#1d4ed8] hover:bg-[#0d5bff] text-white text-sm font-semibold inline-flex items-center gap-2 shadow-md shadow-blue-600/20 transition-all"
            >
              <Code2 className="w-4 h-4" aria-hidden="true" />
              <span>View Projects</span>
            </button>
          </ScrollReveal>
        </div>

        {/* Lower 2-Column Numbered Vertical Timeline matching Reference Image 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 mt-14 pt-12 border-t border-slate-200/80">
          <ScrollReveal direction="left">
            <TimelineList
              heading="Education"
              icon={GraduationCap}
              entries={educationEntries}
            />
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.06}>
            <TimelineList
              heading="Experience"
              icon={Briefcase}
              entries={experienceEntries}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
