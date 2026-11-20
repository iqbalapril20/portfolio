'use client';

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight, Code2, Cpu, Database, Server } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  Certificate,
  Project,
  ProjectCategory,
  TechCategory,
  TechStack,
} from '@/types/portfolio';
import { CertificateDetailModal } from './CertificateDetailModal';
import type { PortfolioTabKey } from './HeroSection';
import { ScrollReveal, TiltCard } from './MotionPrimitives';
import { ProjectDetailModal } from './ProjectDetailModal';

interface PortfolioShowcaseProps {
  projects: Project[];
  categories: ProjectCategory[];
  certificates: Certificate[];
  techStacks: TechStack[];
  activeTab: PortfolioTabKey;
  onTabChange: (tab: PortfolioTabKey) => void;
}

const TECH_CATEGORY_META: Record<TechCategory, { label: string; icon: typeof Code2 }> = {
  FRONTEND: { label: 'Frontend Architecture', icon: Code2 },
  BACKEND: { label: 'Backend & REST API', icon: Server },
  DATABASE: { label: 'Database & ORM', icon: Database },
  TOOLS: { label: 'Tools, Adapter & IoT', icon: Cpu },
};

function HorizontalProjectTrack({
  projects,
  onSelectProject,
}: {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const wrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const [maxScrollX, setMaxScrollX] = useState(0);

  const measureOverflow = useCallback(() => {
    if (!viewportRef.current || !trackRef.current) return;
    const overflow = Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth);
    setMaxScrollX(overflow);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(min-width: 768px)');
    const sync = () => {
      setIsDesktopViewport(mq.matches);
      window.requestAnimationFrame(measureOverflow);
    };
    sync();
    mq.addEventListener?.('change', sync);
    window.addEventListener('resize', measureOverflow);
    return () => {
      mq.removeEventListener?.('change', sync);
      window.removeEventListener('resize', measureOverflow);
    };
  }, [measureOverflow]);

  useEffect(() => {
    const viewportEl = viewportRef.current;
    const trackEl = trackRef.current;
    if (!viewportEl || !trackEl) return;

    measureOverflow();
    const rafId = window.requestAnimationFrame(measureOverflow);
    const ro = new ResizeObserver(measureOverflow);
    ro.observe(viewportEl);
    ro.observe(trackEl);

    return () => {
      window.cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [projects.length, isDesktopViewport, measureOverflow]);

  const useStickyHorizontal = !shouldReduceMotion && isDesktopViewport && maxScrollX > 24;

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start 80px', 'end end'],
  });

  const translateX = useTransform(scrollYProgress, [0, 1], [0, -maxScrollX]);

  function scrollStep(direction: -1 | 1) {
    if (useStickyHorizontal && maxScrollX > 0 && wrapperRef.current) {
      const wrapTopAbs = wrapperRef.current.getBoundingClientRect().top + window.scrollY;
      const minY = wrapTopAbs - 80;
      const maxY = minY + maxScrollX;
      const nextY = Math.min(maxY, Math.max(minY, window.scrollY + direction * 410));
      window.scrollTo({
        top: nextY,
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
      });
      return;
    }
    if (viewportRef.current) {
      viewportRef.current.scrollBy({
        left: direction * 340,
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
      });
    }
  }

  return (
    <div
      ref={wrapperRef}
      style={
        useStickyHorizontal
          ? { height: `calc(100dvh - 5rem + ${maxScrollX}px)` }
          : undefined
      }
      className="relative"
    >
      <div
        className={
          useStickyHorizontal
            ? 'sticky top-20 h-[calc(100dvh-5rem)] flex flex-col justify-center gap-4'
            : 'space-y-4'
        }
      >
        {/* Horizontal Controls & Hint */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-xs font-semibold text-slate-600">
            {useStickyHorizontal
              ? `Scroll ke bawah untuk menggeser ${projects.length} proyek`
              : `Geser ke samping untuk melihat ${projects.length} proyek`}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollStep(-1)}
              aria-label="Geser proyek ke kiri"
              className="min-w-[40px] min-h-[40px] px-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#1d4ed8] hover:text-[#1d4ed8] inline-flex items-center justify-center transition-colors shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollStep(1)}
              aria-label="Geser proyek ke kanan"
              className="min-w-[40px] min-h-[40px] px-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#1d4ed8] hover:text-[#1d4ed8] inline-flex items-center justify-center transition-colors shadow-xs"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Horizontal Viewport Stage (overflow-x-clip keeps sticky scrolling locked) */}
        <div
          ref={viewportRef}
          className={
            useStickyHorizontal
              ? 'w-full overflow-x-clip py-2'
              : 'w-full overflow-x-auto pb-4 snap-x snap-mandatory'
          }
        >
          <motion.div
            ref={trackRef}
            style={useStickyHorizontal ? { x: translateX } : undefined}
            className="flex flex-nowrap gap-6 sm:gap-7 w-max"
          >
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className="w-[290px] sm:w-[350px] lg:w-[385px] shrink-0 snap-start"
              >
                <TiltCard className="h-full rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all overflow-hidden">
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    aria-label={`Lihat detail proyek ${project.title}`}
                    className="group w-full h-full text-left p-3.5 sm:p-4 flex flex-col gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]"
                  >
                    <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80">
                      {project.thumbnailUrl ? (
                        <Image
                          src={project.thumbnailUrl}
                          alt={`Pratinjau ${project.title}`}
                          fill
                          sizes="(max-width: 640px) 290px, 385px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-mono text-xs text-slate-500">
                          {String(idx + 1).padStart(2, '0')} {'//'} {project.title}
                        </div>
                      )}
                    </div>

                    <div className="px-1 pb-1">
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 group-hover:text-[#1d4ed8] transition-colors leading-snug line-clamp-2">
                        {project.title}
                      </h3>
                    </div>
                  </button>
                </TiltCard>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Horizontal Track Progress Indicator */}
        {useStickyHorizontal && (
          <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden" aria-hidden="true">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full w-full origin-left bg-[#1d4ed8]"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function PortfolioShowcase({
  projects,
  certificates,
  techStacks,
  activeTab,
  onTabChange,
}: PortfolioShowcaseProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const tabs: Array<{ key: PortfolioTabKey; label: string }> = [
    { key: 'projects', label: `Projects (${String(projects.length).padStart(2, '0')})` },
    {
      key: 'certificates',
      label: `Certifications (${String(certificates.length).padStart(2, '0')})`,
    },
    { key: 'techstack', label: `Tech Stack (${techStacks.length})` },
  ];

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
      className="scroll-mt-20 relative w-full py-16 sm:py-20 bg-slate-50/70 portfolio-watermark border-b border-slate-200/80 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Centered Header & Pill Switcher */}
        <ScrollReveal direction="up" className="text-center space-y-6 mb-10">
          <h2 className="font-heading font-bold text-3xl sm:text-5xl text-slate-900 tracking-tight">
            Portfolio
          </h2>

          <div
            role="tablist"
            aria-label="Kategori konten portofolio"
            className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-full bg-white border border-slate-200 shadow-xs mx-auto"
          >
            {tabs.map((tab) => {
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
                  className={`relative px-4 py-2 rounded-full text-xs font-bold transition-colors min-h-[40px] ${
                    isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId={shouldReduceMotion ? undefined : 'portfolio-tab-pill'}
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-[#1d4ed8] shadow-xs"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {/* PROJECTS TAB: Horizontal Row with Sticky Scroll-Driven Auto-Shift */}
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              role="tabpanel"
              id="port-panel-projects"
              aria-labelledby="port-tab-projects"
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
            >
              <HorizontalProjectTrack projects={projects} onSelectProject={setSelectedProject} />
            </motion.div>
          )}

          {/* CERTIFICATIONS TAB */}
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
                <TiltCard
                  key={cert.id}
                  as="article"
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl flex flex-col justify-between gap-4 h-full transition-shadow"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1d4ed8] flex items-center justify-center">
                      <Award className="w-7 h-7" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl text-slate-900 leading-snug">
                        {cert.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-600 mt-1">
                        {cert.issuer} · {cert.category}
                      </p>
                    </div>
                    {cert.description && (
                      <p className="text-sm text-[#475569] leading-relaxed">{cert.description}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
                    <span className="text-xs font-semibold text-[#1d4ed8]">
                      {cert.credentialNumber ? `ID: ${cert.credentialNumber}` : 'Terverifikasi'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className="min-h-[38px] px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#1d4ed8] text-slate-800 hover:text-white text-xs font-bold transition-colors"
                    >
                      Detail
                    </button>
                  </div>
                </TiltCard>
              ))}
            </motion.div>
          )}

          {/* TECH STACK TAB */}
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
                const Icon = TECH_CATEGORY_META[catKey].icon;
                return (
                  <TiltCard
                    key={catKey}
                    className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl flex flex-col gap-4 h-full transition-shadow"
                  >
                    <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1d4ed8] flex items-center justify-center">
                          <Icon className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <h3 className="font-heading font-bold text-xl text-slate-900">
                          {TECH_CATEGORY_META[catKey].label}
                        </h3>
                      </div>
                      <span className="font-mono text-xs font-semibold text-slate-600">
                        {items.length} Tech
                      </span>
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {items.map((tech) => (
                        <li
                          key={tech.id}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80"
                        >
                          {tech.iconUrl ? (
                            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0">
                              <Image
                                src={tech.iconUrl}
                                alt={`Logo ${tech.name}`}
                                width={22}
                                height={22}
                                unoptimized
                                className="w-full h-full object-contain"
                              />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                              {tech.name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-heading text-sm font-bold text-slate-900 truncate">
                              {tech.name}
                            </p>
                            {tech.shortDescription && (
                              <p className="text-[11px] text-slate-600 truncate">
                                {tech.shortDescription}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </TiltCard>
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
