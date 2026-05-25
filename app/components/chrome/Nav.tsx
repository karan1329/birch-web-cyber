"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";

const ITEMS: { href: string; label: string }[] = [
  { href: "/how-we-work", label: "How We Work" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
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
                      color: active ? "var(--bl-neon)" : "var(--bl-fg)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      position: "relative",
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
          <ThemeSwitcher />
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
              Book a call
            </Link>
          )}
          {isMobile && (
            <button
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--bl-fg)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {menuOpen ? "Close" : "Menu"}
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
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--bl-fg3)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          Close
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
              color: currentPath === item.href ? "var(--bl-neon)" : "var(--bl-fg)",
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
          </Link>
        ))}
      </div>
    </div>
  );
}
