"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef, useState } from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { SidebarIcon } from "@/components/shared/icons/SidebarIcon";

export interface NavItemProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  icon?: LucideIcon;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}

const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ href, icon: Icon, label, active = false, collapsed = false, className, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Link
        href={href}
        className={cn(
          "group relative flex items-center gap-2.5 rounded-xl px-5 py-2.5 text-sm font-medium",
          "transition-all duration-[280ms] ease-out",
          {
            "bg-primary/10 text-primary shadow-sm": active,
            "text-muted-foreground hover:bg-secondary/50 hover:text-foreground": !active,
          },
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {Icon && (
          <SidebarIcon 
            icon={Icon} 
            active={active}
            size={16}
            className="relative z-10"
          />
        )}
        {!collapsed && <span className="relative z-10">{label}</span>}
        {active && !collapsed && (
          <div className="ml-auto relative z-10">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
          </div>
        )}
      </Link>
    );
  }
);

NavItem.displayName = "NavItem";

export { NavItem };
