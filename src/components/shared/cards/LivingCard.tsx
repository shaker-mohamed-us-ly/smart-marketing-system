import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { LivingAuroraLayer } from "./LivingAuroraLayer";
import { LivingShadowLayer } from "./LivingShadowLayer";
import { LivingPulseLayer } from "./LivingPulseLayer";

export type MotionVariant = "none" | "lift" | "aurora" | "pulse" | "cosmic";

export interface LivingCardProps extends HTMLAttributes<HTMLDivElement> {
  motionVariant?: MotionVariant;
  motionIntensity?: "subtle" | "medium" | "strong";
}

export function LivingCard({ 
  motionVariant = "aurora",
  motionIntensity = "subtle",
  className, 
  children,
  ...props 
}: LivingCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl bg-card border border-card-border",
        "transition-all duration-300",
        motionVariant === "lift" && "hover:-translate-y-1 hover:shadow-lg",
        className
      )}
      {...props}
    >
      {motionVariant === "aurora" && (
        <LivingAuroraLayer variant={motionIntensity} />
      )}
      {motionVariant === "pulse" && (
        <LivingPulseLayer variant={motionIntensity} />
      )}
      {motionVariant === "cosmic" && (
        <>
          <LivingAuroraLayer variant={motionIntensity} />
          <LivingShadowLayer variant={motionIntensity} />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
