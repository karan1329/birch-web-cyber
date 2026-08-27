"use client";

import { type CSSProperties, type ElementType, type ReactNode } from "react";
import { useInView } from "../hooks/useInView";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  /**
   * Element to render. Defaults to a `div`, but a Rise placed directly
   * inside an `<ol>`/`<ul>` must render the `<li>` itself — an
   * intervening div makes each item its own single-item list, which
   * breaks numbering and makes assistive tech announce "1 of 1" for
   * every row.
   */
  as?: ElementType;
  style?: CSSProperties;
};

/**
 * Single fade-up wrapper for non-headline content. One reveal per
 * Rise · never per-list-item. Use sparingly: aim for a section heading
 * and body sharing one Rise rather than each child getting its own.
 */
export function Rise({
  children,
  delay = 0,
  y = 24,
  duration = 0.9,
  className,
  threshold = 0.14,
  as: Tag = "div",
  style,
}: Props) {
  const [ref, inView] = useInView<HTMLDivElement>(threshold);
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity ${duration}s cubic-bezier(0.2,0.7,0.2,1) ${delay}s, transform ${duration}s cubic-bezier(0.2,0.7,0.2,1) ${delay}s`,
        willChange: "transform, opacity",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
