"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef } from "react";
import { BrainCircuit } from "lucide-react";

export interface AIThinkingIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  state?: "idle" | "thinking" | "processing" | "complete";
  size?: "sm" | "md" | "lg";
}

const AIThinkingIndicator = forwardRef<HTMLDivElement, AIThinkingIndicatorProps>(
  ({ state = "idle", size = "md", className, ...props }, ref) => {
    const sizeStyles = {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
    };

    const iconSize = {
      sm: 16,
      md: 20,
      lg: 24,
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/10 to-cyan-500/10 border border-border/60",
          sizeStyles[size],
          {
            "animate-subtle-pulse": state === "thinking" || state === "processing",
            "border-primary/30": state === "complete",
          },
          className
        )}
        {...props}
      >
        <BrainCircuit
          size={iconSize[size]}
          className={cn(
            "text-primary transition-all duration-300",
            {
              "animate-subtle-pulse": state === "thinking",
              "text-success": state === "complete",
            }
          )}
        />
        {(state === "thinking" || state === "processing") && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-500/20 animate-subtle-pulse" />
        )}
      </div>
    );
  }
);

AIThinkingIndicator.displayName = "AIThinkingIndicator";

export { AIThinkingIndicator };
