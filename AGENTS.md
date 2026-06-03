<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# OFM Model Agency

Это **единственная** папка с кодом сайта. GitHub + Vercel.

При задачах пользователя редактируйте файлы здесь. После изменений напоминайте: Commit → Push в VS Code (ветка `main`).

Форма заявки: `components/ContactForm.tsx` → `POST /api/application` → Telegram (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`).
