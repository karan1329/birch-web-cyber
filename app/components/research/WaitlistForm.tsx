"use client";

import { type FormEvent, useCallback, useState } from "react";
import { joinWaitlist } from "../../actions/contact";
import { TurnstileWidget } from "../forms/TurnstileWidget";

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA";

/**
 * RS-7 · "Follow the build". The only email field on the site.
 * Submissions are tagged so they separate cleanly from contact and
 * application traffic in the inbox.
 */
export function WaitlistForm({ tag }: { tag: string }) {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const onToken = useCallback((t: string) => setToken(t), []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    fd.set("cf-turnstile-response", token);
    fd.set("tag", tag);
    try {
      const res = await joinWaitlist(fd);
      if (res.ok) setStatus("done");
      else {
        setStatus("error");
        setError(res.error);
      }
    } catch {
      setStatus("error");
      setError("Could not reach the server. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <p
        role="status"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 15,
          color: "var(--bl-fg)",
          margin: 0,
        }}
      >
        You are on the list. We will write when there is something real to
        show, and not before.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 460 }}
    >
      <label
        htmlFor="waitlist-email"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--bl-fg3)",
        }}
      >
        Follow the build
      </label>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          id="waitlist-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="off"
          required
          placeholder="you@company.com"
          style={{
            flex: "1 1 220px",
            minWidth: 0,
            padding: "13px 15px",
            background: "var(--bl-ink2)",
            color: "var(--bl-fg)",
            border: "1px solid var(--bl-rule)",
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={status === "sending"}
          style={{
            padding: "13px 22px",
            background: "var(--bl-accent)",
            color: "var(--bl-ink)",
            border: "none",
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            fontWeight: 500,
            cursor: status === "sending" ? "wait" : "pointer",
            opacity: status === "sending" ? 0.6 : 1,
            whiteSpace: "nowrap",
          }}
        >
          {status === "sending" ? "Adding…" : "Follow the build →"}
        </button>
      </div>
      <TurnstileWidget sitekey={TURNSTILE_SITE_KEY} onToken={onToken} />
      {error && (
        <p
          role="alert"
          style={{
            margin: 0,
            fontFamily: "var(--font-sans)",
            fontSize: 13.5,
            color: "var(--bl-accent-deep)",
          }}
        >
          {error}
        </p>
      )}
    </form>
  );
}
