import { cn } from "@/lib/utils/cn";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonTone = "violet" | "emerald" | "amber" | "orange" | "sky" | "slate";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  tone?: ButtonTone;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  iconOnly?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      tone,
      loading = false,
      icon,
      iconPosition = "start",
      iconOnly = false,
      fullWidth = false,
      disabled,
      children,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    // Dev-only warning for icon-only buttons missing aria-label
    if (
      process.env.NODE_ENV === "development" &&
      iconOnly &&
      !ariaLabel &&
      !children
    ) {
      console.warn(
        "[Button] iconOnly buttons must have an aria-label for accessibility."
      );
    }

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        data-tone={tone}
        disabled={isDisabled}
        aria-disabled={isDisabled ? true : undefined}
        aria-busy={loading ? true : undefined}
        aria-label={ariaLabel}
        className={cn(
          "inline-flex items-center justify-center gap-2",
          styles.btn,
          styles[variant],
          styles[size],
          fullWidth && styles.fullWidth,
          iconOnly && styles.iconOnly,
          className
        )}
        {...props}
      >
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        {!iconOnly && icon && iconPosition === "start" && icon}
        {!iconOnly && children}
        {!iconOnly && icon && iconPosition === "end" && icon}
        {iconOnly && icon}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
