import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Nav } from "./components/chrome/Nav";
import { Footer } from "./components/chrome/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Birchlogic · Cybersecurity, done seriously.",
    template: "%s",
  },
  description:
    "Senior cybersecurity advisory boutique. Founded in India, delivering across six countries. Old school in discipline. Cutting edge in execution.",
};

/**
 * `public/no-flash.js` runs before React hydrates. It reads `bl:theme` and
 * `bl:neon` from localStorage and applies them to <html> so a refresh in a
 * non-default theme combo does not flicker dark/lime first.
 *
 * Loaded via next/script with `beforeInteractive`: per Next 16 docs that is
 * the right strategy for critical, pre-hydration boot code. Source must be a
 * file URL, not inline children.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Script src="/no-flash.js" strategy="beforeInteractive" />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
