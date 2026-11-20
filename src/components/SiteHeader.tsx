'use client';

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Menu, Terminal, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface SiteHeaderProps {
  brandMark: string;
  isAvailable: boolean;
  availabilityText: string;
  onOpenCli: () => void;
}

const NAV_ITEMS = [
  { id: 'top', label: 'Beranda', href: '#top' },
  { id: 'about', label: 'Tentang', href: '#about' },
  { id: 'portfolio', label: 'Portofolio', href: '#portfolio' },
  { id: 'contact', label: 'Kontak', href: '#contact' },
] as const;

type NavId = (typeof NAV_ITEMS)[number]['id'];

export function SiteHeader({
  brandMark,
  isAvailable,
  availabilityText,
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
      let current: NavId = 'top';
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= probeY) {
          current = item.id;
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

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white/92 backdrop-blur-md border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto h-16 sm:h-20 px-4 sm:px-8 flex items-center justify-between gap-3">
        {/* Brand & Availability Status */}
        <div className="flex items-center gap-3 min-w-0">
          <a
            href="#top"
            className="font-heading font-extrabold text-2xl tracking-tight text-[#0F172A] hover:text-[#1D4ED8] transition-colors shrink-0 py-1"
          >
            <span className="text-[#1D4ED8]">&lt;</span>
            {brandMark}
            <span className="text-[#1D4ED8]">/&gt;</span>
          </a>

          {isAvailable && (
            <div className="hidden lg:inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#ECFDF5] border border-emerald-200 text-[#047857] text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-[#047857] shrink-0" aria-hidden="true" />
              <span className="truncate max-w-[260px]">{availabilityText}</span>
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden md:flex items-center gap-1 p-1 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                  isActive ? 'text-[#0F172A]' : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId={shouldReduceMotion ? undefined : 'header-nav-pill'}
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    className="absolute inset-0 rounded-md bg-white border border-[#E2E8F0] shadow-xs"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Actions & Mobile Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenCli}
            aria-label="Buka terminal interaktif CLI"
            className="hidden sm:inline-flex min-h-[44px] px-3.5 py-2 rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] text-[#0F172A] hover:border-[#1D4ED8] hover:text-[#1D4ED8] font-mono text-xs font-semibold items-center gap-1.5 transition-colors"
          >
            <Terminal className="w-4 h-4 text-[#1D4ED8]" aria-hidden="true" />
            <span>CLI</span>
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex min-h-[44px] px-5 py-2 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] active:scale-[0.99] text-white text-sm font-semibold items-center justify-center transition-all"
          >
            Hubungi Saya
          </a>

          <button
            ref={mobileTriggerRef}
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            className="md:hidden inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] font-semibold text-xs hover:border-[#1D4ED8] transition-colors"
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
          className="h-[2px] w-full origin-left bg-[#1D4ED8] pointer-events-none"
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
            className="md:hidden border-t border-[#E2E8F0] bg-white px-4 py-4 space-y-2 shadow-lg"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center justify-between min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200'
                      : 'text-[#334155] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" aria-hidden="true" />
                  )}
                </a>
              );
            })}

            <div className="pt-2 mt-2 border-t border-[#E2E8F0] flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenCli();
                }}
                className="flex-1 min-h-[44px] px-4 py-2 rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] text-[#0F172A] font-mono text-xs font-semibold inline-flex items-center justify-center gap-2"
              >
                <Terminal className="w-4 h-4 text-[#1D4ED8]" aria-hidden="true" />
                <span>Buka Mode CLI</span>
              </button>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="flex-1 min-h-[44px] px-4 py-2 rounded-lg bg-[#1D4ED8] text-white text-xs font-semibold inline-flex items-center justify-center"
              >
                Hubungi Saya
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
