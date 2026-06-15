# SONIC External Advisor Task Template

## Task Type

**SONIC_EXTERNAL_ADVISOR_TASK**

Use for complex tasks requiring internal methodology application and optional external advisor consultation preparation.

---

## Context (carry forward)

```
Current branch: {branch}
Current HEAD: {hash} {message}
Previous stage result: {status enum from last task}
What changed in the last task: {summary}
What must NOT be repeated: {lessons learned}
Current task type: {implementation / audit / debug / architecture / recovery}
Relation to previous command: {new / extension / corrective / replacement}
```

---

## Objective

[One clear sentence describing what needs to be accomplished.]

**Success Criteria:** [Binary definition of done]

---

## Read First

Before implementation, read:
- [ ] `AGENTS.md` — Project identity and core rules
- [ ] `.devin/rules/cascade-prompt-quality.md` — Prompt quality rules
- [ ] `.devin/rules/tooling-protocol.md` — Tool selection
- [ ] Relevant `.devin/rules/*` for task type
- [ ] `src/lib/design/v8-tokens.css` — Design system
- [ ] Similar components in `src/` — Pattern reference

External methodology (advisory only):
- [ ] `docs/cascade/external-tools/prompt-master-methodology.md`
- [ ] `docs/cascade/external-tools/website-cloning-methodology.md`
- [ ] `docs/cascade/external-tools/visual-qa-methodology.md`

---

## Allowed Scope

**Allowed Files:**
- `src/components/client/{module}/**`
- `src/app/client/{module}/**`
- `src/lib/design/**`
- `src/i18n/messages/*.ts`
- `docs/cascade/**`
- `reports/workspace/**`

**Forbidden Files:**
- `supabase/migrations/*`
- `src/lib/supabase/*`
- `src/app/auth/*`
- `src/app/api/*`
- `middleware.ts`
- `.env*`
- `.mcp.json`
- `package.json`
- `package-lock.json`

**Sensitive Areas:** backend, auth, api, supabase, env, package

---

## External Advisor Consultation

**Live external advisor connected:** NO

**Internal methodology applied:**
- [ ] Prompt Master intent extraction
- [ ] AI Website Cloner visual analysis framework
- [ ] Source consultation matrix
- [ ] Safety filter

**If live advisor were connected, would request:**
- [ ] Risk analysis
- [ ] Implementation phase suggestions
- [ ] Validation plan review
- [ ] Stop condition confirmation

---

## Prompt Master Gate

### Intent Extraction (9 Dimensions)

| Dimension | Answer |
|-----------|--------|
| Task | [Precise action] |
| Target tool | Cascade/SWE |
| Output format | [Report/diff/screenshots] |
| Constraints | [Forbidden files, no git add] |
| Input | [Previous stage result] |
| Context | [Branch, HEAD, decisions] |
| Audience | User + future self |
| Success criteria | [Binary condition] |
| Examples | [Format examples] |

### Scope Block

- **Allowed:** [specific files]
- **Forbidden:** [specific exclusions]
- **Sensitive:** [backend/auth/api/supabase/env/package]

### Stop Conditions

Stop and ask before:
- Deleting any file
- Adding any dependency
- Modifying database schema
- Touching anything outside scope
- Staging or committing
- Any backend/auth/RLS change

---

## Deep Inquiry Gate

Answer before implementation:

| Question | Answer |
|----------|--------|
| Why? | [Business/technical justification] |
| How? | [Implementation approach] |
| Where? | [Specific files and components] |
| What changes? | [Exact modifications] |
| Who/what is affected? | [Scope of impact] |
| What can fail? | [Risk identification] |
| What are alternatives? | [Options considered] |
| What is the smallest safe step? | [Scope minimization] |
| What proves success? | [Evidence definition] |
| What must not happen? | [Negative constraints] |

---

## Source Consultation Gate

**Internal sources (product truth):**
- [ ] AGENTS.md read
- [ ] CASCADE_PROJECT_RULES.md referenced
- [ ] Relevant rules consulted
- [ ] Design system reviewed
- [ ] i18n patterns checked
- [ ] Similar components reviewed

