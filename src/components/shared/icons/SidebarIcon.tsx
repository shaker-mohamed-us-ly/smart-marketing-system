import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

export interface SidebarIconProps extends HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  active?: boolean;
  size?: number;
}

/**
 * MiniSoft Icon Style for Sidebar (Dub-like)
 * 
 * Premium 28px rounded square icons with:
 * - Inactive: transparent surface, muted glyph
 * - Hover: soft surface, primary glyph
 * - Active: soft colored tile, primary glyph, subtle depth
 * - Container: 28px, radius 10px
 * - Glyph: 15-16px, stroke 1.75px
 * - No heavy glow or gradients
 * - Works in light/dark mode and RTL/LTR
 */
export function SidebarIcon({ 
  icon: Icon, 
  active = false, 
  size = 16,
  className,
  ...props 
}: SidebarIconProps) {
  return (
    <div
      className={cn(
        // Base: 28px rounded square with 10px radius
        "h-[28px] w-[28px] rounded-[10px]",
        "flex items-center justify-center",
        "transition-all duration-[200ms] ease-out",
        // Inactive state: transparent surface
        !active && "bg-transparent",
        // Active state: soft colored tile with subtle depth
        active && "bg-primary/10 shadow-sm",
        className
      )}
      {...props}
    >
      <Icon
        className={cn(
          "transition-all duration-[200ms] ease-out",
          // Stroke width
          "[stroke-width:1.75px]",
          // Rounded caps and joins
          "[stroke-linecap:round]",
          "[stroke-linejoin:round]",
          // Inactive: muted glyph
          !active && "text-muted-foreground",
          // Active: primary glyph
          active && "text-primary"
        )}
        style={{ width: size, height: size }}
      />
    </div>
  );
}
