'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { scrollToSection } from '@/lib/scroll';

export function BackToTopButton() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 420);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => scrollToSection('top')}
          aria-label="Kembali ke atas halaman"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
          whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.05 }}
          transition={{ duration: 0.22 }}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-white border border-slate-300 text-slate-700 shadow-lg flex items-center justify-center hover:bg-blue-50 hover:text-[#1d4ed8] transition-colors"
        >
          <ArrowUp className="w-5 h-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
