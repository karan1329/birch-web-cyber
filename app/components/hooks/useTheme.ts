"use client";

import { useCallback, useEffect, useState } from "react";

export type Mode = "dark" | "light";

/**
 * Locked brand combinations · the accent is not independently selectable.
 *
 *   dark   →  lime      (#CDF36C)
 *   light  →  burgundy  (#DA3F62)
 *
 * Two combos, deliberately. The earlier four-swatch picker (Lime / Cobalt /
 * Burgundy / Bone) is gone; the brand is dark + lime on the technical
 * canvas, light + burgundy on the warm canvas.
 */
const COMBO: Record<Mode, { hex: string; rgb: string }> = {
  dark: { hex: "#CDF36C", rgb: "205,243,108" },
  light: { hex: "#DA3F62", rgb: "218,63,98" },
};

const STORAGE_KEY = "bl:theme";
const DEFAULT_MODE: Mode = "dark";

const applyMode = (mode: Mode) => {
  const root = document.documentElement;
  if (mode === "light") root.classList.add("light");
  else root.classList.remove("light");
  const c = COMBO[mode];
  root.style.setProperty("--bl-neon", c.hex);
  root.style.setProperty("--bl-neon-rgb", c.rgb);
};

/**
 * Mode controller. Reads/writes `bl:theme` in localStorage and mutates
 * `:root` with the matching neon CSS vars. Use once at the chrome level
 * (`ThemeSwitcher`) to expose the toggle; everything else reads the
 * tokens via CSS.
 */
export function useTheme() {
  const [mode, setModeState] = useState<Mode>(DEFAULT_MODE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let m = DEFAULT_MODE;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") m = stored;
      // Old releases also wrote `bl:neon`; we no longer use it. Drop it so
      // a stale custom accent does not linger across upgrades.
      localStorage.removeItem("bl:neon");
    } catch {
      /* localStorage blocked · fall through to defaults */
    }
    // One-shot localStorage rehydrate on mount; the cascading-render risk
    // that the react-hooks/set-state-in-effect rule guards against does
    // not apply here — both setters fire exactly once per session.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setModeState(m);
    applyMode(m);
    setHydrated(true);
  }, []);

  const setMode = useCallback((m: Mode) => {
    setModeState(m);
    applyMode(m);
    try {
      localStorage.setItem(STORAGE_KEY, m);
    } catch {}
  }, []);

  return { mode, neon: COMBO[mode].hex, setMode, hydrated };
}
