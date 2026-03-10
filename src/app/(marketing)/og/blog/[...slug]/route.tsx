import { getPageImage, blog } from "@/lib/source";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const revalidate = false;

// ---------------------------------------------------------------------------
// Font helpers
// ---------------------------------------------------------------------------

function getGeistMonoFont(): ArrayBuffer {
  const buf = readFileSync(join(process.cwd(), "public/fonts/GeistMono.woff2"));
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

async function getInstrumentSerifFont(): Promise<ArrayBuffer> {
  // Try to fetch Instrument Serif from Google Fonts (works on Vercel at build time)
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0" } }
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('woff2'\)/)?.[1];
    if (!url) throw new Error("Font URL not found");
    const fontData = await fetch(url).then((r) => r.arrayBuffer());
    return fontData;
  } catch {
    // Fallback to local Liberation Serif Bold
    const buf = readFileSync(
      join(process.cwd(), "public/fonts/LiberationSerif-Bold.ttf")
    );
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
  }
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const page = blog.getPage(slug.slice(0, -1));

  if (!page) notFound();

  const date = new Date(page.data.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [geistMono, instrumentSerif] = await Promise.all([
    getGeistMonoFont(),
    getInstrumentSerifFont(),
  ]);

  const title = page.data.name;
  const description = page.data.description;
  const category = (page.data.category ?? "blog").toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          backgroundColor: "#000000",
          fontFamily: "mono",
          position: "relative",
        }}
      >
        {/* Subtle horizontal rule below header area */}
        <div
          style={{
            position: "absolute",
            top: 108,
            left: 64,
            right: 64,
            height: 1,
            backgroundColor: "rgba(255,255,255,0.1)",
          }}
        />

        {/* Bottom rule */}
        <div
          style={{
            position: "absolute",
            bottom: 104,
            left: 64,
            right: 64,
            height: 1,
            backgroundColor: "rgba(255,255,255,0.1)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "44px 64px",
            position: "relative",
          }}
        >
          {/* Header: logo + category */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontFamily: "mono",
              }}
            >
              {/* Logo square */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: "#ffffff",
                  borderRadius: 6,
                }}
              />
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  fontFamily: "mono",
                }}
              >
                ClypAI
              </span>
            </div>

            {/* Category badge */}
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.12em",
                fontFamily: "mono",
              }}
            >
              {category}
            </span>
          </div>

          {/* Title block */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <h1
              style={{
                fontSize: title.length > 50 ? 68 : 80,
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                margin: 0,
                fontFamily: "serif",
                maxWidth: 1020,
              }}
            >
              {title}
            </h1>

            {description && (
              <p
                style={{
                  fontSize: 22,
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.5,
                  margin: 0,
                  fontFamily: "mono",
                  maxWidth: 860,
                  letterSpacing: "-0.01em",
                }}
              >
                {description.length > 120
                  ? description.slice(0, 120) + "…"
                  : description}
              </p>
            )}
          </div>

          {/* Footer: site + date */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.04em",
                fontFamily: "mono",
              }}
            >
              clypai.com
            </span>
            <span
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.04em",
                fontFamily: "mono",
              }}
            >
              {date}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "mono",
          data: geistMono,
          style: "normal",
          weight: 400,
        },
        {
          name: "serif",
          data: instrumentSerif,
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
