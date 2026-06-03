'use client';

import { motion } from 'framer-motion';
import { Clock, DollarSign, TrendingUp, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { AnimatedStat } from '@/components/AnimatedStat';
import { NeonAccents } from '@/components/ui/NeonAccents';

const STAT_CONFIG = [
  { number: 200, suffix: '+', icon: Users, accent: 'pink' as const },
  {
    number: 18.4,
    prefix: '$',
    suffix: 'M',
    icon: DollarSign,
    decimals: 1,
    accent: 'cyan' as const,
  },
  { number: 94, suffix: '%', icon: TrendingUp, accent: 'violet' as const },
  {
    number: 24,
    suffix: (
      <>
        <span className="text-white/35 font-normal">/</span>
        <span>7</span>
      </>
    ),
    icon: Clock,
    accent: 'pink' as const,
  },
] as const;

export function StatsShowcase() {
  const t = useTranslations('stats');
  const items = t.raw('items') as { label: string; hint: string }[];

  const stats = STAT_CONFIG.map((config, i) => ({
    ...config,
    label: items[i]?.label ?? '',
    hint: items[i]?.hint ?? '',
  }));

  return (
    <section
      id="results"
      className="relative border-y border-white/[0.06] bg-[#0a0a10] py-14 md:py-18 overflow-hidden"
    >
      <div className="section-grid absolute inset-0 opacity-40 pointer-events-none" aria-hidden />
      <div className="section-glow absolute inset-0 pointer-events-none" aria-hidden />
      <NeonAccents variant="stats" />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,720px)] h-48 bg-accent-pink/10 blur-[100px] rounded-full pointer-events-none animate-glow-pulse"
        aria-hidden
      />

      <motion.div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-pink/30 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />

      <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-10"
        >
          <p className="eyebrow-bright mb-3">{t('eyebrow')}</p>
          <h2 className="font-serif text-2xl md:text-3xl text-white/95 tracking-tight">
            {t('title')}{' '}
            <span className="text-gradient-brand italic">{t('titleAccent')}</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div
            className="hidden lg:block absolute top-[18%] bottom-[18%] left-[25%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
            aria-hidden
          />
          <div
            className="hidden lg:block absolute top-[18%] bottom-[18%] left-[50%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
            aria-hidden
          />
          <div
            className="hidden lg:block absolute top-[18%] bottom-[18%] left-[75%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
            aria-hidden
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {stats.map((stat, index) => (
              <AnimatedStat key={stat.label} {...stat} index={index} />
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-white/30 mt-6 md:mt-8 tracking-wide"
        >
          {t('footnote')}
        </motion.p>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/25 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />
    </section>
  );
}
