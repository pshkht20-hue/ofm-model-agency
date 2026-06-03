import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google';
import { JsonLd } from '@/components/JsonLd';
import { routing, openGraphLocale, type Locale } from '@/i18n/routing';
import { getSiteUrl, siteConfig } from '@/lib/site';
import { pathForLocale, hreflangAlternates } from '@/lib/i18n/paths';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
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
    keywords: [...siteConfig.keywords],
    openGraph: {
      type: 'website',
      locale: openGraphLocale[locale as Locale],
      url: canonicalPath,
      siteName: siteConfig.name,
      title: t('siteTitle'),
      description: t('siteDescription'),
    },
    alternates: {
      canonical: canonicalPath,
      languages: hreflangAlternates(siteUrl, '/'),
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

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
    >
      <body className="min-h-full font-sans antialiased bg-[#050508] text-[#f4f2ef]">
        <NextIntlClientProvider messages={messages}>
          <JsonLd locale={locale as Locale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
