# UI/UX Source Routing

**Version:** 1.0
**Relationship:** Supplements `AGENTS.md`, `cascade-prompt-quality.md`, `ui-quality.md`, `backend-safety.md`, `git-safety.md`, `tooling-protocol.md`. Does not replace them. Git, backend, and security rules always take precedence.

---

## 1. Purpose

This rule adds UI/UX source routing intelligence to Cascade. It tells Cascade **which design sources to reference** for each type of UI task, and what minimum evidence is required.

It does not replace `AGENTS.md` or `cascade-prompt-quality.md`. Any rule about Git staging, backend access, or security always wins.

---

## 2. When This Rule Applies

- Any UI implementation, redesign, or polish task
- Any dashboard, card, or layout work
- Any typography or font rendering work
- Any motion or micro-interaction work
- Any Brand DNA / Identity Studio work
- Any Brand Card, Logo Aura, or Trash Readiness work
- Any visual acceptance audit

---

## 3. Source Routing Matrix

### A) Typography / Font Rendering
- **Apple HIG** — Arabic font rendering, touch targets, mobile scroll
- **Fluent 2** — Type scale, spacing density
- **WCAG 2.2** — Minimum font size (12px), contrast
- **Validation:** `computed styles` via Playwright, Arabic-first screenshot
- **Context7:** Use only for `next/font` or modern Next.js/React docs questions

### B) SaaS Layout / Cards / Dashboard
- **Untitled UI** — Card hierarchy, whitespace, badges
- **IBM Carbon** — Grid systems, data density, compact layouts
- **NN/g Dashboard UX** — Information density decisions
- **Dashboard V8 baseline** — Existing project tokens and patterns
- **Validation:** Playwright screenshots (desktop + mobile)

### C) Color / Theme / Tokens
- **Material Design 3** — Color roles, states, surface hierarchy
- **Fluent 2** — Elevation tokens, shadow tokens
- **V8 tokens** (`--sms-v8-*`) — Project-specific token values
- **Tailwind token discipline** — No hardcoded values
- **Validation:** `computed styles`, screenshot, axe-core contrast

### D) Motion / Micro-interactions
- **Framer / Motion** — Inspiration only. Do not install.
- **useAnimations** — Icon animation inspiration only. Do not install.
- **CSS-only first** — No Framer Motion, no GSAP
- **Reduced motion is mandatory** — `prefers-reduced-motion: reduce` must be handled
- **Validation:** Interaction screenshot, reduced-motion browser test

### E) Accessibility
- **WCAG 2.2** — Contrast (4.5:1 normal), focus indicators, keyboard nav, touch targets (44x44px)
- **Playwright accessibility snapshot** — When dev server is running
- **axe-core** — When dev server is running (`SKIPPED_DEV_SERVER_NOT_RUNNING` is not PASS)
- **Validation:** Automated scan + manual tab navigation test

### F) Brand DNA / Identity Studio
- **AI Website Cloner methodology** — Analysis-only: Inspect → Capture → Extract → Analyze → Specify → Brainstorm → Implement → Validate. No cloning. No asset copying.
- **Brand Source Intelligence** — Internal project methodology
- **Marketing Strategy Reviewer** — Internal project methodology
- **No scraping.** No fake AI. No fake save.
- **Validation:** Screenshot of DNA Canvas, Campaign Translation, Source Intelligence

### G) Brand Card / Logo Aura / Trash Readiness
- **Untitled UI** — Card hierarchy
- **Material 3** — States, elevation
- **Fluent 2** — Surfaces, depth
- **WCAG 2.2** — Contrast on logo + aura
- **Framer-inspired** — Subtle aura motion only. CSS-only.
- **Delete/trash** — UI-only preview until backend schema is approved. Soft delete concept (`deleted_at`, `deleted_by`).
- **Validation:** Screenshot in all modes (light/dark, RTL/LTR, reduced-motion)

### H) Mobile Readiness
- **Apple HIG** — Touch targets (48x48), safe areas, scroll length
- **Material Adaptive Design** — Responsive breakpoints
- **Playwright MCP** — Mobile viewport screenshots
- **Validation:** Mobile breakpoint screenshot, no horizontal overflow

---

## 4. Mandatory Expert Review Simulation

