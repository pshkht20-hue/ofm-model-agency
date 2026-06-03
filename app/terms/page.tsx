import type { Metadata } from 'next';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { TERMS_SECTIONS } from '@/lib/content/legal';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Условия использования сайта',
  description:
    'Условия использования сайта OFM\'s Model Agency: заявки, ответственность, интеллектуальная собственность.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <SeoPageShell breadcrumbs={[{ label: 'Условия использования' }]} showCta={false}>
      <BreadcrumbJsonLd
        items={[
          { name: 'Главная', path: '/' },
          { name: 'Условия использования', path: '/terms' },
        ]}
      />

      <h1 className="heading-section text-[clamp(1.75rem,4vw,2.5rem)] mb-8">
        Условия использования
      </h1>
      <p className="text-body mb-10">Обновлено: март 2026</p>

      <div className="space-y-10">
        {TERMS_SECTIONS.map((section) => (
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
