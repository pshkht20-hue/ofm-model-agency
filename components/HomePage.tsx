'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { Shield, Heart, Zap } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { TelegramCta } from '@/components/TelegramCta';
import { Link } from '@/i18n/navigation';
import { Navbar } from '@/components/Navbar';
import { CreatorFeatureMarquee } from '@/components/CreatorTheme';
import { HeroSection } from '@/components/hero/HeroSection';
import { ScrollProgress } from '@/components/ScrollProgress';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { ParticleField } from '@/components/ui/ParticleField';
import { WhatsAppCta } from '@/components/WhatsAppCta';
import { NeonAccents, NeonAmbience } from '@/components/ui/NeonAccents';
import { EASE_SMOOTH, VIEWPORT_DEFAULT, fadeUpStatic } from '@/lib/motion';
import { SectionProvider } from '@/context/SectionContext';
import { SectionViewTracker } from '@/components/analytics/SectionViewTracker';
import { HOME_SECTIONS } from '@/lib/sections';

/** id секций главной для section_view (единый источник — lib/sections). */
const HOME_SECTION_IDS = HOME_SECTIONS.map((s) => s.id);

// Below-fold sections are code-split out of the initial bundle (SSR HTML is
// still rendered in full, so SEO/H2s/CLS are untouched — the placeholders only
// show during client-side navigations). Placeholder min-heights mirror the
// real section heights to keep CLS at ~0.
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

const StatsShowcase = dynamic(
  () => import('@/components/StatsShowcase').then((m) => ({ default: m.StatsShowcase })),
  { loading: () => <div className="min-h-[480px]" aria-hidden /> },
);

const AboutSection = dynamic(
  () => import('@/components/AboutSection').then((m) => ({ default: m.AboutSection })),
  { loading: () => <div className="min-h-[520px]" aria-hidden /> },
);

const HowItWorksSection = dynamic(
  () =>
    import('@/components/HowItWorksSection').then((m) => ({ default: m.HowItWorksSection })),
  { loading: () => <div className="min-h-[720px]" aria-hidden /> },
);

const ServicesSection = dynamic(
  () => import('@/components/ServicesSection').then((m) => ({ default: m.ServicesSection })),
  { loading: () => <div className="min-h-[760px]" aria-hidden /> },
);

const HomeSeoBlock = dynamic(
  () => import('@/components/seo/HomeSeoBlock').then((m) => ({ default: m.HomeSeoBlock })),
  { loading: () => <div className="min-h-[640px]" aria-hidden /> },
);

const ContactForm = dynamic(
  () => import('@/components/ContactForm').then((m) => ({ default: m.ContactForm })),
  { loading: () => <div className="min-h-[520px]" aria-hidden /> },
);

const SiteFooter = dynamic(
  () => import('@/components/layout/SiteFooter').then((m) => ({ default: m.SiteFooter })),
  { loading: () => <div className="min-h-[420px]" aria-hidden /> },
);

function ContactGlow({ reduced }: { reduced: boolean | null }) {
  if (reduced) return null;

  // CSS pulse (compositor) — was an infinite framer loop ticking on the main
  // thread even while the contact section was off screen.
  return (
    <div
      className="pointer-events-none absolute inset-4 md:inset-8 rounded-3xl border border-accent-pink/20 neon-fade-pulse"
      style={{ animationDuration: '4s', animationDelay: '0.3s' }}
      aria-hidden
    />
  );
}

export function HomePage() {
  const t = useTranslations('home');
  const reduced = useReducedMotion();
  const contactRef = useRef<HTMLElement>(null);

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
      <SectionViewTracker sections={HOME_SECTION_IDS} page="home" />

      <main id="main-content">
        <HeroSection />

        <CreatorFeatureMarquee />
        <SectionDivider />
        <StatsShowcase />

        <AboutSection />

        <HowItWorksSection />

        <SectionDivider />
        <ModelShowcase />
        <SectionDivider />
        <ModelReviewsSection />

        <ServicesSection />

        <HomeSeoBlock />

        <section id="contact" ref={contactRef} className="relative py-16 md:py-22 overflow-hidden">
          <div className="absolute inset-0 bg-[#050508]" />
          <ParticleField opacity={0.9} density={1.1} />
          <div className="section-grid absolute inset-0 opacity-50" aria-hidden />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(168,85,247,0.2),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_0%,rgba(255,91,181,0.1),transparent)]" />
          <NeonAccents variant="contact" />

          <div className="max-w-4xl mx-auto px-5 md:px-8 text-center relative z-10">
            <ContactGlow reduced={reduced} />

            {reduced ? (
              <>
                <p className="eyebrow-bright mb-6">{t('contact.eyebrow')}</p>
                <h2 className="heading-section text-[clamp(2.5rem,6vw,4.25rem)] !leading-[1.2] mb-8">
                  {t('contact.title')}
                  <br />
                  <span className="text-gradient-brand font-serif-italic inline-block pb-[0.22em]">{t('contact.titleAccent')}</span>
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
                <h2 className="heading-section text-[clamp(2.5rem,6vw,4.25rem)] !leading-[1.2] mb-8">
                  {t('contact.title')}
                  <br />
                  <span className="text-gradient-brand font-serif-italic inline-block pb-[0.22em]">{t('contact.titleAccent')}</span>
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
              <WhatsAppCta label={t('contact.whatsappCta')} />
            </div>

            <p className="mt-6 text-sm text-white/40">
              {t('contact.careersLead')}{' '}
              <Link
                href="/vacancies"
                prefetch={false}
                className="text-accent-pink/90 underline decoration-accent-pink/30 underline-offset-4 transition-colors hover:text-accent-pink hover:decoration-accent-pink"
              >
                {t('contact.careersLink')}
              </Link>
            </p>

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
