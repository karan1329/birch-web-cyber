"use client";

const LINKEDIN_URL = "https://www.linkedin.com/company/birchlogic/";

/**
 * Left-rail card on the /contact form section. Inverted-surface card (always
 * dark, even in light mode) so the form on the right is visually paired with
 * a dense brand block on the left.
 */
export function ContactInfoCard() {
  return (
    <aside
      style={{
        position: "relative",
        background: "var(--bl-ink)",
        color: "var(--bl-fg)",
        border: "1px solid var(--bl-rule)",
        borderRadius: 20,
        padding: "clamp(28px, 3.4vw, 44px)",
        display: "flex",
        flexDirection: "column",
        gap: 28,
        overflow: "hidden",
        minHeight: "100%",
      }}
    >
      {/* Quiet neon vignette anchored bottom-right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: -120,
          bottom: -120,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(var(--bl-neon-rgb), 0.18), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <header style={{ position: "relative" }}>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--bl-fg3)",
            marginBottom: 14,
          }}
        >
          Get in touch
        </span>
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
          Bring a specific blocker.
        </h3>
        <p
          style={{
            margin: "16px 0 0",
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(14px, 1.15vw, 16px)",
            lineHeight: 1.6,
            color: "var(--bl-fg2)",
            maxWidth: 360,
          }}
        >
          Tell us what is in your way. We will reply with what we would do,
          and in how many weeks.
        </p>
      </header>

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          paddingTop: 4,
        }}
      >
        <InfoRow label="Email" value="hi@birchlogic.com" href="mailto:hi@birchlogic.com" />
        <InfoRow
          label="LinkedIn"
          value="Birchlogic"
          href={LINKEDIN_URL}
          external
        />
        <InfoRow label="Office" value="Delhi, India" />
        <InfoRow
          label="Singapore"
          value="Practice open"
          href="/singapore"
        />
      </div>

      <div
        style={{
          position: "relative",
          marginTop: "auto",
          paddingTop: 24,
          borderTop: "1px solid var(--bl-rule)",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: 8,
            height: 8,
            background: "var(--bl-neon)",
            borderRadius: "50%",
            boxShadow: "0 0 10px var(--bl-neon)",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.06em",
            color: "var(--bl-fg2)",
          }}
        >
          30 minutes · zero pitch deck
        </span>
      </div>
    </aside>
  );
}

function InfoRow({
  label,
  value,
  href,
  external,
  muted,
}: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  muted?: boolean;
}) {
  const inner = (
    <span
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "clamp(15px, 1.25vw, 17px)",
        color: muted ? "var(--bl-fg3)" : "var(--bl-fg)",
        fontWeight: 500,
        letterSpacing: "-0.008em",
      }}
    >
      {value}
    </span>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--bl-fg3)",
        }}
      >
        {label}
      </span>
      {href ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className="bl-contact-info-link"
          style={{
            textDecoration: "none",
            color: "inherit",
            transition: "color 0.2s ease",
          }}
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  );
}
