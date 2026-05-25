"use client";

import { useEffect, useRef } from "react";

/**
 * Cloudflare Turnstile widget — privacy-respecting CAPTCHA alternative.
 *
 * On mount, loads `https://challenges.cloudflare.com/turnstile/v0/api.js`
 * (idempotent — won't double-load if already in the document) and calls
 * `window.turnstile.render` against a container ref. The challenge result is
 * delivered via the `onToken` callback; the parent component is expected to
 * stash that token in form state and include it in the submission payload
 * (the server action then verifies the token against Cloudflare).
 *
 * For dev, the site key defaults to Cloudflare's public TEST key
 * `1x00000000000000000000AA`, which always passes. Override with
 * `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in production.
 *
 * Theme: `auto` matches the user's system preference; we override to `dark`
 * or `light` based on whether `<html>` carries the `light` class.
 */

type TurnstileTheme = "auto" | "dark" | "light";

type Props = {
  sitekey: string;
  onToken: (token: string) => void;
  theme?: TurnstileTheme;
};

interface TurnstileGlobal {
  render: (
    el: HTMLElement,
    options: {
      sitekey: string;
      theme?: TurnstileTheme;
      callback: (token: string) => void;
      "error-callback"?: () => void;
      "expired-callback"?: () => void;
    },
  ) => string;
  remove: (id: string) => void;
  reset: (id: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileGlobal;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

function ensureScript(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve();
    if (window.turnstile) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      return;
    }
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    document.head.appendChild(s);
  });
}

export function TurnstileWidget({ sitekey, onToken, theme }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const resolvedTheme: TurnstileTheme =
      theme ??
      (typeof document !== "undefined" &&
      document.documentElement.classList.contains("light")
        ? "light"
        : "dark");

    ensureScript().then(() => {
      if (cancelled || !containerRef.current || !window.turnstile) return;
      try {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey,
          theme: resolvedTheme,
          callback: (token: string) => onToken(token),
          "error-callback": () => onToken(""),
          "expired-callback": () => onToken(""),
        });
      } catch {
        // ignore — Turnstile occasionally double-mounts in dev StrictMode
      }
    });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* widget may have already been torn down */
        }
        widgetIdRef.current = null;
      }
    };
  }, [sitekey, onToken, theme]);

  return <div ref={containerRef} style={{ minHeight: 65 }} />;
}
