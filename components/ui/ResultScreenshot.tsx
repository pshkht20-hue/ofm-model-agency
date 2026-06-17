'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import type { ResultTier } from '@/lib/results/cases';
import { useReducedMotion } from '@/hooks/useMotionPreferences';
import { SPRING_HOVER, VIEWPORT_DEFAULT, hoverLift, scaleReveal } from '@/lib/motion';

const TIER_STYLES: Record<
  ResultTier,
  { gradient: string; accent: string; bar: string }
> = {
  elite: {
    gradient: 'from-accent-pink/25 via-accent-violet/15 to-[#08060f]',
    accent: 'text-accent-pink',
    bar: 'from-accent-pink to-accent-violet',
  },
  pro: {
    gradient: 'from-accent-violet/22 via-accent-cyan/12 to-[#08060f]',
    accent: 'text-accent-violet',
    bar: 'from-accent-violet to-accent-cyan',
  },
  prime: {
    gradient: 'from-accent-cyan/20 via-accent-violet/10 to-[#08060f]',
    accent: 'text-accent-cyan',
    bar: 'from-accent-cyan to-accent-violet',
  },
};

type ResultScreenshotProps = {
  src: string;
  alt: string;
  tier: ResultTier;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
};

function ScreenshotPlaceholder({ tier }: { tier: ResultTier }) {
  const style = TIER_STYLES[tier];

  return (
    <div
      className={`relative flex aspect-[9/16] w-full flex-col justify-between overflow-hidden rounded-lg bg-gradient-to-br p-4 ${style.gradient}`}
      aria-hidden
    >
      <div className="space-y-2">
        <div className="h-2 w-16 rounded-full bg-white/10" />
        <div className="h-2 w-24 rounded-full bg-white/[0.06]" />
      </div>
      <div className="flex flex-col items-center gap-2 py-6">
        <TrendingUp className={`h-8 w-8 ${style.accent} opacity-60`} strokeWidth={1.25} />
        <div className={`h-1 w-20 rounded-full bg-gradient-to-r ${style.bar} opacity-50`} />
        <div className="mt-2 h-2 w-28 rounded-full bg-white/[0.08]" />
        <div className="h-2 w-20 rounded-full bg-white/[0.05]" />
      </div>
      <div className="space-y-1.5">
        <div className="h-1.5 w-full rounded-full bg-white/[0.06]" />
        <div className="h-1.5 w-4/5 rounded-full bg-white/[0.04]" />
      </div>
    </div>
  );
}

export function ResultScreenshot({
  src,
  alt,
  tier,
  width,
  height,
  priority = false,
  sizes = '(max-width: 768px) 72vw, (max-width: 1200px) 280px, 320px',
}: ResultScreenshotProps) {
  const [failed, setFailed] = useState(false);
  const reduced = useReducedMotion();

  const inner = failed ? (
    <ScreenshotPlaceholder tier={tier} />
  ) : (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      quality={85}
      priority={priority}
      sizes={sizes}
      onError={() => setFailed(true)}
      className="h-auto w-full"
    />
  );

  if (reduced) {
    return inner;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_DEFAULT}
      variants={scaleReveal}
      whileHover={{ ...hoverLift(reduced), transition: SPRING_HOVER }}
    >
      {inner}
    </motion.div>
  );
}
