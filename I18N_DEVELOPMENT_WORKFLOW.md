# I18N Development Workflow

## Version
**Version:** 1.0  
**Effective:** 2025-01-15  
**Status:** Active

## Purpose
This document provides a detailed workflow for developers to follow when implementing internationalization (i18n) in the Smart Marketing System. It complements the `PROJECT_I18N_CONTRACT.md` by providing step-by-step guidance for common i18n tasks.

## Quick Reference

| Task | Command | Script |
|------|---------|--------|
| Generate new page | `npm run i18n:generate:page` | `scripts/generate-i18n-page.mjs` |
| Generate new component | `npm run i18n:generate:component` | `scripts/generate-i18n-component.mjs` |
| Check for visible English | `npm run i18n:visible` | `scripts/i18n-visible-english-scan.mjs` |
| Check translation keys | `npm run i18n:keys` | `scripts/i18n-keys-check.mjs` |
| Check title integrity | `npm run ui:titles` | `scripts/ui-title-integrity-check.mjs` |
| Check hydrated DOM | `npm run i18n:hydrated` | `scripts/i18n-hydrated-dom-check.mjs` |
| Comprehensive audit | `npm run i18n:audit` | `scripts/i18n-audit.mjs` |

## I18n Check Scripts

### i18n:hydrated - Hydrated DOM Language Check
Checks the rendered DOM for language violations after hydration:
- Detects English text in Arabic mode (with smart allowlist/blocklist)
- Detects Arabic text in English mode
- Uses allowlist for brand names, technical terms, APIs, platforms
- Uses blocklist for user-reported strings that must never appear
- Skips hashtags, URLs, color codes, and translation key artifacts
- **Must pass before committing**

### ui:titles - Title Integrity Check
Checks for missing or blank titles in rendered UI:
- Detects empty headings (h1-h6)
- Detects empty card titles
- Detects placeholder titles (e.g., "title", "untitled")
- Detects raw translation keys in titles
- Detects integration cards missing titles
- Skips visually-hidden elements
- **Must pass before committing**

## Workflow 1: Creating a New Page

### Step 1: Use the Page Generator
```bash
npm run i18n:generate:page
```

The generator will prompt for:
- Platform (client/control)
- Page name (kebab-case)
- Page title (English)
- Page title (Arabic)
- Page subtitle (English, optional)
- Page subtitle (Arabic, optional)

### Step 2: Review Generated Files
The generator creates:
- Page file: `src/app/{platform}/{page-name}/page.tsx`
- Translation keys in `src/i18n/messages/en.ts`
- Translation keys in `src/i18n/messages/ar.ts`

### Step 3: Customize Page Content
Edit the generated page to add your content:
- Add components and layout
- Add additional translation keys as needed
- Follow Server Component pattern
- Use `getTranslations()` for translation fetching

### Step 4: Add Translation Keys
For any new text you add:
1. Add key to `src/i18n/messages/en.ts`
2. Add key to `src/i18n/messages/ar.ts`
3. Use the key in your page with `t("key.path")`

### Step 5: Test
```bash
# Run i18n checks
npm run i18n:visible
npm run i18n:keys

# Test in browser
npm run dev
```

### Step 6: Manual QA
- Switch to Arabic mode
- Verify all text is translated
- Check RTL layout
- Verify navigation speed

## Workflow 2: Creating a New Component

### Step 1: Use the Component Generator
```bash
npm run i18n:generate:component
```

The generator will prompt for:
- Platform (client/control/shared)
- Category (e.g., dashboard, analytics)
- Component name (PascalCase)
- Component title/label (English)
- Component title/label (Arabic)

### Step 2: Review Generated Component
The generator creates:
- Component file: `src/components/{platform}/{category}/{ComponentName}.tsx`
- Translation keys in `src/i18n/messages/en.ts`
- Translation keys in `src/i18n/messages/ar.ts`

### Step 3: Customize Component
Edit the generated component:
- Add your component logic
- Add additional translation keys as needed
- Define labels interface for translations
- Provide Arabic defaults for default props

### Step 4: Use Component in Page
```typescript
// In your Server Component page
const labels = {
  myComponent: {
    title: t("myCategory.myComponent.title"),
    subtitle: t("myCategory.myComponent.subtitle"),
  },
};

return <MyComponent labels={labels.myComponent} />;
```

### Step 5: Test
```bash
# Run i18n checks
npm run i18n:visible
npm run i18n:keys

# Test in browser
npm run dev
```

