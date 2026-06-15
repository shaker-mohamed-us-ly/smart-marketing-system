---
name: sonic-external-advisor-bridge
description: Use before complex Smart Marketing System coding tasks to prepare advisory packets, apply Prompt Master methodology, consult internal/external source methodologies, filter advisor/code suggestions, enforce SONIC safety gates, trigger Smart Repair OS strategy, and define validation/browser QA evidence before implementation.
version: 1.0.0
author: Cascade/SMS
---

# SONIC External Advisor Bridge Skill

## Purpose

This skill strengthens Cascade before implementation by acting as an **internal advisory orchestration layer**. It ensures that every complex task:

1. Has clear intent extraction and scope definition
2. Consults internal product sources as truth
3. Uses external methodologies as reference/benchmark only
4. Applies Prompt Master quality gates
5. Enforces SMS safety rules (backend, i18n, git, UI quality)
6. Triggers Smart Repair OS on failures
7. Produces evidence-backed validation

**Critical Principle:** Cascade remains the only executor. External advisors provide methodology, patterns, and guidance — never direct file modifications.

---

## When To Use

Use this skill for:

| Task Type | Example |
|-----------|---------|
| Complex frontend tasks | Brand Module UI, Settings redesign, Dashboard V9 |
| Backend-risk tasks | Any task near auth, API, Supabase boundaries |
| Brand Module tasks | Identity, DNA, Assets, Channels, Settings workspaces |
| UI/UX redesign tasks | Visual direction changes, component architecture |
| Animation/motion tasks | Motion system implementation, interaction design |
| Tooling/repair tasks | Dev server recovery, Browser QA, self-healing |
| Tasks requiring source consultation | Design system adoption, architecture decisions |
| Tasks where external advisor may be consulted | Complex multi-phase implementations |

**Do NOT use for:**
- Simple one-line fixes
- Pure documentation tasks (no code)
- Tasks already covered by existing simple blueprints

---

## Non-Negotiable Policy

### Cascade as Sole Executor

- **Cascade is the only implementation agent** inside this workspace
- External tools, Prompt Master, AI Website Cloner methodology, and future advisor outputs are **advisory only**
- No external tool or advisor may directly modify project files
- All file modifications happen through Cascade with explicit user approval

### External Source Boundaries

| Source Type | Role | Authority |
|-------------|------|-----------|
| Internal SMS sources (`AGENTS.md`, `.devin/rules/`, `src/`) | **Product truth** | Primary |
| External methodology (Prompt Master, AI Website Cloner) | **Quality guidance** | Secondary |
| External benchmarks (Mobbin, Godly, NN/g) | **Inspiration only** | Tertiary |
| Live advisor (if connected later) | **Consultative** | Advisory only |

### Absolute Prohibitions

- No hardcoded visible text (all UI strings through i18n)
- No raw translation keys exposed to users
- No empty headings or incomplete labels
- No RTL/LTR violations (Arabic-first mandatory)
- No Supabase/Auth/API/RLS changes without explicit approval
- No .env changes, no package installs, no MCP config edits
- No git stage/commit/push without explicit permission
- No copied external code, assets, fonts, logos, layouts
- No fake OAuth/API/bot/analytics integrations
- No claimed PASS without evidence (screenshot, scan, typecheck)

---

## Prompt Master Gate

Every task must pass through these Prompt Master-derived quality checks:

### 1. Intent Extraction (9 Dimensions)

| Dimension | Question |
|-----------|----------|
| **Task** | What specific action? (convert vague verbs to precise operations) |
| **Target tool** | Which AI/system receives this? (Cascade, Playwright MCP, etc.) |
| **Output format** | Shape, length, structure, filetype? |
| **Constraints** | What MUST and MUST NOT happen? |
| **Input** | What is the user providing? |
| **Context** | Domain, project state, prior decisions? |
| **Audience** | Who reads the output? (user + future self) |
| **Success criteria** | How to know it worked — binary where possible |
| **Examples** | Desired input/output pairs |

### 2. Scope Block

```
Allowed files: {exact paths or glob patterns}
Forbidden files: {specific exclusions}
Sensitive areas: {backend/auth/api/supabase/env/package}
```

**Rule:** Never give global instruction without file anchor.

### 3. File-Scope Contract (Template G)

For file-editing tasks:
- Exact file path
- Function/component name
- Current behavior
- Desired change
- Do-not-touch list

### 4. Anti-Pattern Scan

Check against 16 SMS Anti-Patterns:

