# ЖАЛОБЫ ПО ДВОЙНИКУ ofmodels.com.ua + онлифанс.укр — 5 черновиков к отправке (05.10.2026)

> **Статус:** черновики готовы к отправке владельцем **07–08.10.2026**. Пересобраны с нуля (исходники 0928 уничтожены чисткой темпа) из docs/BRAND-SHIELD-2026-09.md §1.1/§2.1 + SEO-WEEKLY-2026-10-05.md §3.5 + живая перепроверка 05.10 вечером (см. «Фактура» ниже).
> **Отправляет только владелец, с agency@ofmmodels.com** (правило ofm-press: агент не отправляет ничего). Финальное «ок» на каждый текст — за владельцем.
> **Копия файла в репо:** docs/DVOJNIK-COMPLAINTS-2026-10.md (урок «темп чистится»).

---

## 0. Фактура (перепроверено живьём 05.10.2026, вечер)

| Факт | Статус 05.10 | Как проверено |
|---|---|---|
| `https://ofmodels.com.ua/of/` → **301 → `https://onlyfans.com/?ref=475493277`** | ЖИВ | curl -I 05.10 (вечер, этот прогон) |
| `https://онлифанс.укр/of/` (xn--80apihdb0av.xn--j1amh) → **301 → `https://ofmodels.com.ua/of/`** | ЖИВ — вся сеть монетизируется через ОДНУ рефку | curl -I 05.10 |
| Title главной ofmodels.com.ua: **«Онлифанс - Офіційна платформа для творців та фанатів»** | на месте | curl 05.10 |
| canonical ofmodels.com.ua → `https://онлифанс.укр/` (дорвей-зеркало; sitemap тоже на укр-узел) | на месте | curl 05.10 (canonical), BRAND-SHIELD 23.09 (sitemap, md5 главных побайтово) |
| Оба узла за Cloudflare | да | NS 05.10: lynn/noor.ns.cloudflare.com (com.ua), remy/nelci.ns.cloudflare.com (укр); IP 104.21.x/172.67.x |
| Фейковые «творцы» на сайте | по разведке 23.09 | «Анна Петренко», «Марія Коваленко», «Олена Сидоренко», «Катерина Іваненко» |
| Регистраторы (whois 23.09, **перепроверить при отправке**: hostmaster.ua/whois) | — | ofmodels.com.ua: REGERY UKRAINE LLC (ua.regery), оплачен до 02.09.2027, регистрант скрыт. онлифанс.укр: ТОВ «Сервіс Онлайн» (drs.ua), создан 28.01.2025, истекает 28.01.2027 |

**Юридическая рамка (из BRAND-SHIELD, не менять):** ofmodels.com.ua создан 02.09.2025 — РАНЬШЕ нашего ofmmodels.com (05.06.2026), поэтому аргумент «украли наш бренд» слаб и в жалобах платформам НЕ ведущий. Сильный угол — **имперсонация самой OnlyFans** («Офіційна платформа»), фейковые персоны, дорвей-зеркало, скрытая монетизация рефкой. **DMCA НЕ подаём**: контент не скопирован (шинглы 0,14–0,24%, его контент старше нашего сайта) — любое упоминание «копирования контента» из жалоб исключено.

**Порядок отправки (критично, решение 28.09/05.10):**
1. **Сначала №1 OnlyFans** — бан рефки 475493277 обнуляет мотивацию всей сети. Индикатор победы: `/of/` перестаёт отдавать 301 на onlyfans.com (мониторим в каждом замере).
2. **Затем №2 Google** (в тот же день или на следующий).
3. №3 (регистраторы) и №4 (Cloudflare) — **вторая волна, через 5–7 дней**: не спугнуть оператора до решения по рефке.
4. №5 (письмо оператору) — **последним**, только после реакции OnlyFans (письмо раскрывает нас как инициатора).

**Перед отправкой №1 (10 минут, владелец):** зафиксировать доказательства, пока сеть жива:
- Сохранить обе главные и `/of/`-редирект в архив: https://web.archive.org/save/https://ofmodels.com.ua/ и https://web.archive.org/save/ (для укр-узла — punycode-адрес).
- Скриншоты: главная ofmodels.com.ua (с title во вкладке), страница «творцов», адресная строка после клика по кнопке OnlyFans (видна ?ref=475493277).
- Если есть под рукой терминал: `curl -sI https://ofmodels.com.ua/of/` — сохранить вывод в файл.

---

## 1. OnlyFans — abuse/referral complaint на ref 475493277 (ГЛАВНАЯ, англ.)

