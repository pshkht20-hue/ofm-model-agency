# SEO Report (autonomous)

Run the full analytics pipeline and return a data-driven SEO plan.

## Steps

1. `npm run seo:report` in `ofm-model-agency/`
2. Read `docs/analytics-reports/latest-report.md`
3. If report says "setup required", summarize `docs/analytics-setup.md` for the user (one-time steps only)
4. Otherwise:
   - Summarize metrics (impressions, clicks, organic sessions, top geo)
   - List auto-detected low-CTR pages and quick-win queries from the report
   - Propose prioritized actions for next 2 weeks (code changes + content), aligned with targets: Ukraine, Moldova, Europe, Argentina/LatAm
5. Use skill `ofm-seo-analytics` and `ofm-deep-site-audit` for depth

## Output format

- Executive summary (3 bullets)
- Top 5 actions this week
- Top 5 actions next 2 weeks
- Optional: offer to implement P0 code fixes immediately
