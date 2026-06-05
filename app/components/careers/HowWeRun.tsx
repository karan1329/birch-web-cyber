"use client";

import { Anchor } from "../primitives/Anchor";
import { Rise } from "../primitives/Rise";

type Tenet = { title: string; body: string };

const TENETS: Tenet[] = [
  {
    title: "Partner accountability over every engagement.",
    body: "No client gets handed off after the SOW is signed.",
  },
  {
    title: "No utilization targets.",
    body: "We optimize for client outcomes, partner judgment, and senior practitioner retention. Not for billable hours per consultant per week.",
  },
  {
    title: "Single-tenant client engagements.",
    body: "Each consultant works one to three engagements at a time. Not eight.",
  },
  {
    title: "Internal AI tooling handles the bureaucratic 60 percent.",
    body: "Your time goes to judgment, board narrative, and regulator response.",
  },
];

/**
 * "How we run the firm" tenets section. 2x2 grid of restraint principles.
 */
export function HowWeRun() {
  return (
    <section
      style={{
        position: "relative",
        background: "var(--bl-section-veil)",
        color: "var(--bl-fg)",
        padding: "clamp(100px, 14vw, 180px) var(--bl-page-pad)",
        borderTop: "1px solid var(--bl-rule)",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="02" label="How we run the firm" />

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(32px, 5vw, 72px)",
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            margin: "0 0 clamp(48px, 6vw, 80px)",
            maxWidth: "var(--bl-heading-wide)",
          }}
        >
          Built on judgement.
          <br />
          <span style={{ color: "var(--bl-fg3)" }}>
            Not on utilization metrics.
          </span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 0,
            border: "1px solid var(--bl-rule)",
            background: "var(--bl-ink2)",
          }}
        >
          {TENETS.map((t, i) => (
            <Rise key={i} delay={i * 0.04}>
              <article
                style={{
                  padding: "clamp(28px, 3.4vw, 44px)",
                  borderRight:
                    i % 2 === 0 ? "1px solid var(--bl-rule)" : "none",
                  borderBottom:
                    i < 2 ? "1px solid var(--bl-rule)" : "none",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    color: "var(--bl-neon)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "clamp(18px, 1.8vw, 24px)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.015em",
                    color: "var(--bl-fg)",
                    margin: 0,
                  }}
                >
                  {t.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--bl-fg2)",
                    margin: 0,
                  }}
                >
                  {t.body}
                </p>
              </article>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
