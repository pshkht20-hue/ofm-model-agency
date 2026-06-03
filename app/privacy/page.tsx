import type { Metadata } from 'next';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { PRIVACY_SECTIONS } from '@/lib/content/legal';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Политика конфиденциальности',
  description:
    'Политика конфиденциальности OFM\'s Model Agency: какие данные собираем при заявке на сайте и как их защищаем.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <SeoPageShell breadcrumbs={[{ label: 'Политика конфиденциальности' }]} showCta={false}>
      <BreadcrumbJsonLd
        items={[
          { name: 'Главная', path: '/' },
          { name: 'Политика конфиденциальности', path: '/privacy' },
        ]}
      />

      <h1 className="heading-section text-[clamp(1.75rem,4vw,2.5rem)] mb-8">
        Политика конфиденциальности
      </h1>
      <p className="text-body mb-10">Обновлено: март 2026</p>

      <div className="space-y-10">
        {PRIVACY_SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-lg font-semibold text-white mb-3">{section.title}</h2>
            {section.paragraphs.map((p) => (
              <p key={p} className="text-body mb-3 last:mb-0">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </SeoPageShell>
  );
}
