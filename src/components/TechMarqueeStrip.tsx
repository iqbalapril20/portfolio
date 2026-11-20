'use client';

import { Pause, Play } from 'lucide-react';
import { useState } from 'react';
import type { TechStack } from '@/types/portfolio';

interface TechMarqueeStripProps {
  techStacks: TechStack[];
}

export function TechMarqueeStrip({ techStacks }: TechMarqueeStripProps) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="w-full bg-[#0F172A] text-slate-200 border-b border-slate-800 py-3.5"
      aria-label="Daftar teknologi yang dikuasai"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          aria-label={isPaused ? 'Jalankan marquee teknologi' : 'Jeda marquee teknologi'}
          aria-pressed={isPaused}
          className="min-w-[40px] min-h-[36px] px-2.5 rounded-md border border-slate-700 bg-slate-800 text-slate-200 hover:border-blue-400 hover:text-white inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold shrink-0 transition-colors"
        >
          {isPaused ? (
            <Play className="w-3 h-3" aria-hidden="true" />
          ) : (
            <Pause className="w-3 h-3" aria-hidden="true" />
          )}
          <span className="hidden sm:inline">{isPaused ? 'Jalan' : 'Jeda'}</span>
        </button>

        <div
          className="marquee-wrapper flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
          data-paused={isPaused ? 'true' : 'false'}
        >
          <div className="marquee-track items-center gap-7 font-mono text-xs tracking-wider uppercase font-semibold text-slate-300">
            <div className="flex items-center gap-7 shrink-0 pr-7">
              {techStacks.map((tech) => (
                <span key={`a-${tech.id}`} className="inline-flex items-center gap-2.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" aria-hidden="true" />
                  <span>{tech.name}</span>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-7 shrink-0 pr-7" aria-hidden="true">
              {techStacks.map((tech) => (
                <span key={`b-${tech.id}`} className="inline-flex items-center gap-2.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>{tech.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
