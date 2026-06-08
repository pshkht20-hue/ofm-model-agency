import type { Transition, Variants } from 'framer-motion';

/** Primary easing — smooth luxury feel */
export const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

/** Snappy easing — stats, numbers, CTAs */
export const EASE_SNAPPY = [0.16, 1, 0.3, 1] as const;

/** Soft easing — testimonials, reviews */
export const EASE_SOFT = [0.25, 0.46, 0.45, 0.94] as const;

export const VIEWPORT_DEFAULT = { once: true, margin: '-60px' } as const;
export const VIEWPORT_TIGHT = { once: true, margin: '-40px' } as const;
export const VIEWPORT_LOOSE = { once: true, margin: '-80px' } as const;

export const SPRING_HOVER = { type: 'spring' as const, stiffness: 380, damping: 26 };
export const SPRING_CARD = { type: 'spring' as const, stiffness: 420, damping: 30 };

export const fadeUp = (distance = 24): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: EASE_SMOOTH },
  }),
});

export const fadeUpStatic: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_SMOOTH } },
};

/** Linear-style title reveal — desktop only (skip blur on mobile) */
export const titleReveal: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: EASE_SMOOTH },
  },
};

export const titleRevealMobile: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_SMOOTH } },
};

export const descReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.08, ease: EASE_SOFT },
  },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0.04): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

export const staggerItem = (distance = 28): Variants => ({
  hidden: { opacity: 0, y: distance, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.52, ease: EASE_SMOOTH },
  },
});

export const staggerItemTilt = (distance = 32): Variants => ({
  hidden: { opacity: 0, y: distance, rotateX: 6, transformPerspective: 800 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.58, ease: EASE_SMOOTH },
  },
});

export const staggerItemSlide = (distance = 24): Variants => ({
  hidden: { opacity: 0, x: distance },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.52, ease: EASE_SOFT },
  },
});

export const lineReveal: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.85, ease: EASE_SMOOTH },
  },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_SNAPPY },
  },
};

export const stepNumberReveal: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 22 },
  },
};

export const INSTANT_VARIANTS: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export function instantTransition(reduced: boolean | null): Transition {
  return reduced ? { duration: 0 } : { duration: 0.55, ease: EASE_SMOOTH };
}

export function motionSafe(
  reduced: boolean | null,
  animated: Variants,
  instant: Variants = INSTANT_VARIANTS,
): Variants {
  return reduced ? instant : animated;
}

export function hoverLift(reduced: boolean | null) {
  return reduced ? {} : { y: -4 };
}
