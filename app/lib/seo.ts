import type { Metadata } from "next";

/**
 * Per-route metadata builder.
 *
 * Next.js does NOT derive `openGraph.title` from `title`, and it does not
 * deep-merge `openGraph` across layout and page. A page that sets only
 * `title`/`description` therefore inherits the ROOT layout's Open Graph
 * block wholesale — which is how every route ended up unfurling with the
 * homepage's card. These pages get forwarded in WhatsApp, so the preview
 * card is a first impression; every route needs its own.
 *
 * `pageMeta` builds title, description, canonical, Open Graph and Twitter
 * from a single source so the three can never drift apart.
 */

export const SITE_NAME = "Birchlogic";

/**
 * Absolute base for canonical URLs and OG image resolution. Vercel/SST both
 * expose the deployment host; fall back to the production domain so local
 * builds still emit absolute URLs.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://birchlogic.com";

type Args = {
  /** Page title WITHOUT the site suffix — the suffix is added here. */
  title: string;
  description: string;
  /** Route path, e.g. "/services". Used for the canonical URL. */
  path: string;
  /** Omit the " · Birchlogic" suffix (used by the homepage). */
  bare?: boolean;
};

export function pageMeta({
  title,
  description,
  path,
  bare = false,
}: Args): Metadata {
  const full = bare ? title : `${title} · ${SITE_NAME}`;
  const url = `${SITE_URL}${path === "/" ? "" : path}`;

  return {
    title: full,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: full,
      description,
      url,
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
    },
  };
}
