'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

function CopyBlock({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard?.writeText(code).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      },
      () => {},
    );
  }

  return (
    <div className="mt-4 first:mt-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase tracking-wide text-white/45">{label}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 text-xs text-accent-pink hover:text-accent-cyan transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Скопировано' : 'Копировать'}
        </button>
      </div>
      <pre className="overflow-x-auto rounded-xl border border-white/[0.08] bg-black/40 p-3 text-[12px] leading-relaxed text-white/75 whitespace-pre-wrap break-words">
        {code}
      </pre>
    </div>
  );
}

/**
 * "Cite this" + embed block — the unit that converts the asset into earned links.
 * The embed snippet carries a cite-back link to the report; the CC BY 4.0 license
 * makes attribution a requirement, not a favor.
 */
export function CiteEmbed({
  title,
  url,
  publishedYear,
}: {
  title: string;
  url: string;
  publishedYear: string;
}) {
  const apa = `OFM Model Agency. (${publishedYear}). ${title} [Отчёт с данными]. ${url}`;
  const htmlLink = `<a href="${url}">${title} — OFM Model Agency</a>`;
  const embed = `<blockquote>Источник: <a href="${url}">${title}</a> — OFM Model Agency (${publishedYear}). Лицензия CC BY 4.0.</blockquote>`;

  return (
    <section
      id="cite"
      className="mt-12 rounded-2xl border border-accent-cyan/20 bg-accent-cyan/[0.04] p-5 md:p-6"
    >
      <h2 className="font-serif text-xl text-white mb-1">Процитировать это исследование</h2>
      <p className="text-sm text-white/55 mb-4">
        Данные открыты по лицензии{' '}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          className="text-accent-pink hover:text-accent-cyan transition-colors"
          rel="noopener noreferrer"
          target="_blank"
        >
          CC BY 4.0
        </a>{' '}
        — используйте с указанием источника и ссылкой.
      </p>
      <CopyBlock label="APA" code={apa} />
      <CopyBlock label="Ссылка (HTML)" code={htmlLink} />
      <CopyBlock label="Вставить (embed)" code={embed} />
    </section>
  );
}
