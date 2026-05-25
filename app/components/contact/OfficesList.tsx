"use client";

import { Anchor } from "../primitives/Anchor";
import { Rise } from "../primitives/Rise";

type Office = {
  city: string;
  country?: string;
  status?: "active" | "coming-soon";
};

const OFFICES: Office[] = [
  { city: "Delhi", country: "India", status: "active" },
  { city: "Singapore", status: "coming-soon" },
];

/**
 * Office addresses block. Two offices — Delhi (active) and Singapore
 * (opening soon).
 */
export function OfficesList() {
  return (
    <section
      style={{
        background: "var(--bl-ink)",
        color: "var(--bl-fg)",
        padding: "clamp(100px, 14vw, 180px) var(--bl-page-pad)",
        borderTop: "1px solid var(--bl-rule)",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="04" label="Offices" />

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(28px, 4vw, 60px)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            margin: "0 0 clamp(48px, 6vw, 80px)",
            maxWidth: 1080,
          }}
        >
          Founded in India.
          <br />
          <span style={{ color: "var(--bl-fg3)" }}>
            Singapore office coming soon.
          </span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 0,
            border: "1px solid var(--bl-rule)",
            background: "var(--bl-ink2)",
          }}
        >
          {OFFICES.map((o, i) => (
            <Rise key={i} delay={i * 0.04}>
              <div
                style={{
                  padding: "clamp(28px, 3.4vw, 44px)",
                  borderRight:
                    i < OFFICES.length - 1
                      ? "1px solid var(--bl-rule)"
                      : "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 500,
                      fontSize: "clamp(24px, 2.4vw, 36px)",
                      letterSpacing: "-0.018em",
                      color: "var(--bl-fg)",
                    }}
                  >
                    {o.city}
                  </span>
                  {o.status === "coming-soon" && (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        letterSpacing: "0.14em",
                        padding: "4px 8px",
                        color: "var(--bl-ink)",
                        background: "var(--bl-neon)",
                        borderRadius: 999,
                        textTransform: "uppercase",
                      }}
                    >
                      Coming soon
                    </span>
                  )}
                </div>
                {o.country && (
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.06em",
                      color: "var(--bl-fg3)",
                      textTransform: "uppercase",
                    }}
                  >
                    {o.country}
                  </div>
                )}
                {o.status === "coming-soon" && (
                  <p
                    style={{
                      marginTop: 6,
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      lineHeight: 1.55,
                      color: "var(--bl-fg2)",
                    }}
                  >
                    Pte Ltd entity in formation. Engagements with MAS-licensed
                    counterparties booked from the Delhi office until launch.
                  </p>
                )}
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
