/**
 * Vacancies section copy — EN.
 * Stage 2 of docs/VACANCIES-SECTION-PLAN-2026-07-08.md; mirrors the structure
 * of ru.ts (the base locale) 1:1.
 *
 * Red lines (CLAUDE.md): no "contract/agreement" wording about the agency;
 * 20–30% only WITH the reinvestment rationale; income claims only as
 * $15K–$50K gross page balances of top-model pages, newcomer anchor
 * $500–1,000 in the first month; OnlyFans only; tone — inviting, not scary.
 */
import type { VacancyContent, VacancyHubContent, VacancySlug, VacancyUi } from './types';

export const VACANCY_UI_EN: VacancyUi = {
  breadcrumbHome: 'Home',
  breadcrumbHub: 'Vacancies',
  eyebrow: 'Agency openings · 2026',
  postedLabel: 'Posted',
  updatedLabel: 'Updated',
  validThroughLabel: 'Applications open until',
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
    'OnlyFans jobs — current agency openings 2026: chatter, model, manager | OFM Model Agency',
  seoDescription:
    'Open roles at OnlyFans agency OFM Models: chatter (chat operator), model, manager, assistant, SMM. Remote work, training from scratch, apply in 2 minutes.',
  keywords: [
    'onlyfans jobs',
    'onlyfans vacancies',
    'work at onlyfans agency',
    'remote onlyfans jobs',
    'onlyfans chatter job',
  ],
  trustLine:
    '{count} open roles · Updated {date} · Kyiv, Kharkiv, Lviv, Dnipro, Odesa + remote',
  intro: [
    'These are the agency’s own openings, not a job board: OFM Models is hiring into its own team — from chatters and managers to the models whose pages we run end to end since 2022. Every role is remote: you can work from any city in Ukraine or from abroad.',
    'Pick a role in the listing, apply on Telegram or through the form — we reply within a day, and getting started takes a few days with no paperwork hassle.',
  ],
  sections: [
    {
      heading: 'The team roles: who does what',
      paragraphs: [
        'A whole team stands behind every successful OnlyFans page — and almost all of those roles are text-based and operational, not on-camera:',
      ],
      bullets: [
        'Chatter (chat operator) — messaging subscribers on behalf of the page and selling PPV from ready scripts; pay is a base rate + % of chat sales; training from scratch',
        'OnlyFans model — content for 2–3 hours a day on an agreed plan; registration, promo, chat and the page’s finances are fully handled by the agency',
        'Manager — running 2–4 model pages: content plan, team coordination, analytics; $1,000–3,000/mo',
        'Assistant — the agency’s operations: content calendar, spreadsheets, handling applications; from $600/mo, no experience needed',
        'SMM specialist — the models’ social media: Instagram, TikTok, Twitter/X, Reddit; base rate + growth bonuses',
      ],
    },
    {
      heading: 'What does OnlyFans work actually involve?',
      paragraphs: [
        'OnlyFans is a paid-subscription platform, and "OnlyFans work" is far from just the models themselves. Paired with the agency, a model only handles content: 2–3 hours of shooting a day on a ready plan. Everything else is done by the team: chatters sell content in conversations with subscribers, the manager builds the content plan and watches the numbers, SMM runs the socials and brings traffic, the assistant keeps processes tidy so nothing slips.',
        'The key fact of the niche: 70–90% of a page’s income comes from chatting, not the subscription — which is why the agency’s most common opening is the chatter role. If you’re new to the topic, start with the guide [what OnlyFans is](/blog/chto-takoe-onlyfans), then come back to the listing above.',
      ],
    },
    {
      heading: 'How do you get an OnlyFans job?',
      paragraphs: [
        'With an agency it’s simpler than it looks: pick a role, message us on Telegram or fill in the form, do a short test task and an online interview. We train chatters and assistants from scratch — scripts, checklists, a mentor for your first shifts; managers we upskill from adjacent experience (SMM, production, projects); models we launch through a casting and onboarding with the team.',
        'What matters at the start: 18+, a stable internet connection, and an honest answer on how many hours a week you can commit. Chatters additionally need written English from B1 — all subscriber messaging is in English.',
      ],
    },
    {
      heading: 'Can you really earn on OnlyFans?',
      paragraphs: [
        'Yes — but the numbers are honest, no fairy tales. Team roles: assistant — from $600/mo, manager — $1,000–3,000/mo, chatter — base rate + a percentage of your own chat’s sales (we name the range at the interview after the test task, so we don’t paint an advertising "up to $X"). A model receives 20–30% of the page’s gross balance: the agency fully funds promotion, traffic and the chat team, and part of the page’s income is reinvested into its growth — which is why both the balance and the model’s percentage grow together.',
        'Page benchmarks: in the first month a new page usually reaches $500–1,000 of gross balance — that’s the ramp-up, not the ceiling; the agency’s top-model pages do $15,000–$50,000 gross a month, but that’s the result of months of systematic teamwork. A full breakdown of the numbers is in the article [how much OnlyFans models earn](/blog/onlyfans-skolko-zarabatyvayut-modeli).',
      ],
    },
    {
      heading: 'OnlyFans work for men',
      paragraphs: [
        'Most of the agency’s roles don’t depend on gender: women and men are hired equally as chatters, managers, SMM specialists and assistants. In chat the subscriber sees the model’s page, not the person typing — writing and sales skills are what matter. From industry experience, a large share of strong chatters are men: they stay cooler in price negotiations and are more systematic with reporting.',
        'If you’re looking for remote work in English — start with the chatter role: it’s the fastest way into the niche, with training from scratch and a clear track up to team lead.',
      ],
    },
    {
      heading: 'OnlyFans work in Kyiv, Kharkiv, Lviv, Dnipro and Odesa',
      paragraphs: [
        'All of the agency’s roles are remote: no office needed, the team is distributed, processes live in Telegram and working spreadsheets. Most applicants come to us from Kyiv, Kharkiv, Lviv, Dnipro and Odesa, but the city affects neither the terms nor the pay — you can work from anywhere, including if you’re currently abroad.',
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
        'Five roles are open right now: chatter (chat operator), model, manager, assistant and SMM specialist. All are remote; the listing with dates and pay ranges is at the top of this page.',
    },
    {
      question: 'Can I join without experience?',
      answer:
        'Yes: we train chatters and assistants from scratch — scripts, checklists, a mentor; models we launch through a casting and onboarding. Managers and SMM specialists need adjacent experience: project management or running social media.',
    },
    {
      question: 'Is OnlyFans work suitable for men?',
      answer:
        'Yes: chatter, manager, assistant and SMM don’t depend on gender. In chat the subscriber sees the model’s page, not the author of the messages — writing and sales skills decide it, not gender.',
    },
    {
      question: 'How much does an OnlyFans agency pay?',
      answer:
        'Assistant — from $600/mo, manager — $1,000–3,000/mo, chatter — base rate + % of chat sales (range named at the interview). A model receives 20–30% of the page’s gross balance: the agency funds promotion, traffic and the team and reinvests part of the page’s income into its growth.',
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
  seoTitle: 'OnlyFans chatter vacancy (chat operator) — remote, base rate + % of sales',
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
  formatLabel: 'Remote · shifts · from 25 h/week',
  locationLabel: 'Remote (all of Ukraine)',
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
        'Why the percentage is serious: top-model pages under our management reach $15K–$50K gross a month, and most of those sales are born in the messaging. The better your chat sells, the larger your percentage in absolute figures. How much the pages themselves earn and what their income is made of — see the breakdown [how much OnlyFans models earn](/blog/onlyfans-skolko-zarabatyvayut-modeli).',
      ],
    },
    {
      heading: 'What a chatter’s working day looks like',
      paragraphs: [
        'A shift starts with a handover: you read the previous operator’s notes — which fans are "warm", who was promised a custom, whose birthday is tomorrow. Then you open the conversations: with regular subscribers the messaging runs in parallel, the scripts suggest the structure, but the liveliness and memory for details are yours. During US prime time (evening and night by Kyiv) the pace is highest: new fans arrive in waves after promo posts, and the first ten minutes of a conversation decide whether the person becomes a buyer.',
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
      'Looking not for chat work but for your own page? If you’re a woman thinking about your own OnlyFans profile — [fill in the model application](/join): the agency takes on the promotion, chat and finances of the page. You can estimate your potential income in the [calculator](/calculator).',
  },
};

const MODEL_EN: VacancyContent = {
  slug: 'model-onlyfans',
  role: 'OnlyFans model',
  h1: 'OnlyFans model vacancy — remote work, the page fully run by the agency',
  seoTitle: 'OnlyFans model vacancy — top pages $15,000–$50,000/mo, account run by the agency',
  seoDescription:
    'Recruiting OnlyFans models into OFM Models agency: registration, promo, chat and finances on the team, 2–3 hours of content a day from you. No experience needed, start with no hassle.',
  keywords: [
    'onlyfans model vacancy',
    'onlyfans model job',
    'work as onlyfans model',
    'onlyfans work for women',
    'onlyfans agency vacancies',
  ],
  cardSummary:
    'Shooting content 2–3 hours a day on a ready plan — registration, promo, chat and finances are taken on by the agency team. No experience needed.',
  salaryLabel: 'Percentage of the page’s gross balance',
  formatLabel: 'Remote · content 2–3 h/day',
  locationLabel: 'Remote · Kyiv, Kharkiv, Lviv, Dnipro, Odesa',
  intro: [
    'OFM Models agency is recruiting OnlyFans models for remote work from home. The format is simple: you shoot content on an agreed plan 2–3 hours a day, and the agency team does everything else — from registering and verifying the page to promotion, subscriber messaging and finances. Experience, a portfolio and professional gear aren’t needed: most of our models started from scratch.',
    'This is the agency’s own vacancy, not a job-board ad: since 2022 we’ve run pages end to end — 220+ models in our portfolio. You can work from any city — Kyiv, Kharkiv, Lviv, Dnipro, Odesa or from abroad; all that matters is being 18+ and ready to shoot regularly.',
  ],
  sections: [
    {
      heading: 'What the agency takes on',
      bullets: [
        'Registration and verification of the page, setting up payment systems (Paxum, Skrill and others)',
        'Content plan and breakdowns: what to shoot and how, working angles and formats',
        'Promotion and traffic: promo campaigns, social media, paying audiences from the US, Canada and Australia',
        'Subscriber messaging: the chat team works 24/7 and makes the sales for you',
        'Finances and payouts on a fixed schedule — you don’t need to figure out payment-processor fees',
        'Analytics and a personal manager who guides you from casting to top metrics',
      ],
      outro: [
        'What exactly the agency does at each stage — we broke it down in the article [what an OnlyFans agency does](/blog/chto-delaet-onlyfans-agentstvo).',
      ],
    },
    {
      heading: 'Responsibilities: what stays with you',
      bullets: [
        'Shoot content on the plan 2–3 hours a day — from a smartphone, no studio needed',
        'Stay in touch with your manager and the team on Telegram',
        'Agree formats and boundaries: nothing is published "by default"',
        'Keep it regular: content consistency is the main driver of a page’s growth',
      ],
    },
    {
      heading: 'Requirements',
      bullets: [
        '18+ (the platform checks documents during verification)',
        'A smartphone with a decent camera and stable internet',
        '2–3 free hours a day and readiness to shoot regularly',
        'Responsibility: the content plan and deadlines are part of the work',
        'Experience and "model" looks aren’t required — we pick the persona and plan individually',
      ],
    },
    {
      heading: 'Pay: percentage of the page’s gross balance',
      paragraphs: [
        'A model receives 20–30% of the page’s total gross balance — depending on the work plan, persona and team. Here’s why: the agency fully funds promotion — promo, traffic, a 24/7 chat team, management; you don’t invest a penny, and part of the page’s income is reinvested into its growth. Without reinvestment the balance doesn’t grow — so 25% of a growing balance in six months is more than 100% of a solo zero.',
        'Honest benchmarks: in the first month a new page usually reaches $500–1,000 of gross balance — that’s the ramp-up, not the ceiling. Further growth depends on content consistency: the agency’s top-model pages reach $15,000–$50,000 gross a month, but that’s the result of months of systematic work with the team, not a starting point. What the income is made of — in the article [how much OnlyFans models earn](/blog/onlyfans-skolko-zarabatyvayut-modeli), and you can estimate your own potential in the [income calculator](/calculator).',
      ],
    },
    {
      heading: 'Privacy and boundaries',
      paragraphs: [
        'The level of privacy is discussed individually at the casting. The standard practice is a geo-block: the page is closed to your country and neighbouring ones so acquaintances won’t see it, while we bring the audience from the US, Canada and Australia. Content formats are agreed in advance and fixed in the content plan — the team works strictly within your boundaries, nothing is published "by default".',
      ],
    },
    {
      heading: 'What a model’s working day looks like',
      paragraphs: [
        'In the morning the manager sends the day’s plan: for example, two photo sets from ready references and a short video. You shoot at a convenient time — most people manage in 2–3 hours including lighting and reshooting the misses. You send the material to the working chat: the content manager picks the best, prepares the publications and hands the chat team teasers for the sales.',
        'After that the page works without you: promo brings new subscribers, chatters reply to messages and sell content in the messaging. In the evening you can glance at the report — how many new fans, what they bought, which formats landed; once a week the manager reviews the numbers with you and adjusts the plan. No scheduled streams, no night shifts and no messaging subscribers directly: the team fully covers the chat.',
      ],
    },
    {
      heading: 'Cities: Kyiv, Kharkiv, Lviv, Dnipro, Odesa — and beyond',
      paragraphs: [
        'The work is fully remote: you can shoot from home in any city of Ukraine or from abroad. We get the most applications from Kyiv, Kharkiv, Lviv, Dnipro and Odesa, but location affects neither the terms nor the percentage — the team, plan and promotion are the same for everyone.',
      ],
    },
  ],
  hiringHeading: 'How the selection goes',
  hiringSteps: [
    {
      title: 'Application',
      text: 'Fill in a short application on the site — 2–3 minutes, free and with no obligation.',
    },
    {
      title: 'Call with a manager',
      text: 'A manager will message you on Telegram within 24 hours: they’ll answer your questions and go over the details.',
    },
    {
      title: 'Casting and plan',
      text: 'We discuss persona, boundaries, privacy and goals — the content plan and team are built around them.',
    },
    {
      title: 'Onboarding',
      text: 'Registration and verification of the page, payment setup, first shoots on the plan.',
    },
    { title: 'Launch', text: 'The page goes into promo — the first subscriptions and sales appear.' },
  ],
  hiringNote:
    'Getting started takes a few days with no paperwork hassle, and you can stop the collaboration at any moment — the page is registered under your documents.',
  faqHeading: 'Common questions about the model vacancy',
  faq: [
    {
      question: 'Do you need experience to become an OnlyFans model?',
      answer:
        'No. Most of our models started from scratch: at onboarding we give a content plan, show working angles and formats, and the team takes on the marketing and subscriber messaging. Your task at the start is to shoot regularly on the plan.',
    },
    {
      question: 'How much does a model receive?',
      answer:
        'A model receives 20–30% of the page’s total gross balance — depending on the plan, persona and team. The agency funds promotion, traffic and the chat team and reinvests part of the page’s income into its growth, so the balance grows month over month. No payments from you: the agency earns only when you earn.',
    },
    {
      question: 'How much does it come to in the first month?',
      answer:
        'An honest anchor is $500–1,000 of the page’s gross balance in the first month: the audience is only just building up. Budget 1–3 months for the ramp-up, then growth depends on content consistency. Top-model pages reach $15,000–$50,000 gross a month — that’s the result of months of work, not the start.',
    },
    {
      question: 'Is it anonymous?',
      answer:
        'The level of privacy is discussed individually at the casting. The standard practice is a geo-block: the page is closed to your country and neighbouring ones so acquaintances won’t see it, while we bring the paying audience from the US, Canada and Australia. Content formats are also agreed in advance.',
    },
    {
      question: 'Who runs the page and the money?',
      answer:
        'A full-cycle agency: registration, verification, payment systems (Paxum, Skrill), income control and payouts on a fixed schedule. The page is registered under your documents, and you know all the details of your profile.',
    },
    {
      question: 'Which city can I work from?',
      answer:
        'Any: the work is fully remote. Kyiv, Kharkiv, Lviv, Dnipro and Odesa are the most common cities of our models, but the terms are the same for everyone, including those currently abroad.',
    },
  ],
  cta: {
    heading: 'Fill in the model application',
    text: 'The application takes 2–3 minutes: name, age, city and a few words about yourself. A manager will message you on Telegram within 24 hours — free and with no obligation.',
    primaryLabel: 'Fill in the application',
    bridgeNote:
      'Unsure about the numbers? Estimate your page’s potential in the [income calculator](/calculator) — 4 questions, no sign-up.',
  },
};

const MANAGER_EN: VacancyContent = {
  slug: 'manager-onlyfans',
  role: 'OnlyFans manager',
  h1: 'OnlyFans manager vacancy — running model accounts, remote',
  seoTitle: 'OnlyFans manager vacancy — running accounts, $1,000–$3,000/mo',
  seoDescription:
    'OFM Models agency is looking for an OnlyFans manager: running 2–4 model pages, content plan, chat-team coordination, analytics. Remote, $1,000–$3,000/mo.',
  keywords: [
    'onlyfans manager',
    'onlyfans manager vacancy',
    'work as onlyfans manager',
    'onlyfans management',
  ],
  cardSummary:
    'Running 2–4 model pages: content plan, chat-team coordination, promo and analytics. For those who can manage projects.',
  salaryLabel: '$1,000–3,000/mo',
  formatLabel: 'Remote · full-time',
  locationLabel: 'Remote (all of Ukraine)',
  intro: [
    'OFM Models agency is looking for an OnlyFans-project manager for remote work. The manager is the page’s conductor: they bring together the model’s content, the chat team’s work and the promo, watch the numbers and own the growth of their pages’ gross balance. There are 2–4 model pages in progress at once.',
    'This is a role for those who love managing processes and people. Experience specifically in OnlyFans isn’t required: we upskill strong candidates from SMM, production, e-commerce or project management in-house — the processes are honed on 220+ models since 2022, and for the first months we provide a mentor.',
  ],
  sections: [
    {
      heading: 'Responsibilities',
      bullets: [
        'Run 2–4 model pages: goals, content plan, publishing calendar',
        'Set tasks for the chat team and SMM: drop teasers, promo campaigns, shift coordination',
        'Analyse the data: subscriptions, sales, chat conversion, promo effectiveness',
        'Stay in touch with the models: content feedback, supporting consistency, a numbers review once a week',
        'Propose and test growth hypotheses: new formats, prices, promo channels',
      ],
    },
    {
      heading: 'Requirements',
      bullets: [
        'A year+ of experience managing projects, a team or clients: SMM, production, e-commerce, agencies',
        'English from B1: part of the materials and promo tools are in English',
        'Comfort with numbers: spreadsheets, funnels and metrics are your working language',
        'Self-organisation when remote and readiness to own the pages’ results',
        'A plus but not required: experience in the OnlyFans niche or adult marketing',
      ],
    },
    {
      heading: 'What we offer',
      bullets: [
        '$1,000–3,000 a month: a fixed rate + bonuses from the growth of your pages’ gross balance',
        'A fully remote format and flexible daily planning',
        'Onboarding and a mentor: processes, scripts, report templates — all already honed',
        'Growth to head of direction: the team is expanding, and we grow heads from within',
      ],
    },
    {
      heading: 'Pay and schedule',
      paragraphs: [
        'The range is $1,000–3,000 a month: the exact figure depends on experience, the number of pages and results. The rate is fixed, the bonus part is tied to the growth of the gross balance of the pages you run — the agency’s top-model pages reach $15,000–$50,000 gross a month, and the manager of such a page earns noticeably above the middle of the range.',
        'The schedule is full-time with flexible planning: what matters is the result and availability for the team during the key hours (evening US prime time), not "clocking in" from 9 to 6.',
      ],
    },
    {
      heading: 'What a manager’s working day looks like',
      paragraphs: [
        'The day starts with the numbers: you look at the dashboard for your pages — sales for the day, chat conversion, subscriber inflow. Then short syncs: with the chat team lead — on yesterday’s conversations and the plans for prime time, with SMM — on the promo posts. Before lunch — work with the models: feedback on the shot content, adjusting the shooting plan, agreeing a new drop.',
        'After that — an hour on analytics and hypotheses: what to change in prices, which format to test, where the funnel is stalling. In the evening you check readiness for US prime time: content uploaded, teasers with the chatters, promo scheduled. Once a week — a review of the results with the head and planning the next: goals for each page, experiments, what we scale.',
      ],
    },
  ],
  hiringHeading: 'How the selection goes',
  hiringSteps: [
    {
      title: 'Application',
      text: 'Message us on Telegram: a few words about your management experience and why the niche interests you.',
    },
    {
      title: 'Test case',
      text: 'A short analysis of a page’s numbers and an action plan for a month — 1–2 hours of work.',
    },
    { title: 'Interview', text: 'An online call: experience, the case, the range and the scope of responsibility.' },
    {
      title: 'Onboarding',
      text: 'A month with a mentor: processes, tools, your first page under your management.',
    },
  ],
  hiringNote: 'We reply within a day; from application to onboarding usually takes less than a week.',
  faqHeading: 'Common questions about the manager vacancy',
  faq: [
    {
      question: 'Do you need OnlyFans experience to become a manager?',
      answer:
        'No: experience managing projects, a team or clients matters more. The specifics of the niche — the processes, promo, the chat team’s work — we give at onboarding with a mentor.',
    },
    {
      question: 'How much does an OnlyFans manager earn?',
      answer:
        'On our team the range is $1,000–3,000 a month: a fixed rate + bonuses from the growth of the gross balance of the pages you run. We name the exact figure at the interview based on the test case.',
    },
    {
      question: 'Is this remote work?',
      answer:
        'Yes, fully: the team is distributed, processes live in Telegram and working spreadsheets. What matters is being in touch during the key hours — evening US prime time.',
    },
    {
      question: 'How does a manager differ from a chatter?',
      answer:
        'A chatter sells in the messaging during their shifts; a manager runs the pages as a whole: plan, team, promo, analytics. If messaging and sales are closer to you — see the chatter vacancy in this same section.',
    },
  ],
  cta: {
    heading: 'Apply for the vacancy',
    text: 'Message us on Telegram: your management experience, familiarity with the niche (if any) and a convenient time for a call. We reply within a day.',
    primaryLabel: 'Message us on Telegram',
  },
};

const ASSISTANT_EN: VacancyContent = {
  slug: 'assistant-onlyfans',
  role: 'Agency assistant',
  h1: 'OnlyFans agency assistant vacancy — remote, no experience',
  seoTitle: 'OnlyFans agency assistant vacancy — remote, from $600/mo, no experience',
  seoDescription:
    'OFM Models is looking for an assistant: helping managers, content calendar, spreadsheets and reports, first-line handling of applications. Remote, from $600/mo, no experience — we’ll train you.',
  keywords: [
    'onlyfans agency assistant',
    'onlyfans vacancies',
    'remote assistant job',
    'online job no experience',
  ],
  cardSummary:
    'Helping managers: content calendar, spreadsheets, reports, handling applications. An entry into the industry with no experience — with growth to manager.',
  salaryLabel: 'from $600/mo',
  formatLabel: 'Remote · part-time or full-time',
  locationLabel: 'Remote (all of Ukraine)',
  intro: [
    'OFM Models agency is looking for an assistant for remote work. This is the team’s operational heart: you help managers run model pages — you build the content calendar, keep spreadsheets and reports, prepare materials for publishing and handle incoming applications. No experience needed: we’ll teach you all the processes in the first couple of weeks.',
    'The role suits those who want to enter the niche from scratch and grow: an assistant sees the whole kitchen of the agency from the inside — from content to promo and analytics — and in 6–12 months can move up to manager or SMM. The format is flexible: you can combine it with study, starting from 20 hours a week.',
  ],
  sections: [
    {
      heading: 'Responsibilities',
      bullets: [
        'Keep the content calendar: collect materials from models, sort them into folders, track deadlines',
        'Prepare publications: descriptions, tags, scheduling posts from templates',
        'Update working spreadsheets: shifts, reports, the team’s checklists',
        'Handle incoming applications: first-line replies from a template, booking calls with a manager',
        'Help the manager with the routine: reminders, collecting statuses, small daily tasks',
      ],
    },
    {
      heading: 'Requirements',
      bullets: [
        '18+, attentiveness and accuracy: half the work is about "not losing or mixing anything up"',
        'Confident Google Sheets and Docs — or readiness to master them quickly',
        'Basic English (A2–B1): interfaces and part of the materials are in English',
        'From 20 hours a week and stable internet',
        'A calm attitude to the 18+ niche: model content is part of the working materials',
      ],
    },
    {
      heading: 'Pay and schedule',
      paragraphs: [
        'The start is from $600 a month part-time; when moving to full-time and expanding tasks the rate grows, reviewed every 3 months by results. The schedule is flexible: we agree daily "windows" for being in touch, the rest you plan yourself.',
        'This is the simplest entry into the industry: the next step is manager with a range of $1,000–3,000 a month, and we fill manager vacancies primarily with our own assistants.',
      ],
    },
    {
      heading: 'What an assistant’s working day looks like',
      paragraphs: [
        'The morning starts with a checklist: you verify that the content for yesterday’s deadlines came in from the models, sort the files, mark the gaps. Then — publications: from templates you prepare descriptions and schedule the day’s posts. During the day you handle incoming applications: reply from a template, clarify details, book calls for the manager.',
        'A couple of times a day you sync with the manager on Telegram: what’s urgent, what to move, where help is needed. Closer to evening you update the spreadsheets — chat-team shifts, task statuses, a mini daily report. On peak days (a new page launch, a big content drop) the focus shifts to preparing materials. There’s no chaos: every task has a template and a checklist.',
      ],
    },
  ],
  hiringHeading: 'How the selection goes',
  hiringSteps: [
    {
      title: 'Application',
      text: 'Message us on Telegram with a few words about yourself: age, city, how many hours a week you’re ready to work.',
    },
    { title: 'Test task', text: 'A small 30–40 minute practice: a spreadsheet + a couple of template tasks.' },
    { title: 'Interview', text: 'A short online call: we get to know each other, discuss schedule and rate.' },
    {
      title: 'Training and start',
      text: 'The first week — with a mentor on checklists, then on your own with the team’s support.',
    },
  ],
  hiringNote:
    'Getting started takes a few days. Combining with study is fine: the main thing is that your "windows" for being in touch are stable.',
  faqHeading: 'Common questions about the assistant vacancy',
  faq: [
    {
      question: 'Can you work as an assistant without experience?',
      answer:
        'Yes, the role is designed for a start from scratch: processes are described in checklists and templates, and the first week you work with a mentor. Attentiveness and consistency matter more than lines on a CV.',
    },
    {
      question: 'How much does an assistant get paid?',
      answer:
        'From $600 a month part-time, growing when moving to full-time and expanding tasks. The rate is reviewed every 3 months. The next step is manager with a range of $1,000–3,000.',
    },
    {
      question: 'Will I have to talk to subscribers?',
      answer:
        'No: messaging with fans is handled by the chat team. The assistant works with internal tasks — content, spreadsheets, applications and the calendar.',
    },
    {
      question: 'Is this work suitable for men?',
      answer:
        'Yes: as with the chatter, manager and SMM roles, gender doesn’t matter — accuracy and discipline are what count.',
    },
  ],
  cta: {
    heading: 'Apply for the vacancy',
    text: 'Message us on Telegram: a few words about yourself, hours a week and when you can start. We reply within a day.',
    primaryLabel: 'Message us on Telegram',
  },
};

const SMM_EN: VacancyContent = {
  slug: 'smm-onlyfans',
  role: 'SMM specialist',
  h1: 'OnlyFans agency SMM specialist vacancy — remote',
  seoTitle: 'OnlyFans agency SMM specialist vacancy — models’ social media, remote',
  seoDescription:
    'OFM Models is looking for an SMM specialist: models’ social media (Instagram, TikTok, Twitter/X, Reddit), adapting content, growing reach and traffic to pages. Remote.',
  keywords: ['onlyfans smm', 'smm onlyfans vacancy', 'remote smm specialist'],
  cardSummary:
    'Models’ social media: Instagram, TikTok, Twitter/X, Reddit — adapting content, publishing, growing reach and traffic to pages.',
  salaryLabel: 'Base rate + bonuses (discussed at the interview)',
  formatLabel: 'Remote · flexible schedule',
  locationLabel: 'Remote (all of Ukraine)',
  intro: [
    'OFM Models agency is looking for an SMM specialist for remote work. The task is traffic: you run the models’ social media (Instagram, TikTok, Twitter/X, Reddit), adapt the content to each platform’s rules and turn reach into page subscribers.',
    'Experience in the adult niche isn’t required: what matters more is a feel for the platforms — what takes off on TikTok, how Reddit works, why template posts die. We’ll teach the niche’s rules and safe presentation.',
  ],
  sections: [
    {
      heading: 'Responsibilities',
      bullets: [
        'Run the models’ accounts on Instagram, TikTok, Twitter/X and Reddit: content plan, publications, stories',
        'Adapt materials to platform rules: safe presentation, avoiding templates, trends',
        'Grow reach and convert it into subscribers of the model pages',
        'Test combinations: formats, hooks, posting times — and record the results',
      ],
    },
    {
      heading: 'Requirements',
      bullets: [
        'Experience running social media — your own or client projects, with examples',
        'An understanding of TikTok and Instagram Reels algorithms',
        'Basic English for working with an international audience',
        'A calm attitude to the 18+ niche',
      ],
    },
    {
      heading: 'Pay and format',
      paragraphs: [
        'Base rate + bonuses for growing the metrics; we discuss the exact range at the interview — it depends on experience and the number of projects. The schedule is flexible, the work fully remote. Inside — ready combinations, breakdowns and a mentor for the first month.',
      ],
    },
  ],
  hiringHeading: 'How the selection goes',
  hiringSteps: [
    { title: 'Application', text: 'Telegram + examples of work or accounts you’ve run.' },
    { title: 'Test task', text: 'A small adaptation of content for 1–2 platforms.' },
    { title: 'Call', text: 'We discuss the range, projects and start.' },
  ],
  faqHeading: 'Common questions about the SMM vacancy',
  faq: [
    {
      question: 'Do you need experience in the 18+ niche?',
      answer:
        'No: experience growing accounts on TikTok and Instagram matters more. The niche specifics — platform rules and safe presentation — we’ll teach you.',
    },
    {
      question: 'Is this remote work?',
      answer:
        'Yes, fully, with a flexible schedule: the result and consistency of publishing matter, not hours online.',
    },
    {
      question: 'How do I apply?',
      answer:
        'Message us on Telegram with examples of accounts you’ve run. We reply within a day, then comes a short test task and a call.',
    },
  ],
  cta: {
    heading: 'Apply for the vacancy',
    text: 'Message us on Telegram with examples of accounts or cases — we reply within a day.',
    primaryLabel: 'Message us on Telegram',
  },
};

export const VACANCIES_EN: Record<VacancySlug, VacancyContent> = {
  'chatter-onlyfans': CHATTER_EN,
  'model-onlyfans': MODEL_EN,
  'manager-onlyfans': MANAGER_EN,
  'assistant-onlyfans': ASSISTANT_EN,
  'smm-onlyfans': SMM_EN,
};
