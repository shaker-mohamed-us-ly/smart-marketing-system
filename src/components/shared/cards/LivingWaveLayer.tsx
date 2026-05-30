import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

export interface LivingWaveLayerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "subtle" | "medium" | "strong";
}

export function LivingWaveLayer({ 
  variant = "subtle",
  className, 
  ...props 
}: LivingWaveLayerProps) {
  const intensity = {
    subtle: "opacity-20",
    medium: "opacity-30",
    strong: "opacity-40",
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
          "absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent",
          "animate-wave-slow",
          intensity[variant]
        )}
      />
    </div>
  );
}
