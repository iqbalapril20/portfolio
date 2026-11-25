'use client';

import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getTranslations, type Locale } from '@/lib/i18n';

interface VisitorCounterProps {
  locale: Locale;
}

const SESSION_KEY = 'iqbal_portfolio_visit_counted';

export function VisitorCounter({ locale }: VisitorCounterProps) {
  const t = getTranslations(locale);
  const [count, setCount] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    async function syncVisitorCount() {
      let alreadyCounted = false;
      try {
        alreadyCounted = window.sessionStorage.getItem(SESSION_KEY) === '1';
      } catch {
        alreadyCounted = false;
      }

      try {
        const response = await fetch('/api/visitors', {
          method: alreadyCounted ? 'GET' : 'POST',
          cache: 'no-store',
        });

        if (!response.ok) return;
        const payload = (await response.json()) as { count?: number | null };

        if (active && typeof payload.count === 'number') {
          setCount(payload.count);
          if (!alreadyCounted) {
            try {
              window.sessionStorage.setItem(SESSION_KEY, '1');
            } catch {
              // Ignore sessionStorage restrictions
            }
          }
        }
      } catch {
        // Silently degrade if offline
      } finally {
        if (active) {
          setLoaded(true);
        }
      }
    }

    void syncVisitorCount();

    return () => {
      active = false;
    };
  }, []);

  if (loaded && count === null) {
    return null;
  }

  const formattedCount =
    count !== null
      ? new Intl.NumberFormat(locale === 'id' ? 'id-ID' : 'en-US').format(count)
      : '...';

  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700"
      aria-label={t.footer.visitorAriaLabel}
    >
      <span
        className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"
        aria-hidden="true"
      />
      <Eye className="w-3.5 h-3.5 text-slate-500 shrink-0" aria-hidden="true" />
      <span className="tabular-nums font-semibold text-slate-900">{formattedCount}</span>
      <span className="text-slate-600">{t.footer.visitorSuffix}</span>
    </div>
  );
}
