"use client";

import { useRef } from "react";
import { MeshCanvas } from "./MeshCanvas";
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
        background: "var(--bl-ink)",
        color: "var(--bl-fg)",
        overflow: "hidden",
        paddingTop: "var(--bl-top-offset)",
      }}
    >
      {/* Canvas mesh */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateY(${sp * 80}px) scale(${1 - sp * 0.04})`,
          opacity: 1 - sp * 0.7,
          transition: "opacity 0.2s linear",
        }}
      >
        <MeshCanvas />
        {/* Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 60%, transparent 0%, rgba(var(--bl-ink-rgb),0.4) 60%, rgba(var(--bl-ink-rgb),0.9) 100%)",
          }}
        />
        {/* Top fade */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 200,
            background:
              "linear-gradient(to bottom, rgba(var(--bl-ink-rgb),1) 0%, rgba(var(--bl-ink-rgb),0) 100%)",
          }}
        />
      </div>

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
            fontSize: "clamp(44px, 9vw, 148px)",
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
              fontSize: "clamp(46px, 9.4vw, 154px)",
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
                maxWidth: 480,
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
