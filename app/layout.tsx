import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo } from "next/font/google";
import { Nav } from "./components/chrome/Nav";
import { Footer } from "./components/chrome/Footer";
import { GlobalMeshBackdrop } from "./components/chrome/GlobalMeshBackdrop";
import { SITE_URL } from "./lib/seo";
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

/**
 * Display grotesque, used ONLY for small uppercase labels: section
 * eyebrows, column heads, quote attributions.
 *
 * Those labels used to be Geist Mono, uppercase, tracked out to 0.14-0.18em.
 * That exact combination (mono + very wide tracking + all caps) is the
 * typographic tic that reads as machine-generated, and it was killing the
 * page. A bold grotesque set in caps at tight tracking reads the opposite
 * way: newspaper section head, not generated label. Archivo is a true
 * grotesque with enough weight at 11-13px to hold its own against Geist
 * without muddying it.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const ROOT_DESCRIPTION =
  "Senior cybersecurity advisory boutique. Founded in India, delivering across six countries. Old school in discipline. Cutting edge in execution.";

/**
 * Root defaults only. Every route sets its own title/description/Open Graph
 * via `pageMeta` in app/lib/seo.ts — Next does not deep-merge `openGraph`,
 * so a route that omits it would inherit this homepage card wholesale.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Birchlogic · Cybersecurity, done seriously.",
    template: "%s",
  },
  description: ROOT_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Birchlogic",
    title: "Birchlogic · Cybersecurity, done seriously.",
    description: ROOT_DESCRIPTION,
    url: SITE_URL,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Birchlogic · Cybersecurity, done seriously.",
    description: ROOT_DESCRIPTION,
  },
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
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable}`}
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
