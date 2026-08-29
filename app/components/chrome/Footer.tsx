"use client";

import Link from "next/link";

import { OFFICES, SHOW_STREET_ADDRESSES } from "../../lib/offices";

const NAV = [
  ["/", "Home"],
  ["/how-we-work", "How We Work"],
  ["/services", "Services"],
  ["/singapore", "Singapore"],
  ["/field-notes", "Field notes"],
  ["/careers", "Careers"],
  ["/contact", "Contact"],
] as const;

/**
 * HP-7 · the regime strip.
 *
 * Was "Operating across RBI · SEBI · MAS TRM · Notice 658 · EU AI Act ·
 * NIS2 · DPDP". Two problems: "operating across" claims presence rather
 * than competence, and the list was shorter than the truth. This is the
 * line from Karan's one-pagers, verbatim and unabridged, which is the
 * claim the firm actually makes: fluency, not jurisdiction.
 *
 * Notice 658 drops out because it is a subset of MAS TRM's world, and
 * UAE PDPL · DESC stays out per todo 1.7 until the UAE work earns a
 * sentence elsewhere on the site. Footers get read by the people who
 * check claims.
 */
const FLUENT_IN = [
  "RBI",
  "SEBI CSCRF",
  "MAS TRM",
  "DPDP",
  "NIS2",
  "EU AI Act",
  "SOC 2",
  "ISO 27001",
  "CERT-In",
];

// Only LinkedIn for now. X and GitHub are off until we have an active
// presence on those channels — better to omit than to link to dead handles.
const SOCIAL = [
  ["LinkedIn", "https://www.linkedin.com/company/birchlogic/"],
] as const;

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--bl-section-veil)",
        color: "var(--bl-fg2)",
        padding: "clamp(80px, 10vw, 120px) var(--bl-page-pad) 40px",
        borderTop: "1px solid var(--bl-rule)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--bl-max-width)",
          margin: "0 auto",
        }}
      >
        <div
          className="bl-footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 56,
            marginBottom: 60,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--bl-fg)",
                marginBottom: 16,
              }}
            >
              Birchlogic
            </div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                lineHeight: 1.65,
                maxWidth: 320,
                margin: 0,
                color: "var(--bl-fg2)",
              }}
            >
              A senior cybersecurity strategic advisory boutique. Founded in
              India. Singapore practice open.
            </p>
          </div>

          <FooterColumn label="Navigation">
            {NAV.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--bl-fg2)",
                  textDecoration: "none",
                  display: "block",
                  marginBottom: 10,
                }}
              >
                {label}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn label="Offices">
            {OFFICES.map((o) => {
              const cityLabel = (
                <span style={{ color: "var(--bl-fg)" }}>{o.city}</span>
              );
              return (
                <div
                  key={o.city}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    marginBottom: 18,
                    color: "var(--bl-fg2)",
                  }}
                >
                  {o.href ? (
                    <Link
                      href={o.href}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {cityLabel}
                    </Link>
                  ) : (
                    cityLabel
                  )}
                  <span
                    style={{
                      display: "block",
                      marginTop: 4,
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: "var(--bl-fg3)",
                      maxWidth: 260,
                    }}
                  >
                    {SHOW_STREET_ADDRESSES ? o.address : o.region}
                  </span>
                </div>
              );
            })}
          </FooterColumn>

          <FooterColumn label="Connect">
            {SOCIAL.map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--bl-fg2)",
                  textDecoration: "none",
                  display: "block",
                  marginBottom: 10,
                }}
              >
                {label}
              </a>
            ))}
            <a
              href="mailto:hi@birchlogic.com"
              style={{
                marginTop: 20,
                display: "inline-block",
                color: "var(--bl-fg3)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.04em",
                textDecoration: "none",
              }}
            >
              hi@birchlogic.com
            </a>
          </FooterColumn>
        </div>

        {/* HP-7 · the fluency strip. Plain text, no links, single
            middle-dot separators. Sits above the copyright row. */}
        <div
          style={{
            borderTop: "1px solid var(--bl-rule)",
            paddingTop: 24,
            paddingBottom: 24,
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 14px",
            alignItems: "baseline",
          }}
        >
          <span className="bl-label" style={{ color: "var(--bl-fg3)" }}>
            Fluent in
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              color: "var(--bl-fg2)",
            }}
          >
            {FLUENT_IN.join(" · ")}
          </span>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--bl-rule)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--bl-fg3)",
              letterSpacing: "0.04em",
            }}
          >
            © Birchlogic, {new Date().getFullYear()}.
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.06em",
              color: "var(--bl-neon)",
            }}
          >
            Cybersecurity, done seriously.
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--bl-fg3)",
              letterSpacing: "0.04em",
            }}
          >
            Delhi · Singapore
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        className="bl-label"
        style={{ color: "var(--bl-fg3)", marginBottom: 20 }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}
