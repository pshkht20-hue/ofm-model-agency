'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useMotionPreferences';
import {
  EASE_SMOOTH,
  INSTANT_VARIANTS,
  VIEWPORT_DEFAULT,
  VIEWPORT_TIGHT,
  fadeUpStatic,
  staggerContainer,
  staggerItem,
  staggerItemSlide,
  staggerItemTilt,
} from '@/lib/motion';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: 'div' | 'section';
  distance?: number;
};

export function Reveal({
  children,
  className = '',
  delay = 0,
  duration = 0.55,
  as = 'div',
  distance = 24,
}: RevealProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const variants: Variants = {
    hidden: { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_DEFAULT}
      transition={{ duration, delay, ease: EASE_SMOOTH }}
      variants={variants}
      className={className}
    >
      {children}
    </Component>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  variant?: 'default' | 'tilt' | 'slide';
};

export function StaggerGrid({
  children,
  className = '',
  stagger = 0.08,
  variant = 'default',
}: StaggerProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_TIGHT}
      variants={staggerContainer(stagger)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
  variant = 'default',
}: {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'tilt' | 'slide';
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const variants =
    variant === 'tilt'
      ? staggerItemTilt()
      : variant === 'slide'
        ? staggerItemSlide()
        : staggerItem();

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

export function MotionFade({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_DEFAULT}
      variants={fadeUpStatic}
      transition={{ delay, ease: EASE_SMOOTH }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionLine({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className} aria-hidden />;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={INSTANT_VARIANTS}
      transition={{ duration: 0.85, delay, ease: EASE_SMOOTH }}
      className={className}
      style={{ transformOrigin: 'center' }}
      aria-hidden
    />
  );
}
