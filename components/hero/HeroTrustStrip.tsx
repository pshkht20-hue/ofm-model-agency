'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
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

const AVATARS = [
  '/avatars/avatar-1.jpg',
  '/avatars/avatar-2.jpg',
  '/avatars/avatar-3.jpg',
  '/avatars/avatar-4.jpg',
  '/avatars/avatar-5.jpg',
] as const;
const TRUST_COUNT = 220;

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
      {AVATARS.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          width={32}
          height={32}
          className="h-8 w-8 rounded-full border-2 border-[#050508] object-cover ring-1 ring-white/10"
          style={{ zIndex: AVATARS.length - i }}
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
