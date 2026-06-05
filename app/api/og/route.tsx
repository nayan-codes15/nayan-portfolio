import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #0f0f2a 50%, #1a0a2e 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(0,212,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Glow orbs */}
        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
            top: -100,
            right: -100,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(123,47,190,0.12) 0%, transparent 70%)',
            bottom: -80,
            left: -80,
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            zIndex: 10,
          }}
        >
          {/* Hexagon avatar */}
          <div
            style={{
              width: 100,
              height: 100,
              background: 'linear-gradient(135deg, #00d4ff, #7b2fbe)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              fontSize: 42,
              fontWeight: 900,
              color: '#0a0a0f',
              letterSpacing: '-0.02em',
              boxShadow: '0 0 60px rgba(0,212,255,0.3)',
            }}
          >
            ND
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              display: 'flex',
              gap: 16,
            }}
          >
            <span style={{ color: '#f0f0ff' }}>Nayan</span>
            <span
              style={{
                background: 'linear-gradient(90deg, #00d4ff, #7b2fbe)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Deep
            </span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 28,
              color: '#8888aa',
              fontWeight: 500,
              letterSpacing: '0.05em',
            }}
          >
            CS Student · Software Developer · AI Enthusiast
          </div>

          {/* Tech pills */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              marginTop: 12,
            }}
          >
            {['React', 'TypeScript', 'AWS', 'C++', 'Python', 'Next.js'].map(
              (tech) => (
                <div
                  key={tech}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 99,
                    border: '1px solid rgba(0,212,255,0.3)',
                    background: 'rgba(0,212,255,0.08)',
                    color: '#00d4ff',
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  {tech}
                </div>
              ),
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #00d4ff, #7b2fbe, #00ff88)',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
