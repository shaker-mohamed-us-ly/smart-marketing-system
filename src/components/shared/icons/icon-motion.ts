export type IconMotion = "none" | "hover-lift" | "soft-breathe" | "signal-pulse" | "tiny-tilt";

export const iconMotionClasses: Record<IconMotion, string> = {
  none: "",
  "hover-lift": "transition-transform hover:-translate-y-1 duration-200",
  "soft-breathe": "animate-breathing",
  "signal-pulse": "animate-subtle-pulse",
  "tiny-tilt": "transition-transform hover:rotate-3 duration-200",
};
