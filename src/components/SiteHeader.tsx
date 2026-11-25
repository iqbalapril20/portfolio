'use client';

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, Globe, Menu, Terminal, User, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getTranslations, type Locale } from '@/lib/i18n';
import { scrollToSection, type SectionId } from '@/lib/scroll';
import type { PortfolioTabKey } from './HeroSection';

interface SiteHeaderProps {
  brandMark: string;
  isAvailable: boolean;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  onJumpToTab: (tab: PortfolioTabKey) => void;
  onOpenCli: () => void;
}

const NAV_IDS: ReadonlyArray<SectionId> = ['top', 'about', 'portfolio', 'contact'];

type NavId = SectionId;

function LanguageSwitchPill({
  locale,
  onLocaleChange,
  ariaLabel,
}: {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  ariaLabel: string;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex items-center p-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-bold"
    >
      {(['id', 'en'] as const).map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => onLocaleChange(code)}
            aria-pressed={active}
            className={`px-2.5 py-1 rounded-full uppercase transition-colors ${
              active
                ? 'bg-white text-[#1d4ed8] border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 border border-transparent'
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}

export function SiteHeader({
  brandMark,
  isAvailable,
  locale,
  onLocaleChange,
  onJumpToTab,
  onOpenCli,
}: SiteHeaderProps) {
  const t = getTranslations(locale);
  const shouldReduceMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 30, restDelta: 0.001 });

  const [activeId, setActiveId] = useState<NavId>('top');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPinnedOpen, setIsPinnedOpen] = useState(false);
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const hoverCloseTimerRef = useRef<number | null>(null);

  const isCompact = isScrolled && !isHovered && !isPinnedOpen && !isFocusWithin && !mobileOpen;

  useEffect(() => {
    let rafId = 0;

    function detectScrollState() {
      setIsScrolled(window.scrollY > 80);

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
        detectScrollState();
      });
    }

    detectScrollState();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!isScrolled) {
      setIsPinnedOpen(false);
    }
  }, [isScrolled]);

  useEffect(() => {
    if (!isPinnedOpen && !mobileOpen) return;

    function onPointerDown(e: MouseEvent | TouchEvent) {
      const target = e.target as Node | null;
      if (headerRef.current && target && !headerRef.current.contains(target)) {
        setIsPinnedOpen(false);
        setMobileOpen(false);
        setIsHovered(false);
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsPinnedOpen(false);
        setMobileOpen(false);
        setIsHovered(false);
        mobileTriggerRef.current?.focus();
      }
    }

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isPinnedOpen, mobileOpen]);

  useEffect(() => {
    return () => {
      if (hoverCloseTimerRef.current !== null) {
        window.clearTimeout(hoverCloseTimerRef.current);
      }
    };
  }, []);

  function handleMouseEnter() {
    if (hoverCloseTimerRef.current !== null) {
      window.clearTimeout(hoverCloseTimerRef.current);
      hoverCloseTimerRef.current = null;
    }
    setIsHovered(true);
  }

  function handleMouseLeave() {
    if (hoverCloseTimerRef.current !== null) {
      window.clearTimeout(hoverCloseTimerRef.current);
    }
    hoverCloseTimerRef.current = window.setTimeout(() => {
      setIsHovered(false);
      hoverCloseTimerRef.current = null;
    }, 180);
  }

  function handleCompactActivate() {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setMobileOpen(true);
      setIsPinnedOpen(true);
      return;
    }
    setIsPinnedOpen(true);
  }

  function handleNavClick(id: SectionId) {
    setMobileOpen(false);
    setIsPinnedOpen(false);
    setIsHovered(false);
    setActiveId(id);
    if (id === 'portfolio') {
      onJumpToTab('projects');
      return;
    }
    scrollToSection(id);
  }

  return (
    <>
      {/* Top viewport scroll progress indicator */}
      {!shouldReduceMotion && (
        <motion.div
          style={{ scaleX }}
          className="fixed top-0 inset-x-0 z-[60] h-[2px] origin-left bg-[#1d4ed8] pointer-events-none"
          aria-hidden="true"
        />
      )}

      <header className="fixed top-3 sm:top-4 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none flex flex-col items-center">
        <div
          ref={headerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={() => setIsFocusWithin(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setIsFocusWithin(false);
            }
          }}
          className="pointer-events-auto w-full flex flex-col items-center"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isCompact ? (
              <motion.button
                key="compact-pill"
                type="button"
                onClick={handleCompactActivate}
                aria-expanded={false}
                aria-label={t.header.navAria}
                initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.92, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.94, y: -4 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="h-12 px-5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 hover:border-[#1d4ed8] inline-flex items-center gap-2.5 transition-colors"
              >
                <span className="font-heading font-extrabold text-lg tracking-tight text-slate-900 flex items-center gap-0.5">
                  <span className="text-[#1d4ed8]">&lt;</span>
                  {brandMark}
                  <span className="text-[#1d4ed8]">/&gt;</span>
                </span>
                {isAvailable && (
                  <span
                    className="inline-flex rounded-full h-2 w-2 bg-emerald-600 shrink-0"
                    aria-hidden="true"
                  />
                )}
              </motion.button>
            ) : (
              <motion.div
                key="expanded-pill"
                initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.97, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96, y: -4 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-6xl rounded-full bg-white/95 backdrop-blur-md border border-slate-200 px-4 sm:px-5 h-16 flex items-center justify-between gap-2 sm:gap-3"
              >
                {/* Logo & Availability Status */}
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={() => handleNavClick('top')}
                    aria-label={t.header.backHomeAria}
                    className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 flex items-center gap-0.5 hover:text-[#1d4ed8] transition-colors shrink-0"
                  >
                    <span className="text-[#1d4ed8]">&lt;</span>
                    {brandMark}
                    <span className="text-[#1d4ed8]">/&gt;</span>
                  </button>

                  {isAvailable && (
                    <div className="inline-flex md:hidden xl:inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/90 text-[#047857] text-[11px] font-semibold tracking-wider uppercase shrink-0">
                      <span
                        className="inline-flex rounded-full h-2 w-2 bg-emerald-600 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="hidden sm:inline">{t.header.availableFull}</span>
                      <span className="sm:hidden">{t.header.availableShort}</span>
                    </div>
                  )}
                </div>

                {/* Center Pill Nav Links */}
                <nav
                  aria-label={t.header.navAria}
                  className="hidden md:flex items-center gap-0.5 lg:gap-1 px-1.5 lg:px-2 py-1 rounded-full bg-slate-100/80 border border-slate-200/60 text-xs lg:text-sm font-medium text-slate-600 shrink-0"
                >
                  {NAV_IDS.map((navId) => {
                    const isActive = activeId === navId;
                    return (
                      <button
                        key={navId}
                        type="button"
                        onClick={() => handleNavClick(navId)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`relative px-3 lg:px-4 py-1.5 rounded-full transition-colors ${
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
                        <span className="relative z-10">{t.header.navItems[navId]}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Right Controls: Language Pill, CTA, Profile Icon & Mobile Menu */}
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex">
                    <LanguageSwitchPill
                      locale={locale}
                      onLocaleChange={onLocaleChange}
                      ariaLabel={t.header.switchLanguageAria}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleNavClick('contact')}
                    className="btn-glow hidden sm:inline-flex items-center justify-center px-4 lg:px-5 py-2 rounded-full bg-[#1d4ed8] text-white font-semibold text-xs lg:text-sm hover:bg-[#0d5bff] transition-colors min-h-[40px] whitespace-nowrap"
                  >
                    <span>{t.header.contactCta}</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 btn-icon-move" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavClick('about')}
                    aria-label={t.header.aboutAria}
                    title={t.header.aboutTitle}
                    className="hidden xl:flex w-10 h-10 rounded-full bg-slate-100 border border-slate-200 items-center justify-center text-slate-700 hover:bg-blue-50 hover:text-[#1d4ed8] transition-colors shrink-0"
                  >
                    <User className="w-[18px] h-[18px]" aria-hidden="true" />
                  </button>

                  <button
                    ref={mobileTriggerRef}
                    type="button"
                    onClick={() => setMobileOpen((prev) => !prev)}
                    aria-expanded={mobileOpen}
                    aria-controls="mobile-nav-drawer"
                    className="md:hidden inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-full border border-slate-200 bg-white text-slate-900 font-semibold text-xs hover:border-[#1d4ed8] transition-colors"
                  >
                    {mobileOpen ? (
                      <X className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Menu className="w-4 h-4" aria-hidden="true" />
                    )}
                    <span>{mobileOpen ? t.header.menuClose : t.header.menuOpen}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Floating Navigation Drawer */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.nav
                id="mobile-nav-drawer"
                aria-label={t.header.mobileNavAria}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="md:hidden mt-2 w-full max-w-6xl rounded-3xl border border-slate-200 bg-white/95 backdrop-blur-md px-4 py-4 space-y-2"
              >
                {NAV_IDS.map((navId) => {
                  const isActive = activeId === navId;
                  return (
                    <button
                      key={navId}
                      type="button"
                      onClick={() => handleNavClick(navId)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`w-full flex items-center justify-between min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-[#1d4ed8] border border-blue-200'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <span>{t.header.navItems[navId]}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#1d4ed8]" aria-hidden="true" />
                      )}
                    </button>
                  );
                })}

                <div className="pt-2 mt-2 border-t border-slate-200 flex items-center justify-between gap-2 px-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Globe className="w-4 h-4 text-[#1d4ed8]" aria-hidden="true" />
                    <span>{t.header.languageLabel}</span>
                  </div>
                  <LanguageSwitchPill
                    locale={locale}
                    onLocaleChange={onLocaleChange}
                    ariaLabel={t.header.switchLanguageAria}
                  />
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      setIsPinnedOpen(false);
                      onOpenCli();
                    }}
                    className="flex-1 min-h-[44px] px-4 py-2 rounded-full border border-slate-200 bg-slate-100 text-slate-900 font-mono text-xs font-semibold inline-flex items-center justify-center gap-2"
                  >
                    <Terminal className="w-4 h-4 text-[#1d4ed8]" aria-hidden="true" />
                    <span>{t.header.cliMode}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('contact')}
                    className="flex-1 min-h-[44px] px-4 py-2 rounded-full bg-[#1d4ed8] text-white text-xs font-semibold inline-flex items-center justify-center"
                  >
                    {t.header.contactCta}
                  </button>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
