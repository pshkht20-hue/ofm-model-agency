#!/usr/bin/env node
/**
 * Fetches GSC + GA4 data and writes docs/analytics-reports/latest-report.md
 *
 * Requires one-time setup — see docs/analytics-setup.md
 *
 * Env (from .env.local or shell):
 *   GOOGLE_APPLICATION_CREDENTIALS — path to service account JSON
 *   GSC_SITE_URL — e.g. sc-domain:ofmmodels.com
 *   GA4_PROPERTY_ID — numeric property ID (Admin → Property settings)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getAuthClient, hasOAuthToken } from './google-auth.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'docs', 'analytics-reports');

// npm run seo:report не подхватывает .env.local сам по себе (Node не читает
// dotenv-файлы автоматически) — без этого лоадера скрипт молча деградировал
// в заглушку "setup required". Тот же паттерн, что в seo-daily-telegram.mjs.
function loadEnvLocal() {
  const envPath = path.join(ROOT, '.env.local');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}
loadEnvLocal();

const CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const GSC_SITE = process.env.GSC_SITE_URL ?? 'sc-domain:ofmmodels.com';
const GA4_PROPERTY = process.env.GA4_PROPERTY_ID;

const DATE_LABEL = new Date().toISOString().slice(0, 10);
const DAYS = 28;

function ensureOutDir() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function writeSetupRequired(reason) {
  ensureOutDir();
  const md = `# SEO Report — setup required

**Generated:** ${new Date().toISOString()}

## Status

${reason}

## One-time setup (≈15 min)

Follow **docs/analytics-setup.md** in the project root.

After setup, run:

\`\`\`bash
npm run seo:report
\`\`\`

The agent (Cursor) can then read this file automatically and give data-driven SEO advice.
`;
  fs.writeFileSync(path.join(OUT_DIR, 'latest-report.md'), md, 'utf8');
  console.log('Wrote docs/analytics-reports/latest-report.md (setup required)');
}

function toCsv(rows, headers) {
  const escape = (v) => {
    const s = String(v ?? '');
    return s.includes(',') || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [headers.join(','), ...rows.map((r) => headers.map((h) => escape(r[h])).join(','))].join(
    '\n',
  );
}

function formatDate(d) {
  return d.toISOString().slice(0, 10);
}

async function main() {
  const hasServiceAccount = CREDENTIALS && fs.existsSync(CREDENTIALS);
  const hasOAuth = hasOAuthToken();

  if (!hasServiceAccount && !hasOAuth) {
    console.error(
      'ОТЧЁТ НЕ СОБРАН: нет доступа к Google API — GOOGLE_APPLICATION_CREDENTIALS не задан/файл не найден и OAuth-токен отсутствует. Проверь .env.local и docs/analytics-setup.md.',
    );
    writeSetupRequired(
      'No auth configured. Use OAuth (recommended): `.credentials/oauth-client.json` + `npm run seo:auth`, or service account in `.env.local`. See docs/analytics-setup.md.',
    );
    process.exit(0);
  }

  if (!GA4_PROPERTY) {
    console.error(
      'GA4 отключён: нет GA4_PROPERTY_ID (проверь .env.local — GA4 → Admin → Property settings, числовой ID). Отчёт заменён заглушкой.',
    );
    writeSetupRequired(
      'Missing `GA4_PROPERTY_ID`. Find it in GA4 → Admin → Property settings (numeric ID).',
    );
    process.exit(0);
  }

  let apis;
  try {
    const mod = await import('googleapis');
    apis = mod.google;
  } catch {
    writeSetupRequired(
      'Package `googleapis` not installed. Run: `npm install` (devDependency).',
    );
    process.exit(0);
  }

  const authClient = await getAuthClient(apis);
  if (!authClient) {
    writeSetupRequired('Could not build Google auth client. Run `npm run seo:auth` or check `.env.local`.');
    process.exit(0);
  }

  const end = new Date();
  const start = new Date(end);
  start.setDate(start.getDate() - DAYS);

  const gsc = apis.webmasters({ version: 'v3', auth: authClient });
  const analyticsData = apis.analyticsdata({ version: 'v1beta', auth: authClient });

  const gscBody = {
    startDate: formatDate(start),
    endDate: formatDate(end),
    dimensions: ['query'],
    rowLimit: 50,
  };

  const gscPagesBody = {
    startDate: formatDate(start),
    endDate: formatDate(end),
    dimensions: ['page'],
    rowLimit: 30,
  };

  const gscCountriesBody = {
    startDate: formatDate(start),
    endDate: formatDate(end),
    dimensions: ['country'],
    rowLimit: 20,
  };

  let queries = [];
  let pages = [];
  let countries = [];
  let ga4Sessions = 0;
  let ga4Organic = 0;
  let ga4TopPages = [];
  let ga4Countries = [];
  const errors = [];

  try {
    const qRes = await gsc.searchanalytics.query({ siteUrl: GSC_SITE, requestBody: gscBody });
    queries = (qRes.data.rows ?? []).map((r) => ({
      query: r.keys?.[0] ?? '',
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
      ctr: ((r.ctr ?? 0) * 100).toFixed(2),
      position: (r.position ?? 0).toFixed(1),
    }));
  } catch (e) {
    errors.push(`GSC queries: ${e.message}`);
  }

  try {
    const pRes = await gsc.searchanalytics.query({ siteUrl: GSC_SITE, requestBody: gscPagesBody });
    pages = (pRes.data.rows ?? []).map((r) => ({
      page: r.keys?.[0] ?? '',
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
      ctr: ((r.ctr ?? 0) * 100).toFixed(2),
      position: (r.position ?? 0).toFixed(1),
    }));
  } catch (e) {
    errors.push(`GSC pages: ${e.message}`);
  }

  try {
    const cRes = await gsc.searchanalytics.query({
      siteUrl: GSC_SITE,
      requestBody: gscCountriesBody,
    });
    countries = (cRes.data.rows ?? []).map((r) => ({
      country: r.keys?.[0] ?? '',
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
    }));
  } catch (e) {
    errors.push(`GSC countries: ${e.message}`);
  }

  const property = `properties/${GA4_PROPERTY}`;

  try {
    const sessionsRes = await analyticsData.properties.runReport({
      property,
      requestBody: {
        dateRanges: [{ startDate: formatDate(start), endDate: formatDate(end) }],
        metrics: [{ name: 'sessions' }],
      },
    });
    ga4Sessions = Number(sessionsRes.data.rows?.[0]?.metricValues?.[0]?.value ?? 0);
  } catch (e) {
    errors.push(`GA4 sessions: ${e.message}`);
  }

  try {
    const organicRes = await analyticsData.properties.runReport({
      property,
      requestBody: {
        dateRanges: [{ startDate: formatDate(start), endDate: formatDate(end) }],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }],
        dimensionFilter: {
          filter: {
            fieldName: 'sessionDefaultChannelGroup',
            stringFilter: { matchType: 'EXACT', value: 'Organic Search' },
          },
        },
      },
    });
    ga4Organic = Number(organicRes.data.rows?.[0]?.metricValues?.[0]?.value ?? 0);
  } catch (e) {
    errors.push(`GA4 organic: ${e.message}`);
  }

  try {
    const topRes = await analyticsData.properties.runReport({
      property,
      requestBody: {
        dateRanges: [{ startDate: formatDate(start), endDate: formatDate(end) }],
        dimensions: [{ name: 'landingPagePlusQueryString' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 15,
      },
    });
    ga4TopPages = (topRes.data.rows ?? []).map((r) => ({
      page: r.dimensionValues?.[0]?.value ?? '',
      sessions: r.metricValues?.[0]?.value ?? '0',
    }));
  } catch (e) {
    errors.push(`GA4 pages: ${e.message}`);
  }

  try {
    const geoRes = await analyticsData.properties.runReport({
      property,
      requestBody: {
        dateRanges: [{ startDate: formatDate(start), endDate: formatDate(end) }],
        dimensions: [{ name: 'country' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 15,
      },
    });
    ga4Countries = (geoRes.data.rows ?? []).map((r) => ({
      country: r.dimensionValues?.[0]?.value ?? '',
      sessions: r.metricValues?.[0]?.value ?? '0',
    }));
  } catch (e) {
    errors.push(`GA4 geo: ${e.message}`);
  }

  ensureOutDir();

  const totalClicks = queries.reduce((s, r) => s + Number(r.clicks), 0);
  const totalImpressions = queries.reduce((s, r) => s + Number(r.impressions), 0);

  fs.writeFileSync(
    path.join(OUT_DIR, `gsc-queries-${DATE_LABEL}.csv`),
    toCsv(queries, ['query', 'clicks', 'impressions', 'ctr', 'position']),
    'utf8',
  );
  fs.writeFileSync(
    path.join(OUT_DIR, `gsc-pages-${DATE_LABEL}.csv`),
    toCsv(pages, ['page', 'clicks', 'impressions', 'ctr', 'position']),
    'utf8',
  );
  fs.writeFileSync(
    path.join(OUT_DIR, `gsc-countries-${DATE_LABEL}.csv`),
    toCsv(countries, ['country', 'clicks', 'impressions']),
    'utf8',
  );

  const lowCtr = pages.filter((p) => Number(p.impressions) >= 20 && Number(p.ctr) < 2);
  const quickWins = queries.filter(
    (q) => Number(q.impressions) >= 10 && Number(q.position) <= 15 && Number(q.clicks) < 3,
  );

  const md = `# SEO Analytics Report

**Generated:** ${new Date().toISOString()}  
**Period:** last ${DAYS} days (${formatDate(start)} → ${formatDate(end)})  
**Site:** ${GSC_SITE}  
**GA4 property:** ${GA4_PROPERTY}

---

## Summary

| Metric | Value |
|--------|-------|
| GSC impressions (top queries sum) | ${totalImpressions} |
| GSC clicks (top queries sum) | ${totalClicks} |
| GA4 sessions | ${ga4Sessions} |
| GA4 organic sessions | ${ga4Organic} |

${errors.length ? `### API warnings\n${errors.map((e) => `- ${e}`).join('\n')}\n` : ''}

---

## Top search queries (GSC)

| Query | Clicks | Impressions | CTR % | Position |
|-------|--------|-------------|-------|----------|
${queries
  .slice(0, 15)
  .map(
    (q) =>
      `| ${q.query} | ${q.clicks} | ${q.impressions} | ${q.ctr} | ${q.position} |`,
  )
  .join('\n')}

---

## Top pages (GSC)

| Page | Clicks | Impressions | CTR % | Position |
|------|--------|-------------|-------|----------|
${pages
  .slice(0, 10)
  .map(
    (p) =>
      `| ${p.page} | ${p.clicks} | ${p.impressions} | ${p.ctr} | ${p.position} |`,
  )
  .join('\n')}

---

## Countries (GSC)

| Country | Clicks | Impressions |
|---------|--------|-------------|
${countries
  .slice(0, 10)
  .map((c) => `| ${c.country} | ${c.clicks} | ${c.impressions} |`)
  .join('\n')}

---

## GA4 landing pages

| Page | Sessions |
|------|----------|
${ga4TopPages.map((p) => `| ${p.page} | ${p.sessions} |`).join('\n')}

---

## GA4 countries

| Country | Sessions |
|---------|----------|
${ga4Countries.map((c) => `| ${c.country} | ${c.sessions} |`).join('\n')}

---

## Auto-detected actions (for agent)

### Low CTR pages (impressions ≥ 20, CTR < 2%)
${lowCtr.length ? lowCtr.map((p) => `- \`${p.page}\` — CTR ${p.ctr}%, pos ${p.position}`).join('\n') : '- None yet (need more data)'}

### Quick-win queries (pos ≤ 15, impressions ≥ 10, clicks < 3)
${quickWins.length ? quickWins.map((q) => `- «${q.query}» — pos ${q.position}, ${q.impressions} impr.`).join('\n') : '- None yet (need more data)'}

### Geo focus (target: UA, MD, AR, LatAm)
- Ukraine in GSC: ${countries.find((c) => c.country === 'ukr')?.impressions ?? 0} impressions
- Moldova: ${countries.find((c) => c.country === 'mda')?.impressions ?? 0} impressions
- Argentina: ${countries.find((c) => c.country === 'arg')?.impressions ?? 0} impressions

---

## Raw exports

- \`gsc-queries-${DATE_LABEL}.csv\`
- \`gsc-pages-${DATE_LABEL}.csv\`
- \`gsc-countries-${DATE_LABEL}.csv\`

> Cursor agent: read this file and propose a 2-week SEO backlog (code + content).
`;

  fs.writeFileSync(path.join(OUT_DIR, 'latest-report.md'), md, 'utf8');
  console.log('SEO report written to docs/analytics-reports/latest-report.md');
}

main().catch((err) => {
  console.error(err);
  writeSetupRequired(`Unexpected error: ${err.message}`);
  process.exit(1);
});
