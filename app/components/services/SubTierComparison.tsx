"use client";

import { Anchor } from "../primitives/Anchor";
import { Rise } from "../primitives/Rise";
import { SplitText } from "../primitives/SplitText";

export type SubTier = {
  label: string;
  body: string;
  fit: string;
};

type Props = {
  anchorNumber: string;
  anchorLabel: string;
  id: string;
  heading: string;
  subhead: string;
  intro: string;
  tiers: [SubTier, SubTier, SubTier];
  closingNote?: string;
};

/**
 * Generic 3-column comparison block. Used for both vCISO (Light /
 * Standard / Regulated) and FSO (Core / Plus / Premium). Inverted color
 * surface for visual rhythm against the dark sections above and below.
 */
export function SubTierComparison({
  anchorNumber,
  anchorLabel,
  id,
  heading,
  subhead,
  intro,
  tiers,
  closingNote,
}: Props) {
  return (
    <section
      id={id}
      style={{
        position: "relative",
        background: "var(--bl-section-veil)",
        color: "var(--bl-fg)",
        padding: "var(--bl-section-gap) var(--bl-page-pad)",}}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number={anchorNumber} label={anchorLabel} />

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(32px, 5vw, 76px)",
            lineHeight: 1,
            letterSpacing: "-0.035em",
            margin: "0 0 20px",
            maxWidth: "var(--bl-heading-wide)",
          }}
        >
          <SplitText text={heading} perChar={0.012} />
          <br />
          <SplitText text={subhead} perChar={0.012} delay={0.24} dim />
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(15px, 1.2vw, 17px)",
            color: "var(--bl-fg2)",
            lineHeight: 1.65,
            maxWidth: "var(--bl-text-wide)",
            margin: "0 0 clamp(48px, 6vw, 80px)",
          }}
        >
          {intro}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 0,
            border: "1px solid var(--bl-rule)",
            background: "var(--bl-ink2)",
          }}
        >
          {tiers.map((t, i) => (
            <Rise key={i} delay={i * 0.05}>
              <div
                style={{
                  padding: "clamp(28px, 3.4vw, 48px)",
                  borderRight:
                    i < tiers.length - 1
                      ? "1px solid var(--bl-rule)"
                      : "none",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    color: "var(--bl-fg3)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")} / 03
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "clamp(24px, 2.4vw, 36px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.018em",
                    color: "var(--bl-neon)",
                    margin: 0,
                  }}
                >
                  {t.label}.
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 15,
                    color: "var(--bl-fg)",
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {t.body}
                </p>
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: 20,
                    borderTop: "1px solid var(--bl-rule)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--bl-fg3)",
                    letterSpacing: "0.04em",
                    lineHeight: 1.5,
                  }}
                >
                  Fit: {t.fit}
                </div>
              </div>
            </Rise>
          ))}
        </div>

        {closingNote && (
          <p
            style={{
              marginTop: 32,
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              color: "var(--bl-fg2)",
              lineHeight: 1.65,
              maxWidth: "var(--bl-text-wide)",
            }}
          >
            {closingNote}
          </p>
        )}
      </div>
    </section>
  );
}
