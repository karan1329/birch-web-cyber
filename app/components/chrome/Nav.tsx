"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * HP-11 · nav restructure.
 *
 * Contact leaves the tab list, the top-right button carries it alone as
 * "Contact us".
 *
 * Field Notes came out of the tab list: seven tabs plus a button read as
 * clutter, and Field Notes is the one a first-time reader is least likely
 * to be hunting for. It keeps its footer link and its route.
 *
 * `/start` NOW HAS A TAB. HP-11 specified it stay out of the nav, reachable
 * only from the homepage founder block and the FSO section; Karan reversed
 * that on 2026-08-28 because those two entry points buried it. It sits next
 * to Services, since it is an offer rather than a section.
 *
 * AI Research renders in its own colour, permanently, and is the only
 * coloured item in the nav.
 */
const ITEMS: { href: string; label: string; accent?: boolean }[] = [
  { href: "/how-we-work", label: "How We Work" },
  { href: "/services", label: "Services" },
  { href: "/start", label: "For Startups" },
  { href: "/research", label: "AI Research", accent: true },
  { href: "/careers", label: "Careers" },
  { href: "/about", label: "About Us" },
];

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const f = () => setM(window.innerWidth < 768);
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return m;
}

export function Nav() {
  const path = usePathname();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 50);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 var(--bl-page-pad)",
          height: "var(--bl-nav-h)",
          background: scrolled
            ? "var(--bl-nav-bg-scrolled)"
            : "var(--bl-nav-bg-rest)",
          backdropFilter: scrolled
            ? "blur(12px) saturate(140%)"
            : "blur(8px) saturate(120%)",
          WebkitBackdropFilter: scrolled
            ? "blur(12px) saturate(140%)"
            : "blur(8px) saturate(120%)",
          borderBottom: "1px solid var(--bl-rule)",
          transition:
            "background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--bl-fg)",
            textDecoration: "none",
          }}
        >
          Birchlogic
        </Link>

        {!isMobile && (
          <ul
            style={{
              display: "flex",
              gap: 28,
              listStyle: "none",
              alignItems: "center",
              margin: 0,
              padding: 0,
            }}
          >
            {ITEMS.map((item) => {
              const active = path === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      fontWeight: 500,
                      textDecoration: "none",
                      transition: "color 0.2s, background 0.2s",
                      position: "relative",
                      // The research tab is the one coloured item in the nav
                      // and it now carries the accent as a FILL rather than
                      // as text colour, so it reads at a glance instead of
                      // needing to be noticed. Beige on cranberry is the same
                      // pairing the accent surfaces already use.
                      ...(item.accent
                        ? {
                            color: "var(--bl-ink)",
                            background: "var(--bl-accent)",
                            padding: "6px 12px",
                            borderRadius: 999,
                          }
                        : {
                            color: active
                              ? "var(--bl-accent)"
                              : "var(--bl-fg)",
                          }),
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        <div
          style={{ display: "flex", alignItems: "center", gap: isMobile ? 12 : 18 }}
        >
          {!isMobile && (
            <Link
              href="/contact"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--bl-fg)",
                background: "none",
                border: "none",
                borderBottom: "1px solid var(--bl-rule2)",
                paddingBottom: 2,
                letterSpacing: "0.01em",
                cursor: "pointer",
                transition: "opacity 0.2s",
                textDecoration: "none",
              }}
            >
              Contact us
            </Link>
          )}
          {isMobile && (
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                margin: "-8px",
                color: "var(--bl-fg)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <MenuGlyph open={menuOpen} />
            </button>
          )}
        </div>
      </nav>

      {menuOpen && isMobile && (
        <MobileMenu currentPath={path} onClose={() => setMenuOpen(false)} />
      )}
    </div>
  );
}

/**
 * Hamburger, and a cross when open. The words "Menu" and "Close" were doing
 * the same job in more space, and a text button in a nav bar reads as a link
 * rather than a control.
 */
function MenuGlyph({ open }: { open: boolean }) {
  const line: React.CSSProperties = {
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
  };
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {open ? (
        <>
          <line x1="5" y1="5" x2="15" y2="15" style={line} />
          <line x1="15" y1="5" x2="5" y2="15" style={line} />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="17" y2="6" style={line} />
          <line x1="3" y1="10" x2="17" y2="10" style={line} />
          <line x1="3" y1="14" x2="17" y2="14" style={line} />
        </>
      )}
    </svg>
  );
}

function MobileMenu({
  currentPath,
  onClose,
}: {
  currentPath: string;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--bl-ink)",
        zIndex: 2000,
        display: "flex",
        flexDirection: "column",
        padding: "24px var(--bl-page-pad) 48px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 48,
          height: "var(--bl-nav-h)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--bl-fg)",
          }}
        >
          BIRCHLOGIC
        </span>
        <button
          onClick={onClose}
          aria-label="Close menu"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            margin: "-8px",
            color: "var(--bl-fg)",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <MenuGlyph open />
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(32px, 7vw, 48px)",
              fontWeight: 500,
              // Current page wins. The research tab is permanently accented
              // on desktop, but in the sheet that made TWO rows cranberry at
              // once (the page you are on, plus AI Research), so both read as
              // selected. Current page is the accent here; the research tab
              // keeps its distinction from the chip beside its label instead.
              color:
                currentPath === item.href ? "var(--bl-accent)" : "var(--bl-fg)",
              background: "none",
              border: "none",
              borderBottom: "1px solid var(--bl-rule)",
              padding: "18px 0",
              cursor: "pointer",
              textAlign: "left",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              textDecoration: "none",
            }}
          >
            {item.label}
            {item.accent && currentPath !== item.href && (
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginLeft: 14,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "var(--bl-accent)",
                }}
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
