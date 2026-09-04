"use client";

import { Anchor } from "../primitives/Anchor";
import { Rise } from "../primitives/Rise";

type Phase = {
  marker: string;
  title: string;
  body: string;
};

const PHASES: Phase[] = [
  {
    marker: "Week 1",
    title: "Discovery and scope.",
    body: "Partner kickoff. Identity architecture review begins. Quick wins identified for delivery in week two.",
  },
  {
    marker: "Weeks 2 to 4",
    title: "Foundation.",
    body: "Risk appetite session with executive team. Control gap assessment. Quick wins shipped. First evidence baseline.",
  },
  {
    marker: "Weeks 5 to 12",
    title: "Program execution.",
    body: "Whichever tier the engagement is. Quarterly board pack delivered on first cycle.",
  },
  {
    marker: "Ongoing",
    title: "Cadence.",
    body: "Partner runs weekly cadence. Quarterly CRQ artifact for board. Annual rescope.",
  },
];

/**
 * The "how an engagement actually runs" section on /how-we-work.
 * A four-row ledger with mono week markers in the left rail and the phase
 * description on the right.
 */
export function EngagementCycle() {
  return (
    <section
      style={{
        position: "relative",
        background: "var(--bl-section-veil)",
        color: "var(--bl-fg)",
        padding: "var(--bl-section-gap) var(--bl-page-pad)",}}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="03" label="How an engagement runs" />

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(36px, 5.5vw, 84px)",
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            margin: "0 0 clamp(48px, 6vw, 80px)",
            maxWidth: "var(--bl-heading-wide)",
          }}
        >
          From kickoff through the third board cycle.
        </h2>

        <ol
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            borderTop: "1px solid var(--bl-rule)",
          }}
        >
          {PHASES.map((phase, i) => (
            <Rise
              key={i}
              delay={i * 0.04}
              as="li"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(140px, 200px) minmax(0, 1fr)",
                gap: "clamp(24px, 4vw, 64px)",
                padding: "clamp(28px, 3.4vw, 44px) 0",
                borderBottom: "1px solid var(--bl-rule)",
                alignItems: "baseline",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  color: "var(--bl-fg3)",
                  textTransform: "uppercase",
                }}
              >
                {phase.marker}
              </span>
              <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 500,
                      fontSize: "clamp(20px, 1.9vw, 28px)",
                      lineHeight: 1.2,
                      letterSpacing: "-0.015em",
                      color: "var(--bl-fg)",
                      margin: "0 0 8px",
                    }}
                  >
                    {phase.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "clamp(14px, 1.1vw, 16px)",
                      lineHeight: 1.6,
                      color: "var(--bl-fg2)",
                      margin: 0,
                      maxWidth: "var(--bl-text-narrow)",
                    }}
                  >
                    {phase.body}
                  </p>
                </div>
            </Rise>
          ))}
        </ol>
      </div>
    </section>
  );
}
