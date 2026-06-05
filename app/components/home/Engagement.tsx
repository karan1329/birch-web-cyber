"use client";

import { Anchor } from "../primitives/Anchor";
import { SplitText } from "../primitives/SplitText";
import { TiltCard } from "../primitives/TiltCard";

type Tier = { tier: string; label: string; meta: string; body: string };

const TIERS: Tier[] = [
  {
    tier: "I",
    label: "Quick Sprints",
    meta: "2 to 4 wks · fixed scope",
    body: "Twelve engagements we have run enough times to deliver in two to four weeks. Each fixes one specific thing. Senior partner in every meeting. Fixed scope, fixed delivery date.",
  },
  {
    tier: "II",
    label: "vCISO",
    meta: "Month-to-month · multi-year",
    body: "The CISO office, on retainer. Three intensities, scaled to the regulator on your back and the board cycle ahead.",
  },
  {
    tier: "III",
    label: "Fractional Security Office",
    meta: "12 to 24 months · dedicated",
    body: "A complete security office. Dedicated team. We own the program, run the team, report to the board.",
  },
];

export function Engagement() {
  return (
    <section
      style={{
        position: "relative",
        background: "var(--bl-bone)",
        color: "var(--bl-bone-fg)",
        padding: "clamp(100px, 14vw, 180px) var(--bl-page-pad)",
      }}
    >
      <div
        className="bl-container"
        style={{ padding: 0 }}
      >
        <Anchor number="03" label="Engagement" inverted />

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(40px, 6vw, 96px)",
            lineHeight: 0.94,
            letterSpacing: "-0.04em",
            margin: "0 0 clamp(48px, 6vw, 80px)",
            maxWidth: "var(--bl-heading-wide)",
            color: "var(--bl-bone-fg)",
          }}
        >
          <SplitText text="Three commercial shapes." perChar={0.012} />
          <br />
          <SplitText
            text="Same craft."
            perChar={0.012}
            delay={0.22}
            style={{ color: "var(--bl-bone-fg3)" }}
          />
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {TIERS.map((t, i) => (
            <TierCard key={i} tier={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  return (
    <TiltCard href="/services" max={10} minHeight={420}>
      {(hov) => (
        <>
          {/* Huge background number */}
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
                // Long labels (FSO) shrink one step so they wrap to 2-3 lines
                // cleanly without overflowing the card.
                fontSize:
                  tier.label.length > 14
                    ? "clamp(28px, 3.4vw, 44px)"
                    : "clamp(38px, 4.4vw, 56px)",
                lineHeight: 0.98,
                letterSpacing: "-0.03em",
                margin: "0 0 20px",
                color: "var(--bl-fg)",
              }}
            >
              {tier.label}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 15,
                color: "var(--bl-fg2)",
                lineHeight: 1.55,
                margin: "0 0 28px",
                maxWidth: 320,
              }}
            >
              {tier.body}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 20,
                borderTop: "1px solid var(--bl-rule)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--bl-fg3)",
                  letterSpacing: "0.04em",
                }}
              >
                {tier.meta}
              </span>
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
