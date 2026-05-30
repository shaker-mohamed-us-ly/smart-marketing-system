"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef, useState } from "react";
import { LucideIcon } from "lucide-react";

export interface AnimatedIconProps extends HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  state?: "idle" | "hover" | "active" | "loading" | "alert";
  size?: number;
  magnetic?: boolean;
}

const AnimatedIcon = forwardRef<HTMLDivElement, AnimatedIconProps>(
  ({ icon: Icon, state = "idle", size = 20, magnetic = false, className, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!magnetic) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setTilt({ x: x / 10, y: y / 10 });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setTilt({ x: 0, y: 0 });
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center transition-all duration-[150ms] ease-out",
          {
            "scale-110": state === "active" || (isHovered && state === "idle"),
            "opacity-80": state === "loading",
            "text-error animate-subtle-pulse": state === "alert",
          },
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered && magnetic ? `translate(${tilt.x}px, ${tilt.y}px)` : undefined,
        }}
        {...props}
      >
        <Icon
          size={size}
          className={cn(
            "transition-all duration-[150ms] ease-out",
            {
              "animate-spin": state === "loading",
              "rotate-12": isHovered && state === "idle" && magnetic,
            }
          )}
        />
      </div>
    );
  }
);

AnimatedIcon.displayName = "AnimatedIcon";

export { AnimatedIcon };
