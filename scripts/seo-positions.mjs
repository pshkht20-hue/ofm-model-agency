/**
 * Rank-трекер точных позиций на DataForSEO SERP API (Google Ukraine, mobile).
 * Ядро ключей: config/seo-keywords.json (daily + weekly по понедельникам или --full).
 * История: docs/analytics-reports/rank-history/positions-YYYY-MM-DD.json (gitignored).
 * Дельты против предыдущего замера + флаги: вход/выход из ТОП-10, смена целевого URL
 * (каннибализация), наличие AI Overview и PAA в выдаче.
 * Запуск: npm run seo:positions [-- --full] [-- --notify]
 * Стоимость: ~$0.0025/ключ (live advanced, depth 20) ≈ $0.04/день на daily-ядре.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
// креды также могут лежать в .claude/settings.local.json (env-блок) — подхватим и оттуда
function loadClaudeLocalEnv() {
  const p = path.join(root, '.claude', 'settings.local.json');
  if (!fs.existsSync(p)) return;
  try {
    const env = JSON.parse(fs.readFileSync(p, 'utf8'))?.env ?? {};
    for (const [k, v] of Object.entries(env)) {
      if (v && !process.env[k]) process.env[k] = v;
    }
  } catch {
    /* ignore */
  }
}
loadClaudeLocalEnv();

const LOGIN = process.env.DATAFORSEO_USERNAME?.trim();
const PASS = process.env.DATAFORSEO_PASSWORD?.trim();
const TARGET = 'ofmmodels.com';
const HISTORY_DIR = path.join(root, 'docs', 'analytics-reports', 'rank-history');
const CONFIG = JSON.parse(fs.readFileSync(path.join(root, 'config', 'seo-keywords.json'), 'utf8'));

const args = process.argv.slice(2);
const isMonday = new Date().getUTCDay() === 1;
const FULL = args.includes('--full') || isMonday;
const NOTIFY = args.includes('--notify');

if (!LOGIN || !PASS) {
  console.error('ПОЗИЦИИ НЕ СНЯТЫ: нет DATAFORSEO_USERNAME/DATAFORSEO_PASSWORD в env/.env.local/.claude/settings.local.json');
  process.exit(1);
}

const auth = 'Basic ' + Buffer.from(`${LOGIN}:${PASS}`).toString('base64');

