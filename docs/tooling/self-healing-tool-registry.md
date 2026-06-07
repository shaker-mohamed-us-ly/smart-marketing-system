# Self-Healing Tool Registry

## Smart Repair OS Overview

The Smart Repair OS is a unified diagnostic and repair governance system for the Smart Marketing System. It consists of two engines:

1. **Tooling Repair Engine** — Repairs browser/CDP/Playwright/MCP/dev server/Turbopack/Git tooling failures.
2. **System Repair Engine** — Diagnoses and plans repairs for scoped system bugs (i18n, TypeScript, Zod, UI, test scripts).

Both engines follow the same safety protocol: **detect → classify → diagnose → plan → fix if allowed → validate → evidence → report → conditional staging**.

---

## Tooling Repair Engine Adapters

### Playwright_MCP

- **Purpose:** UI screenshots, snapshots, console/network logs, computed styles, accessibility checks
- **Safe auto-fixes:** `screenshotWithFallback`, page navigation retry, context refresh
- **Forbidden fixes:** Cookie injection, OAuth bypass, fake login
- **Required evidence:** Screenshot path, page URL, console messages
- **FIX stamp example:** `FIX::ToolingRepair::Playwright_MCP::SCREENSHOT_TIMEOUT::USED_FULLPAGE_FALLBACK::CAPTURED_identity_tab.png::PASS`
- **Approval conditions:** Never requires approval for safe fixes; OAuth/auth detection always blocks

### Chrome_CDP

- **Purpose:** Chrome DevTools Protocol for authenticated browser automation
- **Safe auto-fixes:** `recoverCDP` with external profile, `checkCDP` probe
- **Forbidden fixes:** Kill all Chrome processes, modify Chrome internals, copy profiles into project
- **Required evidence:** CDP `/json/version` response, profile path outside project
- **FIX stamp example:** `FIX::ToolingRepair::Chrome_CDP::CDP_DOWN::LAUNCHED_CHROME_EXTERNAL_PROFILE::CDP_PORT_9222_READY::PASS`
- **Approval conditions:** Launching Chrome is gated behind `--confirm-destructive`; without it, emits BLOCKED

### DevServer_NextJS

- **Purpose:** Next.js dev server on localhost:3000
- **Safe auto-fixes:** `checkDevServer` probe, targeted PID stop + restart (gated)
- **Forbidden fixes:** Global node kill, delete `.next/` without approval, modify `next.config`
- **Required evidence:** HTTP status, PID list, restart success
- **FIX stamp example:** `FIX::ToolingRepair::DevServer_NextJS::DEV_SERVER_UNRESPONSIVE::RESTARTED_NEXT_DEV_TARGETED_PID::LOCALHOST_3000_200::PASS`
- **Approval conditions:** Restart is gated behind `--confirm-destructive`

### Turbopack

- **Purpose:** Next.js bundler/watcher
- **Safe auto-fixes:** Dev server restart (gated)
- **Forbidden fixes:** Modify Turbopack internals, force webpack fallback
- **Required evidence:** Dev server responsive, bundle status
- **FIX stamp example:** `FIX::ToolingRepair::Turbopack::WATCHER_PANIC::DEV_SERVER_RESTART::BUNDLE_READY::PASS`
- **Approval conditions:** Same as DevServer (gated restart)

### next_intl

- **Purpose:** i18n message management
- **Safe auto-fixes:** None (handled by System Repair Engine)
- **Forbidden fixes:** Auto-edit i18n messages without approval
- **Required evidence:** `i18n:visible` scan results
- **FIX stamp example:** `FIX::SystemRepair::next-intl::MISSING_KEY::ADDED_TRANSLATION_KEY::RAW_KEYS_ZERO::PASS`
- **Approval conditions:** System engine classifies as `SAFE_I18N_FIX` only if inside current task scope

### Git

- **Purpose:** Version control operations
- **Safe auto-fixes:** Detect `index.lock`, report status
- **Forbidden fixes:** Auto git reset, auto git clean, auto commit/push, broad git add
- **Required evidence:** `git status` output, `git diff --stat`
- **FIX stamp example:** `FIX::ToolingRepair::Git::INDEX_LOCK::DETECTED_AND_REPORTED::NO_AUTO_FIX::BLOCKED`
- **Approval conditions:** All git repair actions require user approval

### Context7

- **Purpose:** Library documentation lookup
- **Safe auto-fixes:** Retry after transport recovery, fallback to web docs
- **Forbidden fixes:** Modify `.mcp.json`, kill Context7 process without PID check
- **Required evidence:** Transport test result, fallback used
- **FIX stamp example:** `FIX::ToolingRepair::Context7::TRANSPORT_CLOSED::RETRY_AFTER_WAIT::FALLBACK_TO_WEB_DOCS::PASS`
- **Approval conditions:** Never kills MCP processes without explicit PID verification and user approval

### Visual_Analyzer_Generic

- **Purpose:** Visual QA and screenshot analysis
- **Safe auto-fixes:** Fallback screenshot methods
- **Forbidden fixes:** Auto-edit CSS without approval, auto-edit product code
- **Required evidence:** Screenshot path, method used
- **FIX stamp example:** `FIX::ToolingRepair::Visual_Analyzer::SCREENSHOT_FAILED::USED_JPEG_FALLBACK::CAPTURED_tab.jpg::PASS`
- **Approval conditions:** No auto-edits without user approval

