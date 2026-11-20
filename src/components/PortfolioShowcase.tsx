'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Award, Code2, Eye, FolderGit2, RotateCcw, Search } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import type {
  Certificate,
  Project,
  ProjectCategory,
  TechCategory,
  TechStack,
} from '@/types/portfolio';
import { CertificateDetailModal } from './CertificateDetailModal';
import type { PortfolioTabKey } from './HeroSection';
import { InteractiveCard, ScrollReveal } from './MotionPrimitives';
import { ProjectDetailModal } from './ProjectDetailModal';

interface PortfolioShowcaseProps {
  projects: Project[];
  categories: ProjectCategory[];
  certificates: Certificate[];
  techStacks: TechStack[];
  activeTab: PortfolioTabKey;
  onTabChange: (tab: PortfolioTabKey) => void;
}

const TECH_CATEGORY_LABELS: Record<TechCategory, string> = {
  FRONTEND: 'Ekosistem Frontend',
  BACKEND: 'Backend & REST API',
  DATABASE: 'Database & ORM',
  TOOLS: 'Tools, Adapter & IoT',
};

export function PortfolioShowcase({
  projects,
  categories,
  certificates,
  techStacks,
  activeTab,
  onTabChange,
}: PortfolioShowcaseProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const tabs: Array<{
    key: PortfolioTabKey;
    label: string;
    count: number;
    icon: typeof FolderGit2;
  }> = [
    { key: 'projects', label: 'Proyek', count: projects.length, icon: FolderGit2 },
    { key: 'certificates', label: 'Sertifikat', count: certificates.length, icon: Award },
    { key: 'techstack', label: 'Tech Stack', count: techStacks.length, icon: Code2 },
  ];

  const activeCategories = useMemo(() => {
    const usedSlugs = new Set(projects.map((p) => p.category.slug));
    return categories.filter((c) => usedSlugs.has(c.slug));
  }, [categories, projects]);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'all' || project.category.slug === selectedCategory;
      const matchesQuery =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.shortDescription.toLowerCase().includes(q) ||
        project.techTags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [projects, selectedCategory, searchQuery]);

  const showLeadSplit =
    selectedCategory === 'all' &&
    !searchQuery.trim() &&
    filteredProjects.some((p) => p.isFeatured);

  const leadProject = showLeadSplit
    ? filteredProjects.find((p) => p.isFeatured) ?? null
    : null;
  const remainingProjects = leadProject
    ? filteredProjects.filter((p) => p.id !== leadProject.id)
    : filteredProjects;

  const groupedTechs = useMemo(() => {
    const map: Record<TechCategory, TechStack[]> = {
      FRONTEND: [],
      BACKEND: [],
      DATABASE: [],
      TOOLS: [],
    };
    for (const item of techStacks) {
      map[item.category].push(item);
    }
    return map;
  }, [techStacks]);

  return (
    <section
      id="portfolio"
      className="scroll-mt-20 w-full py-16 sm:py-24 bg-[#FAFBFD] border-b border-[#E2E8F0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Section Header + Segmented View Switcher */}
        <ScrollReveal
          direction="up"
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold tracking-wider text-[#1D4ED8] uppercase">
                02 / Portofolio &amp; Indeks Karya
              </span>
              <span className="h-px w-12 bg-[#E2E8F0]" aria-hidden="true" />
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
              Karya, Sertifikasi &amp; Teknologi
            </h2>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Kumpulan aplikasi web produksi, proyek akademik IoT, sertifikasi kompetensi, serta
              ekosistem teknologi yang digunakan dalam pengembangan sistem.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Kategori konten portofolio"
            className="inline-grid grid-cols-3 gap-1 p-1 rounded-lg bg-white border border-[#E2E8F0] shadow-xs w-full lg:w-auto shrink-0"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  id={`port-tab-${tab.key}`}
                  aria-selected={isActive}
                  aria-controls={`port-panel-${tab.key}`}
                  onClick={() => onTabChange(tab.key)}
                  className={`relative min-h-[44px] px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1.5 transition-colors ${
                    isActive ? 'text-white' : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId={shouldReduceMotion ? undefined : 'portfolio-tab-pill'}
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      className="absolute inset-0 rounded-md bg-[#1D4ED8]"
                      aria-hidden="true"
                    />
                  )}
                  <Icon className="relative z-10 w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="relative z-10 truncate">{tab.label}</span>
                  <span
                    className={`relative z-10 hidden sm:inline font-mono text-xs ${
                      isActive ? 'text-blue-100' : 'text-[#475569]'
                    }`}
                  >
                    ({tab.count})
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {/* TAB 1: PROJECTS */}
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              role="tabpanel"
              id="port-panel-projects"
              aria-labelledby="port-tab-projects"
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.24 }}
              className="space-y-8"
            >
              {/* Filter Bar & Search */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    aria-pressed={selectedCategory === 'all'}
                    onClick={() => setSelectedCategory('all')}
                    className={`min-h-[40px] px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold border transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-[#0F172A] text-white border-[#0F172A]'
                        : 'bg-white text-[#475569] border-[#E2E8F0] hover:border-[#1D4ED8] hover:text-[#0F172A]'
                    }`}
                  >
                    Semua ({projects.length})
                  </button>
                  {activeCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      aria-pressed={selectedCategory === cat.slug}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`min-h-[40px] px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold border transition-colors ${
                        selectedCategory === cat.slug
                          ? 'bg-[#0F172A] text-white border-[#0F172A]'
                          : 'bg-white text-[#475569] border-[#E2E8F0] hover:border-[#1D4ED8] hover:text-[#0F172A]'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-72">
                  <Search
                    className="w-4 h-4 text-[#475569] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <label htmlFor="project-search" className="sr-only">
                    Cari proyek berdasarkan judul atau teknologi
                  </label>
                  <input
                    id="project-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari proyek atau teknologi..."
                    className="w-full min-h-[44px] pl-10 pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] placeholder:text-[#475569] focus:border-[#1D4ED8]"
                  />
                </div>
              </div>

              {filteredProjects.length === 0 ? (
                <div className="p-10 text-center rounded-2xl border border-[#E2E8F0] bg-white space-y-4">
                  <p className="text-sm sm:text-base font-medium text-[#334155]">
                    Tidak ada proyek yang cocok dengan filter atau kata kunci tersebut.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="min-h-[44px] px-4 py-2 rounded-lg bg-[#1D4ED8] text-white text-xs font-semibold inline-flex items-center gap-2 hover:bg-[#1E40AF] transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Reset Filter</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Lead Featured Case Study Split (RHYTHM 3) */}
                  {leadProject && (
                    <InteractiveCard
                      as="article"
                      hoverY={-3}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-7 shadow-sm hover:border-blue-300 transition-colors"
                    >
                      <div className="lg:col-span-5 rounded-xl border border-[#E2E8F0] bg-[#0F172A] text-white p-6 flex flex-col justify-between min-h-[220px]">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-1 rounded-md bg-blue-500/20 border border-blue-400/40 font-mono text-xs font-semibold text-blue-200">
                            Proyek Unggulan
                          </span>
                          <span className="font-mono text-xs text-slate-300">
                            {leadProject.year ?? 'Produksi'}
                          </span>
                        </div>
                        <div className="space-y-2 py-4">
                          <span className="font-mono text-xs text-blue-300 block">
                            {leadProject.category.name}
                          </span>
                          <h3 className="font-heading text-2xl sm:text-3xl font-bold leading-tight">
                            {leadProject.title}
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {leadProject.techTags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 font-mono text-[11px] text-slate-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-7 flex flex-col justify-between gap-5">
                        <div className="space-y-3">
                          <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
                            {leadProject.shortDescription}
                          </p>
                          {leadProject.role && (
                            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed border-l-2 border-[#1D4ED8] pl-3">
                              {leadProject.role}
                            </p>
                          )}
                          {leadProject.keyFeatures.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                              {leadProject.keyFeatures.slice(0, 4).map((feat) => (
                                <div
                                  key={feat.title}
                                  className="p-3 rounded-lg bg-[#FAFBFD] border border-[#E2E8F0]"
                                >
                                  <p className="font-heading text-sm font-bold text-[#0F172A]">
                                    {feat.title}
                                  </p>
                                  <p className="text-xs text-[#475569] line-clamp-2 mt-0.5">
                                    {feat.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E2E8F0]">
                          <span className="font-mono text-xs text-[#475569]">
                            {leadProject.keyFeatures.length} Modul Fitur Utama
                          </span>
                          <button
                            type="button"
                            onClick={() => setSelectedProject(leadProject)}
                            className="min-h-[44px] px-5 py-2.5 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors"
                          >
                            <Eye className="w-4 h-4" aria-hidden="true" />
                            <span>Lihat Detail Studi Kasus</span>
                          </button>
                        </div>
                      </div>
                    </InteractiveCard>
                  )}

                  {/* Remaining Projects Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {remainingProjects.map((project, idx) => (
                      <InteractiveCard
                        key={project.id}
                        as="article"
                        className="flex flex-col justify-between rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-xs hover:border-blue-300 hover:shadow-md transition-all"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
                            <span className="px-2.5 py-1 rounded-md bg-[#EFF6FF] text-[#1D4ED8] font-mono text-xs font-semibold">
                              {project.category.name}
                            </span>
                            <span className="font-mono text-xs text-[#475569]">
                              {project.year ?? `#${String(idx + 1).padStart(2, '0')}`}
                            </span>
                          </div>

                          <div className="space-y-2">
                            <h3 className="font-heading text-xl font-bold text-[#0F172A] leading-snug">
                              {project.title}
                            </h3>
                            <p className="text-sm text-[#475569] leading-relaxed line-clamp-3">
                              {project.shortDescription}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {project.techTags.slice(0, 4).map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-1 rounded-md bg-[#F1F5F9] font-mono text-xs text-[#334155]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-5 mt-5 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
                          {project.isFeatured ? (
                            <span className="font-mono text-xs font-semibold text-[#1D4ED8]">
                              Unggulan
                            </span>
                          ) : (
                            <span className="font-mono text-xs text-[#475569]">
                              {project.keyFeatures.length > 0
                                ? `${project.keyFeatures.length} Fitur`
                                : 'Studi Kasus'}
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            className="min-h-[42px] px-4 py-2 rounded-lg border border-[#E2E8F0] bg-[#FAFBFD] hover:bg-[#1D4ED8] hover:text-white hover:border-[#1D4ED8] text-[#0F172A] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Detail Proyek</span>
                          </button>
                        </div>
                      </InteractiveCard>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 2: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <motion.div
              key="certificates"
              role="tabpanel"
              id="port-panel-certificates"
              aria-labelledby="port-tab-certificates"
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.24 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {certificates.map((cert) => (
                <InteractiveCard
                  key={cert.id}
                  as="article"
                  className="flex flex-col justify-between rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-xs hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#EFF6FF] text-[#1D4ED8] font-mono text-xs font-semibold">
                        {cert.category}
                      </span>
                      <Award className="w-5 h-5 text-[#1D4ED8]" aria-hidden="true" />
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-heading text-xl font-bold text-[#0F172A] leading-snug">
                        {cert.title}
                      </h3>
                      <p className="font-mono text-xs font-semibold text-[#475569]">
                        {cert.issuer}
                      </p>
                    </div>

                    {cert.description && (
                      <p className="text-sm text-[#475569] leading-relaxed">{cert.description}</p>
                    )}
                  </div>

                  <div className="pt-4 mt-5 border-t border-[#E2E8F0] flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-[#475569]">
                      {cert.credentialNumber ? `ID: ${cert.credentialNumber}` : 'Terverifikasi'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className="min-h-[40px] px-3.5 py-1.5 rounded-lg border border-[#E2E8F0] bg-[#FAFBFD] hover:bg-[#1D4ED8] hover:text-white hover:border-[#1D4ED8] text-[#0F172A] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Detail</span>
                    </button>
                  </div>
                </InteractiveCard>
              ))}
            </motion.div>
          )}

          {/* TAB 3: TECH STACK */}
          {activeTab === 'techstack' && (
            <motion.div
              key="techstack"
              role="tabpanel"
              id="port-panel-techstack"
              aria-labelledby="port-tab-techstack"
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.24 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {(Object.keys(groupedTechs) as TechCategory[]).map((catKey) => {
                const items = groupedTechs[catKey];
                if (items.length === 0) return null;
                return (
                  <div
                    key={catKey}
                    className="rounded-xl border border-[#E2E8F0] bg-white p-6 space-y-4 shadow-xs"
                  >
                    <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                      <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1D4ED8]">
                        {TECH_CATEGORY_LABELS[catKey]}
                      </h3>
                      <span className="font-mono text-xs font-semibold text-[#475569]">
                        {items.length} Teknologi
                      </span>
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {items.map((tech) => (
                        <li
                          key={tech.id}
                          className="flex items-center gap-3 p-3 rounded-lg border border-[#E2E8F0] bg-[#FAFBFD]"
                        >
                          {tech.iconUrl ? (
                            <div className="w-9 h-9 rounded-md bg-white border border-[#E2E8F0] p-1.5 flex items-center justify-center shrink-0">
                              <Image
                                src={tech.iconUrl}
                                alt={`Logo ${tech.name}`}
                                width={24}
                                height={24}
                                unoptimized
                                className="w-full h-full object-contain"
                              />
                            </div>
                          ) : (
                            <div className="w-9 h-9 rounded-md bg-[#0F172A] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                              {tech.name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-heading text-sm font-bold text-[#0F172A] truncate">
                              {tech.name}
                            </p>
                            {tech.shortDescription && (
                              <p className="text-xs text-[#475569] truncate">
                                {tech.shortDescription}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <CertificateDetailModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}
