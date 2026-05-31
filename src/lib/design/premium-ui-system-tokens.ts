/**
 * Premium UI System Tokens V1
 * Master design system tokens for system-wide rollout
 * 
 * Semantic Color Mapping:
 * - AI / intelligence = violet
 * - Analytics / performance = blue
 * - Health / success / connected = emerald
 * - Campaign / action = orange
 * - Timing / warnings = amber
 * - Risk / urgent = rose
 * - Neutral / inactive = slate
 */

export const premiumSystemColors = {
  // Page Backgrounds
  page: {
    background: '#F3F7FB',
    backgroundAlt: '#EEF4FA',
    elevated: '#F8FBFF',
  },

  // Main Surfaces
  surface: {
    main: '#FFFFFF',
    soft: '#FCFCFD',
    gray: '#F7F9FC',
  },

  // Pastel Surfaces (for card tints)
  pastel: {
    violet: '#F7F4FF',
    blue: '#F4FAFF',
    mint: '#F4FCF8',
    peach: '#FFF5EE',
    cream: '#FFFAEA',
    rose: '#FFF4F8',
    gray: '#F7F9FC',
  },

  // Accent Colors (for icons, borders, buttons)
  accent: {
    violet: '#7C3AED',
    blue: '#2F80ED',
    emerald: '#10B981',
    amber: '#F59E0B',
    orange: '#F97316',
    rose: '#EC4899',
    slate: '#667085',
  },

  // Semantic Color Families
  semantic: {
    // AI / Intelligence
    ai: {
      accent: '#7C3AED',
      surface: '#F7F4FF',
      name: 'violet',
    },
    intelligence: {
      accent: '#7C3AED',
      surface: '#F7F4FF',
      name: 'violet',
    },
    premium: {
      accent: '#7C3AED',
      surface: '#F7F4FF',
      name: 'violet',
    },
    brand: {
      accent: '#7C3AED',
      surface: '#F7F4FF',
      name: 'violet',
    },

    // Analytics / Performance
    analytics: {
      accent: '#2F80ED',
      surface: '#F4FAFF',
      name: 'blue',
    },
    performance: {
      accent: '#2F80ED',
      surface: '#F4FAFF',
      name: 'blue',
    },
    data: {
      accent: '#2F80ED',
      surface: '#F4FAFF',
      name: 'blue',
    },

    // Health / Success / Connected
    health: {
      accent: '#10B981',
      surface: '#F4FCF8',
      name: 'emerald',
    },
    success: {
      accent: '#10B981',
      surface: '#F4FCF8',
      name: 'emerald',
    },
    connected: {
      accent: '#10B981',
      surface: '#F4FCF8',
      name: 'emerald',
    },
    growth: {
      accent: '#10B981',
      surface: '#F4FCF8',
      name: 'emerald',
    },

    // Campaign / Action
    campaign: {
      accent: '#F97316',
      surface: '#FFF5EE',
      name: 'orange',
    },
    action: {
      accent: '#F97316',
      surface: '#FFF5EE',
      name: 'orange',
    },
    urgency: {
      accent: '#F97316',
      surface: '#FFF5EE',
      name: 'orange',
    },

    // Timing / Warnings
    timing: {
      accent: '#F59E0B',
      surface: '#FFFAEA',
      name: 'amber',
    },
    warning: {
      accent: '#F59E0B',
      surface: '#FFFAEA',
      name: 'amber',
    },
    opportunity: {
      accent: '#F59E0B',
      surface: '#FFFAEA',
      name: 'amber',
    },
    alert: {
      accent: '#F59E0B',
      surface: '#FFFAEA',
      name: 'amber',
    },

    // Risk / Urgent
    risk: {
      accent: '#EC4899',
      surface: '#FFF4F8',
      name: 'rose',
    },
    urgent: {
      accent: '#EC4899',
      surface: '#FFF4F8',
      name: 'rose',
    },
    error: {
      accent: '#EC4899',
      surface: '#FFF4F8',
      name: 'rose',
    },

    // Neutral / Inactive
    neutral: {
      accent: '#667085',
      surface: '#F7F9FC',
      name: 'slate',
    },
    inactive: {
      accent: '#667085',
      surface: '#F7F9FC',
      name: 'slate',
    },
    offline: {
      accent: '#667085',
      surface: '#F7F9FC',
      name: 'slate',
    },
  },
};

export const premiumSystemBorders = {
  // Neutral Borders
  neutral: {
    idle: 'rgba(203,213,225,0.57)',
    hover: 'rgba(203,213,225,0.70)',
  },

  // Colored Borders (accent opacity)
  colored: {
    idle: 'rgba(accent, 0.13)',
    hover: 'rgba(accent, 0.22)',
  },

  // Button Borders
  button: {
    secondary: '#E4E7EC',
  },
};

export const premiumSystemShadows = {
  // Card Shadows
  card: {
    base: '0 12px 32px rgba(15, 23, 42, 0.032)',
    hover: '0 16px 42px rgba(15, 23, 42, 0.052)',
  },

  // Panel Shadows
  panel: {
    base: '0 18px 48px rgba(15, 23, 42, 0.035)',
  },

  // Button Shadows
  button: {
    base: 'shadow-md',
    hover: 'shadow-lg',
  },
};

export const premiumSystemRadii = {
  // Card Radii
  card: {
    section: '26px',
    main: '24px',
    mini: '20px',
  },

  // Icon Frame Radii
  icon: {
    frame: '12px',
  },

  // Button Radii
  button: {
    primary: '14px',
    secondary: '14px',
    mini: '12px',
  },
};

export const premiumSystemPadding = {
  // Panel Padding
  panel: {
    main: '24px',
    large: '28px',
  },

  // Card Padding
  card: {
    main: '20px',
    compact: '18px',
    mini: '16px',
  },
};

export const premiumSystemMotion = {
  // Animation Durations
  duration: {
    cardReveal: '260ms',
    cardHover: '180ms',
    buttonHover: '230ms',
    buttonClick: '150ms',
    statusPulse: '2.1s',
  },

  // Easing
  easing: {
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    snappy: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
};

export const premiumSystemIcon = {
  // Icon Sizes
  size: {
    section: '21px',
    card: '19px',
    mini: '15px',
  },

  // Icon Frame Sizes
  frame: {
    large: '42px',
    medium: '38px',
    small: '34px',
  },
};

export const premiumSystemLayout = {
  // Canvas
  canvas: {
    maxWidth: '1180px',
    padding: '24px',
  },

  // Grid Gaps
  grid: {
    main: '24px',
    compact: '16px',
  },

  // Section Gaps
  section: {
    main: '24px',
    compact: '16px',
  },
};
