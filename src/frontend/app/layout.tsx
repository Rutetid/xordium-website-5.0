import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Barlow_Condensed, Space_Mono } from "next/font/google";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import BackgroundCollage from "@/components/BackgroundCollage";
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

export const metadata: Metadata = {
  title: "Xordium 5.0 — Flagship Technology Symbiosis",
  description:
    "Where cybernetic intellect confronts elite physical esports execution. 48 hours of multi-tier collegiate warfare at BIT.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1a1a2e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${monoFont.variable}`}>
      <body className="bg-[#1a1a2e] text-white antialiased">
        <BackgroundCollage>
          <SiteHeader />
          {children}
          <SiteFooter />
        </BackgroundCollage>
      </body>
    </html>
  );
}
