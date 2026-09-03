"use client";

import Link from "next/link";

import { Rise } from "../primitives/Rise";
import { SplitText } from "../primitives/SplitText";
import { MagButton } from "../primitives/MagButton";
import { HeroVisual } from "./HeroVisual";
import { ClientMarquee } from "./ClientMarquee";

/**
 * Landing hero · asymmetric split.
 *
 * Left 46% is the conversion panel (all type and the CTA). Right 54% is
 * the visual, full-bleed to the panel edge with a hard cut: no border,
 * no radius, no shadow, no inner margin. Per the Axiom teardown in the
 * design bundle, that hard join is the point — the image is a window in
 * the page, not a picture placed on it.
 *
 * The section is transparent so the global mesh backdrop reads through the
 * copy column. The artwork's own canvas is opaque, so the grid lives on the
 * left half and the hard cut into cranberry is unchanged.
 *
 * Below 960px the split collapses: type first, visual beneath it at a
 * fixed height, because a 54% column of canvas is unreadable on a phone.
 */
export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        // Transparent, NOT --bl-ink. The site-wide mesh is fixed behind the
        // whole document; an opaque hero was the one place it was fully
        // blacked out, which is why the grid appeared to start below the
        // fold. The copy column now sits on the live grid.
        background: "transparent",
        color: "var(--bl-fg)",
        paddingTop: "var(--bl-top-offset)",
      }}
    >
      <div
        className="bl-hero-split"
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "47fr 53fr",
          // The hero owns the first screen. Both columns stretch to ONE row, so the
          // cranberry panel and the logo strip still end on the same line
          // by construction — the floor is on the shared grid row, never
          // on one column, which is what made them drift before.
          //
          // The artwork re-composes from its box (constants are relative
          // to bw/bh), and it was checked at the taller ratio this
          // produces before the floor went in. Below 960px globals.css
          // resets this to 0 and the columns stack.
          // 16:9. The hero block is a standard widescreen crop rather than
          // whatever the viewport happens to be (1440x900 is 16:10, which
          // is what made the foot of it look stretched). Capped at the
          // viewport so a short window never pushes the strip below the
          // fold. Below 960px globals.css resets this and the columns stack.
          minHeight:
            "min(calc(100svh - var(--bl-nav-h)), calc(56.25vw - var(--bl-nav-h)))",
        }}
      >
        {/* ---- conversion panel ---------------------------------- */}
        <div
          className="bl-hero-panel"
          style={{
            display: "flex",
            flexDirection: "column",
            // Headline group takes the centre; the strip is pushed to the
            // foot by the auto margin below it, so "Cybersecurity, done
            // seriously." stays the focus rather than competing with logos.
            justifyContent: "center",
            minWidth: 0,
            padding:
              "clamp(36px, 3.6vw, 56px) clamp(32px, 4vw, 64px) 0 var(--bl-page-pad)",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "max(clamp(42px, 5.4vw, 96px), min(3vw, 120px))",
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
            {/* The line the whole brand rests on — set in the accent, not
                dimmed to grey. */}
            <SplitText
              text="done seriously."
              delay={0.45}
              perChar={0.018}
              style={{
                fontWeight: 200,
                fontSize: "max(clamp(44px, 5.7vw, 101px), min(3.16vw, 126px))",
                color: "var(--bl-accent)",
              }}
            />
          </h1>

          <Rise delay={0.8} y={16}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: "max(clamp(16px, 1.35vw, 20px), min(0.62vw, 25px))",
                lineHeight: 1.55,
                color: "var(--bl-fg2)",
                maxWidth: "46ch",
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
              <Link
                href="/start"
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
                Something new for founders →
              </Link>
            </div>
          </Rise>

          {/* The strip sits at the FOOT of the panel, separated from the
              CTA by real space, so the headline keeps the centre. */}
          <Rise delay={1.1} y={12} style={{ marginTop: "auto" }}>
            <div
              className="bl-hero-strip"
              style={{
                // Runs past the panel's right padding to the column edge,
                // so the two tracks get the full measure. Cancelled at
                // 960px, where the panel's padding is symmetric again.
                marginRight: "calc(-1 * clamp(32px, 4vw, 64px))",
                // Pinned to the foot of the panel. The column's bottom
                // padding is 0, so the last logo row IS the bottom edge and
                // the cranberry panel beside it ends on the same line.
                marginTop: "auto",
                paddingTop: "clamp(20px, 2.4vw, 32px)",
                // Zero: the last logo row IS the bottom edge, so the
                // cranberry panel beside it ends on exactly that line.
                paddingBottom: 0,
                borderTop: "1px solid var(--bl-rule)",
              }}
            >
              <ClientMarquee variant="hero" />
            </div>
          </Rise>
        </div>

        {/* ---- visual · full bleed, hard cut ---------------------- */}
        <div
          className="bl-hero-visual"
          style={{
            minWidth: 0,
            minHeight: 0,
          }}
        >
          <HeroVisual />
        </div>

      </div>

    </section>
  );
}
