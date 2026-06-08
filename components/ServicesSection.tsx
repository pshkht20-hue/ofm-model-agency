'use client';

import { useCallback, type MouseEvent } from 'react';
import {
  Users,
  MessageCircle,
  TrendingUp,
  Camera,
  BarChart3,
  Shield,
  type LucideIcon,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { hoverLift, SPRING_CARD } from '@/lib/motion';
import { SectionHeader } from '@/components/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { StaggerGrid, StaggerItem } from '@/components/ui/Reveal';

const SERVICE_ICONS = [Users, MessageCircle, TrendingUp, Camera, BarChart3, Shield] as const;

const BENTO_SPAN = ['lg:col-span-2', '', 'lg:col-span-2', '', '', ''] as const;

const ACCENT = [
  'from-accent-pink/20 to-transparent',
  'from-accent-cyan/16 to-transparent',
  'from-accent-violet/20 to-transparent',
  'from-accent-pink/14 to-transparent',
  'from-accent-cyan/14 to-transparent',
  'from-accent-violet/16 to-transparent',
] as const;

type ServiceItem = {
  title: string;
  desc: string;
  badge: string;
  highlights: string[];
};

type ServiceCardProps = {
  icon: LucideIcon;
  index: number;
  featured: boolean;
  item: ServiceItem;
  accent: string;
};

function ServiceCard({ icon: Icon, index, featured, item, accent }: ServiceCardProps) {
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
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a10]/90 p-6 md:p-8 md:backdrop-blur-sm ${
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
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-pink/35 to-transparent opacity-50"
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="icon-wrap-bright shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_28px_-8px_rgba(255,91,181,0.55)]">
            <Icon className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <span className="font-serif text-3xl leading-none text-white/[0.12] tabular-nums transition-colors duration-300 group-hover:text-accent-pink/25">
            {num}
          </span>
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h3 className={`heading-card ${featured ? 'text-xl md:text-2xl' : ''}`}>{item.title}</h3>
          <span className="inline-flex shrink-0 items-center rounded-full border border-white/[0.1] bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-accent-cyan/90">
            {item.badge}
          </span>
        </div>

        <p className={`text-body mb-5 ${featured ? 'max-w-2xl text-[15px] leading-relaxed' : ''}`}>
          {item.desc}
        </p>

        <ul className="mt-auto space-y-2.5 border-t border-white/[0.06] pt-5">
          {item.highlights.map((line) => (
            <li key={line} className="flex gap-3 text-sm leading-snug text-white/55">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-pink shadow-[0_0_8px_rgba(255,91,181,0.55)]"
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

export function ServicesSection() {
  const t = useTranslations('home');
  const items = t.raw('services.items') as ServiceItem[];

  return (
    <SectionShell id="services" className="relative">
      <div
        className="pointer-events-none absolute -top-20 right-0 h-72 w-[min(100%,560px)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.1),transparent_70%)]"
        aria-hidden
      />
      <SectionHeader
        eyebrow={t('services.eyebrow')}
        title={t('services.title')}
        description={t('services.description')}
      />
      <StaggerGrid variant="tilt" className="relative grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-5">
        {items.map((item, i) => (
          <StaggerItem key={item.title} variant="tilt" className={BENTO_SPAN[i] ?? ''}>
            <ServiceCard
              icon={SERVICE_ICONS[i]}
              index={i}
              featured={BENTO_SPAN[i] === 'lg:col-span-2'}
              item={item}
              accent={ACCENT[i]}
            />
          </StaggerItem>
        ))}
      </StaggerGrid>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mt-8 max-w-3xl rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-center text-sm leading-relaxed text-white/50"
      >
        {t('services.footerNote')}
      </motion.p>
    </SectionShell>
  );
}
