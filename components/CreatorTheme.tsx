'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  MessageCircle,
  Users,
  Lock,
  DollarSign,
  Bell,
  TrendingUp,
  Heart,
  Shield,
  Sparkles,
} from 'lucide-react';
const FLOATING_ICONS = [
  { Icon: MessageCircle, x: '8%', y: '18%', delay: 0, phase: 0 },
  { Icon: Heart, x: '88%', y: '22%', delay: 0.4, phase: 1 },
  { Icon: Users, x: '12%', y: '72%', delay: 0.8, phase: 2 },
  { Icon: DollarSign, x: '85%', y: '68%', delay: 0.2, phase: 3 },
  { Icon: Bell, x: '78%', y: '38%', delay: 0.6, phase: 4 },
  { Icon: Lock, x: '18%', y: '42%', delay: 1, phase: 5 },
] as const;

function useIsMobileHero() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return mobile;
}

export function CreatorFloatingMotifs() {
  const isMobile = useIsMobileHero();
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          {FLOATING_ICONS.map(({ phase }) => (
            <linearGradient
              key={phase}
              id={`hero-motif-grad-${phase}`}
              gradientUnits="objectBoundingBox"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0%" stopColor="#ff5bb5" />
              <stop offset="35%" stopColor="#a855f7" />
              <stop offset="65%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#ff5bb5" />
              {!reduced && (
                <>
                  <animate
                    attributeName="x1"
                    values="0;0.8;0"
                    dur="8s"
                    begin={`${phase * -1.3}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y1"
                    values="0;0.2;0"
                    dur="8s"
                    begin={`${phase * -1.3}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="x2"
                    values="1;1.8;1"
                    dur="8s"
                    begin={`${phase * -1.3}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y2"
                    values="1;1.2;1"
                    dur="8s"
                    begin={`${phase * -1.3}s`}
                    repeatCount="indefinite"
                  />
                </>
              )}
            </linearGradient>
          ))}
        </defs>
      </svg>

      {FLOATING_ICONS.map(({ Icon, x, y, delay, phase }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, y: isMobile ? 6 : 0, scale: isMobile ? 1 : 0.85 }}
          animate={
            reduced || isMobile
              ? { opacity: 0.5, y: 0 }
              : {
                  opacity: 0.5,
                  y: [0, -6, 0],
                }
          }
          transition={
            reduced || isMobile
              ? {
                  opacity: { duration: 0.9, delay: 0.9 + i * 0.1, ease: 'easeOut' },
                  y: { duration: 0.9, delay: 0.9 + i * 0.1, ease: 'easeOut' },
                }
              : {
                  opacity: { duration: 0.7, delay, ease: 'easeOut' },
                  y: { duration: 5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay },
                }
          }
        >
          <div className="hero-motif-card p-2.5 md:p-3 rounded-2xl">
            <Icon
              className="hero-motif-icon w-5 h-5 md:w-6 md:h-6"
              strokeWidth={1.5}
              stroke={`url(#hero-motif-grad-${phase})`}
              fill="none"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const FEATURE_ICONS = [Users, MessageCircle, Lock, DollarSign, TrendingUp, Shield] as const;

function useCreatorFeatures() {
  const t = useTranslations('creator');
  const items = t.raw('marquee') as { label: string; hint: string }[];
  return FEATURE_ICONS.map((icon, i) => ({
    icon,
    label: items[i]?.label ?? '',
    hint: items[i]?.hint ?? '',
  }));
}

export function CreatorFeatureMarquee() {
  const features = useCreatorFeatures();

  return (
    <div className="relative w-full overflow-hidden border-y border-white/[0.06] bg-[#0a0a10]/90 py-4">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-pink/40 to-transparent pointer-events-none"
        aria-hidden
      />
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a0a10] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a0a10] to-transparent z-10 pointer-events-none" />
      <div className="flex gap-3 animate-marquee w-max px-4">
        {[...features, ...features].map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="flex items-center gap-2.5 shrink-0 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-accent-pink/30 hover:shadow-[0_0_16px_-6px_rgba(255,91,181,0.4)] transition-all"
          >
            <item.icon className="w-4 h-4 text-accent-pink" strokeWidth={1.75} />
            <span className="text-sm text-white/85 whitespace-nowrap">{item.label}</span>
            <span className="text-[10px] text-white/35 uppercase tracking-wider hidden sm:inline">
              {item.hint}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LegalDisclaimer({ className = '' }: { className?: string }) {
  const t = useTranslations('creator');

  return (
    <p className={`text-[11px] text-white/30 leading-relaxed ${className}`}>
      {t('legalDisclaimer')}
    </p>
  );
}

export function HeroBadgeBright() {
  const t = useTranslations('creator');

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="badge-bright inline-flex items-center gap-2"
    >
      <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
      {t('badge')}
    </motion.span>
  );
}