- **Куда:** email **support@onlyfans.com** (основной канал жалоб на нарушения ToS) и ДУБЛЕМ через форму **https://onlyfans.com/contact** (тот же текст; телефонной поддержки и чата у платформы нет). Отправлять с agency@ofmmodels.com.
- **Тема письма:** `Referral program abuse: impersonation of OnlyFans by affiliate ref 475493277`
- **Что приложить:** скриншоты из блока «Перед отправкой», вывод curl с цепочкой 301, ссылки на archive.org-слепки.
- **Ожидаемый эффект:** проверка и бан/обнуление реферального аккаунта 475493277 → сеть теряет монетизацию целиком. Первый ответ поддержки: 1–3 рабочих дня; реальное решение: 1–4 недели. Контроль: `/of/`-редирект в каждом понедельничном замере.

**Текст (готов к отправке):**

```
Subject: Referral program abuse: impersonation of OnlyFans by affiliate ref 475493277

Hello OnlyFans Trust and Safety team,

I am writing on behalf of OFM Models (ofmmodels.com), a talent management agency working with Ukrainian creators. We want to report a network of two Ukrainian-language websites that impersonates OnlyFans and monetizes this impersonation through your referral program.

The websites:
1. https://ofmodels.com.ua
2. https://онлифанс.укр (punycode: https://xn--80apihdb0av.xn--j1amh)

What they do:
- Both sites present themselves to Ukrainian users as the official OnlyFans platform. The homepage title of ofmodels.com.ua literally reads "Онлифанс - Офіційна платформа для творців та фанатів", which translates as "Onlyfans - Official platform for creators and fans". This is false: the sites are not operated by OnlyFans.
- The sites display fake "creator" profiles (for example "Анна Петренко", "Марія Коваленко", "Олена Сидоренко", "Катерина Іваненко") to look like a real creator platform.
- The two sites are one operation: ofmodels.com.ua is a byte-identical mirror of онлифанс.укр, and its canonical and sitemap point to the second domain.
- All of their traffic is funneled into a single OnlyFans referral link. Verified on 5 October 2026:
  https://онлифанс.укр/of/ returns 301 to https://ofmodels.com.ua/of/
  https://ofmodels.com.ua/of/ returns 301 to https://onlyfans.com/?ref=475493277

Why we are reporting this: these sites rank in Ukrainian search for OnlyFans-related queries, mislead women who are looking for the real platform, and damage trust in OnlyFans and in legitimate businesses in this market. One of the domains is also confusingly similar to our own brand (ofmodels.com.ua vs ofmmodels.com), which adds to the confusion for our applicants.

We believe this violates your Terms of Service and the rules of your referral program: the referrer is impersonating OnlyFans itself, using fake creator personas and misleading "official platform" claims to harvest referral sign-ups.

Our request: please investigate referral ID 475493277, and if you confirm the above, terminate this referral account and its commissions.

We can provide screenshots, HTTP traces of the redirect chain and archived copies of both sites on request. Please do not share our identity with the reported party.

Thank you for your time.

Kind regards,
[Имя владельца / Press office]
OFM Models, ofmmodels.com
agency@ofmmodels.com
```

*(опционально, тем же письмом или вторым абзацем в конце: onlyfans.com.ua — ещё один украинский сайт-«официальный представитель» с TG @aliadmii; НЕ часть этой сети, упоминать только если владелец захочет расширить репорт: "Separately, onlyfans.com.ua also presents itself as an official OnlyFans representative for Ukraine; it appears unrelated to the network above.")*

---

## 2. Google — spam report по ОБОИМ узлам (англ., АНОНИМНО)

- **Куда:** форма **https://search.google.com/search-console/report-spam** (войти в Google-аккаунт; НЕ обязательно аккаунт с GSC-доступом — подойдёт любой). Категория: **Spam** (doorway / deceptive behavior). В одном репорте можно указать до 5 URL с одним типом нарушения.
- **⚠️ Правило 2026 (важно!):** Google теперь может выдавать manual action по спам-репорту и при этом **пересылает текст репорта владельцу сайта дословно**. Репорты, где система находит персональные данные, **отбрасываются без обработки**. Поэтому: в тексте — НИКАКИХ упоминаний OFM, ofmmodels.com, имён и email. Жалоба полностью анонимная и описательная.
- **Что указывать:** два репорта (или один с 5 URL, если тип един — он един: doorway/deception).
  - Репорт А (непокрытый узел, приоритет): `https://онлифанс.укр/` + `https://онлифанс.укр/of/` + 1–2 внутренние страницы из его sitemap.
  - Репорт Б (повтор по двойнику, жалоба 23.09 закрыла только бренд-SERP): `https://ofmodels.com.ua/` + `https://ofmodels.com.ua/of/`.
