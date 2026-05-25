"use client";

import { useEffect, useRef, useState } from "react";
import { type Mode, NEON_SWATCHES, useTheme } from "../hooks/useTheme";

/**
 * Top-nav theme switcher.
 *
 * Trigger:  pill button showing the current accent dot + mode glyph
 * Panel:    glass dropdown · Mode segmented control + 4 paint swatches
 *
 * Interaction:
 *  - Click swatch / mode = apply + persist (live preview = same as apply)
 *  - Click outside / Esc = close
 *  - Tab = keyboard navigation
 *
 * State lives in `useTheme()` which persists to localStorage.
 */
export function ThemeSwitcher() {
  const { mode, neon, setMode, setNeon, hydrated } = useTheme();
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
      <Panel
        open={open}
        mode={mode}
        neon={neon}
        onMode={setMode}
        onNeon={setNeon}
      />
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
  neon,
  onMode,
  onNeon,
}: {
  open: boolean;
  mode: Mode;
  neon: string;
  onMode: (m: Mode) => void;
  onNeon: (hex: string) => void;
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
        width: 340,
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
      <Header />

      <SectionLabel>Mode</SectionLabel>
      <ModeSegment value={mode} onChange={onMode} />

      <div style={{ height: 18 }} />

      <SectionLabel>Accent</SectionLabel>
      <SwatchRow active={neon} onPick={onNeon} />

      <Footer />
    </div>
  );
}

function Header() {
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
        Live preview
      </span>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--bl-fg3)",
        marginBottom: 10,
      }}
    >
      {children}
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

function SwatchRow({
  active,
  onPick,
}: {
  active: string;
  onPick: (hex: string) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 10,
      }}
    >
      {NEON_SWATCHES.map((s) => (
        <SwatchTile
          key={s.hex}
          hex={s.hex}
          label={s.label}
          description={s.description}
          active={s.hex.toLowerCase() === active.toLowerCase()}
          onClick={() => onPick(s.hex)}
        />
      ))}
    </div>
  );
}

function SwatchTile({
  hex,
  label,
  description,
  active,
  onClick,
}: {
  hex: string;
  label: string;
  description: string;
  active: boolean;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onPointerEnter={() => setHov(true)}
      onPointerLeave={() => setHov(false)}
      aria-label={`${label} · ${description}`}
      aria-pressed={active}
      title={description}
      style={{
        position: "relative",
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          background: hex,
          borderRadius: 10,
          boxShadow: hov
            ? `0 0 0 1px rgba(255,255,255,0.10), 0 8px 28px ${hex}66, inset 0 0 0 1px rgba(0,0,0,0.06)`
            : "0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(0,0,0,0.06)",
          transform: hov ? "translateY(-2px)" : "translateY(0)",
          transition:
            "transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.25s ease",
        }}
      >
        {active && <ActiveRing />}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: active ? "var(--bl-fg)" : "var(--bl-fg2)",
          letterSpacing: "0.04em",
          textAlign: "center",
          transition: "color 0.2s ease",
        }}
      >
        {label}
      </span>
    </button>
  );
}

function ActiveRing() {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: -5,
        borderRadius: 14,
        border: "1.5px solid var(--bl-fg)",
        pointerEvents: "none",
      }}
    />
  );
}

function Footer() {
  return (
    <div
      style={{
        marginTop: 18,
        paddingTop: 14,
        borderTop: "1px solid var(--bl-rule)",
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        color: "var(--bl-fg3)",
        letterSpacing: "0.04em",
        lineHeight: 1.5,
      }}
    >
      Choices persist locally. Esc to close.
    </div>
  );
}
