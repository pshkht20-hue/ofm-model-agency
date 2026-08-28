import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { Geist, Playfair_Display } from 'next/font/google';
import { AnalyticsLoader } from '@/components/analytics/AnalyticsLoader';
import { ClarityLoader } from '@/components/analytics/ClarityLoader';
import { GoogleConsentDefaults } from '@/components/analytics/GoogleConsentDefaults';
import { ScrollDepthTracker } from '@/components/analytics/ScrollDepthTracker';
import { CookieConsent } from '@/components/consent/CookieConsent';
import { JsonLd } from '@/components/JsonLd';
import { routing, openGraphLocale, type Locale } from '@/i18n/routing';
import { getSiteUrl, siteConfig } from '@/lib/site';
import { pathForLocale, hreflangAlternates } from '@/lib/i18n/paths';
import '../globals.css';

// 'cyrillic' in subsets: the site's base locale is Russian, so the cyrillic
// glyph file is fetched on every ru/uk page anyway — listing the subset turns
// that late CSS-discovered fetch into an early parallel preload.
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
});

// The giant italic hero headline ("OnlyFans") is the mobile LCP element. It is
// the ONLY thing that uses --font-playfair, so we scope a dedicated instance to
// exactly the 400-italic glyph file and preload ONLY that one woff2. (Preloading
// all 4 Playfair variants previously regressed LCP by stealing 4G bandwidth — a
// single-file preload is the surgical fix.) adjustFontFallback stays on (no
// custom `fallback` array) so the metric-matched serif fallback keeps the LCP
// box from resizing on swap.
const playfairHeadline = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  display: 'swap',
  preload: true,
});

// All other serif text (heading-display, section titles, font-serif) — normal +
// italic, 400/700, NOT preloaded (not in the LCP path).
const playfairRest = Playfair_Display({
  variable: '--font-playfair-rest',
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: false,
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'meta' });
  const siteUrl = getSiteUrl();
  const canonicalPath = pathForLocale('/', locale as Locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t('siteTitle'),
      template: `%s | ${siteConfig.shortName}`,
    },
    description: t('siteDescription'),
    openGraph: {
      type: 'website',
      locale: openGraphLocale[locale as Locale],
      url: canonicalPath,
      siteName: siteConfig.name,
      title: t('siteTitle'),
      description: t('siteDescription'),
      images: [
        {
          url: '/og-default.png',
          width: 1200,
          height: 630,
          alt: t('siteTitle'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('siteTitle'),
      description: t('siteDescription'),
      images: ['/og-default.png'],
    },
    alternates: {
      canonical: canonicalPath,
      languages: hreflangAlternates(siteUrl, '/'),
    },
    // Как в createPageMetadata: без явного блока у главной не было
    // max-image-preview:large / max-snippet — единственного типа страниц без него.
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const tMeta = await getTranslations({ locale, namespace: 'meta' });

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${playfairHeadline.variable} ${playfairRest.variable}`}
    >
      <body className="min-h-full font-sans antialiased bg-[#050508] text-[#f4f2ef]">
        <GoogleConsentDefaults />
        <NextIntlClientProvider messages={messages}>
          <JsonLd locale={locale as Locale} description={tMeta('siteDescription')} />
          {children}
          <CookieConsent />
          <AnalyticsLoader />
          <ClarityLoader />
          <ScrollDepthTracker />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
