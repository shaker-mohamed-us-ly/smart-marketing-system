import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";
import { IconPalette, iconPalettes } from "./icon-palettes";
import { IconMotion, iconMotionClasses } from "./icon-motion";

export type IconTileSize = "sm" | "md" | "lg" | "xl";

export interface IconTileProps extends HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  palette?: IconPalette;
  size?: IconTileSize;
  motion?: IconMotion;
}

const sizeStyles: Record<IconTileSize, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-14 w-14",
};

const radiusStyles: Record<IconTileSize, string> = {
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-2xl",
};

export function IconTile({
  icon: Icon,
  palette = "violet",
  size = "md",
  motion = "none",
  className,
  ...props
}: IconTileProps) {
  const paletteConfig = iconPalettes[palette];
  const motionClass = iconMotionClasses[motion];

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center",
        sizeStyles[size],
        radiusStyles[size],
        paletteConfig.lightBg,
        paletteConfig.darkBg,
        paletteConfig.iconColor,
        paletteConfig.softShadow,
        paletteConfig.hoverState,
        motionClass,
        "transition-colors duration-200",
        className
      )}
      {...props}
    >
      <Icon className="h-1/2 w-1/2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </div>
  );
}
