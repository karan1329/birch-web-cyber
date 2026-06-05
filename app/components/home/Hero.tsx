"use client";

import { useRef } from "react";
import { Rise } from "../primitives/Rise";
import { SplitText } from "../primitives/SplitText";
import { MagButton } from "../primitives/MagButton";
import { useScrollProgress } from "../hooks/useScrollProgress";

const GRAIN_SVG = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 0.93 0 0 0 0 0.93 0 0 0 0 0.94 0 0 0 0.025 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`;

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const sp = useScrollProgress(heroRef);

  return (
    <section
      ref={heroRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        // Transparent so the GlobalMeshBackdrop (mounted in layout.tsx)
        // shows through the hero. Section bgs below the hero stay solid
        // and naturally cover the mesh as the user scrolls past.
        background: "transparent",
        color: "var(--bl-fg)",
        overflow: "hidden",
        paddingTop: "var(--bl-top-offset)",
      }}
    >
      {/* Grain */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.55,
          backgroundImage: GRAIN_SVG,
          mixBlendMode: "overlay",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "calc(100vh - var(--bl-top-offset))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 var(--bl-page-pad) clamp(60px, 8vh, 100px)",
          maxWidth: "var(--bl-max-width)",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            // Caps allow real growth on QHD/4K monitors. At 1920px the
            // 9vw track hits ~172px (was capped at 148); at 3840px it
            // hits 220px (was capped at 148). The base 44px floor for
            // mobile is unchanged.
            fontSize: "clamp(44px, 9vw, 220px)",
            lineHeight: 0.9,
            letterSpacing: "-0.045em",
            margin: 0,
            color: "var(--bl-fg)",
          }}
        >
          <SplitText text="Cybersecurity," delay={0.15} perChar={0.018} />
          <br />
          {/* Second line: Geist Thin (200) at a slightly larger size so the
              thin glyphs hit the same horizontal extent as the heavy line
              above. Matched whitespace footprint, deliberate weight contrast. */}
          <SplitText
            text="done seriously."
            delay={0.45}
            perChar={0.018}
            dim
            style={{
              fontWeight: 200,
              fontSize: "clamp(46px, 9.4vw, 230px)",
            }}
          />
        </h1>

        <div
          className="bl-stack-sm"
          style={{
            marginTop: "clamp(56px, 8vw, 96px)",
            display: "grid",
            gridTemplateColumns: "minmax(220px, 1fr) auto",
            gap: "32px 48px",
            alignItems: "end",
          }}
        >
          <Rise delay={0.8} y={16}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: "clamp(15px, 1.2vw, 17px)",
                lineHeight: 1.55,
                color: "var(--bl-fg2)",
                maxWidth: "var(--bl-text-tight)",
                margin: 0,
              }}
            >
              We run senior-led security programs for growth-stage companies
              and regulated industries. Built on discipline, sharpened with our
              internal AI workbench.
            </p>
          </Rise>
          <Rise delay={0.95} y={16}>
            <MagButton href="/contact">Book a 30-minute discovery call</MagButton>
          </Rise>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          opacity: Math.max(0, 1 - sp * 3),
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--bl-fg3)",
          letterSpacing: "0.16em",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span>SCROLL</span>
        <span
          style={{
            display: "inline-block",
            width: 1,
            height: 32,
            background: "linear-gradient(to bottom, var(--bl-neon), transparent)",
            animation: "bl-pulse-line 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
