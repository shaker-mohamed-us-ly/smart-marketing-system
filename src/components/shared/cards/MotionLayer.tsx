"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, useState } from "react";
import { LivingAuroraLayer } from "./LivingAuroraLayer";
import { LivingShadowLayer } from "./LivingShadowLayer";
import { LivingPulseLayer } from "./LivingPulseLayer";

export type MotionVariant = "none" | "lift" | "aurora" | "pulse" | "cosmic";

export interface MotionLayerProps extends HTMLAttributes<HTMLDivElement> {
  motionVariant?: MotionVariant;
  motionIntensity?: "subtle" | "medium" | "strong";
  // Legacy props for backward compatibility
  lightSweep?: boolean;
  hoverLift?: boolean;
  glow?: boolean;
}

export function MotionLayer({ 
  motionVariant = "none",
  motionIntensity = "subtle",
  lightSweep = false, 
  hoverLift = true, 
  glow = false, 
  className, 
  children, 
  ...props 
}: MotionLayerProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Use legacy props if motionVariant is not explicitly set
  const effectiveVariant = motionVariant;
  
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none transition-all duration-[280ms] ease-out",
        {
          "hover:translate-y-[-6px] hover:shadow-cinematic": (hoverLift && isHovered) || effectiveVariant === "lift",
          "hover:border-primary/40": glow && !isHovered,
          "border-primary/50 shadow-[0_0_30px_rgba(79,70,229,0.2)]": glow && isHovered,
        },
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {effectiveVariant === "aurora" && (
        <LivingAuroraLayer variant={motionIntensity} />
      )}
      {effectiveVariant === "pulse" && (
        <LivingPulseLayer variant={motionIntensity} />
      )}
      {effectiveVariant === "cosmic" && (
        <>
          <LivingAuroraLayer variant={motionIntensity} />
          <LivingShadowLayer variant={motionIntensity} />
        </>
      )}
      {children}
    </div>
  );
}
