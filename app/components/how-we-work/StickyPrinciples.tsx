"use client";

import { useRef } from "react";
import { Anchor } from "../primitives/Anchor";
import { useStickyProgress } from "../hooks/useStickyProgress";

type Principle = {
  number: string;
  heading: string;
  body: string;
  bg: string;
  metric?: {
    value: string;
    label: string;
  };
  chart?: {
    label: string;
    data: number[];
  };
};

// Six meta principles from doc Page 2 (How We Work).
// Each is a 2-paragraph body · much longer than the home's 8 operational
// principles. The sticky-scroll mechanism fits long-body principles well,
// which is why it lives here, not on home.
const PRINCIPLES: Principle[] = [
  {
    number: "01",
    heading: "We are a reliable long-term partner.",
    body: "We blend the discipline of consulting with the practicality of an in-house team. Month-to-month commercially, multi-year operationally.",
    bg: "var(--bl-paper)",
    metric: {
      value: "3x",
      label: "Longer average engagement vs industry standard",
    },
  },
  {
    number: "02",
    heading: "We scale up and down with you.",
    body: "For early-stage clients, we right-size so the practitioner is multiplied by software. For late-stage clients, we layer in dedicated team density.",
    bg: "var(--bl-ink)",
    chart: {
      label: "Flexible Team Scaling (Q1 to Q4)",
      data: [30, 45, 80, 50],
    },
  },
  {
    number: "03",
    heading: "The right intervention at the right time.",
    body: "A two-week annual security assessment is the wrong format. Embedded ongoing review, participating in PRs and product design, is the right format.",
    bg: "var(--bl-ink2)",
    chart: {
      label: "Continuous Coverage vs Annual Point-in-Time",
      data: [20, 100, 20, 100],
    },
  },
  {
    number: "04",
    heading: "We are not designed to be sticky.",
    body: "We deploy single-tenant infrastructure and do not contractually trap our clients. If you bring security in-house, we hand it over and step back.",
    bg: "var(--bl-ink3)",
    metric: {
      value: "0",
      label: "Months of contractual lock-in",
    },
  },
  {
    number: "05",
    heading: "Security is a sales job, too.",
    body: "We integrate where your team works. We answer questionnaires, attend customer reviews, and turn your security narrative into a competitive advantage.",
    bg: "#D3CEBF",
    metric: {
      value: "85%",
      label: "Reduction in vendor security review friction",
    },
  },
  {
    number: "06",
    heading: "We own the program. We coordinate your specialists.",
    body: "We own the program and coordinate best-in-class specialists for pentest, MDR, IR, and IT. One accountable partner across all of it.",
    bg: "#CAC5B4",
    metric: {
      value: "1",
      label: "Accountable partner for your entire security posture",
    },
  },
];

