# Repair Advice Contract

## Purpose

Standardized protocol for requesting and receiving repair guidance when failures occur during implementation.

---

## When To Use

Request repair advice when:

| Failure Type | Example |
|--------------|---------|
| TypeScript errors | `npm run typecheck` fails |
| ESLint errors | `npm run lint` fails |
| Dev server failure | Won't start or crashes |
| Browser QA failure | Screenshots don't match expected |
| Screenshot capture failure | Playwright MCP errors |
| i18n visible check failure | Raw keys or hardcoded text found |
| UI title check failure | Empty headings detected |
| Runtime errors | Unexpected errors during testing |
| Smart Repair OS classification | Tooling or system repair needed |

---

## Request Shape

When requesting repair advice, provide:

```markdown
## Repair Request

### Failure Summary
Brief description of what failed.

### Exact Error
Copy-paste the exact error message(s).

### Files Involved
- File 1: [path]
- File 2: [path]

### Forbidden Files
List any forbidden files that must NOT be touched.

### Allowed Scope
List files that CAN be modified.

### Attempted Fixes
What was already tried and the result.

### Suspected Root Cause
Best guess at what's causing the issue.

### Requested Safe Repair Options
What safe fixes would you recommend?
```

---

## Advisor/Repair Response Requirements

Response must include:

### 1. Likely Cause
Analysis of what's probably causing the failure.

### 2. Safe Fix Options
Multiple approaches ranked by safety:

| Option | Risk Level | Description |
|--------|------------|-------------|
| Option A | Minimal | Safest approach, lowest risk |
| Option B | Low | Slightly more aggressive, still safe |
| Option C | Medium | Requires more changes, higher risk |

### 3. Risk Ranking
Clear indication of risk for each option.

### 4. Minimal Fix First
Always recommend the smallest change that could fix the issue.

### 5. What Not To Touch
Explicit list of files/areas to avoid.

### 6. Validation After Fix
How to verify the fix worked.

---

## FIX Stamp Requirement

Every actual repair must produce a FIX stamp:

```
FIX::<engine>::<area>::<bug_type>::<action>::<evidence>::<status>
```

| Field | Values |
|-------|--------|
| engine | `ToolingRepair` / `SystemRepair` |
| area | Domain (e.g., `Chrome_CDP`, `next-intl`, `TypeCheck`) |
| bug_type | Short descriptor (e.g., `MISSING_IMPORT`, `TYPE_MISMATCH`) |
| action | What was done (e.g., `ADDED_IMPORT`, `FIXED_TYPE`) |
| evidence | Proof (e.g., `TYPECHECK_PASS`, `CONSOLE_CLEAN`) |
| status | `PASS` / `BLOCKED` / `FAILED` |

### Examples

```
FIX::ToolingRepair::Chrome_CDP::PROFILE_INSIDE_PROJECT::MOVED_PROFILE_OUTSIDE::CDP_READY::PASS

FIX::SystemRepair::next-intl::MISSING_KEY::ADDED_TRANSLATION_KEY::RAW_KEYS_ZERO::PASS

FIX::SystemRepair::TypeScript::TYPE_MISMATCH::UPDATED_INTERFACE::TYPECHECK_PASS::PASS

FIX::SystemRepair::Supabase_RLS::PERMISSION_DENIED::STOPPED_FOR_APPROVAL::REAL_ERROR_LOGGED::BLOCKED
```

---

## Repair Safety Rules

### Allowed Repairs

✅ Safe to attempt:
- i18n key additions
- TypeScript type fixes within scope
- Zod schema updates within scope
- CSS fixes within scoped components
- QA script adjustments
- Component prop fixes

### Forbidden Repairs

❌ Never attempt without approval:
- Global `taskkill /IM node.exe /F`
- `Stop-Process -Name node`
- Deleting `node_modules`
- Resetting git (`git reset --hard`)
- Cleaning git (`git clean -fd`)
- Removing `package-lock.json`
- Disabling checks to force PASS
- Modifying backend/auth/RLS
- Installing new dependencies

---

## Repair Decision Flow

```
Failure detected
    |
    v
Classify failure type
    |
    +------------------+------------------+
    |                                     |
    v                                     v
TOOLING_FAILURE                    PRODUCT_BUG
    |                                     |
    v                                     v
Tooling Repair Engine          System Repair Engine
    |                                     |
    v                                     v
Safe to auto-fix?              In current scope?
    |                                     |
    +--------+--------+                  +--------+--------+
    |                 |                  |                 |
    YES               NO                 YES               NO
    |                 |                  |                 |
    v                 v                  v                 v
Apply fix      Request approval    Apply fix      Request approval
    |                 |                  |                 |
    v                 v                  v                 v
FIX stamp       FIX stamp          FIX stamp       FIX stamp
PASS/BLOCKED    BLOCKED            PASS/BLOCKED    BLOCKED
```

---

## Evidence Gates After Repair

After any repair, verify:

1. **Source review** — Read affected file(s)
2. **Code diff audit** — Verify only allowed files changed
3. **Type check** — `npm run typecheck` (if TS affected)
4. **i18n scan** — `npm run i18n:visible` (if text affected)
5. **UI title check** — `npm run ui:titles` (if routes affected)
6. **Browser QA** — Playwright screenshots (if UI affected)
7. **Console logs** — Check for errors (if backend affected)
8. **Save/reload proof** — Verify persistence (if data affected)
9. **Git isolation** — `git status --short`, `git diff --name-only`

---

## Example Repair Request/Response

### Request

```markdown
## Repair Request

### Failure Summary
TypeScript compilation failing after adding new Brand Card component.

### Exact Error
src/components/client/brand/BrandCard.tsx:42:15 - error TS2345: 
Argument of type 'Brand' is not assignable to parameter of type 'BrandCore'.

### Files Involved
- src/components/client/brand/BrandCard.tsx
- src/lib/brand/types.ts

### Forbidden Files
- supabase/migrations/*
- src/lib/supabase/*

### Allowed Scope
- src/components/client/brand/*
- src/lib/brand/types.ts

### Attempted Fixes
Tried casting with `as BrandCore` but caused runtime issues.

### Suspected Root Cause
Type mismatch between Brand and BrandCore interfaces.

### Requested Safe Repair Options
How to safely align these types?
```

### Response

```markdown
## Repair Response

### Likely Cause
Brand interface has fields not present in BrandCore, or vice versa.

### Safe Fix Options

| Option | Risk | Description |
|--------|------|-------------|
| A | Minimal | Update BrandCard to use Brand type directly |
| B | Low | Extend BrandCore in BrandCard props to accept both |
| C | Medium | Update type definitions to align interfaces |

### Minimal Fix First
Option A: Change BrandCard props to accept `Brand` instead of `BrandCore`.

### What Not To Touch
- Do not modify server-side types
- Do not change database types
- Do not modify BrandCore definition

### Validation After Fix
- `npm run typecheck` must pass
- Component must render without errors
- No runtime type errors

### FIX Stamp Expected
FIX::SystemRepair::TypeScript::TYPE_MISMATCH::UPDATED_PROPS::TYPECHECK_PASS::[PASS|BLOCKED]
```

---

## Repair Log

All repairs logged to: `reports/workspace/self-healing/` or task-specific report.

Log format:
```markdown
| Timestamp | Engine | Area | Bug Type | Action | Evidence | Status |
|-----------|--------|------|----------|--------|----------|--------|
```

---

*Contract version: 1.0.0*
*Applies to: All repair scenarios in SMS*
