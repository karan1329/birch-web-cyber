import Link from "next/link";
import { InnerHero } from "../../components/primitives/InnerHero";
import { Anchor } from "../../components/primitives/Anchor";
import { Rise } from "../../components/primitives/Rise";
import { ApplyForm } from "../../components/careers/ApplyForm";
import { getRole, ROLES } from "../../components/careers/roles";
import { pageMeta } from "../../lib/seo";

export const metadata = pageMeta({
  title: "Apply",
  description:
    "Tell us a real story. Four role-specific questions, no cover letter. Every application lands in Karan's inbox.",
  path: "/careers/apply",
});

type SearchParams = Promise<{ role?: string }>;

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { role: roleParam } = await searchParams;
  const role = getRole(roleParam);

  // No role or unknown role → render a quiet picker rather than crashing.
  if (!role) {
    return <NoRolePicker />;
  }

  return (
    <>
      <InnerHero
        kicker="From Karan"
        title="Tell us a real story."
        subtitle="Four role-specific questions. No cover letter. We read every application ourselves."
      />

      <section
        style={{
          background: "var(--bl-ink)",
          color: "var(--bl-fg)",
          padding:
            "clamp(60px, 9vw, 120px) var(--bl-page-pad) clamp(120px, 14vw, 180px)",
        }}
      >
        <div className="bl-container" style={{ padding: 0 }}>
          <Anchor number="01" label="Your application" />
          <Rise>
            <ApplyForm role={role} />
          </Rise>
        </div>
      </section>
    </>
  );
}

function NoRolePicker() {
  return (
    <>
      <InnerHero
        kicker="Apply"
        title="Which role?"
        subtitle="The application is the same shape for every role, but the questions are written for the role itself. Pick the one that fits."
      />
      <section
        style={{
          background: "var(--bl-ink)",
          color: "var(--bl-fg)",
          padding: "clamp(60px, 9vw, 120px) var(--bl-page-pad) clamp(120px, 14vw, 180px)",
        }}
      >
        <div className="bl-container" style={{ padding: 0 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {ROLES.map((r) => (
              <Link
                key={r.slug}
                href={{ pathname: "/careers/apply", query: { role: r.slug } }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  padding: "clamp(22px, 2.6vw, 32px)",
                  background: "var(--bl-ink2)",
                  border: "1px solid var(--bl-rule)",
                  borderRadius: 16,
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "clamp(18px, 1.7vw, 22px)",
                    color: "var(--bl-fg)",
                    letterSpacing: "-0.012em",
                  }}
                >
                  {r.title}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    color: "var(--bl-fg3)",
                  }}
                >
                  {r.location}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