- **Ожидаемый эффект:** сигнал в спам-системы + возможный manual action (с 2026 репорты используются для ручных мер напрямую). Ответа Google не присылает; эффект проверяем замерами позиций связки (site:, «онлифанс» mobile, AIO-цитаты) в течение 2–8 недель.

**Текст в поле описания (готов к вставке, без личных данных):**

```
These two domains are one doorway operation targeting Ukrainian queries about OnlyFans:
ofmodels.com.ua is a byte-identical mirror of xn--80apihdb0av.xn--j1amh ("онлифанс.укр"); its rel=canonical and sitemap.xml point to that second domain.

Deceptive behavior:
1. The sites falsely present themselves as the official OnlyFans platform. Homepage title: "Онлифанс - Офіційна платформа для творців та фанатів" ("Official platform for creators and fans"). They are not affiliated with OnlyFans.
2. The "creators" shown on the sites are fake personas.
3. The only function of the network is affiliate traffic harvesting: /of/ on both domains 301-redirects to onlyfans.com/?ref=475493277 (verified 5 October 2026). Site content is frozen since March 2026.
4. The network's backlink profile consists of purchased spam links with identical seller anchors.

This matches the doorway and misleading-functionality spam policies: duplicated interchangeable pages, created to rank for "онлифанс" queries and funnel users to an affiliate link while pretending to be the official platform.
```

---

## 3. Регистраторы доменов (укр., вторая волна — через 5–7 дней после №1–2)

### 3а. REGERY (ofmodels.com.ua)

- **Куда:** **abuse@regery.com** (канал из Abuse Policy, regery.com/en/docs/abuse-policy) + копия на **abuse@regery.in.ua** (abuse-контакт из whois 23.09) + при наличии — форма «Report Abuse» на regery.com. Перед отправкой перепроверить регистратора: https://hostmaster.ua/whois/ по домену ofmodels.com.ua.
- **Что приложить:** те же скриншоты/curl/архивные ссылки, что в №1.
- **Ожидаемый эффект (честно):** регистратор по контентной жалобе чаще всего требует решения суда или правоохранителей; вероятность снятия делегирования по одной жалобе низкая. Реальная ценность: (1) официальный след — основа для будущего UA-DRP-спора после регистрации ТМ «OFM Models»; (2) по Abuse Policy Regery при подтверждённом fraud/misleading может вынести предупреждение и приостановить домен. Срок ответа: 3–14 дней.

**Текст (готов к отправке):**

```
Тема: Скарга на домен ofmodels.com.ua: видавання себе за офіційну платформу OnlyFans

Шановна команда REGERY,

звертаємося щодо домену ofmodels.com.ua, зареєстрованого через вашу компанію.

Ми представляємо OFM Models (ofmmodels.com), агенцію, що працює з українськими авторками контенту. Домен ofmodels.com.ua використовується так:

1. Сайт видає себе за офіційну платформу OnlyFans: заголовок головної сторінки "Онлифанс - Офіційна платформа для творців та фанатів". Сайт не має жодного стосунку до компанії OnlyFans.
2. На сайті розміщені вигадані профілі "творців" (несправжні особи).
3. Сайт є дзеркалом домену онлифанс.укр (xn--80apihdb0av.xn--j1amh): canonical та sitemap вказують на нього, вміст головних сторінок збігається побайтово.
4. Єдина функція сайту: збір реферального трафіку. Станом на 05.10.2026 адреса https://ofmodels.com.ua/of/ віддає 301-редирект на https://onlyfans.com/?ref=475493277.
5. Додатково: написання домену навмисно подібне до нашого бренду (ofmodels.com.ua проти ofmmodels.com), що вводить відвідувачок в оману щодо приналежності сайту.

Вважаємо, що таке використання підпадає під визначення шахрайства та введення користувачів в оману (fraud, misleading content) у розумінні вашої Abuse Policy.

Просимо: перевірити використання домену та розглянути призупинення його делегування; повідомити нам про результат розгляду. Докази (скриншоти, HTTP-траси редиректів, архівні копії сторінок) додаємо до листа та готові надати додатково.

З повагою,
[Імʼя власника]
OFM Models, ofmmodels.com
agency@ofmmodels.com
```

### 3б. ТОВ «Сервіс Онлайн» / drs.ua (онлифанс.укр)