async function dfs(pathname, body) {
  const res = await fetch(`https://api.dataforseo.com${pathname}`, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: auth, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

async function checkBalance() {
  const d = await dfs('/v3/appendix/user_data');
  return d?.tasks?.[0]?.result?.[0]?.money?.balance ?? null;
}

async function serp(kw, lang) {
  const d = await dfs('/v3/serp/google/organic/live/advanced', [
    {
      keyword: kw,
      location_code: CONFIG.location_code,
      language_code: lang,
      device: CONFIG.device ?? 'mobile',
      depth: 20,
    },
  ]);
  const cost = d?.cost ?? 0;
  const task = d?.tasks?.[0];
  if (task?.status_code !== 20000) {
    return { kw, lang, error: task?.status_message ?? d?.status_message, cost };
  }
  const result = task.result?.[0] ?? {};
  const items = result.items ?? [];
  const organic = items.filter((i) => i.type === 'organic');
  const hit = organic.find((i) => (i.url ?? '').includes(TARGET));
  return {
    kw,
    lang,
    pos: hit ? hit.rank_absolute : null,
    url: hit ? hit.url.replace(/^https?:\/\/[^/]+/, '') || '/' : null,
    aiOverview: items.some((i) => i.type === 'ai_overview'),
    paa: items.some((i) => i.type === 'people_also_ask'),
    cost,
  };
}

function latestSnapshot() {
  if (!fs.existsSync(HISTORY_DIR)) return null;
  const files = fs.readdirSync(HISTORY_DIR).filter((f) => f.startsWith('positions-')).sort();
  if (!files.length) return null;
  return JSON.parse(fs.readFileSync(path.join(HISTORY_DIR, files[files.length - 1]), 'utf8'));
}

function fmtPos(p) {
  return p === null || p === undefined ? '—' : String(p);
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
  const balance = await checkBalance();
  const prev = latestSnapshot();
  const keywords = FULL ? [...CONFIG.daily, ...CONFIG.weekly] : CONFIG.daily;

  console.log(`Rank-трекер: ${keywords.length} ключей (${FULL ? 'FULL' : 'daily'}), баланс DataForSEO: $${balance}`);

  const results = [];
  let totalCost = 0;
  for (const { kw, lang } of keywords) {
    const r = await serp(kw, lang);
    totalCost += r.cost ?? 0;
    results.push(r);
    if (r.error) console.log(`  ✗ ${kw} [${lang}]: ${r.error}`);
  }

  const date = new Date().toISOString().slice(0, 10);
  fs.mkdirSync(HISTORY_DIR, { recursive: true });
  const snapshot = { date, full: FULL, balance, cost: +totalCost.toFixed(4), results };
  fs.writeFileSync(path.join(HISTORY_DIR, `positions-${date}.json`), JSON.stringify(snapshot, null, 2));

  // Дельты
  const prevMap = new Map((prev?.results ?? []).map((r) => [`${r.kw}|${r.lang}`, r]));
  const lines = [];
  const movers = [];
  for (const r of results) {
    if (r.error) continue;
    const p = prevMap.get(`${r.kw}|${r.lang}`);
    let delta = '';
    if (p && p.pos !== undefined) {
      if (p.pos !== null && r.pos !== null) {
        const d = p.pos - r.pos;
        if (d !== 0) delta = d > 0 ? ` ↑${d}` : ` ↓${-d}`;
        if (Math.abs(d) >= 3) movers.push(`${d > 0 ? '📈' : '📉'} ${r.kw} [${r.lang}]: ${p.pos} → ${r.pos}`);
        if (p.pos > 10 && r.pos <= 10) movers.push(`🎯 ${r.kw} [${r.lang}] вошёл в ТОП-10 (${r.pos})`);
        if (p.pos <= 10 && r.pos > 10) movers.push(`⚠️ ${r.kw} [${r.lang}] выпал из ТОП-10 (${r.pos})`);
      } else if (p.pos === null && r.pos !== null) {
        movers.push(`✨ ${r.kw} [${r.lang}] появился в ТОП-20: ${r.pos}`);
      } else if (p.pos !== null && r.pos === null) {
        movers.push(`🔴 ${r.kw} [${r.lang}] пропал из ТОП-20 (был ${p.pos})`);
      }
      if (p.url && r.url && p.url !== r.url) {
        movers.push(`🔀 ${r.kw} [${r.lang}] сменил URL: ${p.url} → ${r.url} (каннибализация?)`);
      }
    }
    const ai = r.aiOverview ? ' [AI-O]' : '';
    lines.push(`  ${fmtPos(r.pos).padStart(3)}${delta.padEnd(5)} ${r.kw} [${r.lang}]${ai} ${r.url ?? ''}`);
  }

  console.log(lines.join('\n'));
  console.log(`\nСтоимость замера: $${totalCost.toFixed(4)} | Баланс: $${balance}`);
  if (movers.length) console.log('\nДВИЖЕНИЯ:\n' + movers.join('\n'));
  if (balance !== null && balance < 0.3) console.log('\n⚠️ БАЛАНС DataForSEO < $0.30 — пополни app.dataforseo.com');

  if (NOTIFY) {
    const inTop10 = results.filter((r) => r.pos !== null && r.pos <= 10).length;
    const inTop20 = results.filter((r) => r.pos !== null).length;
    let msg = `📊 <b>Позиции ofmmodels.com</b> (${date}, ${keywords.length} ключей)\n`;
    msg += `ТОП-10: <b>${inTop10}</b> | ТОП-20: <b>${inTop20}</b> | замер: $${totalCost.toFixed(3)}\n`;
    if (movers.length) msg += '\n' + movers.slice(0, 12).join('\n') + '\n';
    const top = results.filter((r) => r.pos !== null).sort((a, b) => a.pos - b.pos).slice(0, 8);
    if (top.length) msg += '\nЛучшие: ' + top.map((r) => `${r.kw} #${r.pos}`).join(' · ');
    if (balance !== null && balance < 0.3) msg += `\n\n⚠️ Баланс DataForSEO $${balance} — пополни!`;
    await sendTelegram(msg);
    console.log('Telegram-сводка отправлена.');
  }
}

main().catch((e) => {
  console.error('ОШИБКА rank-трекера:', e.message);
  process.exit(1);
});
