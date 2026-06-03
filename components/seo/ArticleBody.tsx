import type { BlogBlock } from '@/lib/content/blog';

export function ArticleBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <article className="prose-seo space-y-5">
      {blocks.map((block, i) => {
        if (block.type === 'h2') {
          return (
            <h2 key={i} className="font-serif text-xl md:text-2xl text-white mt-10 mb-3">
              {block.text}
            </h2>
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
        return (
          <p key={i} className="text-body leading-relaxed">
            {block.text}
          </p>
        );
      })}
    </article>
  );
}
