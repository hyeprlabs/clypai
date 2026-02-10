import { getPageImage, blog } from "@/lib/source";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<"/og/blog/[...slug]">) {
  
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
        letterSpacing: '-.02em',
        fontWeight: 700,
        background: 'white',
      }}
    >
      <div
        style={{
          left: 42,
          top: 42,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            width: 24,
            height: 24,
            background: 'black',
          }}
        />
        <span
          style={{
            marginLeft: 8,
            fontSize: 20,
          }}
        >
          clypai.com
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          padding: '20px 50px',
          margin: '0 42px',
          fontSize: 40,
          width: 'auto',
          maxWidth: 550,
          textAlign: 'center',
          backgroundColor: 'black',
          color: 'white',
          lineHeight: 1.4,
        }}
      >
        {page.data.name}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return blog.getPages().map((page) => ({
    slug: getPageImage(page).segments,
  }));
}