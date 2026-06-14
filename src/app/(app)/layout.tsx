import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { GeistPixelSquare } from "geist/font/pixel";

// Ignore missing type declarations for side-effect CSS import
// @ts-ignore
import "@/app/globals.css";

// Metadata
import { metadata } from "@/app/(app)/metadata";

// Providers
import { Providers } from "@/app/(app)/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export { metadata };

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${GeistPixelSquare.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
