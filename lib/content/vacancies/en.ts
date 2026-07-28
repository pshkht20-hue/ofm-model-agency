/**
 * Vacancies section copy — EN.
 * Stage 2 of docs/VACANCIES-SECTION-PLAN-2026-07-08.md; mirrors the structure
 * of ru.ts (the base locale) 1:1.
 *
 * Red lines (CLAUDE.md): no "contract/agreement" wording about the agency;
 * OnlyFans only; tone — inviting, not scary.
 * Vacancy-pay policy 25.07.2026 (for-girls + modelCard): visible range
 * $3 000–10 000/mo (space thousands separators), NO percentages/gross/
 * reinvestment or scary caveats, no /calculator links; money details go to
 * Telegram; style — short job-board copy (benefit bullets). $15 000–50 000
 * only as top-page balances, never as a guarantee.
 */
import type { VacancyContent, VacancyHubContent, VacancySlug, VacancyUi } from './types';

export const VACANCY_UI_EN: VacancyUi = {
  breadcrumbHome: 'Home',
  breadcrumbHub: 'Vacancies',
  eyebrow: 'Agency openings · 2026',
  postedLabel: 'Posted',
  updatedLabel: 'Updated',
  validThroughLabel: 'Applications open until',
  activeUntilLabel: 'Hiring now',
  directEmployer: 'Direct employer · OFM agency',
  geoClusterHeading: 'Model work by country',
  salaryLabel: 'Pay',
  formatLabel: 'Format',
  locationLabel: 'Location',
  remoteLabel: 'Remote',
  respondCta: 'Apply',
  detailsCta: 'View the role',
  backToHub: 'All vacancies',
  openBadge: 'Open',
  cityNames: {
    kyiv: 'Kyiv',
    kharkiv: 'Kharkiv',
    lviv: 'Lviv',
    dnipro: 'Dnipro',
    odesa: 'Odesa',
  },
};

