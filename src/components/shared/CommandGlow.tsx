"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef } from "react";

export interface CommandGlowProps extends HTMLAttributes<HTMLDivElement> {
  intensity?: "subtle" | "medium" | "strong";
  color?: "primary" | "success" | "warning" | "error";
}

const CommandGlow = forwardRef<HTMLDivElement, CommandGlowProps>(
  ({ intensity = "subtle", color = "primary", className, ...props }, ref) => {
    const intensityStyles = {
      subtle: "opacity-30",
      medium: "opacity-50",
      strong: "opacity-70",
    };

    const colorStyles = {
      primary: "bg-primary",
      success: "bg-success",
      warning: "bg-warning",
      error: "bg-error",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "absolute inset-0 rounded-xl blur-xl transition-all duration-500",
          intensityStyles[intensity],
          colorStyles[color],
          "animate-subtle-pulse",
          className
        )}
        {...props}
      />
    );
  }
);

CommandGlow.displayName = "CommandGlow";

export { CommandGlow };
