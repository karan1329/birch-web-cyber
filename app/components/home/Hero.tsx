"use client";

import { Rise } from "../primitives/Rise";
import { SplitText } from "../primitives/SplitText";
import { MagButton } from "../primitives/MagButton";
import { HeroVisual } from "./HeroVisual";

/**
 * Landing hero · asymmetric split.
 *
 * Left 46% is the conversion panel (all type and the CTA). Right 54% is
 * the visual, full-bleed to the panel edge with a hard cut: no border,
 * no radius, no shadow, no inner margin. Per the Axiom teardown in the
 * design bundle, that hard join is the point — the image is a window in
 * the page, not a picture placed on it.
 *
 * The section is opaque so the global mesh backdrop stays strictly below
 * the hero and the visual is the only event above the fold.
 *
 * Below 960px the split collapses: type first, visual beneath it at a
 * fixed height, because a 54% column of canvas is unreadable on a phone.
 */
export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        background: "var(--bl-ink)",
        color: "var(--bl-fg)",
        paddingTop: "var(--bl-top-offset)",
      }}
    >
      <div
        className="bl-hero-split"
        style={{
          display: "grid",
          gridTemplateColumns: "46fr 54fr",
          minHeight: "calc(100vh - var(--bl-top-offset))",
        }}
      >
        {/* ---- conversion panel ---------------------------------- */}
        <div
          className="bl-hero-panel"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: 0,
            padding:
              "clamp(48px, 6vw, 88px) clamp(32px, 4vw, 64px) clamp(48px, 6vw, 88px) var(--bl-page-pad)",
          }}
        >
          <Rise delay={0.05} y={12}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                fontSize: 10.5,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--bl-accent)",
                margin: 0,
              }}
            >
              Senior cybersecurity advisory · Delhi + Singapore
            </p>
          </Rise>

          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "clamp(38px, 4.4vw, 76px)",
              lineHeight: 0.98,
              letterSpacing: "-0.038em",
              margin: "clamp(18px, 2vw, 26px) 0 0",
              color: "var(--bl-fg)",
            }}
          >
            <SplitText text="Cybersecurity," delay={0.15} perChar={0.018} />
            <br />
            {/* Thin weight at a hair larger size so the light glyphs hit the
                same horizontal extent as the heavy line above. */}
            <SplitText
              text="done seriously."
              delay={0.45}
              perChar={0.018}
              dim
              style={{
                fontWeight: 200,
                fontSize: "clamp(40px, 4.6vw, 80px)",
              }}
            />
          </h1>

          <Rise delay={0.8} y={16}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: "clamp(15px, 1.15vw, 17px)",
                lineHeight: 1.55,
                color: "var(--bl-fg2)",
                maxWidth: "44ch",
                margin: "clamp(20px, 2.4vw, 30px) 0 0",
              }}
            >
              We run senior-led security programs for growth-stage companies
              and regulated industries. Built on discipline, sharpened with our
              internal AI workbench.
            </p>
          </Rise>

          <Rise delay={0.95} y={16}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(16px, 2vw, 24px)",
                flexWrap: "wrap",
                marginTop: "clamp(26px, 3vw, 38px)",
              }}
            >
              <MagButton href="/contact">
                Book a 30-minute discovery call
              </MagButton>
              <a
                href="https://www.linkedin.com/in/karan-bhandari-0ab161149/"
                target="_blank"
                rel="noopener noreferrer"
                className="bl-email-link"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: "var(--bl-fg2)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--bl-rule2)",
                  paddingBottom: 2,
                  transition: "color 0.2s ease, border-color 0.2s ease",
                }}
              >
                or message Karan on LinkedIn
              </a>
            </div>
          </Rise>
        </div>

        {/* ---- visual · full bleed, hard cut ---------------------- */}
        <div className="bl-hero-visual" style={{ minWidth: 0, minHeight: 0 }}>
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
