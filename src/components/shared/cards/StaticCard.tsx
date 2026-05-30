import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

export interface StaticCardProps extends HTMLAttributes<HTMLDivElement> {
  depth?: "subtle" | "medium" | "deep";
}

export function StaticCard({ depth = "subtle", className, children, ...props }: StaticCardProps) {
  const depthStyles = {
    subtle: "shadow-premium",
    medium: "shadow-elevated",
    deep: "shadow-cinematic",
  };

  return (
    <div
      className={cn(
        "relative rounded-xl bg-card border border-border/60 overflow-hidden",
        depthStyles[depth],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
