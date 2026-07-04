// Отправка sitemap в Google Search Console с полным (не readonly) scope.
// Обход ограничения mcp-server-gsc, который зашивает webmasters.readonly.
// Запуск: node scripts/seo-submit-sitemap.mjs
import { google } from 'googleapis';

const SITE_URL = 'sc-domain:ofmmodels.com';
const SITEMAP_URL = 'https://ofmmodels.com/sitemap.xml';

const auth = new google.auth.GoogleAuth({
  keyFile: '.credentials/google-service-account.json',
  scopes: ['https://www.googleapis.com/auth/webmasters'],
});

const webmasters = google.webmasters({ version: 'v3', auth });

await webmasters.sitemaps.submit({ siteUrl: SITE_URL, feedpath: SITEMAP_URL });
console.log(`OK: sitemap отправлен — ${SITEMAP_URL}`);

const { data } = await webmasters.sitemaps.get({ siteUrl: SITE_URL, feedpath: SITEMAP_URL });
console.log(`Статус: lastSubmitted=${data.lastSubmitted}, lastDownloaded=${data.lastDownloaded ?? '—'}, errors=${data.errors ?? 0}, warnings=${data.warnings ?? 0}`);
