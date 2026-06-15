# SONIC External Advisor Task Workflow

## Purpose

Standardized workflow for executing complex tasks with internal methodology and optional external advisor consultation.

**Key Principle:** This workflow does not connect live external tools. It uses internal methodology extracted from Prompt Master, AI Website Cloner, and project sources.

---

## Workflow Steps

### Step 1: Git Safety Gate

Run:
```bash
git branch --show-current
git rev-parse --short HEAD
git status --short
git diff --cached --name-only
git diff --cached --stat
```

**Stop if:**
- Staged files exist (`BLOCKED_EXISTING_STAGED_FILES`)
- Modified files outside expected scope

---

### Step 2: Invoke SONIC External Advisor Bridge Methodology

Read skill files:
- `.windsurf/skills/sonic-external-advisor-bridge/SKILL.md`
- `.windsurf/skills/sonic-external-advisor-bridge/advisor-request-template.md`
- `.windsurf/skills/sonic-external-advisor-bridge/source-consultation-matrix.md`

Build advisory packet:
- Task type and complexity
- Current context (branch, HEAD, previous results)
- Allowed/forbidden scope
- Needed guidance areas

---

### Step 3: Internal Source Consultation

Read mandatory internal sources:
- `AGENTS.md` — Project identity and core rules
- `CASCADE_PROJECT_RULES.md` — 20 permanent rules
- Relevant `.devin/rules/` files
- `src/lib/design/v8-tokens.css` — Design system
- `src/i18n/messages/*.ts` — Translation patterns

**These are product truth.** All implementation must align with these sources.

---

### Step 4: External Methodology Consultation (Internal Reference)

Reference extracted methodology (not live consultation):
- `docs/cascade/external-tools/prompt-master-methodology.md`
- `docs/cascade/external-tools/website-cloning-methodology.md`
- `docs/cascade/external-tools/visual-qa-methodology.md`

**These are advisory only.** Adapt concepts to SMS architecture; do not copy code.

---

### Step 5: Build Implementation Plan

Create structured plan:

```markdown
## Implementation Plan

### Context
- Branch: [name]
- HEAD: [hash]
- Previous result: [status]

### Scope
**Allowed:** [file list]
**Forbidden:** [file list]
**Sensitive:** [areas]

### Phases
1. [Phase 1 scope]
2. [Phase 2 scope]
3. [Phase 3 scope]

### Validation Gates
- [ ] typecheck
- [ ] i18n:visible
- [ ] ui:titles
- [ ] Browser QA (if UI)

### Stop Conditions
- [List when to pause]

### Evidence Requirements
- [What proves success]
```

---

### Step 6: Safety Filter Application

Review plan against safety filter:

| Check | Result |
|-------|--------|
| No forbidden files touched | ☐ |
| No package installation required | ☐ |
| No secrets/API keys needed | ☐ |
| No external code copying | ☐ |
| Scope matches original task | ☐ |
| Validation gates defined | ☐ |

**If any check fails:** STOP and request user approval.

---

### Step 7: Implementation

Execute planned phases:

**Per-phase checklist:**
1. Read existing files
2. Apply changes within scope
3. Verify no forbidden files touched
4. Run validation gates
5. Capture evidence
6. Document: `✅ [what was done] — [file(s)]`

**Checkpoints:**
- After each file change
- After each phase completion
- Before any potentially risky operation

---

### Step 8: Smart Repair OS (On Failure)

If any failure occurs:

1. **Classify failure** using `smart-repair-os.mjs`
2. **Diagnose** with logs and evidence
3. **Consult** repair-advice-contract.md
4. **Apply safe fix** (Level 2-3 only)
5. **Emit FIX stamp**:
   ```
   FIX::<engine>::<area>::<bug_type>::<action>::<evidence>::<status>
   ```

**Stop if Level 4-5 (sensitive/forbidden):** Request user approval.

---

### Step 9: Validation

Run required validation commands:

```bash
npm run typecheck
npm run i18n:visible  # if UI/i18n
npm run ui:titles      # if UI/routes
npm run lint           # if code changed
```

**All must pass.** If fail, apply Smart Repair OS or STOP.

---

### Step 10: Browser QA (If UI)

Use Playwright MCP:

1. Screenshots (before/after)
2. Responsive breakpoints (desktop, tablet, mobile)
3. RTL and LTR modes
4. Dark and light themes
5. Console logs (must be clean)
6. Network requests (must succeed)

**Evidence captured in:** `reports/workspace/`

---

### Step 11: Git Isolation Verification

Run:
```bash
git status --short
git diff --stat
git diff --name-only
```

**Verify:**
- Only allowed files modified
- No forbidden files touched
- 0 staged files (unless explicitly staged)
- No unexpected changes

---

### Step 12: Final Report

Create report: `reports/workspace/{TASK_NAME}_REPORT.md`

**Required sections:**
```markdown
## Summary
[What was accomplished]

## Sources Consulted
- [ ] AGENTS.md
- [ ] Internal rules
- [ ] External methodology

## Advisory Mode
- [ ] Internal methodology only
- [ ] External sources referenced
- [ ] Live advisor contacted: NO (always NO in this workflow)

## Files Changed
[List]

## Validation Results
| Check | Result |

## Browser QA (if UI)
| Viewport | Status |

## Smart Repair OS
- Classification: [type]
- FIX stamps: [list]

## Git Isolation
- Branch: [name]
- HEAD: [hash]
- Staged: [count]
- Modified: [count]

## Final Status
[Status enum]

## Next Recommended Action
[Next step]
```

---

## Status Enums

Use exactly one:

| Enum | Meaning |
|------|---------|
| `COMPLETED_WITH_EVIDENCE` | All gates passed, evidence captured |
| `COMPLETED_WITH_GAPS` | Core done, some validation skipped |
| `BLOCKED` | Stopped by forbidden file or permission needed |
| `STILL_NOT_FIXED` | Attempted but issue persists |
| `FAILED_VALIDATION` | Validation gates failed |

---

## Manual Invocation Note

This workflow requires manual invocation:
1. Read this workflow file
2. Follow steps sequentially
3. Apply judgment at each decision point
4. Document in report

**This workflow does not connect live external advisors.**

---

*Workflow version: 1.0.0*
*Created: 2026-06-15*
*Status: Internal methodology only*
