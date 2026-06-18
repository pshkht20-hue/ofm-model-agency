'use client';

import { useId, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { EarningStatement } from '@/lib/results/cases';

const fmtUsd = (n: number) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CHART = { x0: 4, x1: 516, yBase: 150, yTop: 22 };

/** Smooth cumulative-growth curve scaled to an endpoint height fraction (0..1). */
function growthPath(h: number): string {
  const { x0, x1, yBase, yTop } = CHART;
  const n = 26;
  let d = '';
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const x = x0 + t * (x1 - x0);
    const y = yBase - h * (yBase - yTop) * Math.pow(t, 1.55);
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return d.trim();
}

const MONTHS_PREVIEW = 5;

export function EarningProof({ statement }: { statement: EarningStatement }) {
  const [showAll, setShowAll] = useState(false);
  const gid = useId().replace(/[:]/g, '');
  const maxGross = Math.max(...statement.rows.map((r) => r.gross), 1);
  const glowSet = new Set(
    [...statement.rows].sort((a, b) => b.gross - a.gross).slice(0, 2).map((r) => r.label),
  );
  const months = showAll ? statement.months : statement.months.slice(0, MONTHS_PREVIEW);

  return (
    <div className="mx-auto w-full max-w-[560px] text-left">
      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-white/40">
        <span>Earning statistics</span>
        <span>UTC</span>
      </div>

      {/* All time */}
      <div className="rounded-2xl border border-white/[0.07] bg-[#0b0814] p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <span className="font-sans text-base font-semibold tracking-tight text-white sm:text-lg">
            All time
          </span>
          <span className="flex items-center gap-2">
            <span className="text-gradient-brand text-base font-bold tabular-nums sm:text-lg">
              {fmtUsd(statement.netTotal)}
            </span>
            <ChevronUp className="h-4 w-4 text-white/35" aria-hidden />
          </span>
        </div>

        <svg viewBox="0 0 520 170" className="mt-2 h-auto w-full" aria-hidden>
          <defs>
            <filter id={`g-${gid}`} x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="b" />
              </feMerge>
            </filter>
          </defs>
          <g stroke="#ffffff" strokeOpacity="0.05">
            <line x1="4" y1="42" x2="516" y2="42" />
            <line x1="4" y1="86" x2="516" y2="86" />
            <line x1="4" y1="130" x2="516" y2="130" />
          </g>
          {statement.rows.map((r) => {
            const d = growthPath(r.gross / maxGross);
            const nonZero = r.gross > 0;
            return (
              <g key={r.label}>
                {nonZero && glowSet.has(r.label) && (
                  <path
                    d={d}
                    fill="none"
                    stroke={r.color}
                    strokeWidth={2.6}
                    strokeLinecap="round"
                    filter={`url(#g-${gid})`}
                    opacity={0.9}
                  />
                )}
                <path
                  d={d}
                  fill="none"
                  stroke={r.color}
                  strokeWidth={nonZero ? 2.1 : 1.4}
                  strokeLinecap="round"
                  opacity={nonZero ? 1 : 0.5}
                />
              </g>
            );
          })}
        </svg>

        <div className="mt-1 flex justify-between px-0.5 text-[10px] text-white/35">
          {statement.axis.map((a) => (
            <span key={a}>{a}</span>
          ))}
        </div>
      </div>

      {/* date range */}
      <div className="my-3 flex items-center justify-center gap-1.5 rounded-full border border-white/[0.08] px-3 py-2 text-xs text-white/55">
        From <b className="font-semibold text-white/85">{statement.dateFrom}</b> To{' '}
        <b className="font-semibold text-white/85">{statement.dateTo}</b>
      </div>

      {/* breakdown */}
      <div className="rounded-2xl border border-white/[0.07] bg-[#0b0814] px-4 py-2 sm:px-5">
        {statement.rows.map((r, i) => (
          <div
            key={r.label}
            className={`grid grid-cols-[1fr_auto_auto] items-center gap-3 py-2 text-[13px] ${
              i < statement.rows.length - 1 ? 'border-b border-white/[0.05]' : ''
            }`}
          >
            <span className="flex items-center gap-2 text-white/75">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: r.color }} />
              {r.label}
            </span>
            <span className="text-right tabular-nums text-white/90">{fmtUsd(r.gross)}</span>
            <span className="hidden text-right text-xs tabular-nums text-white/45 sm:block">
              {fmtUsd(r.net)}
            </span>
          </div>
        ))}
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 pb-1 pt-3 text-[13px] font-bold">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white/45">
            Total
          </span>
          <span className="text-right tabular-nums text-white">
            GROSS&nbsp;{fmtUsd(statement.grossTotal)}
          </span>
          <span className="hidden text-right tabular-nums text-white sm:block">
            NET&nbsp;{fmtUsd(statement.netTotal)}
          </span>
        </div>
      </div>

      {/* monthly */}
      <p className="mb-2 mt-4 text-[10px] uppercase tracking-[0.14em] text-white/40">
        Earnings by month
      </p>
      <div className="flex flex-col gap-2">
        {months.map((m) => (
          <div
            key={m.label}
            className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#0b0814] px-4 py-3 text-sm transition-colors hover:border-accent-pink/25"
          >
            <span className="text-white/80">{m.label}</span>
            <span className="flex items-center gap-2 font-semibold tabular-nums text-white">
              {fmtUsd(m.value)}
              <ChevronDown className="h-3.5 w-3.5 text-white/30" aria-hidden />
            </span>
          </div>
        ))}
      </div>
      {statement.months.length > MONTHS_PREVIEW && (
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="inline-flex flex-col items-center gap-0.5 text-xs font-medium lowercase tracking-wide text-white/50 transition-colors hover:text-accent-pink"
          >
            <span>{showAll ? 'less' : 'more'}</span>
            {showAll ? (
              <ChevronUp className="h-4 w-4" aria-hidden />
            ) : (
              <ChevronDown className="h-4 w-4 motion-safe:animate-bounce" aria-hidden />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
