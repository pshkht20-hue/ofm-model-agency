'use client';

import { useRef } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';
import { useTranslations } from 'next-intl';
import { EASE_SMOOTH } from '@/lib/motion';
import { SectionHeader } from '@/components/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';

type ProcessStep = {
  title: string;
  desc: string;
  duration: string;
  highlights: string[];
};

const ACCENT = [
  'from-accent-pink/14',
  'from-accent-violet/14',
  'from-accent-cyan/12',
  'from-accent-violet/16',
  'from-accent-pink/12',
  'from-accent-cyan/14',
] as const;

const BULLETS: Variants = {
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};
const BULLET: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE_SMOOTH } },
};

function TimelineStep({
  item,
  index,
  reduced,
}: {
  item: ProcessStep;
  index: number;
  reduced: boolean | null;
}) {
  const step = String(index + 1).padStart(2, '0');
  const accent = ACCENT[index % ACCENT.length];

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.6, ease: EASE_SMOOTH }}
      className="relative grid grid-cols-[3rem_1fr] gap-4 md:grid-cols-[3.5rem_1fr] md:gap-7"
    >
      <div className="flex justify-center">
        <motion.span
          initial={reduced ? false : { scale: 0.4, opacity: 0 }}
          whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ type: 'spring', stiffness: 240, damping: 16 }}
          className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-accent-pink/30 bg-[#0b0b12] font-serif text-base text-gradient-brand shadow-[0_0_26px_-4px_rgba(255,91,181,0.6)] md:h-14 md:w-14 md:text-lg"
        >
          {step}
          {!reduced && (
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-full border border-accent-pink/45"
              initial={{ scale: 1, opacity: 0 }}
              whileInView={{ scale: [1, 1.55], opacity: [0.55, 0] }}
              viewport={{ once: true, margin: '-90px' }}
              transition={{ duration: 1.4, ease: 'easeOut', delay: 0.15 }}
              aria-hidden
            />
          )}
        </motion.span>
      </div>

      <article className="group relative -mt-0.5 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c14]/80 p-5 backdrop-blur-sm transition-[border-color,box-shadow] duration-500 hover:border-accent-pink/25 md:p-7">
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} to-transparent opacity-50`}
          aria-hidden
        />
        <div className="relative z-10">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h3 className="heading-card text-lg md:text-xl">{item.title}</h3>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/45">
              <Clock className="h-3 w-3 text-accent-cyan/80" strokeWidth={2} />
              {item.duration}
            </span>
          </div>
          <p className="text-body mb-5 text-[15px] leading-relaxed">{item.desc}</p>
          <motion.ul
            initial={reduced ? false : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={{ once: true, margin: '-50px' }}
            variants={BULLETS}
            className="space-y-2.5 border-t border-white/[0.06] pt-4"
          >
            {item.highlights.map((line) => (
              <motion.li
                key={line}
                variants={reduced ? undefined : BULLET}
                className="flex gap-3 text-sm leading-snug text-white/55"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-violet shadow-[0_0_8px_rgba(168,85,247,0.55)]"
                  aria-hidden
                />
                <span>{line}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-accent-violet/45 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
      </article>
    </motion.div>
  );
}

export function HowItWorksSection() {
  const t = useTranslations('home');
  const reduced = useReducedMotion();
  const steps = t.raw('how.steps') as ProcessStep[];
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 80%', 'end 60%'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const fillScale = useTransform(smooth, [0, 1], [0, 1]);
  const cometTop = useTransform(smooth, [0, 1], ['0%', '100%']);
  const cometOpacity = useTransform(smooth, [0, 0.04, 0.97, 1], [0, 1, 1, 0]);

  return (
    <SectionShell id="how" variant="elevated" className="relative">
      <div
        className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.14),transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.06),transparent_70%)]"
        aria-hidden
      />

      <SectionHeader
        eyebrow={t('how.eyebrow')}
        title={t('how.title')}
        description={t('how.subtitle')}
      />

      <div ref={trackRef} className="relative mx-auto mt-12 max-w-3xl">
        <div
          className="pointer-events-none absolute left-6 top-3 bottom-3 w-px -translate-x-1/2 bg-white/[0.08] md:left-7"
          aria-hidden
        />
        {!reduced && (
          <>
            <motion.div
              style={{ scaleY: fillScale }}
              className="pointer-events-none absolute left-6 top-3 bottom-3 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-accent-pink via-accent-violet to-accent-cyan shadow-[0_0_16px_rgba(168,85,247,0.7)] md:left-7"
              aria-hidden
            />
            <motion.div
              style={{ top: cometTop, opacity: cometOpacity }}
              className="pointer-events-none absolute left-6 z-0 -translate-x-1/2 -translate-y-1/2 md:left-7"
              aria-hidden
            >
              <span className="absolute left-1/2 top-1/2 h-12 w-1 -translate-x-1/2 -translate-y-full rounded-full bg-gradient-to-t from-accent-pink/70 to-transparent blur-[2px]" />
              <motion.span
                className="relative block h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_14px_4px_rgba(255,91,181,0.85),0_0_30px_12px_rgba(168,85,247,0.5)]"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </>
        )}

        <div className="relative z-10 space-y-6 md:space-y-8">
          {steps.map((item, i) => (
            <TimelineStep key={item.title} item={item} index={i} reduced={reduced} />
          ))}
        </div>
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: EASE_SMOOTH }}
        className="mt-12 flex flex-col items-center gap-3 text-center"
      >
        <p className="max-w-md text-sm text-white/40">{t('how.footerNote')}</p>
        <a href="#contact" className="btn-primary group inline-flex">
          {t('how.cta')}
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </motion.div>
    </SectionShell>
  );
}
