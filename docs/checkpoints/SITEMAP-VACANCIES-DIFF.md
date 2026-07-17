# SITEMAP DIFF — раздел «Вакансии» (на апрув владельца)

**Статус:** НЕ применено. `app/sitemap.ts` — точка апрува владельца, правится только с явного подтверждения.
Ниже — готовый **аддитивный** фрагмент для включения хаба `/vacancies` и 4 ролевых страниц
`/vacancies/{chatter,model,manager,assistant}-onlyfans` во всех 4 локалях (ru/uk/en/es) с hreflang
по образцу существующих записей sitemap (блок `STATIC_ROUTES`).

Ничего из существующего фрагмент не меняет и не удаляет — только добавляет `entries.push(...)`.

---

## 1. Импорт (добавить к блоку импортов, строки 1–11)

Вставить рядом с остальными `@/lib/content/*`-импортами (напр. сразу после строки 3
`import { getBlogPostLocales } from '@/lib/content/blog';`):

```ts
import { getVacancyPageSlugs, getVacancyDates } from '@/lib/content/vacancies';
```

- `getVacancyPageSlugs()` возвращает **ровно 4** слага с `hasPage: true` в порядке листинга:
  `chatter-onlyfans`, `model-onlyfans`, `manager-onlyfans`, `assistant-onlyfans`.
  Пятая роль `smm-onlyfans` (`hasPage: false`) — карточка только в хабе, **своего URL не получает** и в sitemap не попадает. Порог по `hasPage` — единый источник правды: когда владелец включит страницу SMM (волна 2), она автоматически появится и в sitemap без правок этого блока.
- `getVacancyDates(slug).dateModified` — дата из `lib/content/vacancies/dates.json` (машинная авто-ротация, этап 3), тот же источник, что питает видимую дату «Обновлено».

Обе функции уже реэкспортируются из `@/lib/content/vacancies` (`index.ts` → `registry.ts`) — новых экспортов заводить не нужно.

---

## 2. Тело (аддитивный блок)

**Куда:** внутри `export default function sitemap()`, **сразу после** цикла `STATIC_ROUTES`
`for (const locale of routing.locales) { … }` (после закрывающей `}` — текущая строка **50**)
и **перед** блоговым циклом `for (const slug of slugs) {` (текущая строка **52**).

Использует те же уже объявленные в функции переменные, что и соседние блоки:
`siteUrl`, `now`, `routing.locales`, `pathForLocale`, `hreflangAlternates`, тип `Locale`.

```ts
  // --- Vacancies section (hub + 4 role pages) ---
  // Аддитивный блок по образцу цикла STATIC_ROUTES выше: каждая локаль, полный
  // hreflang-набор (hreflangAlternates по умолчанию = все routing.locales + x-default).
  // getVacancyPageSlugs() отдаёт ровно 4 слага с hasPage:true —
  // chatter/model/manager/assistant-onlyfans (smm-onlyfans — карточка только в хабе).
  for (const locale of routing.locales) {
    // Хаб — BOFU-листинг ролей; приоритет на уровне /join и /faq.
    entries.push({
      url: `${siteUrl}${pathForLocale('/vacancies', locale as Locale)}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: hreflangAlternates(siteUrl, '/vacancies') },
    });

    // Ролевые страницы — по одному URL на слаг; lastModified = dateModified вакансии.
    for (const slug of getVacancyPageSlugs()) {
      const path = `/vacancies/${slug}`;
      entries.push({
        url: `${siteUrl}${pathForLocale(path, locale as Locale)}`,
        lastModified: new Date(getVacancyDates(slug).dateModified),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: { languages: hreflangAlternates(siteUrl, path) },
      });
    }
  }
