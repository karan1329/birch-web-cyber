"use client";

import Link from "next/link";
import { Anchor } from "../primitives/Anchor";
import { MagButton } from "../primitives/MagButton";
import { Rise } from "../primitives/Rise";
import { SplitText } from "../primitives/SplitText";

/**
 * SV-4 · The Fractional Security Office — the flagship section.
 *
 * Replaces the old Core/Plus/Premium tier grid. This is the destination on
 * the page, so it gets the most vertical space and reads as arrival rather
 * than a fourth item in a list.
 *
 * The department map carries the core-plus-modules motif from HW-1
 * deliberately, so /how-we-work and /services visibly describe the same
 * machine. Same fixed core, same attach/detach language, nine capability
 * areas instead of the agent bench.
 *
 * Dual CTA per the pack: regulated and mid-size buyers go to the call,
 * founders go to /start.
 */

/** The nine capability areas a security department actually covers. */
const CAPABILITIES = [
  "Governance & policy",
  "Risk & board reporting",
  "Compliance & audit",
  "Identity & access",
  "Cloud & infrastructure",
  "Application security",
  "Vulnerability management",
  "Detection & response",
  "Third-party risk",
];

export function FractionalSecurityOffice() {
  return (
    <section
      id="fso"
      style={{
        background: "var(--bl-section-veil)",
        color: "var(--bl-fg)",
        padding: "var(--bl-section-gap) var(--bl-page-pad)",}}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="06" label="Fractional Security Office" />

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(32px, 4.6vw, 66px)",
            lineHeight: 1.02,
            letterSpacing: "-0.032em",
            margin: "0 0 clamp(28px, 3.5vw, 44px)",
            maxWidth: "var(--bl-heading-wide)",
          }}
        >
          <SplitText text="New from Birchlogic:" perChar={0.014} />
          <br />
          <SplitText
            text="the Fractional Security Office."
            perChar={0.014}
            delay={0.24}
            dim
          />
        </h2>

        <Rise>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(16px, 1.3vw, 19px)",
              lineHeight: 1.68,
              color: "var(--bl-fg2)",
              maxWidth: "var(--bl-text-wide)",
              margin: "0 0 clamp(48px, 6vw, 76px)",
            }}
          >
            We are building entire security departments for companies that
            were never going to hire one, and it works because of how it
            deploys: one forward-deployed engineer and one virtual CISO as the
            fixed core, specialised agents composed around them per task, and
            every tool, platform and OEM licence the department needs,
            packaged and run inside the same engagement. Everything a security
            department does, delivered as one line on your budget, scaled up
            when your quarter demands it and back down when it does not.
          </p>
        </Rise>

        <Rise delay={0.06}>
          <DepartmentMap />
        </Rise>

        <div
          className="bl-stack-md"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(28px, 4vw, 56px)",
            marginTop: "clamp(56px, 7vw, 88px)",
          }}
        >
          <Rise>
            <CtaBlock
              lead="If you are a regulated entity or a mid-size firm"
              body="book the thirty minutes and we will tell you honestly whether this is the right fit or whether a retainer serves you better."
            >
              <MagButton href="/contact">Book thirty minutes</MagButton>
            </CtaBlock>
          </Rise>
          <Rise delay={0.08}>
            <CtaBlock
              lead="If you are a founder building a startup"
              body="we have a founding offer running for exactly ten companies, and it is priced for you."
            >
              <Link
                href="/start"
                className="bl-email-link"
                style={{
                  alignSelf: "flex-start",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--bl-accent)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--bl-accent)",
                  paddingBottom: 3,
                }}
              >
                See the founding offer →
              </Link>
            </CtaBlock>
          </Rise>
        </div>
      </div>
    </section>
  );
}

function CtaBlock({
  lead,
  body,
  children,
}: {
  lead: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "flex-start",
        padding: "clamp(24px, 3vw, 34px)",
        border: "1px solid var(--bl-rule)",
        background: "var(--bl-ink2)",
        height: "100%",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(15px, 1.2vw, 17px)",
          lineHeight: 1.6,
          color: "var(--bl-fg2)",
          margin: 0,
        }}
      >
        <strong style={{ color: "var(--bl-fg)", fontWeight: 600 }}>
          {lead}
        </strong>
        , {body}
      </p>
      {children}
    </div>
  );
}

/**
 * The department map. Same visual grammar as HW-1's core-plus-modules
 * diagram: solid core at the centre, capability modules docked around it.
 * Ink-on-paper, mono labels, no gradients, no glow.
 */
function DepartmentMap() {
  return (
    <figure
      style={{
        margin: 0,
        border: "1px solid var(--bl-rule)",
        background: "var(--bl-ink2)",
        padding: "clamp(26px, 3.4vw, 44px)",
      }}
    >
      <figcaption
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9.5,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--bl-fg3)",
          marginBottom: 18,
        }}
      >
        The department, mapped
      </figcaption>

      <div
        className="bl-stack-md"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(220px, 0.8fr) minmax(280px, 1.6fr)",
          gap: "clamp(20px, 3vw, 40px)",
          alignItems: "start",
        }}
      >
        {/* Fixed core — identical treatment to HW-1 so the two pages read
            as one machine. */}
        <div
          style={{
            background: "var(--bl-bone)",
            color: "var(--bl-bone-fg)",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            Fixed core
          </span>
          <span style={CORE_LINE}>Forward-deployed engineer</span>
          <span style={CORE_LINE}>Virtual CISO</span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9.5,
              lineHeight: 1.6,
              letterSpacing: "0.04em",
              opacity: 0.7,
              marginTop: 6,
            }}
          >
            Plus every tool, platform and OEM licence the department needs,
            packaged inside the engagement.
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 8,
          }}
        >
          {CAPABILITIES.map((c) => (
            <span
              key={c}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--bl-fg2)",
                border: "1px solid var(--bl-rule2)",
                background: "var(--bl-ink)",
                padding: "10px 12px",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </figure>
  );
}

const CORE_LINE: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
};
