"use client";

import { useRef } from "react";
import { Anchor } from "../primitives/Anchor";
import { useStickyProgress } from "../hooks/useStickyProgress";

type Principle = {
  number: string;
  heading: string;
  body: string[];
};

// Six meta principles from doc Page 2 (How We Work).
// Each is a 2-paragraph body · much longer than the home's 8 operational
// principles. The sticky-scroll mechanism fits long-body principles well,
// which is why it lives here, not on home.
const PRINCIPLES: Principle[] = [
  {
    number: "01",
    heading: "We are a reliable long-term partner.",
    body: [
      "We did not invent the consulting model. We did not invent the security-team-on-retainer model. We assembled the discipline of one and the practicality of the other into a firm that does both.",
      "Our engagements last years. We are month-to-month commercially because confident firms do not need lock-in. We are multi-year operationally because the work compounds and the senior partner stays on the engagement from kickoff through the third board cycle.",
    ],
  },
  {
    number: "02",
    heading: "We scale up and down with you.",
    body: [
      "We have started engagements with three-person companies and helped clients scale to hundreds of staff. We have also helped clients scale down: when a fundraise slipped, when an acquisition reshaped the business, when a cost cycle hit.",
      "For early-stage clients, we right-size the engagement so the senior practitioner is multiplied by software and the team stays small. For late-stage clients, we layer in dedicated team density. The shape changes; the partner accountability does not.",
    ],
  },
  {
    number: "03",
    heading: "The right intervention at the right time.",
    body: [
      "A two-week annual security assessment is the wrong format for almost every company we work with. Embedded ongoing review is the right format.",
      "Instead of a one-shot application security review at year-end, we participate in product design conversations when a feature is being scoped, review PRs as they happen, and run tightly scoped assessments when a feature is shipping. You get faster, cheaper, more relevant assessments.",
    ],
  },
  {
    number: "04",
    heading: "We are not designed to be sticky.",
    body: [
      "We deploy single-tenant infrastructure. We use commercial systems when they are the best tool. We build internal tooling when we need to. We do not contractually trap our clients.",
      "If you decide to bring security in-house, we hand the capability over and step back. We have done this before. We will do it again. We would rather be the firm clients come back to than the firm clients regret hiring.",
    ],
  },
  {
    number: "05",
    heading: "Security is a sales job, too.",
    body: [
      "A security program that says no to every customer request loses revenue. A security program that says yes to every request loses the company. Effective security is the third path: a program that the rest of the company sells with, not around.",
      "We integrate where your team works. Slack. Notion. Jira. PR review. Sales calls when needed. We answer security questionnaires. We attend customer security reviews. We turn the security narrative into a competitive advantage in your deal cycle, not a friction point.",
    ],
  },
  {
    number: "06",
    heading: "We own the program. We coordinate your specialists.",
    body: [
      "Some firms try to own everything in-house: pentest, MDR, IR, managed IT, vCISO, compliance, training, all of it. The math does not work. Quality compresses. Margin compresses. Talent leaves.",
      "We made a different choice. We own the program. We coordinate best-in-class specialists for penetration testing, managed detection and response, incident response, and managed IT. One accountable partner across all of it.",
    ],
  },
];

export function StickyPrinciples() {
  const sectRef = useRef<HTMLElement | null>(null);
  const p = useStickyProgress(sectRef);
  const total = PRINCIPLES.length;
  const activeF = Math.min(total - 0.001, p * total);
  const activeI = Math.floor(activeF);

  return (
    <section
      ref={sectRef}
      style={{
        position: "relative",
        background: "var(--bl-section-veil)",
        color: "var(--bl-fg)",
        height: `${total * 85}vh`,
        borderTop: "1px solid var(--bl-rule)",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: "var(--bl-top-offset)",
          height: "calc(100vh - var(--bl-top-offset))",
          display: "flex",
          flexDirection: "column",
          padding:
            "clamp(48px, 6vw, 80px) var(--bl-page-pad) clamp(40px, 5vw, 60px)",
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
                    transform: `translateY(${offset * 24}px) scale(${
                      1 - abs * 0.06
                    }) rotateX(${offset * 4}deg)`,
                    opacity: isPast
                      ? 0
                      : visible
                        ? Math.max(0, 1 - abs * 0.45)
                        : 0,
                    transformOrigin: "top center",
                    pointerEvents: i === activeI ? "auto" : "none",
                    transition:
                      "transform 0.25s cubic-bezier(0.2,0.7,0.2,1), opacity 0.25s linear, border-color 0.25s linear",
                    zIndex: visible ? 100 - Math.round(abs * 10) : 0,
                    boxShadow:
                      i === activeI
                        ? "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px var(--bl-rule)"
                        : "none",
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
                    <h3
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 500,
                        fontSize: "clamp(22px, 2.2vw, 32px)",
                        lineHeight: 1.15,
                        letterSpacing: "-0.015em",
                        color: "var(--bl-fg)",
                        margin: "0 0 18px",
                      }}
                    >
                      {pr.heading}
                    </h3>
                    {pr.body.map((para, idx) => (
                      <p
                        key={idx}
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontWeight: 400,
                          fontSize: "clamp(14px, 1.1vw, 16px)",
                          lineHeight: 1.6,
                          color: "var(--bl-fg2)",
                          margin: idx === 0 ? "0 0 14px" : 0,
                          maxWidth: "var(--bl-text-tight)",
                        }}
                      >
                        {para}
                      </p>
                    ))}
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
