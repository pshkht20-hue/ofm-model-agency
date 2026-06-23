/**
 * /research — curated, fully-sourced statistics roundups (linkable assets).
 * NOT original surveys: every figure traces to a public source in `sources`.
 * Prioritises peer-reviewed/institutional data; vendor figures are flagged.
 */

export type ChartDatum = { label: string; value: number };

export type ResearchChart = {
  id: string;
  /** Self-contained title that states the finding (survives a screenshot). */
  title: string;
  caption: string;
  /** Source attribution baked into the chart footer. */
  sourceNote: string;
  /** '%' scales bars to 100; 'count' scales to the chart's own max. */
  unit?: '%' | 'count';
  /** 'bars' = ranked bar chart; 'cards' = big-number stat cards (mixed units). */
  display?: 'bars' | 'cards';
  data: ChartDatum[];
};

export type SourcedFinding = { stat: string; text: string; source: string };

export type ResearchReport = {
  slug: string;
  /** Compelling H1 (full). */
  title: string;
  /** Concise <title> tag (~55 chars). */
  seoTitle: string;
  /** One-line meta/social hook. */
  dek: string;
  heroStat: { value: string; label: string; source: string };
  publishedAt: string;
  updatedAt: string;
  keywords: string[];
  keyFindings: SourcedFinding[];
  charts: ResearchChart[];
  /** The novel editorial angle (the "coverage gap"). */
  uniqueAngle: string;
  redFlags: string[];
  safetyChecklist: string[];
  /** "How we compiled this" — curation transparency (not a survey method). */
  curationNote: string;
  sources: { label: string; url: string }[];
  helpResources: { label: string; href: string }[];
  csv: string;
};