| AP | Pattern | Detection |
|----|---------|-----------|
| AP-01 | Assumed PASS | Claim without evidence |
| AP-02 | Documentation-only completion | Report but no product diff |
| AP-03 | Mixed diffs | Unrelated changes in one commit |
| AP-04 | git add . | Reports/scripts in index |
| AP-05 | Touching Supabase/Auth/API | Diff touches backend paths |
| AP-06 | Package changes during UI task | package.json modified |
| AP-07 | UI without screenshots | No Playwright evidence |
| AP-08 | Browser PASS when dev server down | SKIPPED treated as PASS |
| AP-09 | Raw translation keys | i18n:visible finds raw keys |
| AP-10 | Hardcoded visible text | i18n:visible finds hardcoded strings |
| AP-11 | Killing all node.exe | taskkill in terminal |
| AP-12 | Parallel npm commands | Multiple npm run simultaneously |
| AP-13 | Installing methodology repos | External repo cloned into project |
| AP-14 | AI Brain before Brand Core | Wrong dependency order |
| AP-15 | Page-by-page without PageShell | Inconsistent layouts |
| AP-16 | Over-engineering | New files/refactors not requested |

### 5. Token Efficiency Audit

Review every command sentence:
> **"Every sentence must change the output."**

Strip vague adjectives. Use strongest signal words: MUST over should, NEVER over avoid.

### 6. Output Contract

Every command must specify:
- Report path: `reports/workspace/{DESCRIPTIVE_NAME}.md`
- Validation results summary
- Evidence requirements (screenshots, diffs, logs)
- Git isolation result
- Final status enum
- Next recommended action

### 7. Stop Conditions

Stop and ask before:
- Deleting any file
- Adding any dependency
- Modifying database schema/migrations
- Touching anything outside scope
- Staging files
- Committing or pushing
- Any sensitive infra change

---

## Deep Inquiry Gate

Before implementation, Cascade must answer:

| Question | Why It Matters |
|----------|----------------|
| **Why?** | Business/technical justification |
| **How?** | Implementation approach |
| **Where?** | Specific files and components |
| **What changes?** | Exact modifications expected |
| **Who/what is affected?** | Scope of impact |
| **What can fail?** | Risk identification |
| **What are alternatives?** | Options considered |
| **What is the smallest safe step?** | Scope minimization |
| **What proves success?** | Evidence definition |
| **What must not happen?** | Negative constraints |

Reject any task that cannot answer these clearly.

---

## Source Consultation Gate

### Internal Sources = Product Truth

Mandatory reads before implementation:

| Source | Purpose |
|--------|---------|
| `AGENTS.md` | Project identity, core rules, tooling protocol |
| `CASCADE_PROJECT_RULES.md` | 20 permanent rules (Arabic) |
| `.devin/rules/cascade-prompt-quality.md` | Prompt Master adaptation |
| `.devin/rules/tooling-protocol.md` | Tool selection and routing |
| `.devin/rules/ui-quality.md` | UI validation standards |
| `.devin/rules/backend-safety.md` | Backend modification rules |
| `.devin/rules/git-safety.md` | Git operation rules |
| `src/lib/design/v8-tokens.css` | Design system tokens |
| `src/app/globals.css` | Global styles and CSS variables |
| `src/i18n/messages/ar.ts` | Arabic translations (source of truth) |
| `src/i18n/messages/en.ts` | English translations |

### External Sources = Methodology/Benchmark

Allowed external references:

| Source | Use | Forbidden |
|--------|-----|-----------|
| **Prompt Master** | Methodology extraction, templates, anti-patterns | Do not install as dependency |
| **AI Website Cloner** | Visual analysis framework, 8-step methodology | Do not clone websites, copy assets |
| **Mobbin/Godly** | UI inspiration, patterns | Do not copy layouts |
| **NN/g, Laws of UX** | UX heuristics | Do not copy code |
| **WCAG, WAI-ARIA, MDN** | Accessibility standards | Do not copy polyfills |
| **Apple HIG, Material, etc.** | Design system patterns | Do not copy components |
| **Motion research sources** | Animation principles | Do not copy implementations |

---

## UI/UX + Motion Gate

### Motion Rules

Motion must serve purpose:
- Orient the user
- Explain state changes
- Provide feedback
- Reduce cognitive load

**Forbidden:** Decorative heavy motion, gratuitous animations.

### Motion Quality Standards

| Aspect | Requirement |
|--------|-------------|
| Easing | `cubic-bezier(0.2, 0.8, 0.2, 1)` or similar snappy curve |
| Duration | 140–220ms for micro-interactions |
| will-change | Only on animating elements |
| Reduced motion | Respect `prefers-reduced-motion` |

### UI Gates Checklist

- [ ] RTL/LTR validated
- [ ] Dark/light themes tested
- [ ] Desktop/tablet/mobile breakpoints
- [ ] No hardcoded text (i18n:visible pass)
- [ ] No empty headings (ui:titles pass)
- [ ] Focus states visible
- [ ] Keyboard navigation works
- [ ] Screenshots captured (before/after)
- [ ] Computed styles verified
- [ ] Console errors checked

---

## Backend/Frontend Gate

### Backend Safety Rules

| Action | Requirement |
|--------|-------------|
| Supabase changes | Explicit approval required |
| Auth modifications | Explicit approval required |
| API routes | Explicit approval required |
| RLS policies | Explicit approval required |
| Migrations | Explicit approval required |
| Storage buckets | Explicit approval required |

