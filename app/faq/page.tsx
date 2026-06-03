import type { Metadata } from 'next';
import Link from 'next/link';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { FAQ_CATEGORIES, FAQ_ITEMS } from '@/lib/content/faq';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'FAQ — OnlyFans агентство: вопросы о менеджменте, % и безопасности',
  description:
    'Подробные ответы о OnlyFans management: услуги, комиссия, договор, чаты 24/7, конфиденциальность, заявка в OFM и как не попасть к мошенникам.',
  path: '/faq',
  keywords: [
    'onlyfans агентство faq',
    'onlyfans management вопросы',
    'сколько берет onlyfans агентство',
    'как выбрать onlyfans агентство',
  ],
});

export default function FaqPage() {
  return (
    <SeoPageShell breadcrumbs={[{ label: 'FAQ' }]}>
      <FaqPageJsonLd items={FAQ_ITEMS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Главная', path: '/' },
          { name: 'FAQ', path: '/faq' },
        ]}
      />

      <p className="eyebrow-bright mb-4">Вопросы и ответы</p>
      <h1 className="heading-section text-[clamp(2rem,5vw,3rem)] mb-6">
        FAQ: OnlyFans агентство и management
      </h1>
      <p className="text-lead mb-4">
        {FAQ_ITEMS.length} ответов о том, как работают профессиональные OnlyFans агентства: услуги,
        комиссия, договор, безопасность аккаунта и заявка в OFM&apos;s Model Agency.
      </p>
      <p className="text-body mb-10">
        Материал основан на общей практике creator-management (чаты, маркетинг, revenue share).
        Не нашли вопрос —{' '}
        <Link href="/#contact" className="text-accent-pink hover:text-accent-cyan transition">
          напишите менеджеру
        </Link>
        .
      </p>

      <FaqAccordion categories={FAQ_CATEGORIES} />

      <p className="text-body mt-10">
        Читайте также в{' '}
        <Link href="/blog" className="text-accent-pink hover:text-accent-cyan transition">
          блоге
        </Link>
        : гайды по выбору агентства и старту на платформе.
      </p>
    </SeoPageShell>
  );
}
