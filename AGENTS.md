<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Smart Marketing System — Cascade Operating System

## Project Identity
- **Name:** Smart Marketing System / AI Brand & Marketing OS
- **Type:** Arabic-first SaaS platform
- **Stack:** Next.js frontend, Supabase backend
- **Design Language:** Premium, Graphite/Charcoal dark, warm gray/off-white light, Centered Canvas layout
- **RTL/LTR:** Mandatory. Arabic is first-class; English is secondary.

## Core Rules
- **No hardcoded visible text.** Every UI string must pass through i18n.
- **No raw translation keys** exposed to the user.
- **No empty headings** or incomplete labels.
- **RTL/LTR and i18n are mandatory** on every screen and component.
- **No Supabase/Auth/Backend/API/routes/migrations/RLS/Storage changes** unless explicitly requested.
- **No .env changes.** Do not read or print secrets.
- **No commit/push/stage without explicit permission.** Never use `git add .`.
- **No assumed PASS.** Every claim must be backed by evidence (screenshot, scan, typecheck, etc.).
- **Reports required in `reports/**`.** Summarize findings; do not hide errors behind generic messages.

## Tooling Protocol
- **Playwright MCP** (`mcp1_browser_*`) — Use for UI screenshots, snapshots, console/network logs, computed styles.
- **AI Website Cloner Template** — Use as a methodology only: Inspect → Capture → Extract → Analyze → Specify → Brainstorm → Implement → Validate. Do not clone websites. Do not install the AI Website Cloner repo. Do not copy external code/assets.
- **Context7** — Use only after IDE restart / when transport is confirmed working.
- **next-devtools MCP** — Use for Next.js framework inspection.
- **Knip** (`npm run tool:knip`) — Run before broad cleanup or refactors to detect dead code.
- **dependency-cruiser** (`npm run tool:depcruise`) — Run before architecture-sensitive changes.
- **pysemgrep-safe** (`npm run tool:security:semgrep`) — Use for local static security scans.
- **gitleaks-safe** (`npm run tool:security:gitleaks`) — Use with `--redact` for secret-leak detection.
- **OSV-Scanner** — DEFERRED. Do not run `reports/tooling/osv-scanner.exe`.
- **Serena CLI** — Has caveats (Python 3.14 Pydantic warning, pip conflict with Semgrep). Do not rely on it for long-running tasks until isolated.
- **@axe-core/playwright** — Requires a running dev server for smoke tests; `SKIPPED_DEV_SERVER_NOT_RUNNING` is not PASS.

## UI Quality Standards
- Verify with Playwright screenshots before/after changes.
- Check `computed styles`, console logs, and network requests.
- Validate desktop, tablet, and mobile breakpoints.
- Validate both RTL and LTR modes.
- Validate i18n coverage (no visible English in Arabic mode, no visible Arabic in English mode).
- Validate dark mode (Graphite/Charcoal) and light mode (warm gray/off-white).
- Validate accessibility with axe-core when dev server is running.
- **No assumed visual PASS.**

## Backend Safety
- Do not modify Supabase schema, Auth, RLS, Storage, or API routes unless explicitly requested.
- If backend debugging is requested, show real logs and errors.
- Never hide generic Supabase errors in reports.
- Never print secrets or API keys.

## Git Safety
- No commit, push, or stage without explicit user permission.
- Always report `git status` and `git diff --stat` when asked about changes.
- Reports are not proof of implementation unless backed by validation evidence.
