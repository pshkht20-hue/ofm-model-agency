'use client';

import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/Navbar';
import { ScrollProgress } from '@/components/ScrollProgress';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { NeonAmbience } from '@/components/ui/NeonAccents';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Link } from '@/i18n/navigation';

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
            <div className="mt-14 p-8 md:p-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-center">
              <p className="eyebrow-bright mb-3">{t('eyebrow')}</p>
              <h2 className="font-serif text-2xl md:text-3xl text-white mb-4">{t('ctaTitle')}</h2>
              <p className="text-body mb-8 max-w-lg mx-auto">{t('ctaBody')}</p>
              <Link href="/#contact" className="btn-primary inline-flex">
                {t('ctaButton')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
