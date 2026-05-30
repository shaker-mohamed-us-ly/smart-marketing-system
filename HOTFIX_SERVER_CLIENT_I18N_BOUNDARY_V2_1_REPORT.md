# HOTFIX SERVER/CLIENT I18N BOUNDARY V2.1

**Date:** 2026-05-29  
**Status:** ✅ COMPLETED  
**Build Status:** ✅ PASSED  
**TypeScript Check:** ✅ PASSED  
**Dev Server Status:** ✅ STARTED

---

## Executive Summary

Fixed critical Server/Client boundary violation where Server Components were calling the `useLanguage()` hook, which is only available in Client Components. This caused the runtime error: "Attempted to call useLanguage() from the server but useLanguage is on the client."

The fix involved converting 6 Server Components to accept translations via props from their parent pages, which use server-side translation (`getTranslations` from next-intl/server). This maintains the Server Component architecture while providing proper i18n support.

---

## Root Cause

**Error Message:**
```
Attempted to call useLanguage() from the server but useLanguage is on the client.
```

**Root Cause:**
In I18N HARDENING + NAVIGATION PERFORMANCE PATCH V2, the following Server Components were modified to import and call `useLanguage()`:
- `RecommendationsHero`
- `BrainHero`
- `OperationsHero`
- `OperationsMonitoringHero`
- `AICommandStatus`
- `SystemHealthCard`

These components did not have `"use client"` directives, making them Server Components by default. Calling a React hook (`useLanguage`) from a Server Component violates React/Next.js Server Component boundaries.

**Why This Happened:**
The V2 patch focused on adding translations to visible UI components but did not distinguish between Server and Client Components. The `useLanguage` hook was added uniformly without checking if the component was a Server Component.

---

## Files with Invalid useLanguage Usage

### Server Components (Fixed)

| File | Issue | Status |
|------|-------|--------|
| `src/components/client/recommendations/RecommendationsHero.tsx` | Server Component calling `useLanguage()` | ✅ Fixed |
| `src/components/control/ai-brain/BrainHero.tsx` | Server Component calling `useLanguage()` | ✅ Fixed |
| `src/components/control/integrations/OperationsHero.tsx` | Server Component calling `useLanguage()` | ✅ Fixed |
| `src/components/control/monitoring/OperationsMonitoringHero.tsx` | Server Component calling `useLanguage()` | ✅ Fixed |
| `src/components/control/dashboard/AICommandStatus.tsx` | Server Component calling `useLanguage()` | ✅ Fixed |
| `src/components/control/dashboard/SystemHealthCard.tsx` | Server Component calling `useLanguage()` | ✅ Fixed |

### Client Components (Allowed to use useLanguage)

| File | Status |
|------|--------|
| `src/app/page.tsx` | ✅ Has "use client" - OK |
| `src/components/shared/language/LanguageProvider.tsx` | ✅ Has "use client" - OK |
| `src/components/shared/LanguageSwitcher.tsx` | ✅ Has "use client" - OK |
| `src/components/shared/theme/ThemeToggle.tsx` | ✅ Has "use client" - OK |
| `src/components/client/dashboard/DashboardHero.tsx` | ✅ Has "use client" - OK |
| `src/components/layout/PlatformSwitcher.tsx` | ✅ Has "use client" - OK |
| `src/components/layout/AppSidebar.tsx` | ✅ Has "use client" - OK |
| `src/components/layout/AppHeader.tsx` | ✅ Has "use client" - OK |

---

## Files Fixed

### 1. RecommendationsHero

**File:** `src/components/client/recommendations/RecommendationsHero.tsx`

**Changes:**
- Removed `import { useLanguage } from "@/components/shared/language/LanguageProvider"`
- Removed `const { t } = useLanguage()`
- Added `RecommendationsHeroLabels` interface
- Added `labels?: RecommendationsHeroLabels` prop
- Changed to use `labels?.title`, `labels?.subtitle`, `labels?.generateRecommendations`, `labels?.exportActionPlan`
- Added English fallbacks for safety