Before declaring any UI task complete, mentally run these 8 reviewers. If any reviewer fails, the task is not done.

| # | Reviewer | Question | Pass Criteria |
|---|----------|----------|---------------|
| 1 | **UX Reviewer** | Does the user understand the page in 5-10 seconds? | Clear hierarchy, obvious next action, summary-first |
| 2 | **Visual Design Reviewer** | Is it premium, clean, not a checklist? | Warm gray light / Graphite dark, consistent spacing, no excessive borders |
| 3 | **Design System Reviewer** | Does it use tokens/primitives? | `var(--sms-v8-*)`, `Card`, `IconFrame`, no hardcoded colors/spacing |
| 4 | **Accessibility Reviewer** | Are contrast, focus, touch, keyboard good? | WCAG contrast, visible focus, >=44px touch targets, keyboard navigable |
| 5 | **Motion Reviewer** | Is motion meaningful, not decorative? | Triggered only, 150-300ms, `prefers-reduced-motion` respected, CSS-only |
| 6 | **Marketing UX Reviewer** | Does it help the user make a marketing decision? | Clear path to DNA, campaign, or channel connection. No dead ends. |
| 7 | **Frontend Architect** | Are RSC/Client boundaries safe? | Server Component by default, `"use client"` only for interactivity, minimal hydration |
| 8 | **QA Reviewer** | Does the screenshot prove it? | Before + after screenshots, console clean, validation passed, no assumed PASS |

---

## 5. UI Command Minimum Contract

Every UI command must declare:

1. **Visual target** — What does success look like?
2. **Source routing** — Which sources govern this task? (from Section 3)
3. **Allowed scope** — Exact files that can be modified
4. **Forbidden scope** — Exact files that cannot be modified
5. **Screenshots before/after** — Playwright MCP mandatory
6. **Computed styles** — Minimum 3 elements for typography/color/spacing tasks
7. **Desktop + mobile** — Both breakpoints
8. **RTL/LTR** — Arabic-first mandatory
9. **Light/dark** — Both modes if theme-relevant
10. **Accessibility** — axe-core or manual checklist
11. **Validation** — `npm run typecheck`, `npm run i18n:visible`, `npm run ui:titles`
12. **No assumed PASS** — Every claim needs evidence
13. **Final visual status** — One of the enums in Section 12

---

## 6. Brand DNA UI Contract

Every Brand DNA command must include:

1. **Source Inputs** — What feeds into this component?
2. **Brand Signals** — What signals does the component display?
3. **DNA Canvas** — Decision/signal/missing/impact (full mode) or summary (compact)
4. **Campaign Translation** — Recipes translating DNA into campaign strategies
5. **Next Action** — What should the user do next?
6. **No fake AI** — All data inferred from existing `brand` object
7. **No fake save** — Preview notices only
8. **No scraping** — Methodology reference only

---

## 7. Motion Contract

Every motion command must include:

1. **Purpose** — Why does this element move?
2. **Trigger** — Hover, focus, state change, mount
3. **Duration** — 150-300ms typical, 500ms for progress, 3-5s for ambient aura
4. **Easing** — `ease-out` for enter, `ease-in` for exit, `ease-in-out` for state toggle
5. **Reduced motion** — What happens at `prefers-reduced-motion: reduce`?
6. **Performance risk** — Will this cause jank or layout thrashing?
7. **No decorative loops** — Motion must be triggered, not ambient (except subtle aura)

**Forbidden motion:** Particles, canvas animations, heavy blur animation, shimmer sweep (lightSweep), bounce on load, parallax, GSAP/Framer Motion libraries.

---

## 8. Brand Card / Logo Aura / Trash Contract

Every Brand Card command must include:

1. **Logo rendering check** — Does the logo display correctly?
2. **Palette source** — Brand colors or deterministic fallback?
3. **Deterministic fallback** — Hash brand name to generate palette if no colors exist
4. **Aura respects reduced motion** — Static gradient when `prefers-reduced-motion: reduce`
5. **Card hierarchy** — Logo > Name > Status > Meta > Actions > Overflow
6. **Delete/trash backend safety gate** — UI-only preview. No fake delete. Backend schema approval required for real implementation.
7. **No fake trash/delete** — Show "Move to trash" menu item only as preview.

---

## 9. Anti-Patterns

