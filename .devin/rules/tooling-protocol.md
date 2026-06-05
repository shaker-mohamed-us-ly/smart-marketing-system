# Tooling Protocol

## Allowed Tools (Safe to Use)

| Tool | How to Invoke | When to Use |
|------|---------------|-------------|
| **Playwright MCP** (`mcp1_browser_*`) | IDE tools | UI screenshots, snapshots, console/network logs, computed styles, accessibility checks |
| **next-devtools MCP** | `npx -y next-devtools-mcp@latest` | Next.js framework inspection |
| **Knip** | `npm run tool:knip` | Before broad cleanup / refactors to detect dead code |
| **dependency-cruiser** | `npm run tool:depcruise` | Before architecture-sensitive changes |
| **TypeScript** | `npm run typecheck` | Type checking without emit |
| **ESLint** | `npm run lint` | Code linting |
| **@axe-core/playwright** | `npm run tool:a11y:dashboard` | Accessibility smoke test (requires dev server) |

## Caution Tools (Use With Care)

| Tool | Caveat | How to Use Safely |
|------|--------|-------------------|
| **Context7 MCP** | Transport may be closed until IDE restart | Use only after confirming transport is alive |
| **pysemgrep (Semgrep)** | Only works via full path; `semgrep.exe` wrapper is broken | Use wrapper: `npm run tool:security:semgrep` |
| **Gitleaks** | Only works via full path; PATH not refreshed | Use wrapper: `npm run tool:security:gitleaks` |
| **Serena CLI** | Python 3.14 Pydantic warning; pip conflict with Semgrep | Do not rely on it for long-running tasks until isolated in a venv |
| **@axe-core/playwright** | Needs running dev server | If dev server is down, result is `SKIPPED_DEV_SERVER_NOT_RUNNING` (not PASS) |

## Disabled / Deferred Tools

| Tool | Status | Rule |
|------|--------|------|
| **OSV-Scanner** | DEFERRED | Never run `reports/tooling/osv-scanner.exe`. It is blocked by Windows SmartScreen/MOTW. Install officially later. |
| **Sequential Thinking MCP** | NOT YET ACTIVE | Added to `.mcp.json` but requires IDE restart before use. Do not claim active until visible in MCP list. |

## AI Website Cloner Template — Mandatory Methodology

This is a methodology, not a tool to install:

1. **Inspect** — Study the target design system and layout.
2. **Capture** — Document key visual tokens, spacing, typography.
3. **Extract** — Pull out reusable patterns and components.
4. **Analyze** — Map patterns to existing project architecture.
5. **Specify** — Write exact specs for the implementation.
6. **Brainstorm** — Evaluate trade-offs (performance, i18n, RTL, accessibility).
7. **Implement** — Build within project constraints (Next.js, i18n, Tailwind, etc.).
8. **Validate** — Screenshot, typecheck, i18n scan, axe scan.

**Prohibited:**
- Do not clone websites.
- Do not install AI Website Cloner repos.
- Do not copy external code/assets.
- Do not assume visual PASS without evidence.

## Stale IDE stdio / MCP Transport Recovery Protocol

### Error Signature

| Error | Code | Meaning |
|-------|------|---------|
| `Cannot call write after a stream was destroyed` | `-32099` | IDE's stdio pipe to an MCP server is broken |
| `transport error: transport closed` | various | JSON-RPC transport disconnected |

> **This is NOT a product code bug.** The error originates from the IDE's MCP transport layer, not application code.

### Root Cause

MCP servers communicate with the IDE via stdin/stdout pipes. When the pipe breaks (IDE refresh, terminal reset, internal timeout), the IDE cannot reach the MCP server even though the **server process is still alive**.

### Required First Response (NEVER skip)

1. **Do NOT kill `node.exe` globally.** The MCP server may still be running.
2. **Check processes:** `wmic process where "name='node.exe'" get ProcessId,CommandLine`
3. **Check port 3000:** `netstat -ano | findstr :3000`
4. **Test Playwright MCP:** `mcp1_browser_navigate` to `about:blank`
5. **Test Context7 MCP:** `mcp0_resolve-library-id` for `"next.js"`

### Process Classification

| Type | CommandLine Pattern | Action |
|------|---------------------|--------|
| `NEXT_DEV_SERVER` | `next/dist/bin/next` or `start-server.js` | Leave running — do not stop without user approval |
| `PLAYWRIGHT_MCP` | `@playwright/mcp/cli.js` | May be alive but unreachable |
| `CONTEXT7_MCP` | `@upstash/context7-mcp` | May be alive but unreachable |
| `UNKNOWN_NODE` | Unrecognized | Verify before stopping |

### Recovery Sequence

1. **Wait 30–60 seconds.** IDE may auto-reconnect to existing MCP processes.
2. **Re-test MCP.** If `about:blank` and `resolve-library-id` work, transport has self-healed.
3. **If still broken:** Ask user for approval to restart Windsurf/Cascade IDE.
4. **If a specific PID must be stopped:** Get explicit user approval for the exact PID. Never use blanket `taskkill`.

### Terminal Discipline

Keep long-running processes in separate terminals to avoid shared stdio transport breakage:

| Terminal | Purpose | Lifecycle |
|----------|---------|-----------|
| **A** | Dev server (`npm run dev`) | Persistent; do not close |
| **B** | Validation (`typecheck`, `i18n:visible`) | Short-lived |
| **C** | Git operations | Short-lived |
| **D** | MCP/browser tests | Short-lived; avoid during fragile states |

**Avoid parallel `npm` commands** when stability matters. Sequential execution prevents resource competition that can trigger IDE resets.

### Browser QA Evidence Classification

| MCP State | Allowed Claim |
|-----------|---------------|
| Transport verified (`about:blank` works) | Full Browser PASS with screenshots |
| Transport broken, dev server running | `CLI_FALLBACK_EVIDENCE` — document as partial |
| Transport broken, dev server down | `NO_EVIDENCE` — do not claim PASS |

> **CLI screenshot fallback does NOT equal MCP Browser Proof.** Console logs, network requests, and computed styles from Playwright MCP are the required standard.

### Forbidden Commands

| Command | Why Forbidden | Safe Alternative |
|---------|-------------|-----------------|
| `taskkill /IM node.exe /F` | Kills ALL node processes including MCP servers | Targeted PID stop with user approval |
| `Stop-Process -Name node` | Same blanket kill | Targeted `Stop-Process -Id <pid>` with approval |
| Force-kill any MCP without PID check | Breaks transport, orphan processes | Verify PID, ask user, then stop |
| Stopping dev server terminal while MCP active | Breaks shared stdio transport | Keep dev server terminal separate |

### `.mcp.json` Rule

Do not modify `.mcp.json` without explicit user approval. Playwright MCP and Context7 MCP are IDE-integrated and NOT listed in `.mcp.json`; editing the file will not fix transport issues and may break other MCP servers.
