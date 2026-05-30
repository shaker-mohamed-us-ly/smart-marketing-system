import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

export interface LivingAuroraLayerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "subtle" | "medium" | "strong";
}

export function LivingAuroraLayer({ 
  variant = "subtle",
  className, 
  ...props 
}: LivingAuroraLayerProps) {
  const intensity = {
    subtle: "opacity-30",
    medium: "opacity-50",
    strong: "opacity-70",
  };

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden rounded-2xl pointer-events-none",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-transparent",
          "animate-aurora-slow",
          intensity[variant]
        )}
      />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-tr from-transparent via-primary/10 to-transparent",
          "animate-aurora-slow-reverse",
          intensity[variant]
        )}
      />
    </div>
  );
}
