# GA4: полный анализ поведения + внедрённая аналитика — 12.07.2026

## Анализ данных (30 дней)

GA4 30 дней (12.06–11.07.2026) vs пред. 30 (13.05–11.06): 272 сессии / 123 юзера (рост x3.4), но 59% сессий — владелец/команда из Грузии + vercel-превью. Реального внешнего трафика ~110 сессий (~85 юзеров), из них Google organic 65 сессий / 43 юзера. ГЛАВНЫЙ ДИАГНОЗ «где теряем»: (1) GA4 слепа — gtag грузится только после согласия на куки, видит лишь 36% органики (65 сессий vs 180 кликов GSC), реальные заявки надо считать по серверному событию contact_submit_server = 13 за месяц (из них ~половина — тесты команды, реальных ~6–10, т.е. больше «3–4», которые видит владелец — проверить Telegram-пайплайн доставки заявок); (2) воронка ломается НЕ на форме — кто начал заполнять, тот отправляет (form_start 11 юзеров → contact_submit 10 юзеров, ~90%), а на ДОХОДЕ до формы: /join получил 1 просмотр за месяц, /calculator — 1 просмотр, ~50% органики садится на блог и уходит, не кликнув CTA (со всех статей суммарно ~5 cta_click); (3) конверсии в GA4 сломаны: key events настроены на несуществующие события (close_convert_lead, qualify_lead, purchase — 0 срабатываний), contact_submit не помечен key event → keyEvents=0 во всех отчётах, custom dimension location не зарегистрирована → не видно, какой CTA приносит заявки. Реальная конверсия органики ≈ 5 заявок с 43 юзеров (11.6% по юзерам GA4) или ~4–7% от GSC-кликов — проблема не в CR, а в ОБЪЁМЕ целевого трафика (Украина: всего 34 GSC-клика и 10 GA4-органик-сессий за месяц) и в потере блог-читателей.

### 1. АУДИТОРИЯ — страны (30 дн, сессии/юзеры)
Georgia 160/37 (59% всех сессий — владелец+команда: vercel.com 59 сессий от 1 юзера, direct desktop 57/30, direct mobile 35/4, wikidata 5/1), Ukraine 21/17 (Киев 13, Харьков 2, Львов 2; ER 66.7%), Russia 17/8, Bulgaria 8/4, Germany 6/5, Poland 6/4, USA 6/3. Органика по странам: UA 10 сессий, RU 6, USA 6, BG 4, PT 4. GSC за тот же период: rus 45 кликов (топ-1!), ukr 34, usa 17, mda 9, esp 7. Пред. период: всего 80 сессий (Georgia 63).

**→** Настроить в GA4 фильтр internal traffic (IP команды в Грузии) + data filter на hostname *.vercel.app (≈40 сессий мусора). Для РФ-трафика (топ по кликам) — блог-контент под LoyalFans/Fansly без гео-страниц (правило BANNED-COUNTRIES соблюдать).

### 2. АУДИТОРИЯ — устройства, язык, new/returning, время
Устройства всего: desktop 149 / mobile 122 / tablet 1, НО органика: mobile 47 (72%) / desktop 18; ER mobile 63.9% vs desktop 49.0%; глубина mobile 2.68 стр/сессию vs desktop 2.16. GSC: mobile 127 кликов (71%), desktop 52. Язык браузера: Russian 213 сессий (в осн. команда), English 15, Ukrainian 15, Spanish 9. Новые 108 юзеров (ER 71.3%), вернувшиеся 37 юзеров дают 141 сессию (команда). Пики по часам: 15:00 (28), 13:00 (22), 8:00 (20), 12:00 (18), 20:00 (16).

**→** Mobile-first приоритет для формы и CTA: 72% реальной органики — мобильные девушки. Проверить мобильный сценарий: стики-CTA → форма на главной.

