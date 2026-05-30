import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

export interface LivingShadowLayerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "subtle" | "medium" | "strong";
}

export function LivingShadowLayer({ 
  variant = "subtle",
  className, 
  ...props 
}: LivingShadowLayerProps) {
  const intensity = {
    subtle: "opacity-20",
    medium: "opacity-40",
    strong: "opacity-60",
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
          "absolute inset-0 shadow-xl",
          "animate-shadow-breathe",
          intensity[variant]
        )}
      />
    </div>
  );
}
