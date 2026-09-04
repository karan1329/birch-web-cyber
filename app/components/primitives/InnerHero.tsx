"use client";

import { type ReactNode } from "react";
import { SplitText } from "./SplitText";
import { Tag } from "./Tag";

type Props = {
  kicker: string;
  title: string;
  subtitle?: ReactNode;
  /**
   * Optional call-to-action slotted below the subtitle inside the hero
   * content stack. Use this rather than rendering a separate section
   * with negative margin to pull a button up into the hero — keeps the
   * kicker / headline / subtitle / action visually anchored to the same
   * left rule.
   */
  action?: ReactNode;
};

/**
 * Header used at the top of every inner page. The GlobalMeshBackdrop
 * (mounted in `layout.tsx`) provides the wireframe ambience; this
 * component renders with a transparent background so the mesh shows
 * through, and keeps the neon corner glow for accent.
 *
 * Layout: a 2px neon left-rule runs the height of the content stack
 * (kicker → H1 → subtitle → optional action). The rule sits at the left
 * edge of `.bl-container` (i.e. right at the page-pad boundary); content
 * pads in from the rule so the whole stack reads as unambiguously
 * left-anchored at every breakpoint, including QHD/4K where the
 * container is centered with substantial side margins.
 */
export function InnerHero({ kicker, title, subtitle, action }: Props) {
  return (
    <section
      style={{
        position: "relative",
        background: "transparent",
        color: "var(--bl-fg)",
        padding:
          "calc(var(--bl-top-offset) + clamp(80px, 12vw, 160px)) var(--bl-page-pad) clamp(80px, 10vw, 140px)",
        overflow: "hidden",
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
          maxWidth: "var(--bl-text-wide)",
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
        {/* Neon left-rule. Anchors the kicker / H1 / subtitle / action
            stack to the leftmost edge of the container. The 2px line is
            subtle but unmissable; it removes the "is this centered or
            left-aligned?" ambiguity that an unbordered H1 caused on wide
            viewports. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 2,
            background: "var(--bl-neon)",
            boxShadow: "0 0 12px rgba(var(--bl-neon-rgb), 0.35)",
          }}
        />

        <div style={{ paddingLeft: "clamp(20px, 2vw, 32px)" }}>
          <div style={{ marginBottom: 24 }}>
            <Tag>{kicker}</Tag>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              // Title spans the container; cap raised earlier so headlines
              // grow on QHD / 4K. No `maxWidth` here — letting the title
              // breathe to the right is the whole point of the
              // left-anchor refactor.
              fontSize: "clamp(44px, 8vw, 200px)",
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              margin: "0 0 32px",
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
                maxWidth: "var(--bl-text-narrow)",
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          )}
          {action && (
            <div style={{ marginTop: "clamp(32px, 4vw, 48px)" }}>{action}</div>
          )}
        </div>
      </div>
    </section>
  );
}
