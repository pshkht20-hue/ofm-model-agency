'use client';

import { useCallback, type MouseEvent } from 'react';
import {
  Users,
  TrendingUp,
  Award,
  Shield,
  Heart,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { hoverLift, SPRING_CARD } from '@/lib/motion';
import { SectionHeader } from '@/components/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { StaggerGrid, StaggerItem } from '@/components/ui/Reveal';

const BENEFIT_ICONS = [Users, TrendingUp, Award, Shield, Heart, Zap] as const;

/** Bento: крупные карточки на lg занимают 2 колонки */
const BENTO_SPAN = ['lg:col-span-2', '', 'lg:col-span-2', '', '', ''] as const;

const ACCENT = [
  'from-accent-pink/20 to-transparent',
  'from-accent-cyan/15 to-transparent',
  'from-accent-violet/20 to-transparent',
  'from-accent-pink/12 to-transparent',
  'from-accent-cyan/12 to-transparent',
  'from-accent-violet/15 to-transparent',
] as const;

type BenefitItem = {
  title: string;
  desc: string;
  highlights: string[];
};

type BenefitCardProps = {
  icon: LucideIcon;
  index: number;
  featured: boolean;
  item: BenefitItem;
  accent: string;
};

function BenefitCard({ icon: Icon, index, featured, item, accent }: BenefitCardProps) {
  const reduced = useReducedMotion();
  const onMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
  }, []);

  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      onMouseMove={onMove}
      whileHover={hoverLift(reduced)}
      transition={SPRING_CARD}
      className={`card-premium group relative flex h-full flex-col overflow-hidden p-6 md:p-8 md:backdrop-blur-sm ${
        featured ? 'md:p-9' : ''
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 ${accent}`}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(520px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,91,181,0.1), transparent 42%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="icon-wrap-bright shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_28px_-8px_rgba(255,91,181,0.55)]">
            <Icon className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <span className="font-serif text-3xl leading-none text-white/[0.12] tabular-nums transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:text-accent-pink/25">
            {num}
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
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(0,212,255,0.6)]"
                aria-hidden
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-accent-pink/50 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
    </motion.article>
  );
}

export function BenefitsSection() {
  const t = useTranslations('home');
  const items = t.raw('benefits.items') as BenefitItem[];

  return (
    <SectionShell id="benefits" className="relative">
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[min(100%,720px)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,91,181,0.12),transparent_70%)]"
        aria-hidden
      />
      <SectionHeader
        eyebrow={t('benefits.eyebrow')}
        title={t('benefits.title')}
        description={t('benefits.subtitle')}
      />
      <StaggerGrid variant="tilt" className="relative grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-5">
        {items.map((item, i) => (
          <StaggerItem key={item.title} variant="tilt" className={BENTO_SPAN[i] ?? ''}>
            <BenefitCard
              icon={BENEFIT_ICONS[i]}
              index={i}
              featured={BENTO_SPAN[i] === 'lg:col-span-2'}
              item={item}
              accent={ACCENT[i]}
            />
          </StaggerItem>
        ))}
      </StaggerGrid>
    </SectionShell>
  );
}
