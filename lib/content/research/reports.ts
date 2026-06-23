/**
 * /research — curated, fully-sourced statistics roundups (linkable assets).
 * NOT original surveys: every figure traces to a public source in `sources`.
 * Per-locale content (ru + uk now; en/es later). Numbers/URLs are shared; only
 * text is localized. Resolve via getResearchReport(slug, locale).
 */
import { routing, type Locale } from '@/i18n/routing';
import { resolveLocale } from '@/lib/content/locale';

export type ChartDatum = { label: string; value: number };

export type ResearchChart = {
  id: string;
  title: string;
  caption: string;
  sourceNote: string;
  unit?: '%' | 'count';
  display?: 'bars' | 'cards';
  data: ChartDatum[];
};

export type SourcedFinding = { stat: string; text: string; source: string };

/** UI chrome labels (localized alongside the report). */
export type ResearchUi = {
  eyebrow: string;
  publishedLabel: string;
  updatedLabel: string;
  licenseLabel: string;
  sourceLabel: string;
  uniqueHeading: string;
  keyFindingsHeading: string;
  downloadCsv: string;
  redFlagsHeading: string;
  checklistHeading: string;
  ofmLine: string;
  curationHeading: string;
  helpHeading: string;
  sourcesHeading: string;
  breadcrumbHome: string;
  breadcrumbHub: string;
  citeHeading: string;
  citeLicenseLine: string;
  citeHtmlLabel: string;
  citeEmbedLabel: string;
  citeCopy: string;
  citeCopied: string;
  citeKind: string;
};

export type ResearchReport = {
  slug: string;
  title: string;
  seoTitle: string;
  dek: string;
  heroStat: { value: string; label: string; source: string };
  publishedAt: string;
  updatedAt: string;
  keywords: string[];
  keyFindings: SourcedFinding[];
  charts: ResearchChart[];
  uniqueAngle: string;
  redFlags: string[];
  safetyChecklist: string[];
  curationNote: string;
  sources: { label: string; url: string }[];
  helpResources: { label: string; href: string }[];
  csv: string;
  ui: ResearchUi;
};

// Citations are shared verbatim across locales (reference material).
const SOURCES: { label: string; url: string }[] = [
  { label: 'Umbach, Henry & Beard — Prevalence and Impacts of Image-Based Sexual Abuse (CHI 2025)', url: 'https://arxiv.org/html/2503.04988v1' },
  { label: 'Umbach et al. — CHI 2025 (ACM Digital Library)', url: 'https://dl.acm.org/doi/full/10.1145/3706598.3713545' },
  { label: 'FBI IC3 — 2024 Internet Crime Report (PDF)', url: 'https://www.ic3.gov/AnnualReport/Reports/2024_IC3Report.pdf' },
  { label: 'FBI IC3 PSA (2023) — Manipulated Photos/Deepfakes & Sextortion', url: 'https://www.ic3.gov/PSA/2023/psa230605' },
  { label: 'Soneji et al. — OnlyFans Creators (USENIX Security 2024)', url: 'https://www.usenix.org/conference/usenixsecurity24/presentation/soneji' },
  { label: 'Thomas et al. (Google) — Hate and Harassment of Content Creators (CHI 2022)', url: 'https://research.google/pubs/its-common-and-a-part-of-being-a-content-creator-understanding-how-creators-experience-and-cope-with-hate-and-harassment-online/' },
  { label: 'Sanders et al. — Commercial content creators and lack of NCII protection (New Media & Society, 2025)', url: 'https://journals.sagepub.com/doi/full/10.1177/14614448231172711' },
  { label: 'Revenge Porn Helpline (SWGfL) — Commercial content creators and sex workers', url: 'https://revengepornhelpline.org.uk/how-can-we-help/who-can-we-help/commercial-content-creators-and-sex-workers/' },
  { label: 'SWGfL — Revenge Porn Helpline 2024 Annual Report', url: 'https://swgfl.org.uk/research/revenge-porn-helpline-2024-annual-report/' },
  { label: 'FTC — Begins Enforcing TAKE IT DOWN Act (May 2026)', url: 'https://www.ftc.gov/news-events/news/press-releases/2026/05/ftc-begins-enforcing-take-it-down-act' },
  { label: 'Congress.gov CRS — TAKE IT DOWN Act (LSB11314)', url: 'https://www.congress.gov/crs-product/LSB11314' },
  { label: 'Eurostat — Recorded sexual violence offences 2014–2024 (Apr 2026)', url: 'https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20260429-2' },
  { label: 'Oxford Academic (Journal of Cybersecurity) — IBSA prevalence (n=6 109)', url: 'https://academic.oup.com/cybersecurity/article/11/1/tyaf033/8322282' },
  { label: 'Home Security Heroes — 2023 State of Deepfakes (vendor)', url: 'https://www.securityhero.io/state-of-deepfakes/' },
  { label: 'Cyber Civil Rights Initiative — research (NCII victim surveys)', url: 'https://cybercivilrights.org/research/' },
  { label: 'Foreign Policy — OnlyFans performers can’t get justice (Ceartas 50–70% estimate)', url: 'https://foreignpolicy.com/2025/05/14/onlyfans-performers-cant-get-justice/' },
  { label: 'Slate — The dark side of OnlyFans content theft', url: 'https://slate.com/technology/2024/11/onlyfans-content-stolen-privacy-security-internet-dark-side.html' },
  { label: 'Reuters Special Report — Sexual content on OnlyFans without consent', url: 'https://www.reuters.com/investigates/special-report/onlyfans-nonconsensual/' },
  { label: 'Eric Goldman — N.Z. v. Fenix (chatter-scam claim dismissed, Dec 2025)', url: 'https://blog.ericgoldman.org/archives/2025/12/onlyfans-defeats-chatter-scam-claim-n-z-v-fenix.htm' },
  { label: 'ABA Journal — Firm fined for hallucinated citations in OnlyFans case', url: 'https://www.abajournal.com/news/article/plaintiffs-firm-fined-for-filing-hallucinated-material-in-onlyfans-case' },
  { label: 'NV.ua — Ukraine’s OnlyFans declare $7.3M income', url: 'https://english.nv.ua/business/sex-sells-ukraine-s-onlyfans-declare-7-3m-pushing-for-legal-porn-50475160.html' },
  { label: 'UNN — Six sentences in 3 years for OnlyFans work in Ukraine', url: 'https://unn.ua/en/news/in-ukraine-six-sentences-have-been-handed-down-for-working-on-onlyfans-in-3-years' },
  { label: 'Euronews — Czech police charge four in OnlyFans human-trafficking case (2026)', url: 'https://www.euronews.com/next/2026/06/02/czech-police-charge-four-in-onlyfans-human-trafficking-case' },
];

