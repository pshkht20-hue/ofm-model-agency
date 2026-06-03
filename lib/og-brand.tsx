/** Разметка для ImageResponse (Satori): только flex + div, без SVG. */
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: markSize,
          height: markSize,
          marginBottom: compact ? 0 : 36,
          position: 'relative',
          background: '#0a0a0f',
          borderRadius: 14,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: markSize * 0.22,
            top: '50%',
            transform: 'translateY(-50%)',
            width: markSize * 0.46,
            height: markSize * 0.46,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF5BB5, #A855F7)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: markSize * 0.22,
            top: '50%',
            transform: 'translateY(-50%)',
            width: markSize * 0.46,
            height: markSize * 0.46,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00D4FF, #7C3AED)',
            opacity: 0.88,
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            fontSize: compact ? 22 : 28,
            fontWeight: 700,
            color: 'white',
            letterSpacing: -1,
          }}
        >
          ofm
        </div>
      </div>

      {!compact && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
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
              display: 'flex',
              fontSize: 16,
              color: '#FF5BB5',
              letterSpacing: 5,
              textTransform: 'uppercase',
            }}
          >
            Creator Management
          </div>
        </div>
      )}
    </div>
  );
}
