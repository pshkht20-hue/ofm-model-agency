'use client';

import { Shield, Heart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ContactForm } from '@/components/ContactForm';
import { Navbar } from '@/components/Navbar';
import { CreatorFeatureMarquee } from '@/components/CreatorTheme';
import { HeroSection } from '@/components/hero/HeroSection';
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

      <HeroSection />

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
