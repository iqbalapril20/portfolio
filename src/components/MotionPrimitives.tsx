'use client';

import { motion, useReducedMotion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

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
      return { opacity: 0, y: 22, x: 0, scale: 1 };
    case 'down':
      return { opacity: 0, y: -22, x: 0, scale: 1 };
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
  duration = 0.5,
  amount = 0.12,
  once = true,
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
 * Subtle tactile hover lift for interactive cards on pointer devices.
 */
export function InteractiveCard({
  children,
  className,
  as = 'div',
  hoverY = -4,
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'article';
  hoverY?: number;
}) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const hasFinePointer = useFinePointer();
  const MotionTag = motion[as];

  return (
    <MotionTag
      whileHover={hasFinePointer && !shouldReduceMotion ? { y: hoverY } : undefined}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
