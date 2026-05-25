"use client";

import Link from "next/link";
import { useState } from "react";
import type { Role } from "./roles";

export type { Role } from "./roles";

/**
 * One open-role card. Whole card is a link to `/careers/apply?role={slug}`
 * so the "Apply" affordance at the bottom is the visual end of a hover that
 * lights the whole tile. Title + location + summary + requirements list,
 * then the Apply pill.
 *
 * `height: 100%` so the card fills its grid cell — the careers page sets
 * `gridAutoRows: 1fr` on the role grid so cards line up at equal height.
 */
export function RoleCard({ role }: { role: Role }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href={{ pathname: "/careers/apply", query: { role: role.slug } }}
      onPointerEnter={() => setHov(true)}
      onPointerLeave={() => setHov(false)}
      style={{
        position: "relative",
        background: hov ? "var(--bl-ink3)" : "var(--bl-ink2)",
        border: `1px solid ${hov ? "var(--bl-rule2)" : "var(--bl-rule)"}`,
        borderRadius: 20,
        padding: "clamp(28px, 3.4vw, 48px)",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        height: "100%",
        transition: "background 0.25s ease, border-color 0.25s ease",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 14,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(22px, 2.2vw, 30px)",
            lineHeight: 1.1,
            letterSpacing: "-0.018em",
            color: "var(--bl-fg)",
            margin: 0,
          }}
        >
          {role.title}
        </h3>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.04em",
            color: "var(--bl-fg3)",
            whiteSpace: "nowrap",
            textAlign: "right",
            maxWidth: 120,
            lineHeight: 1.4,
          }}
        >
          {role.location}
        </span>
      </div>

      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(14px, 1.15vw, 16px)",
          lineHeight: 1.65,
          color: "var(--bl-fg2)",
          margin: 0,
        }}
      >
        {role.summary}
      </p>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {role.requirements.map((req, i) => (
          <li
            key={i}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              lineHeight: 1.55,
              color: "var(--bl-fg2)",
              paddingLeft: 16,
              position: "relative",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 0,
                top: "0.7em",
                width: 6,
                height: 1,
                background: "var(--bl-fg3)",
              }}
            />
            {req}
          </li>
        ))}
      </ul>

      <div
        style={{
          marginTop: "auto",
          paddingTop: 16,
          borderTop: "1px solid var(--bl-rule)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.06em",
            color: hov ? "var(--bl-neon)" : "var(--bl-fg2)",
            textTransform: "uppercase",
            transition: "color 0.25s ease",
          }}
        >
          Apply
        </span>
        <span
          aria-hidden="true"
          style={{
            fontSize: 14,
            color: hov ? "var(--bl-neon)" : "var(--bl-fg3)",
            transform: hov ? "translateX(4px)" : "translateX(0)",
            transition: "transform 0.25s ease, color 0.25s ease",
          }}
        >
          →
        </span>
      </div>
    </Link>
  );
}
