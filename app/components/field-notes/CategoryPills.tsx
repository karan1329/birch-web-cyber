"use client";

const CATEGORIES = [
  "Compliance",
  "Privacy",
  "AI Security",
  "Cloud Security",
  "vCISO",
  "CRQ",
  "Regulator",
  "Incident Response",
  "Sales Enablement",
  "Engineering",
];

/**
 * Category filter row at the top of the blog page. Pure visual chips for v1
 * (no active filtering wired yet). Hover lights neon.
 */
export function CategoryPills() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        padding: "0 0 8px",
      }}
    >
      {CATEGORIES.map((c) => (
        <Pill key={c} label={c} />
      ))}
    </div>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <button
      type="button"
      style={{
        background: "transparent",
        border: "1px solid var(--bl-rule)",
        color: "var(--bl-fg2)",
        padding: "8px 14px",
        borderRadius: 999,
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.06em",
        cursor: "pointer",
        transition: "border-color 0.2s ease, color 0.2s ease",
      }}
      onPointerEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--bl-neon)";
        e.currentTarget.style.color = "var(--bl-fg)";
      }}
      onPointerLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--bl-rule)";
        e.currentTarget.style.color = "var(--bl-fg2)";
      }}
    >
      {label}
    </button>
  );
}
