import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "./components/chrome/Nav";
import { Footer } from "./components/chrome/Footer";
import { GlobalMeshBackdrop } from "./components/chrome/GlobalMeshBackdrop";
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
 * The palette is locked (beige + cranberry, no dark mode), so there is no
 * pre-hydration theme boot script any more: nothing can flash because
 * nothing swaps. `public/no-flash.js` and `useTheme`/`ThemeSwitcher` were
 * removed with the switcher.
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
        {/* GlobalMeshBackdrop is first in DOM so later siblings (Nav,
            main, Footer) paint on top at default z-index. */}
        <GlobalMeshBackdrop />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
