import { InnerHero } from "../components/primitives/InnerHero";
import { Anchor } from "../components/primitives/Anchor";
import { Rise } from "../components/primitives/Rise";
import { MagButton } from "../components/primitives/MagButton";
import { RoleCard } from "../components/careers/RoleCard";
import { HowWeRun } from "../components/careers/HowWeRun";
import { ROLES } from "../components/careers/roles";

export const metadata = {
  title: "Careers · Birchlogic",
  description:
    "Senior practitioners only. Partner-accountable engagements. The firm is structured around judgement compounding, not junior leverage.",
};

export default function CareersPage() {
  return (
    <>
      <InnerHero
        kicker="Careers"
        title="We hire senior practitioners."
        subtitle="Cybersecurity advisory does not scale on leverage. It scales on judgement. The firm is structured around that fact: every consultant is senior on day one, every engagement is partner-accountable, and the bench stays intentionally short. We measure ourselves against client outcomes, not against a billable-hours target."
      />

      <section
        style={{
          background: "var(--bl-ink)",
          color: "var(--bl-fg)",
          padding: "clamp(100px, 14vw, 180px) var(--bl-page-pad)",
        }}
      >
        <div className="bl-container" style={{ padding: 0 }}>
          <Anchor number="01" label="Open roles" />
          <Rise>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gridAutoRows: "1fr",
                gap: 20,
              }}
            >
              {ROLES.map((r) => (
                <RoleCard key={r.slug} role={r} />
              ))}
            </div>
          </Rise>
        </div>
      </section>

      <HowWeRun />

      <section
        style={{
          background: "var(--bl-ink)",
          color: "var(--bl-fg)",
          padding: "clamp(100px, 12vw, 160px) var(--bl-page-pad)",
          borderTop: "1px solid var(--bl-rule)",
          textAlign: "center",
        }}
      >
        <div className="bl-container" style={{ padding: 0 }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--bl-fg3)",
              margin: "0 0 24px",
            }}
          >
            General inquiries
          </p>
          <Rise>
            <a
              href="mailto:careers@birchlogic.com"
              className="bl-email-link"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "clamp(22px, 2.4vw, 36px)",
                color: "var(--bl-fg)",
                textDecoration: "none",
                paddingBottom: 4,
                borderBottom: "1px solid var(--bl-rule2)",
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
            >
              careers@birchlogic.com
            </a>
          </Rise>
          <div style={{ marginTop: 40 }}>
            <Rise delay={0.15}>
              <MagButton href="/contact" variant="outline">
                Or talk to us first
              </MagButton>
            </Rise>
          </div>
        </div>
      </section>
    </>
  );
}
