'use client';

import { useTranslations } from 'next-intl';
import { Logo } from '@/components/Logo';
import { LegalDisclaimer } from '@/components/CreatorTheme';
import { NeonAccents } from '@/components/ui/NeonAccents';
import { Link } from '@/i18n/navigation';

export function SiteFooter() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  const NAV = [
    { href: '/#about' as const, label: tNav('about') },
    { href: '/#how' as const, label: tNav('how') },
    { href: '/#models' as const, label: tNav('models') },
    { href: '/#results' as const, label: tNav('results') },
    { href: '/#reviews' as const, label: t('reviews') },
  ];

  const RESOURCES = [
    { href: '/faq' as const, label: tNav('faq') },
    { href: '/blog' as const, label: tNav('blog') },
    {
      href: '/blog/kak-vybrat-onlyfans-agentstvo' as const,
      label: t('guideAgency'),
    },
  ];

  return (
    <footer className="bg-[#030306] border-t border-white/[0.06] py-12 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_100%,rgba(255,91,181,0.06),transparent)] pointer-events-none" />
      <NeonAccents variant="footer" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-y-12">
          <div className="lg:col-span-2">
            <Logo size="lg" href="/" wordmarkOnMobile className="mb-6" />
            <p className="max-w-md text-body">{t('tagline')}</p>
          </div>

          <div>
            <p className="eyebrow-bright mb-6 !text-[10px]">{t('navTitle')}</p>
            <div className="flex flex-col gap-y-3 text-sm text-white/55">
              {NAV.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="link-hover-line hover:text-accent-pink transition w-fit"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow-bright mb-6 !text-[10px]">{t('resourcesTitle')}</p>
            <div className="flex flex-col gap-y-3 text-sm text-white/55">
              {RESOURCES.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="link-hover-line hover:text-accent-pink transition w-fit"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/#contact"
                className="link-hover-line hover:text-accent-pink transition w-fit"
              >
                {t('apply')}
              </Link>
            </div>
          </div>
        </div>

        <LegalDisclaimer className="mt-12 max-w-3xl" />

        <div className="mt-10 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-y-4 text-xs text-white/40">
          <span>© {new Date().getFullYear()} OFM&apos;s Model Agency</span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="link-hover-line hover:text-accent-pink transition">
              {t('privacy')}
            </Link>
            <Link href="/terms" className="link-hover-line hover:text-accent-pink transition">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
