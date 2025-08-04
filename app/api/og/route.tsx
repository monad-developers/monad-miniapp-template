import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || 'User';
    const imageUrl = searchParams.get('image') || 'https://i.ibb.co/NdyfX1qx/Monad-Logo-Black-Logo-Mark.png';
    
    const backgroundGradient = '#2D1B69';
    
    // Load Inter font from public directory
    const interFontData = await fetch(
      `${request.nextUrl.origin}/Inter.ttf`
    ).then((res) => res.arrayBuffer());
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            background: backgroundGradient,
            padding: '40px',
            position: 'relative',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '32px',
              width: '100%',
              maxWidth: '520px',
            }}
          >
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: '4px solid white',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f0f0f0',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={username}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#e0e0e0',
                    fontSize: '48px',
                    color: '#666',
                  }}
                >
                  👤
                </div>
              )}
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <h1
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: '0 0 8px 0',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  lineHeight: '1.2',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                {username}
              </h1>
              <p
                style={{
                  fontSize: '24px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  margin: '0',
                  fontWeight: '400',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                Generated using Monad Mini App Template
              </p>
            </div>
          </div>
        </div>
      ),
      {
        width: 600,
        height: 400,
        fonts: [
          {
            name: 'Inter',
            data: interFontData,
            style: 'normal',
          },
        ],
      }
    );
  } catch (e) {
    console.error('Error generating OG image:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
