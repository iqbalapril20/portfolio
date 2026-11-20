'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

/**
 * Detects whether the active input device has a fine pointer (mouse/trackpad).
 */
export function useFinePointer(): boolean {
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(pointer: fine)');
    const sync = () => setHasFinePointer(mq.matches);
    sync();
    mq.addEventListener?.('change', sync);
    return () => mq.removeEventListener?.('change', sync);
  }, []);

  return hasFinePointer;
}

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
  as?: 'div' | 'section' | 'article' | 'header';
}

function getInitialOffset(direction: RevealDirection) {
  switch (direction) {
    case 'up':
      return { opacity: 0, y: 24, x: 0, scale: 1 };
    case 'down':
      return { opacity: 0, y: -24, x: 0, scale: 1 };
    case 'left':
      return { opacity: 0, x: -26, y: 0, scale: 1 };
    case 'right':
      return { opacity: 0, x: 26, y: 0, scale: 1 };
    case 'scale':
      return { opacity: 0, scale: 0.96, x: 0, y: 12 };
    case 'none':
    default:
      return { opacity: 0, x: 0, y: 0, scale: 1 };
  }
}

/**
 * Viewport-triggered directional reveal with reduced-motion fallback.
 */
export function ScrollReveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.55,
  amount = 0.08,
  once = false,
  as = 'div',
}: ScrollRevealProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const MotionTag = motion[as];

  if (shouldReduceMotion) {
    const StaticTag = as;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  return (
    <MotionTag
      initial={getInitialOffset(direction)}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggered list container and child items for editorial grids and timelines.
 */
export function StaggerList({
  children,
  className,
  staggerDelay = 0.06,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const shouldReduceMotion = Boolean(useReducedMotion());

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = Boolean(useReducedMotion());

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Physics-based 3D tilt card matching legacy/index4.html .tilt-card interaction.
 */
export function TiltCard({
  children,
  className = '',
  as = 'div',
  maxTiltDeg = 6,
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'article';
  maxTiltDeg?: number;
}) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const hasFinePointer = useFinePointer();
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springCfg = { stiffness: 220, damping: 24 };
  const smoothX = useSpring(mouseX, springCfg);
  const smoothY = useSpring(mouseY, springCfg);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [`${maxTiltDeg}deg`, `-${maxTiltDeg}deg`]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [`-${maxTiltDeg}deg`, `${maxTiltDeg}deg`]);

  const glareX = useTransform(smoothX, [-0.5, 0.5], ['15%', '85%']);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['15%', '85%']);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(29, 78, 216, 0.07), transparent 60%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !hasFinePointer || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const MotionTag = motion[as];

  return (
    <div className="[perspective:1000px] h-full w-full min-w-0">
      <MotionTag
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={hasFinePointer && !shouldReduceMotion ? { y: -4 } : undefined}
        style={
          shouldReduceMotion || !hasFinePointer
            ? undefined
            : { rotateX, rotateY, transformStyle: 'preserve-3d' }
        }
        className={`relative group min-w-0 w-full ${className}`}
      >
        {hasFinePointer && !shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            style={{ background: glareBackground }}
            aria-hidden="true"
          />
        )}
        {children}
      </MotionTag>
    </div>
  );
}
