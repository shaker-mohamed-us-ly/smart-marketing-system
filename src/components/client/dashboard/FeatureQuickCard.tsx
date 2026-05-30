"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef } from "react";
import { LucideIcon } from "lucide-react";
import { InteractiveCard } from "@/components/shared/InteractiveCard";
import { AnimatedIcon } from "@/components/shared/AnimatedIcon";
import { SmartButton } from "@/components/shared/SmartButton";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";

export interface FeatureQuickCardProps extends HTMLAttributes<HTMLDivElement> {
  icon: keyof typeof Icons;
  title: string;
  subtitle: string;
  gradient?: string;
  actionLabel?: string;
}

export const FeatureQuickCard = forwardRef<HTMLDivElement, FeatureQuickCardProps>(
  ({ icon: iconName, title, subtitle, gradient = "from-indigo-600 to-emerald-500", actionLabel = "Open", className, ...props }, ref) => {
    const Icon = (Icons as any)[iconName] as LucideIcon;
    return (
      <InteractiveCard ref={ref} depth="subtle" lightSweep className={cn("p-5 group", className)} {...props}>
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 relative overflow-hidden">
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            gradient
          )} />
          <AnimatedIcon icon={Icon} size={28} state="idle" magnetic className="relative z-10" />
        </div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground mb-4">{subtitle}</p>
        <SmartButton variant="ghost" size="sm" className="w-full group-hover:bg-primary/10">
          <span className="flex items-center gap-2">
            {actionLabel}
            <AnimatedIcon icon={ArrowRight} size={14} state="idle" />
          </span>
        </SmartButton>
      </InteractiveCard>
    );
  }
);

FeatureQuickCard.displayName = "FeatureQuickCard";
