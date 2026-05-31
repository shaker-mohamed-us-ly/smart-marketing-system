/**
 * Dashboard V7.2 Design Tokens
 * 
 * Single source of visual truth for V7.2 Premium Command Stage
 * 
 * Sources:
 * - Material Design 3 Motion
 * - Adobe Animation in Design Systems
 * - Val Head - Designing Interface Animation
 * - WCAG Contrast Guidelines
 * - Apple Human Interface Guidelines - Layout
 * - Untitled UI Icons
 */

// ============================================
// COLOR TOKENS
// ============================================

export const v7Colors = {
  // Light Mode
  light: {
    route: "#F5F6F8",
    stage: "#F9FAFB",
    panel: "#FFFFFF",
    card: "#FFFFFF",
    elevated: "#FFFFFF",
    border: "rgba(148, 163, 184, 0.25)",
    primary: "#0F172A",
    secondary: "#475569",
    muted: "#64748B",
    // Semantic tones
    emerald: {
      bg: "rgba(16, 185, 129, 0.08)",
      border: "rgba(16, 185, 129, 0.2)",
      text: "#10B981",
    },
    violet: {
      bg: "rgba(139, 92, 246, 0.08)",
      border: "rgba(139, 92, 246, 0.2)",
      text: "#8B5CF6",
    },
    amber: {
      bg: "rgba(245, 158, 11, 0.08)",
      border: "rgba(245, 158, 11, 0.2)",
      text: "#F59E0B",
    },
    orange: {
      bg: "rgba(249, 115, 22, 0.08)",
      border: "rgba(249, 115, 22, 0.2)",
      text: "#F97316",
    },
    blue: {
      bg: "rgba(59, 130, 246, 0.08)",
      border: "rgba(59, 130, 246, 0.2)",
      text: "#3B82F6",
    },
    slate: {
      bg: "rgba(148, 163, 184, 0.08)",
      border: "rgba(148, 163, 184, 0.2)",
      text: "#64748B",
    },
  },
  
  // Dark Mode - Luxury Graphite/Charcoal
  dark: {
    route: "#080A0D",
    stage: "#0D1016",
    panel: "#12161E",
    card: "#181D26",
    elevated: "#202733",
    border: "rgba(255, 255, 255, 0.085)",
    primary: "#F4F6F8",
    secondary: "#C7CED8",
    muted: "#9AA4B2",
    // Semantic tones
    emerald: {
      bg: "rgba(16, 185, 129, 0.12)",
      border: "rgba(16, 185, 129, 0.25)",
      text: "#34D399",
    },
    violet: {
      bg: "rgba(139, 92, 246, 0.12)",
      border: "rgba(139, 92, 246, 0.25)",
      text: "#A78BFA",
    },
    amber: {
      bg: "rgba(245, 158, 11, 0.12)",
      border: "rgba(245, 158, 11, 0.25)",
      text: "#FBBF24",
    },
    orange: {
      bg: "rgba(249, 115, 22, 0.12)",
      border: "rgba(249, 115, 22, 0.25)",
      text: "#FB923C",
    },
    blue: {
      bg: "rgba(59, 130, 246, 0.12)",
      border: "rgba(59, 130, 246, 0.25)",
      text: "#60A5FA",
    },
    slate: {
      bg: "rgba(148, 163, 184, 0.08)",
      border: "rgba(148, 163, 184, 0.15)",
      text: "#94A3B8",
    },
  },
  
  // Button Gradients
  button: {
    primary: {
      light: "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)",
      dark: "linear-gradient(135deg, #2F6BFF 0%, #5B7CFF 100%)",
    },
  },
} as const;

// ============================================
// TYPOGRAPHY SCALE
// ============================================

export const v7Typography = {
  // Desktop
  desktop: {
    heroTitle: {
      fontSize: "36px",
      fontWeight: 800,
      lineHeight: 1.18,
    },
    heroSubtitle: {
      fontSize: "15px",
      fontWeight: 400,
      lineHeight: 1.6,
    },
    sectionTitle: {
      fontSize: "19px",
      fontWeight: 700,
      lineHeight: 1.3,
    },
    cardTitle: {
      fontSize: "15px",
      fontWeight: 700,
      lineHeight: 1.4,
    },
    metricValue: {
      fontSize: "28px",
      fontWeight: 800,
      lineHeight: 1.2,
    },
    body: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: 1.6,
    },
    caption: {
      fontSize: "13px",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    chip: {
      fontSize: "12px",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    button: {
      fontSize: "14px",
      fontWeight: 700,
      lineHeight: 1.4,
    },
  },
  
  // Mobile
  mobile: {
    heroTitle: {
      fontSize: "28px",
      fontWeight: 800,
      lineHeight: 1.2,
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: 700,
      lineHeight: 1.3,
    },
    body: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: 1.6,
    },
    button: {
      fontSize: "14px",
      fontWeight: 700,
      lineHeight: 1.4,
    },
  },
} as const;

// ============================================
// RADIUS SCALE
// ============================================

export const v7Radius = {
  stage: 34,
  panel: 28,
  card: 22,
  button: 16,
  iconFrame: 12,
  chip: 8,
} as const;

// ============================================
// SHADOW / DEPTH SCALE
// ============================================

