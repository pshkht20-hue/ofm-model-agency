'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useReducedMotion } from '@/hooks/useMotionPreferences';
import { VIEWPORT_TIGHT, staggerContainer, staggerItem } from '@/lib/motion';
import { Link, usePathname } from '@/i18n/navigation';
import { parseAnswerLinks } from '@/lib/content/faq/answer-links';
import type { FaqCategory } from '@/lib/content/faq';
import { trackFaqOpen } from '@/lib/analytics/gtag';

type FaqAccordionProps = {
  categories: FaqCategory[];
};

/**
 * Превращает [текст](/путь) в ответе в кликабельную внутреннюю ссылку —
 * чтобы из FAQ можно было вести читателя на главную и другие страницы.
 * Для FAQ JSON-LD тот же ответ очищается stripAnswerLinks в StructuredData.
 */
function renderAnswer(text: string) {
  if (!text.includes('](')) return text;
  return parseAnswerLinks(text).map((part, i) =>
    part.type === 'link' ? (
      <Link
        key={i}
        href={part.href}
        className="link-hover-line text-accent-pink hover:text-accent-cyan transition-colors"
      >
        {part.label}
      </Link>
    ) : (
      part.value
    ),
  );
}

export function FaqAccordion({ categories }: FaqAccordionProps) {
  const [openKey, setOpenKey] = useState<string | null>('0-0');
  const reduced = useReducedMotion();
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="space-y-12">
      {categories.map((category, catIndex) => (
        <section key={category.title} aria-labelledby={`faq-cat-${catIndex}`}>
          <h2
            id={`faq-cat-${catIndex}`}
            className="font-serif text-xl md:text-2xl text-white mb-5 pb-3 border-b border-white/[0.08]"
          >
            {category.title}
          </h2>
          <motion.div
            className="space-y-3"
            initial={reduced ? false : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={VIEWPORT_TIGHT}
            variants={reduced ? undefined : staggerContainer()}
          >
            {category.items.map((item, itemIndex) => {
              const key = `${catIndex}-${itemIndex}`;
              const isOpen = openKey === key;
              return (
                <motion.article
                  key={item.question}
                  className="card-glass overflow-hidden"
                  variants={reduced ? undefined : staggerItem(20)}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (!isOpen) {
                        trackFaqOpen({ question: item.question, locale, page_path: pathname });
                      }
                      setOpenKey(isOpen ? null : key);
                    }}
                    className="w-full flex items-start justify-between gap-4 p-5 md:p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <h3
                      className="text-base md:text-lg font-medium text-white/95 pr-2"
                      itemProp="name"
                    >
                      {item.question}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-accent-pink transition-transform ${
                        reduced ? 'duration-0' : 'duration-300'
                      } ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] ease-out ${
                      reduced ? 'duration-0' : 'duration-300'
                    } ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <div className="overflow-hidden">
                      <p
                        className="px-5 md:px-6 pb-5 md:pb-6 text-body border-t border-white/[0.06] pt-4 leading-relaxed"
                        itemProp="text"
                      >
                        {renderAnswer(item.answer)}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </section>
      ))}
    </div>
  );
}
