import { getPageImage, blog } from "@/lib/source";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

export const revalidate = false;

/** Titles with 50+ characters use a smaller font size for better fit */
const TITLE_LENGTH_THRESHOLD = 50;

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
        background: '#000000',
        fontFamily: 'sans-serif',
        padding: '0 80px',
      }}
    >
      <span
        style={{
          fontSize: page.data.name.length > TITLE_LENGTH_THRESHOLD ? 44 : 56,
          fontWeight: 700,
          color: '#ffffff',
          textAlign: 'center',
          lineHeight: 1.25,
          letterSpacing: '-0.03em',
          maxWidth: 880,
        }}
      >
        {page.data.name}
      </span>
      {page.data.category && (
        <span
          style={{
            position: 'absolute',
            bottom: 40,
            right: 60,
            fontSize: 18,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'capitalize',
            letterSpacing: '0.04em',
          }}
        >
          {page.data.category}
        </span>
      )}
    </div>
  );
}

export function generateStaticParams() {
  return blog.getPages().map((page) => ({
    slug: getPageImage(page).segments,
  }));
}