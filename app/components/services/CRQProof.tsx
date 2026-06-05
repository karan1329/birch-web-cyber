"use client";

import { Anchor } from "../primitives/Anchor";
import { SplitText } from "../primitives/SplitText";
import { useCount } from "../hooks/useCount";
import { useInView } from "../hooks/useInView";

/**
 * The CRQ "45 days, not six months" proof block. Moved from the home page
 * (where the old `Proof.tsx` lived) to /services, where it attaches naturally
 * to Practice II (CRQ and Strategic Assessment).
 *
 * Identical logic to the prior home Proof · only the section anchor and
 * surrounding context change.
 */
export function CRQProof() {
  const [ref, inView] = useInView<HTMLElement>(0.35);
  const days = useCount(45, 1600, inView);
  const pct = useCount(80, 1400, inView);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        background: "var(--bl-section-veil)",
        color: "var(--bl-fg)",
        padding: "clamp(120px, 16vw, 200px) var(--bl-page-pad)",
        overflow: "hidden",
        borderTop: "1px solid var(--bl-rule)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 70% 50%, rgba(var(--bl-neon-rgb), 0.18) 0%, transparent 50%)",
          opacity: inView ? 1 : 0,
          transition: "opacity 1.4s ease",
        }}
      />

      <div
        className="bl-container"
        style={{ padding: 0, position: "relative" }}
      >
        <Anchor number="02" label="Proof · Practice II" />

        <div
          className="bl-stack-md"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(280px, 1.4fr) minmax(280px, 1fr)",
            gap: "clamp(40px, 6vw, 100px)",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "clamp(36px, 5vw, 76px)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                margin: "0 0 32px",
                maxWidth: 760,
              }}
            >
              <SplitText text="CRQ delivered" perChar={0.012} />
              <br />
              <SplitText text="in " perChar={0.012} delay={0.2} />
              <SplitText
                text="45 days"
                perChar={0.012}
                delay={0.35}
                style={{ color: "var(--bl-neon)" }}
              />
              <SplitText text="." perChar={0.012} delay={0.55} />
              <br />
              <SplitText
                text="Not six months."
                perChar={0.012}
                delay={0.7}
                dim
              />
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(15px, 1.2vw, 17px)",
                color: "var(--bl-fg2)",
                lineHeight: 1.65,
                maxWidth: 540,
                margin: 0,
              }}
            >
              FAIR and FAIR-CAM methodology, identical to top firms. The
              traditional consultancy response is a heat map in three shades of
              amber. The CRQ response is a number, denominated in the same
              currency the CFO uses for credit, market, and operational risk.
              The methodology is identical to top firms. The speed is our
              internal workbench.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Donut inView={inView} pct={pct} days={days} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Donut({
  inView,
  pct,
  days,
}: {
  inView: boolean;
  pct: number;
  days: number;
}) {
  const r = 120;
  const circ = 2 * Math.PI * r;
  const offset = inView ? circ * (1 - pct / 100) : circ;
  return (
    <svg
      viewBox="0 0 320 320"
      width="320"
      height="320"
      style={{ maxWidth: "100%" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bl-ring-services" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--bl-neon)" />
          <stop
            offset="100%"
            stopColor="rgba(var(--bl-neon-rgb), 0.6)"
          />
        </linearGradient>
      </defs>
      <circle
        cx="160"
        cy="160"
        r={r}
        fill="none"
        stroke="var(--bl-rule)"
        strokeWidth="2"
      />
      <circle
        cx="160"
        cy="160"
        r={r}
        fill="none"
        stroke="url(#bl-ring-services)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 160 160)"
        style={{
          transition:
            "stroke-dashoffset 1.6s cubic-bezier(0.2,0.7,0.2,1)",
          filter: "drop-shadow(0 0 8px rgba(var(--bl-neon-rgb), 0.35))",
        }}
      />
      <text
        x="160"
        y="152"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontWeight="500"
        fontSize="64"
        fill="var(--bl-fg)"
        letterSpacing="-0.04em"
      >
        {days}
      </text>
      <text
        x="160"
        y="186"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        fill="var(--bl-fg3)"
        letterSpacing="0.1em"
      >
        DAYS · FAIR-CAM
      </text>
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const x1 = (160 + Math.cos(a) * (r + 14)).toFixed(2);
        const y1 = (160 + Math.sin(a) * (r + 14)).toFixed(2);
        const x2 = (160 + Math.cos(a) * (r + 22)).toFixed(2);
        const y2 = (160 + Math.sin(a) * (r + 22)).toFixed(2);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--bl-rule2)"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}
