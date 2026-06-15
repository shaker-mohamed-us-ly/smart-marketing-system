# SONIC Real Task Readiness Gate — Step 4A Report

**Date:** 2026-06-15  
**Task Type:** SONIC_REAL_TASK_READINESS_GATE_ONLY  
**Previous Step:** Step 3 — SONIC_INTERNAL_ADVISOR_DRY_RUN_PASS_READY_FOR_REAL_TASK  
**Branch:** `chore/ui-final-polish-v1`  
**HEAD:** `ad02887`  

---

## Executive Summary

**Readiness Assessment:** CONDITIONAL PASS WITH WIP OVERLAP WARNING

The SONIC External Advisor Bridge v1 is fully operational and ready for real tasks. However, the candidate first task involves files that already have significant uncommitted WIP changes.

**Key Finding:** Pre-existing WIP (24 files, ~3,261 lines changed) overlaps with candidate task files.

**Decision Required:** User must choose whether to:
1. Commit/stash existing WIP first (RECOMMENDED)
2. Proceed with mixed WIP (ACCEPTABLE WITH DOCUMENTATION)
3. Select a different first task with no overlap

**Candidate Task Status:** Safe to implement, but WIP overlap needs user decision.

---

## Git Safety Snapshot

| Command | Result |
|---------|--------|
| `git branch --show-current` | `chore/ui-final-polish-v1` |
| `git rev-parse --short HEAD` | `ad02887` |
| `git status --short` | 24 pre-existing WIP + 14 Step 2 files + 1 Step 3 report |
| `git diff --cached --name-only` | (empty) |
| `git diff --cached --stat` | (empty) |
| `git diff --stat` | 24 files, ~3,261 insertions, ~856 deletions |
| Staged files | **0** ✅ |

**Recent Commits:**
```
ad02887 (HEAD) feat(brand): add Direction E brand values studio
9ec74bf  fix(brand): add operating profile reset and occasion disable save
1e278b5  chore: add smart repair os tooling
6741b63  feat(brand): add operating profile and occasion context workspace
961be1a  feat(brand): add assets workspace and logo upload proof
```

---

## Current WIP Classification

### Category 1: Pre-existing Product WIP (24 files)

**Brand Module Components:**
| File | Lines Changed | Candidate Task Overlap |
|------|---------------|----------------------|
| `src/app/client/brand/page.tsx` | 108+ | No — page shell |
| `src/components/client/brand/BrandCard.tsx` | 179+ | **YES** — Card primitive |
| `src/components/client/brand/BrandCardV2.module.css` | 594+ | **YES** — Card styles |
| `src/components/client/brand/BrandChannelsTab.tsx` | 189+ | **YES** — Primary target |
| `src/components/client/brand/BrandCommandCenterHeader.tsx` | 50+ | No — header only |
| `src/components/client/brand/BrandDetailsShell.tsx` | 70+ | No — shell layout |
| `src/components/client/brand/BrandDnaJourneyTree.tsx` | 160+ | No — DNA feature |
| `src/components/client/brand/BrandDnaJourneyTree.module.css` | 56+ | No — DNA styles |
| `src/components/client/brand/BrandDnaPreview.tsx` | 91+ | No — DNA preview |
| `src/components/client/brand/BrandEmptyState.tsx` | 111+ | No — empty state |
| `src/components/client/brand/BrandIdentityTab.tsx` | 87+ | No — identity tab |
| `src/components/client/brand/BrandLogoAura.tsx` | 11+ | No — logo component |
| `src/components/client/brand/BrandLogoAura.module.css` | 32+ | No — logo styles |
| `src/components/client/brand/BrandNextBestActionPanel.tsx` | 230+ | No — action panel |
| `src/components/client/brand/BrandOverviewTab.tsx` | 1,013+ | No — overview tab |
| `src/components/client/brand/BrandPlanLimitGate.tsx` | 105+ | No — plan gate |

**Global/Shared Files:**
| File | Lines Changed | Risk Level |
|------|---------------|------------|
| `src/app/globals.css` | 12+ | Low — global styles |
| `src/components/layout/AppShell.module.css` | 55+ | Low — layout only |
| `src/lib/design/v8-tokens.css` | 92+ | Medium — design system |

**i18n Files:**
| File | Lines Changed | Risk Level |
|------|---------------|------------|
| `src/i18n/messages/ar.ts` | 338+ | Medium — may need new keys |
| `src/i18n/messages/en.ts` | 299+ | Medium — may need new keys |

