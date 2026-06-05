'use client';

import { ArrowRight, Shield, Heart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ContactForm } from '@/components/ContactForm';
import { Navbar } from '@/components/Navbar';
import {
  CreatorFeatureMarquee,
  CreatorFloatingMotifs,
  HeroBadgeBright,
} from '@/components/CreatorTheme';
import { ModelShowcase } from '@/components/ModelShowcase';
import { StatsShowcase } from '@/components/StatsShowcase';
import { ScrollProgress } from '@/components/ScrollProgress';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { SectionShell } from '@/components/ui/SectionShell';
import { BenefitsSection } from '@/components/BenefitsSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { IncomeCalculatorSection } from '@/components/IncomeCalculatorSection';
import { ServicesSection } from '@/components/ServicesSection';
import { ModelReviewsSection } from '@/components/ModelReviewsSection';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { NeonAccents, NeonAmbience } from '@/components/ui/NeonAccents';
import { HomeSeoBlock } from '@/components/seo/HomeSeoBlock';
import { SiteFooter } from '@/components/layout/SiteFooter';

export function HomePage() {
  const t = useTranslations('home');

  return (
    <div className="min-h-screen bg-[#050508] text-[#f4f2ef] overflow-x-hidden premium-grain">
      <NeonAmbience />
      <ScrollProgress />
      <Navbar />
      <StickyMobileCta />

      <section className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#050508]" />
        <div className="section-grid absolute inset-0 opacity-60" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,91,181,0.22),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(168,85,247,0.18),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_0%_80%,rgba(0,212,255,0.08),transparent)]" />

        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-pink/20 rounded-full blur-[100px] animate-glow-pulse pointer-events-none" />
        <div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent-violet/20 rounded-full blur-[80px] animate-glow-pulse pointer-events-none"
          style={{ animationDelay: '1s' }}
        />

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
              {t('hero.line1')}
            </motion.span>
            <motion.span
              className="block text-gradient-brand italic"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              {t('hero.line2')}
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              {t('hero.line3')}
            </motion.span>
            <span className="sr-only">{t('hero.srOnly')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="text-lead max-w-2xl mx-auto mb-14"
          >
            {t.rich('hero.lead', {
              income: () => (
                <span className="text-accent-pink font-medium">{t('hero.incomeHighlight')}</span>
              ),
              br: () => <br className="hidden sm:block" />,
            })}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary group"
            >
              {t('hero.ctaPrimary')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </motion.a>
            <motion.a
              href="#models"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary"
            >
              {t('hero.ctaSecondary')}
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="flex flex-wrap justify-center gap-x-12 gap-y-3 text-xs tracking-[0.2em] uppercase text-white/40"
          >
            <span>
              <strong className="text-accent-pink font-semibold">200+</strong> {t('hero.statModels')}
            </span>
            <span>
              {t('hero.statIncome')}{' '}
              <strong className="text-accent-cyan font-semibold">$18,400</strong>
            </span>
            <span>{t('hero.statTop')}</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25 text-[9px] tracking-[0.35em] z-20 uppercase animate-scroll-hint"
        >
          {t('hero.scroll')}
          <div className="w-px h-8 bg-gradient-to-b from-accent-pink/40 to-transparent" />
        </motion.div>
      </section>

      <CreatorFeatureMarquee />
      <SectionDivider />
      <StatsShowcase />

      <BenefitsSection />

      <HowItWorksSection />

      <SectionDivider />
      <IncomeCalculatorSection />
      <SectionDivider />
      <ModelShowcase />
      <SectionDivider />
      <ModelReviewsSection />

      <ServicesSection />

      <HomeSeoBlock />

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
            <p className="eyebrow-bright mb-6">{t('contact.eyebrow')}</p>
            <h2 className="heading-section text-[clamp(2.5rem,6vw,4.25rem)] mb-8">
              {t('contact.title')}
              <br />
              <span className="text-gradient-brand italic">{t('contact.titleAccent')}</span>
            </h2>
            <p className="text-lead max-w-2xl mx-auto mb-12">{t('contact.lead')}</p>
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
              <Shield className="w-3.5 h-3.5 text-accent-pink" /> {t('contact.privacy')}
            </span>
            <span className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-accent-cyan" /> {t('contact.response')}
            </span>
            <span className="flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-accent-violet" /> {t('contact.support')}
            </span>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
