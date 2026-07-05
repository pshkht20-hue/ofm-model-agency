/**
 * SEO-алерты: сравнение последних 7 полных дней GSC с предыдущими 7 + дельты
 * rank-истории (scripts/seo-positions.mjs). Пороги:
 *  - клики сайта WoW −30% | показы −25%  → 🔴
 *  - страница из топ-20 по кликам теряет >50% кликов → 🟡
 *  - ключ ядра −5 позиций или выпал из ТОП-10 (по rank-history) → 🟡
 * Telegram-сообщение шлётся ТОЛЬКО при наличии алертов (--notify), чтобы не шуметь.
 * Запуск: npm run seo:alerts [-- --notify]
 * Авторизация: сервис-аккаунт (GOOGLE_APPLICATION_CREDENTIALS) или OAuth (GitHub Actions).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { google } from 'googleapis';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function loadEnvLocal() {
  const envPath = path.join(root, '.env.local');
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

const GSC_SITE = process.env.GSC_SITE_URL ?? 'sc-domain:ofmmodels.com';
const HISTORY_DIR = path.join(root, 'docs', 'analytics-reports', 'rank-history');
const NOTIFY = process.argv.includes('--notify');

function getAuth() {
  const credsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (credsPath && fs.existsSync(path.resolve(root, credsPath))) {
    return new google.auth.GoogleAuth({
      keyFile: path.resolve(root, credsPath),
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });
  }
  const clientJson = process.env.GOOGLE_OAUTH_CLIENT_JSON;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
  if (clientJson && refreshToken) {
    const parsed = JSON.parse(clientJson);
    const cfg = parsed.installed ?? parsed.web ?? parsed;
    const client = new google.auth.OAuth2(cfg.client_id, cfg.client_secret);
    client.setCredentials({ refresh_token: refreshToken });
    return client;
  }
  return null;
}

function fmt(d) {
  return d.toISOString().slice(0, 10);
}

async function gscTotals(webmasters, startDate, endDate, dimensions = []) {
  const res = await webmasters.searchanalytics.query({
    siteUrl: GSC_SITE,
    requestBody: { startDate, endDate, dimensions, rowLimit: dimensions.length ? 100 : 1 },
  });
  return res.data.rows ?? [];
}

function rankHistoryDelta() {
  if (!fs.existsSync(HISTORY_DIR)) return [];
  const files = fs.readdirSync(HISTORY_DIR).filter((f) => f.startsWith('positions-')).sort();
  if (files.length < 2) return [];
  const latest = JSON.parse(fs.readFileSync(path.join(HISTORY_DIR, files[files.length - 1]), 'utf8'));
  // сравниваем с файлом ~неделю назад (или самым старым из доступных в пределах 8)
  const weekAgoIdx = Math.max(0, files.length - 8);
  const base = JSON.parse(fs.readFileSync(path.join(HISTORY_DIR, files[weekAgoIdx]), 'utf8'));
  const baseMap = new Map(base.results.map((r) => [`${r.kw}|${r.lang}`, r]));
  const alerts = [];
  for (const r of latest.results) {
    const b = baseMap.get(`${r.kw}|${r.lang}`);
    if (!b) continue;
    if (b.pos !== null && r.pos !== null && r.pos - b.pos >= 5) {
      alerts.push(`🟡 «${r.kw}» [${r.lang}] просел: ${b.pos} → ${r.pos} (за ${files.length - 1 - weekAgoIdx} замеров)`);
    }
    if (b.pos !== null && b.pos <= 10 && (r.pos === null || r.pos > 10)) {
      alerts.push(`🔴 «${r.kw}» [${r.lang}] выпал из ТОП-10: ${b.pos} → ${r.pos ?? '>20'}`);
    }
  }
  return alerts;
}

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) {
    console.log('(Telegram не настроен — пропускаю отправку)');
    return;
  }
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true }),
  });
}

async function main() {
  const alerts = [];
  const info = [];

  const auth = getAuth();
  if (!auth) {
    console.error('АЛЕРТЫ ЧАСТИЧНЫ: нет доступа к GSC (ни сервис-аккаунта, ни OAuth) — проверяю только rank-history.');
  } else {
    const webmasters = google.webmasters({ version: 'v3', auth });
    // GSC лагает ~2 дня: берём окно [сегодня-9 .. сегодня-3] vs [сегодня-16 .. сегодня-10]
    const now = new Date();
    const d = (n) => new Date(now.getTime() - n * 86400000);
    const curStart = fmt(d(9));
    const curEnd = fmt(d(3));
    const prevStart = fmt(d(16));
    const prevEnd = fmt(d(10));

    const [cur] = await gscTotals(webmasters, curStart, curEnd);
    const [prev] = await gscTotals(webmasters, prevStart, prevEnd);
    const cc = cur?.clicks ?? 0;
    const pc = prev?.clicks ?? 0;
    const ci = cur?.impressions ?? 0;
    const pi = prev?.impressions ?? 0;

    info.push(`GSC 7д: клики ${pc} → ${cc}, показы ${pi} → ${ci}`);
    if (pc >= 10 && cc < pc * 0.7) alerts.push(`🔴 Клики сайта упали на ${Math.round((1 - cc / pc) * 100)}% WoW (${pc} → ${cc})`);
    if (pi >= 200 && ci < pi * 0.75) alerts.push(`🔴 Показы сайта упали на ${Math.round((1 - ci / pi) * 100)}% WoW (${pi} → ${ci})`);

    // Топ-страницы: падение кликов > 50%
    const curPages = await gscTotals(webmasters, curStart, curEnd, ['page']);
    const prevPages = await gscTotals(webmasters, prevStart, prevEnd, ['page']);
    const prevTop = prevPages.filter((r) => r.clicks >= 3).sort((a, b) => b.clicks - a.clicks).slice(0, 20);
    const curMap = new Map(curPages.map((r) => [r.keys[0], r]));
    for (const p of prevTop) {
      const c = curMap.get(p.keys[0]);
      const curClicks = c?.clicks ?? 0;
      if (curClicks < p.clicks * 0.5) {
        const pagePath = p.keys[0].replace(/^https?:\/\/[^/]+/, '');
        alerts.push(`🟡 Страница ${pagePath}: клики ${p.clicks} → ${curClicks} (−${Math.round((1 - curClicks / p.clicks) * 100)}%)`);
      }
    }
  }

  alerts.push(...rankHistoryDelta());

  if (alerts.length === 0) {
    console.log('✅ Алертов нет.' + (info.length ? ' ' + info.join(' | ') : ''));
    return;
  }

  const msg = `🚨 <b>SEO-алерты ofmmodels.com</b> (${fmt(new Date())})\n\n${alerts.join('\n')}\n\n${info.join('\n')}`;
  console.log(msg.replace(/<\/?b>/g, ''));
  if (NOTIFY) {
    await sendTelegram(msg);
    console.log('\nTelegram-алерт отправлен.');
  }
}

main().catch((e) => {
  console.error('ОШИБКА seo-alerts:', e.message);
  process.exit(1);
});
