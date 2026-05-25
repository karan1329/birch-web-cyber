"use client";

import { type CSSProperties, type ElementType } from "react";
import { useInView } from "../hooks/useInView";

type Props = {
  text: string;
  delay?: number;
  perChar?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  dim?: boolean;
  threshold?: number;
};

/**
 * Character-by-character reveal for headlines. Each glyph rises from
 * below a clipping mask + fades in, staggered by `perChar` seconds.
 *
 * Words are wrapped in a `white-space: nowrap` container so the
 * browser cannot break a word mid-character (otherwise the inline-block
 * glyphs let lines wrap between any two letters, producing "run / s
 * every engagement." instead of "runs every engagement.").
 *
 * Supports multi-line via `\n` in `text`.
 */
export function SplitText({
  text,
  delay = 0,
  perChar = 0.018,
  as: Tag = "span",
  className,
  style,
  dim = false,
  threshold = 0.2,
}: Props) {
  const [ref, inView] = useInView<HTMLSpanElement>(threshold);
  const lines = String(text).split("\n");
  let idx = 0;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        color: dim ? "var(--bl-fg3)" : undefined,
        ...style,
      }}
    >
      {lines.map((line, li) => {
        // Split by whitespace, keeping the whitespace tokens so spacing is
        // preserved. Each non-whitespace token becomes a nowrap word
        // container; each whitespace token becomes a plain break-allowed
        // space between words.
        const tokens = line.split(/(\s+)/);
        return (
          <span
            key={li}
            style={{
              display: "block",
              overflow: "hidden",
              // 1.15 (not 0.95) so the bottoms of y/g/p/j descenders fit
              // inside the mask. Tight 0.95 was clipping every descender.
              lineHeight: 1.15,
            }}
          >
            {tokens.map((tok, ti) => {
              if (tok.length === 0) return null;
              if (/^\s+$/.test(tok)) {
                // Whitespace becomes a normal breakable space.
                return (
                  <span key={ti} style={{ whiteSpace: "pre" }}>
                    {tok}
                  </span>
                );
              }
              // Word: keep characters together so the line can break
              // BETWEEN words but never inside a word.
              return (
                <span
                  key={ti}
                  style={{
                    display: "inline-block",
                    whiteSpace: "nowrap",
                  }}
                >
                  {Array.from(tok).map((ch, ci) => {
                    const localIdx = idx++;
                    return (
                      <span
                        key={ci}
                        aria-hidden="true"
                        style={{
                          display: "inline-block",
                          transform: inView
                            ? "translateY(0)"
                            : "translateY(110%)",
                          opacity: inView ? 1 : 0,
                          transition: `transform 0.9s cubic-bezier(0.2,0.7,0.2,1) ${
                            delay + localIdx * perChar
                          }s, opacity 0.4s ease ${
                            delay + localIdx * perChar
                          }s`,
                          whiteSpace: "pre",
                        }}
                      >
                        {ch}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </span>
        );
      })}
      {/* Screen-reader mirror. Glyph spans are aria-hidden so a SR
          cannot read them; this hidden copy carries the actual text.
          `user-select: none` prevents text duplication on clipboard. */}
      <span
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clipPath: "inset(50%)",
          whiteSpace: "nowrap",
          border: 0,
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        {text}
      </span>
    </Tag>
  );
}
