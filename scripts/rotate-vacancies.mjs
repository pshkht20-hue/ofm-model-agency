// scripts/rotate-vacancies.mjs
//
// Авто-свежесть дат вакансий и гео-страниц модели для Google for Jobs / JobPosting.
// Правит ДВА машинных файла:
//   - lib/content/vacancies/dates.json   (хранит datePosted, validThrough, dateModified)
//   - lib/content/model-geo/dates.json   (хранит datePosted, dateModified; validThrough = datePosted+30 в index.ts)
//
// Логика ротации для каждого слага:
//   Триггер, если ЛИБО до validThrough осталось < 10 дней, ЛИБО прошло > 25 дней с dateModified.
//   При триггере:
//     dateModified  -> сегодня
//     datePosted    -> сегодня минус детерминированный джиттер (0..6 дней) по хэшу слага
//     validThrough  -> сегодня + 30 дней (для vacancies пишется в файл; для model-geo не хранится)
//
// ВРАЗНОБОЙ (анти-fake-reposting): джиттер по слагу разбрасывает datePosted, чтобы даты
// не двигались одной пачкой. Хэш детерминирован — один и тот же слаг всегда даёт тот же сдвиг.
//
// Запуск вручную: npm run rotate:vacancies (авто-пуш/cron НЕ настраивается — решение владельца).

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const VACANCIES_PATH = join(ROOT, 'lib', 'content', 'vacancies', 'dates.json');
const GEO_PATH = join(ROOT, 'lib', 'content', 'model-geo', 'dates.json');

const REFRESH_BEFORE_EXPIRY_DAYS = 10; // осталось < 10 дней до validThrough → обновить
const STALE_AFTER_MODIFIED_DAYS = 25; // прошло > 25 дней с dateModified → обновить
const VALIDITY_WINDOW_DAYS = 30; // validThrough = datePosted-база + 30 дней
const MAX_JITTER_DAYS = 6; // сдвиг datePosted назад: 0..6 дней

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// --- date helpers (UTC, чтобы не зависеть от таймзоны раннера) ---

/** Сегодня в UTC как Date на полночь. */
function todayUTC() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

/** ISO YYYY-MM-DD из Date. */
function toISO(date) {
  return date.toISOString().slice(0, 10);
}

/** Парсит YYYY-MM-DD в Date (UTC полночь). */
function fromISO(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

/** Date + N дней (новый объект). */
function addDays(date, days) {
  return new Date(date.getTime() + days * MS_PER_DAY);
}

/** Целое число дней between (b - a). */
function diffDays(a, b) {
  return Math.round((b.getTime() - a.getTime()) / MS_PER_DAY);
}

/** Детерминированный джиттер 0..MAX_JITTER_DAYS по слагу (FNV-1a хэш). */
function jitterForSlug(slug) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < slug.length; i++) {
    hash ^= slug.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  // >>> 0 → беззнаковое; модуль на (MAX_JITTER_DAYS + 1) → 0..MAX_JITTER_DAYS
  return (hash >>> 0) % (MAX_JITTER_DAYS + 1);
}

/**
 * Нужна ли ротация слагу.
 * @param {Date} today
 * @param {Date} validThrough
 * @param {Date} dateModified
 */
function needsRotation(today, validThrough, dateModified) {
  const daysToExpiry = diffDays(today, validThrough);
  const daysSinceModified = diffDays(dateModified, today);
  return daysToExpiry < REFRESH_BEFORE_EXPIRY_DAYS || daysSinceModified > STALE_AFTER_MODIFIED_DAYS;
}

/** Читает JSON, сохраняя возможность записать обратно с тем же форматом. */
function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

/** Пишет JSON с 2-пробельным отступом и завершающим переводом строки (как в исходниках). */
function writeJson(path, data) {
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

// --- rotation passes ---

const today = todayUTC();
const todayISO = toISO(today);
const updated = [];

// 1) Вакансии: validThrough хранится в файле.
const vacancies = readJson(VACANCIES_PATH);
let vacanciesChanged = false;
for (const [slug, entry] of Object.entries(vacancies.vacancies ?? {})) {
  const validThrough = fromISO(entry.validThrough);
  const dateModified = fromISO(entry.dateModified);
  if (!needsRotation(today, validThrough, dateModified)) continue;

  const jitter = jitterForSlug(slug);
  entry.datePosted = toISO(addDays(today, -jitter));
  entry.dateModified = todayISO;
  entry.validThrough = toISO(addDays(today, VALIDITY_WINDOW_DAYS));
  vacanciesChanged = true;
  updated.push(`vacancies/${slug} → posted ${entry.datePosted}, valid ${entry.validThrough}, mod ${entry.dateModified}`);
}
if (vacanciesChanged) writeJson(VACANCIES_PATH, vacancies);

// 2) Гео-страницы модели: validThrough не хранится (index.ts считает datePosted+30).
const geo = readJson(GEO_PATH);
let geoChanged = false;
for (const [slug, entry] of Object.entries(geo.countries ?? {})) {
  const validThrough = addDays(fromISO(entry.datePosted), VALIDITY_WINDOW_DAYS);
  const dateModified = fromISO(entry.dateModified);
  if (!needsRotation(today, validThrough, dateModified)) continue;

  const jitter = jitterForSlug(slug);
  entry.datePosted = toISO(addDays(today, -jitter));
  entry.dateModified = todayISO;
  geoChanged = true;
  updated.push(`model-geo/${slug} → posted ${entry.datePosted}, mod ${entry.dateModified}`);
}
if (geoChanged) writeJson(GEO_PATH, geo);

// --- report ---
if (updated.length === 0) {
  console.log(`[rotate-vacancies] Даты свежие (${todayISO}) — ничего не обновлено.`);
} else {
  console.log(`[rotate-vacancies] Обновлено слагов: ${updated.length} (${todayISO})`);
  for (const line of updated) console.log(`  • ${line}`);
}
