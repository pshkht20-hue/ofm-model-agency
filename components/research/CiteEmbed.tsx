'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

type Labels = {
  heading: string;
  licenseLine: string;
  htmlLabel: string;
  embedLabel: string;
  copy: string;
  copied: string;
  kind: string;
};

function CopyBlock({
  label,
  code,
  copyLabel,
  copiedLabel,
}: {
  label: string;
  code: string;
  copyLabel: string;
  copiedLabel: string;
}) {
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
          {copied ? copiedLabel : copyLabel}
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
 * The embed snippet carries a cite-back link; CC BY 4.0 makes attribution required.
 * The embed wrapper text is intentionally English (it lands on third-party sites).
 */
export function CiteEmbed({
  title,
  url,
  publishedYear,
  labels,
}: {
  title: string;
  url: string;
  publishedYear: string;
  labels: Labels;
}) {
  const apa = `OFM Model Agency. (${publishedYear}). ${title} ${labels.kind}. ${url}`;
  const htmlLink = `<a href="${url}">${title} — OFM Model Agency</a>`;
  const embed = `<blockquote>Source: <a href="${url}">${title}</a> — OFM Model Agency (${publishedYear}). License CC BY 4.0.</blockquote>`;

  return (
    <section
      id="cite"
      className="mt-12 rounded-2xl border border-accent-cyan/20 bg-accent-cyan/[0.04] p-5 md:p-6"
    >
      <h2 className="font-serif text-xl text-white mb-1">{labels.heading}</h2>
      <p className="text-sm text-white/55 mb-4">
        {labels.licenseLine}{' '}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          className="text-accent-pink hover:text-accent-cyan transition-colors"
          rel="noopener noreferrer"
          target="_blank"
        >
          CC BY 4.0 →
        </a>
      </p>
      <CopyBlock label="APA" code={apa} copyLabel={labels.copy} copiedLabel={labels.copied} />
      <CopyBlock label={labels.htmlLabel} code={htmlLink} copyLabel={labels.copy} copiedLabel={labels.copied} />
      <CopyBlock label={labels.embedLabel} code={embed} copyLabel={labels.copy} copiedLabel={labels.copied} />
    </section>
  );
}
