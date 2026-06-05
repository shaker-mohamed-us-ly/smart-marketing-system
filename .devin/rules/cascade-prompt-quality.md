# Cascade Prompt Quality Rules

## 1. Purpose

This document adapts **Prompt Master** (`nidhinjs/prompt-master`) and **Claude methodology** for SMS Cascade commands. It is a **methodology supplement** — not a runtime dependency, not a replacement for `AGENTS.md` or existing `.devin/rules`.

Prompt Master is a prompt engineering skill with 13 templates, 37 anti-patterns, and tool routing guidance. Claude methodology provides literalism guidance, adaptive thinking, over-engineering prevention, and session hygiene. These are used as **source intelligence only**.

This document supplements — never overrides — `AGENTS.md`, `.devin/rules/ui-quality.md`, `.devin/rules/backend-safety.md`, `.devin/rules/git-safety.md`, and `.devin/rules/tooling-protocol.md`.

---

## 2. P0 Principles

1. **Context before action.** Every command must state what came before before describing what comes next.
2. **Scope before implementation.** Allowed files, forbidden files, and sensitive areas must be explicit.
3. **Stop conditions before execution.** The user must know when Cascade will pause and ask.
4. **Evidence before PASS.** No claim of completion without proof (screenshot, typecheck, scan, diff, log).
5. **Output contract before closure.** Every command must specify report path, status enum, and next recommended action.
6. **User permission before stage/commit/push.** No git mutation without explicit approval.
7. **Every instruction must change output.** Strip any sentence that does not affect the result. Token efficiency is mandatory.
8. **No external methodology overrides SMS safety rules.** If Prompt Master or Claude advice conflicts with `AGENTS.md`, `AGENTS.md` wins.

---

## 3. Mandatory Memory Block

Every command must carry forward:

```
## Context (carry forward)
- Current branch: {branch}
- Current HEAD: {hash} {message}
- Previous stage result: {status enum from last task}
- What changed in the last task
- What must NOT be repeated
- Current task type: {implementation / audit / debug / staging / commit / push / recovery}
- Relation to previous command:
  - new — unrelated to prior context, start fresh
  - extension — builds on prior work
  - corrective — fixes a prior issue
  - replacement — supersedes prior approach
```

**Placement:** First 30% of the command (survives attention decay).

---

## 4. Universal Fingerprint for Every Command

Every SMS command must declare:

| Field | What to Include |
|-------|-----------------|
| **Task type** | Implementation, audit, debug, staging, commit, push, recovery |
| **Target tool** | Cascade/SWE, Playwright MCP, Context7, etc. |
| **Allowed files** | Exact paths or glob patterns |
| **Forbidden files** | Exact paths or patterns |
| **Sensitive areas** | backend/auth/api/supabase/env/package |
| **Evidence required** | Screenshots, typecheck, i18n, diff stat, logs |
| **Validation required** | List of gates that must pass |
| **Final status enum** | The completion status token |

---

## 5. Command Blocks

Every command should be structured into these blocks, derived from Prompt Master Template M (Opus 4.7 Task Brief):

### Context Block
- Memory Block (Section 3)
- Universal Fingerprint (Section 4)

### Scope Block
- Allowed files
- Forbidden files
- Sensitive areas
- "Only make changes directly requested. Do not add features, abstractions, or files beyond what was asked."

### Tool Routing
- Which tools to use
- Which tools to skip and why
- Tool-specific constraints (e.g., axe-core needs dev server)

### Execution Phases
- Numbered steps
- What each step produces
- Checkpoints: `✅ [what was completed] — [file(s) affected]`

### Quality Gates
- TypeScript PASS
- i18n:visible PASS
- ui:titles PASS
- Screenshot evidence (if UI)
- Console clean (if browser used)

### Validation Gates
- `npm run typecheck`
- `npm run i18n:visible`
- `npm run ui:titles`
- Browser QA (if dev server running)
- axe-core (if dev server running)

