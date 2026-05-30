export const colors = {
  background: 'var(--background)',
  foreground: 'var(--foreground)',
  card: 'var(--card)',
  cardForeground: 'var(--card-foreground)',
  primary: 'var(--primary)',
  primaryForeground: 'var(--primary-foreground)',
  secondary: 'var(--secondary)',
  secondaryForeground: 'var(--secondary-foreground)',
  accent: 'var(--accent)',
  accentForeground: 'var(--accent-foreground)',
  muted: 'var(--muted)',
  mutedForeground: 'var(--muted-foreground)',
  border: 'var(--border)',
  input: 'var(--input)',
  ring: 'var(--ring)',
  success: 'var(--success)',
  successForeground: 'var(--success-foreground)',
  warning: 'var(--warning)',
  warningForeground: 'var(--warning-foreground)',
  error: 'var(--error)',
  errorForeground: 'var(--error-foreground)',
  info: 'var(--info)',
  infoForeground: 'var(--info-foreground)',
  // Luxury-Tech Base Colors
  softWhite: 'var(--soft-white)',
  warmNeutral: 'var(--warm-neutral)',
  graphite: 'var(--graphite)',
  premiumGray: 'var(--premium-gray)',
  // Luxury-Tech Accent Colors
  intelligentBlue: 'var(--intelligent-blue)',
  elegantViolet: 'var(--elegant-violet)',
  subtleEmerald: 'var(--subtle-emerald)',
  luxuryCyan: 'var(--luxury-cyan)',
} as const;

export const radius = {
  sm: 'var(--radius-sm)',
  default: 'var(--radius)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  xl: 'var(--radius-xl)',
} as const;

export const shadows = {
  sm: 'var(--shadow-sm)',
  default: 'var(--shadow)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  xl: 'var(--shadow-xl)',
} as const;

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
} as const;

export const motion = {
  duration: {
    fast: '0.15s',
    normal: '0.3s',
    slow: '0.5s',
  },
  easing: {
    easeOut: 'ease-out',
    easeIn: 'ease-in',
    easeInOut: 'ease-in-out',
  },
} as const;

export const typography = {
  scale: {
    xs: '0.75rem',
    sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  },
  weight: {
    normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  },
} as const;

export const platformPersonalities = {
  clientPlatform: {
    primary: colors.primary,
    accent: colors.subtleEmerald,
    gradient: 'from-indigo-600 to-emerald-500',
    feel: 'calm, elegant, premium, beautiful, growth-oriented',
  },
  controlPlatform: {
    primary: colors.intelligentBlue,
    accent: colors.elegantViolet,
    gradient: 'from-blue-600 to-violet-600',
    feel: 'executive, command-center, alive, premium',
  },
  aiCore: {
    primary: colors.elegantViolet,
    accent: colors.luxuryCyan,
    gradient: 'from-violet-600 to-cyan-500',
    feel: 'intelligent, mysterious, subtle, futuristic',
  },
} as const;

export const designTokens = {
  colors,
  radius,
  shadows,
  spacing,
  motion,
  typography,
  platformPersonalities,
} as const;
