/**
 * Dashboard V7.2 Button Component
 * 
 * Animated button system with liquid sweep and aurora border
 * 
 * Responsibilities:
 * - Primary Action Button - Liquid Sweep Button
 * - Secondary Action Button - Aurora Border Button
 * - Mini Action Button for cards
 * - CSS-only motion (no JS mouse handlers)
 * - Reduced motion support
 * - Touch-friendly for mobile
 * 
 * Sources:
 * - Material Design 3 Motion
 * - Microinteractions Toolkit
 * - WCAG Contrast Guidelines
 */

import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { v7ButtonTokens, V7ButtonVariant } from "./DashboardV7Tokens";
import styles from "./DashboardV7Motion.module.css";

export interface DashboardV7ButtonProps {
  variant?: V7ButtonVariant;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export function DashboardV7Button({
  variant = "primary",
  children,
  className,
  onClick,
  disabled = false,
  icon,
  iconPosition = "left",
}: DashboardV7ButtonProps) {
  const tokens = v7ButtonTokens[variant];

  if (variant === "primary") {
    return (
      <div className={cn("relative v7-liquid-sweep-trigger", styles.v7LiquidSweepTrigger)}>
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "relative inline-flex items-center justify-center gap-2",
            "font-semibold text-white",
            "transition-all duration-200",
            styles.v7ButtonPress,
            className
          )}
          style={{
            height: `${tokens.height}px`,
            borderRadius: `${tokens.radius}px`,
            paddingLeft: icon && iconPosition === "left" ? `${tokens.paddingX - 4}px` : `${tokens.paddingX}px`,
            paddingRight: icon && iconPosition === "right" ? `${tokens.paddingX - 4}px` : `${tokens.paddingX}px`,
            fontSize: `${tokens.fontSize}px`,
            background: "linear-gradient(135deg, #2F6BFF 0%, #5B7CFF 100%)",
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          {icon && iconPosition === "left" && icon}
          <span>{children}</span>
          {icon && iconPosition === "right" && icon}
          <div className="v7-liquid-sweep" />
        </button>
      </div>
    );
  }

  if (variant === "secondary") {
    return (
      <div className={cn("relative v7-aurora-border-trigger", styles.v7AuroraBorderTrigger)}>
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "relative inline-flex items-center justify-center gap-2",
            "font-semibold",
            "transition-all duration-200",
            styles.v7ButtonPress,
            className
          )}
          style={{
            height: `${tokens.height}px`,
            borderRadius: `${tokens.radius}px`,
            paddingLeft: icon && iconPosition === "left" ? `${tokens.paddingX - 4}px` : `${tokens.paddingX}px`,
            paddingRight: icon && iconPosition === "right" ? `${tokens.paddingX - 4}px` : `${tokens.paddingX}px`,
            fontSize: `${tokens.fontSize}px`,
            backgroundColor: "white",
            color: "#374151",
            border: "1px solid #E4E7EC",
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          {icon && iconPosition === "left" && icon}
          <span>{children}</span>
          {icon && iconPosition === "right" && icon}
          <div className="v7-aurora-border" />
        </button>
      </div>
    );
  }

  // Mini button
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "font-semibold",
        "transition-all duration-200",
        styles.v7ButtonPress,
        "hover:-translate-y-0.5",
        className
      )}
      style={{
        height: `${tokens.height}px`,
        borderRadius: `${tokens.radius}px`,
        paddingLeft: icon && iconPosition === "left" ? `${tokens.paddingX - 2}px` : `${tokens.paddingX}px`,
        paddingRight: icon && iconPosition === "right" ? `${tokens.paddingX - 2}px` : `${tokens.paddingX}px`,
        fontSize: `${tokens.fontSize}px`,
        backgroundColor: "rgba(148, 163, 184, 0.12)",
        color: "#64748B",
        border: "1px solid rgba(148, 163, 184, 0.2)",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {icon && iconPosition === "left" && icon}
      <span>{children}</span>
      {icon && iconPosition === "right" && icon}
    </button>
  );
}
