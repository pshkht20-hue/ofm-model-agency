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

const UI_EN: ResearchUi = {
  eyebrow: 'Curated data roundup · 2026',
  publishedLabel: 'Published',
  updatedLabel: 'Updated',
  licenseLabel: 'CC BY 4.0 license',
  sourceLabel: 'Source',
  uniqueHeading: 'Why no one else has this',
  keyFindingsHeading: 'Key findings',
  downloadCsv: 'Download the data (CSV)',
  redFlagsHeading: 'Red flags of an exploitative agency',
  checklistHeading: 'Creator safety checklist',
  ofmLine: 'These are the safety standards OFM Models holds itself to — the data points to them.',
  curationHeading: 'How we compiled this roundup',
  helpHeading: 'Where to get help',
  sourcesHeading: 'Sources',
  breadcrumbHome: 'Home',
  breadcrumbHub: 'Research',
  citeHeading: 'Cite this research',
  citeLicenseLine: 'The data is open under CC BY 4.0 — reuse with attribution and a link.',
  citeHtmlLabel: 'Link (HTML)',
  citeEmbedLabel: 'Embed',
  citeCopy: 'Copy',
  citeCopied: 'Copied',
  citeKind: '[Data report]',
};

const UI_ES: ResearchUi = {
  eyebrow: 'Recopilación de datos · 2026',
  publishedLabel: 'Publicado',
  updatedLabel: 'Actualizado',
  licenseLabel: 'Licencia CC BY 4.0',
  sourceLabel: 'Fuente',
  uniqueHeading: 'Por qué nadie más tiene esto',
  keyFindingsHeading: 'Hallazgos clave',
  downloadCsv: 'Descargar los datos (CSV)',
  redFlagsHeading: 'Señales de alerta de una agencia abusiva',
  checklistHeading: 'Checklist de seguridad para creadoras',
  ofmLine: 'OFM Models se rige por estos estándares de seguridad — los datos los respaldan.',
  curationHeading: 'Cómo elaboramos esta recopilación',
  helpHeading: 'Dónde pedir ayuda',
  sourcesHeading: 'Fuentes',
  breadcrumbHome: 'Inicio',
  breadcrumbHub: 'Investigación',
  citeHeading: 'Cómo citar esta investigación',
  citeLicenseLine: 'Los datos son abiertos bajo CC BY 4.0 — reutilízalos con atribución y enlace.',
  citeHtmlLabel: 'Enlace (HTML)',
  citeEmbedLabel: 'Insertar (embed)',
  citeCopy: 'Copiar',
  citeCopied: 'Copiado',
  citeKind: '[Informe de datos]',
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
    'Агентство просит деньги с модели — «за вступление», обучение или «продвижение», — обещает фиксированные суммы «уже в первый месяц» или не может показать ни одного проверяемого кейса с выплатами: легитимная команда зарабатывает процент с роста страницы, а не с входа.',
    'Платформа или «партнёр» не может назвать институциональный источник своих цифр («дипфейк-атаки +1300%», «$2,1 млрд потерь») — это вендорский маркетинг, а не исследование.',
    'Команда обещает «защиту от утечек 100%» — репрезентативного измерения кражи платного контента не существует, гарантировать невозможно; реальная практика — DMCA-удаление по факту.',
    'Вам говорят, что слитый платный контент «защищён законом о revenge porn» — в Великобритании и США коммерческий контент прямо исключён из NCII-защиты.',
    '«Чаттеры» отвечают подписчикам от вашего имени без вашего ведома и согласия — предмет судебных исков; прозрачность обязательна.',
    'Запрос интимного контента «для верификации» от незнакомца или новый контакт, быстро переходящий к шантажу — классическая схема секс-вымогательства.',
    'Юрист/фирма ссылается на «прецеденты», которые нельзя проверить — в этой сфере уже была санкция за вымышленные ИИ-цитаты (ABA Journal, 2025).',
  ],
  safetyChecklist: [
    'Используйте отдельные e-mail и телефон только для рабочих аккаунтов — личный номер не должен появляться в публичных профилях и переписке с незнакомцами.',
    'Включите двухфакторную аутентификацию и уникальный пароль на каждой платформе; импersonation (54%) и угон (32%) — самые частые атаки.',
    'Сохраняйте доказательства владения контентом (исходники, метаданные, даты) — это основа DMCA-удаления и заявлений.',
    'Знайте свой механизм удаления: в США — TakeItDown.ftc.gov и обязанность платформы удалить за 48 часов; в Великобритании — Revenge Porn Helpline (но не для коммерческого контента — уточняйте статус заранее).',
    'Отслеживайте утечки: ставьте поисковые оповещения по имени/нику и проверяйте агрегаторы краденого контента; реагируйте быстро.',
    'Минимизируйте доксинг: уберите геометки, адреса на фоне, повторно используемые юзернеймы и фото из публичных профилей — для дипфейков берут фото из соцсетей.',
    'Проверяйте агентства: прозрачные условия по чаттерам, проверяемые кейсы и подтверждённые выплаты, реальный кастинг с менеджером — и никаких платежей с модели.',
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
    'Агентство просить гроші з моделі — «за вступ», навчання чи «просування», — обіцяє фіксовані суми «вже в перший місяць» або не може показати жодного перевірюваного кейсу з виплатами: легітимна команда заробляє відсоток зі зростання сторінки, а не з входу.',
    'Платформа чи «партнер» не може назвати інституційне джерело своїх цифр («дипфейк-атаки +1300%», «$2,1 млрд втрат») — це вендорський маркетинг, а не дослідження.',
    'Команда обіцяє «захист від витоків 100%» — репрезентативного виміру крадіжки платного контенту не існує, гарантувати неможливо; реальна практика — DMCA-видалення за фактом.',
    'Вам кажуть, що злитий платний контент «захищений законом про revenge porn» — у Великій Британії та США комерційний контент прямо виключено із NCII-захисту.',
    '«Чаттери» відповідають підписникам від вашого імені без вашого відома та згоди — предмет судових позовів; прозорість обов’язкова.',
    'Запит інтимного контенту «для верифікації» від незнайомця або новий контакт, що швидко переходить до шантажу — класична схема секс-вимагання.',
    'Юрист/фірма посилається на «прецеденти», які не можна перевірити — у цій сфері вже була санкція за вигадані ШІ-цитати (ABA Journal, 2025).',
  ],
  safetyChecklist: [
    'Використовуйте окремі e-mail і телефон лише для робочих акаунтів — особистий номер не має зʼявлятися в публічних профілях і листуванні з незнайомцями.',
    'Увімкніть двофакторну автентифікацію та унікальний пароль на кожній платформі; імперсонація (54%) і викрадення (32%) — найчастіші атаки.',
    'Зберігайте докази володіння контентом (вихідники, метадані, дати) — це основа DMCA-видалення та заяв.',
    'Знайте свій механізм видалення: у США — TakeItDown.ftc.gov і обов’язок платформи видалити за 48 годин; у Великій Британії — Revenge Porn Helpline (але не для комерційного контенту — уточнюйте статус заздалегідь).',
    'Відстежуйте витоки: ставте пошукові сповіщення за іменем/ніком і перевіряйте агрегатори краденого контенту; реагуйте швидко.',
    'Мінімізуйте доксинг: приберіть геомітки, адреси на фоні, повторно використовувані юзернейми та фото з публічних профілів — для дипфейків беруть фото із соцмереж.',
    'Перевіряйте агентства: прозорі умови щодо чаттерів, перевірювані кейси й підтверджені виплати, реальний кастинг з менеджером — і жодних платежів з моделі.',
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

const safetyEn: ResearchReport = {
  slug: 'onlyfans-creator-safety-2026',
  title:
    'Adult creator safety in 2026: 22.6% of adults have faced image-based abuse — yet no one has the data on paid creators',
  seoTitle: 'OnlyFans creator safety 2026: statistics & data',
  dek: 'A curated roundup of verified institutional data on the safety of adult content creators: what is measured, what concerns only minors, and where the “commercial content” gap lies.',
  heroStat: {
    value: '22.6%',
    label: 'of adults across 10 countries have experienced at least one form of image-based sexual abuse (IBSA)',
    source: 'Umbach, Henry & Beard, CHI 2025, n=16,693',
  },
  publishedAt: '2026-06-23',
  updatedAt: '2026-06-23',
  keywords: ['onlyfans safety statistics', 'creator safety statistics', 'image based sexual abuse statistics', 'deepfake porn statistics', 'sextortion statistics 2026', 'NCII commercial content gap'],
  keyFindings: [
    { stat: '22.6%', text: 'One in five adults has encountered image-based sexual abuse: threatened with the release of intimate images — 14.5%, filmed without consent — 14.2%, shared without permission — 12.3%. This peer-reviewed multinational study of 16,693 adults across 10 countries is the cleanest primary measure for adults.', source: 'Umbach et al., CHI 2025 (arXiv 2503.04988)' },
    { stat: '8.0%', text: 'Exactly 8.0% of adults reported that a deepfake or digitally altered sexual image was made of them. Don’t confuse this with “1.2%” — that comes from a different study (CHI 2024); this paper’s deepfake figure is 8.0%.', source: 'Umbach et al., CHI 2025' },
    { stat: '99%', text: 'Of deepfake videos online, 98% are pornographic, and 99% of victims in deepfake porn are women. These figures are vendor-sourced (Home Security Heroes), widely cited but not peer-reviewed — flagged accordingly. An honest tension: Umbach’s aggregate IBSA is near gender parity (22.7% men vs 22.3% women).', source: 'Security Hero, 2023 State of Deepfakes (vendor)' },
    { stat: '50–70%', text: 'Ceartas DMCA’s CTO estimates “50 to 70% of paid OnlyFans content is stolen.” This is a vendor expert estimate via journalism, not measured prevalence — no representative study of paid-content theft exists. In an academic sample (USENIX 2024, n=43), leaks were the 2nd most common threat.', source: 'Foreign Policy 2025; Soneji et al., USENIX Security 2024' },
    { stat: '54%', text: 'For content creators, the most common attack is impersonation: 54%; account hijacking — 32%; stalking/surveillance — 31%; false reporting — 31%; doxxing — 26%. 95% recalled at least one hate & harassment incident. General sample (N=135 US creators), not only 18+.', source: 'Thomas et al. (Google), CHI 2022, N=135' },
    { stat: '65.2%', text: 'Among commercial content creators, 65.2% reported crimes by strangers, and only 40.7% could report to platforms. Key takeaway: once content is sold or published, it falls outside NCII protection — that is the commercial-content gap.', source: 'Sanders et al., New Media & Society 2025' },
    { stat: '40,143', text: 'In FBI IC3’s 2024 age breakdown for extortion/sextortion, adults (20+) are the majority of complainants (~40,143) vs 3,806 under 20. Institutional data shows extortion victims are mostly adults, yet nearly all dedicated research (NCMEC, Thorn) is about minors.', source: 'FBI IC3, 2024 Internet Crime Report, p. 36' },
  ],
  charts: [
    { id: 'ibsa_by_type', title: 'IBSA among adults by type (10 countries, n=16,693)', caption: 'Share of adults who experienced each form of image-based sexual abuse at least once. Deepfake images — 8.0%.', sourceNote: 'Source: Umbach, Henry & Beard, CHI 2025, n=16,693 · ofmmodels.com/research', unit: '%', display: 'bars', data: [{ label: 'Threatened with sharing intimate photos', value: 14.5 }, { label: 'Filmed/recorded without consent', value: 14.2 }, { label: 'Shown/shared without permission', value: 12.3 }, { label: 'Content stolen', value: 9.7 }, { label: 'Deepfake/altered image created', value: 8 }] },
    { id: 'creator_hate_harassment', title: 'Attacks on content creators (share affected, %)', caption: 'Impersonation is the most common attack; deepfakes/manipulated content — 24%. General sample (N=135 US creators), not only adult content.', sourceNote: 'Source: Thomas et al. (Google), CHI 2022, N=135 · ofmmodels.com/research', unit: '%', display: 'bars', data: [{ label: 'Impersonation', value: 54 }, { label: 'Account hijacking', value: 32 }, { label: 'Stalking/surveillance', value: 31 }, { label: 'False reporting', value: 31 }, { label: 'Doxxing', value: 26 }, { label: 'Deepfakes/manipulation', value: 24 }] },
    { id: 'ic3_age_sextortion', title: 'Extortion/sextortion: FBI IC3 complainants by age (2024)', caption: 'Adults are the majority of registered extortion victims, despite dedicated research focusing on minors. All ages, sexual and non-sexual extortion combined.', sourceNote: 'Source: FBI IC3, 2024 Internet Crime Report, p. 36 · ofmmodels.com/research', unit: 'count', display: 'bars', data: [{ label: 'Under 20', value: 3806 }, { label: '20–29', value: 13302 }, { label: '30–39', value: 9204 }, { label: '40–49', value: 6794 }, { label: '50–59', value: 4940 }, { label: '60+', value: 5903 }] },
    { id: 'rph_2024', title: 'Revenge Porn Helpline (UK), 2024', caption: 'A record year: 22,275 reports (+20.9% YoY), 90.9% removal rate. Institutional NGO data on adults.', sourceNote: 'Source: SWGfL, Revenge Porn Helpline 2024 Annual Report · ofmmodels.com/research', display: 'cards', data: [{ label: 'Reports in 2024', value: 22275 }, { label: 'Removal rate, %', value: 90.9 }, { label: 'Cases involving sextortion, %', value: 22.7 }, { label: 'Male perpetrators, %', value: 81 }] },
  ],
  uniqueAngle: 'Adult professional content creators sit in a documented “blind spot.” Search results split in two: data on minors (NCMEC, Thorn, Europol) and corporate fraud figures from cybersecurity vendors. The middle — adult creators — is empty: no one aggregates the institutional and peer-reviewed data specifically about them. The core of this roundup is the “commercial-content gap,” confirmed verbatim: the UK Revenge Porn Helpline (SWGfL), on its page for sex workers, explicitly names AdultWork and OnlyFans and states that images uploaded to a public forum “are not covered by the current intimate-image-abuse law as they are considered commercially created,” and that “we are unable to report commercially created images on your behalf.” The same logic in the US: the federal TAKE IT DOWN Act (in force since 19 May 2025, FTC enforcement from 19 May 2026) explicitly excludes “commercial pornographic content,” except in cases of coercion or deception. The result: the dedicated NCII removal mechanism cannot act on behalf of paid creators — and no consolidated data resource on their safety exists. This roundup is that resource. Regional layer: ~350 Ukrainian OnlyFans creators declared UAH 305.4M (~$7.3M), while in three years Ukraine has handed down only 6 sentences for OnlyFans work.',
  redFlags: [
    'The agency asks the model for money — for “onboarding”, training or “promotion” — promises fixed sums “in your first month”, or cannot show a single verifiable payout case: a legitimate team earns a percentage of your growth, not an entry fee.',
    'A platform or “partner” cannot name an institutional source for its figures (“deepfake attacks +1300%”, “$2.1B in losses”) — that is vendor marketing, not research.',
    'A team promises “100% leak protection” — no representative measure of paid-content theft exists; it cannot be guaranteed. The real practice is DMCA takedowns after the fact.',
    'You are told your leaked paid content is “protected by revenge-porn law” — in the UK and US, commercial content is explicitly excluded from NCII protection.',
    '“Chatters” reply to subscribers in your name without your knowledge or consent — the subject of lawsuits; transparency is mandatory.',
    'A request for intimate content “to verify you” from a stranger, or a new contact that quickly turns to blackmail — the classic sextortion playbook.',
    'A lawyer/firm cites “precedents” you cannot verify — this field has already seen a sanction for fabricated AI citations (ABA Journal, 2025).',
  ],
  safetyChecklist: [
    'Use a separate email and phone for work accounts only — your personal number should not appear in public profiles or in conversations with strangers.',
    'Enable two-factor authentication and a unique password on every platform; impersonation (54%) and hijacking (32%) are the most common attacks.',
    'Keep proof of content ownership (originals, metadata, dates) — the basis for DMCA takedowns and reports.',
    'Know your removal mechanism: in the US, TakeItDown.ftc.gov and the platform’s 48-hour removal duty; in the UK, the Revenge Porn Helpline (but not for commercial content — check your status in advance).',
    'Track leaks: set search alerts for your name/handle and check stolen-content aggregators; respond quickly.',
    'Minimise doxxing: remove geotags, addresses in the background, reused usernames and photos from public profiles — deepfakes are built from social-media images.',
    'Vet agencies: transparent chatter terms, verifiable cases and confirmed payouts, a real casting call with a manager — and no payments taken from the model.',
    'In a sextortion attempt, do not pay and do not delete the conversation — preserve evidence and contact law enforcement and helplines.',
    'Separate verifiable institutional data from vendor marketing when assessing any “safety guarantee.”',
  ],
  curationNote: 'This is a curated roundup, not an original survey: OFM Model Agency did not collect these figures but selected and aggregated already-published data from primary and institutional sources. Every figure traces to a source in the list below. Priority is given to peer-reviewed and institutional data (CHI 2025, USENIX 2024, FBI IC3, FTC, Eurostat, SWGfL); vendor figures (Home Security Heroes) are shown with an explicit “vendor” flag and are not used as evidence of prevalence. Adult and minor data are kept strictly separate: NCMEC/Thorn statistics concern minors and are not transferred to adult creators. Acknowledged limitations: no representative study of paid-content theft exists (“50–70%” is an expert estimate); IC3 does not separate sexual from general extortion. OFM acts only as curator; this material is educational and not legal advice.',
  sources: SOURCES,
  helpResources: [
    { label: 'FTC TakeItDown — file NCII reports (US, 48-hour removal)', href: 'https://takeitdown.ftc.gov/' },
    { label: 'Revenge Porn Helpline (UK, SWGfL)', href: 'https://revengepornhelpline.org.uk/' },
    { label: 'StopNCII.org — hash-blocking of intimate images', href: 'https://stopncii.org/' },
    { label: 'Cyber Civil Rights Initiative — NCII helpline', href: 'https://cybercivilrights.org/ccri-crisis-helpline/' },
    { label: 'FBI IC3 — report extortion/sextortion', href: 'https://www.ic3.gov/' },
  ],
  csv: '/data/onlyfans-creator-safety-2026.csv',
  ui: UI_EN,
};

const safetyEs: ResearchReport = {
  slug: 'onlyfans-creator-safety-2026',
  title:
    'Seguridad de creadoras adultas en 2026: el 22,6% de los adultos sufrió abuso basado en imágenes, pero nadie tiene datos sobre las creadoras de pago',
  seoTitle: 'Seguridad de creadoras OnlyFans 2026: estadísticas y datos',
  dek: 'Una recopilación curada de datos institucionales verificados sobre la seguridad de las creadoras de contenido adulto: qué se mide, qué solo trata sobre menores y dónde se abre la brecha del “contenido comercial”.',
  heroStat: {
    value: '22,6%',
    label: 'de los adultos en 10 países sufrió al menos una forma de abuso sexual basado en imágenes (IBSA)',
    source: 'Umbach, Henry & Beard, CHI 2025, n=16 693',
  },
  publishedAt: '2026-06-23',
  updatedAt: '2026-06-23',
  keywords: ['onlyfans estadísticas seguridad', 'estadísticas abuso basado en imágenes', 'estadísticas deepfake porno', 'sextorsión estadísticas 2026', 'agencia onlyfans seguridad', 'creator safety statistics'],
  keyFindings: [
    { stat: '22,6%', text: 'Uno de cada cinco adultos ha sufrido abuso sexual basado en imágenes: amenazas de publicar imágenes íntimas — 14,5%, grabación sin consentimiento — 14,2%, difusión sin permiso — 12,3%. Este estudio multinacional revisado por pares de 16 693 adultos en 10 países es la medida primaria más limpia para adultos.', source: 'Umbach et al., CHI 2025 (arXiv 2503.04988)' },
    { stat: '8,0%', text: 'Exactamente el 8,0% de los adultos declaró que se creó un deepfake o una imagen sexual alterada digitalmente de ellos. No confundir con el “1,2%” — proviene de otro estudio (CHI 2024); en este trabajo la cifra de deepfake es 8,0%.', source: 'Umbach et al., CHI 2025' },
    { stat: '99%', text: 'De los vídeos deepfake en la red, el 98% son pornográficos y el 99% de las víctimas en deepfake porno son mujeres. Cifras de proveedor (Home Security Heroes), muy citadas pero no revisadas por pares — señaladas como tales. Una tensión honesta: el agregado de IBSA de Umbach está cerca de la paridad de género (22,7% hombres frente a 22,3% mujeres).', source: 'Security Hero, 2023 State of Deepfakes (proveedor)' },
    { stat: '50–70%', text: 'El director técnico de Ceartas DMCA estima que “entre el 50 y el 70% del contenido de pago de OnlyFans se roba”. Es una estimación experta de proveedor vía periodismo, no una prevalencia medida — no existe un estudio representativo del robo de contenido de pago. En una muestra académica (USENIX 2024, n=43) las filtraciones fueron la 2.ª amenaza más frecuente.', source: 'Foreign Policy 2025; Soneji et al., USENIX Security 2024' },
    { stat: '54%', text: 'Para las creadoras de contenido, el ataque más común es la suplantación: 54%; secuestro de cuenta — 32%; acoso/vigilancia — 31%; denuncias falsas — 31%; doxxing — 26%. El 95% recordó al menos un episodio de hate & harassment. Muestra general (N=135 creadores de EE. UU.), no solo +18.', source: 'Thomas et al. (Google), CHI 2022, N=135' },
    { stat: '65,2%', text: 'Entre las creadoras de contenido comercial, el 65,2% reportó delitos por parte de extraños, y solo el 40,7% pudo denunciar a las plataformas. Conclusión clave: una vez que el contenido se vende o se publica, queda fuera de la protección NCII — esa es la brecha del contenido comercial.', source: 'Sanders et al., New Media & Society 2025' },
    { stat: '40 143', text: 'En el desglose por edad de FBI IC3 de 2024 para extorsión/sextorsión, los adultos (20+) son la mayoría de los denunciantes (~40 143) frente a 3 806 menores de 20. Los datos institucionales muestran que las víctimas de extorsión son mayoritariamente adultas, pero casi toda la investigación específica (NCMEC, Thorn) trata sobre menores.', source: 'FBI IC3, 2024 Internet Crime Report, p. 36' },
  ],
  charts: [
    { id: 'ibsa_by_type', title: 'IBSA entre adultos por tipo (10 países, n=16 693)', caption: 'Proporción de adultos que sufrió cada forma de abuso sexual basado en imágenes al menos una vez. Imágenes deepfake — 8,0%.', sourceNote: 'Fuente: Umbach, Henry & Beard, CHI 2025, n=16 693 · ofmmodels.com/research', unit: '%', display: 'bars', data: [{ label: 'Amenaza de publicar fotos íntimas', value: 14.5 }, { label: 'Grabación/registro sin consentimiento', value: 14.2 }, { label: 'Mostrar/difundir sin permiso', value: 12.3 }, { label: 'Robo de contenido', value: 9.7 }, { label: 'Deepfake/imagen alterada creada', value: 8 }] },
    { id: 'creator_hate_harassment', title: 'Ataques a creadoras de contenido (proporción afectada, %)', caption: 'La suplantación es el ataque más común; deepfakes/contenido manipulado — 24%. Muestra general (N=135 creadores de EE. UU.), no solo contenido adulto.', sourceNote: 'Fuente: Thomas et al. (Google), CHI 2022, N=135 · ofmmodels.com/research', unit: '%', display: 'bars', data: [{ label: 'Suplantación', value: 54 }, { label: 'Secuestro de cuenta', value: 32 }, { label: 'Acoso/vigilancia', value: 31 }, { label: 'Denuncias falsas', value: 31 }, { label: 'Doxxing', value: 26 }, { label: 'Deepfakes/manipulación', value: 24 }] },
    { id: 'ic3_age_sextortion', title: 'Extorsión/sextorsión: denunciantes de FBI IC3 por edad (2024)', caption: 'Los adultos son la mayoría de las víctimas registradas de extorsión, pese a que la investigación específica se centra en menores. Todas las edades, extorsión sexual y no sexual combinadas.', sourceNote: 'Fuente: FBI IC3, 2024 Internet Crime Report, p. 36 · ofmmodels.com/research', unit: 'count', display: 'bars', data: [{ label: 'Menos de 20', value: 3806 }, { label: '20–29', value: 13302 }, { label: '30–39', value: 9204 }, { label: '40–49', value: 6794 }, { label: '50–59', value: 4940 }, { label: '60+', value: 5903 }] },
    { id: 'rph_2024', title: 'Revenge Porn Helpline (Reino Unido), 2024', caption: 'Un año récord: 22 275 solicitudes (+20,9% interanual), tasa de eliminación del 90,9%. Datos institucionales de ONG sobre adultos.', sourceNote: 'Fuente: SWGfL, Revenge Porn Helpline 2024 Annual Report · ofmmodels.com/research', display: 'cards', data: [{ label: 'Solicitudes en 2024', value: 22275 }, { label: 'Tasa de eliminación, %', value: 90.9 }, { label: 'Casos con sextorsión, %', value: 22.7 }, { label: 'Agresores hombres, %', value: 81 }] },
  ],
  uniqueAngle: 'Las creadoras adultas profesionales están en un “punto ciego” documentado. Los resultados de búsqueda se dividen en dos: datos sobre menores (NCMEC, Thorn, Europol) y cifras corporativas de fraude de proveedores de ciberseguridad. El medio — las creadoras adultas — está vacío: nadie agrega los datos institucionales y revisados por pares específicamente sobre ellas. El núcleo de esta recopilación es la “brecha del contenido comercial”, confirmada literalmente: la Revenge Porn Helpline del Reino Unido (SWGfL), en su página para trabajadoras sexuales, nombra explícitamente AdultWork y OnlyFans y afirma que las imágenes subidas a un foro público “no están cubiertas por la ley actual de abuso de imágenes íntimas porque se consideran creadas comercialmente”, y que “no podemos denunciar imágenes creadas comercialmente en su nombre”. La misma lógica en EE. UU.: la federal TAKE IT DOWN Act (en vigor desde el 19 de mayo de 2025, aplicación de la FTC desde el 19 de mayo de 2026) excluye explícitamente el “contenido pornográfico comercial”, salvo casos de coacción o engaño. Resultado: el mecanismo específico de eliminación de NCII no puede actuar en nombre de las creadoras de pago — y no existe un recurso de datos consolidado sobre su seguridad. Esta recopilación es ese recurso. Capa regional: ~350 modelos ucranianas de OnlyFans declararon UAH 305,4 millones (~$7,3 millones), mientras que en tres años Ucrania solo ha dictado 6 condenas por trabajar en OnlyFans.',
  redFlags: [
    'La agencia pide dinero a la modelo — por “ingreso”, formación o “promoción” —, promete sumas fijas “ya en el primer mes” o no puede mostrar ni un caso verificable con pagos: un equipo legítimo gana un porcentaje del crecimiento, no una cuota de entrada.',
    'Una plataforma o “socio” no puede nombrar una fuente institucional de sus cifras (“ataques deepfake +1300%”, “$2,1 mil millones en pérdidas”) — eso es marketing de proveedor, no investigación.',
    'Un equipo promete “protección antifiltraciones 100%” — no existe una medida representativa del robo de contenido de pago; no se puede garantizar. La práctica real es la retirada DMCA a posteriori.',
    'Te dicen que tu contenido de pago filtrado está “protegido por la ley de revenge porn” — en el Reino Unido y EE. UU., el contenido comercial está explícitamente excluido de la protección NCII.',
    'Los “chatters” responden a los suscriptores en tu nombre sin tu conocimiento ni consentimiento — objeto de demandas; la transparencia es obligatoria.',
    'Una solicitud de contenido íntimo “para verificarte” de un desconocido, o un contacto nuevo que pasa rápido al chantaje — el guion clásico de la sextorsión.',
    'Un abogado/bufete cita “precedentes” que no puedes verificar — este campo ya vio una sanción por citas de IA inventadas (ABA Journal, 2025).',
  ],
  safetyChecklist: [
    'Usa un correo y un teléfono separados solo para las cuentas de trabajo — tu número personal no debe aparecer en perfiles públicos ni en conversaciones con desconocidos.',
    'Activa la autenticación de dos factores y una contraseña única en cada plataforma; la suplantación (54%) y el secuestro (32%) son los ataques más comunes.',
    'Conserva pruebas de propiedad del contenido (originales, metadatos, fechas) — la base para las retiradas DMCA y las denuncias.',
    'Conoce tu mecanismo de eliminación: en EE. UU., TakeItDown.ftc.gov y el deber de la plataforma de retirar en 48 horas; en el Reino Unido, la Revenge Porn Helpline (pero no para contenido comercial — verifica tu estado de antemano).',
    'Rastrea las filtraciones: configura alertas de búsqueda con tu nombre/usuario y revisa los agregadores de contenido robado; reacciona rápido.',
    'Minimiza el doxxing: elimina geoetiquetas, direcciones de fondo, nombres de usuario reutilizados y fotos de perfiles públicos — los deepfakes se construyen con imágenes de redes sociales.',
    'Evalúa a las agencias: condiciones transparentes sobre los chatters, casos verificables y pagos confirmados, un casting real con un manager — y ningún pago a cargo de la modelo.',
    'Ante un intento de sextorsión, no pagues ni borres la conversación — conserva las pruebas y contacta con las autoridades y las líneas de ayuda.',
    'Separa los datos institucionales verificables del marketing de proveedor al evaluar cualquier “garantía de seguridad”.',
  ],
  curationNote: 'Esta es una recopilación curada, no una encuesta propia: OFM Model Agency no recopiló estas cifras, sino que seleccionó y agregó datos ya publicados de fuentes primarias e institucionales. Cada cifra se remonta a una fuente de la lista de abajo. Se prioriza la información revisada por pares e institucional (CHI 2025, USENIX 2024, FBI IC3, FTC, Eurostat, SWGfL); las cifras de proveedor (Home Security Heroes) se muestran con una marca explícita de “proveedor” y no se usan como evidencia de prevalencia. Los datos de adultos y menores se mantienen estrictamente separados: las estadísticas de NCMEC/Thorn se refieren a menores y no se trasladan a las creadoras adultas. Limitaciones reconocidas: no existe un estudio representativo del robo de contenido de pago (“50–70%” es una estimación experta); IC3 no separa la extorsión sexual de la general. OFM actúa solo como curador; este material es educativo y no constituye asesoramiento legal.',
  sources: SOURCES,
  helpResources: [
    { label: 'FTC TakeItDown — denunciar NCII (EE. UU., eliminación en 48 horas)', href: 'https://takeitdown.ftc.gov/' },
    { label: 'Revenge Porn Helpline (Reino Unido, SWGfL)', href: 'https://revengepornhelpline.org.uk/' },
    { label: 'StopNCII.org — bloqueo por hash de imágenes íntimas', href: 'https://stopncii.org/' },
    { label: 'Cyber Civil Rights Initiative — línea de ayuda NCII', href: 'https://cybercivilrights.org/ccri-crisis-helpline/' },
    { label: 'FBI IC3 — denunciar extorsión/sextorsión', href: 'https://www.ic3.gov/' },
  ],
  csv: '/data/onlyfans-creator-safety-2026.csv',
  ui: UI_ES,
};

type LocaleReports = Partial<Record<Locale, ResearchReport>>;

const REPORTS: Record<string, LocaleReports> = {
  'onlyfans-creator-safety-2026': { ru: safetyRu, uk: safetyUk, en: safetyEn, es: safetyEs },
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
  en: {
    eyebrow: 'OFM Research',
    title: 'Data on the creator economy and safety',
    lead: 'Original data roundups from OFM Model Agency — open sources, transparent methodology and charts ready to cite.',
    intro: 'We aggregate public data in the public interest: creator safety, exploitative practices and the real economics of the industry. All datasets are available under the',
    licenseLabel: 'CC BY 4.0',
    reportBadge: 'Roundup',
    pressHeading: 'For press and researchers',
    pressBody: 'You are free to cite our data with a link. Requests and comments via the',
    contactLabel: 'contact form',
  },
  es: {
    eyebrow: 'OFM Research',
    title: 'Datos sobre la creator-economía y la seguridad',
    lead: 'Recopilaciones de datos originales de OFM Model Agency — fuentes abiertas, metodología transparente y gráficos listos para citar.',
    intro: 'Agregamos datos públicos en interés público: seguridad de las creadoras, prácticas abusivas y la economía real del sector. Todos los datasets están disponibles bajo la licencia',
    licenseLabel: 'CC BY 4.0',
    reportBadge: 'Recopilación',
    pressHeading: 'Para prensa e investigadores',
    pressBody: 'Puedes citar nuestros datos con un enlace. Consultas y comentarios a través del',
    contactLabel: 'formulario de contacto',
  },
};

export function getResearchHubUi(locale?: string | Locale): ResearchHubUi {
  return HUB_UI[resolveLocale(locale)] ?? HUB_UI[routing.defaultLocale];
}
