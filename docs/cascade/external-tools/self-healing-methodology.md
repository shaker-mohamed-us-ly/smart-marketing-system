# Self-Healing Methodology

## Purpose

Systematic failure classification and safe repair for tooling issues and scoped system bugs.

**Engines:**
- **Tooling Repair Engine:** Browser/CDP/dev server/Git tooling
- **System Repair Engine:** i18n, TypeScript, Zod, UI bugs within scope
- **Smart Repair OS:** Unified orchestrator with safety levels

---

## Failure Classification

| Class | Description | Engine | Auto-fix? |
|-------|-------------|--------|-----------|
| `TOOLING_FAILURE` | Browser, CDP, Playwright, dev server, terminal, git | Tooling Repair | Yes, if safe |
| `TEST_FAILURE` | QA script selector, timing, assertion | System Repair | Yes, if in scope |
| `PRODUCT_BUG_SAFE` | i18n, TS type, Zod schema, UI scoped | System Repair | Yes, if in scope |
| `PRODUCT_BUG_REQUIRES_APPROVAL` | Bug touching auth/data/infra | System Repair | **No** — stop |
| `INFRA_OR_SECURITY_BLOCKER` | RLS, schema, migration, env, package | Both | **No** — stop |

---

## Safety Levels

| Level | Name | Action |
|-------|------|--------|
| 1 | **Diagnose Only** | Classify, emit report, stop |
| 2 | **Tooling Auto-fix** | Safe repairs (CDP, dev server, screenshots) |
| 3 | **Scoped System Bug** | Product code fix in current scope |
| 4 | **Sensitive Infra** | Requires user approval |
| 5 | **Forbidden** | Never auto-fix (billing, data deletion, commit/push) |

---

## FIX Stamp Protocol

Every actual repair produces:

```
FIX::<engine>::<area>::<bug_type>::<action>::<evidence>::<status>
```

| Field | Examples |
|-------|----------|
| **engine** | `ToolingRepair`, `SystemRepair` |
| **area** | `Chrome_CDP`, `next-intl`, `BrandDnaValidation` |
| **bug_type** | `MISSING_KEY`, `ZOD_STRIPPING_FIELDS`, `CDP_DOWN` |
| **action** | `ADDED_TRANSLATION_KEY`, `RESTARTED_DEVSERVER` |
| **evidence** | `RAW_KEYS_ZERO`, `CDP_READY`, `TYPECHECK_PASS` |
| **status** | `PASS`, `BLOCKED`, `FAILED` |

### Examples

```
FIX::ToolingRepair::Chrome_CDP::PROFILE_INSIDE_PROJECT::MOVED_PROFILE_OUTSIDE::CDP_READY::PASS

FIX::SystemRepair::next-intl::MISSING_KEY::ADDED_TRANSLATION_KEY::RAW_KEYS_ZERO::PASS

FIX::SystemRepair::TypeScript::TYPE_MISMATCH::UPDATED_INTERFACE::TYPECHECK_PASS::PASS

FIX::SystemRepair::Supabase_RLS::PERMISSION_DENIED::STOPPED_FOR_APPROVAL::REAL_ERROR_LOGGED::BLOCKED
```

---

## Tooling Repair Engine

### Safe Auto-fixes

| Issue | Safe Fix |
|-------|----------|
| CDP down | Detect, optionally launch Chrome with external profile |
| Dev server unresponsive | Detect stale PID, optionally restart (targeted) |
| Screenshot timeout | Fallback ladder (viewport → fullPage → clip → jpeg → raw CDP) |
| Terminal hang | Use temp `.ps1` files for PowerShell |
| Chrome profile inside project | Quarantine to external dir |
| Turbopack watcher issue | Targeted dev server restart |
| Git index lock | Detect and report (don't auto-fix) |

### Forbidden Auto-fixes

❌ Never:
- `taskkill /IM node.exe /F`
- `Stop-Process -Name node`
- Chrome kill without PID check
- Modifying `.mcp.json`
- OAuth bypass or cookie copying

---

## System Repair Engine

### Safe Auto-fixes (Level 3)

| Issue | Safe Fix |
|-------|----------|
| Missing i18n key | Add translation key |
| Raw translation key exposed | Wrap with `t('key')` |
| TypeScript type mismatch (in scope) | Update interface |
| Zod schema stripping fields | Add missing schema entry |
| Snake/camelCase mismatch (in scope) | Fix mapping |
| QA script selector bug | Update selector |
| RSC boundary issue (in scope) | Add "use client" or restructure |
| UI overflow (in scope) | Fix CSS |
| Save/reload mismatch (in scope) | Fix server action or validation |

### Forbidden (Level 4-5)

❌ Never without approval:
- Auth changes (login, OAuth, session)
- Supabase RLS/schema/migrations/storage
- `package.json` changes
- `.env` changes
- Data deletion
- Global git reset/clean
- Commit/push operations

---

## Evidence Gates

Every fix must verify:

1. **Source review** — Read affected file(s)
2. **Code diff audit** — Verify only allowed files changed
3. **Type check** — `npm run typecheck` (if TS affected)
4. **i18n scan** — `npm run i18n:visible` (if text affected)
5. **UI title check** — `npm run ui:titles` (if routes affected)
6. **Browser QA** — Playwright screenshots (if UI affected)
7. **Console logs** — Check for errors
8. **Save/reload proof** — Verify persistence
9. **Git isolation** — `git status --short`

---

## CLI Commands

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
node scripts/tooling/smart-repair-os.mjs --validate
node scripts/tooling/smart-repair-os.mjs --classify-sample
```

---

## Process Safety

- **Never** `taskkill /IM node.exe /F` — kills MCP servers
- **Never** `Stop-Process -Name node` — same problem
- **Only** targeted `Stop-Process -Id <pid>` for verified `next dev` PIDs
- Chrome profile **outside** project tree (`D:/sms-cdp-profiles/`)

---

## Auth Safety

- **Never** use Google OAuth automation
- **Never** bypass login
- **Never** copy cookies
- **Never** fake login state
- Auth recovery navigates to `/login` and blocks if Google detected

---

## Self-Test Contract

Every engine must have `--self-test` that:
- Validates internal logic
- Does **not** launch browser
- Does **not** kill processes
- Does **not** modify product files
- Does **not** access secrets

---

## Logging

All events append to:
- `reports/workspace/BRAND_VNEXT_SELF_HEALING_LOG.md`
- Task-specific reports

Format:
```
Timestamp | Phase | FailureType | Symptom | Action | Attempt | Result | FIX
```

---

## Safe Use

✅ Always:
- Classify failures before attempting fix
- Use appropriate engine for failure type
- Emit FIX stamp for every repair
- Verify all evidence gates after fix
- Document in report
- Stop at Level 4-5 (approval required)

---

## Forbidden

❌ Never:
- Auto-fix without classification
- Skip evidence gates
- Apply Level 4-5 fixes without approval
- Kill all Node processes blindly
- Delete node_modules or lockfiles without approval
- Reset git without approval
- Claim PASS without evidence

---

*Methodology: Smart Repair OS Protocol*
*Engines: cascade-self-healing-engine.mjs, cascade-system-repair-engine.mjs, smart-repair-os.mjs*
*Status: Fully operational*
