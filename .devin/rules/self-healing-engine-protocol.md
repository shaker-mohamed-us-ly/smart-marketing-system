# Self-Healing Engine Protocol

## Scope

Tooling-level repair only. This engine does **not** modify product source code. It repairs:
- Browser/CDP connectivity
- Dev server responsiveness
- Screenshot capture failures
- Terminal/CLI execution issues
- Git tooling problems
- Chrome profile hygiene

## Architecture

### Core Functions

| Function | Purpose |
|----------|---------|
| `classifyFailure(symptom)` | Classify error into `TOOLING_FAILURE`, `TEST_FAILURE`, `PRODUCT_BUG`, `INFRA_OR_SECURITY_BLOCKER` |
| `fixStamp(toolOrArea, failureType, actionTaken, evidence, status)` | Emit structured FIX stamp and log event |
| `logHealingEvent(event)` | Append-only log to `reports/workspace/BRAND_VNEXT_SELF_HEALING_LOG.md` |
| `retryWithLimit(taskName, fn, maxAttempts)` | Retry a function up to 3 times with per-task counters |
| `checkCDP()` | HTTP probe CDP port for Chrome debug readiness |
| `checkDevServer(route, timeout)` | HTTP probe localhost:3000 for dev server responsiveness |
| `findNextDevPids()` | Targeted PowerShell scan for `next dev` / `start-server` PIDs only |
| `recoverCDP({ confirmDestructive })` | Launch Chrome with external profile (gated) |
| `recoverDevServer({ confirmDestructive })` | Stop stale next dev PID(s), restart dev server (gated) |
| `screenshotWithFallback(page, name)` | 6-tier fallback ladder for screenshot capture |
| `handleAuthRecovery(page)` | Navigate to login, detect OAuth, block if Google detected |
| `quarantineProjectChromeProfiles()` | Move Chrome profiles from `reports/workspace/` to external quarantine |
| `stopIfForbiddenChangeNeeded(reason)` | Emit BLOCKED stamp and return blocked status |

### Tool Adapter Registry

```javascript
const TOOL_ADAPTERS = {
  Playwright_MCP: {
    safeFixes: ['screenshotWithFallback', 'page navigation retry', 'context refresh'],
    forbiddenFixes: ['cookie injection', 'OAuth bypass', 'fake login'],
    evidence: ['screenshot path', 'page URL', 'console messages'],
  },
  Chrome_CDP: {
    safeFixes: ['recoverCDP with external profile', 'checkCDP probe'],
    forbiddenFixes: ['kill all Chrome processes', 'modify Chrome internals', 'copy profiles into project'],
    evidence: ['CDP /json/version response', 'profile path outside project'],
  },
  DevServer_NextJS: {
    safeFixes: ['checkDevServer probe', 'targeted PID stop + restart (gated)'],
    forbiddenFixes: ['global node kill', 'delete .next/ without approval', 'modify next.config'],
    evidence: ['HTTP status', 'PID list', 'restart success'],
  },
  Turbopack: {
    safeFixes: ['dev server restart (gated)'],
    forbiddenFixes: ['modify Turbopack internals', 'force webpack fallback'],
    evidence: ['dev server responsive', 'bundle status'],
  },
  next_intl: {
    safeFixes: [], // System Repair Engine handles this
    forbiddenFixes: ['auto-edit i18n messages without approval'],
    evidence: ['i18n scan results'],
  },
  Git: {
    safeFixes: ['detect index.lock', 'report status'],
    forbiddenFixes: ['auto git reset', 'auto git clean', 'auto commit/push', 'broad git add'],
    evidence: ['git status output', 'git diff --stat'],
  },
  Context7: {
    safeFixes: ['retry after transport recovery', 'fallback to web docs'],
    forbiddenFixes: ['modify .mcp.json', 'kill Context7 process without PID check'],
    evidence: ['transport test result', 'fallback used'],
  },
  Visual_Analyzer_Generic: {
    safeFixes: ['fallback screenshot methods'],
    forbiddenFixes: ['auto-edit CSS without approval', 'auto-edit product code'],
    evidence: ['screenshot path', 'method used'],
  },
  AI_Website_Cloner_Methodology: {
    safeFixes: ['methodology reference only'],
    forbiddenFixes: ['clone external website', 'install cloner repo', 'copy external assets'],
    evidence: ['methodology step checklist'],
  },
};
```

### Destructive Action Gating

Any action that:
- Launches/kills a process
- Stops a dev server
- Moves files outside the project

**Must** require `confirmDestructive: true`. Without it, the engine:
1. Detects the issue
2. Logs it
3. Emits a BLOCKED FIX stamp
4. Returns `{ blocked: true }`

### Process Safety

- **Never** `taskkill /IM node.exe /F`
- **Never** `Stop-Process -Name node`
- **Only** targeted `Stop-Process -Id <pid>` for verified `next dev` PIDs
- Chrome profile must be **outside** the project tree (`D:/sms-cdp-profiles/`)
- Quarantine moves profiles from `reports/workspace/` to external dir

### Auth Safety

- **Never** use Google OAuth automation
- **Never** bypass login
- **Never** copy cookies
- **Never** fake login state
- `handleAuthRecovery` navigates to `/login` and blocks if `accounts.google.com` is detected

### Self-Test Contract

```bash
node scripts/tooling/cascade-self-healing-engine.mjs --self-test
```

Must verify:
- `classifyFailure` returns correct type for known symptoms
- `fixStamp` format is valid
- `retryWithLimit` succeeds within max attempts
- `isPathInsideProject` correctly detects project boundary
- `getChromeExternalProfilePath` returns path outside project
- `buildToolAdapter` returns valid adapter config
- `validateToolRegistry` confirms all adapters have required fields
- `stopIfForbiddenChangeNeeded` returns blocked status
- No browser launched
- No process killed
- No product file modified
- No secret accessed

## CLI

```bash
# Self-test (required)
node scripts/tooling/cascade-self-healing-engine.mjs --self-test

# Print protocol
node scripts/tooling/cascade-self-healing-engine.mjs --print-protocol

# Validate registry
node scripts/tooling/cascade-self-healing-engine.mjs --validate-registry

# Recovery run (gated)
node scripts/tooling/cascade-self-healing-engine.mjs --recover-browser --recover-devserver --prepare-vnext-qa --confirm-destructive
```

## Logging

All events append to `reports/workspace/BRAND_VNEXT_SELF_HEALING_LOG.md`.

Log format: markdown table with columns:
`Timestamp | Phase | FailureType | Symptom | SourceUsed | Action | Attempt | Result | Continued | ApprovalRequired | FIX`
