"use client";

import Link from "next/link";
import { useState } from "react";
import { Anchor } from "../primitives/Anchor";
import {
  ALSO_AVAILABLE,
  ENGAGEMENT_CLOSER,
  ENGAGEMENTS,
  type Engagement,
} from "../../lib/engagements";


/**
 * Sprint ledger. Rows with `href` link to their dedicated landing pages.
 * Hover lights the row with a left neon bar. Section heading dropped the
 * explicit count so we do not need to re-render every time a sprint
 * lands or retires.
 */
export function SprintsTable() {
  return (
    <section
      id="sprints"
      style={{
        position: "relative",
        background: "var(--bl-section-veil)",
        color: "var(--bl-fg)",
        padding: "clamp(100px, 14vw, 180px) var(--bl-page-pad)",
        borderTop: "1px solid var(--bl-rule)",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="04" label="The work" />

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(32px, 4.5vw, 64px)",
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            margin: "0 0 24px",
            maxWidth: "var(--bl-heading-wide)",
          }}
        >
          The work,
          <br />
          <span style={{ color: "var(--bl-fg3)" }}>
            matched to the problem on your desk.
          </span>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(15px, 1.2vw, 17px)",
            color: "var(--bl-fg2)",
            lineHeight: 1.65,
            maxWidth: "var(--bl-text-body)",
            margin: "0 0 clamp(48px, 6vw, 80px)",
          }}
        >
          These are engagements we have run enough times to deliver on a
          clock. If one of them looks like the problem you are facing, the
          weeks column tells you how quickly it can be gone: fixed scope,
          fixed date, a senior partner in every meeting, and first-pass
          acceptance as the contracted outcome.
        </p>

        <div
          style={{
            overflowX: "auto",
            border: "1px solid var(--bl-rule)",
            borderRadius: 12,
            background: "var(--bl-ink2)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: 720,
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid var(--bl-rule)" }}>
                <TH style={{ width: "32%" }}>Engagement</TH>
                <TH style={{ width: "52%" }}>The situation it fixes</TH>
                <TH style={{ width: "16%", textAlign: "right" }}>Weeks</TH>
              </tr>
            </thead>
            <tbody>
              {ENGAGEMENTS.map((s, i) => (
                <SprintRow key={i} sprint={s} isLast={i === ENGAGEMENTS.length - 1} />
              ))}
            </tbody>
          </table>
        </div>

        {/* ST-4 · every row lands in the same place. */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(15px, 1.2vw, 17px)",
            lineHeight: 1.65,
            color: "var(--bl-fg2)",
            maxWidth: "var(--bl-text-body)",
            margin: "clamp(28px, 3.5vw, 40px) 0 0",
          }}
        >
          {ENGAGEMENT_CLOSER}
        </p>

        {/* Pack §4 keeps these two out of the nine but explicitly does not
            drop them, so they are named rather than lost. */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            letterSpacing: "0.04em",
            lineHeight: 1.6,
            color: "var(--bl-fg3)",
            margin: "18px 0 0",
          }}
        >
          Also available, scoped on request: {ALSO_AVAILABLE.join(" · ")}.
          MAS-specific sprints live on the{" "}
          <Link
            href="/singapore"
            className="bl-email-link"
            style={{ color: "var(--bl-fg2)", textDecoration: "underline" }}
          >
            Singapore practice page
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function TH({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <th
      style={{
        textAlign: "left",
        padding: "16px 20px",
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--bl-fg3)",
        fontWeight: 500,
        ...style,
      }}
    >
      {children}
    </th>
  );
}

function SprintRow({
  sprint,
  isLast,
}: {
  sprint: Engagement;
  isLast: boolean;
}) {
  const [hov, setHov] = useState(false);
  const hasLink = Boolean(sprint.href);

  return (
    <tr
      onPointerEnter={() => setHov(true)}
      onPointerLeave={() => setHov(false)}
      style={{
        background: hov && hasLink ? "var(--bl-ink3)" : "transparent",
        borderBottom: isLast ? "none" : "1px solid var(--bl-rule)",
        transition: "background 0.25s ease",
        cursor: hasLink ? "pointer" : "default",
      }}
    >
      <td
        style={{
          padding: "20px",
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          fontSize: 16,
          color: "var(--bl-fg)",
          letterSpacing: "-0.005em",
          verticalAlign: "top",
          position: "relative",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: 8,
            bottom: 8,
            width: 2,
            background: hasLink ? "var(--bl-neon)" : "var(--bl-rule2)",
            opacity: hov && hasLink ? 1 : hasLink ? 0.55 : 0.25,
            transition: "opacity 0.25s ease",
          }}
        />
        {hasLink ? (
          <Link
            href={sprint.href!}
            style={{
              color: "inherit",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            {sprint.name}
            <span
              aria-hidden="true"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.06em",
                color: "var(--bl-neon)",
              }}
            >
              ↗
            </span>
          </Link>
        ) : (
          sprint.name
        )}
        {/* ST-4 · row one is the stated front door to everything else. */}
        {sprint.entryPoint && (
          <span
            style={{
              display: "block",
              marginTop: 6,
              fontFamily: "var(--font-mono)",
              fontSize: 9.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--bl-accent)",
              fontWeight: 500,
            }}
          >
            Where most engagements begin
          </span>
        )}
      </td>
      <td
        style={{
          padding: "20px",
          fontFamily: "var(--font-sans)",
          fontSize: 14,
          color: "var(--bl-fg2)",
          lineHeight: 1.55,
          verticalAlign: "top",
        }}
      >
        {sprint.fixes}
      </td>
      <td
        style={{
          padding: "20px",
          textAlign: "right",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--bl-fg3)",
          letterSpacing: "0.04em",
          verticalAlign: "top",
          whiteSpace: "nowrap",
        }}
      >
        {sprint.weeks}
      </td>
    </tr>
  );
}
