import { pageMeta } from "../lib/seo";

/**
 * `/singapore/page.tsx` is a Client Component (the CRQ counter needs
 * browser APIs), and a Client Component cannot export `metadata`. This
 * segment layout is a Server Component, so it carries the route's title,
 * description and Open Graph card instead.
 */
export const metadata = pageMeta({
  title: "Singapore",
  description:
    "Eighteen months to do five years of work. MAS TRM, Notice 658 and TPRM readiness for Singapore-licensed financial institutions.",
  path: "/singapore",
});

export default function SingaporeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
