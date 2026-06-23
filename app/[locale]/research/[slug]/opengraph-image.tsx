import { ImageResponse } from 'next/og';
import {
  getResearchReport,
  getResearchReportLocales,
  getResearchReportSlugs,
} from '@/lib/content/research/reports';

export const dynamicParams = false;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'OFM Research — Creator Safety 2026 data roundup';

export function generateStaticParams() {
  return getResearchReportSlugs().flatMap((slug) =>
    getResearchReportLocales(slug).map((locale) => ({ locale, slug })),
  );
}

// Share/press card — English + Latin only (universal, font-safe, best for the
// English-language outlets that will share it).
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = getResearchReport(slug, 'en');
  const stat = report?.heroStat.value ?? '22.6%';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#08070d',
          backgroundImage: 'linear-gradient(135deg, #0b0816, #1c0b22 58%, #0a0814)',
          padding: '70px',
          color: '#ffffff',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            letterSpacing: 3,
            color: '#ff5bb5',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          OFM Research · Creator Safety 2026
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 172, fontWeight: 800, lineHeight: 1 }}>{stat}</div>
          <div
            style={{
              display: 'flex',
              fontSize: 42,
              color: '#eae7f3',
              marginTop: 22,
              maxWidth: 1010,
              lineHeight: 1.25,
            }}
          >
            of adults have faced image-based sexual abuse — and no one had the data on paid creators
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 26,
            color: '#a9a4bd',
          }}
        >
          <div style={{ display: 'flex' }}>38 sources · CHI 2025 · FBI IC3 · SWGfL</div>
          <div style={{ display: 'flex' }}>ofmmodels.com/research</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
