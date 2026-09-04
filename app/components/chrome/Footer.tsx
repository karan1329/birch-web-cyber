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
        // A shade deeper than the page. It was the same veil every section
        // uses, so the footer read as one more section rather than as the
        // end of the document. The mesh still shows through, just less.
        background: "var(--bl-accent)",
        boxShadow: "none",
        color: "var(--bl-ink2)",
        padding: "var(--bl-section-gap) var(--bl-page-pad) 40px",
        borderTop: "none",
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
                display: "flex",
                alignItems: "center",
                marginBottom: 18,
              }}
            >
              <img src="/birchlogic_light.png" alt="Birchlogic" style={{ height: 40, width: "auto" }} />
            </div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                lineHeight: 1.65,
                maxWidth: 320,
                margin: 0,
                color: "var(--bl-ink2)",
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
                  color: "var(--bl-ink2)",
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
                <span style={{ color: "var(--bl-ink)" }}>{o.city}</span>
              );
              return (
                <div
                  key={o.city}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    marginBottom: 18,
                    color: "var(--bl-ink2)",
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
                      color: "rgba(241, 238, 231, 0.6)",
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
                  color: "var(--bl-ink2)",
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
                color: "rgba(241, 238, 231, 0.6)",
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
            borderTop: "1px solid rgba(241, 238, 231, 0.2)",
            paddingTop: 24,
            paddingBottom: 24,
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 14px",
            alignItems: "baseline",
          }}
        >
          <span className="bl-label" style={{ color: "rgba(241, 238, 231, 0.6)" }}>
            Fluent in
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              color: "var(--bl-ink2)",
            }}
          >
            {FLUENT_IN.join(" · ")}
          </span>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(241, 238, 231, 0.2)",
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
              color: "rgba(241, 238, 231, 0.6)",
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
              color: "var(--bl-paper)",
            }}
          >
            Cybersecurity, done seriously.
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "rgba(241, 238, 231, 0.6)",
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
        style={{ color: "rgba(241, 238, 231, 0.6)", marginBottom: 20 }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}
