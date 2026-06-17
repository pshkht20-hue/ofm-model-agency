'use client';

import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { EASE_SMOOTH, EASE_SNAPPY, SPRING_HOVER, VIEWPORT_TIGHT, fadeUpStatic } from '@/lib/motion';

export type StatAccent = 'pink' | 'cyan' | 'violet';

type AnimatedStatProps = {
  number: number;
  suffix?: ReactNode;
  prefix?: ReactNode;
  label: string;
  hint?: string;
  icon?: LucideIcon;
  decimals?: number;
  index?: number;
  accent?: StatAccent;
  /** Parent-orchestrated entrance (Stats GSAP timeline) */
  triggered?: boolean;
};

const accentGlow: Record<StatAccent, string> = {
  pink: 'rgba(255, 91, 181, 0.35)',
  cyan: 'rgba(0, 212, 255, 0.35)',
  violet: 'rgba(168, 85, 247, 0.35)',
};

const accentBorder: Record<StatAccent, string> = {
  pink: 'group-hover:border-accent-pink/35 group-hover:shadow-[0_0_40px_-12px_rgba(255,91,181,0.45)]',
  cyan: 'group-hover:border-accent-cyan/35 group-hover:shadow-[0_0_40px_-12px_rgba(0,212,255,0.4)]',
  violet: 'group-hover:border-accent-violet/35 group-hover:shadow-[0_0_40px_-12px_rgba(168,85,247,0.4)]',
};

export function AnimatedStat({
  number,
  suffix,
  prefix,
  label,
  hint,
  icon: Icon,
  decimals = 0,
  index = 0,
  accent = 'pink',
  triggered,
}: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inViewObserver = useInView(ref, { once: true, margin: '-60px' });
  const orchestrated = triggered !== undefined;
  const isInView = orchestrated ? triggered : inViewObserver;
  const count = useMotionValue(reduced ? number : 0);
  const displayValue = useTransform(count, (latest) =>
    decimals > 0 ? latest.toFixed(decimals) : String(Math.floor(latest)),
  );

  useEffect(() => {
    if (!isInView) return;
    if (reduced) {
      count.set(number);
      return;
    }
    const controls = animate(count, number, {
      duration: 2.2,
      ease: EASE_SNAPPY,
      delay: index * 0.12,
    });
    return () => controls.stop();
  }, [count, number, isInView, index, reduced]);

  const formatted = decimals > 0 ? number.toFixed(decimals) : String(Math.floor(number));

  return (
    <motion.div
      ref={ref}
      initial={reduced || orchestrated ? false : 'hidden'}
      whileInView={reduced || orchestrated ? undefined : 'visible'}
      viewport={VIEWPORT_TIGHT}
      variants={fadeUpStatic}
      transition={{ delay: index * 0.08, duration: 0.55, ease: EASE_SMOOTH }}
      className="group relative h-full"
      data-stat-card={index}
    >
      <motion.article
        whileHover={reduced ? undefined : { y: -4 }}
        transition={SPRING_HOVER}
        className={`relative flex flex-col items-center text-center h-full px-4 py-8 md:py-10 rounded-2xl border border-white/[0.06] bg-white/[0.02] md:backdrop-blur-sm transition-[border-color,box-shadow] duration-400 neon-stat-card ${accentBorder[accent]}`}
      >
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${accentGlow[accent]}, transparent 70%)`,
          }}
        />

        {Icon && (
          <motion.div
            initial={reduced ? false : { scale: 0.8, opacity: 0 }}
            whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.15, type: 'spring', stiffness: 300 }}
            className="relative mb-5 icon-wrap-bright !w-11 !h-11 group-hover:scale-110 transition-transform duration-300"
          >
            <Icon className="w-5 h-5" strokeWidth={1.5} />
          </motion.div>
        )}

        <div className="relative font-serif text-[clamp(2.5rem,6vw,3.75rem)] font-normal tracking-tight leading-none flex items-baseline justify-center flex-wrap gap-0.5">
          {prefix && (
            <motion.span
              initial={reduced ? false : { opacity: 0, x: -6 }}
              animate={isInView && !reduced ? { opacity: 1, x: 0 } : undefined}
              transition={{ delay: index * 0.12 + 0.3 }}
              className="text-white text-[0.85em]"
            >
              {prefix}
            </motion.span>
          )}
          {reduced ? (
            <span className="text-white tabular-nums">{formatted}</span>
          ) : (
            <motion.span className="text-white tabular-nums">{displayValue}</motion.span>
          )}
          {suffix && (
            <motion.span
              initial={reduced ? false : { opacity: 0, scale: 0.6 }}
              animate={isInView && !reduced ? { opacity: 1, scale: 1 } : undefined}
              transition={{ delay: index * 0.12 + 0.5, type: 'spring', stiffness: 400 }}
              className="text-accent-pink text-[0.92em]"
            >
              {suffix}
            </motion.span>
          )}
        </div>

        <motion.div
          initial={reduced ? false : { scaleX: 0 }}
          animate={isInView && !reduced ? { scaleX: 1 } : reduced ? { scaleX: 1 } : undefined}
          transition={{ delay: index * 0.12 + 0.65, duration: 0.6, ease: EASE_SMOOTH }}
          className="relative w-12 h-px mt-5 mb-4 bg-gradient-to-r from-transparent via-accent-pink/60 to-transparent origin-center"
        />

        <p className="label-stat relative z-10 max-w-[11rem]">{label}</p>
        {hint && (
          <p className="mt-2 text-[10px] tracking-[0.12em] uppercase text-white/30 relative z-10">
            {hint}
          </p>
        )}
      </motion.article>
    </motion.div>
  );
}
