"use client";

import Link from "next/link";
import { Anchor } from "../primitives/Anchor";
import { Rise } from "../primitives/Rise";
import { SplitText } from "../primitives/SplitText";

type Principle = { lead: string };

// Bodies still removed — the lead claim carries the principle on its own.
const OLD_SCHOOL: Principle[] = [
  { lead: "Identity is the perimeter, not the network." },
  { lead: "Risk appetite is set with the executive team, in financial terms." },
  { lead: "Evidence is built into the workflow that creates it." },
  { lead: "Boards see cyber risk in dollars." },
];

const CUTTING_EDGE: Principle[] = [
  { lead: "Regulatory drift is monitored continuously." },
  { lead: "The bureaucratic 60 percent of consulting runs on AI agents." },
  { lead: "Senior practitioners are multiplied by software, not replaced." },
  { lead: "AI risk integrates into the cyber program, not next to it." },
];

/**
 * Editorial principle list. Latacora-restrained typography:
 *   - Small mono numbers, not enlarged
 *   - Mono section labels with a thin rule, not highlighted
 *   - Lead claims in display sans, no cards, no glow
 *
 * The previous version (giant neon numbers + marker-pen column headers)
 * read as too loud for this brand voice. This is the corrected discipline.
 */
export function HowWeWork() {
  return (
    <section
      style={{
        position: "relative",
        background: "var(--bl-ink)",
        color: "var(--bl-fg)",
        padding: "clamp(120px, 16vw, 200px) var(--bl-page-pad)",
        borderTop: "1px solid var(--bl-rule)",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="02" label="How we work" />

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(36px, 5.4vw, 84px)",
            lineHeight: 1,
            letterSpacing: "-0.035em",
            margin: "0 0 clamp(64px, 8vw, 112px)",
            maxWidth: 1100,
          }}
        >
          <SplitText text="Old school in discipline." perChar={0.012} />
          <br />
          <SplitText
            text="Cutting edge in execution."
            perChar={0.012}
            delay={0.24}
            dim
          />
        </h2>

        {/* Two-column editorial list */}
        <div
          className="bl-stack-md"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(280px, 1fr))",
            columnGap: "clamp(48px, 6vw, 96px)",
            rowGap: "clamp(48px, 6vw, 72px)",
          }}
        >
          <Rise>
            <Column label="Old school in discipline" items={OLD_SCHOOL} />
          </Rise>
          <Rise delay={0.06}>
            <Column label="Cutting edge in execution" items={CUTTING_EDGE} />
          </Rise>
        </div>

        {/* CTA */}
        <div style={{ marginTop: "clamp(56px, 7vw, 88px)" }}>
          <Rise>
            <Link
              href="/how-we-work"
              className="bl-howwework-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--bl-fg)",
                textDecoration: "none",
                paddingBottom: 4,
                borderBottom: "1px solid var(--bl-rule2)",
                transition: "border-color 0.2s ease, color 0.2s ease",
              }}
            >
              Read the full how-we-work page
              <span aria-hidden="true">→</span>
            </Link>
          </Rise>
        </div>
      </div>
    </section>
  );
}

function Column({ label, items }: { label: string; items: Principle[] }) {
  return (
    <div>
      {/* Understated section label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: "clamp(24px, 3vw, 36px)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--bl-fg3)",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
        <span
          aria-hidden="true"
          style={{ flex: 1, height: 1, background: "var(--bl-rule)" }}
        />
      </div>

      <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((p, i) => (
          <PrincipleRow key={i} index={i + 1} lead={p.lead} isLast={i === items.length - 1} />
        ))}
      </ol>
    </div>
  );
}

function PrincipleRow({
  index,
  lead,
  isLast,
}: {
  index: number;
  lead: string;
  isLast: boolean;
}) {
  return (
    <li
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(40px, 56px) 1fr",
        gap: 20,
        padding: "clamp(20px, 2.2vw, 28px) 0",
        borderBottom: isLast ? "none" : "1px solid var(--bl-rule)",
        alignItems: "baseline",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.06em",
          color: "var(--bl-neon)",
        }}
      >
        {String(index).padStart(2, "0")}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          fontSize: "clamp(18px, 1.7vw, 23px)",
          lineHeight: 1.22,
          letterSpacing: "-0.012em",
          color: "var(--bl-fg)",
          margin: 0,
          maxWidth: 520,
        }}
      >
        {lead}
      </h3>
    </li>
  );
}