export const v7Shadows = {
  light: {
    panel: "0 18px 48px rgba(15, 23, 42, 0.055)",
    card: "0 8px 24px rgba(15, 23, 42, 0.035)",
    button: "0 4px 12px rgba(15, 23, 42, 0.08)",
  },
  dark: {
    // Dark mode uses border + inner highlight instead of heavy shadows
    panel: "0 4px 24px rgba(0, 0, 0, 0.2)",
    card: "0 2px 12px rgba(0, 0, 0, 0.15)",
    button: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
} as const;

// ============================================
// SPACING SCALE
// ============================================

export const v7Spacing = {
  stage: {
    desktop: 24,
    mobile: 16,
  },
  panel: {
    desktop: 22,
    mobile: 18,
  },
  card: {
    desktop: 18,
    mobile: 16,
  },
  gap: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  },
} as const;

// ============================================
// MOTION TOKENS
// ============================================

export const v7Motion = {
  // Durations (Material Design 3)
  duration: {
    press: 140,
    hover: 200,
    reveal: 260,
    status: 2100,
  },
  
  // Easing (Material Design 3)
  easing: {
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    enter: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    press: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  
  // Stagger delays
  stagger: {
    fast: 40,
    normal: 50,
    slow: 60,
  },
} as const;

// ============================================
// SEMANTIC TONE MAP
// ============================================

export type V7Tone = "emerald" | "violet" | "amber" | "orange" | "blue" | "slate";

export const v7ToneMap: Record<V7Tone, {
  bgLight: string;
  bgDark: string;
  borderLight: string;
  borderDark: string;
  textLight: string;
  textDark: string;
}> = {
  emerald: {
    bgLight: v7Colors.light.emerald.bg,
    bgDark: v7Colors.dark.emerald.bg,
    borderLight: v7Colors.light.emerald.border,
    borderDark: v7Colors.dark.emerald.border,
    textLight: v7Colors.light.emerald.text,
    textDark: v7Colors.dark.emerald.text,
  },
  violet: {
    bgLight: v7Colors.light.violet.bg,
    bgDark: v7Colors.dark.violet.bg,
    borderLight: v7Colors.light.violet.border,
    borderDark: v7Colors.dark.violet.border,
    textLight: v7Colors.light.violet.text,
    textDark: v7Colors.dark.violet.text,
  },
  amber: {
    bgLight: v7Colors.light.amber.bg,
    bgDark: v7Colors.dark.amber.bg,
    borderLight: v7Colors.light.amber.border,
    borderDark: v7Colors.dark.amber.border,
    textLight: v7Colors.light.amber.text,
    textDark: v7Colors.dark.amber.text,
  },
  orange: {
    bgLight: v7Colors.light.orange.bg,
    bgDark: v7Colors.dark.orange.bg,
    borderLight: v7Colors.light.orange.border,
    borderDark: v7Colors.dark.orange.border,
    textLight: v7Colors.light.orange.text,
    textDark: v7Colors.dark.orange.text,
  },
  blue: {
    bgLight: v7Colors.light.blue.bg,
    bgDark: v7Colors.dark.blue.bg,
    borderLight: v7Colors.light.blue.border,
    borderDark: v7Colors.dark.blue.border,
    textLight: v7Colors.light.blue.text,
    textDark: v7Colors.dark.blue.text,
  },
  slate: {
    bgLight: v7Colors.light.slate.bg,
    bgDark: v7Colors.dark.slate.bg,
    borderLight: v7Colors.light.slate.border,
    borderDark: v7Colors.dark.slate.border,
    textLight: v7Colors.light.slate.text,
    textDark: v7Colors.dark.slate.text,
  },
};

// ============================================
// ICON SIZE MAP
// ============================================

export type V7IconSize = "hero" | "metric" | "ops" | "channel" | "button" | "status";

export const v7IconSizes: Record<V7IconSize, { frame: number; icon: number }> = {
  hero: { frame: 46, icon: 22 },
  metric: { frame: 42, icon: 20 },
  ops: { frame: 40, icon: 18 },
  channel: { frame: 44, icon: 20 },
  button: { frame: 32, icon: 16 },
  status: { frame: 10, icon: 5 },
};

// ============================================
// BUTTON VARIANT TOKENS
// ============================================

export type V7ButtonVariant = "primary" | "secondary" | "mini";

export const v7ButtonTokens: Record<V7ButtonVariant, {
  height: number;
  radius: number;
  paddingX: number;
  fontSize: number;
}> = {
  primary: {
    height: 46,
    radius: 16,
    paddingX: 20,
    fontSize: 14,
  },
  secondary: {
    height: 46,
    radius: 16,
    paddingX: 20,
    fontSize: 14,
  },
  mini: {
    height: 34,
    radius: 12,
    paddingX: 14,
    fontSize: 13,
  },
};

// ============================================
// LAYOUT PROPORTIONS
// ============================================

export const v7Layout = {
  stage: {
    maxWidth: 1220, // Centered canvas width
    maxWidthMobile: "100%",
  },
  workbench: {
    // Test 7/5 and 8/4 ratios
    commandBoardCols: 7, // Primary
    decisionRailCols: 5, // Supporting
    gap: 18,
  },
  hero: {
    height: 190,
    minHeight: 170,
  },
  signalStrip: {
    cardHeight: 135,
    gap: 16,
  },
  channelMatrix: {
    cardHeight: 110,
    gap: 16,
  },
} as const;
