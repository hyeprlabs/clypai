import { getPageImage, blog } from "@/lib/source";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

export const revalidate = false;

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

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          background: "#0a0a0a",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%",
            height: "60%",
            background: "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)",
            borderRadius: "100%",
          }}
        />

        {/* Top border accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.2) 70%, transparent)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "56px 64px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header: logo + category */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)",
                }}
              />
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                }}
              >
                ClypAI
              </span>
            </div>

            {/* Category badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "6px 16px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.7)",
                  textTransform: "capitalize",
                  letterSpacing: "0.04em",
                }}
              >
                {category}
              </span>
            </div>
          </div>

          {/* Title */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
            <h1
              style={{
                fontSize: 56,
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              {page.data.name}
            </h1>

            {page.data.description && (
              <p
                style={{
                  fontSize: 22,
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.5,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                {page.data.description.length > 120
                  ? page.data.description.slice(0, 120) + "…"
                  : page.data.description}
              </p>
            )}
          </div>

          {/* Footer: tags + date */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Tags */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {tags.slice(0, 4).map((tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.04)",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>

            {/* Date */}
            <span
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.4)",
                fontFamily: "monospace",
                letterSpacing: "0.02em",
              }}
            >
              {date}
            </span>
          </div>
        </div>

        {/* Bottom border accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.1) 70%, transparent)",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

export function generateStaticParams() {
  return blog.getPages().map((page) => ({
    slug: getPageImage(page).segments,
  }));
}