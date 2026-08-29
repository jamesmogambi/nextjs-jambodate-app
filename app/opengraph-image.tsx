import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'JamboDate - Kenyan Dating App for Meaningful Connections';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#0D1110',
          color: '#F5F3EF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <div style={{ fontSize: 120, fontWeight: 'bold', letterSpacing: -4 }}>
            JamboDate
          </div>
          <div style={{ fontSize: 40, color: '#D85B7A', fontWeight: 500 }}>
            Real People. Meaningful Connections.
          </div>
          <div style={{ fontSize: 28, color: '#A8AAA5', marginTop: 12 }}>
            Kenya&apos;s Trusted Dating Platform
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
