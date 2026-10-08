// Контроль эффективности изменений октября (директива владельца 09.10:
// «следи за эффективностью изменений и изменённых ссылок»).
// Пул целей = все страницы, затронутые поездами №1–3, Европой и контентом W2–W3.
// Запуск из корня репо: node scripts/seo-effect-watch.mjs [days]  (по умолчанию 10)
// Выводит по каждой цели дневной ряд i/c/p из GSC (dataState=all, свежий хвост).
import fs from 'node:fs';
import path from 'node:path';
import { google } from 'googleapis';
import { getAuthClient } from './google-auth.mjs';

const ROOT = process.cwd();
for (const line of fs.readFileSync(path.join(ROOT, '.env.local'), 'utf8').split('\n')) {
  const t = line.trim();
  if (!t || t.startsWith('#')) continue;
  const i = t.indexOf('=');
  if (i === -1) continue;
  if (!process.env[t.slice(0, i).trim()]) process.env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
}

// Цели: [метка, страница | null, запрос | null, гео-фильтр ISO3 | null]
const TARGETS = [
  // Поезд №1 (05.10): UK-пиллар и агенція
  ['Поезд1 UK-пиллар «це»', 'https://ofmmodels.com/uk/blog/chto-takoe-onlyfans', 'онліфанс це', null],
  ['Поезд1 драйвер «онліфанс»', 'https://ofmmodels.com/uk/blog/chto-takoe-onlyfans', 'онліфанс', null],
  ['Поезд1 kak-vybrat UK', 'https://ofmmodels.com/uk/blog/kak-vybrat-onlyfans-agentstvo', null, null],
  ['Поезд1 UK-оверлей v-ukraine', 'https://ofmmodels.com/uk/blog/onlyfans-v-ukraine', null, null],
  // Поезд №2 (07.10): jobs-хабы
  ['Поезд2 /vacancies RU', 'https://ofmmodels.com/vacancies', null, null],
  ['Поезд2 /uk/vacancies', 'https://ofmmodels.com/uk/vacancies', null, null],
  ['Поезд2 /en/vacancies', 'https://ofmmodels.com/en/vacancies', null, null],
  ['Поезд2 «onlyfans job» (EN-хаб)', 'https://ofmmodels.com/en/vacancies', 'onlyfans job', null],
  // Европа 09.10: germany/poland фактура + E2
  ['Европа germany EN', 'https://ofmmodels.com/en/vacancies/model/germany', null, null],
  ['Европа germany EN — гео DE', 'https://ofmmodels.com/en/vacancies/model/germany', null, 'deu'],
  ['Европа poland RU', 'https://ofmmodels.com/vacancies/model/poland', null, null],
  ['Европа poland UK', 'https://ofmmodels.com/uk/vacancies/model/poland', null, null],
  ['Европа за-кордоном', 'https://ofmmodels.com/blog/robota-dlya-ukrainok-za-kordonom', null, null],
  // Сироты 09.10
  ['Сироты /research RU', 'https://ofmmodels.com/research', null, null],
  ['Сироты /vacancies/for-girls', 'https://ofmmodels.com/vacancies/for-girls', null, null],
  ['Сироты /vacancies/model', 'https://ofmmodels.com/vacancies/model', null, null],
  ['Сироты /es/vacancies', 'https://ofmmodels.com/es/vacancies', null, null],
  // Контент W2–W3 (после деплоя строки оживут)
  ['W2 LoyalFans+Fansly', 'https://ofmmodels.com/blog/loyalfans-fansly-chto-eto', null, null],
  ['W2 Як заробляти (UK)', 'https://ofmmodels.com/uk/blog/kak-zarabatyvat-na-onlyfans', null, null],
  ['W3 Налоги ЕС', 'https://ofmmodels.com/blog/onlyfans-nalogi-i-legalnost-v-es', null, null],
  ['W3 Агенція зсередини (UK)', 'https://ofmmodels.com/uk/blog/onlyfans-agentstvo-iznutri', null, null],
  ['EN beginners', 'https://ofmmodels.com/en/blog/onlyfans-agency-for-beginners', null, null],
  ['EN how-to-join', 'https://ofmmodels.com/en/blog/how-to-join-onlyfans-agency', null, null],
  ['EN switch (оверлей)', 'https://ofmmodels.com/en/blog/kak-smenit-onlyfans-agentstvo', null, null],
  ['EN mature (оверлей)', 'https://ofmmodels.com/en/blog/mature-modeli-onlyfans', null, null],
];

const auth = await getAuthClient(google);
async function q(body) {
  const token = await auth.getAccessToken();
  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent('sc-domain:ofmmodels.com')}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.token ?? token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  );
  if (!res.ok) throw new Error(`GSC ${res.status}`);
  return (await res.json()).rows ?? [];
}

const days = Number(process.argv[2] ?? 10);
const end = new Date();
const start = new Date(end.getTime() - days * 86400000);
const fmt = (d) => d.toISOString().slice(0, 10);

for (const [label, page, query, country] of TARGETS) {
  const filters = [];
  if (page) filters.push({ dimension: 'page', operator: 'equals', expression: page });
  if (query) filters.push({ dimension: 'query', operator: 'equals', expression: query });
  if (country) filters.push({ dimension: 'country', operator: 'equals', expression: country });
  const rows = await q({
    startDate: fmt(start),
    endDate: fmt(end),
    dimensions: ['date'],
    dataState: 'all',
    dimensionFilterGroups: [{ filters }],
    rowLimit: days + 2,
  });
  const line = rows.map((r) => `${r.keys[0].slice(5)}: i${r.impressions}/c${r.clicks}/p${r.position.toFixed(1)}`).join(' · ');
  console.log(`\n${label}\n  ${line || '— нет данных (не в индексе или лаг GSC 2–3 дня)'}`);
}
console.log('\nПравило чтения: одиночный день ≠ вердикт; тренды смотреть от 4+ дней после деплоя. Контрольные даты: 12.10 (поезда №1–2), 16–17.10 (поезд №3/jobs), 22.10 (Европа+сироты), 28–30.10 (общий замер корзин).');
