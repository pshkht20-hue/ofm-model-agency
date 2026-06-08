function escapeTelegramHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const GEO_LABELS = {
  ukr: 'Украина',
  mda: 'Молдова',
  arg: 'Аргентина',
  esp: 'Испания',
  mex: 'Мексика',
  col: 'Колумбия',
};

function shortPage(url) {
  try {
    const path = new URL(url).pathname || '/';
    return path.length > 40 ? `${path.slice(0, 37)}…` : path;
  } catch {
    return url;
  }
}

export function buildSeoRecommendations(data) {
  const tips = [];
  const {
    totalImpressions,
    totalClicks,
    ga4Sessions,
    ga4Organic,
    queries,
    pages,
    countries,
    errors,
  } = data;

  if (errors?.length) {
    tips.push('Проверьте доступ к Google API (OAuth refresh token).');
  }

  if (totalImpressions < 30) {
    tips.push(
      'Мало показов в поиске — приоритет: новые статьи в блог, внутренние ссылки с главной, отправка sitemap в GSC.',
    );
  }

  if (totalImpressions > 0 && totalClicks === 0) {
    tips.push(
      'Есть показы, но 0 кликов — улучшите title и description (FAQ, блог, главная).',
    );
  }

  const nearTopQueries = queries
    .filter((q) => Number(q.position) <= 15 && Number(q.impressions) >= 1)
    .sort((a, b) => Number(a.position) - Number(b.position));

  for (const q of nearTopQueries.slice(0, 3)) {
    tips.push(
      `Запрос «${q.query}» — позиция ${q.position}: допишите блок на релевантной странице и добавьте ссылку с главной.`,
    );
  }

  const faqPage = pages.find((p) => p.page.includes('/faq'));
  if (faqPage && Number(faqPage.position) <= 10) {
    tips.push('FAQ в топе поиска — добавьте FAQ-разметку (JSON-LD) и расширьте ответы про OFM.');
  }

  const blogUa = pages.find((p) => p.page.includes('ukraina'));
  if (blogUa && Number(blogUa.position) <= 12) {
    tips.push(
      'Статья про Украину близко к топ-5 — обновите заголовок H1, добавьте CTA на заявку в конце.',
    );
  }

  const httpDup = pages.some((p) => p.page.startsWith('http://'));
  const httpsDup = pages.some((p) => p.page.startsWith('https://'));
  if (httpDup && httpsDup) {
    tips.push('В GSC видны http и https — убедитесь, что canonical и редирект на https работают.');
  }

  const ukrImpr = Number(countries.find((c) => c.country === 'ukr')?.impressions ?? 0);
  const mdaImpr = Number(countries.find((c) => c.country === 'mda')?.impressions ?? 0);
  const argImpr = Number(countries.find((c) => c.country === 'arg')?.impressions ?? 0);

  if (ukrImpr < 5) {
    tips.push('Мало трафика из Украины — усильте /uk и статьи на украинском.');
  }
  if (mdaImpr === 0) {
    tips.push('Молдова: 0 показов — планируйте страницу или пост под MD (ru/ro).');
  }
  if (argImpr === 0) {
    tips.push('LatAm: 0 показов по AR — добавьте es-контент и локальные ключи в /es.');
  }

  if (ga4Sessions > 0 && ga4Organic / ga4Sessions < 0.1) {
    tips.push(
      `Органика ${ga4Organic} из ${ga4Sessions} визитов — упор на SEO-контент, не только прямые заходы.`,
    );
  }

  if (tips.length === 0) {
    tips.push('Данных пока мало — продолжаем публикации и ждём накопления статистики.');
  }

  return [...new Set(tips)].slice(0, 6);
}

export function formatTelegramReport(data, recommendations) {
  const date = new Date().toLocaleDateString('ru-RU', {
    timeZone: 'Europe/Kyiv',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const topQueries = data.queries
    .slice(0, 5)
    .map(
      (q) =>
        `• «${escapeTelegramHtml(q.query)}» — поз. ${q.position}, ${q.impressions} показов`,
    )
    .join('\n');

  const topPages = data.pages
    .slice(0, 4)
    .map((p) => `• ${escapeTelegramHtml(shortPage(p.page))} — поз. ${p.position}`)
    .join('\n');

  const geoLines = ['ukr', 'mda', 'arg']
    .map((code) => {
      const row = data.countries.find((c) => c.country === code);
      const label = GEO_LABELS[code] ?? code;
      return `• ${label}: ${row?.impressions ?? 0} показов`;
    })
    .join('\n');

  const recBlock = recommendations
    .map((t, i) => `${i + 1}. ${escapeTelegramHtml(t)}`)
    .join('\n');

  return [
    `<b>📊 SEO-отчёт — ofmmodels.com</b>`,
    `🗓 ${date} · период ${data.periodDays} дн.`,
    '',
    `<b>Цифры</b>`,
    `• Показы Google: ${data.totalImpressions}`,
    `• Клики: ${data.totalClicks}`,
    `• Визиты GA4: ${data.ga4Sessions} (органика: ${data.ga4Organic})`,
    '',
    topQueries ? `<b>🔍 Запросы</b>\n${topQueries}` : '',
    topPages ? `\n<b>📄 Страницы в поиске</b>\n${topPages}` : '',
    geoLines ? `\n<b>🌍 Гео (GSC)</b>\n${geoLines}` : '',
    '',
    `<b>💡 Рекомендации</b>`,
    recBlock,
    '',
    `<i>Авто-отчёт. Полный файл: docs/analytics-reports/latest-report.md</i>`,
  ]
    .filter(Boolean)
    .join('\n');
}
