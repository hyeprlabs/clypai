import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') || 'ClypAI Blog';
    const author = searchParams.get('author') || 'Hyepr Labs';
    const date = searchParams.get('date') || '';
    const tags = searchParams.get('tags') || '';

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
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            padding: '80px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Tags */}
          {tags && (
            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              {tags.split(',').map((tag, i) => (
                <span
                  key={i}
                  style={{
                    background: 'rgba(148, 163, 184, 0.1)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    color: '#94a3b8',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '24px',
                    fontWeight: '500',
                  }}
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              marginTop: tags ? '40px' : '0',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <h1
              style={{
                fontSize: '72px',
                fontWeight: '700',
                color: '#ffffff',
                lineHeight: '1.1',
                margin: 0,
                maxWidth: '90%',
              }}
            >
              {title}
            </h1>
          </div>

          {/* Footer with author and date */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              borderTop: '1px solid rgba(148, 163, 184, 0.2)',
              paddingTop: '30px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '30px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#ffffff',
                }}
              >
                {author.charAt(0)}
              </div>
              <span
                style={{
                  fontSize: '28px',
                  fontWeight: '600',
                  color: '#e2e8f0',
                }}
              >
                {author}
              </span>
            </div>
            {date && (
              <span
                style={{
                  fontSize: '24px',
                  color: '#94a3b8',
                }}
              >
                {new Date(date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            )}
          </div>

          {/* ClypAI branding */}
          <div
            style={{
              position: 'absolute',
              top: '80px',
              right: '80px',
              fontSize: '32px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'flex',
            }}
          >
            ClypAI
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: unknown) {
    console.log(`Error generating OG image: ${e instanceof Error ? e.message : String(e)}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
