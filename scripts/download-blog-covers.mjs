/**
 * Скачивает обложки блога из Unsplash CDN в public/blog/covers/
 * Запуск: npm run blog:covers
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'public', 'blog', 'covers');

/** slug → Unsplash photo id (проверены на CDN) */
const COVERS = {
  'kak-vybrat-onlyfans-agentstvo': '1521737711867-e3b97375f902',
  'chto-delaet-onlyfans-agentstvo': '1522071820081-009f0129c71c',
  'kogda-nuzhno-onlyfans-agentstvo': '1460925895917-afdab827c52f',
  'onlyfans-agentstvo-ukraina': '1469474968028-56623f02e42e',
  'onlyfans-agentstvo-moldova': '1449824913935-59a10b8d2000',
  'onlyfans-agentstvo-latinskaya-amerika': '1506905925346-21bda4d32df4',
  'onlyfans-agentstvo-moshennichestvo': '1563013544-824ae1b704d3',
  'onlyfans-marketing-strategiya-2026': '1551288049-bebda4e38f71',
  'onlyfans-prodvizhenie-reddit-twitter': '1611162616305-c69b3fa7fbe0',
  'onlyfans-instagram-tiktok-bez-bana': '1522202176988-66273c2fd55f',
  'onlyfans-uderzhanie-podpischikov': '1552664730-d307ca884978',
  'onlyfans-chaty-dm-prodazhi': '1516321318423-f06f85e504b3',
  'onlyfans-tseny-podpiska-ppv': '1579621970795-87facc2f976d',
  'onlyfans-skolko-zarabatyvayut-modeli': '1504384308090-c894fdcc538d',
  'onlyfans-agentstvo-dlya-nachinayushchih': '1542038784456-1ea8e935640e',
  'onlyfans-kontent-plan-i-syomki': '1600880292203-757bb62b4baf',
  'onlyfans-oshibki-novichkov': '1454165804606-c3d57bc86b40',
  'onlyfans-anonimnost-i-bezopasnost': '1633265486064-086b219458ec',
  'onlyfans-rabota-bez-lica': '1507003211169-0a1dd7228f2d',
  'rabota-modelyu-onlyfans': '1515378791036-0648a3ef77b2',
  'kak-stat-onlyfans-modelyu-s-nulya': '1738566495642-5911b1ed08b6',
  'onlyfans-rabota-polsha': '1607078486875-a697a8a38e87',
  'onlyfans-rabota-germaniya': '1618754087664-96688bcf29a3',
  'onlyfans-rabota-chehiya': '1763305102178-4448e7a5a7a0',
  'onlyfans-rabota-legalno-i-bezopasno': '1758874384232-cfa79a5babf1',
  'robota-dlya-ukrainok-za-kordonom': '1494508201555-625bb4e88b96',
};

function coverUrl(photoId) {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=1600&h=900&q=85`;
}

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
