# SEO-Skeleton at New-Domain Launch — Checklist

Заземлено на реальную реализацию OFM (`c:\Users\User\ofm-agency\ofm-model-agency`), сверено с фактическим конфигом (состязательная проверка). Каждый пункт — чек с однострочным *почему* и, где мы уже наступали на грабли, пометкой **Обожглись**. Скопировать в `docs/` нового репо и отметить до того, как направишь DNS на новый домен.

> Самый высокорычажный факт: почти все SEO-примитивы ниже выводятся из **одной** функции — `getSiteUrl()` в `lib/site.ts`. Если её env неверен на билде, canonical, hreflang, sitemap, robots и JSON-LD `@id` отравлены одновременно. Чинить первым.

---

## Домен / URL-фундамент

- [ ] **Задать `NEXT_PUBLIC_SITE_URL` в Vercel для Production И Preview** на новый apex (`https://newbrand.com`, без слеша).
  Почему: `getSiteUrl()` читает это (`process.env.NEXT_PUBLIC_SITE_URL`, слеш срезается), и каждый URL в приложении строится отсюда.
  **Обожглись:** старый код фоллбэчил на `*.vercel.app`, заливая vercel.app-canonical/sitemap/hreflang в индекс. Текущий `lib/site.ts` хардит: если env не задан в prod — `console.warn` и фоллбэк на константу `CANONICAL_SITE_URL`. Но константа всё ещё `https://ofmmodels.com`, так что незаданный env тихо канонизирует новый сайт на OFM. Рантайм-гварда на *неверный* домен нет — только warn на *unset*.

- [ ] **Сменить `CANONICAL_SITE_URL` в `lib/site.ts` (строка 62)** с `https://ofmmodels.com` на новый apex.
  Почему: это последний фоллбэк, запечённый в бандл; устаревшее значение — тихая кросс-сайтовая утечка canonical, которую рантайм не ловит.

- [ ] **Выбрать ОДИН канонический хост (apex vs www) и 308-редиректить другой** в дашборде Vercel.
  Почему: split-host дубль-контент размывает сигналы.
  **Обожглись:** OFM встал на `www → apex` 308. Это живёт в **дашборде Vercel, не в репо** — `vercel.json` нет — так что при клоне НЕ переносится. Делать заново на каждый проект.

