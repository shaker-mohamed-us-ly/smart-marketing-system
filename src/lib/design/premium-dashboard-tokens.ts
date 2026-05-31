/**
 * Premium Dashboard Design Tokens V2
 * Soft Pastel Premium SaaS OS - World-class design proposal
 * 
 * Color Palette:
 * - Page background: #EEF4FA, #F3F7FB
 * - Main surfaces: #FFFFFF, #FCFCFD
 * - Pastel card tints: blue, lavender, mint, peach, cream, pink, soft gray
 * - Accent strokes: blue, violet, emerald, amber, orange, rose
 */

export const premiumColors = {
  // Pastel card tints (softened to 8-14% intensity)
  pastel: {
    blue: '#F2F8FF',
    lavender: '#F6F3FF',
    mint: '#F2FBF6',
    peach: '#FFF3EA',
    cream: '#FFF9E6',
    pink: '#FFF2F8',
    softGray: '#F7F9FC',
  },
  
  // Accent strokes
  blue: '#2F80ED',
  violet: '#7C3AED',
  emerald: '#10B981',
  amber: '#F59E0B',
  orange: '#F97316',
  rose: '#EC4899',
  slate: '#667085',
  
  // Primary accent colors (legacy compatibility - renamed to avoid conflicts)
  emeraldLegacy: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    bg: '#10B981',
    bgLight: 'rgba(16, 185, 129, 0.1)',
    bgSoft: 'rgba(16, 185, 129, 0.05)',
  },
  orangeLegacy: {
    50: '#FFF7ED',
    100: '#FFEDD5',
    400: '#FB923C',
    500: '#F97316',
    600: '#EA580C',
    bg: '#F97316',
    bgLight: 'rgba(249, 115, 22, 0.1)',
    bgSoft: 'rgba(249, 115, 22, 0.05)',
  },
  violetLegacy: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    400: '#A78BFA',
    500: '#7C3AED',
    600: '#6D28D9',
    bg: '#7C3AED',
    bgLight: 'rgba(124, 58, 237, 0.1)',
    bgSoft: 'rgba(124, 58, 237, 0.05)',
  },
  amberLegacy: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    bg: '#F59E0B',
    bgLight: 'rgba(245, 158, 11, 0.1)',
    bgSoft: 'rgba(245, 158, 11, 0.05)',
  },
  
  // Neutral surfaces
  white: '#FFFFFF',
  background: '#EEF4FA',
  backgroundAlt: '#F3F7FB',
  softGray: '#F5F7FA',
  darkSurface: '#0B1020',
  
  // Text colors
  textPrimary: '#1A1D23',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
};

export const iconColorMap = {
  growth: premiumColors.emeraldLegacy,
  success: premiumColors.emeraldLegacy,
  health: premiumColors.emeraldLegacy,
  
  action: premiumColors.orangeLegacy,
  campaign: premiumColors.orangeLegacy,
  urgency: premiumColors.orangeLegacy,
  
  ai: premiumColors.violetLegacy,
  intelligence: premiumColors.violetLegacy,
  premium: premiumColors.violetLegacy,
  brand: premiumColors.violetLegacy,
  
  alert: premiumColors.amberLegacy,
  opportunity: premiumColors.amberLegacy,
  warning: premiumColors.amberLegacy,
  
  neutral: {
    bg: '#6B7280',
    bgLight: 'rgba(107, 114, 128, 0.1)',
    bgSoft: 'rgba(107, 114, 128, 0.05)',
  },
};

export const iconGradients = {
  growth: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  success: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  health: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  
  action: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
  campaign: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
  urgency: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
  
  ai: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
  intelligence: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
  premium: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
  brand: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
  
  alert: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  opportunity: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  warning: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  
  neutral: 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)',
};

export const spacing = {
  cardPadding: '1.25rem', // 20px
  cardPaddingLg: '1.5rem', // 24px
  sectionGap: '1.5rem', // 24px
  gridGap: '1.25rem', // 20px
  iconTile: '2.75rem', // 44px
  iconTileSm: '2.5rem', // 40px
  // V2 additions
  sectionGapV2: '1.5rem', // 24px
  cardGapV2: '1rem', // 16px
  canvasPadding: '1.5rem', // 24px
};

export const borderRadius = {
  card: '1rem', // rounded-xl
  cardLg: '1.25rem', // rounded-2xl
  iconTile: '0.75rem', // rounded-xl
  iconTileLg: '1rem', // rounded-2xl
  // V2 additions
  cardV2: '1.375rem', // rounded-[22px]
  cardV2Lg: '1.5rem', // rounded-[24px]
  iconTileV2: '0.75rem', // rounded-[12px]
};

export const shadows = {
  card: '0 2px 8px 0 rgb(0 0 0 / 0.04), 0 1px 4px 0 rgb(0 0 0 / 0.02)',
  cardHover: '0 4px 12px 0 rgb(0 0 0 / 0.08), 0 2px 6px 0 rgb(0 0 0 / 0.04)',
  cardElevated: '0 8px 16px 0 rgb(0 0 0 / 0.08), 0 4px 8px 0 rgb(0 0 0 / 0.04)',
  // V2 additions
  cardV2: '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px 0 rgb(0 0 0 / 0.02)',
  cardHoverV2: '0 2px 6px 0 rgb(0 0 0 / 0.06), 0 1px 3px 0 rgb(0 0 0 / 0.03)',
};

export const motion = {
  pageEntry: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  cardStagger: '180ms cubic-bezier(0.4, 0, 0.2, 1)',
  hoverLift: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  hoverShadow: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  // V2 additions
  cardRevealV2: '280ms cubic-bezier(0.4, 0, 0.2, 1)',
  buttonHoverV2: '280ms cubic-bezier(0.4, 0, 0.2, 1)',
  buttonClickV2: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
};

export const layout = {
  maxWidth: '1400px',
  heroSplit: '60/40', // Main content / Status panel
  desktopGrid: 3, // 3-column grid for cards
  tabletGrid: 2, // 2-column grid for tablets
  mobileGrid: 1, // 1-column grid for mobile
  // V2 additions
  canvasMaxWidth: '1120px', // Centered canvas
  canvasMaxWidthLg: '1180px', // Larger centered canvas
};
