'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { BadgeCheck, Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks/useMotionPreferences';
import {
  EASE_SNAPPY,
  SPRING_HOVER,
  VIEWPORT_TIGHT,
  staggerContainer,
  staggerItem,
} from '@/lib/motion';

const AVATAR_HUES = [320, 270, 195, 160, 45] as const;
const TRUST_COUNT = 200;

export function HeroTrustStrip() {
  const t = useTranslations('home');
  const reduced = useReducedMotion();

  const countRef = useRef<HTMLElement>(null);
  const inView = useInView(countRef, { once: true, margin: '-60px' });
  const count = useMotionValue(reduced ? TRUST_COUNT : 0);
  const display = useTransform(count, (latest) => String(Math.floor(latest)));

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      count.set(TRUST_COUNT);
      return;
    }
    const controls = animate(count, TRUST_COUNT, {
      duration: 1.6,
      ease: EASE_SNAPPY,
    });
    return () => controls.stop();
  }, [count, inView, reduced]);

  const avatars = (
    <div className="flex -space-x-2.5" aria-hidden>
      {AVATAR_HUES.map((hue) => (
        <div
          key={hue}
          className="h-8 w-8 rounded-full border-2 border-[#050508] ring-1 ring-white/10"
          style={{
            background: `linear-gradient(145deg, hsl(${hue} 70% 48%), hsl(${(hue + 40) % 360} 60% 36%))`,
          }}
        />
      ))}
    </div>
  );

  const label = (
    <span className="text-sm text-white/55">
      <strong className="font-semibold text-white/90 tabular-nums">
        <span ref={countRef}>
          {reduced ? (
            String(TRUST_COUNT)
          ) : (
            <motion.span>{display}</motion.span>
          )}
        </span>
        +
      </strong>{' '}
      {t('hero.trustModels')}
    </span>
  );

  const badge = (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-cyan/25 bg-accent-cyan/[0.08] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-cyan/90">
      <BadgeCheck className="h-3 w-3" aria-hidden />
      {t('hero.trustBadge')}
    </span>
  );

  const footer = (
    <p className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-white/32">
      <Shield className="h-3 w-3 text-accent-violet/70" aria-hidden />
      {t('hero.trustVerified')}
    </p>
  );

  if (reduced) {
    return (
      <div
        data-hero-trust
        data-hero-reveal
        className="mb-10 flex flex-col items-center gap-3"
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          {avatars}
          {label}
          {badge}
        </div>
        {footer}
      </div>
    );
  }

  return (
    <motion.div
      data-hero-trust
      data-hero-reveal
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_TIGHT}
      variants={staggerContainer()}
      className="mb-10 flex flex-col items-center gap-3"
    >
      <div className="flex flex-wrap items-center justify-center gap-3">
        <motion.div
          variants={staggerItem()}
          whileHover={{ scale: 1.04 }}
          transition={SPRING_HOVER}
        >
          {avatars}
        </motion.div>
        <motion.div variants={staggerItem()}>{label}</motion.div>
        <motion.div variants={staggerItem()}>{badge}</motion.div>
      </div>
      <motion.div variants={staggerItem()}>{footer}</motion.div>
    </motion.div>
  );
}
