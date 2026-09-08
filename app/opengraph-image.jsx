import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
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
          backgroundColor: '#172554',
        }}
      >
        <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, color: '#eab308' }}>
          mr. alston
        </div>
        <div style={{ display: 'flex', fontSize: 40, marginTop: 24, color: '#f8fafc', textAlign: 'center' }}>
          Dennis Alston — Experienced Web Developer
        </div>
        <div style={{ display: 'flex', fontSize: 28, marginTop: 16, color: '#93c5fd' }}>
          17+ Years of Expertise
        </div>
      </div>
    ),
    { ...size }
  )
}
