'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { usePathname } from '@/i18n/navigation';
import { localeLabels, localeShort, routing, type Locale } from '@/i18n/routing';
import { pathForLocale } from '@/lib/i18n/paths';
import { useReducedMotion } from '@/hooks/useMotionPreferences';
import { EASE_SMOOTH } from '@/lib/motion';

/**
 * Переключатель языка = настоящие ссылки <a href>, а не onClick.
 *
 * Замер GSC 01–28.07.2026: /en — вторая страница сайта по показам (6 844,
 * позиция 7,7), но переключатель был собран на <button role="option"> +
 * router.replace, то есть ссылок между ru/uk/en/es для краулера не существовало
 * вообще. Из-за этого en- и es-кластеры питались только собственными страницами
 * (53 у /en) и не получали ничего от ru-кластера, куда приходят ВСЕ внешние
 * ссылки на домен. Правка работает только при двух условиях:
 *
 *  1) href должен быть в HTML, который отдаёт сервер. Поэтому список локалей
 *     больше не размонтируется (был AnimatePresence + `open && ...`, из-за чего
 *     <ul> появлялся только после клика мышкой и в SSR-разметке ссылок не было
 *     ни одной), а всегда присутствует и просто скрыт: opacity/pointer-events/
 *     inert. Скрытое CSS-ом меню — обычная навигационная практика, ссылки в нём
 *     Google учитывает.
 *  2) href должен вести на существующую страницу — см. fallbackPath().
 *
 * Почему next/link, а не <Link> из @/i18n/navigation: при переданном пропе
 * `locale` next-intl (v4.13, createSharedNavigationFns → forcePrefix) ПРИНУДИТЕЛЬНО
 * ставит префикс локали, и для ru получается /ru/..., хотя канонический ru-URL —
 * без префикса (localePrefix: 'as-needed'). Такая ссылка ушла бы в 307-редирект
 * на каждой странице сайта. Адрес считаем через pathForLocale — ту же функцию,
 * из которой собираются canonical и hreflang, так что href = canonical.
 */

/** Cookie ставилась раньше внутри router.replace(pathname, { locale }) — next-intl
 *  делает это в syncLocaleCookie. Повторяем формат один в один (v4.13:
 *  localeCookie по умолчанию = { name: 'NEXT_LOCALE', sameSite: 'lax' }, path
 *  дописывается из basePath), иначе при переходе на ссылку выбор языка не
 *  запомнится: middleware.ts смотрит именно наличие NEXT_LOCALE. */
