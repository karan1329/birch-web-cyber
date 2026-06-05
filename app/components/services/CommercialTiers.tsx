"use client";

import { Anchor } from "../primitives/Anchor";
import { SplitText } from "../primitives/SplitText";
import { TiltCard } from "../primitives/TiltCard";

type Tier = {
  tier: string;
  label: string;
  intro: string;
  why: string;
  href: string;
};

const TIERS: Tier[] = [
  {
    tier: "I",
    label: "Quick Sprints",
    intro: "Twelve engagements we have run enough times to deliver in two to four weeks. Each fixes one specific thing.",
    why: "Senior partner in every meeting. Fixed scope, fixed price, fixed delivery date.",
    href: "#sprints",
  },
  {
    tier: "II",
    label: "vCISO retainer",
    intro: "The CISO office, on retainer. Three sub-tiers by intensity and regulated-buyer fit.",
    why: "Month-to-month commercial. Most engagements run multi-year because the program compounds.",
    href: "#vciso",
  },
  {
    tier: "III",
    label: "Fractional Security Office",
    intro: "A complete security office. Dedicated team. Embedded partnership.",
    why: "We own the program. Run the team. Report to the board. Hand it back when you are ready.",
    href: "#fso",
  },
];

/**
 * Three commercial shapes, mapped against the five practices above.
 * Same tilt-card pattern used on the home page, with copy from doc Page 3.
 */
export function CommercialTiers() {
  return (
    <section
      style={{
        position: "relative",
        background: "var(--bl-bone)",
        color: "var(--bl-bone-fg)",
        padding: "clamp(100px, 14vw, 180px) var(--bl-page-pad)",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="03" label="Commercial shapes" inverted />

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(36px, 5.5vw, 88px)",
            lineHeight: 0.96,
            letterSpacing: "-0.038em",
            margin: "0 0 24px",
            maxWidth: "var(--bl-heading-wide)",
            color: "var(--bl-bone-fg)",
          }}
        >
          <SplitText
            text="Three commercial shapes."
            perChar={0.012}
          />
          <br />
          <SplitText
            text="Same craft."
            perChar={0.012}
            delay={0.24}
            style={{ color: "var(--bl-bone-fg3)" }}
          />
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(15px, 1.2vw, 17px)",
            color: "var(--bl-bone-fg2)",
            lineHeight: 1.65,
            maxWidth: "var(--bl-text-body)",
            margin: "0 0 clamp(48px, 6vw, 80px)",
          }}
        >
          How you actually engage us. Three shapes, mapped against the five
          practices above.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {TIERS.map((t) => (
            <TierCard key={t.tier} tier={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  return (
    <TiltCard href={tier.href} max={10} minHeight={440}>
      {(hov) => (
        <>
          {/* Huge background numeral */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              right: -12,
              bottom: -32,
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(220px, 26vw, 360px)",
              lineHeight: 0.85,
              letterSpacing: "-0.08em",
              color: "rgba(var(--bl-neon-rgb),0.05)",
              transition: "color 0.4s ease, transform 0.4s ease",
              transform: hov ? "translate(-12px, -10px) scale(1.02)" : "none",
            }}
          >
            {tier.tier}
          </div>

          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--bl-fg3)",
                letterSpacing: "0.06em",
              }}
            >
              Tier {tier.tier}
            </span>
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                background: "var(--bl-neon)",
                borderRadius: "50%",
                boxShadow: hov ? "0 0 16px var(--bl-neon)" : "none",
                transition: "box-shadow 0.3s ease",
              }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <h3
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize:
                  tier.label.length > 14
                    ? "clamp(26px, 3.2vw, 42px)"
                    : "clamp(34px, 4vw, 52px)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
                margin: "0 0 18px",
                color: "var(--bl-fg)",
              }}
            >
              {tier.label}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 15,
                color: "var(--bl-fg)",
                lineHeight: 1.55,
                margin: "0 0 16px",
                fontWeight: 500,
                maxWidth: 340,
              }}
            >
              {tier.intro}
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                color: "var(--bl-fg2)",
                lineHeight: 1.6,
                margin: "0 0 24px",
                maxWidth: 340,
              }}
            >
              {tier.why}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingTop: 16,
                borderTop: "1px solid var(--bl-rule)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: hov ? "var(--bl-neon)" : "transparent",
                  border: `1px solid ${
                    hov ? "var(--bl-neon)" : "var(--bl-rule2)"
                  }`,
                  color: hov ? "var(--bl-ink)" : "var(--bl-fg)",
                  fontSize: 13,
                  transition: "all 0.3s ease",
                  transform: hov ? "rotate(-45deg)" : "rotate(0deg)",
                }}
              >
                →
              </span>
            </div>
          </div>
        </>
      )}
    </TiltCard>
  );
}