### Git Isolation
- Pre-execution: `git status --short`, `git diff --stat`
- Post-execution: `git status --short`, `git diff --stat`
- Forbidden: `git add .`, `git add -A`, any staging without permission

### Completion Conditions
- All validation gates passed
- Evidence captured in report
- Git isolation verified
- Report written to `reports/workspace/`

### Final Output Contract
- Report path: `reports/workspace/{DESCRIPTIVE_NAME}.md`
- Validation results summary
- Evidence requirements met
- Git isolation result
- Final status enum
- Next recommended action

---

## 6. Stop Conditions

Cascade MUST STOP and ask the user when any of the following occurs:

1. **Existing staged files** detected before execution (`BLOCKED_EXISTING_STAGED_FILES`)
2. **Dirty product worktree** — modified files outside the command scope (`BLOCKED_DIRTY_PRODUCT_WORKTREE`)
3. **Out-of-scope modified files** — diff touches forbidden paths (`BLOCKED_OUT_OF_SCOPE_MODIFIED_FILES`)
4. **Validation failure** — any quality gate fails (`FAILED_VALIDATION`)
5. **Missing browser evidence for UI** when dev server is running (`UI_PASS_WITHOUT_EVIDENCE_BLOCKED`)
6. **Backend/Supabase/Auth/API touched** without explicit permission (`BLOCKED_BACKEND_CHANGE_WITHOUT_PERMISSION`)
7. **Package/env changes** without explicit permission (`BLOCKED_PACKAGE_CHANGE_IN_UI_TASK`)
8. **Raw translation keys** found by `i18n:visible` (`BLOCKED_RAW_TRANSLATION_KEYS`)
9. **Hardcoded visible text** found by `i18n:visible` (`BLOCKED_HARDCODED_VISIBLE_TEXT`)
10. **Assumed PASS** — claim without evidence (`ASSUMED_PASS_BLOCKED`)
11. **Documentation-only completion** — report with no product diff (`DOCUMENTATION_ONLY_BLOCKED`)
12. **Parallel npm commands** when stability matters (`BLOCKED_PARALLEL_NPM_COMMANDS`)
13. **Killing all node.exe** (kills MCP servers) (`BLOCKED_MCP_KILL`)

---

## 7. SMS Anti-Pattern Library

| # | Anti-Pattern | Why Dangerous | Detection | Response |
|---|-------------|---------------|-----------|----------|
| AP-01 | **Assumed PASS** | False confidence | Claim without evidence | Demand proof |
| AP-02 | **Documentation-only completion** | User thinks work done | Report exists but no product diff | Distinguish audit from implementation |
| AP-03 | **Mixed diffs** | Hard to review/revert | Multiple unrelated changes in one commit | Separate per concern |
| AP-04 | **git add .** | Stages unintended files | `reports/` or `scripts/` in index | `git restore --staged` |
| AP-05 | **Touching Supabase/Auth/API** | Breaks auth, leaks data | Diff touches backend paths | STOP immediately |
| AP-06 | **Package changes during UI task** | Scope creep | `package.json` modified in UI task | Revert, separate task |
| AP-07 | **UI without screenshots** | Visual regressions hidden | No Playwright evidence | No UI PASS without visual proof |
| AP-08 | **Browser PASS while dev server down** | False positive | `SKIPPED_DEV_SERVER_NOT_RUNNING` | `SKIPPED` ≠ `PASS` |
| AP-09 | **Starting AI Brain before Brand Core** | Wrong data contract | AI Brain command before Brand complete | Defer AI Brain |
| AP-10 | **Page-by-page without PageShell** | Inconsistent layouts | Each page has own layout | Define PageShell first |
| AP-11 | **Installing methodology repos as deps** | Project bloat | External repo in project root | Remove, use as reference only |

---

## 8. Tool Routing

