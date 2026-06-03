import type { BlogBlock } from '@/lib/content/blog';

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
        return (
          <p key={i} className="text-body leading-relaxed">
            {block.text}
          </p>
        );
      })}
    </article>
  );
}