const creatorSafety2026: ResearchReport = {
  slug: 'onlyfans-creator-safety-2026',
  title:
    'Безопасность авторов 18+ в 2026: 22,6% взрослых пережили image-based abuse — а статистики именно по платным авторам нет ни у кого',
  seoTitle: 'Безопасность авторов OnlyFans 2026: статистика и данные',
  dek: 'Кураторская сводка проверенных институциональных данных о безопасности взрослых авторов контента: что измерено, что только у несовершеннолетних, и где зияет пробел «коммерческого контента».',
  heroStat: {
    value: '22,6%',
    label:
      'взрослых в 10 странах пережили хотя бы одну форму image-based sexual abuse (IBSA)',
    source: 'Umbach, Henry & Beard, CHI 2025, n=16 693',
  },
  publishedAt: '2026-06-23',
  updatedAt: '2026-06-23',
  keywords: [
    'onlyfans safety statistics',
    'creator safety statistics',
    'onlyfans creator statistics 2026',
    'image based sexual abuse statistics',
    'deepfake porn statistics',
    'sextortion statistics 2026',
    'статистика безопасности авторов контента',
    'коммерческий контент NCII пробел',
  ],
  keyFindings: [
    {
      stat: '22,6%',
      text: 'Каждый пятый взрослый сталкивался с image-based sexual abuse: угрозы публикацией интимных изображений — 14,5%, съёмка без согласия — 14,2%, распространение без разрешения — 12,3%. Рецензируемое многонациональное исследование 16 693 взрослых в 10 странах — самый чистый первичный замер по взрослым.',
      source: 'Umbach et al., CHI 2025 (arXiv 2503.04988)',
    },
    {
      stat: '8,0%',
      text: 'Ровно 8,0% взрослых сообщили, что о них создали дипфейк или цифрово изменённое сексуальное изображение. Важно не путать с «1,2%» — это из другого исследования (CHI 2024); у этой работы дипфейк-показатель именно 8,0%.',
      source: 'Umbach et al., CHI 2025',
    },
    {
      stat: '99%',
      text: 'Из дипфейк-видео в сети 98% — порнографические, и 99% жертв в дипфейк-порно — женщины. Цифры вендорские (Home Security Heroes), широко цитируются, но не рецензированы — даём с пометкой. Есть честное напряжение: агрегат IBSA у Umbach близок к гендерному паритету (22,7% мужчин против 22,3% женщин).',
      source: 'Security Hero, 2023 State of Deepfakes (вендор)',
    },
    {
      stat: '50–70%',
      text: 'По оценке техдиректора Ceartas DMCA, «от 50 до 70% платного OnlyFans-контента крадут». Это экспертная оценка вендора через журналистику, не измеренная распространённость — репрезентативного исследования кражи платного контента не существует. В академической выборке (USENIX 2024, n=43) утечки были 2-й по частоте угрозой.',
      source: 'Foreign Policy 2025; Soneji et al., USENIX Security 2024',
    },
    {
      stat: '54%',
      text: 'У авторов контента самая частая атака — выдача себя за них: 54%; угон аккаунта — 32%; сталкинг/слежка — 31%; ложные жалобы — 31%; доксинг — 26%. 95% вспомнили хотя бы один эпизод hate & harassment. Выборка общая (N=135 авторов США), не только 18+.',
      source: 'Thomas et al. (Google), CHI 2022, N=135',
    },
    {
      stat: '65,2%',
      text: 'Среди коммерческих авторов контента 65,2% сообщили о преступлениях со стороны незнакомцев, и лишь 40,7% могли пожаловаться платформам. Ключевой вывод: как только контент продан/опубликован, он выпадает из защиты NCII — это и есть пробел коммерческого контента.',
      source: 'Sanders et al., New Media & Society 2025',
    },
    {
      stat: '40 143',
      text: 'В возрастной разбивке FBI IC3 за 2024 год по extortion/sextortion взрослые (20+) — большинство заявителей (~40 143) против 3 806 в категории до 20 лет. Институциональные данные показывают: жертвы вымогательства преимущественно взрослые, но почти все профильные исследования (NCMEC, Thorn) посвящены несовершеннолетним.',
      source: 'FBI IC3, 2024 Internet Crime Report, p. 36',
    },
  ],
  charts: [
    {
      id: 'ibsa_by_type',
      title: 'IBSA среди взрослых по типам (10 стран, n=16 693)',
      caption:
        'Доля взрослых, переживших каждую форму image-based sexual abuse хотя бы раз. Дипфейк-изображения — 8,0%.',
      sourceNote: 'Источник: Umbach, Henry & Beard, CHI 2025, n=16 693, 10 стран · ofmmodels.com/research',
      unit: '%',
      display: 'bars',
      data: [
        { label: 'Угроза публикацией интимных фото', value: 14.5 },
        { label: 'Съёмка/запись без согласия', value: 14.2 },
        { label: 'Показ/распространение без разрешения', value: 12.3 },
        { label: 'Кража контента', value: 9.7 },
        { label: 'Создан дипфейк/изменённое фото', value: 8 },
      ],
    },
    {
      id: 'creator_hate_harassment',
      title: 'Атаки на авторов контента (доля переживших, %)',
      caption:
        'Импersonation — самая частая атака; дипфейки/манипулированный контент — 24%. Выборка общая (N=135 авторов США), не только взрослый контент.',
      sourceNote: 'Источник: Thomas et al. (Google), CHI 2022, N=135 · ofmmodels.com/research',
      unit: '%',
      display: 'bars',
      data: [
        { label: 'Выдача себя за автора', value: 54 },
        { label: 'Угон аккаунта', value: 32 },
        { label: 'Сталкинг/слежка', value: 31 },
        { label: 'Ложные жалобы', value: 31 },
        { label: 'Доксинг', value: 26 },
        { label: 'Дипфейки/манипуляция', value: 24 },
      ],
    },
    {
      id: 'ic3_age_sextortion',
      title: 'Extortion/sextortion: число заявителей FBI IC3 по возрасту (2024)',
      caption:
        'Взрослые — большинство зарегистрированных жертв вымогательства, несмотря на то что профильные исследования сосредоточены на несовершеннолетних. Все возрасты, смешаны сексуальное и несексуальное вымогательство.',
      sourceNote: 'Источник: FBI IC3, 2024 Internet Crime Report, p. 36 · ofmmodels.com/research',
      unit: 'count',
      display: 'bars',
      data: [
        { label: 'До 20', value: 3806 },
        { label: '20–29', value: 13302 },
        { label: '30–39', value: 9204 },
        { label: '40–49', value: 6794 },
        { label: '50–59', value: 4940 },
        { label: '60+', value: 5903 },
      ],
    },
    {
      id: 'rph_2024',
      title: 'Revenge Porn Helpline (Великобритания), 2024',
      caption:
        'Рекордный год: 22 275 обращений (+20,9% год к году), доля удаления 90,9%. Институциональные данные NGO по взрослым.',
      sourceNote: 'Источник: SWGfL, Revenge Porn Helpline 2024 Annual Report · ofmmodels.com/research',
      display: 'cards',
      data: [
        { label: 'Обращений в 2024', value: 22275 },
        { label: 'Доля успешного удаления, %', value: 90.9 },
        { label: 'Доля случаев с секс-вымогательством, %', value: 22.7 },
        { label: 'Доля мужчин-нарушителей, %', value: 81 },
      ],
    },
  ],
  uniqueAngle:
    'Взрослые профессиональные авторы контента находятся в задокументированной «слепой зоне». Поисковая выдача расколота надвое: данные по несовершеннолетним (NCMEC, Thorn, Europol) и корпоративные fraud-данные вендоров кибербезопасности. Середина — взрослые авторы — пуста: никто не сводит институциональные и рецензируемые данные именно по ним. Главный нерв сводки — «пробел коммерческого контента», подтверждённый дословно: служба Revenge Porn Helpline (SWGfL) на странице для секс-работников прямо называет AdultWork и OnlyFans и заявляет, что изображения, загруженные на публичный форум, «не подпадают под действующий закон о раскрытии интимных изображений без согласия, поскольку считаются коммерчески созданными», и «мы не можем сообщать о коммерчески созданных изображениях от вашего имени». Та же логика — в США: федеральный TAKE IT DOWN Act (вступил в силу 19 мая 2025, правоприменение FTC с 19 мая 2026) прямо исключает «коммерческий порнографический контент», кроме случаев принуждения/обмана. Итог: профильный механизм удаления NCII не может действовать от имени платных авторов, а закон США их выводит за скобки — консолидированного ресурса данных по их безопасности не существует. Именно его закрывает эта сводка. Региональный слой: ~350 украинских OnlyFans-моделей задекларировали UAH 305,4 млн (~$7,3 млн), при этом за 3 года в Украине вынесено лишь 6 приговоров за работу на OnlyFans — правовая шаткость на фоне того, что ~76% беженцев — женщины и дети в группе риска эксплуатации.',
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
  curationNote:
    'Это кураторская сводка, а не собственный опрос: OFM Model Agency не собирала эти цифры, а отобрала и свела уже опубликованные данные из первичных и институциональных источников. Каждая цифра прослеживается до источника в списке ниже. Приоритет — рецензируемые и институциональные данные (CHI 2025, USENIX 2024, FBI IC3, FTC, Eurostat, SWGfL, SAGE/Oxford); вендорские цифры (Home Security Heroes, Deeptrace/Sensity) приведены с явной пометкой «вендор» и не используются как доказательство распространённости. Данные по взрослым и несовершеннолетним строго разделены: статистика NCMEC/Thorn относится к несовершеннолетним и не переносится на взрослых авторов. Признанные ограничения: репрезентативного исследования кражи платного контента не существует («50–70%» — экспертная оценка); IC3 не отделяет сексуальное вымогательство от общего; данные по харассменту авторов относятся к общим, а не только взрослым авторам. Даты: CHI 2025; FBI IC3 — 2024 (опубл. апрель 2025); SWGfL RPH — 2024; Eurostat — апрель 2026. OFM выступает только куратором; материал носит просветительский характер и не является юридической консультацией.',
  sources: [
    { label: 'Umbach, Henry & Beard — Prevalence and Impacts of Image-Based Sexual Abuse (CHI 2025)', url: 'https://arxiv.org/html/2503.04988v1' },
    { label: 'Umbach et al. — CHI 2025 (ACM Digital Library)', url: 'https://dl.acm.org/doi/full/10.1145/3706598.3713545' },
    { label: 'FBI IC3 — 2024 Internet Crime Report (PDF)', url: 'https://www.ic3.gov/AnnualReport/Reports/2024_IC3Report.pdf' },
    { label: 'FBI IC3 PSA (2023) — Manipulated Photos/Deepfakes & Sextortion', url: 'https://www.ic3.gov/PSA/2023/psa230605' },
    { label: 'Soneji et al. — OnlyFans Creators (USENIX Security 2024)', url: 'https://www.usenix.org/conference/usenixsecurity24/presentation/soneji' },
    { label: 'Thomas et al. (Google) — Hate and Harassment of Content Creators (CHI 2022)', url: 'https://research.google/pubs/its-common-and-a-part-of-being-a-content-creator-understanding-how-creators-experience-and-cope-with-hate-and-harassment-online/' },
    { label: 'Sanders et al. — Commercial content creators and lack of NCII protection (New Media & Society, 2025)', url: 'https://journals.sagepub.com/doi/full/10.1177/14614448231172711' },
    { label: 'Revenge Porn Helpline (SWGfL) — Commercial content creators and sex workers', url: 'https://revengepornhelpline.org.uk/how-can-we-help/who-can-we-help/commercial-content-creators-and-sex-workers/' },
    { label: 'SWGfL — Revenge Porn Helpline 2024 Annual Report', url: 'https://swgfl.org.uk/research/revenge-porn-helpline-2024-annual-report/' },
    { label: 'FTC — Begins Enforcing TAKE IT DOWN Act (май 2026)', url: 'https://www.ftc.gov/news-events/news/press-releases/2026/05/ftc-begins-enforcing-take-it-down-act' },
    { label: 'Congress.gov CRS — TAKE IT DOWN Act (LSB11314)', url: 'https://www.congress.gov/crs-product/LSB11314' },
    { label: 'Eurostat — Recorded sexual violence offences 2014–2024 (апрель 2026)', url: 'https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20260429-2' },
    { label: 'Oxford Academic (Journal of Cybersecurity) — IBSA prevalence (n=6 109)', url: 'https://academic.oup.com/cybersecurity/article/11/1/tyaf033/8322282' },
    { label: 'Home Security Heroes — 2023 State of Deepfakes (вендор)', url: 'https://www.securityhero.io/state-of-deepfakes/' },
    { label: 'Cyber Civil Rights Initiative — research (NCII victim surveys)', url: 'https://cybercivilrights.org/research/' },
    { label: 'Foreign Policy — OnlyFans performers can’t get justice (оценка Ceartas 50–70%)', url: 'https://foreignpolicy.com/2025/05/14/onlyfans-performers-cant-get-justice/' },
    { label: 'Slate — The dark side of OnlyFans content theft', url: 'https://slate.com/technology/2024/11/onlyfans-content-stolen-privacy-security-internet-dark-side.html' },
    { label: 'Reuters Special Report — Sexual content on OnlyFans without consent', url: 'https://www.reuters.com/investigates/special-report/onlyfans-nonconsensual/' },
    { label: 'Eric Goldman — N.Z. v. Fenix (chatter-scam иск отклонён, дек. 2025)', url: 'https://blog.ericgoldman.org/archives/2025/12/onlyfans-defeats-chatter-scam-claim-n-z-v-fenix.htm' },
    { label: 'ABA Journal — Firm fined for hallucinated citations in OnlyFans case', url: 'https://www.abajournal.com/news/article/plaintiffs-firm-fined-for-filing-hallucinated-material-in-onlyfans-case' },
    { label: 'NV.ua — Ukraine’s OnlyFans declare $7.3M income', url: 'https://english.nv.ua/business/sex-sells-ukraine-s-onlyfans-declare-7-3m-pushing-for-legal-porn-50475160.html' },
    { label: 'UNN — Six sentences in 3 years for OnlyFans work in Ukraine', url: 'https://unn.ua/en/news/in-ukraine-six-sentences-have-been-handed-down-for-working-on-onlyfans-in-3-years' },
    { label: 'Euronews — Czech police charge four in OnlyFans human-trafficking case (2026)', url: 'https://www.euronews.com/next/2026/06/02/czech-police-charge-four-in-onlyfans-human-trafficking-case' },
  ],
  helpResources: [
    { label: 'FTC TakeItDown — подача жалоб на NCII (США, удаление за 48 часов)', href: 'https://takeitdown.ftc.gov/' },
    { label: 'Revenge Porn Helpline (Великобритания, SWGfL)', href: 'https://revengepornhelpline.org.uk/' },
    { label: 'StopNCII.org — хеш-блокировка интимных изображений', href: 'https://stopncii.org/' },
    { label: 'Cyber Civil Rights Initiative — горячая линия по NCII', href: 'https://cybercivilrights.org/ccri-crisis-helpline/' },
    { label: 'FBI IC3 — заявления о вымогательстве/секс-вымогательстве', href: 'https://www.ic3.gov/' },
  ],
  csv: '/data/onlyfans-creator-safety-2026.csv',
};

export const RESEARCH_REPORTS: ResearchReport[] = [creatorSafety2026];

export function getResearchReport(slug: string): ResearchReport | undefined {
  return RESEARCH_REPORTS.find((r) => r.slug === slug);
}

export function getResearchReportSlugs(): string[] {
  return RESEARCH_REPORTS.map((r) => r.slug);
}
