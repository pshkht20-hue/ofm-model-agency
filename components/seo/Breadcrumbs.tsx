'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const t = useTranslations('common');

  return (
    <nav aria-label={t('breadcrumbs')} className="mb-8 text-xs text-white/40">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" className="hover:text-accent-pink transition">
            {t('home')}
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-x-2">
            <span aria-hidden>/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-accent-pink transition">
                {item.label}
              </Link>
            ) : (
              <span className="text-white/60">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
