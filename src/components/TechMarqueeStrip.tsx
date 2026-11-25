'use client';

import Image from 'next/image';
import { getTranslations, type Locale } from '@/lib/i18n';
import type { TechStack } from '@/types/portfolio';

interface TechMarqueeStripProps {
  techStacks: TechStack[];
  locale: Locale;
}

function MarqueeLogoItem({ tech }: { tech: TechStack }) {
  return (
    <div
      title={tech.name}
      aria-label={tech.name}
      className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/95 border border-slate-700/40 p-2 flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-110"
    >
      {tech.iconUrl ? (
        <Image
          src={tech.iconUrl}
          alt={tech.name}
          width={28}
          height={28}
          unoptimized
          className="w-full h-full object-contain"
        />
      ) : (
        <span className="font-mono text-xs font-bold text-slate-900">
          {tech.name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}

export function TechMarqueeStrip({ techStacks, locale }: TechMarqueeStripProps) {
  const t = getTranslations(locale);

  return (
    <div
      className="w-full bg-[#0F172A] text-slate-200 border-b border-slate-800 py-4"
      aria-label={t.marquee.regionAria}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="marquee-wrapper w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
          <div className="marquee-track items-center gap-5 sm:gap-6">
            <div className="flex items-center gap-5 sm:gap-6 shrink-0 pr-5 sm:pr-6">
              {techStacks.map((tech) => (
                <MarqueeLogoItem key={`a-${tech.id}`} tech={tech} />
              ))}
            </div>
            <div
              className="flex items-center gap-5 sm:gap-6 shrink-0 pr-5 sm:pr-6"
              aria-hidden="true"
            >
              {techStacks.map((tech) => (
                <MarqueeLogoItem key={`b-${tech.id}`} tech={tech} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
