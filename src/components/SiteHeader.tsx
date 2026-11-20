'use client';

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, Menu, Terminal, User, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { scrollToSection, type SectionId } from '@/lib/scroll';
import type { PortfolioTabKey } from './HeroSection';

interface SiteHeaderProps {
  brandMark: string;
  isAvailable: boolean;
  onJumpToTab: (tab: PortfolioTabKey) => void;
  onOpenCli: () => void;
}

const NAV_ITEMS: ReadonlyArray<{ id: SectionId; label: string }> = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
];

type NavId = (typeof NAV_ITEMS)[number]['id'];

export function SiteHeader({
  brandMark,
  isAvailable,
  onJumpToTab,
  onOpenCli,
}: SiteHeaderProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 30, restDelta: 0.001 });

  const [activeId, setActiveId] = useState<NavId>('top');
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let rafId = 0;

    function detectSection() {
      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (docHeight - scrollBottom <= 60) {
        setActiveId('contact');
        return;
      }

      const probeY = 140;
      const sections: Array<'top' | 'about' | 'portfolio' | 'contact'> = [
        'top',
        'about',
        'portfolio',
        'contact',
      ];
      let current: NavId = 'top';
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= probeY) {
          current = sec;
        }
      }
      setActiveId(current);
    }

    function onScroll() {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        detectSection();
      });
    }

    detectSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        mobileTriggerRef.current?.focus();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  function handleNavClick(item: (typeof NAV_ITEMS)[number]) {
    setMobileOpen(false);
    setActiveId(item.id);
    if (item.id === 'portfolio') {
      onJumpToTab('projects');
      return;
    }
    scrollToSection(item.id);
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto h-20 px-4 sm:px-8 flex items-center justify-between gap-3">
        {/* Logo & Availability Status matching legacy/index4.html */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <button
            type="button"
            onClick={() => scrollToSection('top')}
            aria-label="Kembali ke beranda"
            className="font-heading font-extrabold text-2xl tracking-tight text-slate-900 flex items-center gap-0.5 hover:text-[#1d4ed8] transition-colors shrink-0"
          >
            <span className="text-[#1d4ed8]">&lt;</span>
            {brandMark}
            <span className="text-[#1d4ed8]">/&gt;</span>
          </button>

          {isAvailable && (
            <div className="inline-flex md:hidden xl:inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/90 text-[#047857] text-[11px] sm:text-xs font-semibold tracking-wider uppercase shrink-0">
              <span className="inline-flex rounded-full h-2 w-2 bg-emerald-600 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">Available for work</span>
              <span className="sm:hidden">Available</span>
            </div>
          )}
        </div>

        {/* Center Pill Nav Links matching legacy/index4.html */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden md:flex items-center gap-0.5 lg:gap-1.5 px-2 lg:px-3 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/60 text-xs lg:text-sm font-medium text-slate-600 shrink-0"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative px-3.5 lg:px-4.5 py-1.5 rounded-full transition-all ${
                  isActive
                    ? 'text-slate-900 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId={shouldReduceMotion ? undefined : 'header-nav-pill'}
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-white border border-slate-200/80"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button, Profile Icon & Mobile Drawer Trigger */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="btn-glow hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#1d4ed8] text-white font-semibold text-sm hover:bg-[#0d5bff] transition-colors min-h-[44px]"
          >
            <span>Hubungi Saya</span>
            <ArrowRight className="w-4 h-4 ml-1.5 btn-icon-move" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('about')}
            aria-label="Tentang Muchammad Iqbal Aprilianto"
            title="Tentang Iqbal"
            className="hidden sm:flex w-10 h-10 rounded-full bg-slate-100 border border-slate-200 items-center justify-center text-slate-700 hover:bg-blue-50 hover:text-[#1d4ed8] transition-colors"
          >
            <User className="w-[18px] h-[18px]" aria-hidden="true" />
          </button>

          <button
            ref={mobileTriggerRef}
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            className="md:hidden inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-full border border-slate-200 bg-white text-slate-900 font-semibold text-xs hover:border-[#1d4ed8] transition-colors"
          >
            {mobileOpen ? (
              <X className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Menu className="w-4 h-4" aria-hidden="true" />
            )}
            <span>{mobileOpen ? 'Tutup' : 'Menu'}</span>
          </button>
        </div>
      </div>

      {/* Scroll progress indicator */}
      {!shouldReduceMotion && (
        <motion.div
          style={{ scaleX }}
          className="h-[2px] w-full origin-left bg-[#1d4ed8] pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-nav-drawer"
            aria-label="Navigasi Mobile"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full flex items-center justify-between min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-[#1d4ed8] border border-blue-200'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#1d4ed8]" aria-hidden="true" />
                  )}
                </button>
              );
            })}

            <div className="pt-2 mt-2 border-t border-slate-200 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenCli();
                }}
                className="flex-1 min-h-[44px] px-4 py-2 rounded-full border border-slate-200 bg-slate-100 text-slate-900 font-mono text-xs font-semibold inline-flex items-center justify-center gap-2"
              >
                <Terminal className="w-4 h-4 text-[#1d4ed8]" aria-hidden="true" />
                <span>CLI Mode</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  scrollToSection('contact');
                }}
                className="flex-1 min-h-[44px] px-4 py-2 rounded-full bg-[#1d4ed8] text-white text-xs font-semibold inline-flex items-center justify-center"
              >
                Hubungi Saya
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
