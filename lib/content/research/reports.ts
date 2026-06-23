/**
 * /research — original-data reports (linkable assets).
 *
 * ⚠️ DEMO DATA: every number marked in a report with `demo: true` is a PLACEHOLDER
 * for layout/structure review. Replace with real aggregated survey results before
 * promoting the report. Public third-party stats in `sources` are real + citable.
 */

export type ChartDatum = { label: string; value: number };

export type ResearchChart = {
  id: string;
  /** Self-contained title that states the finding (survives a screenshot). */
  title: string;
  caption: string;
  /** Sample-size note baked into the chart footer. */
  n: string;
  type?: 'bar';
  /** Percentage bars (0–100). */
  data: ChartDatum[];
};

export type KeyFinding = { stat: string; text: string };

export type ResearchReport = {
  slug: string;
  /** True while numbers are placeholders — surfaces a visible "sample data" notice. */
  demo: boolean;
  title: string;
  /** One-line hook (used as meta description + social). */
  dek: string;
  heroStat: { value: string; label: string };
  publishedAt: string;
  updatedAt: string;
  keywords: string[];
  keyFindings: KeyFinding[];
  charts: ResearchChart[];
  /** "Agency red flags" checklist (anchored #red-flags). */
  redFlags: string[];
  /** "What good looks like" standard the data points to (anchored #standards). */
  goodStandards: string[];
  methodology: string;
  helpResources: { label: string; href: string }[];
  /** Real, citable third-party sources for context framing. */
  sources: { label: string; href: string }[];
  survey: { questions: number; note: string };
  /** Public path to the downloadable dataset. */
  csv: string;
};