### 3. ИСТОЧНИКИ (30 дн, сессии/юзеры)
(direct) 124/53 (≈половина — команда), google organic 65/43 (пред. период — 6 сессий, рост x10.8), vercel.com referral 59/1 (владелец, превью деплоев), chatgpt.com/ai-assistant 17/14, wikidata.org 5/1 (владелец), yandex.kz 1/1. Органик-лендинги: / 16, /en 12, /uk 6, далее блог ~28 сессий размазаны по ~15 статьям (топ: /en/blog/rabota-modelyu-onlyfans 5, /blog/rabota-modelyu-onlyfans 3). ChatGPT-трафик конвертит лучше всех: 3 contact_submit с 14 юзеров (21%).

**→** AI-referral (ChatGPT) — новый работающий канал: усилить цитируемость сайта в LLM (FAQ-схемы, факты, цифры). Органика на /en растёт (12 сессий, ER 67%, 369 сек) — англоязычный BOFU недооценён.

### 4. GSC vs GA4 — потеря видимости 64%
GSC 12.06–11.07: 180 кликов (mobile 127/desktop 52/tablet 1). GA4 google organic: 65 сессий. Видимость 36%. Причина подтверждена кодом: AnalyticsLoader.tsx рендерит gtag.js ТОЛЬКО после согласия на куки (analytics_storage: denied по умолчанию, скрипт вообще не грузится до клика «принять») — все, кто игнорит/отклоняет баннер, невидимы. GSC топ-страницы: / 29 кликов, /blog/chto-takoe-onlyfans 16 (2491 показ, CTR 0.64%, поз. 14.7), /en+/en/ 24, /blog/onlyfans-agentstvo-moldova 10 (CTR 13.9%!), /en/faq 10, /blog/kak-zaregistrirovatsya-na-onlyfans 8 (804 показа).

**→** Принять как факт: клиентские GA4-цифры занижены в ~3 раза. KPI заявок вести по contact_submit_server (Measurement Protocol, срабатывает для всех). Опционально: cookieless pings (consent mode advanced — грузить gtag сразу, но без куки) — даст сессии без согласия.

### 5. ПОВЕДЕНИЕ — топ страниц (просмотры / юзеры / сек. вовлечения на юзера)
/ 336 просм / 60 юзеров / ~179 сек-юзер; /blog 38/11/83с; /en 37/19/59с; /uk 32/16/52с; /faq 18/6/44с; /blog/kak-vybrat-onlyfans-agentstvo 15/4/17с (слабо!); /es 13/8/131с; /blog/rabota-modelyu-onlyfans 12/7/46с; /blog/kak-zaregistrirovatsya-na-onlyfans 10/3/100с. Глубина: 2.40 стр/сессию (пред. 1.35). ER 55.9% (пред. 47.5%). Средняя сессия 317 сек. Блог-статьи в основном single-page: сессий почти столько же, сколько просмотров.

**→** Блог-статьи с <20 сек вовлечения на юзера (kak-vybrat-onlyfans-agentstvo, latinskaya-amerika 16с) — переработать первый экран: ответ сразу + CTA-блок в первой трети текста.

### 6. /join и /calculator — МЁРТВЫЕ страницы
/join: 1 просмотр за 30 дней (22 сек, 1 юзер, зашёл с vercel.com = владелец). Пред. период: 0. /calculator: 1 просмотр (12 сек). Сессий с заходом на /join из органики: 0. Вся конверсия происходит на главной: form_start на / = 30, на /uk = 8, на /en = 7, на /es = 4; калькулятор-виджет на главной: calculator_start 15 → calculator_complete 8.

**→** Либо (а) признать модель «форма на главной» основной и снять ожидания от /join, либо (б) добавить заметные ссылки на /join из навбара/блога/футера всех локалей и вести туда CTA из статей. Сейчас /join не участвует в воронке вообще.

### 7. СОБЫТИЯ (30 дн, всего / без Грузии / только UA)
cta_click 53 (28 юз) / 40 (25 юз) / 12 (6 юз); form_start 49 (16 юз) / 23 (11 юз) / 10 (5 юз); contact_submit 20 (14 юз) / 10 (10 юз) / 5 (5 юз); contact_submit_server 13 (13 юз, страна not set — серверное); calculator_start 15/5/1; calculator_complete 8/1/1; telegram_click 15 (6 юз) / 5 (4 юз) / 2. Органика: form_start 13 (6 юз) → contact_submit 5 (5 юз). Пред. период: form_start 4, contact_submit_server 1. Расхождение client 20 vs server 13: 7 клиентских сабмитов без серверного подтверждения — проверить, не фейлится ли API/Measurement Protocol.

