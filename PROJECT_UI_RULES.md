# PROJECT UI RULES

## Core UI Development Rules

### Internationalization (i18n) Rules

**MANDATORY:**
- Every new page must support Arabic and English
- No hardcoded user-facing text in components
- Every new route must use translation keys from messages
- Every page must work with both RTL (Arabic) and LTR (English) direction
- All user-facing text must be in `src/i18n/messages/ar.ts` and `src/i18n/messages/en.ts`
- Use Server Components with `getTranslations()` for translation fetching
- Pass translations as props to Client Components
- Do NOT convert Server Components to Client Components for i18n
- Provide Arabic fallback values for default props

**Translation Key Structure:**
- Use dot notation: `common.dashboard`, `theme.lightMode`, `navigation.enterClientPlatform`
- Organize by feature: `common`, `theme`, `navigation`, `home`, etc.
- Add new keys to both `ar.ts` and `en.ts`
- Use camelCase for keys

**Using Translations in Server Components:**
```typescript
import { getTranslations } from "next-intl/server";

export default async function MyPage() {
  const t = await getTranslations();
  return <h1>{t("myPage.title")}</h1>;
}
```

**Using Translations in Client Components:**
```typescript
// Server Component passes translations as props
const labels = {
  title: t("myComponent.title"),
  subtitle: t("myComponent.subtitle"),
};
return <MyComponent labels={labels} />;

// Client Component receives translations
interface MyComponentProps {
  labels: { title: string; subtitle: string };
}
export function MyComponent({ labels }: MyComponentProps) {
  return <h1>{labels.title}</h1>;
}
```

**Language Direction:**
- Arabic: `dir="rtl"` (handled automatically by next-intl)
- English: `dir="ltr"` (handled automatically by next-intl)

**Language Switcher:**
- Use `LanguageSwitcher` component from `@/components/shared/LanguageSwitcher`
- Visual only for now (no backend persistence yet)
- Architecture allows future persistence

**Allowed English Terms:**
- Brand names: WhatsApp, Instagram, TikTok, Facebook, Google, Meta, OpenAI, Leonardo, Ideogram, Flux, Kling, Runway, Nano, Banana
- Technical terms: API, ROI, UX, UI, DNA, DM, CTA, Reels, Ads, Next.js, React, Node, npm, npx, lucide
- See `PROJECT_I18N_CONTRACT.md` for complete list

**Quality Gates:**
- Run `npm run build` to verify build passes
- Run `npx tsc --noEmit` to verify type safety
- Run `npm run i18n:visible` to detect visible English strings
- Run `npm run i18n:rendered` to check rendered locale correctness
- Run `npm run i18n:hydrated` to check hydrated DOM for language violations
- Run `npm run ui:titles` to check for missing or blank titles
- Run `npm run i18n:keys` to check for missing translation keys
- Run `npm run i18n:audit` for comprehensive i18n health check
- See `PROJECT_I18N_CONTRACT.md` for full i18n governance

---

### Theme System Rules

**MANDATORY:**
- Every component must be theme-safe
- Use theme tokens from `@/lib/theme/theme-tokens.ts`
- Do not hardcode colors where possible
- Support both light and dark modes

**Theme Tokens:**
- `--background`: Page background
- `--foreground`: Primary text
- `--card`: Card background
- `--card-border`: Card border
- `--muted`: Muted text
- `--primary`: Primary accent (purple)
- `--primary-soft`: Soft primary background
- `--accent`: Accent color
- `--success`: Success color
- `--warning`: Warning color
- `--danger`: Danger color
- `--glow`: Glow effect
- `--shadow`: Shadow color

**Light Mode (الوضع النهاري):**
- White / soft gray background
- Clean premium cards
- Purple intelligent accents
- Strong readability

**Dark Mode (الوضع الليلي):**
- Deep graphite / dark violet gray (not pure black)
- Soft premium contrast
- No harsh blue
- No cyberpunk
- Elegant luxury night mode

**Theme Toggle:**
- Use `ThemeToggle` component from `@/components/shared/theme/ThemeToggle`
- Wrap app with `ThemeProvider` from `@/components/shared/theme/ThemeProvider`

---

### Card Animation System Rules

**MANDATORY:**
- Every card must use the shared card animation system
- Use `StaticCard` for structure
- Use motion layers for animation only
- Server-first architecture must remain
- Card content remains Server Component
- Only tiny motion layer can be Client Component

**Motion Variants:**
- `"none"`: No animation
- `"lift"`: Subtle hover lift
- `"aurora"`: Living aurora glow (default)
- `"pulse"`: Breathing pulse
- `"cosmic"`: Soft cosmic shimmer

