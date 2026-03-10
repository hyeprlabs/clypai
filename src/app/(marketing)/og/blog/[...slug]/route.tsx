import { getPageImage, blog } from "@/lib/source";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const revalidate = false;

// ---------------------------------------------------------------------------
// Font helper — next/og (Satori) requires TTF/OTF, NOT WOFF/WOFF2.
// We use an old MSIE User-Agent so Google Fonts returns TTF URLs.
// ---------------------------------------------------------------------------

let _geistMonoTTF: ArrayBuffer | null = null;

async function getGeistMonoTTF(): Promise<ArrayBuffer> {
  if (_geistMonoTTF) return _geistMonoTTF;
  try {
    const cssRes = await fetch(
      "https://fonts.googleapis.com/css2?family=Geist+Mono&display=swap",
      {
        headers: {
          "User-Agent":
            "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)",
        },
      }
    );
    const css = await cssRes.text();
    const match =
      css.match(/src:\s*url\(([^)]+\.ttf)\)\s*format\('truetype'\)/i) ??
      css.match(/src:\s*url\(([^)]+)\)\s*format\('truetype'\)/i) ??
      css.match(/src:\s*url\(([^)]+\.ttf)\)/i);
    if (!match?.[1]) throw new Error("No TTF URL found");
    const fontRes = await fetch(match[1]);
    const buf = await fontRes.arrayBuffer();
    _geistMonoTTF = buf;
    return _geistMonoTTF;
  } catch {
    // Fallback when Google Fonts is unreachable at build time.
    // LiberationSerif-Bold.ttf is the only TTF committed to the repo.
    // The OG image will still render; only the font face will differ.
    const buf = readFileSync(
      join(process.cwd(), "public/fonts/LiberationSerif-Bold.ttf")
    );
    _geistMonoTTF = buf.buffer.slice(
      buf.byteOffset,
      buf.byteOffset + buf.byteLength
    ) as ArrayBuffer;
    return _geistMonoTTF;
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

  const geistMono = await getGeistMonoTTF();
  const title = page.data.name;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "52px 64px",
          fontFamily: "mono",
          background:
            "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 60%, #111111 100%)",
        }}
      >
        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 28,
              height: 28,
              backgroundColor: "#ffffff",
              borderRadius: 5,
            }}
          />
          <span
            style={{
              fontSize: 20,
              fontWeight: 400,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            ClypAI
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "flex-end",
            paddingBottom: 36,
          }}
        >
          <h1
            style={{
              fontSize: title.length > 55 ? 64 : title.length > 35 ? 74 : 88,
              fontWeight: 400,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: 0,
              maxWidth: 1020,
            }}
          >
            {title}
          </h1>
        </div>

        {/* Footer */}
        <span
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.06em",
          }}
        >
          clypai.com
        </span>
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
      ],
    }
  );
}

export function generateStaticParams() {
  return blog.getPages().map((page) => ({
    slug: getPageImage(page).segments,
  }));
}

