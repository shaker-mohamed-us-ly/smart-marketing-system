# Smart Repair OS

## What is Smart Repair OS?

Smart Repair OS is a unified diagnostic and repair governance layer for the Smart Marketing System. It does **not** mean "fix everything automatically." It means:

> **"Diagnose everything. Fix only what is safe. Gate everything sensitive."**

## Two Engines

### 1. Tooling Repair Engine

Handles tooling, browser, CDP, Playwright, dev server, and infrastructure recovery.

**Location:** `scripts/tooling/cascade-self-healing-engine.mjs`

**What it repairs:**
- CDP down / Chrome not responding
- Dev server unresponsive
- Screenshot capture failures
- Terminal / PowerShell execution issues
- Chrome profile inside project tree
- Turbopack watcher issues
- Git index lock detection

**What it never does:**
- Modify product source code
- Kill processes globally (`taskkill /IM node.exe`)
- Bypass OAuth or fake login
- Auto-commit or auto-push
- Modify `.mcp.json`

### 2. System Repair Engine

Diagnoses and plans repairs for bugs inside the codebase — **only** if the bug is:
- Proven and reproducible
- Inside the current task scope
- Does not require infrastructure/security changes
- Verifiable after fix

**Location:** `scripts/tooling/cascade-system-repair-engine.mjs`

**What it repairs:**
- Missing i18n keys or wrong namespaces
- TypeScript type mismatches inside scope
- Zod validation stripping fields
- QA script selector/timing bugs
- UI overflow inside scoped components
- RSC boundary issues inside scope
- Save/reload mismatch (if cause is in scoped component or server action)

**What it never does:**
- Auth changes
- Supabase RLS/schema/migrations
- Package/env changes
- Direct DB writes
- Data deletion
- Changes outside current task scope

## Safety Levels

| Level | Name | Meaning |
|-------|------|---------|
| 1 | **Diagnose Only** | Classify the issue, emit report, stop |
| 2 | **Tooling Auto-fix** | Safe tooling repairs (CDP, dev server, screenshot) |
| 3 | **Scoped System Bug Auto-fix** | Product code fix inside current scope with evidence gates |
| 4 | **Sensitive Infra Requires Approval** | Auth, Supabase, schema, env — user must explicitly approve |
| 5 | **Forbidden Automatic Changes** | Never auto-fix: billing, data deletion, commit/push, global reset |

## How FIX Stamps Work

Every repair action emits a FIX stamp:

```
FIX::<engine>::<area>::<bug_type>::<action>::<evidence>::<status>
```

**Examples:**
```
FIX::ToolingRepair::Chrome_CDP::PROFILE_INSIDE_PROJECT::MOVED_PROFILE_OUTSIDE_PROJECT::CDP_READY::PASS
FIX::SystemRepair::next-intl::MISSING_KEY::ADDED_TRANSLATION_KEY::RAW_KEYS_ZERO::PASS
FIX::SystemRepair::BrandDnaValidation::ZOD_STRIPPING_FIELDS::UPDATED_SCHEMA::RELOAD_PERSISTENCE_TRUE::PASS
FIX::SystemRepair::Supabase_RLS::PERMISSION_DENIED::STOPPED_FOR_USER_APPROVAL::REAL_ERROR_CAPTURED::BLOCKED
```

## How to Use in Cascade Prompts

When a failure occurs, Cascade should:

1. **Classify** using the appropriate engine:
   - Tooling symptom → `classifyFailure()`
   - System bug → `classifySystemIssue()`

2. **Determine safety level**:
   - Level 1-3 → Proceed with safe fix
   - Level 4 → Emit `SMART_REPAIR_REQUIRES_USER_APPROVAL` and stop
   - Level 5 → Emit `BLOCKED` and stop

3. **Create repair plan** (System Engine):
   - `createRepairPlan(issue, scope)` → files to read, validations required, browser proof needed

4. **Assert scope and forbidden files**:
   - `assertScopeAllowed(filePath, allowedScope)`
   - `assertForbiddenNotTouched(diffFiles)`

5. **Apply fix** (if all gates pass)

6. **Run evidence gates**:
   - `typecheck` if TS affected
   - `i18n:visible` if text/i18n affected
   - `ui:titles` if routes affected
   - Browser QA if UI affected
   - Save/reload proof if persistence affected

7. **Emit FIX stamp** and log event

8. **Git isolation check** — `git status --short`, `git diff --name-only`

## How to Add New Tools

1. Add entry to `TOOL_ADAPTERS` in `cascade-self-healing-engine.mjs`
2. Define:
   - `purpose`
   - `safeFixes` (array)
   - `forbiddenFixes` (array)
   - `evidence` (array)
3. Run `node scripts/tooling/cascade-self-healing-engine.mjs --validate-registry`
4. Document in `docs/tooling/self-healing-tool-registry.md`

## How to Define Repair Scope

In your Cascade prompt, always specify:

```
Allowed scope: src/components/client/brand/*
Forbidden: auth, supabase, package.json, .env, dashboard
```

The System Repair Engine will:
- Allow fixes inside `src/components/client/brand/*`
- Block fixes touching forbidden categories
- Block fixes outside scope

## When to Stop

**Always stop and request user approval if:**
- The fix touches auth, OAuth, sessions, or login
- The fix touches Supabase RLS, schema, or migrations
- The fix requires `package.json`, `.env`, or `.mcp.json` changes
- The fix involves service role keys or direct DB writes
- The fix would delete live data
- The fix involves billing, payment, or subscriptions
- The fix is outside the current task scope
- The fix requires commit or push

**Stop phrase:** `SMART_REPAIR_REQUIRES_USER_APPROVAL`

## CLI Reference

```bash
# Tooling Repair Engine
node scripts/tooling/cascade-self-healing-engine.mjs --self-test
node scripts/tooling/cascade-self-healing-engine.mjs --print-protocol
node scripts/tooling/cascade-self-healing-engine.mjs --validate-registry

# System Repair Engine
node scripts/tooling/cascade-system-repair-engine.mjs --self-test
node scripts/tooling/cascade-system-repair-engine.mjs --print-policy

# Smart Repair OS (unified)
node scripts/tooling/smart-repair-os.mjs --self-test
node scripts/tooling/smart-repair-os.mjs --print-policy
node scripts/tooling/smart-repair-os.mjs --validate
node scripts/tooling/smart-repair-os.mjs --classify-sample
```

## Files

| File | Purpose |
|------|---------|
| `.devin/rules/smart-repair-os-protocol.md` | Unified governance protocol |
| `.devin/rules/self-healing-engine-protocol.md` | Tooling engine protocol |
| `scripts/tooling/cascade-self-healing-engine.mjs` | Tooling Repair Engine |
| `scripts/tooling/cascade-system-repair-engine.mjs` | System Repair Engine |
| `scripts/tooling/smart-repair-os.mjs` | Unified orchestrator |
| `docs/tooling/self-healing-tool-registry.md` | Tool adapter registry |
| `docs/tooling/smart-repair-os.md` | This documentation |
