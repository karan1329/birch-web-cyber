"use client";

import { useState } from "react";

export type Post = {
  title: string;
  summary: string;
  readTime: string;
  category?: string;
};

/**
 * Featured: full-width hero card with large title + summary + read-time
 * Recent: compact row, single line for title + meta
 */
export function FeaturedPostCard({ post }: { post: Post }) {
  const [hov, setHov] = useState(false);
  return (
    <article
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
        cursor: "pointer",
        transition: "border-color 0.25s ease, background 0.25s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {post.category && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--bl-fg3)",
            }}
          >
            {post.category}
          </span>
        )}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.04em",
            color: "var(--bl-fg3)",
          }}
        >
          {post.readTime}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          fontSize: "clamp(22px, 2.4vw, 36px)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "var(--bl-fg)",
          margin: 0,
        }}
      >
        {post.title}
      </h3>

      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(14px, 1.15vw, 16px)",
          lineHeight: 1.65,
          color: "var(--bl-fg2)",
          margin: 0,
          maxWidth: 640,
        }}
      >
        {post.summary}
      </p>

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
            letterSpacing: "0.04em",
            color: hov ? "var(--bl-neon)" : "var(--bl-fg3)",
            transition: "color 0.25s ease",
          }}
        >
          Read the piece
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
    </article>
  );
}

export function RecentPostRow({ post }: { post: Post }) {
  const [hov, setHov] = useState(false);
  return (
    <article
      onPointerEnter={() => setHov(true)}
      onPointerLeave={() => setHov(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) auto",
        gap: 24,
        padding: "clamp(22px, 2.4vw, 32px) 0",
        borderBottom: "1px solid var(--bl-rule)",
        alignItems: "baseline",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 14,
          bottom: 14,
          width: 2,
          background: "var(--bl-neon)",
          opacity: hov ? 0.9 : 0.25,
          transition: "opacity 0.25s ease",
        }}
      />
      <div style={{ paddingLeft: 18 }}>
        <h3
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(18px, 1.7vw, 24px)",
            lineHeight: 1.2,
            letterSpacing: "-0.012em",
            color: "var(--bl-fg)",
            margin: "0 0 6px",
          }}
        >
          {post.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(13px, 1.05vw, 15px)",
            lineHeight: 1.55,
            color: "var(--bl-fg2)",
            margin: 0,
            maxWidth: 720,
          }}
        >
          {post.summary}
        </p>
      </div>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.04em",
          color: hov ? "var(--bl-fg2)" : "var(--bl-fg3)",
          whiteSpace: "nowrap",
          transition: "color 0.25s ease",
        }}
      >
        {post.readTime}
      </span>
    </article>
  );
}
