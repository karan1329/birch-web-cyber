"use client";

import Link from "next/link";
import { type FormEvent, useCallback, useState } from "react";
import { submitApplication } from "../../actions/contact";
import { useId } from "react";
import { TextField } from "../forms/FormField";
import { TurnstileWidget } from "../forms/TurnstileWidget";
import {
  ROLE_QUESTIONS,
  type Role,
} from "./roles";

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Job application form. Role is LOCKED — passed in from the page based on
 * the `?role=` query param. If the candidate picked the wrong door we send
 * them back to /careers to choose again. Questions are role-specific and
 * read more like a craft conversation than an HR form.
 *
 * Notes:
 *  - The "we respond within four hours" pressure line is gone.
 *  - Each question is numbered as a chapter — neon "01"/"02"/"03"/"04".
 *  - Preamble is written in Karan's voice; no corporate hedging.
 */
export function ApplyForm({ role }: { role: Role }) {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const onToken = useCallback((t: string) => setToken(t), []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const formData = new FormData(e.currentTarget);
    formData.set("cf-turnstile-response", token);
    try {
      const res = await submitApplication(formData);
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setError(res.error);
      }
    } catch {
      setStatus("error");
      setError(
        "Could not reach the server. Check your connection and try again.",
      );
    }
  }

  if (status === "success") {
    return <SuccessState />;
  }

  const questions = ROLE_QUESTIONS[role.slug];

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 40,
      }}
    >
      {/* Hidden role input — locked, comes from the page's searchParams */}
      <input type="hidden" name="role" value={role.slug} />

      {/* Locked-role confirmation card */}
      <LockedRoleCard role={role} />

      {/* Karan's preamble — sets the experience */}
      <Preamble />

      {/* Candidate details */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <SectionHeader index="A" label="Your details" />
        <div
          className="bl-stack-sm"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}
        >
          <TextField
            name="name"
            label="Full name"
            required
            autoComplete="off"
          />
          <TextField
            name="email"
            type="email"
            inputMode="email"
            label="Email"
            placeholder="you@domain.com"
            required
            autoComplete="off"
          />
        </div>

        <div
          className="bl-stack-sm"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}
        >
          <TextField
            name="linkedin"
            type="url"
            inputMode="url"
            label="LinkedIn URL"
            placeholder="https://www.linkedin.com/in/..."
            required
            autoComplete="off"
          />
          <TextField
            name="phone"
            type="tel"
            inputMode="tel"
            label="Phone (optional)"
            placeholder="+91 XXXXX XXXXX"
            autoComplete="off"
          />
        </div>
      </section>

      {/* The 4 role-specific questions */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <SectionHeader index="B" label="The questions" />
        <p
          style={{
            margin: "0 0 24px",
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(15px, 1.2vw, 17px)",
            lineHeight: 1.65,
            color: "var(--bl-fg2)",
            maxWidth: "var(--bl-text-body)",
          }}
        >
          Four questions. Be specific. We read every answer ourselves and
          we are looking for the shape of your judgement, not the polish of
          your writing.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          {questions.map((q, i) => (
            <QuestionBlock
              key={q.id}
              number={i + 1}
              name={q.id}
              label={q.label}
              placeholder={q.placeholder}
              required={q.required}
            />
          ))}
        </div>
      </section>

      {/* Turnstile + submit */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          paddingTop: 20,
          borderTop: "1px solid var(--bl-rule)",
        }}
      >
        <TurnstileWidget sitekey={TURNSTILE_SITE_KEY} onToken={onToken} />

        {error && (
          <p
            role="alert"
            style={{
              margin: 0,
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              lineHeight: 1.5,
              color: "rgba(255, 99, 99, 0.92)",
              padding: "12px 14px",
              background: "rgba(255, 99, 99, 0.08)",
              border: "1px solid rgba(255, 99, 99, 0.25)",
              borderRadius: 8,
            }}
          >
            {error}
          </p>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              margin: 0,
              maxWidth: "var(--bl-text-tight)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.04em",
              color: "var(--bl-fg3)",
              lineHeight: 1.55,
            }}
          >
            Your application lands directly in Karan&rsquo;s inbox at
            hi@birchlogic.com. No HRIS, no recruiter screen.
          </p>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="bl-mag-button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 30px",
              background: "var(--bl-neon)",
              color: "var(--bl-ink)",
              border: "none",
              borderRadius: 999,
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "-0.005em",
              cursor: status === "submitting" ? "wait" : "pointer",
              opacity: status === "submitting" ? 0.6 : 1,
              boxShadow:
                "0 0 0 1px var(--bl-neon), 0 12px 36px rgba(var(--bl-neon-rgb), 0.22)",
              transition: "opacity 0.2s ease",
            }}
          >
            <span>{status === "submitting" ? "Sending…" : "Send to Karan"}</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    </form>
  );
}

