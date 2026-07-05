/**
 * OFM Guardrails — детерминированная проверка контента на красные линии владельца.
 * Операционализирует правила из CLAUDE.md и памяти агента: запрещённые страны,
 * контракты с агентством, доход-клеймы, «без лица», советы про доступы/пароли.
 * Запуск: npm run guardrails  (или node scripts/ofm-guardrails.mjs)
 * Выход 0 = чисто, 1 = есть флаги на ревью. Флаг ≠ всегда ошибка — часть требует
 * человеческого взгляда на контекст (напр. «договір оренди», анти-клейм «$100k продают курсы»).
 */
import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SCAN_DIRS = ['lib/content', 'messages'];

// Каждое правило: name, регэксп, severity (block=почти всегда ошибка, review=глянуть контекст)
const RULES = [
  {
    name: 'Запрещённые страны (креаторам нельзя)',
    re: /казахстан|kazakhstan|беларус|belarus|білорус|венесуэл|venezuela|узбекистан|uzbekistan|кыргыз|kyrgyz|таджик|туркмен|армения(?!\s*—?\s*язык)|azerbaij|азербайдж/gi,
    severity: 'review',
    hint: 'страна из BANNED-COUNTRIES-2026-07.md — упоминать нельзя (проверь, не язык/диаспора ли это)',
  },
  {
    name: 'Россия как гео работы',
    re: /из рф|в рф|из россии|работ\w+ из россии|россии на онлифанс|russia(?!n\s+language|n\s+and)/gi,
    severity: 'review',
    hint: 'РФ как гео работы запрещена; «Russian language / Russian and Romanian» — ок',
  },
  {
    name: 'Контракт/договор с агентством (модель работы: не заключаем)',
    re: /договор с агентств|контракт с агентств|подписыва\w+ (договор|контракт)|contract with (the )?agency|что должно быть в договор|пункт\w* договор|договір з агентств|підписа\w+ (договір|контракт)/gi,
    severity: 'review',
    hint: 'контрактов нет — совет про договор/контракт с агентством запрещён (ок: одобренный реframe «договор — ритуал, юрсилы нет»)',
  },
  {
    name: 'Совет держать доступ/пароль при работе с агентством',
    re: /не (переда\w+|отда\w+|дав\w+) (агентств|единственн\w+ пароль|полный доступ)|never (give|share|hand)\b|роли вместо пароля|кто видит (ваш|твой) пароль|не віддав\w+ пароль/gi,
    severity: 'review',
    hint: 'агентство ведёт аккаунт/финансы — советы «держи пароль при себе» запрещены (ок: гигиена личного email, анти-фишинг от третьих лиц)',
  },
  {
    name: 'Доход-клейм выше коридора ($100K как обещание)',
    re: /\$100[\s,.]?000|\$100k|100 000\$|100\s?тыс\.?\s?\$|100k\/(mo|month|мес)/gi,
    severity: 'review',
    hint: 'клейм только $15K–$50K; «$100k» допустим ТОЛЬКО как развенчание мифа',
  },
  {
    name: '«Работаем с моделями без лица» как обещание агентства',
    re: /работаем? с модел\w+ без лиц|агентство\w* без лиц|we work with faceless|без обличчя.{0,20}(працю|агенц)/gi,
    severity: 'block',
    hint: 'запрещено обещать работу «без лица» от лица агентства (ок: разбор формата анонимности как темы)',
  },
  {
    name: 'Цепочка вычета комиссии платформы рядом с долей агентства',
    re: /(платформа|onlyfans|плаформа|la plataforma)\s+(удержив|утриму|бере 20|takes|retiene|holds)\D{0,40}(агентств|agency|agencia|модел\w+ (получ|доля))/gi,
    severity: 'review',
    hint: 'долю считаем сразу от «баланса страницы» — двойной вычет платформа→агентство не расписываем',
  },
];

async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(ts|tsx|json|md)$/.test(e.name)) out.push(p);
  }
  return out;
}

const files = (await Promise.all(SCAN_DIRS.map((d) => walk(join(root, d))))).flat();
let flags = 0;
const byRule = {};

for (const file of files) {
  const text = await readFile(file, 'utf-8');
  const lines = text.split('\n');
  for (const rule of RULES) {
    lines.forEach((line, i) => {
      const m = line.match(rule.re);
      if (m) {
        flags += 1;
        byRule[rule.name] ??= { severity: rule.severity, hint: rule.hint, hits: [] };
        byRule[rule.name].hits.push({
          loc: `${relative(root, file)}:${i + 1}`,
          match: [...new Set(m)].join(', ').slice(0, 60),
        });
      }
    });
  }
}

if (flags === 0) {
  console.log('✅ OFM Guardrails: чисто — красных линий не найдено.');
  process.exit(0);
}

console.log(`⚠️  OFM Guardrails: ${flags} флаг(ов) на ревью\n`);
for (const [name, data] of Object.entries(byRule)) {
  const mark = data.severity === 'block' ? '🔴 BLOCK' : '🟡 REVIEW';
  console.log(`${mark}  ${name}`);
  console.log(`   → ${data.hint}`);
  for (const h of data.hits.slice(0, 12)) console.log(`   ${h.loc}  «${h.match}»`);
  if (data.hits.length > 12) console.log(`   … и ещё ${data.hits.length - 12}`);
  console.log('');
}
const hasBlock = Object.values(byRule).some((d) => d.severity === 'block');
process.exit(hasBlock ? 1 : 0);
