"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef } from "react";
import { Button } from "./Button";

export interface SmartButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

const SmartButton = forwardRef<HTMLButtonElement, SmartButtonProps>(
  ({ variant = "primary", size = "md", loading = false, children, className, ...props }, ref) => {
    // Map SmartButton variants to the new Button props
    const buttonVariant =
      variant === "danger"
        ? "danger"
        : variant === "success"
          ? "primary"
          : variant === "primary" || variant === "secondary" || variant === "ghost" || variant === "outline"
            ? variant
            : "primary";

    const tone = variant === "success" ? "emerald" : undefined;

    return (
      <Button
        ref={ref}
        variant={buttonVariant}
        size={size}
        tone={tone}
        loading={loading}
        className={cn(className)}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

SmartButton.displayName = "SmartButton";

export { SmartButton };