### AI_Website_Cloner_Methodology

- **Purpose:** UI hierarchy and design pattern methodology only
- **Safe auto-fixes:** Methodology reference only
- **Forbidden fixes:** Clone external website, install cloner repo, copy external assets
- **Required evidence:** Methodology step checklist
- **FIX stamp example:** `FIX::ToolingRepair::AI_Cloner::METHODLOGY_REFERENCE::INSPECT_CAPTURE_EXTRACT_ANALYZE::CHECKLIST_COMPLETE::PASS`
- **Approval conditions:** Never clones or copies external code

---

## System Repair Engine Adapters/Categories

### i18nRepair

- **Purpose:** Fix missing i18n keys, wrong namespaces, raw translation keys
- **Safe auto-fixes:** Add missing key to `ar.ts` and `en.ts`, fix namespace reference
- **Forbidden fixes:** Auto-edit i18n without task scope, remove existing translations
- **Required evidence:** `i18n:visible` scan, `typecheck`, `ui:titles`
- **FIX stamp example:** `FIX::SystemRepair::next-intl::MISSING_KEY::ADDED_TRANSLATION_KEY::RAW_KEYS_ZERO::PASS`
- **Approval conditions:** Only if inside current task scope and no auth/Supabase changes needed

### TypeScriptRepair

- **Purpose:** Fix type mismatches inside scoped files
- **Safe auto-fixes:** Update type definitions, fix import paths inside scope
- **Forbidden fixes:** Modify global types, change framework types, modify `tsconfig.json`
- **Required evidence:** `typecheck` pass
- **FIX stamp example:** `FIX::SystemRepair::TypeScript::TYPE_MISMATCH::UPDATED_INTERFACE::TYPECHECK_ZERO::PASS`
- **Approval conditions:** Only inside current task scope

### ValidationRepair

- **Purpose:** Fix Zod validation stripping fields, schema mismatches
- **Safe auto-fixes:** Add missing fields to Zod schema, fix enum mapping
- **Forbidden fixes:** Remove validation rules, bypass validation, modify validation for auth/RLS
- **Required evidence:** `typecheck`, browser QA (save/reload proof)
- **FIX stamp example:** `FIX::SystemRepair::BrandDnaValidation::ZOD_STRIPPING_FIELDS::UPDATED_SCHEMA::RELOAD_PERSISTENCE_TRUE::PASS`
- **Approval conditions:** Only if validation is for scoped product feature (e.g., brand DNA)

### UIComponentRepair

- **Purpose:** Fix UI overflow, layout breaks inside scoped components
- **Safe auto-fixes:** Adjust Tailwind classes, fix conditional rendering inside scope
- **Forbidden fixes:** Modify global CSS, change design tokens, modify layout shell
- **Required evidence:** Browser screenshot, `typecheck`, `ui:titles`
- **FIX stamp example:** `FIX::SystemRepair::UIComponent::OVERFLOW::ADJUSTED_TAILWIND_CLASSES::SCREENSHOT_MATCH::PASS`
- **Approval conditions:** Only inside current task scope component

### ServerActionRepair

- **Purpose:** Fix server action bugs inside scoped files
- **Safe auto-fixes:** Fix data merging logic, add diagnostics, fix return types
- **Forbidden fixes:** Modify auth middleware, modify RLS policies, direct DB writes outside actions
- **Required evidence:** Console logs, network logs, save/reload proof
- **FIX stamp example:** `FIX::SystemRepair::ServerAction::MERGE_LOGIC::FIXED_UPSERT_MERGE::CONSOLE_ZERO::PASS`
- **Approval conditions:** Only inside scoped server action file

### BrowserQAScriptRepair

- **Purpose:** Fix QA script selectors, timing, assertions
- **Safe auto-fixes:** Update selectors, increase wait times, add partial matching
- **Forbidden fixes:** Modify QA to skip real assertions, fake success signals
- **Required evidence:** Self-test pass, browser run pass
- **FIX stamp example:** `FIX::SystemRepair::BrowserQA::SELECTOR_BRITTLE::UPDATED_TO_PARTIAL_MATCH::QA_PASS::PASS`
- **Approval conditions:** Only QA script files, not product code

### PersistenceRepair

- **Purpose:** Fix save/reload mismatch bugs
- **Safe auto-fixes:** Fix state initialization, fix form submission, fix server action merge
- **Forbidden fixes:** Bypass validation, fake persistence signals
- **Required evidence:** Save click proof, reload proof, data matches
- **FIX stamp example:** `FIX::SystemRepair::Persistence::SAVE_NOT_PERSISTING::FIXED_STATE_INIT::RELOAD_DATA_MATCHES::PASS`
- **Approval conditions:** Only if cause is inside scoped component or server action

### RSCBoundaryRepair

- **Purpose:** Fix React Server Component boundary issues inside scope
- **Safe auto-fixes:** Move client directive, fix prop serialization, fix async boundaries
- **Forbidden fixes:** Change global RSC config, modify framework boundaries
- **Required evidence:** `typecheck`, browser screenshot, hydration check
- **FIX stamp example:** `FIX::SystemRepair::RSCBoundary::SERIALIZATION_ERROR::FIXED_PROP_PASSING::HYDRATION_CLEAN::PASS`
- **Approval conditions:** Only inside scoped component files