These patterns are forbidden in all UI/UX work:

| Anti-Pattern | Why Forbidden | Detection |
|-------------|---------------|-----------|
| Pretty but useless cards | Waste space, no action | No CTA, no next step |
| Text too small for Arabic | Illegible, blurry | `< 14px` or `text-[11px]` |
| Glass blur behind text | Unreadable content | Glass opacity `< 0.82` behind body text |
| Full-width cards without purpose | Poor hierarchy, wasted space | Card spans full width without Centered Canvas reason |
| Tiny vertical stack | Dense, overwhelming | Gap `< 16px` between major sections |
| Decorative icons without meaning | Visual noise | Icon present but no associated action or label |
| Fake metrics/progress | Misleading user | Progress bar or metric not backed by real data |
| Raw translation keys visible | Broken UI | `clientBrand.v1.ui.title` visible to user |
| Missing screenshots | No visual proof | No before/after Playwright evidence |
| Computed styles only PASS | Insufficient evidence | Only CSS values checked, no screenshot |
| Motion noise | Distracting, fatiguing | Constant animation loops without trigger |
| Blue dark mode drift | Loses premium feel | Dark background with blue tint instead of Graphite/Charcoal |
| Inconsistent icon containers | Visual chaos | Mixed icon box sizes, mixed stroke widths |
| Dense UX without next step | User stuck | No clear CTA or action after reading |
| Too many equal cards | No hierarchy | All cards same weight, no primary/secondary distinction |
| Fake delete/trash UI | Broken promise | Delete simulates removal without backend |
| Logo aura overpowering text | Hierarchy broken | Aura brighter or larger than logo itself |
| Mobile scroll too long | User abandons | Primary content exceeds 3 viewport heights without progressive disclosure |

---

## 10. Browser QA Rules

- **Viewport screenshots preferred.** Never fullPage unless explicitly requested.
- **Before + after required** for every change.
- **Console + network required** for every browser session.
- **Computed styles required** for typography, color, spacing tasks (minimum 3 elements).
- **Mobile breakpoint required** for every UI task.
- **Arabic RTL first.** Always check Arabic mode before English.
- **No PASS without visual proof.** Screenshots are the source of truth.
- **Light + dark** both required if theme-relevant.

---

## 11. Stop Conditions

Cascade MUST STOP and ask the user when:

1. **Missing screenshots** for a UI task
2. **Browser QA blocked** — Dev server down and no fallback plan
3. **Validation failed** — `typecheck`, `i18n:visible`, or `ui:titles` fails
4. **Raw translation keys** found in UI
5. **Hardcoded visible text** found in UI
6. **Git dirty** — modified files outside the command's allowed scope
7. **Backend/Supabase/API touched** without explicit approval
8. **Delete/trash implemented** without backend schema approval
9. **Motion violates reduced motion** — No `prefers-reduced-motion` fallback
10. **Too many sources in one prompt** — More than 2 primary sources causing drift

---

## 12. Final Status Enums

Use these status enums for all UI/UX tasks:

| Status | Meaning |
|--------|---------|
| `UI_UX_SOURCE_ROUTING_APPLIED_WITH_BROWSER_PROOF` | All sources routed, all evidence captured, validation passed |
| `UI_UX_SOURCE_ROUTING_APPLIED_WITH_PARTIAL_EVIDENCE` | Sources routed, some evidence missing or follow-up needed |
| `UI_VISUAL_NOT_ACCEPTABLE` | Screenshots show issues requiring rework |
| `BLOCKED_BROWSER_QA_MISSING` | Dev server down or Playwright MCP unavailable |
| `BLOCKED_VALIDATION_FAILED` | TypeScript, i18n, or ui:titles failed |
| `BLOCKED_OUT_OF_SCOPE_CHANGES` | Modified files outside allowed scope |
| `DELETE_TRASH_REQUIRES_BACKEND_APPROVAL` | Delete/trash UX attempted without backend permission |

---

*Supplements: `AGENTS.md`, `cascade-prompt-quality.md`, `ui-quality.md`, `backend-safety.md`, `git-safety.md`, `tooling-protocol.md`*
*Methodology sources: Apple HIG, Material Design 3, Fluent 2, IBM Carbon, WCAG 2.2, Untitled UI, NN/g Dashboard UX*
