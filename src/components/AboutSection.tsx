'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import type { Education, Experience, Profile, Skill } from '@/types/portfolio';
import { ScrollReveal, StaggerItem, StaggerList } from './MotionPrimitives';
import { RichTextContent } from './RichTextContent';

interface AboutSectionProps {
  profile: Profile;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
}

type AboutTab = 'experience' | 'education' | 'skills';

export function AboutSection({
  profile,
  experiences,
  educations,
  skills,
}: AboutSectionProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [activeTab, setActiveTab] = useState<AboutTab>('experience');

  const tabs: Array<{ key: AboutTab; label: string; count: number }> = [
    { key: 'experience', label: 'Pengalaman', count: experiences.length },
    { key: 'education', label: 'Pendidikan', count: educations.length },
    { key: 'skills', label: 'Keahlian', count: skills.length },
  ];

  const groupedSkills = skills.reduce<Record<string, Skill[]>>((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <section
      id="about"
      className="scroll-mt-20 w-full py-16 sm:py-24 bg-white border-b border-[#E2E8F0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Identity Motif Section Header */}
        <ScrollReveal direction="left" className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold tracking-wider text-[#1D4ED8] uppercase">
              01 / Tentang &amp; Rekam Jejak
            </span>
            <span className="h-px w-12 bg-[#E2E8F0]" aria-hidden="true" />
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
            {profile.fullName}
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#475569]">
            {profile.degreeLabel} · {profile.availabilityText}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (6 cols): Biography & 6 Core Competencies */}
          <ScrollReveal direction="left" className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <p className="text-base sm:text-lg font-medium text-[#0F172A] leading-relaxed">
                {profile.aboutSummary}
              </p>
              <RichTextContent
                content={profile.aboutStory}
                className="text-sm sm:text-base text-[#334155] leading-relaxed"
              />
            </div>

            {/* 6 Core Competencies Hairline Grid */}
            <div className="space-y-4 pt-2">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#475569]">
                Kompetensi Inti
              </h3>
              <StaggerList className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 border-t border-[#E2E8F0] pt-5">
                {profile.coreCompetencies.map((comp, idx) => (
                  <StaggerItem key={comp.title} className="space-y-1">
                    <span className="font-mono text-xs font-semibold text-[#1D4ED8] block">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h4 className="font-heading text-base font-bold text-[#0F172A]">
                      {comp.title}
                    </h4>
                    {comp.description && (
                      <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                        {comp.description}
                      </p>
                    )}
                  </StaggerItem>
                ))}
              </StaggerList>
            </div>
          </ScrollReveal>

          {/* Right Column (6 cols): Interactive Trajectory Tabs */}
          <ScrollReveal direction="right" delay={0.08} className="lg:col-span-6 space-y-6">
            <div
              role="tablist"
              aria-label="Rekam jejak profesional dan pendidikan"
              className="inline-grid grid-cols-3 gap-1 p-1 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] w-full sm:w-auto"
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    id={`about-tab-${tab.key}`}
                    aria-selected={isActive}
                    aria-controls={`about-panel-${tab.key}`}
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative min-h-[42px] px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors ${
                      isActive ? 'text-[#0F172A]' : 'text-[#475569] hover:text-[#0F172A]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId={shouldReduceMotion ? undefined : 'about-tab-pill'}
                        transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                        className="absolute inset-0 rounded-md bg-white border border-[#E2E8F0] shadow-xs"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10">
                      {tab.label} ({tab.count})
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'experience' && (
                <motion.div
                  key="experience"
                  role="tabpanel"
                  id="about-panel-experience"
                  aria-labelledby="about-tab-experience"
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-4"
                >
                  {experiences.map((exp) => (
                    <article
                      key={exp.id}
                      className="p-5 sm:p-6 rounded-xl bg-[#FAFBFD] border border-[#E2E8F0] space-y-3 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div>
                          <h3 className="font-heading text-xl font-bold text-[#0F172A]">
                            {exp.title}
                          </h3>
                          <p className="text-xs sm:text-sm font-semibold text-[#1D4ED8]">
                            {exp.organization}
                            {exp.employmentType ? ` · ${exp.employmentType}` : ''}
                            {exp.location ? ` · ${exp.location}` : ''}
                          </p>
                        </div>
                        <span className="font-mono text-xs font-semibold px-3 py-1 rounded-md bg-white border border-[#E2E8F0] text-[#334155] whitespace-nowrap self-start">
                          {exp.startDate} - {exp.isCurrent ? 'Sekarang' : exp.endDate}
                        </span>
                      </div>

                      <RichTextContent
                        content={exp.description}
                        className="text-xs sm:text-sm text-[#334155] leading-relaxed"
                      />

                      {exp.techTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {exp.techTags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-md bg-white border border-[#E2E8F0] font-mono text-xs text-[#334155]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </motion.div>
              )}

              {activeTab === 'education' && (
                <motion.div
                  key="education"
                  role="tabpanel"
                  id="about-panel-education"
                  aria-labelledby="about-tab-education"
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-4"
                >
                  {educations.map((edu) => (
                    <article
                      key={edu.id}
                      className="p-5 sm:p-6 rounded-xl bg-[#FAFBFD] border border-[#E2E8F0] space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div>
                          <h3 className="font-heading text-xl font-bold text-[#0F172A]">
                            {edu.degree}
                          </h3>
                          <p className="text-xs sm:text-sm font-semibold text-[#1D4ED8]">
                            {edu.institution}
                          </p>
                          <p className="font-mono text-xs text-[#475569] mt-0.5">{edu.major}</p>
                        </div>
                        <span className="font-mono text-xs font-semibold px-3 py-1 rounded-md bg-white border border-[#E2E8F0] text-[#334155] whitespace-nowrap self-start">
                          {edu.startYear} - {edu.isCurrent ? 'Sekarang' : edu.endYear}
                        </span>
                      </div>

                      {edu.description && (
                        <RichTextContent
                          content={edu.description}
                          className="text-xs sm:text-sm text-[#334155] leading-relaxed"
                        />
                      )}
                    </article>
                  ))}
                </motion.div>
              )}

              {activeTab === 'skills' && (
                <motion.div
                  key="skills"
                  role="tabpanel"
                  id="about-panel-skills"
                  aria-labelledby="about-tab-skills"
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="grid grid-cols-1 gap-4"
                >
                  {Object.entries(groupedSkills).map(([category, items]) => (
                    <div
                      key={category}
                      className="p-5 rounded-xl bg-[#FAFBFD] border border-[#E2E8F0] space-y-3"
                    >
                      <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1D4ED8] border-b border-[#E2E8F0] pb-2">
                        {category}
                      </h3>
                      <ul className="divide-y divide-[#E2E8F0]">
                        {items.map((skill) => (
                          <li
                            key={skill.id}
                            className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-sm"
                          >
                            <span className="font-semibold text-[#0F172A]">{skill.name}</span>
                            {skill.proficiencyLabel && (
                              <span className="font-mono text-xs text-[#475569] shrink-0">
                                {skill.proficiencyLabel}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
