// Мгновенное уведомление Bing/Yandex/Seznam/Naver о новых-обновлённых URL через IndexNow.
// Запуск: node scripts/seo-indexnow.mjs <url1> <url2> ...
// Дополняет seo-request-indexing.mjs (Google Indexing API) — гоняем оба после деплоя.
const KEY = 'b30b2ea5e12f17e7c6edbc2ef326c8c6';
const HOST = 'ofmmodels.com';

const urls = process.argv.slice(2);
if (urls.length === 0) {
  console.error('Использование: node scripts/seo-indexnow.mjs <url1> <url2> ...');
  process.exit(1);
}

const bad = urls.filter((u) => !u.startsWith(`https://${HOST}`));
if (bad.length) {
  console.error(`Все URL должны начинаться с https://${HOST} — лишние: ${bad.join(', ')}`);
  process.exit(1);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  }),
});

// 200/202 = принято; тело обычно пустое
console.log(`IndexNow: HTTP ${res.status} — ${res.status === 200 || res.status === 202 ? 'OK' : 'ошибка'} (${urls.length} URL)`);
if (res.status !== 200 && res.status !== 202) {
  console.log(await res.text());
  process.exit(1);
}