| Tool / Methodology | Role | When to Use | When to Skip |
|-------------------|------|-------------|--------------|
| **Cascade/SWE** | Primary IDE agent | All implementation and audit tasks | N/A |
| **Playwright MCP** | Browser QA evidence | UI tasks when dev server works | When dev server is down (document fallback) |
| **Context7** | Fresh docs lookup | Modern library decisions | When transport is dead |
| **next-devtools MCP** | Next.js inspection | Framework-level debugging | Non-Next.js tasks |
| **Knip** | Dead code detection | Before broad cleanup | Non-cleanup tasks |
| **dependency-cruiser** | Architecture analysis | Before module separation | Non-architectural tasks |
| **Semgrep** | Security scan | Sensitive changes, pre-checkpoint | Non-sensitive UI tasks |
| **Gitleaks** | Secret leak detection | Pre-commit/push | No secrets risk |
| **axe-core** | Accessibility scan | UI tasks with running dev server | `SKIPPED_DEV_SERVER_NOT_RUNNING` |
| **Prompt Master** | Methodology reference | Audit/extraction tasks | Do not install as dependency |
| **Claude methodology** | Success criteria guidance | Complex task design | Simple one-shot tasks |
| **OSV-Scanner** | Vulnerability scan | DEFERRED — do not use | Always skip until officially installed |
| **Sequential Thinking MCP** | Structured reasoning | NOT YET ACTIVE | Skip until verified in MCP list |

---

## 9. Blueprint Index

The following 14 blueprints formalize command structures for SMS operations:

| # | Blueprint | Use Case |
|---|-----------|----------|
| 1 | **UI Implementation** | Build or modify UI components/pages |
| 2 | **UI Acceptance Audit** | Verify visual quality, i18n, RTL, a11y |
| 3 | **Design System Auto-Adoption** | Apply V8 tokens to pages/components |
| 4 | **Brand Module Readiness Audit** | Assess Brand Module production readiness |
| 5 | **Brand Module Implementation** | Build missing Brand Module features |
| 6 | **Backend/Supabase Debug** | Debug backend issues with real logs |
| 7 | **AI Brain Architecture** | Design/review AI Brain architecture |
| 8 | **Integration Connector** | Design integration points between modules |
| 9 | **Performance Recovery** | Recover from OOM, slow compile, bundle size |
| 10 | **Git Staging** | Stage specific files safely |
| 11 | **Git Commit** | Commit staged files locally |
| 12 | **Git Push** | Push commit to remote |
| 13 | **Tooling Installation/Verification** | Verify or install tooling |
| 14 | **Browser QA Recovery** | Recover Playwright MCP or verify without browser |

Full blueprints available in `docs/cascade-prompt-blueprints/` (local-only, not in Git).

---

## 10. Source Sync Policy

1. **Auto-check source updates:** Allowed. External methodology sources (Prompt Master repo, Claude docs) can be checked for updates.
2. **Auto-report findings:** Allowed. Report what changed in external sources.
3. **Auto-apply to governance:** Forbidden. Changes to `.devin/rules/` or `AGENTS.md` require explicit user approval.
4. **Never auto-update:** `package.json`, `src/`, Supabase/Auth/API, `AGENTS.md`, `.devin/rules` without user approval.

---

## 11. Output Contract

Every SMS Cascade command must produce:

| Field | Description |
|-------|-------------|
| **Report path** | `reports/workspace/{DESCRIPTIVE_NAME}.md` |
| **Validation results** | Pass/fail for each gate |
| **Evidence requirements** | Screenshots, diffs, logs, scans |
| **Git isolation result** | `git status --short` and `git diff --stat` |
| **Final status enum** | One of: `COMPLETED_WITH_EVIDENCE`, `COMPLETED_WITH_GAPS`, `BLOCKED`, `STILL_NOT_FIXED`, `FAILED_VALIDATION` |
| **Next recommended action** | One concrete next step |

---

*Document version: 1.0*
*Methodology source: nidhinjs/prompt-master (SKILL.md, templates, patterns) + Claude Opus 4.7 methodology*
*Relationship: Supplements `AGENTS.md` and all `.devin/rules/*`. Does not replace them.*