// ─── Subcomponents ──────────────────────────────────────────────────────

function LockedRoleCard({ role }: { role: Role }) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 24,
        padding: "clamp(22px, 2.6vw, 32px)",
        background: "rgba(var(--bl-neon-rgb), 0.08)",
        border: "1px solid var(--bl-neon)",
        borderRadius: 16,
        overflow: "hidden",
        flexWrap: "wrap",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 100% 0%, rgba(var(--bl-neon-rgb), 0.18), transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          flex: "1 1 240px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--bl-neon)",
          }}
        >
          You are applying for
        </span>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(22px, 2.2vw, 30px)",
            lineHeight: 1.15,
            letterSpacing: "-0.018em",
            color: "var(--bl-fg)",
          }}
        >
          {role.title}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.06em",
            color: "var(--bl-fg2)",
          }}
        >
          {role.location}
        </span>
      </div>
      <Link
        href="/careers"
        style={{
          position: "relative",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.06em",
          color: "var(--bl-fg2)",
          textTransform: "uppercase",
          textDecoration: "none",
          paddingBottom: 3,
          borderBottom: "1px solid var(--bl-rule2)",
          transition: "color 0.2s ease, border-color 0.2s ease",
        }}
        className="bl-email-link"
      >
        Wrong role? ↩
      </Link>
    </div>
  );
}

function Preamble() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: "var(--bl-text-body)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--bl-fg3)",
        }}
      >
        From Karan
      </span>
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(17px, 1.4vw, 21px)",
          lineHeight: 1.55,
          letterSpacing: "-0.012em",
          color: "var(--bl-fg)",
        }}
      >
        We do not run a hiring funnel. We read every application ourselves.
        The questions below are the four things I want to know before we put
        thirty minutes on the calendar. If they feel hard, that is the
        point. We are not looking for the right answer; we are looking for
        what is in your head when you think about your craft.
      </p>
    </div>
  );
}

function SectionHeader({ index, label }: { index: string; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        marginBottom: 4,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.14em",
          color: "var(--bl-neon)",
          textTransform: "uppercase",
        }}
      >
        Section {index}
      </span>
      <span
        aria-hidden="true"
        style={{ flex: 1, height: 1, background: "var(--bl-rule)" }}
      />
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.06em",
          color: "var(--bl-fg3)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function QuestionBlock({
  number,
  name,
  label,
  placeholder,
  required,
}: {
  number: number;
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
}) {
  const id = useId();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <label
        htmlFor={id}
        style={{ display: "flex", alignItems: "flex-start", gap: 20, cursor: "text" }}
      >
        <span
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(28px, 2.8vw, 40px)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            color: "var(--bl-neon)",
            minWidth: 56,
            flexShrink: 0,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {String(number).padStart(2, "0")}
        </span>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(18px, 1.7vw, 24px)",
            lineHeight: 1.3,
            letterSpacing: "-0.012em",
            color: "var(--bl-fg)",
          }}
        >
          {label}
          {required && (
            <span aria-hidden="true" style={{ color: "var(--bl-neon)" }}>
              {" *"}
            </span>
          )}
        </span>
      </label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        rows={5}
        required={required}
        style={{
          width: "100%",
          padding: "14px 16px",
          background: "var(--bl-ink2)",
          color: "var(--bl-fg)",
          border: "1px solid var(--bl-rule)",
          borderRadius: 8,
          fontFamily: "var(--font-sans)",
          fontSize: 15,
          lineHeight: 1.6,
          minHeight: 140,
          resize: "vertical",
          outline: "none",
          transition: "border-color 0.2s ease, background 0.2s ease",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--bl-neon)";
          e.currentTarget.style.background = "var(--bl-ink3)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--bl-rule)";
          e.currentTarget.style.background = "var(--bl-ink2)";
        }}
      />
    </div>
  );
}

function SuccessState() {
  return (
    <div
      role="status"
      style={{
        background: "var(--bl-ink2)",
        border: "1px solid var(--bl-rule)",
        borderRadius: 20,
        padding: "clamp(40px, 4vw, 64px)",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 420,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "var(--bl-neon)",
          boxShadow: "0 0 16px var(--bl-neon)",
        }}
      />
      <h3
        style={{
          margin: 0,
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          fontSize: "clamp(26px, 2.8vw, 40px)",
          lineHeight: 1.1,
          letterSpacing: "-0.018em",
          color: "var(--bl-fg)",
        }}
      >
        Got it. Reading it now.
      </h3>
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(15px, 1.2vw, 17px)",
          lineHeight: 1.65,
          color: "var(--bl-fg2)",
          maxWidth: "var(--bl-text-tight)",
        }}
      >
        Your application is in. When we have read it properly, we will reply
        with either a calendar invite or an honest no with a reason. We will
        not ghost you.
      </p>
    </div>
  );
}
