import { ImageResponse } from 'next/og';
import { OgBrandMark } from '@/lib/og-brand';
import { siteConfig } from '@/lib/site';

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<OgBrandMark />, { ...size });
}
