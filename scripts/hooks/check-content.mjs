/**
 * PostToolUse hook: после правки файла контента проверяет ТОЛЬКО этот файл на
 * красные линии владельца (запрещённые страны, «без лица» как обещание, контракт
 * с агентством). Если нашлось — вливает предупреждение в контекст агента через
 * additionalContext, чтобы правка была замечена сразу. Не блокирует, fail-open.
 * Полная проверка всего сайта — npm run guardrails.
 */
import { readFileSync } from 'node:fs';

const CONTENT_RE = /(lib[\\/]content|[\\/]messages[\\/])/i;

const CHECKS = [
  {
    name: 'запрещённая страна',
    re: /казахстан|kazakhstan|беларус|belarus|білорус|венесуэл|venezuela|узбекистан|кыргыз|таджик|туркмен|азербайдж|из росси|работ\w* из росси/i,
  },
  {
    name: '«работаем без лица» как обещание',
    re: /работаем? с модел\w+ без лиц|агентство\w* без лиц|we work with faceless/i,
  },
  {
    name: 'контракт/договор с агентством как совет',
    re: /договор с агентств|контракт с агентств|что должно быть в договор|підписа\w+ (договір|контракт) з агентств/i,
  },
];

try {
  const raw = readFileSync(0, 'utf-8');
  const evt = JSON.parse(raw);
  const fp = evt?.tool_input?.file_path || '';
  if (!fp || !CONTENT_RE.test(fp)) process.exit(0);

  let text = '';
  try {
    text = readFileSync(fp, 'utf-8');
  } catch {
    process.exit(0);
  }

  const hits = CHECKS.filter((c) => c.re.test(text)).map((c) => c.name);
  if (hits.length) {
    const out = {
      hookSpecificOutput: {
        hookEventName: 'PostToolUse',
        additionalContext:
          `⚠️ OFM guardrails: в только что изменённом файле найдены возможные нарушения — ` +
          `${hits.join('; ')}. Проверь контекст (анти-клеймы и одобренные реформулировки допустимы) ` +
          `и при необходимости исправь до коммита. Полная проверка: npm run guardrails.`,
      },
    };
    process.stdout.write(JSON.stringify(out));
  }
  process.exit(0);
} catch {
  process.exit(0);
}
