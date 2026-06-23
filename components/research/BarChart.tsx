import type { ResearchChart } from '@/lib/content/research/reports';

/**
 * Server-rendered horizontal ranked bar chart (pure SVG/markup, no client JS).
 * Each chart is self-describing: title, n= footer, and per-bar values are baked
 * in so the image is citable even when screenshotted.
 */
export function BarChart({ chart }: { chart: ResearchChart }) {
  const max = Math.max(100, ...chart.data.map((d) => d.value));

  return (
    <figure
      id={`chart-${chart.id}`}
      className="my-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 md:p-6"
    >
      <figcaption className="mb-5">
        <h3 className="font-serif text-lg md:text-xl text-white leading-snug">{chart.title}</h3>
        <p className="text-sm text-white/55 mt-2 leading-relaxed">{chart.caption}</p>
      </figcaption>

      <div className="flex flex-col gap-3" role="img" aria-label={chart.title}>
        {chart.data.map((d) => (
          <div key={d.label} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1">
            <div className="col-span-2 flex items-baseline justify-between gap-3">
              <span className="text-sm text-white/80 leading-snug">{d.label}</span>
              <span className="text-sm font-semibold text-accent-pink tabular-nums shrink-0">
                {d.value}%
              </span>
            </div>
            <div
              className="col-span-2 h-2.5 rounded-full bg-white/[0.06] overflow-hidden"
              aria-hidden
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-pink to-accent-violet"
                style={{ width: `${(d.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 pt-4 border-t border-white/[0.06] text-[11px] uppercase tracking-wide text-white/35">
        {chart.n}
      </p>
    </figure>
  );
}

/** Big-number stat cards row (for the "what creators experienced" headline block). */
export function StatCards({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="my-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 text-center"
        >
          <div className="font-serif text-3xl md:text-4xl text-white">{s.value}</div>
          <div className="text-xs text-white/55 mt-2 leading-snug">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
