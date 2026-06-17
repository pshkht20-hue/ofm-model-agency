'use client';

import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/Navbar';
import { ScrollProgress } from '@/components/ScrollProgress';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { NeonAmbience } from '@/components/ui/NeonAccents';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Link } from '@/i18n/navigation';
import { useReducedMotion } from '@/hooks/useMotionPreferences';
import {
  descReveal,
  staggerContainer,
  staggerItem,
  titleRevealMobile,
  VIEWPORT_DEFAULT,
} from '@/lib/motion';

type Crumb = { label: string; href?: string };

type SeoPageShellProps = {
  children: ReactNode;
  breadcrumbs?: Crumb[];
  showCta?: boolean;
};

export function SeoPageShell({
  children,
  breadcrumbs,
  showCta = true,
}: SeoPageShellProps) {
  const t = useTranslations('seoShell');
  const reduced = useReducedMotion();

  return (
    <div className="min-h-screen bg-[#050508] text-[#f4f2ef] overflow-x-hidden premium-grain">
      <NeonAmbience />
      <ScrollProgress />
      <Navbar />

      <main className="pt-24 md:pt-28 pb-16 md:pb-20">
        <div className="max-w-3xl mx-auto px-5 md:px-8 w-full">
          {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
          {children}
          {showCta && (
            <motion.div
              className="mt-14 p-8 md:p-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-center"
              initial={reduced ? undefined : 'hidden'}
              whileInView={reduced ? undefined : 'visible'}
              viewport={reduced ? undefined : VIEWPORT_DEFAULT}
              variants={reduced ? undefined : staggerContainer(0.1)}
            >
              <motion.p
                className="eyebrow-bright mb-3"
                variants={reduced ? undefined : staggerItem(16)}
              >
                {t('eyebrow')}
              </motion.p>
              <motion.h2
                className="font-serif text-2xl md:text-3xl text-white mb-4"
                variants={reduced ? undefined : titleRevealMobile}
              >
                {t('ctaTitle')}
              </motion.h2>
              <motion.p
                className="text-body mb-8 max-w-lg mx-auto"
                variants={reduced ? undefined : descReveal}
              >
                {t('ctaBody')}
              </motion.p>
              <motion.div variants={reduced ? undefined : staggerItem(16)}>
                <Link href="/#contact" className="btn-primary inline-flex">
                  {t('ctaButton')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
