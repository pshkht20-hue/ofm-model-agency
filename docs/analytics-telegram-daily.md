# Ежедневный SEO-отчёт в Telegram (без команд)

После одноразовой настройки GitHub каждый день в **09:00 (Киев)** приходит сообщение:
- цифры из Google Search Console и GA4
- топ запросы и страницы
- **рекомендации** что улучшить на сайте

Команды в терминале **не нужны**.

## Как это работает

```
GitHub Actions (cron) → npm run seo:daily → Google API → Telegram
```

Тот же бот, что шлёт заявки с формы (`TELEGRAM_BOT_TOKEN`).

## Одноразовая настройка (≈10 мин)

### 1. Откройте секреты репозитория

GitHub → репозиторий **ofm-model-agency** → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Добавьте **5 секретов**:

| Secret | Откуда взять |
|--------|----------------|
| `TELEGRAM_BOT_TOKEN` | Vercel → Environment Variables (тот же, что для заявок) |
| `TELEGRAM_CHAT_ID` | Vercel → Environment Variables |
| `GA4_PROPERTY_ID` | `540360466` |
| `GOOGLE_OAUTH_CLIENT_JSON` | Весь текст файла `.credentials/oauth-client.json` (скопировать целиком) |
| `GOOGLE_OAUTH_REFRESH_TOKEN` | Файл `.credentials/oauth-token.json` → поле `"refresh_token"` |

### 2. Закоммитьте workflow

Файл `.github/workflows/seo-daily-telegram.yml` должен быть в `main` на GitHub.

После push workflow активируется сам.

### 3. Проверка вручную (опционально)

GitHub → **Actions** → **Daily SEO Telegram** → **Run workflow**

Через 1–2 минуты должно прийти сообщение в Telegram.

## Локальный тест (для вас или агента)

```bash
cd ofm-model-agency
npm run seo:daily
```

Использует `.env.local` + `.credentials/` на вашем ПК.

## Если отчёт перестал приходить

1. **Actions** → последний запуск → красный? Откройте лог.
2. Частая причина: истёк OAuth — снова `npm run seo:auth` локально и обновите секрет `GOOGLE_OAUTH_REFRESH_TOKEN` в GitHub.
3. Telegram: бот должен иметь право писать в чат (вы писали `/start`).

## Время отправки

По умолчанию **06:00 UTC** (09:00 Киев летом). Изменить: `.github/workflows/seo-daily-telegram.yml` → строка `cron`.