## Workflow 3: Adding Translation Keys to Existing Code

### Step 1: Identify Hardcoded Text
Find hardcoded English strings in your component or page.

### Step 2: Add Translation Keys
Add keys to both message files:

**src/i18n/messages/en.ts:**
```typescript
myFeature: {
  myKey: "English text",
  anotherKey: "Another English text",
},
```

**src/i18n/messages/ar.ts:**
```typescript
myFeature: {
  myKey: "النص العربي",
  anotherKey: "نص عربي آخر",
},
```

### Step 3: Replace Hardcoded Text
In Server Components:
```typescript
const t = await getTranslations();
const text = t("myFeature.myKey");
```

In Client Components (receive as prop):
```typescript
// Server Component passes
const labels = {
  myKey: t("myFeature.myKey"),
};
return <MyComponent labels={labels} />;

// Client Component receives
interface Props {
  labels: { myKey: string };
}
export function MyComponent({ labels }: Props) {
  return <span>{labels.myKey}</span>;
}
```

### Step 4: Update Fallback Values
For default props, use Arabic fallbacks:
```typescript
export function MyComponent({ 
  items = [
    { name: "العنصر الأول", value: 10 },
  ],
  labels,
}: Props) {
  const l = labels || {
    title: "العنوان",
  };
  // ...
}
```

### Step 5: Test
```bash
npm run i18n:visible
npm run i18n:keys
```

## Workflow 4: Fixing Visible English Strings

### Step 1: Run Visible English Scan
```bash
npm run i18n:visible
```

### Step 2: Review Output
The scan will show:
- Files with visible English strings
- Line numbers
- Context around the string

### Step 3: Fix Each Issue
For each visible English string:
1. Add translation key to both message files
2. Replace hardcoded string with translation key
3. Update fallback values to use Arabic

### Step 4: Verify Fix
```bash
npm run i18n:visible
```

### Step 5: Test in Browser
- Switch to Arabic mode
- Navigate to the page
- Verify no visible English

## Workflow 5: Fixing Translation Key Inconsistencies

### Step 1: Run Key Check
```bash
npm run i18n:keys
```

### Step 2: Review Output
The check will show:
- Keys missing in Arabic
- Keys missing in English
- Keys used in code but missing from message files

### Step 3: Add Missing Keys
For each missing key:
1. Add to `src/i18n/messages/en.ts`
2. Add to `src/i18n/messages/ar.ts`
3. Ensure consistent key structure

### Step 4: Verify Fix
```bash
npm run i18n:keys
```

## Workflow 6: Pre-Commit Checklist

Before committing any code, ensure:

### Code Quality
- [ ] Code follows TypeScript best practices
- [ ] No console.log statements
- [ ] No commented-out code
- [ ] Proper error handling

### Build & Type Safety
- [ ] `npm run build` passes
- [ ] `npx tsc --noEmit` passes

### i18n Compliance
- [ ] `npm run i18n:visible` passes
- [ ] `npm run i18n:rendered` passes
- [ ] `npm run i18n:hydrated` passes
- [ ] `npm run ui:titles` passes (checks for empty/placeholder titles)
- [ ] `npm run i18n:keys` passes
- [ ] `npm run i18n:audit` passes
- [ ] All user-facing text uses translation keys
- [ ] Arabic fallback values provided for defaults
- [ ] No hardcoded English strings
- [ ] No empty or missing card titles
- [ ] No placeholder titles (e.g., "title", "untitled")
- [ ] No blocklisted strings in Arabic mode

### Testing
- [ ] Tested in English mode
- [ ] Tested in Arabic mode
- [ ] RTL layout verified
- [ ] Navigation speed verified
- [ ] No console errors

### Documentation
- [ ] Translation keys documented if complex
- [ ] Component props documented if complex

## Workflow 7: Code Review Checklist

When reviewing code with i18n changes:

### Server Components
- [ ] Uses `getTranslations()` or `createServerTranslator()`
- [ ] Does NOT use `useTranslations` or `useLanguage`
- [ ] Passes translations as props to Client Components
- [ ] Translation keys follow naming convention

### Client Components
- [ ] Receives translations as props
- [ ] Does NOT fetch translations internally
- [ ] Has labels interface defined
- [ ] Uses Arabic fallback values for defaults

### Translation Files
- [ ] Keys added to both `en.ts` and `ar.ts`
- [ ] Keys follow naming convention
- [ ] Arabic translations are accurate
- [ ] No orphaned keys

