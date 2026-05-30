import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

export interface LivingPulseLayerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "subtle" | "medium" | "strong";
}

export function LivingPulseLayer({ 
  variant = "subtle",
  className, 
  ...props 
}: LivingPulseLayerProps) {
  const intensity = {
    subtle: "opacity-10",
    medium: "opacity-20",
    strong: "opacity-30",
  };

  return (
    <div
      className={cn(
        "absolute inset-0 rounded-2xl pointer-events-none",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 bg-primary",
          "animate-pulse-slow",
          intensity[variant]
        )}
      />
    </div>
  );
}
