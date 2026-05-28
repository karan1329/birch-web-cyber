"use client";

import { type FormEvent, useCallback, useState } from "react";
import { submitContact } from "../../actions/contact";
import { RadioGroup, TextArea, TextField } from "../forms/FormField";
import { TurnstileWidget } from "../forms/TurnstileWidget";

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA";

const SUBJECTS = [
  {
    value: "quick-sprint",
    label: "Quick Sprint",
    sublabel: "Fixed scope, 2 to 4 weeks. One specific thing fixed.",
  },
  {
    value: "vciso",
    label: "vCISO retainer",
    sublabel: "The CISO office, on retainer. Month-to-month commercial.",
  },
  {
    value: "fso",
    label: "Fractional Security Office",
    sublabel: "A complete security function. Dedicated team, embedded.",
  },
  {
    value: "general",
    label: "Something else",
    sublabel:
      "Not sure which shape yet, or a regulator/board/incident moment.",
  },
];

type Status = "idle" | "submitting" | "success" | "error";

/**
 * The contact form itself. Renders inside the right column of the /contact
 * grid. State for the Turnstile token + submission status lives here; the
 * server action handles verify + (eventually) delivery.
 */
export function ContactForm() {
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
      const res = await submitContact(formData);
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

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        background: "var(--bl-ink2)",
        border: "1px solid var(--bl-rule)",
        borderRadius: 20,
        padding: "clamp(28px, 3.4vw, 44px)",
        display: "flex",
        flexDirection: "column",
        gap: 22,
      }}
    >
      <div
        className="bl-stack-sm"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}
      >
        <TextField
          name="firstName"
          label="First name"
          placeholder="Karan"
          required
          autoComplete="given-name"
        />
        <TextField
          name="lastName"
          label="Last name"
          placeholder="Bhandari"
          autoComplete="family-name"
        />
      </div>

      <div
        className="bl-stack-sm"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}
      >
        <TextField
          name="email"
          type="email"
          label="Work email"
          placeholder="you@company.com"
          required
          autoComplete="email"
        />
        <TextField
          name="company"
          label="Company"
          placeholder="Acme Corp"
          autoComplete="organization"
        />
      </div>

      <RadioGroup
        name="subject"
        label="What is this about?"
        options={SUBJECTS}
        defaultValue="quick-sprint"
        required
      />

      <TextArea
        name="message"
        label="What is in your way?"
        placeholder="A US enterprise customer is asking for SOC2 with teeth. We have a regulator's letter on the desk. We acquired a company and inherited a security stack we cannot defend. Be specific — the more concrete the blocker, the more useful the call."
        rows={6}
        required
        hint="Plain prose is fine. We do not need a brief."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--bl-fg3)",
          }}
        >
          Verify you are human
        </span>
        <TurnstileWidget sitekey={TURNSTILE_SITE_KEY} onToken={onToken} />
      </div>

      {error && (
        <p
          role="alert"
          style={{
            margin: 0,
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            lineHeight: 1.5,
            color: "rgba(255, 99, 99, 0.9)",
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
          justifyContent: "flex-end",
          gap: 16,
          marginTop: 8,
          flexWrap: "wrap",
        }}
      >
        <SubmitButton status={status} />
      </div>
    </form>
  );
}

function SubmitButton({ status }: { status: Status }) {
  const disabled = status === "submitting";
  return (
    <button
      type="submit"
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        padding: "16px 28px",
        background: "var(--bl-neon)",
        color: "var(--bl-ink)",
        border: "none",
        borderRadius: 999,
        fontFamily: "var(--font-sans)",
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: "-0.005em",
        cursor: disabled ? "wait" : "pointer",
        opacity: disabled ? 0.6 : 1,
        boxShadow:
          "0 0 0 1px var(--bl-neon), 0 12px 36px rgba(var(--bl-neon-rgb), 0.22)",
        transition: "opacity 0.2s ease, transform 0.2s ease",
      }}
    >
      <span>{disabled ? "Sending…" : "Send message"}</span>
      <span aria-hidden="true">→</span>
    </button>
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
        padding: "clamp(36px, 4vw, 56px)",
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
          fontSize: "clamp(24px, 2.6vw, 36px)",
          lineHeight: 1.1,
          letterSpacing: "-0.018em",
          color: "var(--bl-fg)",
        }}
      >
        Got it.
      </h3>
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(15px, 1.2vw, 17px)",
          lineHeight: 1.6,
          color: "var(--bl-fg2)",
          maxWidth: 420,
        }}
      >
        Your note is with the partner team. We reply with what we would do,
        and in how many weeks.
      </p>
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.06em",
          color: "var(--bl-fg3)",
          textTransform: "uppercase",
        }}
      >
        If it is an emergency, email hi@birchlogic.com directly.
      </p>
    </div>
  );
}
