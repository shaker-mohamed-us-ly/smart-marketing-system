/**
 * Dashboard V8 Design Tokens (shared TS constants)
 *
 * The full visual system (theme colors, depth, motion) lives in
 * `DashboardV8Motion.module.css` as CSS custom properties so it is fully
 * theme-aware (light = warm off-white, dark = graphite/charcoal).
 *
 * This file only exports the serializable primitives that TSX components need:
 * tone names and icon frame sizes. Per-tone accent colors are resolved in CSS
 * via `[data-tone="..."]` selectors so they adapt to light/dark automatically.
 */

export type V8Tone = "violet" | "emerald" | "amber" | "orange" | "sky" | "slate";

export type V8IconSize = "hero" | "metric" | "panel" | "row" | "channel" | "chip";

export const v8IconSizes: Record<V8IconSize, { frame: number; icon: number }> = {
  hero: { frame: 48, icon: 23 },
  metric: { frame: 44, icon: 21 },
  panel: { frame: 38, icon: 19 },
  row: { frame: 40, icon: 19 },
  channel: { frame: 46, icon: 22 },
  chip: { frame: 30, icon: 15 },
};

export const V8_CANVAS_MAX_WIDTH = 1200;
