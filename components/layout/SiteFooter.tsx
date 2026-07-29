'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Logo } from '@/components/Logo';
import { LegalDisclaimer } from '@/components/CreatorTheme';
import { NeonAccents } from '@/components/ui/NeonAccents';
import { Link } from '@/i18n/navigation';
import { CookieSettingsButton } from '@/components/consent/CookieSettingsButton';
import { SocialLinks } from '@/components/social/SocialLinks';
import { useReducedMotion } from '@/hooks/useMotionPreferences';
import { trackCtaClick, trackEmailClick } from '@/lib/analytics/gtag';
import { siteConfig } from '@/lib/site';
import { staggerContainer, staggerItem, VIEWPORT_DEFAULT } from '@/lib/motion';

export function SiteFooter() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const reduced = useReducedMotion();

  const NAV = [
    { href: '/#about' as const, label: tNav('about') },
    { href: '/#how' as const, label: tNav('how') },
    { href: '/#models' as const, label: tNav('models') },
    { href: '/#results' as const, label: tNav('results') },
    { href: '/#reviews' as const, label: t('reviews') },
  ];

  const RESOURCES = [
    // /about — страница «кто мы» (29.07.2026). Тема смежна с YMYL, а объяснения
    // «что мы за компания» не было ни на одной из 266 страниц: sitewide-ссылка
    // из футера — единственный способ дать новой странице внутренний вес сразу,
    // и она же ведёт на неё брендовый трафик (главная: 773 показа, CTR 7,63%).
    { href: '/about' as const, label: tNav('aboutPage') },
    { href: '/faq' as const, label: tNav('faq') },
    { href: '/blog' as const, label: tNav('blog') },
    { href: '/vacancies' as const, label: tNav('careers') },
    // Пиллар инфо-ядра в sitewide-слоте. До 29.07.2026 футер отдавал 71 ссылку
    // с каждой страницы локали статьям с 7–30 показами, а страница с 9 963
    // показами (позиция 12,2) не получала ни одной sitewide-ссылки. Sitewide —
    // самый дорогой ссылочный ресурс сайта, и он должен работать на цель
    // «ТОП-3–5 по инфо-ядру», а не на длинный хвост.
    {
      href: '/blog/chto-takoe-onlyfans' as const,
      label: t('pillarWhatIs'),
    },
    {
      href: '/blog/rabota-modelyu-onlyfans' as const,
      label: t('vacancy'),
    },
    ...(locale === 'ru' || locale === 'uk'
      ? [
          {
            href: '/blog/robota-dlya-ukrainok-za-kordonom' as const,
            label: t('diaspora'),
          },
        ]
      : []),
    {
      href: '/blog/kak-vybrat-onlyfans-agentstvo' as const,
      label: t('guideAgency'),
    },
    // Sitewide equity to the previously link-starved clusters (marketing / money
    // / safety) — these pillars had zero homepage/footer inbound links, which is
    // a driver of GSC "Discovered – currently not indexed". All three exist in
    // every locale, so no locale gating is needed.
    {
      href: '/blog/onlyfans-marketing-strategiya-2026' as const,
      label: t('clusterMarketing'),
    },
    {
      href: '/blog/onlyfans-skolko-zarabatyvayut-modeli' as const,
      label: t('clusterEarnings'),
    },
    {
      href: '/blog/onlyfans-anonimnost-i-bezopasnost' as const,
      label: t('clusterSafety'),
    },
    // /research is published in all four locales.
    {
      href: '/research' as const,
      label:
        locale === 'uk'
          ? 'Дослідження'
          : locale === 'en'
            ? 'Research'
            : locale === 'es'
              ? 'Investigación'
              : 'Исследования',
    },
  ];

  return (
    <footer className="cv-below-fold bg-[#030306] border-t border-white/[0.06] py-12 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_100%,rgba(255,91,181,0.06),transparent)] pointer-events-none" />
      <NeonAccents variant="footer" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-8"
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={reduced ? undefined : VIEWPORT_DEFAULT}
          variants={reduced ? undefined : staggerContainer(0.1)}
        >
          <motion.div
            className="md:col-span-2 lg:col-span-2"
            variants={reduced ? undefined : staggerItem(20)}
          >
            <Logo size="lg" href="/" wordmarkOnMobile className="mb-6" mark3d />
            <p className="max-w-md text-body">{t('tagline')}</p>
          </motion.div>

          <motion.div variants={reduced ? undefined : staggerItem(20)}>
            <p className="eyebrow-bright mb-6 !text-[10px]">{t('navTitle')}</p>
            <div className="flex flex-col gap-y-3 text-sm text-white/55">
              {NAV.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="link-hover-line hover:text-accent-pink transition-colors w-fit"
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div variants={reduced ? undefined : staggerItem(20)}>
            <p className="eyebrow-bright mb-6 !text-[10px]">{t('resourcesTitle')}</p>
            <div className="flex flex-col gap-y-3 text-sm text-white/55">
              {/* prefetch: false — иначе Next при появлении футера в viewport
                  префетчит RSC-payload всех статей/blog/faq/research разом */}
              {RESOURCES.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  prefetch={false}
                  className="link-hover-line hover:text-accent-pink transition-colors w-fit"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={() => trackCtaClick({ location: 'footer', locale })}
                className="link-hover-line hover:text-accent-pink transition-colors w-fit"
              >
                {t('apply')}
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-2 lg:col-span-1"
            variants={reduced ? undefined : staggerItem(20)}
          >
            <SocialLinks variant="footer" />

            {/* Официальная почта — для тех, у кого нет соцсетей */}
            <p className="eyebrow-bright mb-4 mt-10 !text-[10px]">{t('emailTitle')}</p>
            <a
              href={`mailto:${siteConfig.email}`}
              onClick={() => trackEmailClick({ location: 'footer', locale })}
              className="group inline-flex items-center gap-2.5 rounded-full border border-accent-pink/25 bg-white/[0.03] px-4 py-2.5 text-sm text-white/70 shadow-[0_0_16px_-6px_rgba(255,91,181,0.35)] transition-all duration-300 hover:border-accent-pink/60 hover:text-white hover:shadow-[0_0_24px_-4px_rgba(255,91,181,0.55)]"
            >
              <Mail
                className="h-4 w-4 shrink-0 text-accent-pink/80 transition-colors group-hover:text-accent-pink"
                aria-hidden
              />
              <span className="tracking-wide">{siteConfig.email}</span>
            </a>
          </motion.div>
        </motion.div>

        <LegalDisclaimer className="mt-12 max-w-3xl" />

        <div className="mt-10 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-y-4 text-xs text-white/40">
          <span>© {new Date().getFullYear()} OFM&apos;s Model Agency</span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/privacy" prefetch={false} className="link-hover-line hover:text-accent-pink transition-colors">
              {t('privacy')}
            </Link>
            <Link href="/terms" prefetch={false} className="link-hover-line hover:text-accent-pink transition-colors">
              {t('terms')}
            </Link>
            <CookieSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
