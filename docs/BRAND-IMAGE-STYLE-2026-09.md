# 🎨 Фирменный стиль изображений OFM (утверждён владельцем 02.09.2026)

> Генерация: fal.ai, модель fal-ai/flux/dev, 1600×900 (формат обложек блога, см. covers.ts). Единая палитра: фон #050508, неон hot pink #ff5bb5 / violet #a855f7 / cyan #00d4ff. Правила: БЕЗ видимых лиц (спина/силуэт/деталь), без пошлости, без читаемого текста в кадре, AI-«фото моделей» под видом реальных — запрещено. Каждая картинка проходит визуальный контроль агентом ДО постановки (красота, тема статьи, артефакты, отсутствие лиц). Философия: обложка = первый кадр воронки, девушка видит в ней своё будущее.

## Система: 5 стилей + 1 служебный

| # | Стиль | Тип статей | Промпт-шаблон (база, дополнять темой статьи) |
|---|---|---|---|
| 1 | **Silhouette Cosmos** | модельные, «как стать», вакансии | Elegant female silhouette from behind in flowing evening dress, vast deep-space nebula, dramatic neon rim lighting in hot pink #ff5bb5 and cyan #00d4ff, violet accents, dark cosmic background #050508, tiny stars, luxury fashion editorial photography, cinematic, no face visible |
| 2 | **Creator Room** | работа/контент/старт/будни | Bright cozy content creator room: glowing ring light, smartphone on tripod, plush chair, vanity with makeup, LED strips hot pink and cyan, violet ambient glow, premium interior, inviting, no people (вариант: young woman from behind adjusting ring light, face not visible) |
| 3 | **Cinematic Lifestyle** | бытовые: декрет, из дома, города | Cinematic photo of young woman [сценарий: at laptop by night window / с контекстом статьи], face not visible, back view, city lights bokeh, neon pink and cyan ambient light, cozy premium interior, moody atmospheric photography |
| 4 | **Glass 3D** | деньги, выплаты, кейсы, премиум | 3D render of glossy glass [объект по теме] with neon pink and cyan refractions, violet rim light, deep dark background #050508 with tiny stars, luxury glassmorphism, cinematic lighting, no people no text |
| 5 | **Cosmic Abstract** | техника/инфо: регистрация, налоги, «что такое» | Abstract cosmic art: flowing liquid neon gradients hot pink #ff5bb5, violet #a855f7, cyan #00d4ff, glossy waves and nebula clouds on #050508, star particles, premium fluid design, no text no people |
| — | **Line-art** (служебный) | инфографика/схемы внутри статей | Minimalist continuous one-line art, neon gradient glow pink-to-cyan, dark cosmic background, negative space |

Параметры генерации: image_size {width:1600, height:900}, num_inference_steps 32, guidance_scale 3.5. Эталонные пробы: scratchpad/style-samples/ (02.09).

## 🔬 Пайплайн «4K-качества» (обязателен с 02.09.2026, директива владельца)

Каждая обложка после генерации: (1) fal-ai/clarity-upscaler ×2 (creativity 0.2, resemblance 0.8, prompt: «[сюжет], sharp crisp details, high quality 4k») → 3200×1800; (2) Lanczos-даунскейл до 1600×900 + UnsharpMask(radius 1.2, percent 60, threshold 2); (3) JPEG q92 (порог ≤350KB, при превышении шаг −3). Причина: FLUX-исходник 1600px на неоновых градиентах выглядит мягко; апскейл дорисовывает микродеталь, резкий даунскейл возвращает «хруст». После апскейла — ПОВТОРНЫЙ визуальный контроль (руки/лица/артефакты: creativity дорисовывает). В BlogCoverImage: quality={90}, aspect-video без обрезки, никаких сплошных оверлеев поверх кадра.

## SEO-пайплайн каждой картинки (по золотому стандарту §5)

1. Файл: `public/blog/covers/{slug}.jpg`, 1600×900, JPEG q82–85, ≤350KB (og:image живёт по этим размерам — BLOG_COVER_OG_WIDTH/HEIGHT в covers.ts).
2. covers.ts: `localSrc` И `remoteSrc` = `/blog/covers/{slug}.jpg`; alt — описательный на русском (базовая локаль), с органичным ключом, ≤125 знаков; кредиты: photographer 'OFM Models', photographerUrl/unsplashUrl → https://ofmmodels.com (бренд-подпись вместо Unsplash).
3. URL картинки после индексации не менять.
4. Инлайновые изображения в теле: ≤100KB, всегда width/height, подпись-caption = микро-продажа.
5. Раз в месяц: GSC → Search type: Image (image-трафик приходит через 4–6 недель).

## ⛔ Правило чувствительных сочетаний (владелец, 02.09.2026)

В статьях для мам/семейной аудитории: ребёнок и платформа/съёмка/продажа контента НИКОГДА не встречаются в одном предложении; детская атрибутика (кроватки, игрушки, коляски) в изображениях ЗАПРЕЩЕНА. Гибкость подаётся через «твой семейный режим», «когда дома кто-то из родных», «твоё время». Причина: сочетание «ребёнок + adult-платформа» — готовый скриншот для критика, репутационный риск.

## ⛔ Логотипы и товарные знаки (решение 02.09.2026)

Логотип OnlyFans (и любые чужие лого) в генерациях ЗАПРЕЩЁН: (1) товарный знак Fenix International, использование в маркетинге агентства без разрешения = юр-риск C&D; (2) усиливает впечатление «официального сайта» (мы уже ловим такие запросы) — риск введения в заблуждение; (3) AI искажает лого артефактами. Тематичность — безопасными символами: стеклянный замочек (generic-символ подписки/приватности), сердечки/лайки, абстрактные профили за «стеной подписки», телефон/кольцевая лампа/штатив. Реальные скриншоты статистики с водяным знаком — только в теле статей (редакционное использование, наш актив).

## Правило плотности композиции (урок 02.09)

Избегать «пустых» сюжетов из тонких линий на тёмном фоне (после JPEG-сжатия выглядят дёшево) — только плотные детальные сцены: предметка, интерьеры, объёмные 3D-объекты с богатой фактурой.

## Контроль качества (чек перед постановкой)

☐ Нет читаемого лица · ☐ Нет артефактов (руки, текст-абракадабра на видном месте, сломанная геометрия) · ☐ Палитра бренда соблюдена · ☐ Сюжет соответствует теме статьи · ☐ «Идеальный креатив»: вызывает «хочу так же» · ☐ Вес/размер по пайплайну.