function rememberLocale(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale};sameSite=lax;path=/`;
}

/** Единственное семейство маршрутов с неполным переводом (см. fallbackPath). */
const BLOG_POST_PATH = /^\/blog\/[^/]+$/;

function normalizePath(path: string): string {
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}

/**
 * Адрес этой же страницы в другой локали для серверной разметки.
 *
 * Переводы блога неполные: 42 статьи в ru, uk 42, en 24, es 20 — то есть 40
 * пар (локаль, slug) не существует. generateStaticParams в
 * app/[locale]/blog/[slug]/page.tsx строится по getBlogPostLocales, dynamicParams
 * выключен → непереведённая статья отдаёт настоящий 404, а не ru-фолбэк. Ссылка
 * на 404 в шапке каждой статьи хуже кнопки: её обходит краулер, и 40 адресов
 * оседают в отчёте GSC «Не найдено». Поэтому со статьи блога в разметку идёт
 * витрина локали (/uk/blog, /en/blog, /es/blog) — она существует всегда
 * (generateStaticParams этого маршрута = routing.locales из [locale]/layout.tsx)
 * и раздаёт вес на все статьи своей локали. Точный адрес перевода подставляется
 * на клиенте при открытии меню — из hreflang-тегов страницы (readLocaleAlternates),
 * так что живой пользователь по-прежнему попадает на ту же статью.
 *
 * Все остальные маршруты (главная, /join, /faq, /calculator, /vacancies/**,
 * /research/**, legal) собираются по routing.locales — там перевод есть всегда.
 */
function fallbackPath(pathname: string, locale: Locale): string {
  return pathForLocale(BLOG_POST_PATH.test(pathname) ? '/blog' : pathname, locale);
}

/**
 * Разбор hreflang-тегов открытой страницы: локаль → точный путь её перевода.
 *
 * Эти теги формирует lib/seo.ts → lib/i18n/paths.ts, и в них перечислены ровно
 * те локали, в которых страница реально существует (availableLocales). Это
 * единственный точный источник доступности, который есть на клиенте: тащить в
 * бандл getBlogPostLocales нельзя — за ним идут 1,7 МБ контента блога.
 *
 * Возвращает null, если карта не про эту страницу: при клиентской навигации
 * <head> обновляется не в тот же тик, и теги могут остаться от предыдущего
 * URL. Признак — запись для текущей локали не совпадает с текущим адресом;
 * тогда ссылки остаются на безопасных fallbackPath.
 *
 * Отдельная чистая функция (DOM разбирает вызывающий) — чтобы её можно было
 * прогнать на реальной разметке прод-страниц без браузера.
 */
export function readLocaleAlternates(
  tags: readonly { hreflang: string | null; pathname: string }[],
  currentLocale: Locale,
  currentPath: string,
): Partial<Record<Locale, string>> | null {
  const map: Partial<Record<Locale, string>> = {};
  for (const tag of tags) {
    // ru-UA / uk-UA / x-default — уточнения для Google, а не локали переключателя
    if (!tag.hreflang || !routing.locales.includes(tag.hreflang as Locale)) continue;
    map[tag.hreflang as Locale] = normalizePath(tag.pathname);
  }
  const self = map[currentLocale];
  return self && self === normalizePath(currentPath) ? map : null;
}

export function LanguageSwitcher({
  compact = false,
  toolbar = false,
}: {
  compact?: boolean;
  /** Встроен в панель шапки — без собственной рамки */
  toolbar?: boolean;
}) {
  const t = useTranslations('languageSwitcher');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  /** Адрес открытой страницы — той же функцией, что строит canonical и hreflang. */
  const currentPath = pathForLocale(pathname, locale);

  /**
   * Точные адреса переводов из hreflang-тегов страницы (см. readLocaleAlternates).
   * Нужны только для апгрейда ссылок на статьи блога: в серверной разметке там
   * стоит безопасная витрина локали.
   *
   * Читаем в обработчике открытия меню, а не в эффекте: в эффекте setState даёт
   * каскадный рендер (правило react-hooks/set-state-in-effect в Next 16), а на
   * момент клика <head> заведомо соответствует текущему рендеру. Пользователь
   * физически не может кликнуть по пункту раньше, чем откроет меню.
   */
  const [alternates, setAlternates] = useState<{
    path: string;
    map: Partial<Record<Locale, string>>;
  } | null>(null);

  // Карта годится только для страницы, с которой её прочитали: после любой
  // навигации (включая «назад») сравнение путей само её обнуляет. Первый рендер
  // на клиенте идёт с null, то есть совпадает с серверным — hydration mismatch
  // невозможен.
  const exact = alternates?.path === currentPath ? alternates.map : null;

  function toggle() {
    if (!open) {
      const tags = Array.from(
        document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]'),
      ).map((el) => ({
        hreflang: el.getAttribute('hreflang'),
        pathname: new URL(el.href).pathname,
      }));
      const map = readLocaleAlternates(tags, locale, currentPath);
      setAlternates(map ? { path: currentPath, map } : null);
    }
    setOpen((v) => !v);
  }

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function select(next: Locale) {
    if (next !== locale) rememberLocale(next);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={toggle}
        className={`inline-flex items-center gap-1.5 rounded-full text-white/80 hover:text-white transition-all ${
          toolbar
            ? 'h-8 px-2.5 hover:bg-white/[0.06]'
            : `border border-white/10 bg-white/[0.04] backdrop-blur-sm hover:border-accent-pink/40 hover:bg-white/[0.06] ${
                compact ? 'h-9 px-2.5' : 'h-10 px-3.5'
              }`
        } ${open && !toolbar ? 'border-accent-pink/45 bg-white/[0.07] text-white' : ''} ${
          open && toolbar ? 'bg-white/[0.06] text-white' : ''
        }`}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={t('ariaLabel')}
      >
        <Globe className="w-4 h-4 text-accent-cyan/90 shrink-0" strokeWidth={1.75} />
        <span className="text-[11px] font-semibold tracking-[0.12em] uppercase tabular-nums">
          {localeShort[locale]}
        </span>
        {!compact && (
          <span className="hidden lg:inline text-xs font-normal text-white/45 normal-case tracking-normal max-w-[5.5rem] truncate">
            {localeLabels[locale]}
          </span>
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 text-white/40 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Меню всегда в DOM — иначе ссылок нет в серверной разметке (см. шапку
          файла). Закрытое состояние: прозрачное, некликабельное, вне tab-порядка
          и вне дерева доступности. opacity-0 классом — страховка на случай, если
          инлайновый стиль от framer-motion не успел примениться до гидратации;
          pointer-events-none дублирует inert для Safari 15.4 (браузер из
          browserslist, где inert ещё не поддержан). */}
      <motion.div
        id={menuId}
        initial={false}
        animate={
          open
            ? reduced
              ? { opacity: 1 }
              : { opacity: 1, y: 0, scale: 1 }
            : reduced
              ? { opacity: 0 }
              : { opacity: 0, y: 6, scale: 0.98 }
        }
        transition={reduced ? { duration: 0 } : { duration: 0.18, ease: EASE_SMOOTH }}
        className={`absolute right-0 top-[calc(100%+8px)] z-[70] min-w-[200px] rounded-2xl border border-white/[0.1] bg-[#0c0c12]/98 backdrop-blur-xl shadow-[0_20px_50px_-16px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,91,181,0.08)] overflow-hidden ${
          open ? '' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="px-3 py-2.5 border-b border-white/[0.06]">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">{t('menuTitle')}</p>
        </div>
        {/* Список ссылок вместо прежних role="listbox"/role="option": option не
            может содержать ссылку, а имя меню (t('ariaLabel')) сохраняем на ul —
            скринридер объявляет «Выбор языка, список, 4 элемента». */}
        <ul className="p-1.5" aria-label={t('ariaLabel')}>
          {routing.locales.map((l) => {
            const active = l === locale;
            // Текущая локаль — всегда точный адрес открытой страницы: она заведомо
            // существует, и aria-current="page" должен указывать именно на неё.
            const href = active ? currentPath : (exact?.[l] ?? fallbackPath(pathname, l));
            return (
              <li key={l}>
                <NextLink
                  href={href}
                  hrefLang={l}
                  lang={l}
                  // replace — прежнее поведение router.replace: смена языка не
                  // засоряет историю. prefetch={false} — меню теперь всегда в
                  // DOM, без этого Next тянул бы RSC-payload трёх чужих локалей
                  // на каждой странице.
                  replace
                  prefetch={false}
                  tabIndex={open ? undefined : -1}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => select(l)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition ${
                    active
                      ? 'bg-accent-pink/15 text-white'
                      : 'text-white/70 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold tracking-wider shrink-0 ${
                      active
                        ? 'bg-accent-pink/25 text-accent-pink border border-accent-pink/30'
                        : 'bg-white/[0.04] text-white/50 border border-white/[0.06]'
                    }`}
                  >
                    {localeShort[l]}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium leading-tight">
                      {localeLabels[l]}
                    </span>
                  </span>
                  {active && (
                    <Check className="w-4 h-4 text-accent-cyan shrink-0" strokeWidth={2.5} />
                  )}
                </NextLink>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
}
