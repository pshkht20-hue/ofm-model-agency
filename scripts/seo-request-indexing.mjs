// Мгновенный запрос индексации через Google Indexing API (официально — для страниц с JobPosting).
// Запуск: node scripts/seo-request-indexing.mjs <url1> <url2> ...
// Без аргументов пингует /join во всех локалях.
import { google } from 'googleapis';

const DEFAULT_URLS = [
  'https://ofmmodels.com/join',
  'https://ofmmodels.com/uk/join',
  'https://ofmmodels.com/en/join',
  'https://ofmmodels.com/es/join',
];

// Белый список (18.10.2026, YT-свод + дока Google): Indexing API принимает ТОЛЬКО
// страницы с JobPosting-разметкой. С 09.2024 Google гоняет антиспам-проверки по API
// и за нецелевые URL (блог, статика) можно потерять доступ целиком. Блог-URL после
// деплоя идут через sitemap-пинг и ручной Request Indexing в GSC у владельца.
const JOB_POSTING_PATH = /^https:\/\/ofmmodels\.com\/(uk\/|en\/|es\/)?(join$|vacancies(\/|$))/;

const requested = process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT_URLS;
const urls = requested.filter((u) => {
  if (JOB_POSTING_PATH.test(u)) return true;
  console.log(`SKIP (не JobPosting-страница, Indexing API запрещён): ${u}`);
  return false;
});

const auth = new google.auth.GoogleAuth({
  keyFile: '.credentials/google-service-account.json',
  scopes: ['https://www.googleapis.com/auth/indexing'],
});
const client = await auth.getClient();

for (const url of urls) {
  try {
    await client.request({
      url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
      method: 'POST',
      data: { url, type: 'URL_UPDATED' },
    });
    console.log(`OK: ${url}`);
  } catch (e) {
    console.log(`ERROR ${e.response?.status ?? ''}: ${url} — ${e.response?.data?.error?.message ?? e.message}`);
  }
}
