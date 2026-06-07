# Smart Repair OS Protocol

## Purpose

Unified diagnostic and repair governance for the Smart Marketing System. **Never auto-fix sensitive infrastructure.** Always classify, diagnose, plan, evidence, and gate.

## Philosophy

> "Diagnose everything. Fix only what is safe. Gate everything sensitive."

```
Detect → Classify → Diagnose → Source Review → Safe Patch Plan → Fix if allowed → Validate → Evidence → Report → Conditional Staging
```

## Engines

### 1. Tooling Repair Engine (`scripts/tooling/cascade-self-healing-engine.mjs`)

**Purpose:** Repair tooling/browser/CDP/Playwright/MCP/dev server/Turbopack/test runner/Git tooling failures.

**Safe auto-fixes:**
- CDP down → detect, optionally launch Chrome with external profile
- Dev server unresponsive → detect stale PID, optionally restart (targeted, never global kill)
- Screenshot timeout → fallback ladder (viewport → fullPage → clip → jpeg → animations disabled → raw CDP)
- Terminal hang / PowerShell quoting → use temp `.ps1` files
- Chrome profile inside project tree → quarantine to external dir
- Turbopack watcher issue / stale bundle → targeted dev server restart
- Git index lock → detect and report (do not auto-fix without approval)

**Forbidden auto-fixes:**
- Global `taskkill /IM node.exe /F`
- `Stop-Process -Name node`
- Forcing Chrome kill without PID check
- Modifying `.mcp.json`
- OAuth bypass or cookie copying

### 2. System Repair Engine (`scripts/tooling/cascade-system-repair-engine.mjs`)

**Purpose:** Repair bugs inside the codebase **only** if the bug is:
- Proven (reproducible or clearly evidenced)
- Inside the current task scope
- Does not require infra/security changes
- Verifiable after fix

**Safe auto-fix categories:**
- Missing i18n key or wrong namespace
- Raw translation key exposed
- TypeScript type mismatch inside scoped files
- Zod validation stripping fields (missing schema entry)
- Snake_case/camelCase mapping mismatch inside scope
- QA script selector or timing bug
- RSC boundary issue inside scoped component
- UI overflow inside scoped component
- Save/reload mismatch if cause is inside scoped server action or validation

**Forbidden auto-fix categories (always stop for approval):**
- Auth changes (login, OAuth, session, callback routes)
- Supabase RLS / schema / migrations / storage
- `package.json` / `package-lock.json` changes
- `.env` / `.mcp.json` / environment changes
- Service role usage
- Direct DB writes outside server actions
- Deleting live data
- Payment / billing changes
- Global git reset / clean / restore
- Commit / push / staging (separate gate required)
- Changes outside current task scope

## Failure Classes

| Class | Description | Engine | Auto-fix? |
|-------|-------------|--------|-----------|
| `TOOLING_FAILURE` | Browser, CDP, Playwright, dev server, terminal, git tooling | Tooling Repair | Yes, if safe |
| `TEST_FAILURE` | QA script selector, timing, assertion, DOM detection | System Repair | Yes, if in scope |
| `PRODUCT_BUG_SAFE` | i18n, TS type, Zod schema, UI scoped component | System Repair | Yes, if in scope |
| `PRODUCT_BUG_REQUIRES_APPROVAL` | Product bug that touches auth, data, or infra boundary | System Repair | **No** — stop |
| `INFRA_OR_SECURITY_BLOCKER` | RLS, schema, migration, env, package, service role | Both | **No** — stop |

## Safety Levels

| Level | Name | What It Means |
|-------|------|---------------|
| 1 | **Diagnose Only** | Classify the issue, emit report, stop |
| 2 | **Tooling Auto-fix** | Safe tooling repairs (CDP, dev server, screenshot) |
| 3 | **Scoped System Bug Auto-fix** | Product code fix inside current scope with evidence gates |
| 4 | **Sensitive Infra Requires Approval** | Auth, Supabase, schema, env — user must explicitly approve |
| 5 | **Forbidden Automatic Changes** | Never auto-fix: billing, data deletion, commit/push, global reset |

## Approval Gates

If a bug touches ANY of the following, the engine must emit `SMART_REPAIR_REQUIRES_USER_APPROVAL` and stop:

- Auth (login, OAuth, session, callback, middleware)
- Supabase (RLS, schema, migrations, storage policies)
- `package.json`, `package-lock.json`, `npm install`
- `.env`, `.mcp.json`, environment variables
- Data deletion or destructive DB operations
- Service role key usage
- Billing / payment / subscription
- External API keys
- Changes outside the current task scope

## FIX Stamp Protocol

Format:
```
FIX::<engine>::<area>::<bug_type>::<action>::<evidence>::<status>
```

- **engine**: `ToolingRepair` | `SystemRepair`
- **area**: domain (e.g., `Chrome_CDP`, `next-intl`, `BrandDnaValidation`)
- **bug_type**: short descriptor (e.g., `MISSING_KEY`, `ZOD_STRIPPING_FIELDS`)
- **action**: what was done (e.g., `ADDED_TRANSLATION_KEY`, `UPDATED_SCHEMA`)
- **evidence**: proof (e.g., `RAW_KEYS_ZERO`, `RELOAD_PERSISTENCE_TRUE`)
- **status**: `PASS` | `BLOCKED` | `FAILED`

Examples:
```
FIX::ToolingRepair::Chrome_CDP::PROFILE_INSIDE_PROJECT::MOVED_PROFILE_OUTSIDE_PROJECT::CDP_READY::PASS
FIX::SystemRepair::next-intl::MISSING_KEY::ADDED_TRANSLATION_KEY::RAW_KEYS_ZERO::PASS
FIX::SystemRepair::BrandDnaValidation::ZOD_STRIPPING_FIELDS::UPDATED_SCHEMA::RELOAD_PERSISTENCE_TRUE::PASS
FIX::SystemRepair::Supabase_RLS::PERMISSION_DENIED::STOPPED_FOR_USER_APPROVAL::REAL_ERROR_CAPTURED::BLOCKED
```

## Evidence Gates

Every fix must be followed by:

1. **Source review** — read the affected file(s)
2. **Code diff audit** — verify only allowed files changed
3. **Type check** if TypeScript affected (`npm run typecheck`)
4. **i18n scan** if text/i18n affected (`npm run i18n:visible`)
5. **UI title check** if routes affected (`npm run ui:titles`)
6. **Browser QA** if UI affected (Playwright MCP screenshots)
7. **Logs** if backend/server action affected (console + network)
8. **Save/reload proof** if persistence affected
9. **Git isolation check** — `git status --short`, `git diff --name-only`

## Staging Rule

No staging unless:
- All evidence gates pass
- No forbidden files changed
- No unresolved blocker
- Exact file staging only (`git add <file>`)
- **Never** `git add .`
- **Never** `git add -A`

## Scope Enforcement

### `assertScopeAllowed(filePath, allowedScope)`

Returns `true` if `filePath` is within `allowedScope`. Otherwise blocks with `OUT_OF_SCOPE`.

### `assertForbiddenNotTouched(diffFiles)`

Blocks if any diff file matches:
- `package.json`
- `package-lock.json`
- `.env`
- `.mcp.json`
- `migrations/`
- `supabase/`
- `auth/` routes
- `dashboard/` (unless task scope explicitly includes it)

## Engine Self-Test Requirements

Each engine must have `--self-test` CLI mode that:
- Validates internal logic (classification, scope checks, FIX stamps)
- Does **not** launch browser
- Does **not** kill processes
- Does **not** modify product files
- Does **not** access secrets

## Command Reference

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
