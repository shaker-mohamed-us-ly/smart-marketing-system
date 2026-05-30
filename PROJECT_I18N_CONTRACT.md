# PROJECT I18N CONTRACT

## Version
**Version:** 1.0  
**Effective:** 2025-01-15  
**Status:** Active

## Purpose
This contract defines the internationalization (i18n) standards, conventions, and governance for the Smart Marketing System. All developers must adhere to these rules to ensure consistent, maintainable, and high-quality multilingual support.

## Core Principles

1. **No Visible English in Arabic Mode**: All user-facing text must be translated. English is only visible in Arabic mode for allowed terms (brand names, technical terms).
2. **Server-First Translation**: Use server-side translation fetching in Server Components. Pass translations as props to Client Components.
3. **Component Architecture Preservation**: Do NOT convert Server Components to Client Components for i18n purposes.
4. **Performance Preservation**: i18n implementation must not degrade navigation speed or app performance.
5. **Fallback Safety**: All translation keys must have Arabic fallback values if they can appear in Arabic mode.

## Architecture

### Translation System
- **Framework**: next-intl
- **Translation Files**: `src/i18n/messages/en.ts`, `src/i18n/messages/ar.ts`
- **Default Locale**: English (en)
- **Supported Locales**: English (en), Arabic (ar)
- **RTL Support**: Arabic uses RTL (Right-to-Left) text direction

### Server Components
- **Translation Fetching**: Use `getTranslations()` or `createServerTranslator()` from `next-intl/server`
- **Translation Usage**: Directly use the `t()` function
- **Example**:
  ```typescript
  import { getTranslations } from "next-intl/server";
  
  export default async function MyPage() {
    const t = await getTranslations();
    return <h1>{t("myPage.title")}</h1>;
  }
  ```

### Client Components
- **Translation Fetching**: Do NOT fetch translations in Client Components
- **Translation Usage**: Receive translations as props from parent Server Component
- **Example**:
  ```typescript
  // Server Component
  const labels = {
    title: t("myComponent.title"),
    subtitle: t("myComponent.subtitle"),
  };
  return <MyComponent labels={labels} />;
  
  // Client Component
  interface MyComponentProps {
    labels: { title: string; subtitle: string };
  }
  export function MyComponent({ labels }: MyComponentProps) {
    return <h1>{labels.title}</h1>;
  }
  ```

## Translation Key Conventions

### Key Structure
- **Pattern**: `feature.component.key`
- **Examples**:
  - `clientDashboard.title`
  - `controlOverview.hero.subtitle`
  - `common.save`

### Key Naming Rules
- Use camelCase for keys
- Group related keys under a common prefix
- Use descriptive, meaningful names
- Avoid abbreviations (use `campaign` not `cmp`)

### Translation File Structure
```typescript
export default {
  common: {
    save: "Save",
    cancel: "Cancel",
    // ... common keys
  },
  clientDashboard: {
    title: "Dashboard",
    hero: {
      subtitle: "Your brand is evolving beautifully",
    },
    // ... dashboard keys
  },
  // ... other features
};
```

## Allowed English Terms

The following English terms are allowed to appear in Arabic mode:

### Brand Names
- WhatsApp, Instagram, TikTok, Facebook, Google, Meta
- OpenAI, Leonardo, Ideogram, Flux, Kling, Runway
- Nano, Banana

### Technical Terms
- API, ROI, UX, UI, DNA
- DM, CTA, Reels, Ads
- Next.js, React, Node, npm, npx
- lucide, Plex, Sans, Inter

### URLs and Domains
- http, https, www, com, org, io, ai

### Other
- Currency symbols ($, €, £, ¥)
- Percentages (%)
- Numbers and decimals

**Note**: This list is maintained in `scripts/i18n-visible-english-scan.mjs`. Update both the contract and the script when adding new allowed terms.

## Fallback Value Requirements

### When Fallbacks Are Required
- All translation keys used in components that can render in Arabic mode
- Default prop values in Client Components
- Fallback text in conditional rendering

### Fallback Pattern
```typescript
// ✅ Correct - Arabic fallback provided
<span>{labels?.title ?? "العنوان"}</span>

// ❌ Incorrect - English fallback in Arabic mode
<span>{labels?.title ?? "Title"}</span>
```

### Component Default Props
```typescript
// ✅ Correct - Arabic defaults
export function MyComponent({ 
  items = [
    { name: "العنصر الأول", value: 10 },
    { name: "العنصر الثاني", value: 20 },
  ],
  labels,
}: MyComponentProps) {
  // ...
}
```

## Component Integration Patterns

### Pattern 1: Server Component with Labels Object
```typescript
export default async function MyPage() {
  const t = await getTranslations();
  
  const labels = {
    title: t("myPage.title"),
    subtitle: t("myPage.subtitle"),
    action: t("myPage.action"),
  };
  
  return <MyComponent labels={labels} />;
}
```

### Pattern 2: Nested Labels Object
```typescript
const labels = {
  hero: {
    title: t("myPage.hero.title"),
    subtitle: t("myPage.hero.subtitle"),
  },
  metrics: {
    revenue: t("myPage.metrics.revenue"),
    growth: t("myPage.metrics.growth"),
  },
};
```

