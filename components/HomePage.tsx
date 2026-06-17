'use client';

import dynamic from 'next/dynamic';
import { Shield, Heart, Zap } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ContactForm } from '@/components/ContactForm';
import { TelegramCta } from '@/components/TelegramCta';
import { Navbar } from '@/components/Navbar';
import { CreatorFeatureMarquee } from '@/components/CreatorTheme';
import { HeroSection } from '@/components/hero/HeroSection';
import { StatsShowcase } from '@/components/StatsShowcase';
import { ScrollProgress } from '@/components/ScrollProgress';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { BenefitsSection } from '@/components/BenefitsSection';
import { AboutSection } from '@/components/AboutSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { ServicesSection } from '@/components/ServicesSection';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { NeonAccents, NeonAmbience } from '@/components/ui/NeonAccents';
import { HomeSeoBlock } from '@/components/seo/HomeSeoBlock';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { EASE_SMOOTH, VIEWPORT_DEFAULT, fadeUpStatic } from '@/lib/motion';
import { SectionProvider } from '@/context/SectionContext';

const IncomeCalculatorSection = dynamic(
  () =>
    import('@/components/IncomeCalculatorSection').then((m) => ({
      default: m.IncomeCalculatorSection,
    })),
  { loading: () => <div className="min-h-[480px]" aria-hidden /> },
);

const ModelShowcase = dynamic(
  () => import('@/components/ModelShowcase').then((m) => ({ default: m.ModelShowcase })),
  { loading: () => <div className="min-h-[640px]" aria-hidden /> },
);

const ModelReviewsSection = dynamic(
  () =>
    import('@/components/ModelReviewsSection').then((m) => ({
      default: m.ModelReviewsSection,
    })),
  { loading: () => <div className="min-h-[520px]" aria-hidden /> },
);

function ContactGlow({ reduced }: { reduced: boolean | null }) {
  if (reduced) return null;

  return (
    <motion.div
      className="pointer-events-none absolute inset-4 md:inset-8 rounded-3xl border border-accent-pink/20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: [0.15, 0.4, 0.15], scale: 1 }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      aria-hidden
    />
  );
}

export function HomePage() {
  const t = useTranslations('home');
  const reduced = useReducedMotion();

  return (
    <SectionProvider>
    <div className="min-h-screen bg-[#050508] text-[#f4f2ef] overflow-x-hidden premium-grain">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent-pink focus:px-4 focus:py-2 focus:text-[#050508] focus:font-medium"
      >
        {t('skipToContent')}
      </a>

      <NeonAmbience />
      <ScrollProgress />
      <Navbar />
      <StickyMobileCta />

      <main id="main-content">
        <HeroSection />

        <CreatorFeatureMarquee />
        <SectionDivider />
        <StatsShowcase />

        <AboutSection />

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
            <ContactGlow reduced={reduced} />

            {reduced ? (
              <>
                <p className="eyebrow-bright mb-6">{t('contact.eyebrow')}</p>
                <h2 className="heading-section text-[clamp(2.5rem,6vw,4.25rem)] mb-8">
                  {t('contact.title')}
                  <br />
                  <span className="text-gradient-brand italic">{t('contact.titleAccent')}</span>
                </h2>
                <p className="text-lead max-w-2xl mx-auto mb-12">{t('contact.lead')}</p>
              </>
            ) : (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_DEFAULT}
                variants={fadeUpStatic}
                transition={{ duration: 0.6, ease: EASE_SMOOTH }}
              >
                <p className="eyebrow-bright mb-6">{t('contact.eyebrow')}</p>
                <h2 className="heading-section text-[clamp(2.5rem,6vw,4.25rem)] mb-8">
                  {t('contact.title')}
                  <br />
                  <span className="text-gradient-brand italic">{t('contact.titleAccent')}</span>
                </h2>
                <p className="text-lead max-w-2xl mx-auto mb-12">{t('contact.lead')}</p>
              </motion.div>
            )}

            {reduced ? (
              <ContactForm />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={VIEWPORT_DEFAULT}
                transition={{ delay: 0.12, duration: 0.65, ease: EASE_SMOOTH }}
              >
                <ContactForm />
              </motion.div>
            )}

            <div className="mt-9 flex flex-col items-center gap-3">
              <p className="text-sm text-white/45">{t('contact.telegramAlt')}</p>
              <TelegramCta location="contact_primary" label={t('contact.telegramCta')} />
            </div>

            {reduced ? (
              <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 mt-10 text-xs tracking-[0.15em] uppercase text-white/40">
                <span className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-accent-pink" /> {t('contact.privacy')}
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-accent-cyan" /> {t('contact.response')}
                </span>
                <span className="flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-accent-violet" /> {t('contact.support')}
                </span>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.5 }}
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
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
    </SectionProvider>
  );
}