**Brand Library:**
| File | Lines Changed | Risk Level |
|------|---------------|------------|
| `src/lib/brand/constants.ts` | 71+ | Low — constants only |
| `src/lib/brand/types.ts` | 82+ | Low — types only |
| `src/lib/brand/validation.ts` | 82+ | Low — validation only |

**WIP Status:** Active Brand Module development with 24 uncommitted files.

### Category 2: Step 2 Bridge Files (14 files, untracked)

All in allowed directories:
- `.windsurf/skills/sonic-external-advisor-bridge/` — 6 files
- `.windsurf/workflows/` — 1 file
- `docs/cascade/external-tools/` — 6 files
- `docs/cascade-prompt-blueprints/` — 1 file

### Category 3: Step 3 Report (1 file, untracked)

- `reports/workspace/SONIC_EXTERNAL_ADVISOR_BRIDGE_STEP3_DRY_RUN_REPORT.md`

### Category 4: Unexpected Files

**None detected.** ✅

### Category 5: Forbidden/Sensitive File Risk

**None detected.** ✅
- No `.env*` changes
- No `.mcp.json` changes
- No `package.json` changes
- No `supabase/migrations/` changes
- No `src/app/auth/` changes
- No `src/app/api/` changes

---

## Bridge Availability Check

### Skill Files (6/6) ✅

| # | File | Status | Size |
|---|------|--------|------|
| 1 | `.windsurf/skills/sonic-external-advisor-bridge/SKILL.md` | ✅ Available | 14,330 bytes |
| 2 | `advisor-request-template.md` | ✅ Available | 7,548 bytes |
| 3 | `advisor-response-schema.md` | ✅ Available | 3,646 bytes |
| 4 | `safety-filter.md` | ✅ Available | 6,091 bytes |
| 5 | `source-consultation-matrix.md` | ✅ Available | 6,950 bytes |
| 6 | `repair-advice-contract.md` | ✅ Available | 7,445 bytes |

### Workflow (1/1) ✅

| # | File | Status | Size |
|---|------|--------|------|
| 7 | `.windsurf/workflows/sonic-external-advisor-task.md` | ✅ Available | 5,919 bytes |

### External Tools Docs (6/6) ✅

| # | File | Status | Size |
|---|------|--------|------|
| 8 | `docs/cascade/external-tools/README.md` | ✅ Available | 4,478 bytes |
| 9 | `prompt-master-methodology.md` | ✅ Available | 4,269 bytes |
| 10 | `website-cloning-methodology.md` | ✅ Available | 5,891 bytes |
| 11 | `visual-qa-methodology.md` | ✅ Available | 5,862 bytes |
| 12 | `self-healing-methodology.md` | ✅ Available | 6,671 bytes |
| 13 | `mcp-tool-registry.md` | ✅ Available | 4,611 bytes |

### Blueprint (1/1) ✅

| # | File | Status | Size |
|---|------|--------|------|
| 14 | `docs/cascade-prompt-blueprints/sonic-external-advisor-task-template.md` | ✅ Available | 7,472 bytes |

### Reports (2/2) ✅

| # | File | Status |
|---|------|--------|
| 15 | `SONIC_EXTERNAL_ADVISOR_BRIDGE_STEP2_REPORT.md` | ✅ Available |
| 16 | `SONIC_EXTERNAL_ADVISOR_BRIDGE_STEP3_DRY_RUN_REPORT.md` | ✅ Available |

**Bridge Status:**
- **Bridge usable:** YES ✅
- **Live external advisor connected:** NO (by design) ✅
- **Internal methodology usable:** YES ✅

---

## Smart Repair OS Result

### Self-Test Results

```
=== Self-Test Results: 15 passed, 0 failed ===
SELF_HEALING_ENGINE_SELF_TEST_PASS
```

**Tests Passed:**
1. ✅ classifyFailure → INFRA (rls)
2. ✅ classifyFailure → PRODUCT (missing message)
3. ✅ classifyFailure → TEST (selector)
4. ✅ classifyFailure → TOOLING (cdp)
5. ✅ classifyFailure default → TOOLING
6. ✅ fixStamp format valid
7. ✅ isPathInsideProject true
8. ✅ isPathInsideProject false
9. ✅ getChromeExternalProfilePath outside project
10. ✅ buildToolAdapter Chrome_CDP
11. ✅ buildToolAdapter unknown
12. ✅ validateToolRegistry — all adapters valid
13. ✅ retryWithLimit success
14. ✅ retryWithLimit exhausted
15. ✅ stopIfForbiddenChangeNeeded blocked

### Validation