export const VACANCY_HUB_EN: VacancyHubContent = {
  h1: 'Current openings at OFM Model Agency',
  seoTitle:
    'OnlyFans jobs — agency openings 2026: chatter and model',
  seoDescription:
    'Open roles at an OnlyFans agency: chatter (chat operator) and model — $3 000–10 000/mo. Remote work, training from scratch, apply in 2 min. Europe, US, worldwide.',
  keywords: [
    'onlyfans jobs',
    'onlyfans vacancies',
    'work at onlyfans agency',
    'remote onlyfans jobs',
    'onlyfans chatter job',
  ],
  trustLine:
    '{count} open roles · Updated {date} · Europe, US, Canada & worldwide · remote',
  intro: [
    'These are the agency’s own openings, not a job board: OFM Models is hiring into its own team — from chatters to the models whose pages we run end to end since 2022. Both roles are fully remote: you can work from anywhere — Europe, the US, Canada, Latin America or elsewhere in the world.',
    'Pick a role below, apply on Telegram or through the form — we reply within a day, and getting started takes a few days with no paperwork hassle.',
  ],
  sections: [
    {
      heading: 'Two open roles: chatter and model',
      paragraphs: [
        'Two key roles are open at the agency right now — and they’re opposite in the type of work: the model handles content, the chatter handles messaging and sales:',
      ],
      bullets: [
        'Chatter (chat operator) — messaging subscribers on behalf of the page and selling PPV from ready scripts; pay is a base rate + % of chat sales; training from scratch, men welcome too',
        'OnlyFans model — content for 2–3 hours a day on a ready plan; income $3 000–10 000/mo, with registration, promo, chat and page promotion fully handled by the team. Choose your country on the [“Model work” page](/vacancies/model)',
      ],
    },
    {
      heading: 'What does OnlyFans work actually involve?',
      paragraphs: [
        'OnlyFans is a paid-subscription platform, and "OnlyFans work" is far from just the models themselves. Paired with the agency, a model only handles content: 2–3 hours of shooting a day on a ready plan. Everything else is done by the agency team: chatters sell content in conversations with subscribers, management builds the content plan and watches the numbers, and promo brings the paying traffic.',
        'The key fact of the niche: 70–90% of a page’s income comes from chatting, not the subscription — which is why the chatter role is the agency’s second key opening alongside the model. If you’re new to the topic, start with the guide [what OnlyFans is](/blog/chto-takoe-onlyfans), then come back to the roles above.',
      ],
    },
    {
      heading: 'How do you get an OnlyFans job?',
      paragraphs: [
        'With an agency it’s simpler than it looks: pick a role, message us on Telegram or fill in the form, do a short test task (for the chatter) and an online interview. We train chatters from scratch — scripts, checklists, a mentor for your first shifts; models we launch through a casting and onboarding with the team that takes on the page in full.',
        'What matters at the start: 18+, a stable internet connection, and an honest answer on how many hours a week you can commit. Chatters additionally need written English from B1 — all subscriber messaging is in English.',
      ],
    },
    {
      heading: 'Can you really earn on OnlyFans?',
      paragraphs: [
        'Yes — but the numbers are honest, no fairy tales. Chatter: a base rate + a percentage of your own chat’s sales (we name the range at the interview after the test task, so we don’t paint an advertising "up to $X"). Model: income of $3 000–10 000/mo, with top models earning $10 000+ — we’ll show your personal range and plan on Telegram.',
        'Page benchmarks: the balances of the agency’s top-model pages reach $15 000–50 000 a month — the result of the whole team’s systematic work on promo, chat and management. A full breakdown of the numbers is in the article [how much OnlyFans models earn](/blog/onlyfans-skolko-zarabatyvayut-modeli).',
      ],
    },
    {
      heading: 'OnlyFans work for men',
      paragraphs: [
        'The chatter role doesn’t depend on gender: women and men are hired equally as chat operators. In chat the subscriber sees the model’s page, not the person typing — writing and sales skills are what matter. From industry experience, a large share of strong chatters are men: they stay cooler in price negotiations and are more systematic with reporting.',
        'If you’re looking for remote work in English — start with the chatter role: it’s the fastest way into the niche, with training from scratch and a clear track up to team lead.',
      ],
    },
    {
      heading: 'Remote OnlyFans work across Europe, the US and worldwide',
      paragraphs: [
        'All of the agency’s roles are remote: no office needed, the team is distributed, processes live in Telegram and working spreadsheets. We hire from across Europe, the US, Canada, Latin America and beyond — neither the city nor the country affects the terms or the pay; all you need is a stable internet connection.',
      ],
    },
    {
      heading: 'How agency openings differ from job-board ads',
      paragraphs: [
        'You apply directly to the team you’ll be working with: no middlemen, no reselling of profiles, no "curators" taking a cut. Every role comes with training, a mentor and a clear growth track — we grow our team leads and heads from within. We reply within a day, and if a role is already filled, we’ll say so honestly and come back when it opens again.',
      ],
    },
  ],
  faqHeading: 'Common questions about working at an OnlyFans agency',
  faq: [
    {
      question: 'Is OnlyFans work legal?',
      answer:
        'Yes. OnlyFans is a legal platform, and the agency’s roles are ordinary remote work: messaging, management, social media, content. All of it is with an adult audience within the platform’s rules.',
    },
    {
      question: 'What vacancies does the OnlyFans agency have?',
      answer:
        'Two roles are open right now: chatter (chat operator) and model. Both are remote; the role cards are at the top of this page, and each model country has its own terms on the “Model work” page.',
    },
    {
      question: 'Can I join without experience?',
      answer:
        'Yes: we train chatters from scratch — scripts, checklists, a mentor; models we launch through a casting and onboarding, with the team running the page in full (promo, chat, finances). You only need to be 18+, have stable internet and be ready to work regularly.',
    },
    {
      question: 'Is OnlyFans work suitable for men?',
      answer:
        'Yes: chatter, manager, assistant and SMM don’t depend on gender. In chat the subscriber sees the model’s page, not the author of the messages — writing and sales skills decide it, not gender.',
    },
    {
      question: 'How much does an OnlyFans agency pay?',
      answer:
        'Chatter — base rate + % of your own chat’s sales (range named at the interview after the test task). Model — $3 000–10 000/mo; the agency’s top pages reach balances of $15 000–50 000/mo. We’ll share your personal range and plan on Telegram.',
    },
    {
      question: 'Is this remote work?',
      answer:
        'Yes, all roles are fully remote. You need a stable internet connection and agreed hours online; city and country don’t matter.',
    },
    {
      question: 'How fast do you respond to an application?',
      answer:
        'Within a day. Then comes a short test task (for chatter, manager and SMM), an online interview and training: from application to first shift usually takes less than a week.',
    },
  ],
  modelCard: {
    role: 'OnlyFans model',
    cardSummary:
      'Content 2–3 hours a day on a ready plan — registration, promo, chat and finances are fully handled by the agency team.',
    salaryLabel: '$3 000–10 000/mo',
    formatLabel: 'Remote · content 2–3 h/day',
    locationLabel: 'Remote · Europe, US, Canada & worldwide',
  },
  cta: {
    heading: 'Didn’t find your role?',
    text: 'Message us on Telegram with a few words about yourself and what you can do: the team is growing, and some roles open before they hit the listing.',
    primaryLabel: 'Message us on Telegram',
  },
};

