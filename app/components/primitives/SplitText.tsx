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
      // The glyph spans below are all aria-hidden, so this label is what
      // carries the accessible name. Per the accname spec, when a heading
      // computes its name from content it uses a child element's
      // `aria-label` — so `<h1><SplitText/></h1>` still names correctly
      // without needing a duplicate text node in the DOM.
      aria-label={text}
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
                // Whitespace becomes a plain text node so the browser's
                // default whitespace handling collapses it at line wraps.
                // (A `whiteSpace: "pre"` wrapper preserves the space at
                // wrap points and ends up indenting the wrapped line by
                // one space-width — which is what caused the H1's second
                // line to sit visibly to the right of the first.)
                return tok;
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
    </Tag>
  );
}
