"use client";

import {
  type ChangeEvent,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  useId,
  useState,
} from "react";

/**
 * Shared form primitives for /contact and /careers/apply.
 *
 * All fields share one visual language:
 *   - Mono uppercase label above each field
 *   - Dark surface input (ink2) with thin rule border
 *   - Neon border on focus
 *   - 8px radius (slightly softer than the editorial-no-radius rule —
 *     forms benefit from a small tell that the surface is interactive)
 *   - Helper text + inline error rendered in muted mono below the input
 */

type FieldShellProps = {
  label: string;
  htmlFor: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
};

function FieldShell({ label, htmlFor, hint, required, children }: FieldShellProps) {
  return (
    <label htmlFor={htmlFor} style={{ display: "block", width: "100%" }}>
      <span
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--bl-fg3)",
          marginBottom: 8,
        }}
      >
        <span>{label}</span>
        {required && (
          <span aria-hidden="true" style={{ color: "var(--bl-neon)" }}>
            *
          </span>
        )}
      </span>
      {children}
      {hint && (
        <span
          style={{
            display: "block",
            marginTop: 8,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.02em",
            color: "var(--bl-fg3)",
            lineHeight: 1.5,
          }}
        >
          {hint}
        </span>
      )}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  background: "var(--bl-ink2)",
  color: "var(--bl-fg)",
  border: "1px solid var(--bl-rule)",
  borderRadius: 8,
  fontFamily: "var(--font-sans)",
  fontSize: 15,
  lineHeight: 1.5,
  transition: "border-color 0.2s ease, background 0.2s ease",
  outline: "none",
};

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export function TextField({
  label,
  hint,
  required,
  onFocus,
  onBlur,
  ...rest
}: TextFieldProps) {
  const reactId = useId();
  const id = rest.id ?? reactId;
  return (
    <FieldShell label={label} htmlFor={id} hint={hint} required={required}>
      <input
        id={id}
        required={required}
        style={inputStyle}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--bl-neon)";
          e.currentTarget.style.background = "var(--bl-ink3)";
          onFocus?.(e);
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--bl-rule)";
          e.currentTarget.style.background = "var(--bl-ink2)";
          onBlur?.(e);
        }}
        {...rest}
      />
    </FieldShell>
  );
}

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  hint?: string;
};

export function TextArea({
  label,
  hint,
  required,
  rows = 5,
  onFocus,
  onBlur,
  ...rest
}: TextAreaProps) {
  const reactId = useId();
  const id = rest.id ?? reactId;
  return (
    <FieldShell label={label} htmlFor={id} hint={hint} required={required}>
      <textarea
        id={id}
        required={required}
        rows={rows}
        style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--bl-neon)";
          e.currentTarget.style.background = "var(--bl-ink3)";
          onFocus?.(e);
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--bl-rule)";
          e.currentTarget.style.background = "var(--bl-ink2)";
          onBlur?.(e);
        }}
        {...rest}
      />
    </FieldShell>
  );
}

export type RadioOption = { value: string; label: string; sublabel?: string };

type RadioGroupProps = {
  name: string;
  label: string;
  options: RadioOption[];
  defaultValue?: string;
  required?: boolean;
  onChange?: (value: string) => void;
};

export function RadioGroup({
  name,
  label,
  options,
  defaultValue,
  required,
  onChange,
}: RadioGroupProps) {
  const [value, setValue] = useState(defaultValue ?? "");
  function handle(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    onChange?.(e.target.value);
  }
  return (
    <fieldset
      style={{
        border: 0,
        padding: 0,
        margin: 0,
        display: "block",
        width: "100%",
      }}
    >
      <legend
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--bl-fg3)",
          marginBottom: 12,
          padding: 0,
        }}
      >
        <span>{label}</span>
        {required && (
          <span aria-hidden="true" style={{ color: "var(--bl-neon)" }}>
            *
          </span>
        )}
      </legend>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 10,
        }}
      >
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <label
              key={opt.value}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                padding: "14px 16px",
                background: active ? "var(--bl-ink3)" : "var(--bl-ink2)",
                border: `1px solid ${
                  active ? "var(--bl-neon)" : "var(--bl-rule)"
                }`,
                borderRadius: 8,
                cursor: "pointer",
                transition: "border-color 0.2s ease, background 0.2s ease",
              }}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={active}
                onChange={handle}
                required={required}
                style={{
                  appearance: "none",
                  WebkitAppearance: "none",
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  border: `1px solid ${
                    active ? "var(--bl-neon)" : "var(--bl-rule2)"
                  }`,
                  background: active ? "var(--bl-neon)" : "transparent",
                  marginTop: 3,
                  flexShrink: 0,
                  boxShadow: active
                    ? "inset 0 0 0 3px var(--bl-ink3)"
                    : "none",
                  cursor: "pointer",
                  transition: "background 0.2s ease, border-color 0.2s ease",
                }}
              />
              <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "var(--bl-fg)",
                    lineHeight: 1.3,
                  }}
                >
                  {opt.label}
                </span>
                {opt.sublabel && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.02em",
                      color: "var(--bl-fg3)",
                      lineHeight: 1.45,
                    }}
                  >
                    {opt.sublabel}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
