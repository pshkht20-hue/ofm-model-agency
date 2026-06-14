<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# OFM Model Agency

Это **единственная** папка с кодом сайта. GitHub + Vercel.

При задачах пользователя редактируйте файлы здесь. После изменений напоминайте: Commit → Push в VS Code (ветка `main`).

Форма заявки: `components/ContactForm.tsx` → `POST /api/application` → Telegram (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`).

## Приоритеты проекта (для агентов)

1. **Производительность** сайта (особенно тяжёлый анимированный hero).
2. **Сильное SEO** для ru/uk/en/es рынков (RU / Украина / LatAm).
3. **Премиальный дизайн и сложные анимации** (GSAP + Framer Motion, neon/creator-эстетика).
4. **Контент**: тексты и фото/медиа для блога (19 постов × 4 локали).
5. **Глубокая аналитика** (GA4 + Search Console) → инсайты → правки → переизмерение.

## Тулинг Claude Code

- **Скилы**: курированный набор в `.claude/skills/` (≈35 шт.), вызывай `/<skill>` под задачу — напр. `ofm-seo-analytics`, `ofm-premium-motion`, `react-performance`, `fal-ai-media`, `content-engine`, `motion-ui`, `production-audit`, `verification-loop`.
- **MCP**: `.mcp.json` (project-scoped) — `chrome-devtools` и `playwright` (perf-трейс/E2E), `magicui` (UI-примитивы), `context7` (живые доки), `exa` (ресёрч). Аналитические `ga4`/`gsc` MCP добавляются отдельно (нужен доступ сервис-аккаунта).
- Полная библиотека ECC (`.cursor/skills/`, `.cursor/.agents/`) остаётся локально (в `.gitignore`); в git идёт только выжимка `.claude/skills/`.
