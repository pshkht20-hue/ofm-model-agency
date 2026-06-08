#!/usr/bin/env node
/**
 * Daily SEO digest: fetch GSC + GA4 → recommendations → Telegram.
 * Scheduled via GitHub Actions — see docs/analytics-telegram-daily.md
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { buildSeoRecommendations, formatTelegramReport, escapeTelegramHtml } from './seo-recommendations.mjs';
import { loadSeoPlan, buildPlanActions, formatPlanTelegramSection } from './seo-plan.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

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

function parseReportMd(md) {
  const getMetric = (label) => {
    const re = new RegExp(`\\| ${label} \\| (\\d+) \\|`);
    const m = md.match(re);
    return m ? Number(m[1]) : 0;
  };

  const parseTable = (section) => {
    const block = md.split(section)[1]?.split('---')[0] ?? '';
    const rows = [];
    for (const line of block.split('\n')) {
      if (!line.startsWith('|') || line.includes('---') || line.includes('Query') || line.includes('Page |') || line.includes('Country |')) {
        continue;
      }
      const cells = line
        .split('|')
        .map((c) => c.trim())
        .filter(Boolean);
      if (cells.length >= 2) rows.push(cells);
    }
    return rows;
  };

  const queryRows = parseTable('## Top search queries');
  const pageRows = parseTable('## Top pages');
  const countryRows = parseTable('## Countries');

  const errors = [...md.matchAll(/^- (GSC|GA4)[^\n]+/gm)].map((m) => m[0].slice(2));

  return {
    totalImpressions: getMetric('GSC impressions \\(top queries sum\\)') || getMetric('GSC impressions (top queries sum)'),
    totalClicks: getMetric('GSC clicks \\(top queries sum\\)') || getMetric('GSC clicks (top queries sum)'),
    ga4Sessions: getMetric('GA4 sessions'),
    ga4Organic: getMetric('GA4 organic sessions'),
    periodDays: 28,
    queries: queryRows.map((c) => ({
      query: c[0],
      clicks: c[1],
      impressions: c[2],
      ctr: c[3],
      position: c[4],
    })),
    pages: pageRows.map((c) => ({
      page: c[0],
      clicks: c[1],
      impressions: c[2],
      ctr: c[3],
      position: c[4],
    })),
    countries: countryRows.map((c) => ({
      country: c[0],
      clicks: c[1],
      impressions: c[2],
    })),
    errors,
  };
}

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) {
    throw new Error('TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID не заданы');
  }

  const payloads = [
    { parse_mode: 'HTML' },
    { parse_mode: undefined },
  ];

  let lastError = '';
  for (const extra of payloads) {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
        ...extra,
      }),
    });

    if (response.ok) return;

    lastError = await response.text();
  }

  throw new Error(`Telegram API error: ${lastError}`);
}

function validateEnv() {
  const required = [
    'TELEGRAM_BOT_TOKEN',
    'TELEGRAM_CHAT_ID',
    'GA4_PROPERTY_ID',
    'GOOGLE_OAUTH_CLIENT_JSON',
    'GOOGLE_OAUTH_REFRESH_TOKEN',
  ];
  const missing = required.filter((key) => !process.env[key]?.trim());
  if (missing.length) {
    throw new Error(`Не заданы секреты GitHub: ${missing.join(', ')}`);
  }
}

async function main() {
  loadEnvLocal();
  validateEnv();

  const reportScript = path.join(ROOT, 'scripts', 'seo-report.mjs');
  const report = spawnSync(process.execPath, [reportScript], {
    cwd: ROOT,
    env: process.env,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (report.status !== 0) {
    throw new Error('seo-report failed');
  }

  const reportPath = path.join(ROOT, 'docs', 'analytics-reports', 'latest-report.md');
  const md = fs.readFileSync(reportPath, 'utf8');
  const data = parseReportMd(md);
  const recommendations = buildSeoRecommendations(data);
  const plan = loadSeoPlan();
  const planContext = buildPlanActions(plan);
  const planSection = formatPlanTelegramSection(planContext, escapeTelegramHtml);
  const message = formatTelegramReport(data, recommendations, planSection);

  await sendTelegram(message);
  console.log('SEO digest sent to Telegram');
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
