"use client";

import { MagButton } from "../primitives/MagButton";
import { Rise } from "../primitives/Rise";
import { SplitText } from "../primitives/SplitText";
import { Tag } from "../primitives/Tag";

/**
 * Section 6 of the home page. Per doc: "One conversation. Thirty minutes."
 * Full anti-sales-process paragraph + primary discovery-call CTA + secondary
 * LinkedIn line. Keeps the grid backdrop visual.
 */
export function ClosingCTA() {
  return (
    <section
      style={{
        position: "relative",
        background: "var(--bl-ink)",
        color: "var(--bl-fg)",
        padding: "clamp(120px, 16vw, 220px) var(--bl-page-pad)",
        borderTop: "1px solid var(--bl-rule)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--bl-rule) 1px, transparent 1px), linear-gradient(90deg, var(--bl-rule) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 50%, #000 0%, transparent 75%)",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, #000 0%, transparent 75%)",
          opacity: 0.6,
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "var(--bl-max-width)",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Rise>
          <div
            style={{
              display: "inline-flex",
              justifyContent: "center",
              marginBottom: 40,
            }}
          >
            <Tag>30 minutes · zero pitch deck</Tag>
          </div>
        </Rise>

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(48px, 8.5vw, 144px)",
            lineHeight: 0.94,
            letterSpacing: "-0.045em",
            margin: "0 0 clamp(36px, 5vw, 56px)",
          }}
        >
          <SplitText text="One conversation." perChar={0.014} />
          <br />
          <SplitText
            text="Thirty minutes."
            perChar={0.014}
            delay={0.28}
            dim
          />
        </h2>

        <Rise delay={0.15}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(16px, 1.35vw, 19px)",
              color: "var(--bl-fg2)",
              maxWidth: 700,
              margin: "0 auto 48px",
              lineHeight: 1.65,
            }}
          >
            We do not run a sales process. If you have a specific blocker,
            bring it to a thirty-minute call. We will tell you what we would
            do, in how many weeks. If it is not a fit, we will say so. If it
            is an emergency, we will start in seven days.
          </p>
        </Rise>

        <Rise delay={0.3}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
            }}
          >
            <MagButton href="/contact">
              Book a 30-minute discovery call
            </MagButton>
            <a
              href="https://www.linkedin.com/in/karan-bhandari-0ab161149/"
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
                color: "var(--bl-fg3)",
                textDecoration: "none",
                paddingBottom: 2,
                borderBottom: "1px solid transparent",
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--bl-fg)";
                e.currentTarget.style.borderColor = "var(--bl-rule2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--bl-fg3)";
                e.currentTarget.style.borderColor = "transparent";
              }}
            >
              Or send Karan a message on LinkedIn. We respond within four
              business hours.
            </a>
          </div>
        </Rise>
      </div>
    </section>
  );
}
