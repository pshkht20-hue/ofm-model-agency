# OFM's Model Agency — сайт

Лендинг агентства на Next.js. Деплой через Vercel из GitHub.

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте http://localhost:3000

## SEO

В Vercel добавьте `NEXT_PUBLIC_SITE_URL` = ваш домен (например `https://ofm-model-agency.vercel.app`).

## Telegram-форма

1. Скопируйте `.env.example` → `.env.local`
2. Заполните `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`
3. На Vercel добавьте те же переменные в **Settings → Environment Variables**

## Публикация на GitHub

```bash
git add .
git commit -m "описание изменений"
git push
```

Vercel пересоберёт сайт автоматически.

## Структура

| Путь | Назначение |
|------|------------|
| `app/page.tsx` | Главная страница |
| `components/ContactForm.tsx` | Форма заявки |
| `app/api/application/route.ts` | API → Telegram |
| `lib/telegram.ts` | Отправка в Telegram |
