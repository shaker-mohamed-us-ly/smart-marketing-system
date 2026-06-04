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