const CHATTER_EN: VacancyContent = {
  slug: 'chatter-onlyfans',
  role: 'Chatter / chat operator',
  h1: 'OnlyFans chatter job — remote chat operator vacancy',
  seoTitle: 'OnlyFans chatter job — remote, base rate + % of sales',
  seoDescription:
    'OnlyFans chatter vacancy at OFM Models agency: remote chat work, training from scratch, base rate + % of sales, from 25 h/week. Men welcome too. Apply now!',
  keywords: [
    'onlyfans chatter',
    'onlyfans chatter job',
    'onlyfans chat operator',
    'onlyfans chat work',
    'onlyfans work for men',
    'work as onlyfans chatter',
  ],
  cardSummary:
    'Messaging subscribers of model pages from ready scripts and selling PPV. Training from scratch, English from B1, men welcome too.',
  salaryLabel: 'Base rate + % of chat sales',
  chips: [
    'Training from scratch',
    'Remote',
    'Flexible shifts',
    'Base rate + % of sales',
    'English from B1',
    'Men welcome',
  ],
  formatLabel: 'Remote · shifts · from 25 h/week',
  locationLabel: 'Remote · Europe, US, Canada & worldwide',
  intro: [
    'OFM Models agency is hiring OnlyFans chatters (chat operators) for remote work. The gist: you handle messaging with subscribers of our models’ pages from ready scripts and sell paid content (PPV), while we train you from scratch and pay a base rate + a percentage of your chat’s sales. Fully online, start with no experience, suitable for women and men alike — you need written English from B1 and readiness to commit from 25 hours a week.',
    'This isn’t a job board or "work somewhere online": we’re hiring into the agency’s own chat team, and the agency runs model pages on OnlyFans — from content plan to promotion and finances. Chat is the heart of that system: it’s in the messaging that a page earns most of its money, and we need people who can — or want to learn to — sell with words.',
  ],
  sections: [
    {
      heading: 'Who a chatter is and why it’s the key profession in an OnlyFans agency',
      paragraphs: [
        'A chatter is a specialist who talks to subscribers on behalf of the model’s page: replies to messages, keeps fans engaged and sells paid content in direct messages. On OnlyFans 70–90% of a page’s income comes precisely from messaging, not the subscription — so a good chat operator literally makes the page’s revenue.',
        'Want to understand the profession more deeply — we have a detailed breakdown: [who an OnlyFans chatter is and how they work](/blog/chatter-onlyfans-kto-eto). And if you’re hearing about the platform for the first time, start with the guide [what OnlyFans is](/blog/chto-takoe-onlyfans).',
      ],
    },
    {
      heading: 'Responsibilities: what you’ll do every day',
      bullets: [
        'Message subscribers in English on behalf of the model — from ready scripts, in her tone and within her boundaries',
        'Sell PPV content (paid photos and videos in DMs), customs and tips — scripts and pricing provided',
        'Retain fans: remember conversation details, win back "cooled-off" subscribers, mark occasions',
        'Work in shifts — schedule agreed; evening and night shifts for US prime time pay more attractively',
        'Keep simple reporting: shift, sales, notes on fans — in the team’s working spreadsheets',
      ],
      outro: [
        'How DM sales work and why they generate the bulk of a page’s revenue — we covered it in the article [how chats and DMs drive sales on OnlyFans](/blog/onlyfans-chaty-dm-prodazhi).',
      ],
    },
    {
      heading: 'What we offer',
      bullets: [
        'Remote work from any city — you only need a laptop and stable internet',
        'Training from scratch: a base of scripts, breakdowns of real conversations, a mentor for the trial period — niche experience isn’t required',
        'Pay = base rate + % of your chat’s sales: your income has no hard ceiling',
        'A clear career track up to senior chatter and team lead — we grow leads from within',
        'A shift schedule you can genuinely combine with study or another job',
        'A team and support: working chats, breakdowns of tricky conversations, no "figure it out yourself"',
      ],
    },
    {
      heading: 'Requirements: who we’re looking for',
      bullets: [
        'English from B1: all messaging is in English (no speaking needed — only writing)',
        'From 25 hours a week: the chat must run steadily, "an hour a day" won’t work',
        'Age 18+',
        'Literate written text and speed: in a shift you run dozens of conversations in parallel',
        'An interest in sales and communication: empathy, patience, the ability to hear the other person',
        'Discipline and confidentiality: we work with model pages and fan data',
        'Experience in sales, support or messaging is a plus but not required: we’ll teach the main things',
      ],
    },
    {
      heading: 'OnlyFans work for men: chatters can be guys too',
      paragraphs: [
        'Yes. Gender doesn’t matter in this profession: the subscriber sees the model’s page, not who’s replying. What matters is how you write and sell. From industry experience, a large share of strong chatters are men: they stay cooler in price negotiations and are more systematic with reporting. So if you’re a guy looking for remote work in English — this is one of the few openings in the OnlyFans niche where you’re just as welcome as women.',
      ],
    },
    {
      heading: 'Pay: base rate + percentage of chat sales',
      paragraphs: [
        'The scheme is transparent: a fixed rate for shifts + a percentage of the sales your chat made. The exact figures depend on schedule, experience and test-task results — we state them at the interview so we name your real range, not an advertising "up to $X".',
        'Why the percentage is serious: top-model pages under our management reach $15 000–50 000 a month, and most of those sales are born in the messaging. The better your chat sells, the larger your percentage in absolute figures. How much the pages themselves earn and what their income is made of — see the breakdown [how much OnlyFans models earn](/blog/onlyfans-skolko-zarabatyvayut-modeli).',
      ],
    },
    {
      heading: 'What a chatter’s working day looks like',
      paragraphs: [
        'A shift starts with a handover: you read the previous operator’s notes — which fans are "warm", who was promised a custom, whose birthday is tomorrow. Then you open the conversations: with regular subscribers the messaging runs in parallel, the scripts suggest the structure, but the liveliness and memory for details are yours. During US prime time (evening and night in Europe) the pace is highest: new fans arrive in waves after promo posts, and the first ten minutes of a conversation decide whether the person becomes a buyer.',
        'In the quiet hours — work with the base: you win back "cooled-off" subscribers, prepare teasers for the new content drop, update notes. Once a shift you sync with the team lead — a breakdown of a tricky conversation or a new script takes 10–15 minutes. You close the shift with a short report: sales, conversion, observations on fans — the next operator starts from these notes. At first running many conversations at once feels unfamiliar, but the scripts and trial shifts clear the chaos in a couple of weeks.',
      ],
    },
    {
      heading: 'Career growth: from trainee to team lead',
      paragraphs: [
        'The path in the team looks like this: trainee → chatter → senior chatter → team lead. The senior chatter takes VIP conversations and the trickiest fans, the team lead manages shifts, trains newcomers and owns the direction’s metrics. We don’t hire team leads from outside — we grow them from our own chatters, so the track is real, not a line in a job ad.',
      ],
    },
  ],
  hiringHeading: 'How the selection goes: no bureaucracy',
  hiringSteps: [
    { title: 'Application', text: 'Message us on Telegram or fill in a short form — 2–3 minutes.' },
    {
      title: 'Test task',
      text: 'A short scripted conversation in English: we look at your language and sense for sales.',
    },
    { title: 'Online interview', text: 'We get to know each other, discuss schedule, rate and percentage.' },
    { title: 'Training', text: 'Scripts, rules, trial shifts with a mentor.' },
    { title: 'First shift', text: 'You go on schedule with a mentor’s support — and you’re on the team.' },
  ],
  hiringNote:
    'Getting started takes a few days, with no paperwork hassle. And honestly: if after training you realise messaging isn’t for you, you just say so and leave at any moment — no withholdings and no awkward conditions.',
  faqHeading: 'Common questions about working as a chatter',
  faq: [
    {
      question: 'OnlyFans chatter — what kind of job is it?',
      answer:
        'A chatter is an OnlyFans chat operator: they message subscribers on behalf of the model’s page, reply to messages and sell paid content (PPV) in DMs. It’s work at the intersection of sales and communication: the subscription is only a small part of a page’s income, the bulk is earned in chat.',
    },
    {
      question: 'Can you work as an OnlyFans chatter without experience?',
      answer:
        'Yes. We train from scratch: scripts, conversation breakdowns, a mentor and trial shifts. What matters is not lines on a CV but written English from B1, discipline and a desire to learn to sell in messaging.',
    },
    {
      question: 'Is OnlyFans chat work legal?',
      answer:
        'Yes: it’s remote work as a messaging and online-sales specialist. You don’t publish content or run your own page — you only talk to the platform’s adult audience within its rules. OnlyFans is a legal platform, and messaging and sales are ordinary client work.',
    },
    {
      question: 'Is OnlyFans work suitable for men?',
      answer:
        'Yes, women and men are hired equally as chatters: subscribers see the model’s page, not the author of the messages. A large share of strong chat operators in the industry are men. Writing and sales skills decide it, not gender.',
    },
    {
      question: 'What level of English does a chat operator need?',
      answer:
        'Written B1 and above: you need to message quickly and correctly, understand slang and humour. Spoken English isn’t needed — there are no calls, only text. We check the level with a short test task, not certificates.',
    },
    {
      question: 'How much does an OnlyFans chatter earn?',
      answer:
        'Income is made of a fixed rate for shifts and a percentage of your chat’s sales, so there’s no hard ceiling: more sales — a bigger figure. We name the exact range at the interview after the test task — it depends on schedule, shifts and level.',
    },
  ],
  cta: {
    heading: 'Apply for the vacancy',
    text: 'Message us on Telegram with a few words about yourself: your English level, sales or messaging experience (if any) and how many hours a week you’re ready to work. We reply within a day.',
    primaryLabel: 'Message us on Telegram',
    bridgeNote:
      'Looking not for chat work but for your own page? If you’re a woman thinking about your own OnlyFans profile — [fill in the model application](/join): the agency takes on the promotion, chat and finances of the page, and the application takes 2–3 minutes.',
  },
};
const FOR_GIRLS_EN: VacancyContent = {
  slug: 'for-girls',
  role: 'Online work for women',
  h1: 'Online work for women — remote roles at the OFM Models agency',
  seoTitle: 'Online Work for Women — Remote, $3 000–10 000/mo',
  seoDescription:
    'Online work for women at OFM Models: OnlyFans model or support operator. $3 000–10 000/mo, fully remote, no experience needed, training included. Apply in 2 minutes!',
  keywords: [
    'online work for women',
    'online jobs for girls',
    'remote work for women',
    'work from home for women',
    'online work for women no experience',
  ],
  cardSummary:
    'Remote work for women 18+: from $3 000 to $10 000/mo, 2–3 hours of content a day — the agency team handles everything else.',
  salaryLabel: '$3 000–10 000/mo',
  chips: [
    'No experience needed',
    'Remote',
    'Flexible schedule',
    'Training from scratch',
    '24/7 support',
    '18+',
  ],
  formatLabel: 'Remote · from 2–3 h/day',
  locationLabel: 'Remote · Ukraine, Europe and worldwide',
  intro: [
    'The OFM Models agency is hiring women 18+ for remote work: the [OnlyFans model](/vacancies/model) track pays from $3 000 to $10 000/mo for 2–3 hours of content a day, while the team fully handles registration, promotion, messaging and the page finances.',
    'Prefer not to film? There’s the [chat operator vacancy](/vacancies/chatter-onlyfans) — message us on Telegram and we’ll pick your track and walk you through the terms.',
  ],
  sections: [
    {
      heading: 'What you get',
      bullets: [
        'Income from $3 000 to $10 000/mo; the agency’s top pages reach balances of $15 000–50 000/mo',
        'The team runs the page: registration, promo, chat and finances are off your plate',
        '2–3 hours of content a day on a ready plan — fits around studies or another job',
        'Training and onboarding from scratch — no experience or portfolio needed',
        'A manager available 24/7 — from technical questions to personal boundaries',
        'Start in a few days: no fees and no paperwork',
      ],
      outro: [
        'Country-specific terms live on the [model jobs page](/vacancies/model); details — on Telegram.',
      ],
    },
    {
      heading: 'What we need from you',
      bullets: [
        'Age 18+ — strictly, no exceptions',
        '2–3 hours a day on a flexible schedule',
        'A smartphone with a good camera and stable internet',
        'Readiness to follow the plan together with the team',
      ],
    },
    {
      heading: 'Safety and privacy',
      bullets: [
        'Registration, verification and payouts are handled on the agency’s side',
        'Moderators filter the messages; you set your own content boundaries',
        'All work happens online, inside the platform — no meet-ups or “offline services”',
      ],
    },
  ],
  hiringHeading: 'How the start works: 4 steps',
  hiringSteps: [
    {
      title: 'Application',
      text: 'Message us on Telegram or fill in the form on the site — 2–3 minutes, no CV needed.',
    },
    {
      title: 'Call',
      text: 'A short online intro: we answer your questions and choose the track — model or operator.',
    },
    {
      title: 'Plan',
      text: 'The team builds your personal plan: persona, content and page promotion.',
    },
    {
      title: 'First payouts',
      text: 'We launch the page — the first money usually comes within the first month.',
    },
  ],
  hiringNote:
    'The start comes with no paperwork: no fees, no “deposits”, no obligation to stay — you can leave at any moment.',
  faqHeading: 'Frequently asked questions about online work for women',
  faq: [
    {
      question: 'From what age can I start?',
      answer:
        'Strictly from 18 — that’s the platform’s and the agency’s rule, no exceptions. There’s no upper limit: women succeed in this niche at 20 and at 35+.',
    },
    {
      question: 'Can I start with no experience?',
      answer:
        'Yes: you get a ready-made content plan, training and a team that handles registration, promotion and the page finances.',
    },
    {
      question: 'How much can I earn?',
      answer:
        'The visible range is from $3 000 to $10 000/mo; the agency’s top pages reach balances of $15 000–50 000/mo. We’ll go through the exact terms for your situation on Telegram.',
    },
    {
      question: 'When does the first money come?',
      answer:
        'Usually within the first month of the page. We’ll explain how payouts work on Telegram before the start.',
    },
    {
      question: 'Is it legal?',
      answer:
        'Yes. OnlyFans is a legal platform, and the model’s and operator’s work is ordinary remote employment: content, messaging, online sales. All the work is with an adult audience within the platform’s rules.',
    },
    {
      question: 'Do I have to film, or is there work without a camera?',
      answer:
        'There is: the support operator doesn’t create content at all — it’s messaging work with subscribers of the models’ pages. And if you choose the model track, the format and boundaries of your content are agreed with you before the start.',
    },
  ],
  cta: {
    heading: 'Start with one Telegram message',
    text: 'Message us a few words about yourself: your age, city and which track interests you — model or support operator. We reply within a day.',
    primaryLabel: 'Message us on Telegram',
    bridgeNote:
      'Already decided you want your own page? [Fill in the model application](/join) — the team takes on registration, promotion and finances.',
  },
};

export const VACANCIES_EN: Record<VacancySlug, VacancyContent> = {
  'chatter-onlyfans': CHATTER_EN,
  'for-girls': FOR_GIRLS_EN,
};