const UI_RU: ResearchUi = {
  eyebrow: 'Кураторский обзор данных · 2026',
  publishedLabel: 'Опубликовано',
  updatedLabel: 'Обновлено',
  licenseLabel: 'Лицензия CC BY 4.0',
  sourceLabel: 'Источник',
  uniqueHeading: 'Почему этого нет ни у кого',
  keyFindingsHeading: 'Ключевые выводы',
  downloadCsv: 'Скачать данные (CSV)',
  redFlagsHeading: 'Red flags недобросовестного агентства',
  checklistHeading: 'Чек-лист безопасности креатора',
  ofmLine: 'Этим стандартам безопасности следует и OFM Models — их подсказывают сами данные.',
  curationHeading: 'Как мы собрали этот обзор',
  helpHeading: 'Куда обратиться за помощью',
  sourcesHeading: 'Источники',
  breadcrumbHome: 'Главная',
  breadcrumbHub: 'Исследования',
  citeHeading: 'Процитировать это исследование',
  citeLicenseLine: 'Данные открыты по лицензии CC BY 4.0 — используйте с указанием источника и ссылкой.',
  citeHtmlLabel: 'Ссылка (HTML)',
  citeEmbedLabel: 'Вставить (embed)',
  citeCopy: 'Копировать',
  citeCopied: 'Скопировано',
  citeKind: '[Обзор данных]',
};

const UI_UK: ResearchUi = {
  eyebrow: 'Кураторська добірка даних · 2026',
  publishedLabel: 'Опубліковано',
  updatedLabel: 'Оновлено',
  licenseLabel: 'Ліцензія CC BY 4.0',
  sourceLabel: 'Джерело',
  uniqueHeading: 'Чому цього немає ні в кого',
  keyFindingsHeading: 'Ключові висновки',
  downloadCsv: 'Завантажити дані (CSV)',
  redFlagsHeading: 'Red flags недобросовісного агентства',
  checklistHeading: 'Чек-лист безпеки креатора',
  ofmLine: 'Цих стандартів безпеки дотримується і OFM Models — їх підказують самі дані.',
  curationHeading: 'Як ми зібрали цю добірку',
  helpHeading: 'Куди звернутися по допомогу',
  sourcesHeading: 'Джерела',
  breadcrumbHome: 'Головна',
  breadcrumbHub: 'Дослідження',
  citeHeading: 'Процитувати це дослідження',
  citeLicenseLine: 'Дані відкриті за ліцензією CC BY 4.0 — використовуйте з посиланням на джерело.',
  citeHtmlLabel: 'Посилання (HTML)',
  citeEmbedLabel: 'Вставити (embed)',
  citeCopy: 'Копіювати',
  citeCopied: 'Скопійовано',
  citeKind: '[Огляд даних]',
};