export function StickyPrinciples() {
  const sectRef = useRef<HTMLElement | null>(null);
  const p = useStickyProgress(sectRef);
  const total = PRINCIPLES.length;
  const activeF = p * (total - 1);
  const activeI = Math.min(total - 1, Math.floor(activeF));

  return (
    <section
      ref={sectRef}
      style={{
        position: "relative",
        background: "var(--bl-section-veil)",
        color: "var(--bl-fg)",
        height: `${total * 85}vh`,
      }}
    >
      <div
        style={{
          position: "sticky",
          top: "var(--bl-top-offset)",
          height: "calc(100vh - var(--bl-top-offset))",
          display: "flex",
          flexDirection: "column",
          padding: "var(--bl-section-gap) var(--bl-page-pad) clamp(40px, 5vw, 60px)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: "var(--bl-max-width)",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Anchor
            number="01"
            label="Principles"
            right={`${String(Math.min(total, activeI + 1)).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
          />
        </div>

        {/* Split: left rail (heading + progress) · right column (stacked cards) */}
        <div
          className="bl-stack-md"
          style={{
            maxWidth: "var(--bl-max-width)",
            width: "100%",
            margin: "0 auto",
            flex: 1,
            display: "grid",
            gridTemplateColumns: "minmax(260px, 1fr) minmax(320px, 1.7fr)",
            gap: "clamp(40px, 6vw, 100px)",
            alignItems: "center",
          }}
        >
          {/* Left rail: section H2 + progress */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "clamp(36px, 5vw, 76px)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                margin: 0,
              }}
            >
              Six principles
              <br />
              <span style={{ color: "var(--bl-fg3)" }}>that decide</span>
              <br />
              <span style={{ color: "var(--bl-neon)" }}>who we are.</span>
            </h2>

            <div
              style={{
                marginTop: "clamp(28px, 4vw, 48px)",
                height: 2,
                background: "var(--bl-rule)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${p * 100}%`,
                  background: "var(--bl-neon)",
                  transition: "width 0.1s linear",
                }}
              />
            </div>
            <p
              style={{
                marginTop: 14,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--bl-fg3)",
                letterSpacing: "0.04em",
              }}
            >
              Scroll to read each principle
            </p>
          </div>

          {/* Right column: stacked principle cards */}
          <div style={{ position: "relative", height: "min(520px, 64vh)" }}>
            {PRINCIPLES.map((pr, i) => {
              const offset = i - activeF;
              const abs = Math.abs(offset);
              const isPast = offset < -0.5;
              const visible = abs < 2.5;
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "var(--bl-ink2)",
                    border: `1px solid ${
                      i === activeI ? "var(--bl-rule2)" : "var(--bl-rule)"
                    }`,
                    borderRadius: 20,
                    padding: "clamp(28px, 3.4vw, 48px)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transform: `translateY(${offset < 0 ? offset * 120 + "%" : offset * 32 + "px"}) scale(${offset < 0 ? 1 : 1 - offset * 0.05})`,
                    opacity: offset < -0.8 ? 0 : visible ? 1 : 0,
                    transformOrigin: "top center",
                    pointerEvents: i === activeI ? "auto" : "none",
                    transition: "border-color 0.25s linear",
                    zIndex: 100 - i,
                    overflow: "auto",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        color: "var(--bl-fg3)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {pr.number} / {String(total).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      style={{
                        display: "inline-block",
                        width: 8,
                        height: 8,
                        background:
                          i === activeI
                            ? "var(--bl-neon)"
                            : "var(--bl-rule2)",
                        borderRadius: "50%",
                        boxShadow:
                          i === activeI
                            ? "0 0 12px var(--bl-neon)"
                            : "none",
                      }}
                    />
                  </div>

                  <div style={{ marginTop: 20 }}>
                    {pr.metric && (
                      <div style={{ marginBottom: 24 }}>
                        <div
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontWeight: 500,
                            fontSize: "clamp(60px, 8vw, 96px)",
                            lineHeight: 0.9,
                            letterSpacing: "-0.04em",
                            color: "var(--bl-neon)",
                            marginBottom: 8,
                          }}
                        >
                          {pr.metric.value}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 12,
                            color: "var(--bl-fg3)",
                            letterSpacing: "0.02em",
                            borderTop: "1px solid var(--bl-rule)",
                            paddingTop: 8,
                          }}
                        >
                          {pr.metric.label}
                        </div>
                      </div>
                    )}
                    
                    {pr.chart && (
                      <MiniChart data={pr.chart.data} label={pr.chart.label} />
                    )}

                    <h3
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 500,
                        fontSize: "clamp(22px, 2.2vw, 32px)",
                        lineHeight: 1.15,
                        letterSpacing: "-0.015em",
                        color: "var(--bl-fg)",
                        margin: "0 0 16px",
                      }}
                    >
                      {pr.heading}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 400,
                        fontSize: "clamp(15px, 1.3vw, 17px)",
                        lineHeight: 1.6,
                        color: "var(--bl-fg2)",
                        margin: 0,
                        maxWidth: "var(--bl-text-tight)",
                      }}
                    >
                      {pr.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniChart({ data, label }: { data: number[]; label: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 6,
          height: 60,
          marginBottom: 8,
        }}
      >
        {data.map((val, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${val}%`,
              background: "var(--bl-neon)",
              opacity: val === 100 ? 1 : 0.4,
              borderRadius: "4px 4px 0 0",
            }}
          />
        ))}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--bl-fg3)",
          letterSpacing: "0.04em",
          borderTop: "1px solid var(--bl-rule)",
          paddingTop: 8,
        }}
      >
        {label}
      </div>
    </div>
  );
}