```
=== Validate Result: SMART_REPAIR_OS_VALIDATE_PASS ===

Tool Registry: VALID
Chrome Profile Outside Project: YES
Sample Adapter (Chrome_CDP): VALID
System blocks auth issue: YES
System allows i18n fix: YES
Scope enforcement works: YES
```

**Status:** Fully operational ✅

---

## Candidate Task Risk Assessment

### Task Definition

> **"Improve Owned Brand Channels UI clarity and microinteraction guidance inside the Brand Module, without touching Backend, Supabase, Auth, API, migrations, package files, or MCP config."**

### Risk Assessment Matrix

| Area | Risk | Evidence | Decision |
|------|------|----------|----------|
| **WIP Overlap** | ⚠️ **HIGH** | `BrandChannelsTab.tsx`, `BrandCard.tsx`, `BrandCardV2.module.css` already in 24-file WIP | **User decision required** |
| **Backend** | ✅ SAFE | No backend files in scope | Proceed |
| **Supabase/RLS** | ✅ SAFE | No schema/migrations touched | Proceed |
| **Auth/API** | ✅ SAFE | No auth/api files touched | Proceed |
| **Package Install** | ✅ SAFE | Uses existing Framer Motion only | Proceed |
| **MCP Config** | ✅ SAFE | No `.mcp.json` changes | Proceed |
| **i18n Changes** | ⚠️ **MEDIUM** | May need new translation keys | Plan carefully |
| **Browser QA** | ⚠️ **MEDIUM** | Requires screenshots post-implementation | Prepare QA plan |
| **User Review** | ⚠️ **MEDIUM** | Visual changes need user approval | Include in plan |

### Detailed File Overlap Analysis

**Candidate Task Files vs. Pre-existing WIP:**

| Candidate File | In WIP? | WIP Lines | Risk |
|---------------|---------|-----------|------|
| `BrandChannelsTab.tsx` | ✅ YES | 189+ changed | **HIGH** — Primary target, significant WIP |
| `BrandCard.tsx` | ✅ YES | 179+ changed | **HIGH** — Card primitive in active development |
| `BrandCardV2.module.css` | ✅ YES | 594+ changed | **HIGH** — Major CSS refactoring in progress |
| `v8-tokens.css` | ✅ YES | 92+ changed | **MEDIUM** — Design system active |
| `ar.ts` | ✅ YES | 338+ changed | **MEDIUM** — i18n active |
| `en.ts` | ✅ YES | 299+ changed | **MEDIUM** — i18n active |

### Critical Finding

**All primary candidate task files are already in active WIP.** The pre-existing work appears to be a comprehensive Brand Module development effort involving:
- Card component architecture (BrandCard.tsx, BrandCardV2.module.css)
- Channel management UI (BrandChannelsTab.tsx)
- Design system updates (v8-tokens.css)
- i18n expansion (ar.ts, en.ts)

**Implications:**
1. New changes will mix with uncommitted work
2. Diff separation will be difficult
3. Rollback/undo becomes complex
4. Review process complicated

---

## Source Consultation Plan for Step 4B

### Phase 1: Mandatory Internal Sources (Read Before Any Work)

| Source | Why | Evidence Needed |
|--------|-----|-----------------|
| `AGENTS.md` | Project identity, core rules | Rules acknowledged |
| `CASCADE_PROJECT_RULES.md` | 20 permanent rules | Rules referenced |
| `.devin/rules/git-safety.md` | Git isolation requirements | Pre-execution git check |
| `.devin/rules/ui-quality.md` | UI validation standards | QA gates defined |
| `.devin/rules/ui-ux-source-routing.md` | UI methodology | Guidelines followed |
| `.devin/rules/smart-repair-os-protocol.md` | Repair procedures | Failure handling planned |
| `src/lib/design/v8-tokens.css` | Design system tokens | Token compliance |
| `src/components/shared/Card.tsx` | Card primitive | Base component understood |
| `src/i18n/messages/ar.ts` | Arabic translations | Key availability |
| `src/i18n/messages/en.ts` | English translations | Key availability |

### Phase 2: External Methodology Reference

| Source | Purpose | Application |
|--------|---------|-------------|
| `prompt-master-methodology.md` | Intent extraction | Task definition clarity |
| `website-cloning-methodology.md` | Visual analysis | UI improvement framework |
| `visual-qa-methodology.md` | Browser QA | Screenshot validation plan |
| `self-healing-methodology.md` | Failure handling | Smart Repair OS triggers |

### Phase 3: Design/Motion Guidelines