**New Living Card System:**
- `LivingCard`: Main card component
- `LivingAuroraLayer`: Aurora glow effect
- `LivingShadowLayer`: Breathing shadow
- `LivingPulseLayer`: Soft pulse

**Animation Style:**
- Very subtle
- Smooth
- Slow
- Luxury
- Not distracting
- No particles
- No canvas
- No heavy blur
- No heavy JavaScript
- CSS-first motion

**Old Shine Animation:**
- Removed or reduced
- No cheap shine stripe
- No neon chaos

---

### UI Simplification Rules

**MANDATORY:**
- Reduce visual noise
- Reduce too many borders
- Increase spacing
- Make cards calmer
- Make typography clearer
- Keep premium feeling
- Reduce excessive glow
- Improve dark mode contrast
- Keep dashboard alive but not busy

---

### Server-First Architecture Rules

**MANDATORY:**
- All components must be Server Components by default
- Only motion layers can be Client Components
- No unnecessary `"use client"` directives
- Focused hydration strategy
- Zero hydration for content

**Client Components:**
- Only for interactivity (motion, user input)
- Isolate to small components
- Minimize hydration footprint

---

### File Structure Rules

**i18n:**
```
src/i18n/
  config.ts
  server.ts
  client.ts
  messages/
    ar.ts
    en.ts
```

**Theme:**
```
src/components/shared/theme/
  ThemeProvider.tsx
  ThemeToggle.tsx
src/lib/theme/
  theme-tokens.ts
```

**Cards:**
```
src/components/shared/cards/
  StaticCard.tsx
  MotionLayer.tsx
  LivingCard.tsx
  LivingAuroraLayer.tsx
  LivingShadowLayer.tsx
  LivingPulseLayer.tsx
```

---

### Development Workflow

**When Creating a New Page:**
1. Add translation keys to `src/i18n/messages/ar.ts` and `src/i18n/messages/en.ts`
2. Use `getTranslations()` in Server Component to fetch translations
3. Pass translations as props to Client Components
4. Use theme tokens for colors
5. Use `StaticCard` with motion variant
6. Keep component as Server Component
7. Provide Arabic fallback values for default props
8. Test in both light and dark modes
9. Test in both Arabic and English
10. Run `npm run i18n:visible` to verify no visible English

**When Creating a New Component:**
1. Define labels interface for translations
2. Use translation keys for user-facing text
3. Use theme tokens for colors
4. Support both RTL and LTR (automatic with next-intl)
5. Use shared card system if applicable
6. Keep as Server Component unless interactivity needed
7. Provide Arabic defaults for default props

---

### Quality Gates

**Before Committing:**
- Run `npm run build`
- Run `npx tsc --noEmit`
- Run `npm run i18n:visible` to detect visible English strings
- Run `npm run i18n:keys` to check for missing translation keys
- Test in both light and dark modes
- Test in both Arabic and English
- Check for hardcoded text
- Check for hardcoded colors

---

### Forbidden

**DO NOT:**
- Hardcode user-facing text
- Hardcode colors (use theme tokens)
- Add unnecessary `"use client"` directives
- Use particles, canvas, or heavy blur
- Create cyberpunk or neon effects
- Use pure black in dark mode
- Break server-first architecture
- Add backend logic in UI components
- Add authentication in UI components
- Connect real APIs in UI components
- Use heavy animation libraries (Framer Motion, GSAP)
- Use old shine animation (lightSweep) - forbidden
- Convert whole pages to Client Components for small interactions
- Use random icon styles - must use AppIcon
- Make UI changes that reduce page speed

### Strict Rules (V2 Refactor)

**MANDATORY:**
1. No hardcoded visible text - every visible label must have Arabic and English keys
2. Every icon must go through AppIcon or approved icon registry
3. No random icon styles - consistent stroke width, rounded edges, theme-safe colors
4. Every component must be theme-safe
5. Every new page must support RTL and LTR
6. Every card must use shared card system (StaticCard + MotionLayer/LivingCard)
7. Old shine animation is forbidden - use living-card motion variants
8. Server Component by default - only Client Components for interaction or motion
9. No heavy animation libraries - CSS-first motion only
10. No UI change should reduce page speed
11. Do not convert whole pages to Client Components for small interactions
12. Maintain clean imports and modular components

---

### Future Work

**Pending:**
- Language persistence (localStorage, cookies)
- Route-based locale detection
- Full translation of all existing pages
- Advanced theme customization
- More motion variants

---

## Summary

These rules ensure:
- Consistent bilingual support (Arabic/English)
- Consistent theme support (Light/Dark)
- Consistent animation system (Living Cards)
- Server-first architecture
- Premium simplified UI
- Maintainable codebase

**Every developer must follow these rules.**