- **Куда:** **support@drs.ua** (контакт из whois разведки 23.09) + копия **email@drs.ua** (abuse-контакт whois drs.ua). Перепроверить регистратора через https://hostmaster.ua/whois/ по xn--80apihdb0av.xn--j1amh.
- **Текст:** тот же, что 3а, с заменами: домен — «онлифанс.укр (xn--80apihdb0av.xn--j1amh)»; п.3 — «Сайт є основним вузлом звʼязки: дзеркало ofmodels.com.ua вказує на нього canonical і sitemap»; п.4 — «адреса https://онлифанс.укр/of/ віддає 301 на https://ofmodels.com.ua/of/, який віддає 301 на https://onlyfans.com/?ref=475493277»; п.5 (про схожість із нашим брендом) — УБРАТЬ (к укр-домену не относится).
- **Ожидаемый эффект и срок:** как 3а. Дополнительно: домен истекает 28.01.2027 — если жалоба не сработает, окно перехвата зафиксировано в протоколе мониторинга.

---

## 4. Cloudflare abuse (англ., вторая волна, по обоим узлам)

- **Куда:** форма **https://abuse.cloudflare.com** (email-жалобы Cloudflare не обрабатывает — только форма). Категория: **Phishing & Malware** НЕ подходит (сайт не собирает пароли сам); выбирать **«Trademark infringement» нельзя** (мы не правообладатель «OnlyFans»). Рабочая категория: **Other / Abuse** с описанием имперсонации. Один репорт — оба домена (ofmodels.com.ua и xn--80apihdb0av.xn--j1amh) с конкретными URL.
- **⚠️ В форме:** снять галочку о передаче наших контактов владельцу сайта (website operator); передачу hosting provider — оставить.
- **Ожидаемый эффект (честно):** Cloudflare — прокси, контент не хостит; жалобу категории «Other» он пересылает хостинг-провайдеру и в ответе обычно **раскрывает реального хостера** — это главная ценность репорта: получаем узел для следующей жалобы (хостеру напрямую). Срок: автоответ сразу, пересылка — дни.
- **Что приложить:** список URL, описание цепочки редиректов, ссылки на архив.

**Текст в поле описания (готов к вставке):**

```
We report two domains behind Cloudflare that operate as one deceptive network impersonating the OnlyFans platform for Ukrainian users:

1. ofmodels.com.ua (e.g. https://ofmodels.com.ua/, https://ofmodels.com.ua/of/)
2. xn--80apihdb0av.xn--j1amh ("онлифанс.укр", e.g. https://онлифанс.укр/, https://онлифанс.укр/of/)

The sites falsely present themselves as the official OnlyFans platform (homepage title: "Онлифанс - Офіційна платформа для творців та фанатів", i.e. "Official platform for creators and fans"), display fake creator profiles, and funnel all visitors into one affiliate link: /of/ on both domains 301-redirects to onlyfans.com/?ref=475493277 (verified 5 October 2026). ofmodels.com.ua is a byte-identical mirror of the second domain (canonical and sitemap point there). The domain ofmodels.com.ua is also confusingly similar to our brand ofmmodels.com, a talent management agency, which misleads our applicants.

Please forward this report to the hosting provider of these websites and advise us of the responsible hosting provider so we can follow up with them directly.
```

---

## 5. Официальное письмо-требование оператору сайтов (укр., ПОСЛЕДНИМ — после реакции OnlyFans)

- **Куда:** публичного email у оператора нет (регистрант скрыт). Каналы доставки: (1) Telegram **t.me/onlifansukr** (канал связки, 219 подписчиков) — письмом в сообщения канала/бота; (2) через форму обратной связи на сайте, если есть; (3) просьба к регистратору (п.3) переслать письмо регистранту — стандартная практика при скрытом whois.
- **Тон:** вежливо-твёрдо, без угроз и без юридических клеймов, которые мы не можем подтвердить (ТМ ещё не зарегистрирована — «правообладатель» не писать). Без внутренних цифр.
- **Ожидаемый эффект (честно):** низкая вероятность добровольного исполнения; ценность — фиксация добросовестной попытки урегулирования (понадобится для UA-DRP после ТМ) + сигнал оператору, что сеть под наблюдением. Срок: ответа может не быть; факт отправки скриншотим.

**Текст (готов к отправке):**

