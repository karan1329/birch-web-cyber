"use client";

import { useEffect, useRef, useState } from "react";
import { type Mode, useTheme } from "../hooks/useTheme";

/**
 * Top-nav theme switcher.
 *
 *   Trigger:  pill button showing the current accent dot + mode glyph
 *   Panel:    glass dropdown with a Dark / Light segmented control
 *
 * The accent (lime in dark, burgundy in light) is locked to the mode — the
 * earlier four-swatch picker is gone. State lives in `useTheme()` and
 * persists to localStorage.
 */
export function ThemeSwitcher() {
  const { mode, setMode, hydrated } = useTheme();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (
        wrapRef.current &&
        !wrapRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Pre-hydration placeholder keeps the nav width stable.
  if (!hydrated) {
    return (
      <div
        aria-hidden="true"
        style={{ width: 86, height: 32, opacity: 0 }}
      />
    );
  }

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <TriggerPill open={open} onClick={() => setOpen((v) => !v)} mode={mode} />
      <Panel open={open} mode={mode} onMode={setMode} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Trigger
// ─────────────────────────────────────────────────────────────────────────

function TriggerPill({
  open,
  onClick,
  mode,
}: {
  open: boolean;
  onClick: () => void;
  mode: Mode;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onPointerEnter={() => setHov(true)}
      onPointerLeave={() => setHov(false)}
      aria-label="Theme"
      aria-haspopup="dialog"
      aria-expanded={open}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 12px 6px 8px",
        background: open || hov ? "var(--bl-ink2)" : "transparent",
        border: `1px solid ${open || hov ? "var(--bl-rule2)" : "var(--bl-rule)"}`,
        borderRadius: 999,
        cursor: "pointer",
        color: "var(--bl-fg)",
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        transition: "background 0.2s ease, border-color 0.2s ease",
        lineHeight: 1,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "var(--bl-neon)",
          boxShadow:
            "0 0 10px rgba(var(--bl-neon-rgb), 0.55), inset 0 0 0 1px rgba(0,0,0,0.06)",
        }}
      />
      <ModeGlyph mode={mode} />
    </button>
  );
}

function ModeGlyph({ mode }: { mode: Mode }) {
  // Half-filled disc · fills clockwise for dark, counter-clockwise for light.
  // No emoji; geometric SVG that matches the editorial aesthetic.
  return (
    <svg
      width={11}
      height={11}
      viewBox="0 0 12 12"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <circle
        cx={6}
        cy={6}
        r={5}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
      />
      <path
        d={
          mode === "dark"
            ? "M6 1 A5 5 0 0 1 6 11 Z"
            : "M6 1 A5 5 0 0 0 6 11 Z"
        }
        fill="currentColor"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Panel
// ─────────────────────────────────────────────────────────────────────────

function Panel({
  open,
  mode,
  onMode,
}: {
  open: boolean;
  mode: Mode;
  onMode: (m: Mode) => void;
}) {
  return (
    <div
      role="dialog"
      aria-label="Theme settings"
      aria-hidden={!open}
      style={{
        position: "absolute",
        right: 0,
        top: "calc(100% + 12px)",
        width: 260,
        maxWidth: "calc(100vw - 32px)",
        background: "var(--bl-nav-bg-scrolled)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        border: "1px solid var(--bl-rule2)",
        borderRadius: 18,
        padding: 18,
        boxShadow:
          "0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.02)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transform: open
          ? "translateY(0) scale(1)"
          : "translateY(-8px) scale(0.96)",
        transformOrigin: "top right",
        transition:
          "opacity 0.18s ease, transform 0.18s cubic-bezier(0.2, 0.7, 0.2, 1)",
        zIndex: 100,
      }}
    >
      <Header mode={mode} />
      <ModeSegment value={mode} onChange={onMode} />
      <PanelFooter />
    </div>
  );
}

function Header({ mode }: { mode: Mode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        marginBottom: 14,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--bl-fg)",
        }}
      >
        Theme
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--bl-fg3)",
          letterSpacing: "0.06em",
        }}
      >
        {mode === "dark" ? "Lime accent" : "Burgundy accent"}
      </span>
    </div>
  );
}

function ModeSegment({
  value,
  onChange,
}: {
  value: Mode;
  onChange: (v: Mode) => void;
}) {
  const options: { value: Mode; label: string }[] = [
    { value: "dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        position: "relative",
        background: "var(--bl-ink)",
        border: "1px solid var(--bl-rule)",
        borderRadius: 999,
        padding: 3,
      }}
    >
      {/* sliding thumb */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 3,
          bottom: 3,
          left: value === "dark" ? 3 : "calc(50% + 0px)",
          width: "calc(50% - 3px)",
          background: "var(--bl-neon)",
          borderRadius: 999,
          transition: "left 0.25s cubic-bezier(0.2, 0.7, 0.2, 1)",
          boxShadow: "0 0 12px rgba(var(--bl-neon-rgb), 0.35)",
        }}
      />
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            style={{
              position: "relative",
              padding: "8px 10px",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.04em",
              background: "transparent",
              color: active ? "var(--bl-ink)" : "var(--bl-fg2)",
              border: "none",
              borderRadius: 999,
              cursor: "pointer",
              transition: "color 0.25s ease",
              zIndex: 1,
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function PanelFooter() {
  return (
    <div
      style={{
        marginTop: 14,
        paddingTop: 12,
        borderTop: "1px solid var(--bl-rule)",
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        color: "var(--bl-fg3)",
        letterSpacing: "0.04em",
        lineHeight: 1.5,
      }}
    >
      Persists locally. Esc to close.
    </div>
  );
}
