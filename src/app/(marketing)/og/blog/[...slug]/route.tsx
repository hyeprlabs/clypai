import { getPageImage, blog } from "@/lib/source";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

export const revalidate = false;

/** Titles longer than this threshold use a smaller font size */
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
    </div>
  );
}

export function generateStaticParams() {
  return blog.getPages().map((page) => ({
    slug: getPageImage(page).segments,
  }));
}