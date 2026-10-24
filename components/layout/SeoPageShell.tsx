'use client';

import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { m as motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Navbar } from '@/components/Navbar';
import { ScrollProgress } from '@/components/ScrollProgress';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { TelegramCta } from '@/components/TelegramCta';
import { NeonAmbience } from '@/components/ui/NeonAccents';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Link, usePathname } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { useReducedMotion } from '@/hooks/useMotionPreferences';
import { trackCtaClick } from '@/lib/analytics/gtag';
import { RESPONSE_TEXT } from '@/lib/content/response-hours';
import {
  descReveal,
  staggerContainer,
  staggerItem,
  titleRevealMobile,
  VIEWPORT_DEFAULT,
} from '@/lib/motion';

type Crumb = { label: string; href?: string };

/** Локальные строки конверсионного слоя — messages/* не трогаем, слой аддитивный. */
// «Окно 1» (W1-09): часы ответа из одной константы; «страниц» вместо «моделей» по совету №35.
const TRUST_LINE: Record<Locale, string> = {
  ru: `220+ запущенных страниц · ${RESPONSE_TEXT.ru.chip}`,
  uk: `220+ запущених сторінок · ${RESPONSE_TEXT.uk.chip}`,
  en: `220+ pages launched · ${RESPONSE_TEXT.en.chip}`,
  es: `220+ páginas lanzadas · ${RESPONSE_TEXT.es.chip}`,
};

const TELEGRAM_LABEL: Record<Locale, string> = {
  ru: 'Или напишите сразу в Telegram',
  uk: 'Або напишіть одразу в Telegram',
  en: 'Or message us on Telegram',
  es: 'O escríbenos por Telegram',
};

type SeoPageShellProps = {
  children: ReactNode;
  breadcrumbs?: Crumb[];
  /** Финальный CTA-блок в конце страницы. */
  showCta?: boolean;
  /** Куда ведёт финальный CTA. По умолчанию /join — готовая посадочная с анкетой. */
  ctaHref?: string;
  /**
   * Куда ведёт мобильный sticky-бар. По умолчанию совпадает с ctaHref.
   * Передай null, чтобы не показывать бар совсем; '#apply' — если анкета на этой же странице.
   */
  stickyHref?: string | null;
};

export function SeoPageShell({
  children,
  breadcrumbs,
  showCta = true,
  ctaHref = '/join',
  stickyHref,
}: SeoPageShellProps) {
  const stickyTarget =
    stickyHref === undefined ? (showCta ? ctaHref : null) : stickyHref;
  const t = useTranslations('seoShell');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <div className="min-h-screen bg-[#050508] text-[#f4f2ef] overflow-x-hidden premium-grain">
      <NeonAmbience />
      <ScrollProgress />
      <Navbar />
      {stickyTarget && <StickyMobileCta href={stickyTarget} />}

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
                <Link
                  href={ctaHref}
                  className="btn-primary inline-flex"
                  onClick={() =>
                    trackCtaClick({ location: 'seo_shell', locale, page_path: pathname })
                  }
                >
                  {t('ctaButton')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.p
                className="mt-4 text-xs text-white/45"
                variants={reduced ? undefined : staggerItem(12)}
              >
                {TRUST_LINE[locale]}
              </motion.p>
              <motion.div
                className="mt-3"
                variants={reduced ? undefined : staggerItem(12)}
              >
                <TelegramCta
                  location="contact_primary"
                  label={TELEGRAM_LABEL[locale]}
                  variant="inline"
                />
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
