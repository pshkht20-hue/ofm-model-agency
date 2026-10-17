import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/**
 * Safe, high-value security headers. CSP is intentionally omitted for now —
 * a strict policy needs per-request nonces for the inline GA/JSON-LD scripts,
 * which doesn't compose with the statically-rendered pages. Tracked as a
 * follow-up hardening item.
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Build-time only: rewrites barrel imports to direct per-export imports so dead
  // modules pulled through the barrels are tree-shaken out of the client bundle.
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    // Inlines page CSS into the HTML <head>: removes both render-blocking
    // stylesheet requests (~27KB gz) and lets @font-face be discovered from the
    // document itself, cutting one hop off the font critical chain.
    //
    // ⚠️ A/B-замер 17.10.2026 (localhost prod-build, mobile 412px, 4x CPU,
    // Slow 4G, по 3 прогона на вариант): выключение флага РЕГРЕССИРУЕТ LCP
    // главной — медианы 2093ms (флаг on) vs 2301ms (off) в соседних по времени
    // прогонах той же машины (в более ранней серии on давал 1804ms), хотя HTML
    // худеет 748K -> 366K chars (уходит двойной Tailwind-CSS: <style> + дубль
    // в RSC flight). Причина структурная: без флага появляются два внешних
    // render-blocking CSS-файла, которым DevTools атрибутирует ~1.1s FCP/LCP
    // (доп. RTT + скачивание на Slow 4G) — дороже, чем экономия парсинга
    // дубля. НЕ выключать без нового замера по тому же протоколу.
    inlineCss: true,
  },
  images: {
    // BlogCoverImage использует quality={90}; без явного списка Next 16 шлёт
    // dev-предупреждение и грозит в будущем откатить качество к дефолту.
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
