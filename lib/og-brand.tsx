/** Shared visual for favicon and Open Graph (ImageResponse JSX). */
export function OgBrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 45%, #3b0764 100%)',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: compact ? 56 : 120,
          height: compact ? 56 : 120,
          borderRadius: compact ? 16 : 28,
          background: 'linear-gradient(135deg, #ec4899, #9333ea)',
          marginBottom: compact ? 0 : 32,
        }}
      >
        <span
          style={{
            fontSize: compact ? 28 : 56,
            fontWeight: 700,
            color: 'white',
            letterSpacing: -2,
          }}
        >
          OFM
        </span>
      </div>
      {!compact && (
        <>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: 'white',
              letterSpacing: -1,
              marginBottom: 12,
            }}
          >
            OFM&apos;s Model Agency
          </div>
          <div
            style={{
              fontSize: 22,
              color: 'rgba(255,255,255,0.65)',
              letterSpacing: 4,
            }}
          >
            LUXURY ONLYFANS MANAGEMENT
          </div>
        </>
      )}
    </div>
  );
}