```

---

## 3. Что это добавит в sitemap.xml (20 URL = 5 страниц × 4 локали)

`pathForLocale`: ru — база без префикса, uk/en/es — с префиксом. Пример хаба:

| Локаль | URL |
| --- | --- |
| ru (x-default) | `{siteUrl}/vacancies` |
| uk | `{siteUrl}/uk/vacancies` |
| en | `{siteUrl}/en/vacancies` |
| es | `{siteUrl}/es/vacancies` |

Ролевые (аналогично, с суффиксом слага), напр. чатер:
`{siteUrl}/vacancies/chatter-onlyfans`, `/uk/vacancies/chatter-onlyfans`, `/en/…`, `/es/…`.

Каждая запись получает блок `<xhtml:link rel="alternate" hreflang="…">` на все 4 локали + `x-default` (→ ru),
как это делает `hreflangAlternates(siteUrl, path)` для `/faq`, `/blog`, `/join`, `/calculator`.

**lastModified** ролевых страниц (из `dates.json` на момент подготовки дифа):
`chatter 2026-07-15 · model 2026-07-10 · manager 2026-07-06 · assistant 2026-07-01`. Хаб — `now`
(мирроринг статических хабов home/faq/blog, которые тоже берут `now`).

---

## 4. Обоснование priority / changeFrequency

По шкале действующего sitemap (home 1 · /join 0.9 · /faq 0.9 · /blog 0.85 · /calculator 0.8 · посты блога 0.8 · research 0.7/0.65):

- **Хаб `/vacancies` — 0.9, weekly.** Приоритетный BOFU-листинг (кластер «агентство/чатер/вакансии/гео-Украина», KD≈0 — цель квартала). На одном уровне с `/join` и `/faq`. `weekly` — контент листинга и даты вакансий ротируются.
- **Ролевые страницы — 0.8, monthly.** На уровне постов блога и `/calculator`. `monthly` мирроит посты блога; при желании владельца можно поднять до `weekly` (даты вакансий авто-ротируются каждые ~30 дней).

Значения — не часть скелета, тюнятся свободно; сам механизм hreflang/canonical не затрагивается.

---

## 5. ⚠️ На решение владельца: покрытие en/es

Контент вакансий сейчас — **этап 1: ru + uk**; для en/es резолвер (`lib/content/vacancies/index.ts`)
отдаёт фолбэк на ru. Фрагмент выше следует ТЗ (все 4 локали, как `STATIC_ROUTES`) и корректен,
**если** роутовые страницы `/vacancies` и `/vacancies/[slug]` рендерятся во всех 4 локалях
(`generateStaticParams` по `routing.locales`) — тогда полный hreflang честен.

Если же владелец решит на старте публиковать вакансии **только ru/uk** (не индексировать
en/es-фолбэк), то блок нужно сузить — по образцу постов блога, которые сами определяют
набор локалей и передают его третьим аргументом в `hreflangAlternates`:

```ts
  // Вариант «только опубликованные локали» (ru/uk на этапе 1).
  const VACANCY_LOCALES = ['ru', 'uk'] as const satisfies readonly Locale[];
  for (const locale of VACANCY_LOCALES) {
    entries.push({
      url: `${siteUrl}${pathForLocale('/vacancies', locale)}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: hreflangAlternates(siteUrl, '/vacancies', VACANCY_LOCALES) },
    });
    for (const slug of getVacancyPageSlugs()) {
      const path = `/vacancies/${slug}`;
      entries.push({
        url: `${siteUrl}${pathForLocale(path, locale)}`,
        lastModified: new Date(getVacancyDates(slug).dateModified),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: { languages: hreflangAlternates(siteUrl, path, VACANCY_LOCALES) },
      });
    }
  }
```

Рекомендация: применять полноценный (4 локали) вариант из п.2 **одновременно** с публикацией
en/es-контента/роутов; до тех пор — вариант ru/uk из п.5. Выбор — за владельцем.

---

## 6. Проверка после вставки (когда владелец одобрит)

- `npx tsc --noEmit` — зелёный (импорт и типы `MetadataRoute.Sitemap` уже совместимы).
- Локально открыть `/sitemap.xml`, убедиться, что 20 новых `<url>` присутствуют с корректными
  hreflang-альтернативами и без дублей с существующими записями.
- Предпосылка: роуты `app/[locale]/vacancies/page.tsx` и `app/[locale]/vacancies/[slug]/page.tsx`
  существуют и возвращают 200 в перечисленных локалях (иначе sitemap будет указывать на 404 —
  на момент подготовки дифа роутов ещё нет, они — этап 2 плана вакансий).
```
