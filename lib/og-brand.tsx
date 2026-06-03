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
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          width: markSize,
          height: markSize,
          marginBottom: compact ? 0 : 36,
        }}
      >
        <svg
          width={markSize}
          height={markSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="og-a" x1="4" y1="4" x2="44" y2="44">
              <stop stopColor="#FF5BB5" />
              <stop offset="1" stopColor="#A855F7" />
            </linearGradient>
            <linearGradient id="og-b" x1="44" y1="4" x2="4" y2="44">
              <stop stopColor="#00D4FF" />
              <stop offset="1" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="14" fill="#0a0a0f" />
          <circle cx="18" cy="24" r="11" fill="url(#og-a)" />
          <circle cx="30" cy="24" r="11" fill="url(#og-b)" opacity="0.88" />
          <text
            x="24"
            y="28"
            textAnchor="middle"
            fill="white"
            fontSize="13"
            fontWeight="700"
          >
            ofm
          </text>
        </svg>
      </div>
      {!compact && (
        <>
          <div
            style={{
              fontSize: 44,
              fontWeight: 600,
              color: 'white',
              letterSpacing: -0.5,
              marginBottom: 12,
            }}
          >
            OFM&apos;s Model Agency
          </div>
          <div
            style={{
              fontSize: 16,
              color: '#FF5BB5',
              letterSpacing: 5,
              textTransform: 'uppercase',
            }}
          >
            Creator Management
          </div>
        </>
      )}
    </div>
  );
}
