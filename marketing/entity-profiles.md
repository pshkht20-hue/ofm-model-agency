# OFM — Entity Spine & Profiles (copy-paste ready)

**Цель:** построить согласованную сеть профилей, чтобы Google считал «OFM Model Agency» реальной сущностью (entity-trust → краулинг-бюджет + ранжирование). Большинство ссылок тут **nofollow — и это нормально**: ценность в консистентности идентичности и discovery, а не в PageRank.

## ПРАВИЛА (прочитать первым)
- Имя, описание и URL — **байт-в-байт одинаковые** на каждом профиле (копируй отсюда, не перефразируй).
- Фрейминг — **creator management & marketing agency** (B2B), не «набираем моделей». Точно, но профессионально.
- Сайт на каждом профиле: `https://ofmmodels.com`.
- В био соцсетей (X/Instagram) ставь ссылку на **конкретную страницу, которую хочешь в индекс** — напр. `https://ofmmodels.com/uk/blog/rabota-modelyu-onlyfans`.
- **Один профиль на платформу**, полностью заполненный. Не покупай пакеты «500 профилей». Создавай растянуто (дни/недели).

## КАНОНИЧЕСКИЕ ДАННЫЕ (NAP)
| Поле | Значение |
|---|---|
| Name | OFM's Model Agency |
| Short | OFM |
| Website | https://ofmmodels.com |
| Founded | 2022 |
| HQ country | **[подтверди — напр. Ukraine]** ← заполни |
| Category | Creator management & marketing agency |
| Languages | Ukrainian, Russian, English, Spanish |
| Contact | Telegram https://t.me/ofmm_agency |

## ОПИСАНИЯ (копировать точно)
**Short (≤150 знаков):**
> International creator management & marketing agency — we run marketing, audience growth, 24/7 chat and analytics for content creators.

**Medium (~300):**
> OFM's Model Agency is an international creator management and marketing agency. We partner with adult content creators (18+) to handle their marketing, audience growth, 24/7 chat management and analytics across subscription platforms, so creators can focus on content while we run the business side. Fully remote, worldwide.

**Long (about):**
> OFM's Model Agency is an international creator management and marketing agency founded in 2022. We help content creators turn their work into a sustainable business: paid traffic and promotion, audience growth, 24/7 fan-chat management, content strategy and weekly analytics. We work fully remotely with creators across Europe, Ukraine and Latin America, and we publish open, public-interest research on creator safety at ofmmodels.com/research. Our standard is transparency: written terms, a clear revenue split, and creators keeping control of their own logins and payouts.

## sameAs — единый список (заполняй URL по мере создания; вставляй ВЕЗДЕ этот же список)
```
https://ofmmodels.com
https://www.instagram.com/ofmmodel.agency
https://t.me/ofmm_agency
LinkedIn:    ____________________
Crunchbase:  ____________________
X/Twitter:   ____________________
Trustpilot:  ____________________
Wikidata:    ____________________
YouTube:     ____________________ (опц.)
```

---

## 1. WIKIDATA — самый высокий ROI (кормит Google Knowledge Graph, нет порога значимости для item)
Создай item на wikidata.org (нужен бесплатный аккаунт):
- **Label (en):** OFM's Model Agency · **(uk):** OFM's Model Agency · **(ru):** OFM's Model Agency
- **Description (en):** international creator management and marketing agency
- **(uk):** міжнародне агентство з менеджменту та маркетингу для авторів контенту
- **(ru):** международное агентство менеджмента и маркетинга для авторов контента
- **Statements (свойства):**
  - `instance of` (P31) → *business* (Q4830453) или *talent agency* (Q636646)
  - `inception` (P571) → 2022
  - `country` (P17) → [страна регистрации]
  - `official website` (P856) → https://ofmmodels.com
  - `industry` (P452) → *marketing* / *digital marketing*
  - соцсети: `Instagram username` (P2003) → ofmmodel.agency
- **sameAs:** через свойства соцсетей + official website (Wikidata формирует связи сам).

## 2. LINKEDIN — Company Page
- **Name:** OFM's Model Agency
- **Tagline:** Creator management & marketing agency
- **About:** *(вставь «Long» описание выше)*
- **Industry:** Marketing Services (или Advertising Services)
- **Specialties:** creator marketing, audience growth, fan-chat management, content strategy, creator analytics, creator safety
- **Founded:** 2022 · **HQ:** [город/страна] · **Website:** https://ofmmodels.com
- **Company size:** [выбери диапазон]

## 3. CRUNCHBASE — Organization
- **Short description:** *(вставь «Short»)*
- **Full description:** *(вставь «Long»)*
- **Categories:** Marketing, Advertising, Content Creators, Social Media Marketing
- **Founded:** 2022 · **HQ:** [город/страна] · **Website:** https://ofmmodels.com
- **Social:** добавь LinkedIn + Instagram из sameAs.

## 4. TRUSTPILOT — claim business
- Claim домена `ofmmodels.com`, категория **Marketing Agency / Advertising Agency**.
- **Profile blurb:** *(вставь «Medium»)*
- Даёт branded-доверие + цитируемую сущность (NB: не накручивай отзывы).

## 5. X/TWITTER (+ опц. YouTube) — профили-узлы (быстро рекраулятся)
- **Bio:** Creator management & marketing agency · marketing, 24/7 chats, analytics for creators · research → (ссылка)
- **Link в био:** `https://ofmmodels.com/uk/blog/rabota-modelyu-onlyfans` (или другая застрявшая UA/UK-страница — так ускоряешь её индексацию).

---

## ПОРЯДОК + ритм
- **Неделя 1:** Wikidata + LinkedIn + единый website-линк везде. По мере создания — заполняй `sameAs`-список и добавляй ссылки в Wikidata.
- **Неделя 2:** Crunchbase + Trustpilot + X. Опц.: YouTube (ссылка в About).
- Создавай **по одному в день**, не пачкой (скорость должна выглядеть естественно для молодого домена).
- Когда `sameAs`-список полон — он становится «скелетом сущности»: один и тот же набор ссылок на всех профилях + в Wikidata = Google уверенно связывает их в одну реальную компанию.
