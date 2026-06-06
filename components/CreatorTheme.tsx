'use client';

import { motion } from 'framer-motion';
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

export function CreatorFloatingMotifs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {FLOATING_ICONS.map(({ Icon, x, y, delay, phase }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0.72, 1, 0.72],
            scale: [1, 1.04, 1],
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 3.5 + i * 0.25, repeat: Infinity, ease: 'easeInOut', delay },
            y: { duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay },
          }}
        >
          <div className={`hero-motif-card hero-motif-neon-${phase} p-3 rounded-2xl`}>
            <span className="hero-motif-aura" aria-hidden />
            <Icon className="hero-motif-icon w-5 h-5 md:w-6 md:h-6" strokeWidth={1.75} />
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
