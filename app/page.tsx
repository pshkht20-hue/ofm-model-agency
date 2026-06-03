'use client';

import {
  ArrowRight,
  Users,
  TrendingUp,
  Award,
  Shield,
  Heart,
  Zap,
  MessageCircle,
  BarChart3,
  Camera,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ContactForm } from '@/components/ContactForm';
import { Navbar } from '@/components/Navbar';
import {
  CreatorFeatureMarquee,
  CreatorFloatingMotifs,
  CreatorPlatformSection,
  HeroBadgeBright,
} from '@/components/CreatorTheme';
import { ModelShowcase } from '@/components/ModelShowcase';
import { SectionHeader } from '@/components/SectionHeader';
import { StatsShowcase } from '@/components/StatsShowcase';
import { ScrollProgress } from '@/components/ScrollProgress';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { SectionShell } from '@/components/ui/SectionShell';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { ModelReviewsSection } from '@/components/ModelReviewsSection';
import { StaggerGrid, StaggerItem } from '@/components/ui/Reveal';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { NeonAccents, NeonAmbience } from '@/components/ui/NeonAccents';
import { HomeSeoBlock } from '@/components/seo/HomeSeoBlock';
import { SiteFooter } from '@/components/layout/SiteFooter';

const BENEFITS = [
  { icon: Users, title: 'Личный менеджер', desc: 'Закреплённый менеджер работает с тобой 7 дней в неделю.' },
  { icon: TrendingUp, title: 'Мощный маркетинг', desc: 'Профессиональное продвижение и работа с трафиком.' },
  { icon: Award, title: 'Реальные результаты', desc: 'Средний доход наших моделей — от $12,000 до $35,000+ в месяц.' },
  { icon: Shield, title: 'Полная конфиденциальность', desc: 'Защита личности и юридическая поддержка.' },
  { icon: Heart, title: 'Индивидуальный подход', desc: 'Персональная стратегия под каждую модель.' },
  { icon: Zap, title: 'Быстрый старт', desc: 'От заявки до первых выплат обычно 7–14 дней.' },
] as const;

const STEPS = [
  { num: '01', title: 'Подача заявки', desc: 'Ты заполняешь короткую форму. Это занимает всего 3–4 минуты.' },
  { num: '02', title: 'Первичная оценка', desc: 'В течение 24 часов мы изучаем твой профиль и связываемся с тобой.' },
  { num: '03', title: 'Личное знакомство', desc: 'Проводим интервью и обсуждаем возможности сотрудничества.' },
  { num: '04', title: 'Разработка стратегии', desc: 'План: контент, ценообразование и продвижение.' },
  { num: '05', title: 'Подготовка и запуск', desc: 'Настройка профиля, контент и первый выход.' },
  { num: '06', title: 'Рост и поддержка', desc: 'Отчёты, аналитика и работа над ростом дохода.' },
] as const;

