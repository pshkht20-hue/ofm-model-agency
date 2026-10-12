#!/usr/bin/env node
/**
 * URL Inspection через GSC API (сервис-аккаунт). Использование:
 *   node scripts/seo-inspect-url.mjs <url1> [url2 ...]
 * Показывает: verdict, coverage, canonical, lastCrawl, indexingState.
 * (Создан 12.10.2026 при диагностике /uk/calculator — verdict PASS, проблема
 *  оказалась не технической: нет UK-спроса на калькулятор.)
 */
import { google } from 'googleapis';

const urls = process.argv.slice(2);
if (!urls.length) { console.error('usage: node scripts/seo-inspect-url.mjs <url...>'); process.exit(1); }
const auth = new google.auth.GoogleAuth({
  keyFile: '.credentials/google-service-account.json',
  scopes: ['https://www.googleapis.com/auth/webmasters'],
});
const sc = google.searchconsole({ version: 'v1', auth: await auth.getClient() });
for (const url of urls) {
  const r = await sc.urlInspection.index.inspect({
    requestBody: { inspectionUrl: url, siteUrl: 'sc-domain:ofmmodels.com', languageCode: 'ru' },
  });
  const x = r.data.inspectionResult.indexStatusResult;
  console.log('===', url);
  console.log('  verdict:', x.verdict, '| coverage:', x.coverageState);
  console.log('  lastCrawl:', x.lastCrawlTime, '| indexingState:', x.indexingState);
  console.log('  googleCanonical:', x.googleCanonical, '| userCanonical:', x.userCanonical);
}
