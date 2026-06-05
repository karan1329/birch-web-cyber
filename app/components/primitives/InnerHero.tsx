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
 * Header used at the top of every inner page. The GlobalMeshBackdrop
 * (mounted in `layout.tsx`) provides the wireframe ambience; this
 * component renders with a transparent background so the mesh shows
 * through, and keeps the neon corner glow for accent.
 */
export function InnerHero({ kicker, title, subtitle }: Props) {
  return (
    <section
      style={{
        position: "relative",
        // Transparent — the layout-level mesh shows through. Page
        // sections that follow keep their solid surfaces and cover
        // the mesh as the user scrolls past.
        background: "transparent",
        color: "var(--bl-fg)",
        padding:
          "calc(var(--bl-top-offset) + clamp(80px, 12vw, 160px)) var(--bl-page-pad) clamp(80px, 10vw, 140px)",
        overflow: "hidden",
        borderBottom: "1px solid var(--bl-rule)",
      }}
    >
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
            // Cap raised so the page headline grows on QHD/4K instead
            // of stopping at 132px. At 1920px the 8vw track hits 154px;
            // at 3840px it hits 200px. The mobile floor (44px) stays.
            fontSize: "clamp(44px, 8vw, 200px)",
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