```
Тема: Щодо доменів ofmodels.com.ua та онлифанс.укр

Доброго дня.

Звертаємося до адміністратора сайтів ofmodels.com.ua та онлифанс.укр.

Ми представляємо OFM Models (ofmmodels.com), агенцію, що працює з українськими авторками контенту. Назва домену ofmodels.com.ua майже збігається з назвою нашої агенції та нашим доменом ofmmodels.com. Через це дівчата, які шукають нас, потрапляють на ваш сайт і сприймають його як наш. Окремо зазначимо: ваші сайти називають себе "офіційною платформою OnlyFans", хоча не мають стосунку до цієї компанії, і це теж вводить відвідувачок в оману.

Просимо:
1. Прибрати з сайтів твердження про "офіційну платформу" та будь-які елементи, які можуть сприйматися як звʼязок із нашою агенцією.
2. Припинити використання домену ofmodels.com.ua у спосіб, що створює плутанину з нашим брендом, або розглянути його передачу чи відключення.

Ми за спокійне вирішення цього питання напряму. Водночас інформуємо, що вже звернулися зі скаргами до відповідних платформ та сервісів і продовжимо захищати назву агенції всіма законними способами.

Відповідь просимо надіслати на agency@ofmmodels.com протягом 10 робочих днів.

З повагою,
[Імʼя власника]
OFM Models, ofmmodels.com
agency@ofmmodels.com
```

---

## 6. Сводная таблица: куда, когда, эффект

| # | Жалоба | Канал | Язык | Когда | Ожидаемый эффект | Срок эффекта |
|---|---|---|---|---|---|---|
| 1 | OnlyFans abuse (ref 475493277) | support@onlyfans.com + onlyfans.com/contact | EN | **07.10** | бан рефки = обнуление монетизации сети; индикатор: /of/ умирает | ответ 1–3 раб. дня; решение 1–4 нед |
| 2 | Google spam report ×2 узла | search.google.com/search-console/report-spam | EN, **анонимно, без PII** | 07–08.10, после №1 | спам-сигнал + возможный manual action | 2–8 нед, без уведомления |
| 3а | Регистратор REGERY (com.ua) | abuse@regery.com + abuse@regery.in.ua | UA | **вторая волна, ~13–15.10** | предупреждение/приостановка (вероятность низкая), след для UA-DRP | 3–14 дней |
| 3б | Регистратор drs.ua (укр) | support@drs.ua + email@drs.ua | UA | вторая волна | то же; домен истекает 28.01.2027 | 3–14 дней |
| 4 | Cloudflare abuse ×2 узла | abuse.cloudflare.com (форма, категория Other) | EN | вторая волна | пересылка хостеру + раскрытие хостера → следующая жалоба напрямую | дни |
| 5 | Письмо оператору | t.me/onlifansukr + через регистратора | UA | **последним**, после реакции OnlyFans | фиксация попытки урегулирования (база UA-DRP) | ответа может не быть |

## 7. Чего НЕ делать (железно)

- **НЕ подавать DMCA** — копирования контента нет; ложная DMCA бьёт по нам.
- **НЕ называть себя правообладателем ТМ** — ТМ «OFM Models» ещё не зарегистрирована (P1-очередь BRAND-SHIELD §2.5).
- **НЕ включать PII и наш бренд в Google-репорт** — текст пересылается владельцу сайта дословно при manual action; репорт с PII отбрасывается.
- **НЕ платить никому за «удаление»** (правило BRAND-SHIELD).
- **НЕ раскрывать внутренние цифры** (обороты, позиции, доли) ни в одной жалобе.
- **НЕ отправлять №5 раньше №1** — письмо раскрывает инициатора и может ускорить перенос рефки/домена.

## 8. Мониторинг после отправки (в каждый понедельничный замер)

1. `curl -sI https://ofmodels.com.ua/of/` — **301 пропал = рефка забанена = победа №1**.
2. AIO обоих «це» + mobile «онлифанс» топ-1 + site:ofmodels.com.ua (протокол BRAND-SHIELD §3.1).
3. Ответы на email-жалобы (agency@) — статусы в месячный отчёт (§3.2 BRAND-SHIELD).
4. NS/hostname-смена узлов (переезд с Cloudflare = реакция оператора).

*Подготовил: агент, 05.10.2026 вечер. Источники: BRAND-SHIELD-2026-09 §1.1/§2.1, SEO-WEEKLY-2026-10-05 §3.5, живые проверки 05.10 (curl/nslookup), актуализация каналов: Abuse Policy Regery (abuse@regery.com), whois drs.ua (email@drs.ua), форма Google report-spam (правила 2026: manual actions + пересылка текста), abuse.cloudflare.com (только форма). Отправка — только владельцем, после его финального «ок» на каждый текст.*
