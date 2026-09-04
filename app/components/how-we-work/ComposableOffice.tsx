"use client";

import { Anchor } from "../primitives/Anchor";
import { Rise } from "../primitives/Rise";
import { SplitText } from "../primitives/SplitText";

/**
 * HW-1 · The composable Security Office.
 *
 * Sits after the six principles and before "How an engagement runs".
 *
 * The visual is the point: a fixed core (forward-deployed engineer + vCISO)
 * rendered solid at the centre, with specialised agent modules docked around
 * it. Two are attached, the rest sit detached at the edge, so the diagram
 * reads in about three seconds as "core stays, modules attach and detach".
 *
 * Deliberately ink-on-paper: hard rules, mono labels, no gradients, no glow.
 * Copy note: the concept is stated without the SaaS vocabulary — the phrases
 * "plug and play" and "pay as you go" are banned from this section.
 */

type Module = { label: string; attached: boolean };

const MODULES: Module[] = [
  { label: "DevSecOps", attached: true },
  { label: "Vulnerability mgmt", attached: true },
  { label: "Incident response", attached: false },
  { label: "Compliance evidence", attached: false },
  { label: "Threat intel", attached: false },
];

export function ComposableOffice() {
  return (
    <section
      style={{
        background: "var(--bl-section-veil)",
        color: "var(--bl-fg)",
        padding: "var(--bl-section-gap) var(--bl-page-pad)",}}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="02" label="The composable Security Office" />

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(30px, 4vw, 60px)",
            lineHeight: 1.06,
            letterSpacing: "-0.032em",
            margin: "0 0 clamp(36px, 5vw, 60px)",
            maxWidth: "var(--bl-heading-wide)",
          }}
        >
          <SplitText text="One senior team. Assembled for you, and only as much of it as you need." />
        </h2>

        <div
          className="bl-stack-md"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(300px, 1fr) minmax(320px, 1.05fr)",
            gap: "clamp(40px, 5vw, 80px)",
            alignItems: "start",
          }}
        >
          <Rise>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <p style={BODY}>
                Every engagement we run deploys the same way: one
                forward-deployed engineer and one virtual CISO arrive as the
                fixed core, and around them we compose whatever the programme
                actually needs from our bench of specialised agents. There is
                an agent for DevSecOps that lives in your pipeline, one for
                vulnerability management that never stops watching, one for
                incident response that drills your runbook instead of letting
                it rot in a drawer, and more of them arriving as the workbench
                grows. You scale the team up when an audit lands or a deal
                demands it, and you scale it back down the month after,
                because you are paying for a security capability, not for
                headcount that sits there between crises.
              </p>
              <p style={BODY}>
                That is the whole model. The senior people carry the judgment
                and the accountability. The agents carry the volume. And the
                shape of the team changes with your quarter, not with our
                revenue plan.
              </p>
            </div>
          </Rise>

          <Rise delay={0.08}>
            <CoreAndModules />
          </Rise>
        </div>
      </div>
    </section>
  );
}

const BODY: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "clamp(15px, 1.2vw, 17px)",
  lineHeight: 1.7,
  color: "var(--bl-fg2)",
  margin: 0,
  maxWidth: "var(--bl-text-body)",
};

/**
 * The diagram. A solid core block with docked modules above/below it and
 * detached ones held at the right-hand edge under an "available" rule.
 */
function CoreAndModules() {
  const attached = MODULES.filter((m) => m.attached);
  const available = MODULES.filter((m) => !m.attached);

  return (
    <figure
      style={{
        margin: 0,
        border: "1px solid var(--bl-rule)",
        background: "var(--bl-ink2)",
        padding: "clamp(24px, 3vw, 36px)",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <Caption>Fixed core</Caption>

      {/* Core: solid, ink-filled, unmistakably the anchor. */}
      <div
        style={{
          background: "var(--bl-bone)",
          color: "var(--bl-bone-fg)",
          padding: "18px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Forward-deployed engineer
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Virtual CISO
        </span>
      </div>

      <Caption>Attached this quarter</Caption>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {attached.map((m) => (
          <ModuleRow key={m.label} label={m.label} attached />
        ))}
      </div>

      <Caption>Available, not deployed</Caption>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {available.map((m) => (
          <ModuleRow key={m.label} label={m.label} attached={false} />
        ))}
      </div>
    </figure>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <figcaption
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 9.5,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--bl-fg3)",
      }}
    >
      {children}
    </figcaption>
  );
}

/**
 * Attached modules are solid-bordered and butt against a short connector
 * rule; available ones are dashed and carry no connector. The difference in
 * border alone is what makes "attach / detach" legible at a glance.
 */
function ModuleRow({
  label,
  attached,
}: {
  label: string;
  attached: boolean;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      {attached && (
        <span
          aria-hidden="true"
          style={{
            width: 18,
            height: 1,
            background: "var(--bl-accent)",
            flexShrink: 0,
          }}
        />
      )}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: attached ? "var(--bl-fg)" : "var(--bl-fg3)",
          border: attached
            ? "1px solid var(--bl-accent)"
            : "1px dashed var(--bl-rule2)",
          padding: "8px 12px",
          background: attached ? "var(--bl-ink)" : "transparent",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </span>
  );
}
