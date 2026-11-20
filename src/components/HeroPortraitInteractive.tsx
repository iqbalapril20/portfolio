'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Code2, Move, RotateCcw, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useFinePointer } from './MotionPrimitives';

interface HeroPortraitInteractiveProps {
  imageUrl: string;
  fullName: string;
  degreeLabel: string | null;
}

/**
 * Interactive Hero Portrait Stage styled after legacy/index4.html (radar rings + floating badges)
 * combined with draggable spring snap-back and 3D hover parallax.
 */
export function HeroPortraitInteractive({
  imageUrl,
  fullName,
  degreeLabel,
}: HeroPortraitInteractiveProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const hasFinePointer = useFinePointer();
  const stageRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 24, mass: 0.8 };
  const smoothPointerX = useSpring(pointerX, springConfig);
  const smoothPointerY = useSpring(pointerY, springConfig);

  const rotateX = useTransform(smoothPointerY, [-0.5, 0.5], ['9deg', '-9deg']);
  const rotateY = useTransform(smoothPointerX, [-0.5, 0.5], ['-9deg', '9deg']);

  const photoShiftX = useTransform(smoothPointerX, [-0.5, 0.5], ['-8px', '8px']);
  const photoShiftY = useTransform(smoothPointerY, [-0.5, 0.5], ['-8px', '8px']);
  const badgeShiftX = useTransform(smoothPointerX, [-0.5, 0.5], ['12px', '-12px']);
  const badgeShiftY = useTransform(smoothPointerY, [-0.5, 0.5], ['10px', '-10px']);

  const sheenX = useTransform(smoothPointerX, [-0.5, 0.5], ['15%', '85%']);
  const sheenY = useTransform(smoothPointerY, [-0.5, 0.5], ['15%', '85%']);
  const sheenBackground = useMotionTemplate`radial-gradient(circle at ${sheenX} ${sheenY}, rgba(255, 255, 255, 0.24), transparent 58%)`;

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !hasFinePointer || isDragging || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    setIsHovered(false);
    pointerX.set(0);
    pointerY.set(0);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (shouldReduceMotion) return;
    const step = 12;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      dragX.set(Math.max(-36, dragX.get() - step));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      dragX.set(Math.min(36, dragX.get() + step));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      dragY.set(Math.max(-36, dragY.get() - step));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      dragY.set(Math.min(36, dragY.get() + step));
    } else if (e.key === '0' || e.key.toLowerCase() === 'r') {
      handleResetPosition();
    }
  }

  function handleResetPosition() {
    dragX.set(0);
    dragY.set(0);
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[400px] mx-auto flex items-center justify-center py-4 select-none">
      {/* Circular technical radar / orbit rings from legacy/index4.html */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div
          className={`w-72 h-72 sm:w-88 sm:h-88 rounded-full border border-blue-300/50 ${
            shouldReduceMotion ? '' : 'animate-[spin_40s_linear_infinite]'
          }`}
        />
        <div className="absolute w-60 h-60 sm:w-72 sm:h-72 rounded-full border border-dashed border-blue-400/45" />
        <div className="absolute w-44 h-44 rounded-full bg-blue-100/60 blur-2xl" />
      </div>

      {/* Draggable + 3D Hover Portrait Card */}
      <div className="[perspective:1100px] relative z-10 w-[275px] sm:w-[310px]">
        <motion.div
          ref={stageRef}
          tabIndex={0}
          role="region"
          aria-label={`Kartu foto interaktif ${fullName}. Bisa digeser dengan mouse atau tombol panah keyboard.`}
          onKeyDown={handleKeyDown}
          drag={!shouldReduceMotion}
          dragConstraints={{ top: -40, bottom: 40, left: -40, right: 40 }}
          dragElastic={0.35}
          dragSnapToOrigin
          dragTransition={{ bounceStiffness: 320, bounceDamping: 22 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          onPointerEnter={() => setIsHovered(true)}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
          whileDrag={{ scale: 1.04 }}
          style={{
            x: dragX,
            y: dragY,
            rotateX: shouldReduceMotion || !hasFinePointer ? 0 : rotateX,
            rotateY: shouldReduceMotion || !hasFinePointer ? 0 : rotateY,
            transformStyle: 'preserve-3d',
          }}
          className={`group relative rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/10 transition-shadow duration-300 ${
            isDragging
              ? 'cursor-grabbing ring-4 ring-blue-500/20'
              : shouldReduceMotion
                ? ''
                : 'cursor-grab hover:border-blue-400/70'
          }`}
        >
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-100">
            <motion.div
              style={
                shouldReduceMotion || !hasFinePointer
                  ? undefined
                  : { x: photoShiftX, y: photoShiftY, scale: isHovered ? 1.05 : 1.01 }
              }
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full"
            >
              <Image
                src={imageUrl}
                alt={`Foto studio ${fullName}`}
                fill
                priority
                sizes="(max-width: 768px) 280px, 310px"
                draggable={false}
                className="object-cover object-top pointer-events-none"
              />
            </motion.div>

            {/* Specular sheen overlay */}
            {hasFinePointer && !shouldReduceMotion && (
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: sheenBackground }}
                aria-hidden="true"
              />
            )}

            {/* Unobstructed top-left drag hint & bottom-right reset control */}
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 border border-slate-200/90 text-[10px] font-mono font-semibold text-slate-700 shadow-xs">
                <Move className="w-3 h-3 text-[#1d4ed8]" aria-hidden="true" />
                <span>
                  {isDragging ? (
                    'Lepas'
                  ) : (
                    <>
                      Geser<span className="hidden sm:inline"> / Hover</span>
                    </>
                  )}
                </span>
              </span>
            </div>

            <button
              type="button"
              onClick={handleResetPosition}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label="Reset posisi kartu profil"
              title="Reset posisi"
              className="absolute bottom-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 border border-slate-200/90 text-slate-700 hover:text-[#1d4ed8] hover:border-blue-400 flex items-center justify-center transition-colors shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Badge Top Right (real degree from DB, parallax + float matching index4.html) */}
      <motion.div
        style={
          shouldReduceMotion || !hasFinePointer ? undefined : { x: badgeShiftX, y: badgeShiftY }
        }
        className={`absolute -top-3 right-0 sm:top-2 sm:-right-2 z-20 px-3.5 py-2 rounded-xl bg-white shadow-lg border border-slate-200/90 flex items-center gap-2 ${
          shouldReduceMotion ? '' : 'animate-float-slow'
        }`}
      >
        <ShieldCheck className="w-5 h-5 text-[#1d4ed8] shrink-0" aria-hidden="true" />
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-900 leading-tight">
            {degreeLabel || 'Sarjana Komputer'}
          </span>
          <span className="text-[10px] text-slate-600 leading-none mt-0.5">Teknik Informatika</span>
        </div>
      </motion.div>

      {/* Floating Badge Bottom Left (real role from DB) */}
      <motion.div
        style={
          shouldReduceMotion || !hasFinePointer ? undefined : { x: badgeShiftX, y: badgeShiftY }
        }
        className={`absolute bottom-2 left-0 sm:-left-2 z-20 px-3.5 py-2 rounded-xl bg-white shadow-lg border border-slate-200/90 flex items-center gap-2.5 ${
          shouldReduceMotion ? '' : 'animate-float-reverse'
        }`}
      >
        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-[#1d4ed8] shrink-0">
          <Code2 className="w-4 h-4" aria-hidden="true" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-900 leading-tight">Full-Stack Web</span>
          <span className="text-[10px] text-slate-600 leading-none mt-0.5">
            Next.js &amp; Laravel
          </span>
        </div>
      </motion.div>
    </div>
  );
}
