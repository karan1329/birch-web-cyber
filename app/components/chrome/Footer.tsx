"use client";

import Link from "next/link";

const NAV = [
  ["/", "Home"],
  ["/how-we-work", "How We Work"],
  ["/services", "Services"],
  ["/blog", "Blog"],
  ["/careers", "Careers"],
  ["/contact", "Contact"],
] as const;

type Office = { city: string; country?: string; note?: string };

const OFFICES: Office[] = [
  { city: "Delhi", country: "India" },
  { city: "Singapore", note: "coming soon" },
];

const SOCIAL = [
  ["LinkedIn", "https://www.linkedin.com/in/karan-bhandari-0ab161149/"],
  ["X", "https://x.com/birchlogic"],
  ["GitHub", "https://github.com/birchlogic"],
] as const;

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--bl-ink)",
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
              India. Singapore office coming soon.
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
            {OFFICES.map((o) => (
              <div
                key={o.city}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  marginBottom: 10,
                  color: "var(--bl-fg2)",
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                <span>
                  {o.city}
                  {o.country ? `, ${o.country}` : ""}
                </span>
                {o.note && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.06em",
                      color: "var(--bl-neon)",
                      textTransform: "uppercase",
                    }}
                  >
                    {o.note}
                  </span>
                )}
              </div>
            ))}
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
            Delhi, India · Singapore (coming soon)
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
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--bl-fg3)",
          marginBottom: 20,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}
