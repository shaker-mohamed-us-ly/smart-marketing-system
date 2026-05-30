import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";
import { IconPalette, iconPalettes } from "./icon-palettes";
import { IconMotion, iconMotionClasses } from "./icon-motion";

export type AppIconSize = "xs" | "sm" | "md" | "lg";
export type AppIconColor = "muted" | "active" | "primary" | "success" | "warning" | "danger" | IconPalette;
export type AppIconMotion = "none" | "hover-lift" | "soft-pulse" | "signal-breathe" | IconMotion;

const sizeStyles: Record<AppIconSize, string> = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const colorStyles: Record<Exclude<AppIconColor, IconPalette>, string> = {
  muted: "text-muted-foreground",
  active: "text-foreground",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

const motionStyles: Record<string, string> = {
  none: "",
  "hover-lift": "transition-transform hover:-translate-y-0.5",
  "soft-pulse": "animate-subtle-pulse",
  "signal-breathe": "animate-breathing",
};

export interface AppIconProps extends HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  size?: AppIconSize;
  color?: AppIconColor;
  motion?: AppIconMotion;
}

export function AppIcon({
  icon: Icon,
  size = "md",
  color = "muted",
  motion = "none",
  className,
  ...props
}: AppIconProps) {
  const isPalette = color in iconPalettes;
  const paletteConfig = isPalette ? iconPalettes[color as IconPalette] : null;
  const motionClass = isPalette && motion in iconMotionClasses 
    ? iconMotionClasses[motion as IconMotion]
    : motionStyles[motion as Exclude<AppIconMotion, IconMotion>];

  const colorClass = isPalette 
    ? paletteConfig!.iconColor 
    : colorStyles[color as Exclude<AppIconColor, IconPalette>];

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center",
        sizeStyles[size],
        colorClass,
        motionClass,
        className
      )}
      {...props}
    >
      <Icon className="h-full w-full" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </div>
  );
}