**→** Разобраться с гэпом contact_submit(20) vs contact_submit_server(13): либо API-ошибки при отправке, либо MP теряет события. Плюс сверить 13 серверных заявок с Telegram-уведомлениями — владелец видит только 3–4.

### 8. КОНВЕРСИИ В GA4 СЛОМАНЫ
keyEvents = 0 во всех отчётах. Причина: в GA4 как key events зарегистрированы close_convert_lead, qualify_lead, purchase (созданы 05.06.2026) — эти события сайт НИКОГДА не отправляет. Реальные события заявки (contact_submit, contact_submit_server) key events НЕ являются. Custom dimensions: не зарегистрировано ни одной → параметр location события cta_click (hero_primary, sticky_mobile, calculator_result и т.д.) невозможно увидеть в отчётах (API вернул ошибку «customEvent:location is not a valid dimension»).

**→** В GA4 Admin: удалить/игнорить close_convert_lead, qualify_lead; пометить key event contact_submit_server (истина) и contact_submit; зарегистрировать custom dimensions: location (event scope), locale, has_calc_prefill. Это 10 минут работы и даст атрибуцию CTA→заявка.

### 9. ВОРОНКА ФАКТИЧЕСКАЯ (без Грузии, ~110 сессий / ~85 юзеров)
~110 сессий → cta_click 25 юз (29%) → form_start 11 юз (13%) → contact_submit 10 юз (91% от начавших!) → contact_submit_server 13 событий. Обрыв (а) «не доходят до формы» — ГЛАВНЫЙ: 87% юзеров не начинают форму, блог-трафик почти не кликает CTA (со ВСЕХ статей суммарно ~5 cta_click за месяц против 22 на /); обрыв (б) «доходят, но не заполняют» — НЕТ проблемы (91% завершение); обрыв (в) «начинают и бросают» — есть только у калькулятора: реальные юзеры 5 start → 1 complete (20% завершение; у команды 10→7).

**→** Точка роста №1 — мост «блог → форма»: инлайн-CTA/мини-форма в каждой статье, блок «сколько ты заработаешь» со ссылкой на калькулятор главной. Точка №2 — упростить калькулятор (реальные юзеры бросают 4 из 5).

### 10. ИНСАЙТ — реальная конверсия НЕ 2%
Считая по серверной истине: 13 заявок / (180 GSC-кликов + direct/chatgpt реальные ~40 юзеров) ≈ 4–7% от кликов; по GA4-юзерам органики: 5 заявок / 43 юзера = 11.6%. Проблема не CR, а объём: Украина (приоритет №1) даёт лишь 34 GSC-клика и 10 органик-сессий/мес; UA-заявок при этом 5 из 5 начавших форму. BOFU-кластер ещё не набрал видимость: /blog/chto-takoe-onlyfans имеет 2491 показ но поз. 14.7 и CTR 0.64%.

**→** Фокус квартала подтверждается данными: добивать BOFU-позиции (поз. 7–15 → топ-3) по UA-ядру, а не улучшать форму. Быстрые победы GSC: chto-takoe-onlyfans (2491 показ, поз.14.7), kak-zaregistrirovatsya (804 показа, поз.12.5), /faq (271 показ, поз.7.1, CTR 0.74% — переписать title/description).


## Внедрённая событийная аналитика (код в рабочем дереве, не закоммичено)