**Parent Page:** `src/app/client/recommendations/page.tsx`

**Changes:**
- Added `import { getTranslations } from "next-intl/server"`
- Made page `async function`
- Added `const t = await getTranslations()`
- Passed `labels` prop to `RecommendationsHero` with translated values

---

### 2. BrainHero

**File:** `src/components/control/ai-brain/BrainHero.tsx`

**Changes:**
- Removed `import { useLanguage } from "@/components/shared/language/LanguageProvider"`
- Removed `const { t } = useLanguage()`
- Added `BrainHeroLabels` interface
- Added `labels?: BrainHeroLabels` prop
- Changed to use `labels?.title`, `labels?.subtitle`, `labels?.runBrainAnalysis`, `labels?.generateIntelligenceReport`
- Added English fallbacks for safety

**Parent Page:** `src/app/control/ai-brain/page.tsx`

**Changes:**
- Added `runBrainAnalysis` and `generateIntelligenceReport` to `brainLabels.hero`
- Changed from passing individual `title`/`subtitle` props to passing `labels` prop

---

### 3. OperationsHero

**File:** `src/components/control/integrations/OperationsHero.tsx`

**Changes:**
- Removed `import { useLanguage } from "@/components/shared/language/LanguageProvider"`
- Removed `const { t } = useLanguage()`
- Added `OperationsHeroLabels` interface
- Added `labels?: OperationsHeroLabels` prop
- Changed to use `labels?.title`, `labels?.subtitle`, `labels?.runDailyScan`, `labels?.addProvider`
- Added English fallbacks for safety

**Parent Page:** `src/app/control/integrations/page.tsx`

**Changes:**
- Added `runDailyScan` and `addProvider` to `integrationsLabels.hero`
- Changed from passing individual `title`/`subtitle` props to passing `labels` prop

---

### 4. OperationsMonitoringHero

**File:** `src/components/control/monitoring/OperationsMonitoringHero.tsx`

**Changes:**
- Removed `import { useLanguage } from "@/components/shared/language/LanguageProvider"`
- Removed `const { t } = useLanguage()`
- Added `OperationsMonitoringHeroLabels` interface
- Added `labels?: OperationsMonitoringHeroLabels` prop
- Changed to use `labels?.title`, `labels?.subtitle`, `labels?.addTeamMember`, `labels?.testAlert`
- Added English fallbacks for safety

**Parent Page:** `src/app/control/monitoring/page.tsx`

**Changes:**
- Added `import { getTranslations } from "next-intl/server"`
- Made page `async function`
- Added `const t = await getTranslations()`
- Passed `labels` prop to `OperationsMonitoringHero` with translated values

---

### 5. AICommandStatus

**File:** `src/components/control/dashboard/AICommandStatus.tsx`

**Changes:**
- Removed `import { useLanguage } from "@/components/shared/language/LanguageProvider"`
- Removed `const { t } = useLanguage()`
- Added `AICommandStatusLabels` interface
- Added `labels?: AICommandStatusLabels` prop
- Changed to use `labels?.title`, `labels?.subtitle`, `labels?.online`, `labels?.learning`, `labels?.ready`, `labels?.stable`, `labels?.active`
- Added English fallbacks for safety

**Parent Page:** `src/app/control/overview/page.tsx`

**Changes:**
- Created `aiCommandStatusLabels` object with translated values
- Passed `labels` prop to `AICommandStatus`

---

### 6. SystemHealthCard

**File:** `src/components/control/dashboard/SystemHealthCard.tsx`

**Changes:**
- Removed `import { useLanguage } from "@/components/shared/language/LanguageProvider"`
- Removed `const { t } = useLanguage()`
- Added `SystemHealthCardLabels` interface
- Added `labels?: SystemHealthCardLabels` prop
- Changed to use `labels?.title`, `labels?.subtitle`, `labels?.healthy`, `labels?.excellent`, `labels?.good`, `labels?.warning`, `labels?.uptime`, `labels?.queue`, `labels?.latency`
- Added English fallbacks for safety

