# Автоматизация SEO-аналитики (один раз ≈15 мин)

После этой настройки агент в Cursor может **сам** запускать `npm run seo:report` и читать `docs/analytics-reports/latest-report.md` — без ручных CSV.

## Что уже работает без API

| Компонент | Где |
|-----------|-----|
| GA4 на сайте | `NEXT_PUBLIC_GA_MEASUREMENT_ID` в Vercel |
| События в браузере | `cta_click`, `calculator_complete`, `contact_submit` |
| Серверная конверсия | `contact_submit_server` через Measurement Protocol |

## Шаг 1 — GA4 Measurement Protocol (серверные заявки)

1. [analytics.google.com](https://analytics.google.com) → Admin → **Data streams** → ваш поток
2. **Measurement Protocol API secrets** → Create → скопируйте secret
3. Vercel → Environment Variables:
   - `GA4_API_SECRET` = ваш secret (только Production)

Заявки с формы будут считаться в GA4 даже если пользователь отклонил cookies.

## Шаг 2 — Google Cloud service account

1. [console.cloud.google.com](https://console.cloud.google.com) → создайте проект (или выберите существующий)
2. **APIs & Services → Enable APIs:**
   - Google Search Console API
   - Google Analytics Data API
3. **IAM → Service Accounts → Create**
   - Имя: `ofm-seo-reporter`
   - Role: не обязательна на уровне проекта
4. **Keys → Add key → JSON** — скачайте файл
5. Сохраните как `ofm-model-agency/.credentials/google-service-account.json`  
   (папка в `.gitignore`, в Git не попадёт)

## Шаг 3 — Доступ к GA4

1. GA4 → Admin → **Property access management**
2. Add users → email сервис-аккаунта (`...@....iam.gserviceaccount.com`)
3. Role: **Viewer**
4. Скопируйте **Property ID** (число, не Measurement ID `G-...`)

## Шаг 4 — Доступ к Search Console

1. [search.google.com/search-console](https://search.google.com/search-console) → Настройки → **Пользователи и разрешения**
2. Добавьте тот же email сервис-аккаунта с правом **Полный**

> **Если GSC пишет «адрес не найден»** — это нормально для многих аккаунтов. Перейдите к **Плану B (OAuth)** ниже.

## План B — OAuth (рекомендуется, если сервис-аккаунт не добавляется)

Скрипт входит **вашим личным Google** (тот же, что владелец GSC и GA4). Добавлять «робот-email» в интерфейсе не нужно.

### B1 — OAuth client в Google Cloud

1. [console.cloud.google.com](https://console.cloud.google.com) → проект **ofm-seo**
2. **APIs & Services → OAuth consent screen** → External → заполните название → **Save**
3. **Test users** → добавьте **ваш** Gmail (тот, что в GSC)
4. **Credentials → Create credentials → OAuth client ID**
5. Тип: **Desktop app**, имя: `ofm-seo-local`
6. **Download JSON** → сохраните как  
   `ofm-model-agency/.credentials/oauth-client.json`

### B2 — Один раз войти в браузере

```bash
cd ofm-model-agency
npm run seo:auth
```

Откроется ссылка → войдите своим Google → разрешите доступ. Токен сохранится в `.credentials/oauth-token.json`.

### B3 — Отчёт

```bash
npm run seo:report
```

## Шаг 5 — Локальный `.env.local`

```env
GOOGLE_APPLICATION_CREDENTIALS=.credentials/google-service-account.json
GSC_SITE_URL=sc-domain:ofmmodels.com
GA4_PROPERTY_ID=123456789
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-BE38Q3QSRN
GA4_API_SECRET=ваш_secret
```

Для URL-prefix свойства в GSC используйте `GSC_SITE_URL=https://ofmmodels.com/`

## Шаг 6 — Проверка

```bash
cd ofm-model-agency
npm install
npm run seo:report
```

Должен появиться `docs/analytics-reports/latest-report.md` с данными.

## Ежедневно в Telegram (без команд)

См. **docs/analytics-telegram-daily.md** — один раз настроить GitHub Secrets → каждый день отчёт, рекомендации и **напоминания по SEO-плану** в Telegram. Полный план: **docs/SEO-MASTER-PLAN.md**.

## Как пользоваться с Cursor

1. В чате: **«Запусти SEO-отчёт и дай план»** — агент выполнит `npm run seo:report` и прочитает отчёт
2. Команда: `/seo-report` (см. `.cursor/commands/seo-report.md`)
3. Ежедневный дайджест: `npm run seo:daily` (или GitHub Actions по расписанию)

## Безопасность

- Никогда не коммитьте JSON ключ и `GA4_API_SECRET`
- `.credentials/` и `.env.local` уже в `.gitignore`
