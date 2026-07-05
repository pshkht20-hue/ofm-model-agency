/**
 * PreToolUse hook: блокирует правки СЕО-скелета без явного решения владельца.
 * Читает JSON события со stdin, смотрит tool_input.file_path.
 * Если файл — часть скелета (hreflang/canonical/sitemap/routing/getSiteUrl),
 * возвращает permissionDecision:"deny" с объяснением. Иначе — молча пропускает.
 * При любой внутренней ошибке НЕ блокирует (fail-open), чтобы не ломать рабочий процесс.
 */
import { readFileSync } from 'node:fs';

// Точные хвосты путей — истинный неприкосновенный скелет (см. CLAUDE.md / feedback-seo-skeleton-rule).
const SKELETON = [
  'middleware.ts',
  'i18n/routing.ts',
  'i18n/navigation.ts',
  'i18n/request.ts',
  'i18n/browser-locale.ts',
  'app/sitemap.ts',
  'app/robots.ts',
  'lib/seo.ts',
  'lib/site.ts',
];

try {
  const raw = readFileSync(0, 'utf-8');
  const evt = JSON.parse(raw);
  const fp = (evt?.tool_input?.file_path || '').replace(/\\/g, '/').toLowerCase();
  if (!fp) process.exit(0);

  const hit = SKELETON.find((s) => fp.endsWith('/' + s) || fp.endsWith(s));
  if (hit) {
    const out = {
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason:
          `⛔ СЕО-скелет: ${hit} — неприкосновенный файл (hreflang/canonical/sitemap/routing/getSiteUrl). ` +
          `Правка запрещена без явного подтверждения владельца. Останови изменение и спроси владельца; ` +
          `если нужна только аддитивная запись (напр. новый роут в существующий список sitemap) — опиши её владельцу и получи "да".`,
      },
    };
    process.stdout.write(JSON.stringify(out));
    process.exit(0);
  }
  process.exit(0);
} catch {
  // fail-open: хук не должен ломать работу из-за своей ошибки
  process.exit(0);
}