**Motion Rules:**
- ✅ Use motion for: clarity, feedback, state change, continuity
- ❌ No decorative heavy motion
- ❌ No copied layouts/assets/fonts/logos/code
- ✅ Respect `prefers-reduced-motion`
- ✅ Use existing Framer Motion (already installed)

**V8 Token Compliance:**
- ✅ Card elevation, padding, tone from Card primitive
- ✅ IconFrame for icon containers
- ✅ Spacing from v8-tokens.css
- ✅ Typography scale from design system

---

## Proposed Step 4B Plan

### IF User Approves WIP Overlap OR Commits WIP First

**Task Title:** Improve Owned Brand Channels UI Clarity and Microinteractions

**Objective:**
Enhance the Owned Channels tab with clearer status indicators, improved card information hierarchy, and purposeful micro-interactions for state changes.

**Allowed Files:**
| File | Purpose |
|------|---------|
| `src/components/client/brand/BrandChannelsTab.tsx` | Primary component |
| `src/components/client/brand/BrandCard.tsx` | Card primitive (may need enhancement) |
| `src/components/client/brand/BrandCardV2.module.css` | Card styles |
| `src/i18n/messages/ar.ts` | Arabic i18n additions |
| `src/i18n/messages/en.ts` | English i18n additions |

**Forbidden Files:**
- `supabase/migrations/*`
- `src/lib/supabase/*`
- `src/app/auth/*`
- `src/app/api/*`
- `middleware.ts`
- `.env*`, `.mcp.json`, `package.json`, `package-lock.json`

**Read-First Files:**
1. `AGENTS.md`
2. `.devin/rules/ui-quality.md`
3. `src/components/client/brand/BrandChannelsTab.tsx` (current state)
4. `src/components/client/brand/BrandCard.tsx` (current state)
5. `src/lib/design/v8-tokens.css`
6. `src/i18n/messages/en.ts` (check existing keys)

**UI/UX Requirements:**
- Clearer channel status indication (connected/pending/disconnected)
- Improved channel card information hierarchy
- Visual feedback for channel actions
- Consistent with V8 design system
- RTL/LTR compatible
- Dark/light theme compatible

**Motion/Microinteraction Rules:**
- Subtle state transition feedback (0.2-0.3s)
- Easing: ease-out for entrance, ease-in-out for transitions
- Use Framer Motion's `AnimatePresence` for list changes
- `motion.div` for card hover states
- `prefers-reduced-motion` media query respect
- No layout thrashing animations

**i18n Rules:**
- All visible text through `t()` function
- Add new keys to `clientBrand.v1.ui.channels.*`
- Update both `ar.ts` and `en.ts`
- Run `npm run i18n:visible` post-implementation
- Run `npm run ui:titles` to check empty headings

**Backend Boundaries:**
- NO Supabase changes
- NO RLS modifications
- NO API route changes
- NO Auth changes
- Use existing placeholder channel data structure
- No real OAuth implementation

**Validation Gates:**
| Check | Command | Threshold |
|-------|---------|-----------|
| TypeScript | `npm run typecheck` | 0 errors |
| i18n visible | `npm run i18n:visible` | 0 hardcoded strings |
| UI titles | `npm run ui:titles` | 0 empty headings |
| Lint | `npm run lint` | No new errors |

**Browser QA Screenshots Required:**
| Viewport | Required |
|----------|----------|
| Desktop 1280px+ | Yes |
| Tablet 768px | Yes |
| Mobile 375px | Yes |
| RTL Arabic | Yes |
| LTR English | Yes |
| Dark theme | Yes |
| Light theme | Yes |

**Stop Conditions:**
- STOP if backend changes required
- STOP if package installation needed
- STOP if i18n validation fails repeatedly
- STOP if visual regression unacceptable
- STOP if WIP mixing becomes unmanageable

**Report Path:**
`reports/workspace/BRAND_CHANNELS_UI_IMPROVEMENT_REPORT.md`

**Final Status Enum Options:**
- `COMPLETED_WITH_EVIDENCE` — All gates passed, screenshots captured
- `COMPLETED_WITH_GAPS` — Core done, some QA skipped
- `BLOCKED` — Stopped by technical or user decision
- `STILL_NOT_FIXED` — Attempted but issues persist
- `FAILED_VALIDATION` — Validation gates failed

---

## Alternative: Safer First Task Option

If WIP overlap is concerning, consider this safer alternative:

**"Create a documentation-only improvement plan for Brand Channels UI without code changes"**

