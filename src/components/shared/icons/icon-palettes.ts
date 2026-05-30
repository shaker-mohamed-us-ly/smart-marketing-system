export type IconPalette = "orange" | "green" | "violet" | "blue" | "rose" | "amber" | "slate" | "cyan";

export interface IconPaletteConfig {
  lightBg: string;
  darkBg: string;
  iconColor: string;
  softShadow: string;
  hoverState: string;
}

export const iconPalettes: Record<IconPalette, IconPaletteConfig> = {
  orange: {
    lightBg: "bg-orange-100",
    darkBg: "dark:bg-orange-900/30",
    iconColor: "text-orange-600 dark:text-orange-400",
    softShadow: "shadow-orange-100/50 dark:shadow-orange-900/20",
    hoverState: "hover:bg-orange-200 dark:hover:bg-orange-900/50",
  },
  green: {
    lightBg: "bg-emerald-100",
    darkBg: "dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    softShadow: "shadow-emerald-100/50 dark:shadow-emerald-900/20",
    hoverState: "hover:bg-emerald-200 dark:hover:bg-emerald-900/50",
  },
  violet: {
    lightBg: "bg-violet-100",
    darkBg: "dark:bg-violet-900/30",
    iconColor: "text-violet-600 dark:text-violet-400",
    softShadow: "shadow-violet-100/50 dark:shadow-violet-900/20",
    hoverState: "hover:bg-violet-200 dark:hover:bg-violet-900/50",
  },
  blue: {
    lightBg: "bg-blue-100",
    darkBg: "dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    softShadow: "shadow-blue-100/50 dark:shadow-blue-900/20",
    hoverState: "hover:bg-blue-200 dark:hover:bg-blue-900/50",
  },
  rose: {
    lightBg: "bg-rose-100",
    darkBg: "dark:bg-rose-900/30",
    iconColor: "text-rose-600 dark:text-rose-400",
    softShadow: "shadow-rose-100/50 dark:shadow-rose-900/20",
    hoverState: "hover:bg-rose-200 dark:hover:bg-rose-900/50",
  },
  amber: {
    lightBg: "bg-amber-100",
    darkBg: "dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    softShadow: "shadow-amber-100/50 dark:shadow-amber-900/20",
    hoverState: "hover:bg-amber-200 dark:hover:bg-amber-900/50",
  },
  slate: {
    lightBg: "bg-slate-100",
    darkBg: "dark:bg-slate-800/50",
    iconColor: "text-slate-600 dark:text-slate-400",
    softShadow: "shadow-slate-100/50 dark:shadow-slate-800/20",
    hoverState: "hover:bg-slate-200 dark:hover:bg-slate-700/50",
  },
  cyan: {
    lightBg: "bg-cyan-100",
    darkBg: "dark:bg-cyan-900/30",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    softShadow: "shadow-cyan-100/50 dark:shadow-cyan-900/20",
    hoverState: "hover:bg-cyan-200 dark:hover:bg-cyan-900/50",
  },
};
