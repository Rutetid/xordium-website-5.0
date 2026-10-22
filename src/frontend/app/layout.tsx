import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Barlow_Condensed, Rajdhani, Space_Mono } from "next/font/google";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import "./globals.css";

// Self-hosted via next/font: no render-blocking Google Fonts requests,
// only the weights actually used on the site.
const displayFont = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const monoFont = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

// Cyberpunk-2077-alike display face — used for the navbar wordmark only.
const cyberFont = Rajdhani({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-cyber",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xordium 5.0 — Flagship Technology Symbiosis",
  description:
    "Where cybernetic intellect confronts elite physical esports execution. 48 hours of multi-tier collegiate warfare at BIT.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0c10",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${monoFont.variable} ${cyberFont.variable}`}
    >
      <body className="bg-[#0a0c10] text-white antialiased">
        {/* Structural shell only — the sticker collage is gone for good. */}
        <div className="collage-shell">
          <div className="collage-content">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
