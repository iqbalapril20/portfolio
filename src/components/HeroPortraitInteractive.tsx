'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Move, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useFinePointer } from './MotionPrimitives';

interface HeroPortraitInteractiveProps {
  imageUrl: string;
  fullName: string;
  brandMark: string;
  degreeLabel: string | null;
}

/**
 * Interactive Hero Portrait Stage:
 * 1. Draggable with mouse/touch and snaps back to origin with spring physics.
 * 2. Responds to pointer hover with 3D perspective tilt, counter-parallax layers, and specular sheen.
 * 3. Provides keyboard arrow nudge + reset button for WCAG 2.5.7 accessibility.
 */
export function HeroPortraitInteractive({
  imageUrl,
  fullName,
  brandMark,
  degreeLabel,
}: HeroPortraitInteractiveProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const hasFinePointer = useFinePointer();
  const stageRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized pointer coordinates [-0.5, 0.5] for hover tilt & parallax
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  // Drag / keyboard nudge position values
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 24, mass: 0.8 };
  const smoothPointerX = useSpring(pointerX, springConfig);
  const smoothPointerY = useSpring(pointerY, springConfig);

  // 3D tilt transforms driven by hover position
  const rotateX = useTransform(smoothPointerY, [-0.5, 0.5], ['9deg', '-9deg']);
  const rotateY = useTransform(smoothPointerX, [-0.5, 0.5], ['-9deg', '9deg']);

  // Multi-layer parallax translations
  const photoShiftX = useTransform(smoothPointerX, [-0.5, 0.5], ['-8px', '8px']);
  const photoShiftY = useTransform(smoothPointerY, [-0.5, 0.5], ['-8px', '8px']);
  const badgeShiftX = useTransform(smoothPointerX, [-0.5, 0.5], ['12px', '-12px']);
  const badgeShiftY = useTransform(smoothPointerY, [-0.5, 0.5], ['10px', '-10px']);

  // Pointer-tracked specular highlight
  const sheenX = useTransform(smoothPointerX, [-0.5, 0.5], ['15%', '85%']);
  const sheenY = useTransform(smoothPointerY, [-0.5, 0.5], ['15%', '85%']);
  const sheenBackground = useMotionTemplate`radial-gradient(circle at ${sheenX} ${sheenY}, rgba(255, 255, 255, 0.28), transparent 58%)`;

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
      dragX.set(0);
      dragY.set(0);
      pointerX.set(0);
      pointerY.set(0);
    }
  }

  function handleResetPosition() {
    dragX.set(0);
    dragY.set(0);
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div className="relative w-full max-w-[310px] sm:max-w-[340px] mx-auto select-none">
      {/* Static architectural anchor shadow frame behind draggable card */}
      <div
        className="absolute inset-3 rounded-2xl border border-dashed border-slate-300 bg-[#F1F5F9]/70 pointer-events-none"
        aria-hidden="true"
      />

      <div className="[perspective:1100px] relative z-10">
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
          whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
          whileDrag={{ scale: 1.03 }}
          style={{
            x: dragX,
            y: dragY,
            rotateX: shouldReduceMotion || !hasFinePointer ? 0 : rotateX,
            rotateY: shouldReduceMotion || !hasFinePointer ? 0 : rotateY,
            transformStyle: 'preserve-3d',
          }}
          className={`group relative rounded-2xl border border-[#E2E8F0] bg-white p-3.5 shadow-xl transition-shadow duration-300 ${
            isDragging
              ? 'cursor-grabbing shadow-2xl border-[#1D4ED8]/50'
              : shouldReduceMotion
                ? ''
                : 'cursor-grab hover:shadow-2xl hover:border-blue-300'
          }`}
        >
          {/* Header bar of architectural portrait frame */}
          <div className="flex items-center justify-between gap-2 pb-2.5 px-1">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-[#475569]">
              <Move className="w-3.5 h-3.5 text-[#1D4ED8]" aria-hidden="true" />
              <span>{isDragging ? 'Melepas untuk kembali...' : 'Geser atau arahkan mouse'}</span>
            </div>
            <span className="font-mono text-xs font-bold text-[#1D4ED8]">{brandMark}</span>
          </div>

          {/* Portrait image container with subtle parallax */}
          <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden border border-[#E2E8F0] bg-[#F1F5F9]">
            <motion.div
              style={
                shouldReduceMotion || !hasFinePointer
                  ? undefined
                  : { x: photoShiftX, y: photoShiftY, scale: isHovered ? 1.04 : 1.01 }
              }
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full"
            >
              <Image
                src={imageUrl}
                alt={`Foto profil resmi ${fullName}`}
                fill
                priority
                sizes="(max-width: 768px) 340px, 390px"
                draggable={false}
                className="object-cover object-top pointer-events-none"
              />
            </motion.div>

            {/* Specular sheen layer on pointer move */}
            {hasFinePointer && !shouldReduceMotion && (
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: sheenBackground }}
                aria-hidden="true"
              />
            )}
          </div>

          {/* Counter-parallax credential bar */}
          <motion.div
            style={
              shouldReduceMotion || !hasFinePointer
                ? undefined
                : { x: badgeShiftX, y: badgeShiftY }
            }
            className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-[#FAFBFD] px-3.5 py-2.5"
          >
            <div className="min-w-0">
              <p className="font-heading text-sm font-bold text-[#0F172A] truncate">{fullName}</p>
              <p className="font-mono text-[11px] text-[#475569] truncate">
                {degreeLabel || 'Full-Stack Web Developer'}
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetPosition}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label="Reset posisi kartu profil"
              title="Reset posisi"
              className="min-w-[36px] min-h-[36px] rounded-lg border border-[#E2E8F0] bg-white text-[#475569] hover:text-[#1D4ED8] hover:border-[#1D4ED8] flex items-center justify-center transition-colors shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