const safetyRu: ResearchReport = {
  slug: 'onlyfans-creator-safety-2026',
  title:
    'Безопасность авторов 18+ в 2026: 22,6% взрослых пережили image-based abuse — а статистики именно по платным авторам нет ни у кого',
  seoTitle: 'Безопасность авторов OnlyFans 2026: статистика и данные',
  dek: 'Кураторская сводка проверенных институциональных данных о безопасности взрослых авторов контента: что измерено, что только у несовершеннолетних, и где зияет пробел «коммерческого контента».',
  heroStat: {
    value: '22,6%',
    label: 'взрослых в 10 странах пережили хотя бы одну форму image-based sexual abuse (IBSA)',
    source: 'Umbach, Henry & Beard, CHI 2025, n=16 693',
  },
  publishedAt: '2026-06-23',
  updatedAt: '2026-06-23',
  keywords: [
    'onlyfans safety statistics',
    'creator safety statistics',
    'image based sexual abuse statistics',
    'deepfake porn statistics',
    'sextortion statistics 2026',
    'статистика безопасности авторов контента',
    'коммерческий контент NCII пробел',
  ],
  keyFindings: [
    { stat: '22,6%', text: 'Каждый пятый взрослый сталкивался с image-based sexual abuse: угрозы публикацией интимных изображений — 14,5%, съёмка без согласия — 14,2%, распространение без разрешения — 12,3%. Рецензируемое многонациональное исследование 16 693 взрослых в 10 странах — самый чистый первичный замер по взрослым.', source: 'Umbach et al., CHI 2025 (arXiv 2503.04988)' },
    { stat: '8,0%', text: 'Ровно 8,0% взрослых сообщили, что о них создали дипфейк или цифрово изменённое сексуальное изображение. Важно не путать с «1,2%» — это из другого исследования (CHI 2024); у этой работы дипфейк-показатель именно 8,0%.', source: 'Umbach et al., CHI 2025' },
    { stat: '99%', text: 'Из дипфейк-видео в сети 98% — порнографические, и 99% жертв в дипфейк-порно — женщины. Цифры вендорские (Home Security Heroes), широко цитируются, но не рецензированы — даём с пометкой. Есть честное напряжение: агрегат IBSA у Umbach близок к гендерному паритету (22,7% мужчин против 22,3% женщин).', source: 'Security Hero, 2023 State of Deepfakes (вендор)' },
    { stat: '50–70%', text: 'По оценке техдиректора Ceartas DMCA, «от 50 до 70% платного OnlyFans-контента крадут». Это экспертная оценка вендора через журналистику, не измеренная распространённость — репрезентативного исследования кражи платного контента не существует. В академической выборке (USENIX 2024, n=43) утечки были 2-й по частоте угрозой.', source: 'Foreign Policy 2025; Soneji et al., USENIX Security 2024' },
    { stat: '54%', text: 'У авторов контента самая частая атака — выдача себя за них: 54%; угон аккаунта — 32%; сталкинг/слежка — 31%; ложные жалобы — 31%; доксинг — 26%. 95% вспомнили хотя бы один эпизод hate & harassment. Выборка общая (N=135 авторов США), не только 18+.', source: 'Thomas et al. (Google), CHI 2022, N=135' },
    { stat: '65,2%', text: 'Среди коммерческих авторов контента 65,2% сообщили о преступлениях со стороны незнакомцев, и лишь 40,7% могли пожаловаться платформам. Ключевой вывод: как только контент продан/опубликован, он выпадает из защиты NCII — это и есть пробел коммерческого контента.', source: 'Sanders et al., New Media & Society 2025' },
    { stat: '40 143', text: 'В возрастной разбивке FBI IC3 за 2024 год по extortion/sextortion взрослые (20+) — большинство заявителей (~40 143) против 3 806 в категории до 20 лет. Институциональные данные показывают: жертвы вымогательства преимущественно взрослые, но почти все профильные исследования (NCMEC, Thorn) посвящены несовершеннолетним.', source: 'FBI IC3, 2024 Internet Crime Report, p. 36' },
  ],
  charts: [
    { id: 'ibsa_by_type', title: 'IBSA среди взрослых по типам (10 стран, n=16 693)', caption: 'Доля взрослых, переживших каждую форму image-based sexual abuse хотя бы раз. Дипфейк-изображения — 8,0%.', sourceNote: 'Источник: Umbach, Henry & Beard, CHI 2025, n=16 693 · ofmmodels.com/research', unit: '%', display: 'bars', data: [{ label: 'Угроза публикацией интимных фото', value: 14.5 }, { label: 'Съёмка/запись без согласия', value: 14.2 }, { label: 'Показ/распространение без разрешения', value: 12.3 }, { label: 'Кража контента', value: 9.7 }, { label: 'Создан дипфейк/изменённое фото', value: 8 }] },
    { id: 'creator_hate_harassment', title: 'Атаки на авторов контента (доля переживших, %)', caption: 'Импersonation — самая частая атака; дипфейки/манипулированный контент — 24%. Выборка общая (N=135 авторов США), не только взрослый контент.', sourceNote: 'Источник: Thomas et al. (Google), CHI 2022, N=135 · ofmmodels.com/research', unit: '%', display: 'bars', data: [{ label: 'Выдача себя за автора', value: 54 }, { label: 'Угон аккаунта', value: 32 }, { label: 'Сталкинг/слежка', value: 31 }, { label: 'Ложные жалобы', value: 31 }, { label: 'Доксинг', value: 26 }, { label: 'Дипфейки/манипуляция', value: 24 }] },
    { id: 'ic3_age_sextortion', title: 'Extortion/sextortion: число заявителей FBI IC3 по возрасту (2024)', caption: 'Взрослые — большинство зарегистрированных жертв вымогательства, несмотря на то что профильные исследования сосредоточены на несовершеннолетних. Все возрасты, смешаны сексуальное и несексуальное вымогательство.', sourceNote: 'Источник: FBI IC3, 2024 Internet Crime Report, p. 36 · ofmmodels.com/research', unit: 'count', display: 'bars', data: [{ label: 'До 20', value: 3806 }, { label: '20–29', value: 13302 }, { label: '30–39', value: 9204 }, { label: '40–49', value: 6794 }, { label: '50–59', value: 4940 }, { label: '60+', value: 5903 }] },
    { id: 'rph_2024', title: 'Revenge Porn Helpline (Великобритания), 2024', caption: 'Рекордный год: 22 275 обращений (+20,9% год к году), доля удаления 90,9%. Институциональные данные NGO по взрослым.', sourceNote: 'Источник: SWGfL, Revenge Porn Helpline 2024 Annual Report · ofmmodels.com/research', display: 'cards', data: [{ label: 'Обращений в 2024', value: 22275 }, { label: 'Доля успешного удаления, %', value: 90.9 }, { label: 'Доля случаев с секс-вымогательством, %', value: 22.7 }, { label: 'Доля мужчин-нарушителей, %', value: 81 }] },
  ],
  uniqueAngle: 'Взрослые профессиональные авторы контента находятся в задокументированной «слепой зоне». Поисковая выдача расколота надвое: данные по несовершеннолетним (NCMEC, Thorn, Europol) и корпоративные fraud-данные вендоров кибербезопасности. Середина — взрослые авторы — пуста: никто не сводит институциональные и рецензируемые данные именно по ним. Главный нерв сводки — «пробел коммерческого контента», подтверждённый дословно: служба Revenge Porn Helpline (SWGfL) на странице для секс-работников прямо называет AdultWork и OnlyFans и заявляет, что изображения, загруженные на публичный форум, «не подпадают под действующий закон о раскрытии интимных изображений без согласия, поскольку считаются коммерчески созданными», и «мы не можем сообщать о коммерчески созданных изображениях от вашего имени». Та же логика — в США: федеральный TAKE IT DOWN Act (вступил в силу 19 мая 2025, правоприменение FTC с 19 мая 2026) прямо исключает «коммерческий порнографический контент», кроме случаев принуждения/обмана. Итог: профильный механизм удаления NCII не может действовать от имени платных авторов — консолидированного ресурса данных по их безопасности не существует. Именно его закрывает эта сводка. Региональный слой: ~350 украинских OnlyFans-моделей задекларировали UAH 305,4 млн (~$7,3 млн), при этом за 3 года в Украине вынесено лишь 6 приговоров за работу на OnlyFans.',
  redFlags: [
    'Агентство/менеджер требует доступ к вашему банку, документам или просит «передать» личный номер телефона для входа — потеря контроля над аккаунтом (угон испытывают 32% авторов).',
    'Платформа или «партнёр» не может назвать институциональный источник своих цифр («дипфейк-атаки +1300%», «$2,1 млрд потерь») — это вендорский маркетинг, а не исследование.',
    'Контракт обещает «защиту от утечек 100%» — репрезентативного измерения кражи платного контента не существует, гарантировать невозможно; реальная практика — DMCA-удаление по факту.',
    'Вам говорят, что слитый платный контент «защищён законом о revenge porn» — в Великобритании и США коммерческий контент прямо исключён из NCII-защиты.',
    '«Чаттеры» отвечают подписчикам от вашего имени без вашего ведома и согласия — предмет судебных исков; прозрачность обязательна.',
    'Запрос интимного контента «для верификации» от незнакомца или новый контакт, быстро переходящий к шантажу — классическая схема секс-вымогательства.',
    'Юрист/фирма ссылается на «прецеденты», которые нельзя проверить — в этой сфере уже была санкция за вымышленные ИИ-цитаты (ABA Journal, 2025).',
  ],
  safetyChecklist: [
    'Используйте отдельные e-mail и телефон только для рабочих аккаунтов; никогда не передавайте личный номер агентству — заводите аккаунты на свои данные.',
    'Включите двухфакторную аутентификацию и уникальный пароль на каждой платформе; импersonation (54%) и угон (32%) — самые частые атаки.',
    'Сохраняйте доказательства владения контентом (исходники, метаданные, даты) — это основа DMCA-удаления и заявлений.',
    'Знайте свой механизм удаления: в США — TakeItDown.ftc.gov и обязанность платформы удалить за 48 часов; в Великобритании — Revenge Porn Helpline (но не для коммерческого контента — уточняйте статус заранее).',
    'Отслеживайте утечки: ставьте поисковые оповещения по имени/нику и проверяйте агрегаторы краденого контента; реагируйте быстро.',
    'Минимизируйте доксинг: уберите геометки, адреса на фоне, повторно используемые юзернеймы и фото из публичных профилей — для дипфейков берут фото из соцсетей.',
    'Проверяйте агентства: прозрачные условия по чаттерам, без требований полного доступа к финансам/документам, письменный договор.',
    'При секс-вымогательстве не платите и не удаляйте переписку — сохраните доказательства и обратитесь в правоохранительные органы и на горячие линии.',
    'Отделяйте проверяемые институциональные данные от вендорского маркетинга при оценке любых «гарантий безопасности».',
  ],
  curationNote: 'Это кураторская сводка, а не собственный опрос: OFM Model Agency не собирала эти цифры, а отобрала и свела уже опубликованные данные из первичных и институциональных источников. Каждая цифра прослеживается до источника в списке ниже. Приоритет — рецензируемые и институциональные данные (CHI 2025, USENIX 2024, FBI IC3, FTC, Eurostat, SWGfL); вендорские цифры (Home Security Heroes) приведены с явной пометкой «вендор» и не используются как доказательство распространённости. Данные по взрослым и несовершеннолетним строго разделены: статистика NCMEC/Thorn относится к несовершеннолетним и не переносится на взрослых авторов. Признанные ограничения: репрезентативного исследования кражи платного контента не существует («50–70%» — экспертная оценка); IC3 не отделяет сексуальное вымогательство от общего. OFM выступает только куратором; материал носит просветительский характер и не является юридической консультацией.',
  sources: SOURCES,
  helpResources: [
    { label: 'FTC TakeItDown — подача жалоб на NCII (США, удаление за 48 часов)', href: 'https://takeitdown.ftc.gov/' },
    { label: 'Revenge Porn Helpline (Великобритания, SWGfL)', href: 'https://revengepornhelpline.org.uk/' },
    { label: 'StopNCII.org — хеш-блокировка интимных изображений', href: 'https://stopncii.org/' },
    { label: 'Cyber Civil Rights Initiative — горячая линия по NCII', href: 'https://cybercivilrights.org/ccri-crisis-helpline/' },
    { label: 'FBI IC3 — заявления о вымогательстве/секс-вымогательстве', href: 'https://www.ic3.gov/' },
  ],
  csv: '/data/onlyfans-creator-safety-2026.csv',
  ui: UI_RU,
};

