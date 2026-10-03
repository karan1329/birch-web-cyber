import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Files in /public are not content-hashed, so they cannot be
        // `immutable`. Vercel's default for them is `max-age=0,
        // must-revalidate`, which makes every returning visitor re-check every
        // logo and image. A day of freshness plus a week of
        // stale-while-revalidate keeps repeat views instant and still picks up
        // a replaced file within a day.
        source: "/:all*(webp|avif|png|jpg|jpeg|svg|ico|m4a)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