### Architecture
- [ ] Server Components not converted to Client Components
- [ ] No unnecessary `"use client"` directives
- [ ] Navigation performance preserved

## Common Patterns

### Pattern 1: Simple Label
```typescript
// Server Component
const t = await getTranslations();
const label = t("myFeature.label");

// Usage
<span>{label}</span>
```

### Pattern 2: Nested Labels Object
```typescript
// Server Component
const t = await getTranslations();
const labels = {
  hero: {
    title: t("myFeature.hero.title"),
    subtitle: t("myFeature.hero.subtitle"),
  },
  metrics: {
    revenue: t("myFeature.metrics.revenue"),
  },
};

// Usage in Client Component
<MyComponent labels={labels} />
```

### Pattern 3: Conditional Translation
```typescript
const t = await getTranslations();
const message = isActive 
  ? t("myFeature.activeMessage")
  : t("myFeature.inactiveMessage");
```

### Pattern 4: Array with Translations
```typescript
const t = await getTranslations();
const items = [
  { name: t("myFeature.item1"), value: 10 },
  { name: t("myFeature.item2"), value: 20 },
];
```

### Pattern 5: Dynamic Key
```typescript
const t = await getTranslations();
const key = `myFeature.status.${status}`;
const statusLabel = t(key);
```

## Troubleshooting

### Issue: Translation Key Not Working
**Symptoms**: Key name appears instead of translation

**Solutions**:
1. Check key exists in both `en.ts` and `ar.ts`
2. Verify key path is correct
3. Check for typos in key name
4. Run `npm run i18n:keys` to verify

### Issue: Visible English in Arabic Mode
**Symptoms**: English text visible when language is Arabic

**Solutions**:
1. Run `npm run i18n:visible` to find issues
2. Check fallback values use Arabic
3. Verify default props use Arabic
4. Check for hardcoded strings

### Issue: RTL Layout Broken
**Symptoms**: Layout incorrect in Arabic mode

**Solutions**:
1. Verify next-intl is handling direction automatically
2. Check layout components support RTL
3. Test with different content lengths
4. Use flexbox/grid for RTL-safe layouts

### Issue: Navigation Slow After i18n Changes
**Symptoms**: Page navigation slower after adding translations

**Solutions**:
1. Verify Server Components not converted to Client Components
2. Check translation fetching is server-side
3. Verify no unnecessary client-side hydration
4. Check bundle size impact

## Best Practices

### DO
- Use Server Components with `getTranslations()`
- Pass translations as props to Client Components
- Provide Arabic fallback values
- Use descriptive translation key names
- Test in both English and Arabic
- Run i18n checks before committing
- Keep translation keys organized by feature

### DON'T
- Convert Server Components to Client Components for i18n
- Use `useTranslations` in Server Components
- Use `useLanguage` in Server Components
- Hardcode user-facing text
- Use English fallback values in Arabic mode
- Skip i18n checks
- Create orphaned translation keys

## Translation Key Naming Convention

### Structure
```
{feature}.{component}.{key}
```

### Examples
- `clientDashboard.title`
- `controlOverview.hero.subtitle`
- `common.save`
- `clientAnalytics.performanceMetrics.revenue`

### Guidelines
- Use camelCase for keys
- Group related keys under feature prefix
- Use descriptive names
- Avoid abbreviations
- Keep key depth reasonable (max 3-4 levels)

## Arabic Text Guidelines

### Length Constraints
- Card titles: Max 30 characters
- Card descriptions: Max 60 characters
- Button labels: Max 25 characters
- Navigation items: Max 20 characters

### Writing Style
- Use clear, concise Arabic
- Avoid overly formal language
- Use modern terminology
- Maintain consistency

### RTL Considerations
- Text direction handled automatically by next-intl
- Ensure layout components support RTL
- Test RTL layout for alignment issues

## Related Documentation

- `PROJECT_I18N_CONTRACT.md`: Full i18n governance and standards
- `PROJECT_UI_RULES.md`: UI development rules including i18n
- `I18N_BROWSER_QA_CHECKLIST.md`: Manual browser QA checklist
- `I18N_PREBUILD_POLICY.md`: Prebuild quality gates

## Summary

This workflow ensures:
- Consistent i18n implementation across the codebase
- No visible English strings in Arabic mode
- Proper Server/Client Component architecture
- High-quality translations
- Maintainable codebase

**Every developer must follow this workflow when implementing i18n.**

---

**Workflow Owner**: Development Team  
**Last Updated**: 2025-01-15  
**Next Review**: 2025-07-15