Реализована максимальная событийная аналитика GA4 в репо C:/Users/User/ofm-agency/ofm-model-agency (только рабочее дерево, без коммитов; SEO-скелет не тронут — только onClick-хендлеры, null-рендер трекеры и 3 новых клиентских компонента). Добавлено 11 новых событий + расширены 5 существующих: полная воронка формы (form_submit / form_submit_error с типом ошибки 400=validation/429=rate_limit/5xx=server/network — раньше эти потери были невидимы; field_filled по полям name/telegram/age; form_abandon с last_field), все ранее нетрекаемые CTA (navbar, футер, блок в конце SEO-статей seo_shell с page_path — главный путь для ~200 кликов из поиска, отзывы, in-article CTA статей, WhatsApp), Telegram-ссылки в теле статей (article_body), шаги квиза калькулятора (calc_interact step_next/back/restart + calc_result_view, параметр page home|calculator), scroll_depth 25/50/75/90 на всех страницах, section_view по центру вьюпорта для 8 секций главной и 5 секций /join, faq_open. Везде параметр locale, дедупликация через ref/Set, passive listeners, ленивая инициализация через requestIdleCallback, события уходят только при доступном window.gtag (consent-гейт сохранён). npm run build — зелёный (Compiled successfully, TypeScript strict прошёл); eslint по всем изменённым файлам — чисто; npm run guardrails — 14 флагов, все в старом контенте lib/content/blog/* (задачей не затронут). Изменено 15 файлов + создано 3. ВАЖНО для интерпретации: клиентские события существуют только для согласившихся на cookies; истинное число заявок — contact_submit_server. Рекомендация: в GA4 UI пометить key events: contact_submit, contact_submit_server, telegram_click, whatsapp_click, form_submit.

### Изменённые файлы (15)
C:/Users/User/ofm-agency/ofm-model-agency/: lib/analytics/events.ts (новые константы+типы), lib/analytics/gtag.ts (10 новых обёрток + clamp 100 символов), components/ContactForm.tsx (form_submit/form_submit_error/field_filled/form_abandon/page_path), components/IncomeCalculatorSection.tsx (calc_interact/calc_result_view/page), components/Navbar.tsx (3 CTA), components/layout/SeoPageShell.tsx (seo_shell+page_path), components/layout/SiteFooter.tsx (footer), components/ModelReviewsSection.tsx (reviews), components/seo/ArticleBody.tsx (article_cta+article_body через клиентские обёртки), components/seo/FaqAccordion.tsx (faq_open), components/WhatsAppCta.tsx (whatsapp_click, новый проп location), components/social/SocialLinks.tsx (whatsapp_click в nav/menu/footer), components/HomePage.tsx (SectionViewTracker home), app/[locale]/join/page.tsx (SectionViewTracker join), app/[locale]/layout.tsx (монтирование ScrollDepthTracker — только import+1 строка JSX, меты/hreflang не тронуты)

**→** Проверить diff перед коммитом; коммит/пуш только по команде владельца (пуш = прод-деплой)

### Созданные файлы (3)
components/analytics/TrackedLinks.tsx (клиентские TrackedCtaLink + TrackedTelegramLink для серверного ArticleBody), components/analytics/ScrollDepthTracker.tsx (null-рендер, passive scroll + rAF, requestIdleCallback, сброс порогов по pathname), components/analytics/SectionViewTracker.tsx (IntersectionObserver, rootMargin -35%/-35% = центральная полоса вьюпорта, один раз на секцию, retry-скан 8x1с для dynamic()-чанков)

**→** Ничего — компоненты самодостаточны, рендерят null/ссылки

### cta_click (расширено)
params: location, locale, page_path(нов., обрезка 100). Новые точки: navbar_apply — Navbar.tsx:93 (моб. компакт) и :162 (десктоп); navbar_mobile_apply — Navbar.tsx:231,:242 (обе кнопки меню); seo_shell — SeoPageShell.tsx:99 (CTA внизу ВСЕХ статей, с page_path статьи); footer — SiteFooter.tsx:129; reviews — ModelReviewsSection.tsx:59; article_cta (новая локация) — ArticleBody.tsx cta-блок через TrackedCtaLink с page_path. Существующие hero/sticky/join/calculator не тронуты, calculator_result(+secondary) получили page_path

**→** В GA4 смотреть разрез location + page_path — покажет, с каких статей кликают

### form_submit / form_submit_error / contact_submit (=form_submit_ok)
form_submit{locale,has_calc_prefill,page_path} — ContactForm.tsx начало handleSubmit (ВСЕ попытки); form_submit_error{locale,error_type:validation|rate_limit|server|network,http_status,page_path} — ветка !response.ok (маппинг errorTypeFromStatus: 429=rate_limit, >=500=server, иначе validation) и catch (network); успех = существующий contact_submit{locale,has_calc_prefill} (не дублировал form_submit_ok — contact_submit уже key event). form_start получил page_path (форма живёт на / и /join)

**→** Через 1-2 недели сверить form_submit vs contact_submit vs form_submit_error — увидим, сколько заявок режет rate-limit 3/10мин (429)

### field_filled + form_abandon
field_filled{field:name|telegram|age,locale,page_path} — onBlur при валидном непустом значении, один раз на поле (ref Set); form_abandon{locale,last_field:name|telegram|age|message,page_path} — pagehide + visibilitychange(hidden), только если форма начата, есть контент в ключевых полях и нет успешной отправки, максимум 1 раз (honeypot website исключён из last_field); last_field обновляется по bubbling focus на форме

**→** Воронка form_start → field_filled(name) → field_filled(telegram) → form_submit покажет, на каком поле бросают (гипотеза: telegram-ник)

### calc_interact + calc_result_view + page у калькулятора
calc_interact{action:step_next|back|restart, step:1-4, question:experience|archetype|social|hours, page:home|calculator, locale} — goNext/goBack/restart в IncomeCalculatorSection.tsx; calc_result_view{tier,low,high,page,locale} — в useEffect показа результата (рядом с calculator_complete); calculator_start и calculator_complete получили параметр page (один компонент на 2 страницах, различаем через usePathname)

**→** Разрез calc_interact по step/question покажет, где бросают квиз (кандидат — archetype с длинным скроллом)

### telegram_click location=article_body + whatsapp_click (новое событие)
telegram_click{location:article_body, locale, page_path} — авто-ссылки @ofmm_agency в тексте статей через TrackedTelegramLink (linkifyTelegram в ArticleBody.tsx, раньше невидимы); whatsapp_click{location:contact_primary|navbar_social|menu_social|footer_social, locale} — WhatsAppCta.tsx (главная #contact) + SocialLinks.tsx (иконки nav/menu/footer)

**→** Пометить telegram_click и whatsapp_click как key events в GA4 UI — это низкофрикционные конверсии мимо формы

### scroll_depth + section_view + faq_open
scroll_depth{percent:25|50|75|90, page_path, locale} — ScrollDepthTracker в app/[locale]/layout.tsx, все страницы, сброс порогов при смене pathname, passive+rAF+idle-init; section_view{section,page,locale} — главная (results/about/how/calculator/models/reviews/services/contact из lib/sections) и /join (join-directions/join-requirements/join-steps/join-income/apply), срабатывание по центральной полосе вьюпорта, 1 раз на секцию; faq_open{question(100 симв.),locale,page_path} — FaqAccordion.tsx, все FAQ (/faq, /join, статьи)

**→** section_view покажет, доходят ли посетительницы из статей до формы; enhanced measurement scroll (90%) в GA4 UI можно отключить, чтобы не дублировал

### Сборка и проверки
npm run build (Next.js 16.2.7 Turbopack): Compiled successfully in 7.0s, TypeScript type check прошёл, все страницы сгенерированы (после фикса TS-narrowing 'requestIdleCallback' in window -> typeof window.requestIdleCallback === 'function'). npx eslint по 18 изменённым файлам — 0 ошибок/предупреждений. npm run guardrails — 14 REVIEW-флагов, ВСЕ в lib/content/blog/* (доход-клеймы $100k и «договір» в старом контенте — существовали до задачи, аналитикой не затронуты)

**→** Guardrails-флаги контента — отдельная задача для контент-ревью, к аналитике отношения не имеют

### Ограничение интерпретации данных (consent-гейт)
Все новые клиентские события по-прежнему живут за consent-гейтом (AnalyticsLoader грузит gtag только при choice='all'): обёртки gtagSafe тихо no-op без window.gtag, событий в очередь не копится. Consent-независимым остаётся только contact_submit_server (Measurement Protocol). Архитектура consent mode не менялась (решение владельца)

**→** При анализе воронки нормировать на долю согласий (GSC clicks vs GA4 sessions); истину по заявкам брать из contact_submit_server + личек Telegram
