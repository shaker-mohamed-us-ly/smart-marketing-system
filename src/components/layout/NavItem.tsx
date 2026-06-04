"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import styles from "./AppShell.module.css";

export interface NavItemProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  icon?: LucideIcon;
  label: string;
  active?: boolean;
}

const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ href, icon: Icon, label, active = false, className, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={cn(
          styles.navItem,
          active && styles.navItemActive,
          className
        )}
        {...props}
      >
        {Icon && (
          <span className={styles.navIconFrame}>
            <Icon
              className={styles.navIconGlyph}
              data-active={active ? "true" : undefined}
              style={{ width: 18, height: 18 }}
              strokeWidth={1.75}
            />
          </span>
        )}
        <span>{label}</span>
      </Link>
    );
  }
);

NavItem.displayName = "NavItem";

export { NavItem };
