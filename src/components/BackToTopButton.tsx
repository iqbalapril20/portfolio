'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

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
        <motion.a
          href="#top"
          aria-label="Kembali ke atas halaman"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-lg bg-white border border-[#E2E8F0] text-[#0F172A] shadow-lg hover:border-[#1D4ED8] hover:text-[#1D4ED8] flex items-center justify-center transition-colors"
        >
          <ArrowUp className="w-5 h-5" aria-hidden="true" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
