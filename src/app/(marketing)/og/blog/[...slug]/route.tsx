import { getPageImage, blog } from "@/lib/source";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const revalidate = false;

// ---------------------------------------------------------------------------
// Font helpers — next/og (Satori) requires TTF/OTF, NOT WOFF/WOFF2.
// We use an old MSIE User-Agent when querying Google Fonts so the API returns
// a stylesheet referencing TTF sources instead of the modern woff2 sources.
// ---------------------------------------------------------------------------

/** Module-level cache so fonts are loaded once per warm Lambda/worker. */
let _geistMonoTTF: ArrayBuffer | null = null;
let _serifTTF: ArrayBuffer | null = null;

async function fetchTTFFromGoogleFonts(family: string): Promise<ArrayBuffer> {
  // Old IE UA → Google Fonts responds with TrueType/format('truetype') URLs
  let css: string;
  try {
    const cssRes = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}&display=swap`,
      {
        headers: {
          "User-Agent":
            "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)",
        },
      }
    );
    css = await cssRes.text();
  } catch (err) {
    throw new Error(
      `Failed to fetch Google Fonts CSS for "${family}": ${err instanceof Error ? err.message : String(err)}`
    );
  }

  // The old-UA stylesheet uses `src: url(...ttf) format('truetype')`
  const match =
    css.match(/src:\s*url\(([^)]+\.ttf)\)\s*format\('truetype'\)/i) ??
    css.match(/src:\s*url\(([^)]+)\)\s*format\('truetype'\)/i) ??
    css.match(/src:\s*url\(([^)]+\.ttf)\)/i);

  if (!match?.[1]) {
    const preview = css.slice(0, 200).replace(/\n/g, " ");
    throw new Error(
      `No TTF URL found in Google Fonts CSS for "${family}". CSS preview: "${preview}"`
    );
  }

  try {
    const fontRes = await fetch(match[1]);
    return fontRes.arrayBuffer();
  } catch (err) {
    throw new Error(
      `Failed to download TTF font for "${family}" from ${match[1]}: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

async function getGeistMonoTTF(): Promise<ArrayBuffer> {
  if (_geistMonoTTF) return _geistMonoTTF;
  try {
    _geistMonoTTF = await fetchTTFFromGoogleFonts("Geist Mono");
    return _geistMonoTTF;
  } catch {
    // Fallback: use the Noto Sans TTF that next/og ships with (stable path)
    const ttfPath = require.resolve(
      "next/dist/compiled/@vercel/og/noto-sans-v27-latin-regular.ttf"
    );
    const buf = readFileSync(ttfPath);
    _geistMonoTTF = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
    return _geistMonoTTF;
  }
}

async function getSerifTTF(): Promise<ArrayBuffer> {
  if (_serifTTF) return _serifTTF;
  try {
    _serifTTF = await fetchTTFFromGoogleFonts("Instrument Serif");
    return _serifTTF;
  } catch {
    // Fallback: local Liberation Serif Bold (TTF, already verified)
    const buf = readFileSync(
      join(process.cwd(), "public/fonts/LiberationSerif-Bold.ttf")
    );
    _serifTTF = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
    return _serifTTF;
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

  const [geistMono, serifFont] = await Promise.all([
    getGeistMonoTTF(),
    getSerifTTF(),
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
        {/* Hairline below header */}
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

        {/* Hairline above footer */}
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
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
                  fontWeight: 400,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  fontFamily: "mono",
                }}
              >
                ClypAI
              </span>
            </div>

            <span
              style={{
                fontSize: 12,
                fontWeight: 400,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.12em",
                fontFamily: "mono",
              }}
            >
              {category}
            </span>
          </div>

          {/* Title + description */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
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
