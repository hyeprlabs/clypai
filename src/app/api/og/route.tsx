import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'ClypAI Blog';
    const category = searchParams.get('category') || 'Blog';
    const date = searchParams.get('date');

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
            padding: '80px',
          }}
        >
          {/* Logo/Brand at top */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                letterSpacing: '-0.05em',
              }}
            >
              ClypAI
            </div>
            <div
              style={{
                fontSize: '20px',
                color: '#94a3b8',
                paddingLeft: '16px',
                borderLeft: '2px solid #475569',
              }}
            >
              {category}
            </div>
          </div>

          {/* Main Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              maxWidth: '90%',
            }}
          >
            <h1
              style={{
                fontSize: title.length > 60 ? '64px' : '80px',
                fontWeight: 'bold',
                color: '#ffffff',
                lineHeight: 1.1,
                margin: 0,
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              }}
            >
              {title}
            </h1>
            
            {/* Accent line */}
            <div
              style={{
                width: '120px',
                height: '6px',
                background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
                borderRadius: '3px',
              }}
            />
          </div>

          {/* Footer with date */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {date && (
              <div
                style={{
                  fontSize: '24px',
                  color: '#94a3b8',
                }}
              >
                {new Date(date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            )}
            <div
              style={{
                fontSize: '24px',
                color: '#64748b',
                marginLeft: 'auto',
              }}
            >
              clyp.ai/blog
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}
