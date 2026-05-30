export const themeTokens = {
  light: {
    background: "hsl(0 0% 100%)",
    foreground: "hsl(240 10% 3.9%)",
    card: "hsl(0 0% 100%)",
    "card-border": "hsl(240 5.9% 90%)",
    muted: "hsl(240 4.8% 95.9%)",
    "muted-foreground": "hsl(240 3.8% 46.1%)",
    primary: "hsl(262 83% 58%)",
    "primary-foreground": "hsl(0 0% 100%)",
    "primary-soft": "hsl(262 83% 58% / 0.1)",
    accent: "hsl(262 83% 58%)",
    "accent-foreground": "hsl(0 0% 100%)",
    success: "hsl(142 76% 36%)",
    warning: "hsl(38 92% 50%)",
    danger: "hsl(0 84% 60%)",
    glow: "hsl(262 83% 58% / 0.15)",
    shadow: "hsl(240 5.9% 90% / 0.5)",
  },
  dark: {
    background: "hsl(240 10% 8%)",
    foreground: "hsl(0 0% 98%)",
    card: "hsl(240 10% 12%)",
    "card-border": "hsl(240 5.9% 20%)",
    muted: "hsl(240 5.9% 15%)",
    "muted-foreground": "hsl(240 5% 64.9%)",
    primary: "hsl(262 83% 58%)",
    "primary-foreground": "hsl(0 0% 100%)",
    "primary-soft": "hsl(262 83% 58% / 0.15)",
    accent: "hsl(262 83% 58%)",
    "accent-foreground": "hsl(0 0% 100%)",
    success: "hsl(142 76% 36%)",
    warning: "hsl(38 92% 50%)",
    danger: "hsl(0 84% 60%)",
    glow: "hsl(262 83% 58% / 0.2)",
    shadow: "hsl(0 0% 0% / 0.5)",
  },
};

export const getThemeTokens = (theme: "light" | "dark") => {
  return themeTokens[theme];
};