const safetyUk: ResearchReport = {
  slug: 'onlyfans-creator-safety-2026',
  title:
    'Безпека авторів 18+ у 2026: 22,6% дорослих зазнали image-based abuse — а статистики саме щодо платних авторів немає ні в кого',
  seoTitle: 'Безпека авторів OnlyFans 2026: статистика та дані',
  dek: 'Кураторська добірка перевірених інституційних даних про безпеку дорослих авторів контенту: що виміряно, що лише щодо неповнолітніх і де зяє прогалина «комерційного контенту».',
  heroStat: {
    value: '22,6%',
    label: 'дорослих у 10 країнах зазнали щонайменше однієї форми image-based sexual abuse (IBSA)',
    source: 'Umbach, Henry & Beard, CHI 2025, n=16 693',
  },
  publishedAt: '2026-06-23',
  updatedAt: '2026-06-23',
  keywords: [
    'onlyfans safety statistics',
    'creator safety statistics',
    'image based sexual abuse statistics',
    'статистика безпеки авторів контенту',
    'дипфейк порно статистика',
    'onlyfans безпека україна',
  ],
  keyFindings: [
    { stat: '22,6%', text: 'Кожен п’ятий дорослий стикався з image-based sexual abuse: погрози оприлюдненням інтимних зображень — 14,5%, зйомка без згоди — 14,2%, поширення без дозволу — 12,3%. Рецензоване багатонаціональне дослідження 16 693 дорослих у 10 країнах — найчистіший первинний замір щодо дорослих.', source: 'Umbach et al., CHI 2025 (arXiv 2503.04988)' },
    { stat: '8,0%', text: 'Рівно 8,0% дорослих повідомили, що про них створили дипфейк або цифрово змінене сексуальне зображення. Важливо не плутати з «1,2%» — це з іншого дослідження (CHI 2024); у цій роботі дипфейк-показник саме 8,0%.', source: 'Umbach et al., CHI 2025' },
    { stat: '99%', text: 'Із дипфейк-відео в мережі 98% — порнографічні, і 99% жертв у дипфейк-порно — жінки. Цифри вендорські (Home Security Heroes), широко цитуються, але не рецензовані — даємо з поміткою. Є чесне протиріччя: агрегат IBSA в Umbach близький до гендерного паритету (22,7% чоловіків проти 22,3% жінок).', source: 'Security Hero, 2023 State of Deepfakes (вендор)' },
    { stat: '50–70%', text: 'За оцінкою техдиректора Ceartas DMCA, «від 50 до 70% платного OnlyFans-контенту крадуть». Це експертна оцінка вендора через журналістику, не виміряна поширеність — репрезентативного дослідження крадіжки платного контенту не існує. В академічній вибірці (USENIX 2024, n=43) витоки були 2-ю за частотою загрозою.', source: 'Foreign Policy 2025; Soneji et al., USENIX Security 2024' },
    { stat: '54%', text: 'У авторів контенту найчастіша атака — видавання себе за них: 54%; викрадення акаунта — 32%; сталкінг/стеження — 31%; неправдиві скарги — 31%; доксинг — 26%. 95% згадали щонайменше один епізод hate & harassment. Вибірка загальна (N=135 авторів США), не лише 18+.', source: 'Thomas et al. (Google), CHI 2022, N=135' },
    { stat: '65,2%', text: 'Серед комерційних авторів контенту 65,2% повідомили про злочини з боку незнайомців, і лише 40,7% могли поскаржитися платформам. Ключовий висновок: щойно контент продано/опубліковано, він випадає із захисту NCII — це і є прогалина комерційного контенту.', source: 'Sanders et al., New Media & Society 2025' },
    { stat: '40 143', text: 'У віковій розбивці FBI IC3 за 2024 рік щодо extortion/sextortion дорослі (20+) — більшість заявників (~40 143) проти 3 806 у категорії до 20 років. Інституційні дані показують: жертви вимагання переважно дорослі, але майже всі профільні дослідження (NCMEC, Thorn) присвячені неповнолітнім.', source: 'FBI IC3, 2024 Internet Crime Report, p. 36' },
  ],
  charts: [
    { id: 'ibsa_by_type', title: 'IBSA серед дорослих за типами (10 країн, n=16 693)', caption: 'Частка дорослих, які пережили кожну форму image-based sexual abuse щонайменше раз. Дипфейк-зображення — 8,0%.', sourceNote: 'Джерело: Umbach, Henry & Beard, CHI 2025, n=16 693 · ofmmodels.com/research', unit: '%', display: 'bars', data: [{ label: 'Погроза оприлюдненням інтимних фото', value: 14.5 }, { label: 'Зйомка/запис без згоди', value: 14.2 }, { label: 'Показ/поширення без дозволу', value: 12.3 }, { label: 'Крадіжка контенту', value: 9.7 }, { label: 'Створено дипфейк/змінене фото', value: 8 }] },
    { id: 'creator_hate_harassment', title: 'Атаки на авторів контенту (частка тих, хто пережив, %)', caption: 'Імперсонація — найчастіша атака; дипфейки/маніпульований контент — 24%. Вибірка загальна (N=135 авторів США), не лише дорослий контент.', sourceNote: 'Джерело: Thomas et al. (Google), CHI 2022, N=135 · ofmmodels.com/research', unit: '%', display: 'bars', data: [{ label: 'Видавання себе за автора', value: 54 }, { label: 'Викрадення акаунта', value: 32 }, { label: 'Сталкінг/стеження', value: 31 }, { label: 'Неправдиві скарги', value: 31 }, { label: 'Доксинг', value: 26 }, { label: 'Дипфейки/маніпуляція', value: 24 }] },
    { id: 'ic3_age_sextortion', title: 'Extortion/sextortion: кількість заявників FBI IC3 за віком (2024)', caption: 'Дорослі — більшість зареєстрованих жертв вимагання, попри те що профільні дослідження зосереджені на неповнолітніх. Усі віки, змішані сексуальне та несексуальне вимагання.', sourceNote: 'Джерело: FBI IC3, 2024 Internet Crime Report, p. 36 · ofmmodels.com/research', unit: 'count', display: 'bars', data: [{ label: 'До 20', value: 3806 }, { label: '20–29', value: 13302 }, { label: '30–39', value: 9204 }, { label: '40–49', value: 6794 }, { label: '50–59', value: 4940 }, { label: '60+', value: 5903 }] },
    { id: 'rph_2024', title: 'Revenge Porn Helpline (Велика Британія), 2024', caption: 'Рекордний рік: 22 275 звернень (+20,9% рік до року), частка видалення 90,9%. Інституційні дані NGO щодо дорослих.', sourceNote: 'Джерело: SWGfL, Revenge Porn Helpline 2024 Annual Report · ofmmodels.com/research', display: 'cards', data: [{ label: 'Звернень у 2024', value: 22275 }, { label: 'Частка успішного видалення, %', value: 90.9 }, { label: 'Частка випадків із секс-вимаганням, %', value: 22.7 }, { label: 'Частка чоловіків-порушників, %', value: 81 }] },
  ],
  uniqueAngle: 'Дорослі професійні автори контенту перебувають у задокументованій «сліпій зоні». Пошукова видача розколота надвоє: дані щодо неповнолітніх (NCMEC, Thorn, Europol) і корпоративні fraud-дані вендорів кібербезпеки. Середина — дорослі автори — порожня: ніхто не зводить інституційні та рецензовані дані саме щодо них. Головний нерв добірки — «прогалина комерційного контенту», підтверджена дослівно: служба Revenge Porn Helpline (SWGfL) на сторінці для секс-працівників прямо називає AdultWork і OnlyFans та заявляє, що зображення, завантажені на публічний форум, «не підпадають під чинний закон про оприлюднення інтимних зображень без згоди, оскільки вважаються комерційно створеними», і «ми не можемо повідомляти про комерційно створені зображення від вашого імені». Та сама логіка — у США: федеральний TAKE IT DOWN Act (набув чинності 19 травня 2025, правозастосування FTC з 19 травня 2026) прямо виключає «комерційний порнографічний контент», крім випадків примусу/обману. Підсумок: профільний механізм видалення NCII не може діяти від імені платних авторів — консолідованого ресурсу даних щодо їхньої безпеки не існує. Саме його закриває ця добірка. Регіональний шар: ~350 українських OnlyFans-моделей задекларували UAH 305,4 млн (~$7,3 млн), при цьому за 3 роки в Україні винесено лише 6 вироків за роботу на OnlyFans.',
  redFlags: [
    'Агентство/менеджер вимагає доступ до вашого банку, документів або просить «передати» особистий номер телефону для входу — втрата контролю над акаунтом (викрадення зазнають 32% авторів).',
    'Платформа чи «партнер» не може назвати інституційне джерело своїх цифр («дипфейк-атаки +1300%», «$2,1 млрд втрат») — це вендорський маркетинг, а не дослідження.',
    'Контракт обіцяє «захист від витоків 100%» — репрезентативного виміру крадіжки платного контенту не існує, гарантувати неможливо; реальна практика — DMCA-видалення за фактом.',
    'Вам кажуть, що злитий платний контент «захищений законом про revenge porn» — у Великій Британії та США комерційний контент прямо виключено із NCII-захисту.',
    '«Чаттери» відповідають підписникам від вашого імені без вашого відома та згоди — предмет судових позовів; прозорість обов’язкова.',
    'Запит інтимного контенту «для верифікації» від незнайомця або новий контакт, що швидко переходить до шантажу — класична схема секс-вимагання.',
    'Юрист/фірма посилається на «прецеденти», які не можна перевірити — у цій сфері вже була санкція за вигадані ШІ-цитати (ABA Journal, 2025).',
  ],
  safetyChecklist: [
    'Використовуйте окремі e-mail і телефон лише для робочих акаунтів; ніколи не передавайте особистий номер агентству — заводьте акаунти на свої дані.',
    'Увімкніть двофакторну автентифікацію та унікальний пароль на кожній платформі; імперсонація (54%) і викрадення (32%) — найчастіші атаки.',
    'Зберігайте докази володіння контентом (вихідники, метадані, дати) — це основа DMCA-видалення та заяв.',
    'Знайте свій механізм видалення: у США — TakeItDown.ftc.gov і обов’язок платформи видалити за 48 годин; у Великій Британії — Revenge Porn Helpline (але не для комерційного контенту — уточнюйте статус заздалегідь).',
    'Відстежуйте витоки: ставте пошукові сповіщення за іменем/ніком і перевіряйте агрегатори краденого контенту; реагуйте швидко.',
    'Мінімізуйте доксинг: приберіть геомітки, адреси на фоні, повторно використовувані юзернейми та фото з публічних профілів — для дипфейків беруть фото із соцмереж.',
    'Перевіряйте агентства: прозорі умови щодо чаттерів, без вимог повного доступу до фінансів/документів, письмовий договір.',
    'У разі секс-вимагання не платіть і не видаляйте листування — збережіть докази та зверніться до правоохоронних органів і на гарячі лінії.',
    'Відокремлюйте перевірювані інституційні дані від вендорського маркетингу під час оцінки будь-яких «гарантій безпеки».',
  ],
  curationNote: 'Це кураторська добірка, а не власне опитування: OFM Model Agency не збирала ці цифри, а відібрала і звела вже опубліковані дані з первинних та інституційних джерел. Кожна цифра простежується до джерела у списку нижче. Пріоритет — рецензовані та інституційні дані (CHI 2025, USENIX 2024, FBI IC3, FTC, Eurostat, SWGfL); вендорські цифри (Home Security Heroes) наведено з явною поміткою «вендор» і не використано як доказ поширеності. Дані щодо дорослих і неповнолітніх суворо розділено: статистика NCMEC/Thorn стосується неповнолітніх і не переноситься на дорослих авторів. Визнані обмеження: репрезентативного дослідження крадіжки платного контенту не існує («50–70%» — експертна оцінка); IC3 не відокремлює сексуальне вимагання від загального. OFM виступає лише куратором; матеріал має просвітницький характер і не є юридичною консультацією.',
  sources: SOURCES,
  helpResources: [
    { label: 'FTC TakeItDown — подання скарг на NCII (США, видалення за 48 годин)', href: 'https://takeitdown.ftc.gov/' },
    { label: 'Revenge Porn Helpline (Велика Британія, SWGfL)', href: 'https://revengepornhelpline.org.uk/' },
    { label: 'StopNCII.org — хеш-блокування інтимних зображень', href: 'https://stopncii.org/' },
    { label: 'Cyber Civil Rights Initiative — гаряча лінія щодо NCII', href: 'https://cybercivilrights.org/ccri-crisis-helpline/' },
    { label: 'FBI IC3 — заяви про вимагання/секс-вимагання', href: 'https://www.ic3.gov/' },
  ],
  csv: '/data/onlyfans-creator-safety-2026.csv',
  ui: UI_UK,
};

