'use client';

import { motion } from 'framer-motion';
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
  type LucideIcon,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { StaggerGrid, StaggerItem } from '@/components/ui/Reveal';

const FLOATING_ICONS = [
  { Icon: MessageCircle, x: '8%', y: '18%', delay: 0 },
  { Icon: Heart, x: '88%', y: '22%', delay: 0.4 },
  { Icon: Users, x: '12%', y: '72%', delay: 0.8 },
  { Icon: DollarSign, x: '85%', y: '68%', delay: 0.2 },
  { Icon: Bell, x: '78%', y: '38%', delay: 0.6 },
  { Icon: Lock, x: '18%', y: '42%', delay: 1 },
] as const;

export function CreatorFloatingMotifs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {FLOATING_ICONS.map(({ Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0.15, 0.35, 0.15],
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay },
            scale: { duration: 0.6, delay },
          }}
        >
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-accent-pink/15 backdrop-blur-sm text-accent-pink/40">
            <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

type Feature = {
  icon: LucideIcon;
  label: string;
  hint: string;
};

export const CREATOR_FEATURES: Feature[] = [
  { icon: Users, label: 'Подписчики и фаны', hint: 'Рост аудитории' },
  { icon: MessageCircle, label: 'Личные сообщения', hint: 'Чаты и продажи в DM' },
  { icon: Lock, label: 'Платный контент', hint: 'Подписки и эксклюзив' },
  { icon: DollarSign, label: 'Монетизация', hint: 'Чаевые и кастом' },
  { icon: TrendingUp, label: 'Аналитика роста', hint: 'Отчёты и стратегия' },
  { icon: Shield, label: 'Конфиденциальность', hint: 'Защита личности' },
];

export function CreatorFeatureMarquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/[0.06] bg-[#0a0a10]/90 py-4">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a0a10] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a0a10] to-transparent z-10 pointer-events-none" />
      <div className="flex gap-3 animate-marquee w-max px-4">
        {[...CREATOR_FEATURES, ...CREATOR_FEATURES].map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="flex items-center gap-2.5 shrink-0 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-accent-pink/30 transition-colors"
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

export function CreatorPlatformSection() {
  return (
    <SectionShell variant="default">
      <SectionHeader
        eyebrow="Creator-платформы"
        title="Экосистема подписного контента"
        description="OFM — независимое агентство. Помогаем моделям развивать аккаунты на платформах вроде OnlyFans: маркетинг, чаты, контент и рост дохода."
      />

      <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {CREATOR_FEATURES.map((item) => (
          <StaggerItem key={item.label}>
            <FeatureCard icon={item.icon} title={item.label} description={item.hint} />
          </StaggerItem>
        ))}
      </StaggerGrid>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 text-center text-xs text-white/35 max-w-2xl mx-auto leading-relaxed"
      >
        OnlyFans® — торговая марка Fenix International Limited. OFM не связана с OnlyFans и не
        является её официальным представителем.
      </motion.p>
    </SectionShell>
  );
}

export function LegalDisclaimer({ className = '' }: { className?: string }) {
  return (
    <p className={`text-[11px] text-white/30 leading-relaxed ${className}`}>
      OnlyFans® является зарегистрированной торговой маркой её правообладателя. OFM&apos;s Model
      Agency — независимое агентство; мы не аффилированы с OnlyFans. Услуги для создателей
      контента 18+.
    </p>
  );
}

export function HeroBadgeBright() {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="badge-bright inline-flex items-center gap-2"
    >
      <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
      Агентство для creator-платформ
    </motion.span>
  );
}
