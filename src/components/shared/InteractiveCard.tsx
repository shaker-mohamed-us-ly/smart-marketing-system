"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef, useState } from "react";

export interface InteractiveCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  depth?: "subtle" | "medium" | "deep";
  lightSweep?: boolean;
}

const InteractiveCard = forwardRef<HTMLDivElement, InteractiveCardProps>(
  ({ glow = false, depth = "subtle", lightSweep = false, className, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const depthStyles = {
      subtle: "shadow-premium",
      medium: "shadow-elevated",
      deep: "shadow-cinematic",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-xl bg-card border border-border/60 overflow-hidden",
          "transition-all duration-[280ms] ease-out",
          depthStyles[depth],
          {
            "hover:translate-y-[-6px] hover:shadow-cinematic": isHovered,
            "hover:border-primary/40": glow && !isHovered,
            "border-primary/50 shadow-[0_0_30px_rgba(79,70,229,0.2)]": glow && isHovered,
          },
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {lightSweep && (
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent",
              "transition-transform duration-[600ms] ease-out",
              isHovered ? "translate-x-[100%]" : "-translate-x-[100%]"
            )}
            style={{
              backgroundSize: "200% 100%",
            }}
          />
        )}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

InteractiveCard.displayName = "InteractiveCard";

export { InteractiveCard };
