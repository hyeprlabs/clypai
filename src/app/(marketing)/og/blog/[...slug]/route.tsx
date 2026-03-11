import { getPageImage, blog } from "@/lib/source";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

export const revalidate = false;

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  
  const { slug } = await params;
  
  const page = blog.getPage(slug.slice(0, -1));
  
  if (!page) notFound();

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 24,
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 40%, #0f0f0f 70%, #050505 100%)',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Top branding bar */}
      <div
        style={{
          position: 'absolute',
          top: 48,
          left: 56,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#ffffff',
          }}
        />
        <span
          style={{
            fontSize: 16,
            color: '#9ca3af',
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          clypai.com
        </span>
      </div>

      {/* Category badge */}
      {page.data.category && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6px 16px',
            border: '1px solid #333333',
            borderRadius: 9999,
            fontSize: 13,
            color: '#9ca3af',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {page.data.category}
        </div>
      )}

      {/* Title */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          padding: '0 80px',
          fontSize: page.data.name.length > 50 ? 44 : 56,
          fontWeight: 700,
          color: '#ffffff',
          textAlign: 'center',
          lineHeight: 1.2,
          letterSpacing: '-0.03em',
          maxWidth: 900,
        }}
      >
        {page.data.name}
      </div>

      {/* Author + date row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginTop: 8,
        }}
      >
        <span style={{ fontSize: 15, color: '#6b7280' }}>
          {page.data.author.name}
        </span>
        <span style={{ fontSize: 15, color: '#374151' }}>·</span>
        <span style={{ fontSize: 15, color: '#6b7280' }}>
          {new Date(page.data.date).toLocaleDateString('en-US', { dateStyle: 'long' })}
        </span>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'linear-gradient(90deg, transparent, #333333 30%, #555555 50%, #333333 70%, transparent)',
        }}
      />
    </div>
  );
}

export function generateStaticParams() {
  return blog.getPages().map((page) => ({
    slug: getPageImage(page).segments,
  }));
}