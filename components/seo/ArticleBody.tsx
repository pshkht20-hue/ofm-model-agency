import { Fragment } from 'react';
import type { BlogBlock } from '@/lib/content/blog';
import { Link } from '@/i18n/navigation';
import { TrackedCtaLink, TrackedTelegramLink } from '@/components/analytics/TrackedLinks';
import { ArticleCalcTeaser } from '@/components/seo/ArticleCalcTeaser';
import { ArticleInlineCta } from '@/components/seo/ArticleInlineCta';

const TELEGRAM_URL = 'https://t.me/ofmm_agency';
const TELEGRAM_RE = /(https?:\/\/t\.me\/ofmm_agency|t\.me\/ofmm_agency|@ofmm_agency)/g;

/**
 * Превращает упоминания Telegram-ника (@ofmm_agency / t.me/ofmm_agency) в
 * кликабельную ссылку прямо в тексте статьи — чтобы читатель мог сразу перейти
 * в чат, а не искать вручную. Точечный матч по нашему нику, без ложных срабатываний.
 * Клик уходит в GA4 как telegram_click{location:'article_body'} (клиентская обёртка).
 */
function linkifyTelegram(text: string) {
  if (!text.includes('ofmm_agency')) return text;
  return text.split(TELEGRAM_RE).map((part, i) =>
    part === '@ofmm_agency' || part.includes('t.me/ofmm_agency') ? (
      <TrackedTelegramLink
        key={i}
        href={TELEGRAM_URL}
        location="article_body"
        className="link-hover-line text-accent-pink hover:text-accent-cyan transition-colors"
      >
        {part}
      </TrackedTelegramLink>
    ) : (
      part
    ),
  );
}

/**
 * Точки программной вставки конверсионных мостов (ArticleInlineCta /
 * ArticleCalcTeaser): контент статей не меняется, вставка только на рендере.
 * Инлайн-CTA — перед третьим h2 (читательница уже вовлечена), fallback — треть
 * статьи. Тизер калькулятора — перед финальным nav-блоком «что дальше»,
 * fallback — ~66% глубины со сдвигом к ближайшему h2 (граница секций).
 * Гарды: короткие статьи (<10 блоков) и статьи с собственным CTA в середине
 * не трогаем вовсе; если тизер оказался ближе 4 блоков к инлайн-CTA —
 * оставляем только инлайн, чтобы не превращать статью в ленту баннеров.
 */
function bridgeIndices(blocks: BlogBlock[]): {
  inlineIdx: number | null;
  calcIdx: number | null;
} {
  if (blocks.length < 10) return { inlineIdx: null, calcIdx: null };
  if (blocks.some((b, i) => b.type === 'cta' && i < blocks.length - 1)) {
    return { inlineIdx: null, calcIdx: null };
  }

  const h2Indices = blocks.flatMap((b, i) => (b.type === 'h2' ? [i] : []));
  let inlineIdx =
    h2Indices.length >= 3 ? h2Indices[2] : Math.ceil(blocks.length / 3);
  // Не разрываем пару «h3-вопрос → ответ» (FAQ-статьи): если предыдущий блок —
  // h3, сдвигаем точку вставки за его ответ, чтобы видимый порядок совпадал
  // с FAQPage-разметкой и вопрос не отрывался от ответа баннером.
  while (inlineIdx < blocks.length && blocks[inlineIdx - 1]?.type === 'h3') {
    inlineIdx++;
  }

  let calcIdx = -1;
  for (let i = blocks.length - 1; i >= 0; i--) {
    if (blocks[i].type === 'nav') {
      calcIdx = i;
      break;
    }
  }
  if (calcIdx === -1) {
    const target = Math.round(blocks.length * 0.66);
    calcIdx = target;
    let bestDist = Infinity;
    for (const idx of h2Indices) {
      const dist = Math.abs(idx - target);
      if (dist < bestDist) {
        bestDist = dist;
        calcIdx = idx;
      }
    }
  }

  if (calcIdx - inlineIdx < 4) return { inlineIdx, calcIdx: null };
  return { inlineIdx, calcIdx };
}

function renderBlock(block: BlogBlock, i: number) {
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
        <TrackedCtaLink
          href={block.buttonHref}
          location="article_cta"
          className="btn-primary inline-flex"
        >
          {block.buttonLabel}
        </TrackedCtaLink>
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
}

export function ArticleBody({ blocks }: { blocks: BlogBlock[] }) {
  const { inlineIdx, calcIdx } = bridgeIndices(blocks);

  return (
    <article className="prose-seo space-y-5">
      {blocks.map((block, i) => (
        <Fragment key={i}>
          {i === inlineIdx && <ArticleInlineCta />}
          {i === calcIdx && <ArticleCalcTeaser />}
          {renderBlock(block, i)}
        </Fragment>
      ))}
    </article>
  );
}