- [ ] **Подтвердить HTTPS + HSTS** — `next.config.ts` шлёт `Strict-Transport-Security: max-age=63072000; includeSubDomains` на `/:path*`.
  Почему: HTTP→HTTPS должен быть чистым редиректом. `includeSubDomains` предполагает, что все сабдомены на HTTPS — проверить до запуска.
  Заметка: **CSP намеренно нет** (комментарий в `next.config.ts`) — строгая политика требует per-request nonce для инлайн GA/JSON-LD. Есть: `X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `X-DNS-Prefetch-Control`, `Permissions-Policy`.

- [ ] **Проверить, что `metadataBase` резолвится на новый домен** (`app/[locale]/layout.tsx` строка 78: `metadataBase: new URL(siteUrl)`).
  Почему: Next резолвит относительные OG/canonical против `metadataBase`; неверная база = неверные абсолютные OG-image + canonical.

---

## i18n / hreflang

- [ ] **Решить набор локалей и `defaultLocale` для НОВОГО гео ДО написания контента** в `i18n/routing.ts`.
  Почему: `localePrefix: 'as-needed'` = у дефолтной локали НЕТ префикса (`/`), у остальных есть (`/uk`, `/en`, `/es`). Смена `defaultLocale` потом двигает всю canonical-структуру URL и требует масс-редиректа.
  Заметка: OFM — `['ru','uk','en','es']`, `defaultLocale:'ru'`, `localeDetection:true`. Новое гео может хотеть другой дефолт (напр. `uk`/`es`) — это единственное дорого-необратимое решение.

- [ ] **Обеспечить `messages/<locale>.json` для каждой локали из `routing.locales`.**
  Почему: `i18n/request.ts` делает `import('../messages/${locale}.json')` — отсутствующий файл падает в рантайме (неизвестная локаль коэрсится на defaultLocale, так что дефолтный файл обязан быть всегда).

- [ ] **Указывать локаль в sitemap/hreflang только для страниц, где перевод реально есть.**
  Почему: `hreflangAlternates(siteUrl, path, locales?)` в `lib/i18n/paths.ts` берёт опциональный `locales` (дефолт — все); `app/sitemap.ts` для blog/research передаёт per-content наборы (`getBlogPostLocales(slug)` и т.п.), а не все четыре.
  **Caveat:** статические роуты (`''`, `/faq`, `/blog`) зовут `hreflangAlternates(siteUrl, path)` БЕЗ аргумента locales → рекламируют все 4 локали. Ок только если эти страницы есть на всех 4. Если новое гео не переводит статик на все языки — передавай явный субсет, иначе hreflang→404.

- [ ] **Сохранить `x-default` → дефолтная локаль.**
  Почему: `hreflangAlternates()` всегда добавляет `x-default` на un-prefixed дефолтный путь (`pathForLocale(path, routing.defaultLocale)`). Google требует x-default; база дефолтной локали всегда существует.

- [ ] **Проверить `<html lang>` = отрендеренной локали** (`app/[locale]/layout.tsx` строка 127: `lang={locale}`).
  Почему: несовпадение `lang` путает hreflang-валидацию и скринридеры. (JSON-LD `inLanguage` использует полную форму `ru-RU`/`uk-UA` из карт `htmlLang`/`HTML_LANG`; `<html lang>` — короткий код. Оба намеренно.)

- [ ] **Проверить оверлей language→locale в `i18n/browser-locale.ts` под новое гео.**
  Почему: `LANGUAGE_PRIMARY_TO_LOCALE` мапит языки устройства без страницы на ближайшую реальную локаль для первого визита: `pt→es`, `gl→es`, `ca→es`, `ro→ru`, `mo→ru`, `be→ru`. Работает в `middleware.ts` (только если нет cookie `NEXT_LOCALE`). Это UX-фоллбэк, НЕ SEO-сигнал — индексируемых URL не создаёт.
  **Обожглись:** оверлей OFM зашит под РФ/Украину/ЛатАм (`ro→ru`, `pt→es`). Новому гео нужен свой маппинг, иначе авто-роутинг в неверный язык.

- [ ] **Подтвердить, что matcher middleware покрывает роуты и исключает ассеты** — `middleware.ts`: `['/', '/(ru|uk|en|es)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']`.
  Почему: список локалей `(ru|uk|en|es)` **захардкожен в regex** и НЕ читает `routing.locales`. Сменишь набор в `routing.ts` и забудешь matcher → URL новой локали не роутятся.

---

## Sitemap / robots

- [ ] **Подтвердить, что `app/sitemap.ts` отдаёт абсолютные URL на новом домене** (каждая запись из `getSiteUrl()`; `export const dynamic = 'force-static'`).
- [ ] **Проверить `STATIC_ROUTES` в `app/sitemap.ts`** (сейчас `['', '/faq', '/blog']`) под реальные статик-страницы нового сайта.
  Почему: хардкод-список — новые top-level страницы не появятся в sitemap без добавления сюда. `/research` (hub + отчёты) эмитится ОТДЕЛЬНЫМ циклом (через `getResearchLocales()`/`getResearchReportSlugs()`), не из `STATIC_ROUTES`. Посты — из `getAllBlogSlugs()`.
- [ ] **Подтвердить, что тонкие страницы ВНЕ sitemap.**
  Почему: `privacy`/`terms` намеренно исключены из `STATIC_ROUTES` И noindex'нуты на уровне страницы через `createPageMetadata({ noIndex: true })` (в `lib/seo.ts` → `robots:{index:false,follow:false}`). Проверить, что эквиваленты нового сайта исключены здесь И noindex'нуты.
- [ ] **Подтвердить `app/robots.ts` `allow: '/'` и что `Sitemap:` указывает на новый домен** (`${siteUrl}/sitemap.xml`; один `userAgent: '*'`).
- [ ] **Убедиться, что нет остаточного `noindex` со стейджинга.**
  Почему: пре-лонч стейджинг часто шлёт глобальный `noindex`. Сайт-вайд robots-noindex в текущем коде нет (только per-page на privacy/terms) — проверить, что не добавили env-гейтед глобальный.

> **Удалено из черновика:** пункт «скрытые город/гео-страницы В sitemap». **Город/гео-страниц в репо НЕТ.** Роуты под `app/[locale]/`: только `blog`, `blog/[slug]`, `faq`, `privacy`, `research`, `research/[slug]`, `terms`. `lib/geo/request.ts` — это IP-детект гео *посетителя* (страна/город строкой для персонализации), не лендинги. Появятся гео-страницы позже — тогда либо во внутренние ссылки, либо в генератор sitemap.

---

## Metadata / OpenGraph

- [ ] **Переписать `siteConfig` в `lib/site.ts`** — `name` (`"OFM's Model Agency"`), `shortName` (`OFM`), `tagline`, `title`, `description`, ~50-элементный `keywords` — всё OFM-специфичное, течёт в `<title>`, description, OG, JSON-LD.
  Заметка: домашние `<title>`/`description` фактически берутся из namespace `meta` (`t('siteTitle')`/`t('siteDescription')`) в `generateMetadata`, НЕ из `siteConfig.title`/`.description`. Но `keywords`, `shortName` (шаблон title), `name` (OG siteName + весь JSON-LD) — из `siteConfig`. Править И `siteConfig`, И `meta` в каждом `messages/*.json`.
- [ ] **Подтвердить, что canonical — per-locale и self-referential** — `app/[locale]/layout.tsx`: `alternates.canonical = pathForLocale('/', locale)` + `alternates.languages = hreflangAlternates(siteUrl, '/')`.
- [ ] **Подтвердить, что OG-image рендерится под новый бренд.** Layout ссылается на `/opengraph-image` (строки 94, 105).
  Почему: обслуживается `app/opengraph-image.tsx` — рендерит `OgBrandMark` (из `lib/og-brand.tsx`) 1200×630 через `next/og`. Файл **существует** (черновик ошибался). Задача — **ребрендить `OgBrandMark`** (и `alt`, тянущий `siteConfig.title`), а не создавать файл. Также есть `app/[locale]/research/[slug]/opengraph-image.tsx`.
- [ ] **Задать корректный `openGraph.locale` на язык** — карта `openGraphLocale` в `i18n/routing.ts` (`ru_RU`, `uk_UA`, `en_US`, `es_ES`), читается в `generateMetadata`.
- [ ] **Обновить шрифты, если бренд-шрифт другой** (`layout.tsx`: `Geist`, `Geist_Mono`, два `Playfair_Display`).
  Почему: 400-italic Playfair (`playfairHeadline`) завязан на hero-LCP (см. Перф) — смена шрифта = переделка preload, не просто CSS.

---

## Structured data (JSON-LD)

- [ ] **Переписать `Organization` в `components/JsonLd.tsx`** — `foundingDate: '2022'`, `knowsAbout` (строки 39–47), `areaServed: 'Worldwide'`, `@id: ${siteUrl}/#organization`, `logo`/`image` → `${siteUrl}/icon.svg` — всё OFM. (`JsonLd` эмитит и `WebSite`, и через `ServiceJsonLd` — `ProfessionalService`; тоже ребрендить.)
- [ ] **Заменить `ENTITY_SAME_AS` в `lib/social.ts`** — захардкожены Wikidata (`Q140391425`), Crunchbase (`ofm-s-model-agency`), Trustpilot (`ofmmodels.com`).
  Почему: `sameAs` на entity-профили OFM говорит Google, что новый сайт ЕСТЬ OFM. Начать с пустого, добавлять по одному (каждый должен ссылаться обратно на новый домен).
- [ ] **Обновить соц-дефолты в `lib/social.ts`** (`DEFAULT_LINKS`: telegram `t.me/ofmm_agency`, whatsapp `wa.me/380939747588`, instagram `instagram.com/ofmmodel.agency`) или через env `NEXT_PUBLIC_SOCIAL_*`.
  Почему: кормят футер-CTA (`getSocialLinks`/`getSocialHref`) + `Organization.sameAs` + `contactPoint`. Неверный Telegram = воронка на канал OFM.
  Заметка: `resolveHref()` намеренно отбрасывает голые-корневые URL (pathname пустой, напр. `https://instagram.com/`) — канал без пути тихо исчезает из `sameAs`/футера. Давать полный путь профиля.
- [ ] **Оставить `JobPostingJsonLd` БЕЗ `baseSalary`** (`StructuredData.tsx`). Шлёт `employmentType:'CONTRACTOR'`, `jobLocationType:'TELECOMMUTE'`, `applicantLocationRequirements` из `applicantCountries`, `validThrough` = `datePosted` + 1 год.
  Почему: цифра дохода — gross-оборот баланса, не зарплата. `baseSalary` = вводит в заблуждение, риск manual action. Намеренное honesty-ограничение — не «помогать» добавлением salary.
- [ ] **Подтвердить, что извлечение шагов `HowTo` совпадает с заголовками новой локали** — `STEP_HEADING_RE` в `StructuredData.tsx` = `/^(Шаг|Этап|Крок|Етап|Stage|Etapa)\s/` (якорь начала + обязательный пробел).
  Почему: `HowToJsonLd` берёт шаги из видимых `h2`-заголовков поста (требование Google). Слово-заголовок новой локали не в regex (или без пробела) → HowTo тихо ничего не рендерит (`null` при <2 шагах). `ArticleJsonLd` — always-on; `HowToJsonLd` — аддитивен.
- [ ] **Проверить, что каждый JSON-LD `url`/`@id`/`sameAs` резолвится на новый домен** после смены env — Google Rich Results Test на живом сайте.

---

## Performance (Core Web Vitals)

- [ ] **Preload РОВНО ОДНОГО шрифт-файла — hero-LCP italic** — `layout.tsx` скоупит `playfairHeadline` на weight `['400']`, style `['italic']`, latin, `preload: true`; остальные (`playfairRest`, `geistMono`) — `preload: false`.
  **Обожглись:** preload всех 4 Playfair украл 4G-полосу и РЕГРЕССировал mobile LCP. Фикс — один выделенный инстанс, preload одного woff2. На других serif/mono держать `preload: false`. Если LCP-элемент нового бренда на другом шрифте — перенаправить preload на него, не blanket-preload.
- [ ] **Держать `adjustFontFallback` на LCP-шрифте** (НЕ передавать кастомный `fallback` массив в `playfairHeadline`).
  Почему: metric-matched serif-фоллбэк next/font держит LCP-бокс от ресайза на свопе (анти-CLS). (`geistSans`/`geistMono` передают явные `fallback` — ок, они не LCP.)
- [ ] **Держать hero лёгким; НЕ реинтродьюсить WebGL-галактику на мобиле.**
  Почему: OFM исторически гонял тяжёлую WebGL/OGL-галактику, mobile PageSpeed вырос 53→~89 во многом её удалением. **Текущий `components/hero/HeroBackground.tsx` больше НЕ использует WebGL** — это Canvas2D `ParticleField` (`components/ui/ParticleField.tsx`), дрейф/мерцание на десктопе, один статичный кадр на мобиле/`prefers-reduced-motion` (комментарий в коде: «No OGL, no WebGL context»). Добавишь Three.js/R3F/OGL hero — desktop-гейтить и уважать reduced-motion.
- [ ] **Сохранить `optimizePackageImports: ['lucide-react','framer-motion']`** в `next.config.ts` (`experimental`). Free-win tree-shaking; держать.
- [ ] **Добавить реальные `remotePatterns` для хоста картинок** в `next.config.ts` (сейчас только `https://images.unsplash.com`).
  Почему: `next/image` отказывает не-allowlist хостам. Обложки блога используют `remoteSrc` — CDN за ними должен быть в allowlist.
- [ ] **Прогнать mobile Lighthouse/PageSpeed на превью ДО лонча**, бюджет LCP < 2.5s.

---

## Search Console / analytics

- [ ] **Добавить новый домен как Domain property в GSC и верифицировать через DNS TXT** до/на лонче.
- [ ] **Отправить `https://newbrand.com/sitemap.xml` в GSC** после верификации.
- [ ] **Настроить GA4 с новым property/stream** через существующий consent-gated загрузчик (`AnalyticsLoader` + `GoogleConsentDefaults` в `layout.tsx`; `CookieConsent` — баннер). Новый measurement ID — не наследовать поток OFM.
- [ ] **Подтвердить, что Google Consent Mode дефолты срабатывают до любого тега** — `<GoogleConsentDefaults />` — ПЕРВЫЙ child `<body>`, до `AnalyticsLoader`.
- [ ] **Зарегистрировать сайт в Bing Webmaster Tools** (дёшево, кормит другие движки).

---

## Пре-публикация (финальный гейт до DNS-cutover)

- [ ] **`curl -sI https://newbrand.com/`** — apex отдаёт 200, `www` → 308 → apex. (Ловит забытый дашборд-редирект — его нет в репо.)
- [ ] **View-source главной + grep canonical/JSON-LD на СТАРЫЙ домен.** Увидел `ofmmodels.com` или `*.vercel.app` в `<head>`/JSON-LD — СТОП, SiteUrl-утечка. **Обожглись:** ровно эта утечка тихо ломала canonical OFM. Сделать этот grep жёстким гейтом.
- [ ] **Забрать `/sitemap.xml` и `/robots.txt` на живом домене; каждый `<loc>` — новый хост**, `Sitemap:` совпадает.
- [ ] **Дёрнуть `/opengraph-image` — должен вернуть 1200×630 PNG** с НОВЫМ бренд-знаком, не OFM. (Файл есть — риск не 404, а лого OFM на шарингах.)
- [ ] **Спот-чек hreflang:** для переведённой страницы каждый alternate возвращает 200, не 404. (Тест — пост в субсете локалей: `getBlogPostLocales`.)
- [ ] **Убедиться, что `*.vercel.app` deploy-URL не индексируется/не залинкован публично.**
- [ ] **Проверить, что стейджинг Basic-Auth ВЫКЛ на prod**, но сайт был защищён до лонча. (Защищённый prod = Googlebot 401 = ноль индекса; незащищённый стейджинг = ранний дубль-индекс.)
- [ ] **Сменить `foundingDate`/факты сущности на реальные** (`JsonLd.tsx` хардкодит `foundingDate: '2022'`). 2022 на домене этого года — лёгкий trust-mismatch для entity-резолюции.

---

### Однострочник главных ловушек
`getSiteUrl()` env + константа `CANONICAL_SITE_URL` (тихая кросс-сайт canonical-утечка) · preload только одного шрифт-файла (4 = LCP-регрессия) · гейтить hreflang alternates под реальные переводы, включая статик-роуты, что сейчас рекламируют все 4 локали (иначе 404) · **гео-страниц нет — нечего якорить в sitemap** · www→apex 308 в дашборде Vercel, не в репо (нет `vercel.json`) · заменить `ENTITY_SAME_AS` + соц-дефолты + `siteConfig` + **ребрендить `OgBrandMark`** (всё захардкожено на OFM) · JobPosting без salary · hero теперь Canvas2D, не WebGL.

**Файлы под новый домен:** `lib/site.ts` (siteConfig + CANONICAL_SITE_URL), `lib/social.ts` (DEFAULT_LINKS + ENTITY_SAME_AS), `i18n/routing.ts` (locales/defaultLocale/openGraphLocale), `i18n/browser-locale.ts`, `middleware.ts` (matcher локали), `app/sitemap.ts` (STATIC_ROUTES), `next.config.ts` (image remotePatterns), `app/[locale]/layout.tsx` (fonts/OG/meta), `components/JsonLd.tsx` + `components/seo/StructuredData.tsx` (факты сущности), `lib/og-brand.tsx` (ребренд OG-знака), namespace `meta` в каждом `messages/*.json`.