const SERVICES = [
  {
    icon: Users,
    title: 'Управление аккаунтом',
    desc: 'Полное ведение OnlyFans: профиль, контент и работа с фанами.',
  },
  {
    icon: MessageCircle,
    title: 'Чаты 24/7',
    desc: 'Чат-менеджеры отвечают круглосуточно и увеличивают продажи.',
  },
  {
    icon: TrendingUp,
    title: 'Маркетинг',
    desc: 'Реклама, соцсети и партнёрские программы для роста подписчиков.',
  },
  {
    icon: Camera,
    title: 'Контент-стратегия',
    desc: 'Контент-план, съёмки и визуальный стиль бренда.',
  },
  {
    icon: BarChart3,
    title: 'Аналитика',
    desc: 'Еженедельные отчёты и оптимизация дохода.',
  },
  {
    icon: Shield,
    title: 'Защита',
    desc: 'Конфиденциальность, юридическая поддержка и контроль утечек.',
  },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050508] text-[#f4f2ef] overflow-x-hidden premium-grain">
      <NeonAmbience />
      <ScrollProgress />
      <Navbar />
      <StickyMobileCta />

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#050508]" />
        <div className="section-grid absolute inset-0 opacity-60" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,91,181,0.22),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(168,85,247,0.18),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_0%_80%,rgba(0,212,255,0.08),transparent)]" />

        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-pink/20 rounded-full blur-[100px] animate-glow-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent-violet/20 rounded-full blur-[80px] animate-glow-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

        <CreatorFloatingMotifs />
        <NeonAccents variant="hero" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <HeroBadgeBright />

          <motion.h1
            className="heading-display text-[clamp(3rem,10vw,5.75rem)] mb-10 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Твоя жизнь.
            </motion.span>
            <motion.span
              className="block text-gradient-brand italic"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              Твои правила.
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              Твой успех.
            </motion.span>
            <span className="sr-only">
              — OnlyFans агентство для моделей OFM&apos;s Model Agency
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="text-lead max-w-2xl mx-auto mb-14"
          >
            Эксклюзивное агентство для амбициозных моделей —<br className="hidden sm:block" />
            доход от <span className="text-accent-pink font-medium">$15,000+</span> в месяц<br className="hidden sm:block" />
            и полная поддержка на каждом этапе.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.a
              href="/#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary group"
            >
              Стать моделью
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </motion.a>
            <motion.a
              href="#models"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary"
            >
              Истории успеха
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="flex flex-wrap justify-center gap-x-12 gap-y-3 text-xs tracking-[0.2em] uppercase text-white/40"
          >
            <span>
              <strong className="text-accent-pink font-semibold">200+</strong> моделей
            </span>
            <span>
              Средний доход <strong className="text-accent-cyan font-semibold">$18,400</strong>
            </span>
            <span>Топ-1% агентств</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25 text-[9px] tracking-[0.35em] z-20 uppercase animate-scroll-hint"
        >
          Листайте вниз
          <div className="w-px h-8 bg-gradient-to-b from-accent-pink/40 to-transparent" />
        </motion.div>
      </section>

      <CreatorFeatureMarquee />
      <SectionDivider />

      <StatsShowcase />

      <SectionShell id="about">
        <SectionHeader eyebrow="Преимущества" title="Почему выбирают нас" />
        <StaggerGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {BENEFITS.map((item) => (
            <StaggerItem key={item.title}>
              <FeatureCard icon={item.icon} title={item.title} description={item.desc} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </SectionShell>

      <SectionShell id="how" variant="elevated">
        <SectionHeader eyebrow="Процесс" title="Как мы работаем" />
        <StaggerGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {STEPS.map((step) => (
            <StaggerItem key={step.num}>
              <FeatureCard step={step.num} title={step.title} description={step.desc} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </SectionShell>

      <SectionDivider />
      <CreatorPlatformSection />
      <ModelShowcase />
      <SectionDivider />

      <ModelReviewsSection />

      <SectionShell>
        <SectionHeader
          eyebrow="Услуги"
          title="Что мы предлагаем"
          description="Полный спектр услуг для максимального роста вашего аккаунта"
        />
        <StaggerGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {SERVICES.map((service) => (
            <StaggerItem key={service.title}>
              <FeatureCard icon={service.icon} title={service.title} description={service.desc} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </SectionShell>

      <HomeSeoBlock />

      {/* CONTACT */}
      <section id="contact" className="relative py-16 md:py-22 overflow-hidden">
        <div className="absolute inset-0 bg-[#050508]" />
        <div className="section-grid absolute inset-0 opacity-50" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(168,85,247,0.2),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_0%,rgba(255,91,181,0.1),transparent)]" />
        <NeonAccents variant="contact" />

        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow-bright mb-6">Следующий шаг</p>
            <h2 className="heading-section text-[clamp(2.5rem,6vw,4.25rem)] mb-8">
              Готова начать
              <br />
              <span className="text-gradient-brand italic">зарабатывать по-настоящему?</span>
            </h2>
            <p className="text-lead max-w-2xl mx-auto mb-12">
              Оставьте заявку — менеджер свяжется с вами в Telegram в течение 24 часов.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <ContactForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-x-10 gap-y-3 mt-10 text-xs tracking-[0.15em] uppercase text-white/40"
          >
            <span className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-accent-pink" /> Конфиденциальность
            </span>
            <span className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-accent-cyan" /> Ответ за 24 часа
            </span>
            <span className="flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-accent-violet" /> Поддержка 24/7
            </span>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
