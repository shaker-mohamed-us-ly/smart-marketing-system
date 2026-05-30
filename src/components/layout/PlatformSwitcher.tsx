"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef } from "react";
import { Button } from "@/components/shared/Button";
import { Globe, Cpu, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export interface PlatformSwitcherProps extends HTMLAttributes<HTMLDivElement> {
  currentPlatform?: "client" | "control";
}

const PlatformSwitcher = forwardRef<HTMLDivElement, PlatformSwitcherProps>(
  ({ currentPlatform = "client", className, ...props }, ref) => {
    const t = useTranslations('common');

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center gap-2 p-1 rounded-xl bg-secondary/50 border border-border/60",
          "transition-all duration-300",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "absolute inset-1 rounded-lg transition-all duration-300",
            "bg-gradient-to-br from-indigo-600 to-emerald-500",
            currentPlatform === "control" && "from-blue-600 to-violet-600",
            currentPlatform === "client" ? "left-1 w-[calc(50%-4px)]" : "left-[calc(50%+4px)] w-[calc(50%-4px)]"
          )}
        />
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "relative z-10 gap-2 transition-all duration-300",
            currentPlatform === "client" ? "text-white" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Globe className="h-4 w-4" />
          <span>{t("clientPlatform")}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "relative z-10 gap-2 transition-all duration-300",
            currentPlatform === "control" ? "text-white" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Cpu className="h-4 w-4" />
          <span>{t("controlPlatform")}</span>
        </Button>
      </div>
    );
  }
);

PlatformSwitcher.displayName = "PlatformSwitcher";

export { PlatformSwitcher };
