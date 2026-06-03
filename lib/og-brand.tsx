/** Shared visual for Open Graph (ImageResponse JSX). */
export function OgBrandMark({ compact = false }: { compact?: boolean }) {
  const markSize = compact ? 100 : 140;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #050508 0%, #1a0a2e 50%, #0a0a10 100%)',
        fontFamily: 'Georgia, serif',
      }}
    >
      <div
        style={{
          width: markSize,
          height: markSize,
          marginBottom: compact ? 0 : 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width={markSize}
          height={markSize}
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="og-g" x1="8" y1="6" x2="48" y2="50" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f0e6d2" />
              <stop stopColor="#c9a87c" />
              <stop stopColor="#8a7355" />
            </linearGradient>
          </defs>
          <rect width="56" height="56" rx="15" fill="#050508" />
          <rect
            x="2.75"
            y="2.75"
            width="50.5"
            height="50.5"
            rx="14"
            stroke="url(#og-g)"
            strokeWidth="1.25"
            fill="none"
          />
          <path
            d="M16 14c4-5 20-5 24 0"
            stroke="url(#og-g)"
            strokeWidth="1.75"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="28" cy="11" r="1.25" fill="#e8d5b7" />
          <circle cx="28" cy="30" r="13" stroke="url(#og-g)" strokeWidth="1.85" fill="none" />
          <path
            d="M21 24v12 M21 24h5.5 M21 29.5h3.5"
            stroke="url(#og-g)"
            strokeWidth="1.65"
            strokeLinecap="round"
          />
          <path
            d="M29 24v12 M29 24l4 8 M33 24l-4 8"
            stroke="url(#og-g)"
            strokeWidth="1.65"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {!compact && (
        <>
          <div
            style={{
              fontSize: 48,
              fontWeight: 400,
              color: 'white',
              letterSpacing: -0.5,
              marginBottom: 14,
            }}
          >
            OFM&apos;s Model Agency
          </div>
          <div
            style={{
              fontSize: 18,
              color: '#c9a87c',
              letterSpacing: 6,
              textTransform: 'uppercase',
            }}
          >
            Luxury Management
          </div>
        </>
      )}
    </div>
  );
}
