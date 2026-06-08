'use client';

import { useCallback, type MouseEvent } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { EASE_SMOOTH, hoverLift, SPRING_CARD, VIEWPORT_TIGHT, fadeUpStatic } from '@/lib/motion';
import { HowItWorksPinned, HowItWorksPinnedCta } from '@/components/HowItWorksPinned';
import { SectionHeader } from '@/components/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { StaggerGrid, StaggerItem } from '@/components/ui/Reveal';

/** Bento: шаги 1 и 4 — широкие карточки */
const BENTO_SPAN = ['lg:col-span-2', '', '', 'lg:col-span-2', '', ''] as const;

const ACCENT = [
  'from-accent-violet/18 to-transparent',
  'from-accent-cyan/14 to-transparent',
  'from-accent-pink/16 to-transparent',
  'from-accent-violet/20 to-transparent',
  'from-accent-cyan/16 to-transparent',
  'from-accent-pink/14 to-transparent',
] as const;

type ProcessStep = {
  title: string;
  desc: string;
  duration: string;
  highlights: string[];
};

type StepCardProps = {
  step: string;
  index: number;
  featured: boolean;
  item: ProcessStep;
  accent: string;
};

function StepCard({ step, index, featured, item, accent }: StepCardProps) {
  const reduced = useReducedMotion();
  const onMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
  }, []);

  const isLast = index === 5;

  return (
    <motion.article
      onMouseMove={onMove}
      whileHover={hoverLift(reduced)}
      transition={SPRING_CARD}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c14]/95 p-6 md:p-8 md:backdrop-blur-sm ${
        featured ? 'md:p-9' : ''
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-55 ${accent}`}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(520px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168,85,247,0.12), transparent 42%)',
        }}
        aria-hidden
      />

      {!isLast && (
        <div
          className="pointer-events-none absolute -right-3 top-1/2 z-20 hidden h-px w-6 bg-gradient-to-r from-accent-violet/40 to-transparent lg:block xl:-right-4 xl:w-8"
          aria-hidden
        />
      )}

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <span className="font-serif text-[clamp(2.75rem,6vw,3.75rem)] leading-none tracking-tight text-gradient-brand">
            {step}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/45">
            <Clock className="h-3 w-3 text-accent-cyan/80" strokeWidth={2} />
            {item.duration}
          </span>
        </div>

        <h3 className={`heading-card mb-3 ${featured ? 'text-xl md:text-2xl' : ''}`}>
          {item.title}
        </h3>
        <p className={`text-body mb-5 ${featured ? 'max-w-2xl text-[15px] leading-relaxed' : ''}`}>
          {item.desc}
        </p>

        <ul className="mt-auto space-y-2.5 border-t border-white/[0.06] pt-5">
          {item.highlights.map((line) => (
            <li key={line} className="flex gap-3 text-sm leading-snug text-white/55">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-violet shadow-[0_0_8px_rgba(168,85,247,0.55)]"
                aria-hidden
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-accent-violet/45 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
    </motion.article>
  );
}

export function HowItWorksSection() {
  const t = useTranslations('home');
  const reduced = useReducedMotion();
  const steps = t.raw('how.steps') as ProcessStep[];

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

      <div className="lg:hidden">
        <SectionHeader
          eyebrow={t('how.eyebrow')}
          title={t('how.title')}
          description={t('how.subtitle')}
        />

        <StaggerGrid
          variant="slide"
          stagger={0.1}
          className="relative grid gap-4 md:grid-cols-2 md:gap-5"
        >
          {steps.map((item, i) => {
            const step = String(i + 1).padStart(2, '0');
            return (
              <StaggerItem key={item.title} variant="slide">
                <StepCard
                  step={step}
                  index={i}
                  featured={false}
                  item={item}
                  accent={ACCENT[i]}
                />
              </StaggerItem>
            );
          })}
        </StaggerGrid>

        <motion.div
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={VIEWPORT_TIGHT}
          variants={fadeUpStatic}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE_SMOOTH }}
          className="mt-10 md:mt-12 flex flex-col items-center gap-3 text-center"
        >
          <p className="text-sm text-white/40 max-w-md">{t('how.footerNote')}</p>
          <motion.a
            href="#contact"
            whileHover={reduced ? undefined : { scale: 1.02 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}
            className="btn-primary group inline-flex"
          >
            {t('how.cta')}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </motion.a>
        </motion.div>
      </div>

      <div className="hidden lg:block">
        {reduced ? (
          <>
            <SectionHeader
              eyebrow={t('how.eyebrow')}
              title={t('how.title')}
              description={t('how.subtitle')}
            />
            <StaggerGrid variant="slide" stagger={0.1} className="relative grid gap-4 lg:grid-cols-3 lg:gap-5">
              {steps.map((item, i) => {
                const step = String(i + 1).padStart(2, '0');
                return (
                  <StaggerItem key={item.title} variant="slide" className={BENTO_SPAN[i] ?? ''}>
                    <StepCard
                      step={step}
                      index={i}
                      featured={BENTO_SPAN[i] === 'lg:col-span-2'}
                      item={item}
                      accent={ACCENT[i]}
                    />
                  </StaggerItem>
                );
              })}
            </StaggerGrid>
            <div className="mt-10 flex flex-col items-center gap-3 text-center">
              <p className="text-sm text-white/40 max-w-md">{t('how.footerNote')}</p>
              <a href="#contact" className="btn-primary group inline-flex">
                {t('how.cta')}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </>
        ) : (
          <>
            <HowItWorksPinned />
            <HowItWorksPinnedCta />
          </>
        )}
      </div>
    </SectionShell>
  );
}
