import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'NextoPDF Pro';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          background: 'linear-gradient(135deg, #0f172a 0%, #2563eb 45%, #06b6d4 100%)',
          color: 'white',
          padding: '60px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            border: '1px solid rgba(255,255,255,0.22)',
            borderRadius: '36px',
            padding: '48px',
            background: 'rgba(15,23,42,0.22)',
          }}
        >
          <div style={{ fontSize: 28, letterSpacing: 8, textTransform: 'uppercase', opacity: 0.75 }}>
            Free online PDF tools
          </div>
          <div>
            <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>NextoPDF Pro</div>
            <div style={{ marginTop: 20, fontSize: 30, maxWidth: 900, lineHeight: 1.35, opacity: 0.92 }}>
              Merge, split, compress, convert, sign, and organize PDF files directly in your browser.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 18, fontSize: 22 }}>
            <div style={{ padding: '12px 20px', borderRadius: 999, background: 'rgba(255,255,255,0.16)' }}>Private workflow</div>
            <div style={{ padding: '12px 20px', borderRadius: 999, background: 'rgba(255,255,255,0.16)' }}>No install</div>
            <div style={{ padding: '12px 20px', borderRadius: 999, background: 'rgba(255,255,255,0.16)' }}>Free tools</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
