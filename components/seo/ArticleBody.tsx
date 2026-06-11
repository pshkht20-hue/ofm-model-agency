import type { BlogBlock } from '@/lib/content/blog';
import { Link } from '@/i18n/navigation';

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
                <li key={item}>{item}</li>
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
              {block.text}
            </blockquote>
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
                      className="text-sm text-accent-pink hover:text-accent-cyan transition"
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
              <p className="text-body text-sm mb-6 max-w-lg mx-auto">{block.body}</p>
              <Link href={block.buttonHref} className="btn-primary inline-flex">
                {block.buttonLabel}
              </Link>
              {block.note ? (
                <p className="text-xs text-white/40 mt-4 max-w-md mx-auto">{block.note}</p>
              ) : null}
            </div>
          );
        }
        return (
          <p key={i} className="text-body leading-relaxed">
            {block.text}
          </p>
        );
      })}
    </article>
  );
}
