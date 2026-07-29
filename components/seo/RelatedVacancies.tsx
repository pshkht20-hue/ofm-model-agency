import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import {
  getModelGeoContent,
  getModelGeoCountry,
  getModelGeoPageSlugs,
} from '@/lib/content/model-geo';

/**
 * «Соседние вакансии» внизу страницы вакансии — с любой страницы есть
 * следующий шаг, пустых выходов нет (урок джобордов-лидеров). Подбор:
 * родственные по виду записи (город → соседние города и страна; формат →
 * другие форматы; страна → другие страны), добор из остальных. 3 карточки.
 *
 * Выбор РОТАЦИОННЫЙ, а не «первые три» — см. комментарий к picks ниже.
 */
const HEADING: Record<Locale, string> = {
  ru: 'Смотри также',
  uk: 'Дивись також',
  en: 'You may also like',
  es: 'También te puede interesar',
};

function groupThousands(value: number): string {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function RelatedVacancies({
  locale,
  currentSlug,
  className = '',
}: {
  locale: Locale;
  currentSlug: string;
  className?: string;
}): ReactNode {
  const registry = getModelGeoPageSlugs();
  // Сама страница из кандидатов исключена — самоссылки быть не может.
  const all = registry.filter((s) => s !== currentSlug);
  const current = getModelGeoCountry(currentSlug);
  const isFormat = current?.kind === 'format';
  const isCity = currentSlug.includes('/');
  const countryPrefix = isCity ? currentSlug.split('/')[0] : null;

  // «Семья» — родственные записи (города той же страны / другие форматы /
  // другие страны). Из неё всегда берётся первая карточка.
  const family = all.filter((s) => {
    const kind = getModelGeoCountry(s)?.kind === 'format';
    if (isFormat) return kind;
    if (isCity) return s === countryPrefix || s.startsWith(`${countryPrefix}/`);
    return !kind && !s.includes('/');
  });
  const ordered = [...new Set([...family, ...all])];
  if (ordered.length === 0) return null;

  /**
   * Ротационный подбор вместо прежнего slice(0, 3).
   *
   * ПРИЧИНА (аудит перелинковки 07.2026): блок всегда отдавал ПЕРВЫЕ три слага
   * по порядку реестра, поэтому 7 из 18 страниц раздела не получали от него ни
   * одной входящей ссылки. Для гео-страниц это компенсировал GeoLinkBar, но
   * позиции-форматы он не показывает: у /vacancies/model/premium-25-plus и
   * /vacancies/model/with-account (два самых маржинальных сегмента — премиум-
   * типаж и модель с готовым аккаунтом) оставался ровно ОДИН источник входящих
   * ссылок во всех четырёх локалях — хаб /vacancies/model.
   *
   * СХЕМА: 1-я карточка — из «семьи» (релевантность сохранена), 2-я и 3-я —
   * с шагом в треть общего списка кандидатов (средняя · дальняя). Стартовая
   * точка обеих ротаций = позиция страницы-донора в реестре гео. Реестр
   * статичен → выбор детерминирован и одинаков в каждой сборке (SSR и
   * гидрация не расходятся), но у каждой из 18 страниц он свой.
   *
   * ЗАМЕР по всем 18 страницам раздела: было min 0 / max 11 входящих ссылок
   * (8 страниц с нулём), стало min 2 / max 5 — входящую ссылку получает каждая
   * страница, а доля «родственных» карточек выросла с 20/54 до 29/54.
   * ⛔ Не возвращать slice(0, 3): это ровно тот откат, что создал сирот.
   */
  const step = Math.max(1, Math.floor(ordered.length / 3));
  const start = Math.max(registry.indexOf(currentSlug), 0);
  const picks: string[] = [];
  if (family.length > 0) picks.push(family[start % family.length]);
  for (let k = 1; picks.length < 3 && k <= ordered.length; k += 1) {
    const candidate = ordered[(start + k * step) % ordered.length];
    if (!picks.includes(candidate)) picks.push(candidate);
  }
  // Добор по порядку списка — страховка, если шаг зациклился раньше трёх
  // (актуально для маленьких реестров, где step делит длину нацело).
  for (const candidate of ordered) {
    if (picks.length >= 3) break;
    if (!picks.includes(candidate)) picks.push(candidate);
  }

  const items = picks
    .map((slug) => {
      const content = getModelGeoContent(slug, locale);
      const record = getModelGeoCountry(slug);
      return content && record ? { slug, content, record } : null;
    })
    .filter((i): i is NonNullable<typeof i> => i !== null);

  if (items.length === 0) return null;

  return (
    <section className={className}>
      <h2 className="font-serif text-2xl md:text-3xl text-white mb-6">{HEADING[locale]}</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map(({ slug, content, record }) => (
          <Link
            key={slug}
            href={`/vacancies/model/${slug}`}
            className="group flex flex-col justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 transition-colors hover:border-accent-pink/35 hover:bg-white/[0.04]"
          >
            <div>
              <p className="text-xs uppercase tracking-wide text-white/45">{content.countryName}</p>
              <p className="mt-1.5 font-medium leading-snug text-white line-clamp-2">
                {content.title}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2">
              <span className="font-sans text-sm font-semibold tracking-tight text-accent-cyan tabular-nums">
                ${groupThousands(record.incomeUsd.min)}–{groupThousands(record.incomeUsd.max)}
              </span>
              <ArrowRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-accent-pink" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
