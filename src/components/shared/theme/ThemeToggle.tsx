"use client";

import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTranslations } from "next-intl";

export interface ThemeToggleProps extends HTMLAttributes<HTMLDivElement> {
  showLabel?: boolean;
}

export function ThemeToggle({
  showLabel = false,
  className,
  ...props
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations("common");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("flex items-center gap-2", className)} {...props}>
        <button
          type="button"
          disabled
          className="relative h-10 w-10 rounded-full bg-secondary/50 transition-colors flex items-center justify-center"
          aria-label={t("toggleTheme")}
        >
          <Sun className="h-5 w-5 text-foreground" />
        </button>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <button
        type="button"
        onClick={toggleTheme}
        className="relative h-10 w-10 rounded-full bg-secondary/50 hover:bg-secondary transition-colors flex items-center justify-center"
        aria-label={t("toggleTheme")}
      >
        {theme === "light" ? (
          <Sun className="h-5 w-5 text-foreground" />
        ) : (
          <Moon className="h-5 w-5 text-foreground" />
        )}
      </button>

      {showLabel && (
        <span className="text-sm font-medium text-muted-foreground">
          {theme === "light" ? t("lightMode") : t("darkMode")}
        </span>
      )}
    </div>
  );
}