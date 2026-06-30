# 🪪 Entity-профили OFM — пошагово (для владельца)

> **Зачем.** Сейчас для ИИ и Google мы — «несущность» (нас путают с чужим инстаграмом и другой компанией). Эти профили = **скелет сущности**: когда на нескольких площадках стоят **одинаковые** имя/описание/сайт, Google/ИИ начинают считать «OFM's Model Agency» реальной компанией → нас можно индексировать и рекомендовать. Это разблокирует и AI-рекомендации, и индексацию.
>
> **Все тексты для копирования — в соседнем файле [`entity-profiles.md`](./entity-profiles.md).** Здесь — только «куда нажимать».

---

## ⚠️ Шаг 0 — сделай ОДИН раз перед стартом (2 минуты)
1. Открой `entity-profiles.md`. В таблице NAP есть строка **HQ country = `[подтверди]`**. Впиши страну регистрации/работы (напр. `Ukraine`). Это поле понадобится почти везде — пусть будет одно и то же.
2. **Золотое правило:** имя `OFM's Model Agency`, сайт `https://ofmmodels.com` и описания — **копируй точь-в-точь** из `entity-profiles.md`, НЕ перефразируй. Консистентность — это и есть весь смысл.
3. Фрейминг везде — **B2B: «creator management & marketing agency»** (агентство менеджмента/маркетинга для авторов), НЕ «набираем моделей». Профессионально и безопасно.

---

## 🥇 Шаг 1 — WIKIDATA (самый важный, ~15 мин)
*Кормит Google Knowledge Graph напрямую. Порога значимости для записи нет — заводится свободно.*
1. Зайди на **wikidata.org** → справа вверху **Create account** (бесплатно).
2. После входа: слева **«Создать новый элемент» / Create a new item**.
3. Заполни (тексты — из `entity-profiles.md`, раздел «1. WIKIDATA»):
   - **Label:** `OFM's Model Agency` · **Description (en):** `international creator management and marketing agency`
   - Добавь Label/Description на uk и ru (там же готовы).
4. Внизу добавь **Statements** (кнопка **+ add statement** на каждое):
   - `instance of` → начни печатать `business` → выбери **business (Q4830453)**
   - `inception` → `2022`
   - `country` → твоя HQ-страна
   - `official website` → `https://ofmmodels.com`
   - `Instagram username` → `ofmmodel.agency`
5. Сохрани. **Скопируй URL элемента** (вид `https://www.wikidata.org/wiki/Q…`) → пришли мне.

## 🥈 Шаг 2 — LINKEDIN Company Page (~10 мин)
1. На linkedin.com (с личного аккаунта) → вверху **«Для бизнеса» / Work → Create a Company Page**.
2. Выбери тип **Company**.
3. Заполни (раздел «2. LINKEDIN» в `entity-profiles.md`):
   - **Name:** `OFM's Model Agency` · **Website:** `https://ofmmodels.com`
   - **Industry:** `Marketing Services` · **Tagline:** `Creator management & marketing agency`
   - **About:** вставь текст **«Long»** из `entity-profiles.md`
   - **Founded:** 2022 · **HQ:** твой город/страна
4. Опубликуй → **скопируй URL страницы** (`https://www.linkedin.com/company/…`) → пришли мне.

## 🥉 Шаг 3 — CRUNCHBASE Organization (~10 мин)
1. crunchbase.com → **Add a company / Add Organization** (бесплатно, через регистрацию).
2. Заполни (раздел «3. CRUNCHBASE»):
   - **Short description:** текст **«Short»** · **Full:** текст **«Long»**
   - **Categories:** `Marketing, Advertising, Content Creators, Social Media Marketing`
   - **Founded:** 2022 · **Website:** `https://ofmmodels.com`
3. Сохрани → **скопируй URL** (`https://www.crunchbase.com/organization/…`) → пришли мне.

## 🏅 Шаг 4 — TRUSTPILOT (~10 мин)
1. business.trustpilot.com → **Claim your business** → впиши домен `ofmmodels.com`.
2. Категория: **Marketing Agency / Advertising Agency**.
3. Описание профиля: текст **«Medium»** из `entity-profiles.md`.
4. ⚠️ **Отзывы НЕ накручивай** — это бан. Лучше потом попросить пару реальных моделей оставить честный отзыв.
5. **Скопируй URL профиля** (`https://www.trustpilot.com/review/ofmmodels.com`) → пришли мне.

## ➕ Шаг 5 (опц.) — X/Twitter профиль-узел (~5 мин)
1. Заведи @-аккаунт. **Bio** и **ссылку** — из раздела «5» (ссылку ставь на застрявшую UA-страницу, напр. `/uk/blog/rabota-modelyu-onlyfans` — ускоряет её индексацию).

---

## ✅ Что от тебя нужно и что делаю я
- **Ты:** заводишь профили **по одному в день** (не пачкой — для молодого домена так естественнее) и после каждого **присылаешь мне URL**.
- **Я:** вписываю все URL в `sameAs` сайта (код) — тогда профили и сайт **ссылаются друг на друга** = скелет сущности замыкается, и Google/ИИ связывают их в одну компанию.

## 📋 Чек-лист (отметь по мере готовности)
- [ ] Шаг 0: вписал HQ-страну в `entity-profiles.md`
- [ ] Wikidata — URL: `__________`
- [ ] LinkedIn — URL: `__________`
- [ ] Crunchbase — URL: `__________`
- [ ] Trustpilot — URL: `__________`
- [ ] (опц.) X/Twitter — URL: `__________`

**Приоритет:** Wikidata + LinkedIn — это уже 70% эффекта. С них и начни. Как пришлёшь хотя бы эти два — я сразу подключу их в код.