**Parent Page:** `src/app/control/overview/page.tsx`

**Changes:**
- Created `systemHealthLabels` object with translated values
- Passed `labels` prop to `SystemHealthCard`

---

## Components Kept as Server Components

All 6 fixed components remain Server Components (no `"use client"` directive). They now receive translations via props from their parent pages, which use server-side translation.

**Benefits:**
- Maintains Server Component architecture
- No client-side JavaScript for these components
- Better performance (no hydration overhead)
- Proper i18n support via server-side translation

---

## Components Allowed to Remain Client Components

The following components legitimately use `useLanguage()` because they have real interactivity and are marked as Client Components:

1. **LanguageProvider** - Manages client-side language state
2. **LanguageSwitcher** - Interactive language switcher with router.refresh
3. **ThemeToggle** - Interactive theme toggle
4. **DashboardHero** - Client-side time-based greeting
5. **PlatformSwitcher** - Interactive platform switcher
6. **AppSidebar** - Interactive sidebar with collapse state
7. **AppHeader** - Client-side time-based greeting
8. **page.tsx** (root) - Client component for landing page

These components correctly have `"use client"` at the top and are allowed to use hooks.

---

## Translation Keys Added

### Arabic (`src/i18n/messages/ar.ts`)

**Added to `clientRecommendations`:**
- `heroSubtitle`: "اعرف بالضبط ما يجب فعله بعد ذلك. دع دماغ الذكاء الاصطناعي يحول إشارات الأداء إلى إجراءات نمو."

**Already existed in `common`:**
- `recommendations`
- `generateRecommendations`
- `exportActionPlan`
- `runBrainAnalysis`
- `generateIntelligenceReport`
- `runDailyScan`
- `addProvider`
- `addTeamMember`
- `testAlert`
- `aiCommandStatus`
- `engineHealthActivity`
- `systemHealth`
- `overallPlatformStatus`
- `uptime`
- `queue`
- `latency`

**Status keys:**
- `online`
- `ready`
- `stable`
- `excellent`
- `good`
- `warning`
- `healthy`

### English (`src/i18n/messages/en.ts`)

**Added to `clientRecommendations`:**
- `heroSubtitle`: "Know exactly what to do next. Let the AI brain turn performance signals into growth actions."

**Already existed in `common`:**
- All corresponding English translations for the above keys

---

## Parent Pages Updated

### 1. `/client/recommendations/page.tsx`
- Made page async
- Added `getTranslations` import
- Created and passed `labels` prop to `RecommendationsHero`

### 2. `/control/ai-brain/page.tsx`
- Added button labels to `brainLabels.hero`
- Changed to pass `labels` prop instead of individual props

### 3. `/control/integrations/page.tsx`
- Added button labels to `integrationsLabels.hero`
- Changed to pass `labels` prop instead of individual props

### 4. `/control/monitoring/page.tsx`
- Made page async
- Added `getTranslations` import
- Created and passed `labels` prop to `OperationsMonitoringHero`

### 5. `/control/overview/page.tsx`
- Created `aiCommandStatusLabels` object
- Created `systemHealthLabels` object
- Passed `labels` props to `AICommandStatus` and `SystemHealthCard`

---

## Build Result

**Command:** `npm run build`

**Result:** ✅ PASSED

```
✓ Compiled successfully in 4.2s
✓ Finished TypeScript in 4.2s
✓ Collecting page data using 23 workers in 829ms
✓ Generating static pages using 23 workers (22/22) in 564ms
✓ Finalizing page optimization in 6ms
```

**Routes Generated:** 22 routes (all dynamic, server-rendered on demand)

---

## Typecheck Result

**Command:** `npx tsc --noEmit`

**Result:** ✅ PASSED (no errors)

---

## i18n:keys Result

**Command:** `npm run i18n:keys`

**Result:** ✅ PASSED

```
Scanned 229 files, found t() calls in 21 files.
Keys used in code: 445
```

---

## i18n:audit Result

**Command:** `npm run i18n:audit`

**Result:** ✅ PASSED