### Frontend Safety Rules

| Action | Requirement |
|--------|-------------|
| Package install | Explicit approval required |
| .env changes | Explicit approval required |
| New dependencies | Justification + approval |
| OpenAI SDK activation | Not connected (future only) |
| API integrations | Real implementation, not fake |

---

## Smart Repair OS Gate

### Classification

All failures must be classified:

| Class | Engine | Auto-fix? |
|-------|--------|-----------|
| `TOOLING_FAILURE` | Tooling Repair | Yes, if safe |
| `TEST_FAILURE` | System Repair | Yes, if in scope |
| `PRODUCT_BUG_SAFE` | System Repair | Yes, if in scope |
| `PRODUCT_BUG_REQUIRES_APPROVAL` | System Repair | **No** — stop |
| `INFRA_OR_SECURITY_BLOCKER` | Both | **No** — stop |

### Safety Levels

| Level | Action |
|-------|--------|
| 1 | Diagnose only |
| 2 | Tooling auto-fix (CDP, dev server, screenshots) |
| 3 | Scoped system bug auto-fix (i18n, TS, UI in scope) |
| 4 | Sensitive infra requires approval |
| 5 | Forbidden automatic changes |

### FIX Stamp Format

```
FIX::<engine>::<area>::<bug_type>::<action>::<evidence>::<status>
```

**Required for every actual repair.**

---

## Validation Gate

### Required Commands

| Context | Command |
|---------|---------|
| TypeScript | `npm run typecheck` |
| i18n check | `npm run i18n:visible` |
| UI titles | `npm run ui:titles` |
| ESLint | `npm run lint` |
| Dead code | `npm run tool:knip` (if architecture changed) |
| Architecture | `npm run tool:depcruise` (if structure changed) |

### Browser QA Requirements

| Check | Tool |
|-------|------|
| Screenshots | Playwright MCP |
| Console errors | Playwright console logs |
| Network failures | Playwright network interception |
| Accessibility | axe-core (if dev server running) |
| Responsive | Desktop (1280px+), tablet (768px), mobile (375px) |
| RTL/LTR | Both language modes |
| Dark/Light | Both themes |

---

## Stop Conditions

STOP and request user approval if:

1. **Forbidden file required** — Cannot complete without touching Supabase/auth/API/package/env
2. **Package/env/MCP/tokens required** — Installation or configuration needed
3. **Live advisor required but not connected** — Task assumes external consultation that hasn't been set up
4. **Validation fails outside scope** — Error not fixable within allowed files
5. **Browser QA fails outside scope** — Visual defect not fixable within allowed files
6. **Git state unclear** — Unexpected staged/modified files
7. **External suggestion is unsafe** — Advisor recommends forbidden action

---

## Final Output Contract

Cascade must report in `reports/workspace/{DESCRIPTIVE_NAME}_REPORT.md`:

### Required Sections

```markdown
## Summary
[What was attempted]

## Sources Read
- [ ] AGENTS.md
- [ ] Relevant .devin/rules/
- [ ] Internal project files
- [ ] External methodology (if consulted)

## Advisory Mode Used
- [ ] Internal methodology only
- [ ] External source consultation (no live advisor)
- [ ] Live external advisor contacted: YES/NO

## Files Changed
[List of modified files]

## Validation Results
| Check | Result |
|-------|--------|
| typecheck | PASS/FAIL/SKIPPED |
| i18n:visible | PASS/FAIL/SKIPPED |
| ui:titles | PASS/FAIL/SKIPPED |
| lint | PASS/FAIL/SKIPPED |

## Browser QA Results (if UI)
| Viewport | Status |
|----------|--------|
| Desktop | Screenshot: [path] |
| Tablet | Screenshot: [path] |
| Mobile | Screenshot: [path] |

## Self-Healing Results
- Classification: [TOOLING/TEST/PRODUCT/INFRA]
- Actions taken: [description]
- FIX stamps: [if any]

## Git Isolation
- Branch: [name]
- HEAD: [hash]
- Staged files: [count]
- Modified files: [count]

## Final Status
[Status enum]

## Next Recommended Action
[Concrete next step]
```

### Status Enums

Use exactly one:

| Enum | Meaning |
|------|---------|
| `COMPLETED_WITH_EVIDENCE` | All gates passed, evidence captured |
| `COMPLETED_WITH_GAPS` | Core done, some validation skipped |
| `BLOCKED` | Stopped by forbidden file, permission needed |
| `STILL_NOT_FIXED` | Attempted but issue persists |
| `FAILED_VALIDATION` | Validation gates failed |

---

## Skill Version

- **Version:** 1.0.0
- **Date:** 2026-06-15
- **Author:** Cascade/SMS
- **Sources:** Prompt Master methodology, Claude methodology, SMS project rules
- **Status:** Internal Skill — No live external advisor connected

---

*This skill supplements AGENTS.md and all .devin/rules/*