const creatorSafety2026: ResearchReport = {
  slug: 'onlyfans-creator-safety-2026',
  demo: true,
  title: 'Безопасность креаторов 2026: шантаж, дипфейки и агентства-мошенники',
  dek: 'Анонимный опрос взрослых креаторов о шантаже, утечках, дипфейках и недобросовестных агентствах — данных по этой группе почти нет, и мы заполняем пробел.',
  heroStat: {
    // DEMO — replace with the real survey figure
    value: '27%',
    label: 'креаторов сталкивались с агентством или «рекрутером», которого считают мошенническим или эксплуататорским',
  },
  publishedAt: '2026-06-23',
  updatedAt: '2026-06-23',
  keywords: [
    'безопасность onlyfans',
    'шантаж креаторов статистика',
    'дипфейки статистика',
    'агентства onlyfans мошенники',
    'creator safety statistics',
  ],
  keyFindings: [
    { stat: '27%', text: 'сталкивались с агентством или «рекрутером», которого сочли мошенническим или эксплуататорским (опрос Creator Safety 2026, n=[N]).' },
    { stat: '1 из 5', text: 'сообщили о попытке шантажа — угрозе раскрыть контент или личность, если не заплатить.' },
    { stat: '#1 red flag', text: 'самый частый сигнал недобросовестного агентства — «просили деньги вперёд», его отметили [X]%.' },
    { stat: '[Y]%', text: 'только столько респондентов сказали, что прошлое агентство оставляло им контроль над логинами и выплатами.' },
  ],
  charts: [
    {
      id: 'red-flags',
      title: 'Топ red flags недобросовестных агентств (по словам креаторов)',
      caption: 'Какие сигналы эксплуатации креаторы видели лично. Множественный выбор — сумма больше 100%.',
      n: 'Опрос Creator Safety 2026 · n=[N] · ofmmodels.com/research',
      data: [
        { label: 'Просили деньги/комиссию вперёд', value: 41 },
        { label: 'Требовали пароли / полный доступ к аккаунту', value: 38 },
        { label: 'Отказывались давать письменный договор', value: 33 },
        { label: 'Обещали «гарантированный» доход', value: 29 },
        { label: 'Хотели контроль над выплатами/счётом', value: 24 },
        { label: 'Не давали уйти / огромная доля (50%+)', value: 19 },
      ],
    },
    {
      id: 'experienced',
      title: 'С чем сталкивались креаторы',
      caption: 'Доля респондентов, лично столкнувшихся с каждой угрозой.',
      n: 'Опрос Creator Safety 2026 · n=[N] · ofmmodels.com/research',
      data: [
        { label: 'Утечка/перезалив платного контента', value: 58 },
        { label: 'Шантаж (sextortion)', value: 21 },
        { label: 'Дипфейк с их лицом', value: 14 },
        { label: 'Доксинг (раскрытие личных данных)', value: 17 },
      ],
    },
    {
      id: 'protections',
      title: 'Как креаторы защищают себя',
      caption: 'Какие меры приватности используют сейчас. Множественный выбор.',
      n: 'Опрос Creator Safety 2026 · n=[N] · ofmmodels.com/research',
      data: [
        { label: 'Скрывают/блюрят лицо', value: 46 },
        { label: 'Гео-блок страны/региона', value: 39 },
        { label: 'Водяной знак на контенте', value: 34 },
        { label: 'Отдельные «рабочие» аккаунты/телефон', value: 31 },
        { label: 'DMCA / сервис тейкдаунов', value: 22 },
      ],
    },
  ],
  redFlags: [
    'Просят деньги или комиссию вперёд, до запуска страницы',
    'Требуют пароли OnlyFans или полный доступ к аккаунту',
    'Отказываются давать письменный договор',
    'Обещают «гарантированный» фиксированный доход',
    'Хотят контроль над твоим банковским счётом или выплатами',
    'Давят «подписывай сегодня», без прозрачного выхода',
    'Размыто отвечают, кто они вообще такие',
  ],
  goodStandards: [
    'Письменный договор и понятный процент до старта',
    'Ты сохраняешь контроль над своими логинами и выплатами',
    'Чёткое право отказаться от контента, с которым некомфортно',
    'Разговор о приватности и безопасности до публикации',
    'Прозрачный выход без штрафов и удержаний',
  ],
  methodology:
    'Отчёт основан на анонимном онлайн-опросе [N] взрослых креаторов, проведённом [даты] 2026 г. Опрос не собирал никаких идентифицирующих данных: имена, ники, e-mail и IP не сохранялись, поля свободного ввода не использовались. Проценты считаются от ответивших на каждый вопрос; вопросы с множественным выбором в сумме дают больше 100%. Ограничения: респонденты — самовыборка, а не случайная выборка всех креаторов, поэтому цифры описывают именно эту выборку; о пережитом сообщали сами респонденты, независимая проверка невозможна; ушедшие из индустрии после плохого опыта могут быть недопредставлены. Публикуем как ориентировочные данные в общественных интересах. Обновлено [дата].',
  helpResources: [
    { label: 'StopNCII.org — превентивное хеш-блокирование интимных изображений', href: 'https://stopncii.org/' },
    { label: 'Cyber Civil Rights Initiative — помощь жертвам NCII', href: 'https://cybercivilrights.org/' },
    { label: 'Take It Down (NCMEC)', href: 'https://takeitdown.ncmec.org/' },
    { label: 'Revenge Porn Helpline (SWGfL)', href: 'https://revengepornhelpline.org.uk/' },
  ],
  sources: [
    { label: 'FBI IC3 Annual Report 2024 — 54 936 жалоб на шантаж/sextortion, $33,5 млн ущерба', href: 'https://www.ic3.gov/' },
    { label: 'Umbach et al., CHI ’25 — мультистрановое исследование IBSA (n=16 693): 22,6% столкнулись хотя бы с одной формой', href: 'https://dl.acm.org/' },
    { label: 'Security Hero, “State of Deepfakes” 2023 — 98% дипфейк-видео порнографические, 99% против женщин', href: 'https://www.securityhero.io/state-of-deepfakes' },
    { label: 'SWGfL / Revenge Porn Helpline — Annual Report 2024 (22 275 обращений, +20,9%)', href: 'https://swgfl.org.uk/' },
    { label: 'Ceartas / Slate (2024) — 50–70% платного контента воруется и перезаливается', href: 'https://slate.com/' },
  ],
  survey: {
    questions: 16,
    note: 'Опрос из 16 анонимных вопросов (можно сократить до 14). Структуру и Google-форму предоставим отдельно.',
  },
  csv: '/data/onlyfans-creator-safety-2026.csv',
};

export const RESEARCH_REPORTS: ResearchReport[] = [creatorSafety2026];

export function getResearchReport(slug: string): ResearchReport | undefined {
  return RESEARCH_REPORTS.find((r) => r.slug === slug);
}

export function getResearchReportSlugs(): string[] {
  return RESEARCH_REPORTS.map((r) => r.slug);
}
