/**
 * Скачивает обложки блога из Unsplash CDN в public/blog/covers/
 * Источник истины — lib/content/blog/covers.ts (BLOG_COVERS): скрипт парсит его,
 * поэтому дублирующего списка здесь больше нет — новые посты подхватываются сами.
 * Запуск: npm run blog:covers
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'public', 'blog', 'covers');
const coversTs = join(root, 'lib', 'content', 'blog', 'covers.ts');

/** slug → photoId из covers.ts */
async function loadCovers() {
  const src = await readFile(coversTs, 'utf-8');
  const entries = [...src.matchAll(/'([a-z0-9-]+)':\s*\{\s*localSrc[^}]*?coverUrl\('([^']+)'\)/gs)];
  if (entries.length === 0) throw new Error('Не удалось распарсить BLOG_COVERS из covers.ts');
  return Object.fromEntries(entries.map((m) => [m[1], m[2]]));
}

function coverUrl(photoId) {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=1600&h=900&q=85`;
}

const COVERS = await loadCovers();
console.log(`covers.ts: ${Object.keys(COVERS).length} обложек\n`);

await mkdir(outDir, { recursive: true });

let ok = 0;
let fail = 0;

for (const [slug, photoId] of Object.entries(COVERS)) {
  const url = coverUrl(photoId);
  const dest = join(outDir, `${slug}.jpg`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buf);
    console.log(`✓ ${slug}.jpg (${Math.round(buf.length / 1024)} KB)`);
    ok += 1;
  } catch (err) {
    console.error(`✗ ${slug}: ${err.message}`);
    fail += 1;
  }
}

console.log(`\nDone: ${ok} ok, ${fail} failed`);
if (fail > 0) process.exitCode = 1;
