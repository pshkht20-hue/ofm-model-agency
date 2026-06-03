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

const FLOATING_ICONS = [
  { Icon: MessageCircle, x: '8%', y: '18%', delay: 0 },
  { Icon: Heart, x: '88%', y: '22%', delay: 0.4 },
  { Icon: Users, x: '12%', y: '72%', delay: 0.8 },
  { Icon: DollarSign, x: '85%', y: '68%', delay: 0.2 },
  { Icon: Bell, x: '78%', y: '38%', delay: 0.6 },
  { Icon: Lock, x: '18%', y: '42%', delay: 1 },
] as const;

/** Декоративные иконки hero — общая creator-тематика, без логотипов платформ */
export function CreatorFloatingMotifs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {FLOATING_ICONS.map(({ Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          className="absolute text-accent-pink/20"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.8, delay },
            scale: { duration: 0.8, delay },
            y: { duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay },
          }}
        >
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
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

/** Безопасные формулировки: описываем услуги, не выдаём себя за платформу */
export const CREATOR_FEATURES: Feature[] = [
  {
    icon: Users,
    label: 'Подписчики и фаны',
    hint: 'Рост аудитории',
  },
  {
    icon: MessageCircle,
    label: 'Личные сообщения',
    hint: 'Чаты и продажи в DM',
  },
  {
    icon: Lock,
    label: 'Платный контент',
    hint: 'Подписки и эксклюзив',
  },
  {
    icon: DollarSign,
    label: 'Монетизация',
    hint: 'Чаевые и кастом',
  },
  {
    icon: TrendingUp,
    label: 'Аналитика роста',
    hint: 'Отчёты и стратегия',
  },
  {
    icon: Shield,
    label: 'Конфиденциальность',
    hint: 'Защита личности',
  },
];

export function CreatorFeatureMarquee() {
  return (
    <div className="w-full overflow-hidden border-y border-white/[0.06] bg-[#0a0a10]/80 py-4">
      <div className="flex gap-3 animate-marquee w-max px-4">
        {[...CREATOR_FEATURES, ...CREATOR_FEATURES].map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="flex items-center gap-2.5 shrink-0 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08]"
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
    <section className="py-20 md:py-28 bg-[#050508] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,91,181,0.12),transparent)]" />

      <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
        <div className="text-center mb-12">
          <p className="eyebrow-bright mb-4">Creator-платформы</p>
          <h2 className="heading-section">
            Работаем с экосистемой{' '}
            <span className="text-gradient-brand">подписного контента</span>
          </h2>
          <p className="text-lead mt-5 max-w-2xl mx-auto">
            OFM — независимое агентство. Мы помогаем моделям развивать аккаунты на
            платформах вроде OnlyFans: маркетинг, чаты, контент и рост дохода.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {CREATOR_FEATURES.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.06 }}
              className="group card-premium p-6 flex gap-4 items-start"
            >
              <div className="icon-wrap-bright shrink-0">
                <item.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="heading-card text-lg mb-1">{item.label}</h3>
                <p className="text-body text-sm">{item.hint}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-white/35 max-w-2xl mx-auto leading-relaxed">
          OnlyFans® — торговая марка Fenix International Limited. OFM не связана с
          OnlyFans и не является её официальным представителем. Мы оказываем услуги
          управления и маркетинга для независимых создателей контента.
        </p>
      </div>
    </section>
  );
}

export function LegalDisclaimer({ className = '' }: { className?: string }) {
  return (
    <p className={`text-[11px] text-white/30 leading-relaxed ${className}`}>
      OnlyFans® является зарегистрированной торговой маркой её правообладателя. OFM&apos;s
      Model Agency — независимое агентство; мы не аффилированы с OnlyFans и не используем
      фирменную символику платформы. Все услуги — консалтинг, маркетинг и операционная
      поддержка для взрослых создателей контента (18+).
    </p>
  );
}

export function HeroBadgeBright() {
  return (
    <span className="badge-bright inline-flex items-center gap-2">
      <Sparkles className="w-3.5 h-3.5" />
      Агентство для creator-платформ
    </span>
  );
}
