import type { BlogBlock } from '@/lib/content/blog';
import { Link } from '@/i18n/navigation';

const TELEGRAM_URL = 'https://t.me/ofmm_agency';
const TELEGRAM_RE = /(https?:\/\/t\.me\/ofmm_agency|t\.me\/ofmm_agency|@ofmm_agency)/g;

/**
 * Превращает упоминания Telegram-ника (@ofmm_agency / t.me/ofmm_agency) в
 * кликабельную ссылку прямо в тексте статьи — чтобы читатель мог сразу перейти
 * в чат, а не искать вручную. Точечный матч по нашему нику, без ложных срабатываний.
 */
function linkifyTelegram(text: string) {
  if (!text.includes('ofmm_agency')) return text;
  return text.split(TELEGRAM_RE).map((part, i) =>
    part === '@ofmm_agency' || part.includes('t.me/ofmm_agency') ? (
      <a
        key={i}
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="link-hover-line text-accent-pink hover:text-accent-cyan transition-colors"
      >
        {part}
      </a>
    ) : (
      part
    ),
  );
}

export function ArticleBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <article className="prose-seo space-y-5">
      {blocks.map((block, i) => {
        if (block.type === 'h2') {
          return (
            <h2 key={i} className="font-serif text-xl md:text-2xl text-white mt-10 mb-3 first:mt-0">
              {block.text}
            </h2>
          );
        }
        if (block.type === 'h3') {
          return (
            <h3 key={i} className="text-lg font-medium text-white/90 mt-6 mb-2">
              {block.text}
            </h3>
          );
        }
        if (block.type === 'ul') {
          return (
            <ul key={i} className="list-disc pl-5 space-y-2 text-body">
              {block.items.map((item) => (
                <li key={item}>{linkifyTelegram(item)}</li>
              ))}
            </ul>
          );
        }
        if (block.type === 'tip') {
          return (
            <blockquote
              key={i}
              className="border-l-2 border-accent-pink/60 bg-accent-pink/[0.06] rounded-r-xl px-5 py-4 text-white/75 text-[0.9375rem] leading-relaxed not-italic"
            >
              {linkifyTelegram(block.text)}
            </blockquote>
          );
        }
        if (block.type === 'quote') {
          return (
            <figure
              key={i}
              className="rounded-xl border border-accent-cyan/20 bg-accent-cyan/[0.05] px-5 py-4"
            >
              <blockquote className="text-white/80 text-[0.9375rem] leading-relaxed italic">
                “{block.text}”
              </blockquote>
              {block.author ? (
                <figcaption className="text-xs text-accent-cyan/80 mt-3 not-italic">
                  — {block.author}
                </figcaption>
              ) : null}
            </figure>
          );
        }
        if (block.type === 'nav') {
          return (
            <nav
              key={i}
              aria-label={block.intro ?? 'Related pages'}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4"
            >
              {block.intro ? (
                <p className="text-sm text-white/55 mb-3">{block.intro}</p>
              ) : null}
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {block.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link-hover-line text-sm text-accent-pink hover:text-accent-cyan transition-colors"
                    >
                      {link.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          );
        }
        if (block.type === 'cta') {
          return (
            <div
              key={i}
              className="mt-10 rounded-2xl border border-accent-pink/20 bg-accent-pink/[0.06] px-6 py-8 text-center"
            >
              <h2 className="font-serif text-xl text-white mb-3">{block.title}</h2>
              <p className="text-body text-sm mb-6 max-w-lg mx-auto">{linkifyTelegram(block.body)}</p>
              <Link href={block.buttonHref} className="btn-primary inline-flex">
                {block.buttonLabel}
              </Link>
              {block.note ? (
                <p className="text-xs text-white/40 mt-4 max-w-md mx-auto">{linkifyTelegram(block.note)}</p>
              ) : null}
            </div>
          );
        }
        if (block.type === 'table') {
          return (
            <figure
              key={i}
              className="my-7 overflow-x-auto rounded-xl border border-white/[0.08]"
            >
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-white/[0.03]">
                    {block.headers.map((h, hi) => (
                      <th
                        key={hi}
                        className="border-b border-white/[0.1] px-4 py-3 text-left font-semibold text-white/90"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, r) => (
                    <tr key={r}>
                      {row.map((cell, c) => (
                        <td
                          key={c}
                          className={`border-b border-white/[0.06] px-4 py-3 align-top ${
                            c === 0 ? 'font-medium text-white/85' : 'text-white/65'
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {block.caption ? (
                <figcaption className="px-4 py-2.5 text-[11px] leading-relaxed text-white/40">
                  {block.caption}
                </figcaption>
              ) : null}
            </figure>
          );
        }
        return (
          <p key={i} className="text-body leading-relaxed">
            {linkifyTelegram(block.text)}
          </p>
        );
      })}
    </article>
  );
}
