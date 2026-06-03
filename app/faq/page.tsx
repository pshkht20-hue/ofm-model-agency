import type { Metadata } from 'next';
import Link from 'next/link';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { FAQ_ITEMS } from '@/lib/content/faq';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'FAQ — OnlyFans агентство для моделей | OFM',
  description:
    'Ответы на частые вопросы об OnlyFans агентстве: как выбрать команду, условия, конфиденциальность, заявка и заработок моделей.',
  path: '/faq',
  keywords: ['onlyfans агентство faq', 'вопросы onlyfans агентство'],
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
        FAQ об OnlyFans агентстве
      </h1>
      <p className="text-lead mb-10">
        Собрали ответы для моделей, которые ищут надёжное агентство: условия, подача заявки,
        конфиденциальность и рост дохода. Не нашли ответ —{' '}
        <Link href="/#contact" className="text-accent-pink hover:text-accent-cyan transition">
          напишите нам
        </Link>
        .
      </p>

      <FaqAccordion items={FAQ_ITEMS} />

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
