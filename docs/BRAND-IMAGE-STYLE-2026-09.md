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

## SEO-пайплайн каждой картинки (по золотому стандарту §5)

1. Файл: `public/blog/covers/{slug}.jpg`, 1600×900, JPEG q82–85, ≤350KB (og:image живёт по этим размерам — BLOG_COVER_OG_WIDTH/HEIGHT в covers.ts).
2. covers.ts: `localSrc` И `remoteSrc` = `/blog/covers/{slug}.jpg`; alt — описательный на русском (базовая локаль), с органичным ключом, ≤125 знаков; кредиты: photographer 'OFM Models', photographerUrl/unsplashUrl → https://ofmmodels.com (бренд-подпись вместо Unsplash).
3. URL картинки после индексации не менять.
4. Инлайновые изображения в теле: ≤100KB, всегда width/height, подпись-caption = микро-продажа.
5. Раз в месяц: GSC → Search type: Image (image-трафик приходит через 4–6 недель).

## ⛔ Правило чувствительных сочетаний (владелец, 02.09.2026)

В статьях для мам/семейной аудитории: ребёнок и платформа/съёмка/продажа контента НИКОГДА не встречаются в одном предложении; детская атрибутика (кроватки, игрушки, коляски) в изображениях ЗАПРЕЩЕНА. Гибкость подаётся через «твой семейный режим», «когда дома кто-то из родных», «твоё время». Причина: сочетание «ребёнок + adult-платформа» — готовый скриншот для критика, репутационный риск.

## Контроль качества (чек перед постановкой)

☐ Нет читаемого лица · ☐ Нет артефактов (руки, текст-абракадабра на видном месте, сломанная геометрия) · ☐ Палитра бренда соблюдена · ☐ Сюжет соответствует теме статьи · ☐ «Идеальный креатив»: вызывает «хочу так же» · ☐ Вес/размер по пайплайну.
