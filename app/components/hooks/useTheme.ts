"use client";

import { useCallback, useEffect, useState } from "react";

export type Mode = "dark" | "light";

/**
 * Curated palette · four distinct theme identities × two modes (light/dark).
 * Each swatch defines the single neon accent that drives glow, hover states,
 * active dots, mesh highlights, and CTA fills site-wide.
 *
 *  - Lime     · flagship; modern AI-stack
 *  - Cobalt   · clinical, institutional, financial
 *  - Burgundy · warm, premium, wine-bar luxury
 *  - Bone     · minimalist; no chromatic accent
 *
 * `description` is shown as a one-liner in the theme picker so the user
 * can read intent at a glance.
 */
export const NEON_SWATCHES = [
  {
    hex: "#CDF36C",
    rgb: "205,243,108",
    label: "Lime",
    description: "Modern, technical",
  },
  {
    hex: "#5AA9FF",
    rgb: "90,169,255",
    label: "Cobalt",
    description: "Clinical, institutional",
  },
  {
    hex: "#DA3F62",
    rgb: "218,63,98",
    label: "Burgundy",
    description: "Warm, premium",
  },
  {
    hex: "#EDE9DF",
    rgb: "237,233,223",
    label: "Bone",
    description: "Quiet, monochrome",
  },
] as const;

const STORAGE = { mode: "bl:theme", neon: "bl:neon" };
const DEFAULT_MODE: Mode = "dark";
const DEFAULT_NEON = NEON_SWATCHES[0].hex;

const hexToRgb = (h: string): string => {
  const m = h.replace("#", "").match(/.{2}/g);
  if (!m || m.length < 3) return "205,243,108";
  return m
    .slice(0, 3)
    .map((x) => parseInt(x, 16))
    .join(",");
};

const applyMode = (mode: Mode) => {
  const root = document.documentElement;
  if (mode === "light") root.classList.add("light");
  else root.classList.remove("light");
};

const applyNeon = (hex: string) => {
  const root = document.documentElement;
  const rgb = hexToRgb(hex);
  root.style.setProperty("--bl-neon", hex);
  root.style.setProperty("--bl-neon-rgb", rgb);
};

/**
 * Theme + neon controller. Reads/writes localStorage, mutates :root.
 * Use once at the chrome level (TweaksPanel) to expose controls; the
 * rest of the tree reads tokens via CSS vars.
 */
export function useTheme() {
  const [mode, setModeState] = useState<Mode>(DEFAULT_MODE);
  const [neon, setNeonState] = useState<string>(DEFAULT_NEON);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const m = (localStorage.getItem(STORAGE.mode) as Mode | null) ?? DEFAULT_MODE;
      const n = localStorage.getItem(STORAGE.neon) ?? DEFAULT_NEON;
      setModeState(m);
      setNeonState(n);
      applyMode(m);
      applyNeon(n);
    } catch {
      applyMode(DEFAULT_MODE);
      applyNeon(DEFAULT_NEON);
    }
    setHydrated(true);
  }, []);

  const setMode = useCallback((m: Mode) => {
    setModeState(m);
    applyMode(m);
    try {
      localStorage.setItem(STORAGE.mode, m);
    } catch {}
  }, []);

  const setNeon = useCallback((hex: string) => {
    setNeonState(hex);
    applyNeon(hex);
    try {
      localStorage.setItem(STORAGE.neon, hex);
    } catch {}
  }, []);

  return { mode, neon, setMode, setNeon, hydrated };
}
