"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, useState } from "react";

export interface HoverGlowProps extends HTMLAttributes<HTMLDivElement> {
  color?: "primary" | "emerald" | "blue" | "amber" | "rose";
}

export function HoverGlow({ color = "primary", className, ...props }: HoverGlowProps) {
  const [isHovered, setIsHovered] = useState(false);

  const colorStyles = {
    primary: "border-primary/50 shadow-[0_0_30px_rgba(79,70,229,0.2)]",
    emerald: "border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]",
    blue: "border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.2)]",
    amber: "border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.2)]",
    rose: "border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.2)]",
  };

  return (
    <div
      className={cn(
        "absolute inset-0 rounded-xl border transition-all duration-[280ms] ease-out pointer-events-none",
        colorStyles[color],
        isHovered ? "opacity-100" : "opacity-0",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    />
  );
}
