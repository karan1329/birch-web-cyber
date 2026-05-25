"use client";

import { type ReactNode } from "react";
import { SplitText } from "./SplitText";
import { Tag } from "./Tag";

type Props = {
  kicker: string;
  title: string;
  subtitle?: ReactNode;
};

/**
 * Header used at the top of every inner page. Subtle grid backdrop,
 * neon corner glow, kicker chip + char-staggered headline + subtitle.
 */
export function InnerHero({ kicker, title, subtitle }: Props) {
  return (
    <section
      style={{
        position: "relative",
        background: "var(--bl-ink)",
        color: "var(--bl-fg)",
        padding:
          "calc(var(--bl-top-offset) + clamp(80px, 12vw, 160px)) var(--bl-page-pad) clamp(80px, 10vw, 140px)",
        overflow: "hidden",
        borderBottom: "1px solid var(--bl-rule)",
      }}
    >
      {/* Grid backdrop */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--bl-rule) 1px, transparent 1px), linear-gradient(90deg, var(--bl-rule) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 30%, #000 0%, transparent 70%)",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, #000 0%, transparent 70%)",
          opacity: 0.4,
        }}
      />
      {/* Neon corner glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20%",
          right: "-10%",
          width: "60vw",
          height: "60vw",
          maxWidth: 800,
          maxHeight: 800,
          background:
            "radial-gradient(circle, rgba(var(--bl-neon-rgb), 0.12), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="bl-container"
        style={{ padding: 0, position: "relative" }}
      >
        <div style={{ marginBottom: 24 }}>
          <Tag>{kicker}</Tag>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(44px, 8vw, 132px)",
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            margin: "0 0 32px",
            maxWidth: 1100,
          }}
        >
          <SplitText text={title} perChar={0.014} />
        </h1>
        {subtitle && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(16px, 1.4vw, 20px)",
              color: "var(--bl-fg2)",
              lineHeight: 1.55,
              maxWidth: 640,
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