type LocaleReports = Partial<Record<Locale, ResearchReport>>;

const REPORTS: Record<string, LocaleReports> = {
  'onlyfans-creator-safety-2026': { ru: safetyRu, uk: safetyUk },
};

export function getResearchReport(slug: string, locale?: string | Locale): ResearchReport | undefined {
  const byLocale = REPORTS[slug];
  if (!byLocale) return undefined;
  const resolved = resolveLocale(locale);
  return byLocale[resolved] ?? byLocale[routing.defaultLocale];
}

export function getResearchReportSlugs(): string[] {
  return Object.keys(REPORTS);
}

/** Locales a report actually has content for (drives static params + sitemap). */
export function getResearchReportLocales(slug: string): Locale[] {
  const byLocale = REPORTS[slug];
  return byLocale ? (Object.keys(byLocale) as Locale[]) : [];
}

/** Reports available in a given locale, for the hub listing. */
export function getResearchReportsForLocale(locale?: string | Locale): ResearchReport[] {
  return getResearchReportSlugs()
    .map((slug) => getResearchReport(slug, locale))
    .filter((r): r is ResearchReport => Boolean(r));
}

/** Locales the /research hub is published in (union of all reports + ru base). */
export function getResearchLocales(): Locale[] {
  const set = new Set<Locale>([routing.defaultLocale]);
  for (const slug of getResearchReportSlugs()) {
    for (const loc of getResearchReportLocales(slug)) set.add(loc);
  }
  return routing.locales.filter((l) => set.has(l));
}

