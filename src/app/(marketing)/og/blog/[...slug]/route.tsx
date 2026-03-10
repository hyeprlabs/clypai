import { getPageImage, blog } from "@/lib/source";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const revalidate = false;

function getSerifFont(): ArrayBuffer {
  const fontPath = join(process.cwd(), "public/fonts/LiberationSerif-Bold.ttf");
  const buf = readFileSync(fontPath);
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = blog.getPage(slug.slice(0, -1));

  if (!page) notFound();

  const category = page.data.category ?? "blog";
  const tags = page.data.tags ?? [];
  const date = new Date(page.data.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const serifFont = getSerifFont();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          background: "linear-gradient(135deg, #050505 0%, #0d0d14 40%, #10101a 70%, #060610 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Deep gradient orb top-left */}
        <div
          style={{
            position: "absolute",
            top: "-15%",
            left: "-10%",
            width: "55%",
            height: "70%",
            background: "radial-gradient(ellipse at center, rgba(80,60,180,0.18) 0%, rgba(40,20,100,0.08) 50%, transparent 75%)",
            borderRadius: "100%",
          }}
        />

        {/* Subtle orb bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            right: "-5%",
            width: "50%",
            height: "65%",
            background: "radial-gradient(ellipse at center, rgba(20,80,160,0.14) 0%, transparent 70%)",
            borderRadius: "100%",
          }}
        />

        {/* Fine grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* Top edge gradient line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "linear-gradient(90deg, transparent 0%, rgba(130,100,255,0.5) 30%, rgba(80,140,255,0.5) 70%, transparent 100%)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "52px 64px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header: logo + category badge */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Logo mark + wordmark */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(180,180,200,0.6) 100%)",
                }}
              />
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.9)",
                  letterSpacing: "-0.03em",
                  fontFamily: "sans-serif",
                }}
              >
                ClypAI
              </span>
            </div>

            {/* Category pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "7px 18px",
                borderRadius: 999,
                border: "1px solid rgba(150,120,255,0.3)",
                background: "rgba(100,70,200,0.15)",
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "rgba(200,180,255,0.85)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontFamily: "sans-serif",
                }}
              >
                {category}
              </span>
            </div>
          </div>

          {/* Title block */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 920 }}>
            <h1
              style={{
                fontSize: 60,
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                margin: 0,
                fontFamily: "serif",
              }}
            >
              {page.data.name}
            </h1>

            {page.data.description && (
              <p
                style={{
                  fontSize: 21,
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.55,
                  margin: 0,
                  letterSpacing: "-0.01em",
                  fontFamily: "sans-serif",
                }}
              >
                {page.data.description.length > 115
                  ? page.data.description.slice(0, 115) + "…"
                  : page.data.description}
              </p>
            )}
          </div>

          {/* Footer: tags + date */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 8 }}>
              {tags.slice(0, 4).map((tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "5px 13px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.05)",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.45)",
                    fontFamily: "sans-serif",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>

            <span
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.06em",
                fontFamily: "sans-serif",
              }}
            >
              {date}
            </span>
          </div>
        </div>

        {/* Bottom edge gradient line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.08) 60%, transparent)",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "serif",
          data: serifFont,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}

export function generateStaticParams() {
  return blog.getPages().map((page) => ({
    slug: getPageImage(page).segments,
  }));
}