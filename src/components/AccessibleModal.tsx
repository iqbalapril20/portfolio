'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import React, { useEffect, useId, useRef } from 'react';

interface AccessibleModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  maxWidthClass?: string;
  closeLabel?: string;
  darkSurface?: boolean;
  children: React.ReactNode;
}

/**
 * Accessible dialog with focus trapping, Escape key closing, and focus restoration (R-26, R-32).
 */
export function AccessibleModal({
  open,
  onClose,
  title,
  eyebrow,
  maxWidthClass = 'max-w-2xl',
  closeLabel = 'Tutup dialog',
  darkSurface = false,
  children,
}: AccessibleModalProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      const container = dialogRef.current;
      if (!container) return;
      const focusables = container.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length > 0) {
        focusables[0].focus();
      } else {
        container.focus();
      }
    }, 30);

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0F172A]/55 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className={`relative z-10 w-full ${maxWidthClass} max-h-[90dvh] overflow-y-auto rounded-2xl border shadow-sm ${
              darkSurface
                ? 'bg-[#0F172A] border-slate-700 text-slate-100'
                : 'bg-white border-[#E2E8F0] text-[#0F172A]'
            }`}
          >
            <div
              className={`sticky top-0 z-20 flex items-start justify-between gap-4 px-5 sm:px-7 py-4 border-b ${
                darkSurface
                  ? 'bg-[#0F172A] border-slate-800'
                  : 'bg-white border-[#E2E8F0]'
              }`}
            >
              <div className="min-w-0 space-y-1">
                {eyebrow && (
                  <p
                    className={`font-mono text-xs font-medium tracking-wide uppercase ${
                      darkSurface ? 'text-blue-400' : 'text-[#1D4ED8]'
                    }`}
                  >
                    {eyebrow}
                  </p>
                )}
                <h2
                  id={titleId}
                  className={`font-heading text-xl sm:text-2xl font-bold leading-snug ${
                    darkSurface ? 'text-white' : 'text-[#0F172A]'
                  }`}
                >
                  {title}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label={closeLabel}
                className={`min-w-[44px] min-h-[44px] -mr-1.5 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                  darkSurface
                    ? 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:border-slate-500'
                    : 'border-[#E2E8F0] bg-[#F1F5F9] text-[#475569] hover:text-[#0F172A] hover:border-slate-300'
                }`}
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="p-5 sm:p-7">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