/** Hub chrome per locale. */
export type ResearchHubUi = {
  eyebrow: string;
  title: string;
  lead: string;
  intro: string;
  licenseLabel: string;
  reportBadge: string;
  pressHeading: string;
  pressBody: string;
  contactLabel: string;
};

const HUB_UI: Record<string, ResearchHubUi> = {
  ru: {
    eyebrow: 'OFM Research',
    title: 'Данные о creator-экономике и безопасности',
    lead: 'Оригинальные обзоры данных OFM Model Agency — открытые источники, прозрачная методология и графики, готовые к цитированию.',
    intro: 'Мы сводим анонимные публичные данные в общественных интересах: безопасность креаторов, недобросовестные практики и реальная экономика индустрии. Все датасеты доступны по лицензии',
    licenseLabel: 'CC BY 4.0',
    reportBadge: 'Обзор',
    pressHeading: 'Для прессы и исследователей',
    pressBody: 'Можно свободно цитировать наши данные со ссылкой. Запросы и комментарии — через',
    contactLabel: 'форму связи',
  },
  uk: {
    eyebrow: 'OFM Research',
    title: 'Дані про creator-економіку та безпеку',
    lead: 'Оригінальні огляди даних OFM Model Agency — відкриті джерела, прозора методологія та графіки, готові до цитування.',
    intro: 'Ми зводимо анонімні публічні дані в суспільних інтересах: безпека креаторів, недобросовісні практики та реальна економіка індустрії. Усі датасети доступні за ліцензією',
    licenseLabel: 'CC BY 4.0',
    reportBadge: 'Огляд',
    pressHeading: 'Для преси та дослідників',
    pressBody: 'Можна вільно цитувати наші дані з посиланням. Запити та коментарі — через',
    contactLabel: 'форму зв’язку',
  },
};

export function getResearchHubUi(locale?: string | Locale): ResearchHubUi {
  return HUB_UI[resolveLocale(locale)] ?? HUB_UI[routing.defaultLocale];
}