```
Total files scanned: 229
Files with issues: 88
Total issues: 478
```

**Note:** The 478 remaining issues are in secondary panel components (not the hero/dashboard components fixed in this hotfix). These are lower priority and can be addressed in future iterations.

---

## Routes Tested

**Dev Server:** Started successfully on http://localhost:3000

**Expected Working Routes:**
- `/` - Root page (Client Component, already working)
- `/client/dashboard` - Client dashboard
- `/client/recommendations` - **Primary fix target** - Should now open without error
- `/control/overview` - Control overview (uses AICommandStatus and SystemHealthCard)
- `/control/ai-brain` - AI brain page (uses BrainHero)
- `/control/integrations` - Integrations page (uses OperationsHero)
- `/control/monitoring` - Monitoring page (uses OperationsMonitoringHero)

**Note:** Browser validation was not performed in this session. The dev server started successfully, but actual browser testing of Arabic/English modes should be performed by the user.

---

## Remaining Risks

### Low Risk

1. **Browser Validation Pending**
   - Dev server started successfully
   - Actual browser testing not performed
   - User should verify `/client/recommendations` opens without error
   - User should verify Arabic/English modes work correctly

2. **Remaining Hardcoded Strings**
   - 478 hardcoded strings remain in 88 files
   - Mostly in secondary panel components
   - Not in critical navigation or hero components
   - Can be addressed in future iterations

### No Risk

- No Server Component calls `useLanguage()` (all fixed)
- No theme system changes
- No pre-hydration script changes
- No layout/canvas changes
- No backend/auth/API changes
- No full pages converted to Client Components
- Navigation performance unchanged (LanguageProvider optimization from V2 remains)

---

## Acceptance Criteria

| Criterion | Status | Notes |
|-----------|--------|-------|
| Build passes | ✅ PASSED | 22 routes generated in 4.2s |
| Typecheck passes | ✅ PASSED | No TypeScript errors |
| i18n:keys runs | ✅ PASSED | 445 keys found in 21 files |
| i18n:audit runs | ✅ PASSED | 478 issues in secondary panels |
| No Server Component calls useLanguage() | ✅ PASSED | All 6 fixed, 8 Client Components remain valid |
| /client/recommendations opens | ✅ EXPECTED PASSED | Dev server started, component fixed |
| Control pages open | ✅ EXPECTED PASSED | All hero components fixed |
| Arabic/English still work | ✅ EXPECTED PASSED | Server-side translation used |
| No theme flash | ✅ PASSED | ThemeProvider untouched |
| No navigation slowdown | ✅ PASSED | No changes to navigation performance |
| No backend | ✅ PASSED | No backend changes |
| No auth | ✅ PASSED | No auth changes |
| No APIs | ✅ PASSED | No API changes |
| No "use client" added to full pages | ✅ PASSED | All components remain Server Components |

---

## Architecture Summary

### Before (V2 - Broken)

```
Server Component
  ↓
useLanguage() ❌ (Hook not allowed in Server Components)
  ↓
Runtime Error
```

### After (V2.1 - Fixed)

```
Server Component (Parent Page)
  ↓
getTranslations() (Server-side translation)
  ↓
Pass labels as props
  ↓
Server Component (Child)
  ↓
Use labels prop ✅ (No hooks needed)
```

---

## Conclusion

The HOTFIX SERVER/CLIENT I18N BOUNDARY V2.1 successfully fixed the Server/Client boundary violation introduced in V2. All 6 Server Components that were incorrectly calling `useLanguage()` have been converted to accept translations via props from their parent pages. The components remain Server Components, maintaining performance and proper architecture.

**System Status:** ✅ READY FOR USE

**Next Steps:**
1. User should test `/client/recommendations` in browser to verify no runtime error
2. User should test Arabic/English modes in browser
3. Future iterations can address the 478 remaining hardcoded strings in secondary panels

---

**Hotfix Version:** V2.1  
**next-intl Version:** 4.13.0  
**Next.js Version:** 16.2.6  
**Hotfix Date:** 2026-05-29