**External sources (methodology only):**
- [ ] Prompt Master methodology referenced
- [ ] AI Website Cloner methodology referenced (if UI)
- [ ] Visual QA methodology referenced (if UI)

---

## Implementation Phases

### Phase 1: [Name]
- **Scope:** [What to do]
- **Deliverables:** [Outputs]
- **Validation:** [How to verify]

### Phase 2: [Name]
- **Scope:** [What to do]
- **Deliverables:** [Outputs]
- **Validation:** [How to verify]

### Phase 3: [Name]
- **Scope:** [What to do]
- **Deliverables:** [Outputs]
- **Validation:** [How to verify]

---

## Validation Gates

### Required Commands

| Check | Command | Threshold |
|-------|---------|-----------|
| TypeScript | `npm run typecheck` | 0 errors |
| i18n | `npm run i18n:visible` | 0 hardcoded |
| UI titles | `npm run ui:titles` | 0 empty headings |
| Lint | `npm run lint` | No new errors |

### Evidence Requirements

- [ ] Screenshots (if UI): before/after, all viewports, RTL/LTR, dark/light
- [ ] Computed styles (if UI): key elements extracted
- [ ] Console logs: clean or documented
- [ ] Type check: PASS output
- [ ] i18n scan: PASS output

---

## Browser QA Gates (If UI)

| Viewport | Required | Status |
|----------|----------|--------|
| Desktop (1280px+) | Yes | ☐ |
| Tablet (768px) | Yes | ☐ |
| Mobile (375px) | Yes | ☐ |
| RTL | Yes | ☐ |
| LTR | Yes | ☐ |
| Dark | Yes | ☐ |
| Light | Yes | ☐ |

**Screenshots stored:** `reports/workspace/`

---

## Self-Healing Gates

If failures occur:

1. **Classify:** Use `smart-repair-os.mjs --classify-sample`
2. **Diagnose:** Identify root cause
3. **Consult:** `repair-advice-contract.md`
4. **Apply:** Safe fix (Level 2-3 only)
5. **Emit:** FIX stamp

**Stop if Level 4-5:** Request user approval

---

## Git Safety Gates

### Pre-Execution
- [ ] `git branch --show-current` recorded
- [ ] `git rev-parse --short HEAD` recorded
- [ ] `git status --short` — 0 staged or documented
- [ ] `git diff --stat` — no unexpected changes

### Post-Execution
- [ ] `git status --short` — only allowed files modified
- [ ] `git diff --stat` — changes match scope
- [ ] 0 staged files (unless explicitly approved)
- [ ] No forbidden files touched

---

## Final Report

**Path:** `reports/workspace/{DESCRIPTIVE_NAME}_REPORT.md`

**Required sections:**
```markdown
## Summary
## Sources Consulted
## Advisory Mode Used
## Files Changed
## Validation Results
## Browser QA (if UI)
## Self-Healing Results
## Git Isolation
## Final Status
## Next Recommended Action
```

---

## Final Status Enum

Use exactly one:

| Enum | Use When |
|------|----------|
| `COMPLETED_WITH_EVIDENCE` | All gates passed, evidence captured |
| `COMPLETED_WITH_GAPS` | Core done, some validation skipped |
| `BLOCKED` | Stopped by forbidden file or permission needed |
| `STILL_NOT_FIXED` | Attempted but issue persists |
| `FAILED_VALIDATION` | Validation gates failed |

---

## Constraints

- Only make changes directly requested
- Do not add features, abstractions, or files beyond what was asked
- Every instruction must change output (token efficiency)
- No external code copying
- No external asset copying
- No package installation without approval

---

## Stop Conditions Summary

STOP and request approval if:
1. Forbidden file required
2. Package/env/MCP/tokens required
3. Validation fails outside scope
4. Browser QA fails outside scope
5. Git state unclear
6. External suggestion unsafe
7. Level 4-5 repair needed

---

*Template version: 1.0.0*
*For use with: SONIC External Advisor Bridge Skill*
*Status: Internal methodology only — No live external advisor*