- No file modifications
- No WIP mixing
- Produces actionable plan for future implementation
- Can be done in isolation

Or:

**"Audit and report only — document current Brand Channels UI state with screenshots"**

- Read-only Browser QA
- No code changes
- Establishes baseline
- No WIP conflict

---

## What Was Not Changed

**Explicitly NOT Modified in Step 4A:**

| Category | Status |
|----------|--------|
| Product code under `src/` | ✅ Untouched |
| Brand Module files | ✅ Untouched |
| Supabase files | ✅ Untouched |
| Auth/API files | ✅ Untouched |
| Middleware | ✅ Untouched |
| Package files | ✅ Untouched |
| Environment files | ✅ Untouched |
| MCP config | ✅ Untouched |
| Git state | ✅ No staging, commit, push |

**Only File Created:**
- `reports/workspace/SONIC_REAL_TASK_READINESS_GATE_STEP4A_REPORT.md` (this report)

---

## Validation Results

| Check | Result |
|-------|--------|
| No `src/` files modified | ✅ PASS |
| No forbidden files modified | ✅ PASS |
| No `package.json` changes | ✅ PASS |
| No `.mcp.json` changes | ✅ PASS |
| No `.env*` touched | ✅ PASS |
| Staged files | 0 ✅ |
| Pre-existing WIP preserved | 24 files ✅ |
| Step 2 files preserved | 14 files ✅ |
| Step 3 report preserved | 1 file ✅ |
| Step 4A report created | 1 file ✅ |

---

## User Decision Needed

**Critical Question:** How should we handle the WIP overlap?

### Option A: Commit/Stash WIP First (RECOMMENDED)

**Action:**
1. User commits or stashes the 24 pre-existing WIP files
2. Clear working directory
3. Then proceed to Step 4B

**Benefits:**
- Clean separation of work
- Easy rollback if needed
- Clear commit history
- Simpler review process

### Option B: Proceed With Mixed WIP (ACCEPTABLE)

**Action:**
1. Document current WIP state
2. Proceed with candidate task
3. Accept that diffs will be combined

**Benefits:**
- Faster progression
- No interruption to current flow

**Risks:**
- Difficult to separate changes
- Complex review process
- Harder to rollback specific features

### Option C: Select Different First Task

**Action:**
1. Choose task with no file overlap
2. Example: Documentation-only audit
3. Or: Create new component in unused file

**Benefits:**
- No WIP mixing
- Clean implementation

---

## Recommended Next Step

**Primary Recommendation:**

### `REQUEST_USER_APPROVAL_FOR_COMMIT_OR_STAGING_DECISION`

Before proceeding to Step 4B implementation:

1. **User should decide:** Commit/stash WIP vs. proceed with mixed WIP
2. **Once decided:** Cascade can proceed with Step 4B
3. **Alternative:** Select safer first task with no overlap

**If User Approves Proceeding:**
- Next: `PROCEED_TO_STEP_4B_OWNED_CHANNELS_UI`

**If User Wants Isolation:**
- Next: `DO_WIP_ISOLATION_FIRST`

---

## Final Status Enum

**REAL_TASK_READINESS_PASS_BUT_WIP_OVERLAP_NEEDS_DECISION**

**Justification:**
- ✅ Bridge fully operational (15/15 files, Smart Repair OS PASS)
- ✅ Git state clean (0 staged)
- ✅ No forbidden files touched
- ✅ Candidate task safe (no backend, no packages, no MCP)
- ✅ All gates ready for implementation
- ⚠️ **WIP overlap detected** — Candidate files already in uncommitted WIP
- ⚠️ **User decision required** — How to handle WIP mixing

---

## Summary

| Component | Status |
|-----------|--------|
| Step 4A Readiness Gate | ✅ Complete |
| Bridge Availability | ✅ 15/15 files ready |
| Smart Repair OS | ✅ 15/15 tests PASS |
| Git Safety | ✅ 0 staged |
| WIP Classification | ✅ 24 files documented |
| Risk Assessment | ⚠️ WIP overlap identified |
| Source Plan | ✅ Ready for Step 4B |
| Step 4B Plan | ✅ Defined (pending user decision) |
| Product Code Touched | ❌ NO |
| Forbidden Files Touched | ❌ NO |

**Awaiting:** User decision on WIP handling before Step 4B implementation.

---

*Report completed: 2026-06-15*  
*Step 4A status: READINESS_PASS_WITH_WIP_DECISION_REQUIRED*  
*Bridge status: READY FOR REAL TASK*  
*Next action: AWAITING USER DECISION*
