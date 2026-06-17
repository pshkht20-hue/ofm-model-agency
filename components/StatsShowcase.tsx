'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { motion, useReducedMotion } from 'framer-motion';
import { Clock, DollarSign, TrendingUp, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { AnimatedStat } from '@/components/AnimatedStat';
import { NeonAccents } from '@/components/ui/NeonAccents';
import { ParticleField } from '@/components/ui/ParticleField';
import { gsap, registerGsapPlugins } from '@/lib/gsap/register';
import { EASE_SMOOTH, lineReveal } from '@/lib/motion';

registerGsapPlugins();

const STAT_CONFIG = [
  { number: 220, suffix: '+', icon: Users, accent: 'pink' as const },
  {
    number: 100,
    prefix: '$',
    suffix: 'K',
    icon: DollarSign,
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
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [statsLive, setStatsLive] = useState(false);
  const items = t.raw('items') as { label: string; hint: string }[];

  const stats = STAT_CONFIG.map((config, i) => ({
    ...config,
    label: items[i]?.label ?? '',
    hint: items[i]?.hint ?? '',
  }));

  useGSAP(
    () => {
      if (reduced) return;

      const section = sectionRef.current;
      if (!section) return;

      const header = section.querySelector('[data-stats-header]');
      const vlines = section.querySelectorAll('[data-stats-vline]');
      const cards = section.querySelectorAll('[data-stat-card]');
      const glow = section.querySelector('[data-stats-glow]');

      gsap.set(vlines, { scaleY: 0, transformOrigin: 'center top' });
      gsap.set(cards, { opacity: 0, y: 36 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 72%',
          once: true,
        },
        onComplete: () => setStatsLive(true),
      });

      if (header) {
        tl.fromTo(header, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0);
      }

      tl.to(vlines, { scaleY: 1, duration: 0.7, stagger: 0.14, ease: 'power2.out' }, 0.15)
        .to(glow, { opacity: 0.55, scale: 1.08, duration: 1.2, ease: 'sine.inOut' }, 0.1)
        .to(cards, { opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out' }, 0.28);
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section
      ref={sectionRef}
      id="results"
      className="relative border-y border-white/[0.06] bg-[#0a0a10] py-14 md:py-18 overflow-hidden"
    >
      <div className="section-grid absolute inset-0 opacity-40 pointer-events-none" aria-hidden />
      <div className="section-glow absolute inset-0 pointer-events-none" aria-hidden />
      <ParticleField opacity={0.9} />
      <NeonAccents variant="stats" />

      <div
        data-stats-glow
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,720px)] h-48 bg-accent-pink/10 rounded-full pointer-events-none ${
          reduced ? 'opacity-40' : 'blur-[100px]'
        }`}
        style={{ opacity: reduced ? 0.4 : 0.25 }}
        aria-hidden
      />

      {reduced ? (
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-pink/30 to-transparent"
          aria-hidden
        />
      ) : (
        <motion.div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-pink/30 to-transparent origin-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={lineReveal}
          transition={{ duration: 1.2, ease: EASE_SMOOTH }}
          aria-hidden
        />
      )}

      <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
        <div
          {...(reduced ? {} : { 'data-stats-header': '' })}
          className="text-center mb-8 md:mb-10"
        >
          <p className="eyebrow-bright mb-3">{t('eyebrow')}</p>
          <h2 className="font-serif text-2xl md:text-3xl text-white/95 tracking-tight">
            {t('title')}{' '}
            <span className="text-gradient-brand italic">{t('titleAccent')}</span>
          </h2>
        </div>

        <div className="relative">
          <div
            data-stats-vline
            className="hidden lg:block absolute top-[18%] bottom-[18%] left-[25%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
            aria-hidden
          />
          <div
            data-stats-vline
            className="hidden lg:block absolute top-[18%] bottom-[18%] left-[50%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
            aria-hidden
          />
          <div
            data-stats-vline
            className="hidden lg:block absolute top-[18%] bottom-[18%] left-[75%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
            aria-hidden
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {stats.map((stat, index) => (
              <AnimatedStat
                key={stat.label}
                {...stat}
                index={index}
                triggered={reduced ? undefined : statsLive}
              />
            ))}
          </div>
        </div>

        {reduced ? (
          <p className="text-center text-xs text-white/30 mt-6 md:mt-8 tracking-wide">
            {t('footnote')}
          </p>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.85, duration: 0.4 }}
            className="text-center text-xs text-white/30 mt-6 md:mt-8 tracking-wide"
          >
            {t('footnote')}
          </motion.p>
        )}
      </div>

      {reduced ? (
        <div
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/25 to-transparent"
          aria-hidden
        />
      ) : (
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/25 to-transparent origin-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={lineReveal}
          transition={{ duration: 1.2, delay: 0.2, ease: EASE_SMOOTH }}
          aria-hidden
        />
      )}
    </section>
  );
}
