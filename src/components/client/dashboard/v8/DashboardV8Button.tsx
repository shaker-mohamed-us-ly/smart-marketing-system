/**
 * Dashboard V8 Button
 *
 * Pure-presentational, CSS-only motion (RSC-safe — no event handlers passed
 * across a client boundary):
 * - primary   → Liquid Sweep
 * - secondary → Aurora Border
 * - mini      → compact tonal control
 *
 * Hover, focus-visible and pressed states are all visible; motion respects
 * prefers-reduced-motion via the CSS module.
 */

import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { V8Tone } from "./DashboardV8Tokens";
import styles from "./DashboardV8Motion.module.css";

export interface DashboardV8ButtonProps {
  variant?: "primary" | "secondary" | "mini";
  children: ReactNode;
  icon?: ReactNode;
  tone?: V8Tone;
  className?: string;
  ariaLabel?: string;
}

export function DashboardV8Button({
  variant = "primary",
  children,
  icon,
  tone = "violet",
  className,
  ariaLabel,
}: DashboardV8ButtonProps) {
  if (variant === "secondary") {
    return (
      <button
        type="button"
        aria-label={ariaLabel}
        className={cn(styles.btn, styles.btnSecondary, className)}
      >
        <span className={styles.aurora} aria-hidden="true" />
        <span className={styles.auroraMask} aria-hidden="true" />
        {icon}
        <span>{children}</span>
      </button>
    );
  }

  if (variant === "mini") {
    return (
      <button
        type="button"
        aria-label={ariaLabel}
        data-tone={tone}
        className={cn(styles.btn, styles.btnMini, className)}
      >
        {icon}
        <span>{children}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={cn(styles.btn, styles.btnPrimary, className)}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}
