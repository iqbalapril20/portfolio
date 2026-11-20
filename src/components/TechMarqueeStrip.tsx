'use client';

import { Pause, Play } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import type { TechStack } from '@/types/portfolio';

interface TechMarqueeStripProps {
  techStacks: TechStack[];
}

function MarqueeLogoItem({ tech }: { tech: TechStack }) {
  return (
    <div
      title={tech.name}
      aria-label={tech.name}
      className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/95 border border-slate-700/40 p-2 flex items-center justify-center shadow-sm shrink-0 transition-transform duration-200 hover:scale-110"
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

export function TechMarqueeStrip({ techStacks }: TechMarqueeStripProps) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="w-full bg-[#0F172A] text-slate-200 border-b border-slate-800 py-4"
      aria-label="Logo teknologi yang dikuasai"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          aria-label={isPaused ? 'Jalankan marquee teknologi' : 'Jeda marquee teknologi'}
          aria-pressed={isPaused}
          className="min-w-[40px] min-h-[38px] px-3 rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:border-blue-400 hover:text-white inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold shrink-0 transition-colors"
        >
          {isPaused ? (
            <Play className="w-3.5 h-3.5" aria-hidden="true" />
          ) : (
            <Pause className="w-3.5 h-3.5" aria-hidden="true" />
          )}
          <span className="hidden sm:inline">{isPaused ? 'Jalan' : 'Jeda'}</span>
        </button>

        <div
          className="marquee-wrapper min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
          data-paused={isPaused ? 'true' : 'false'}
        >
          <div className="marquee-track items-center gap-5 sm:gap-6">
            <div className="flex items-center gap-5 sm:gap-6 shrink-0 pr-5 sm:pr-6">
              {techStacks.map((tech) => (
                <MarqueeLogoItem key={`a-${tech.id}`} tech={tech} />
              ))}
            </div>
            <div className="flex items-center gap-5 sm:gap-6 shrink-0 pr-5 sm:pr-6" aria-hidden="true">
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