### Pattern 3: Component with Multiple Sections
```typescript
const analyticsLabels = {
  hero: {
    title: t("clientAnalytics.hero.title"),
    subtitle: t("clientAnalytics.hero.subtitle"),
  },
  performance: {
    title: t("clientAnalytics.performance.title"),
    metrics: t("clientAnalytics.performance.metrics"),
  },
  // ... more sections
};
```

## Arabic Text Guidelines

### Length Constraints
- **Card Titles**: Max 30 characters
- **Card Descriptions**: Max 60 characters
- **Button Labels**: Max 25 characters
- **Navigation Items**: Max 20 characters

### Writing Style
- Use clear, concise Arabic
- Avoid overly formal language
- Use modern terminology
- Maintain consistency across similar UI elements

### RTL Considerations
- Text direction is automatically handled by next-intl
- Ensure layout components support RTL
- Test RTL layout for alignment issues

## Quality Gates

### Pre-Commit Checks
1. Run `npm run build` to verify build passes
2. Run `npx tsc --noEmit` to verify type safety
3. Run `npm run i18n:visible` to detect visible English strings
4. Run `npm run i18n:rendered` to check rendered locale correctness
5. Run `npm run i18n:hydrated` to check hydrated DOM for language violations
6. Run `npm run ui:titles` to check for missing or blank titles
7. Run `npm run i18n:keys` to check for missing translation keys
8. Run `npm run i18n:audit` to verify translation completeness

### Browser QA Checklist
Use `I18N_BROWSER_QA_CHECKLIST.md` for manual visual QA:
1. Switch to Arabic mode
2. Navigate through all routes
3. Check for visible English strings
4. Verify RTL layout correctness
5. Test navigation speed

### Automated Validation
- `scripts/i18n-visible-english-scan.mjs`: Detects visible English strings
- `scripts/i18n-keys-check.mjs`: Checks for missing keys between en.ts and ar.ts
- `scripts/i18n-audit.mjs`: Comprehensive i18n health check

## Development Workflow

### Adding New UI Text
1. Add the English key to `src/i18n/messages/en.ts`
2. Add the Arabic translation to `src/i18n/messages/ar.ts`
3. Use the key in your Server Component with `getTranslations()`
4. If using a Client Component, pass the translation as a prop
5. Run `npm run i18n:visible` to verify no visible English
6. Test in both English and Arabic modes

### Creating New Pages
1. Use the page generator (PHASE 8 - when implemented)
2. Follow the Server Component pattern
3. Add all necessary translation keys
4. Provide Arabic fallback values for defaults
5. Test navigation speed

### Creating New Components
1. Use the component generator (PHASE 8 - when implemented)
2. Define a labels interface for translations
3. Use Arabic defaults for any default props
4. Document required translation keys
5. Test in both locales

## Common Pitfalls

### ❌ DO NOT
- Convert Server Components to Client Components for i18n
- Use `useTranslations` in Server Components
- Use `useLanguage` in Server Components
- Hardcode English strings in components
- Use English fallback values in Arabic mode
- Add runtime QA overlays or performance tracking

### ✅ DO
- Use `getTranslations()` in Server Components
- Pass translations as props to Client Components
- Provide Arabic fallback values
- Keep translation keys descriptive
- Test in both English and Arabic modes
- Run automated checks before committing

## Performance Requirements

### Navigation Speed
- i18n implementation must not slow page navigation
- Translation fetching happens server-side (no client-side overhead)
- Translation files are bundled efficiently by next-intl

### Bundle Size
- Translation files are code-split by locale
- Only the current locale's translations are loaded
- Unused translation keys should be removed

## Governance

### Enforcement
- Pre-commit hooks run i18n checks
- CI/CD pipeline validates i18n compliance
- Code reviews must check i18n implementation

### Updates to This Contract
- Changes require team consensus
- Update version number on changes
- Communicate changes to all developers
- Update related documentation and scripts

## Support and Resources

### Documentation
- `I18N_BROWSER_QA_CHECKLIST.md`: Manual QA checklist
- `I18N_DEVELOPMENT_WORKFLOW.md`: Detailed development guide (PHASE 13)
- `PROJECT_UI_RULES.md`: General UI rules (PHASE 7)

### Scripts
- `npm run i18n:visible`: Scan for visible English strings
- `npm run i18n:keys`: Check for missing translation keys
- `npm run i18n:audit`: Comprehensive i18n audit

### Translation Files
- `src/i18n/messages/en.ts`: English translations
- `src/i18n/messages/ar.ts`: Arabic translations

## Appendix

### Translation Key Examples
```typescript
// Common keys
common.save
common.cancel
common.delete

// Feature-specific keys
clientDashboard.title
clientDashboard.hero.subtitle
controlOverview.systemHealth
clientAnalytics.performanceCommand.title

// Nested keys
clientCampaigns.hero.title
clientCampaigns.modeSelector.smartCampaign
clientCampaigns.productPanel.productName
```

### Component Interface Example
```typescript
interface MyComponentProps extends HTMLAttributes<HTMLDivElement> {
  labels: {
    title: string;
    subtitle: string;
    action: string;
  };
  data?: MyDataType[];
  className?: string;
}
```

---

**Contract Owner**: Development Team  
**Last Updated**: 2025-01-15  
**Next Review**: 2025-07-15
