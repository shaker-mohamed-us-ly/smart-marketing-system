# Prompt Master Methodology

## Source

- **Repository:** `nidhinjs/prompt-master`
- **Type:** Claude.ai skill (not installable dependency)
- **Status:** Referenced as methodology only — not installed

---

## Purpose

Prompt Master provides prompt engineering methodology for:
- Intent extraction (9 dimensions)
- Prompt templates (13 types)
- Anti-patterns (37 patterns)
- Tool routing guidance
- Token efficiency

---

## Safe Use

### Intent Extraction (9 Dimensions)

| Dimension | Application in SMS |
|-----------|-------------------|
| **Task** | Precise action — convert vague verbs to operations |
| **Target tool** | Cascade/SWE, Playwright MCP, Context7 |
| **Output format** | Reports, diffs, screenshots, status enums |
| **Constraints** | Forbidden files, no git add, validation gates |
| **Input** | Previous stage result, branch state |
| **Context** | Memory Block with decisions and constraints |
| **Audience** | User + future self (technical level) |
| **Success criteria** | Binary: PASS/FAIL for each gate |
| **Examples** | Diff format, report structure |

### Three-Zone Architecture

Apply to Cascade commands:

| Zone | Content | Placement |
|------|---------|-----------|
| **Primacy** | Identity, hard rules, output lock | First 30% of command |
| **Middle** | Execution logic, tool routing, phases | Body of command |
| **Recency** | Verification, success criteria | End of command |

### Key Templates for SMS

| Template | Use Case |
|----------|----------|
| **M — Opus 4.7 Task Brief** | Complex multi-phase tasks |
| **G — File-Scope** | Single-file edits |
| **H — ReAct + Stop Conditions** | Agentic workflows |
| **B — CO-STAR** | Audit reports |

### SMS Anti-Patterns (16)

| # | Pattern | Fix |
|---|---------|-----|
| AP-01 | Assumed PASS | Demand evidence before claiming completion |
| AP-02 | Documentation-only | Distinguish audit from implementation |
| AP-03 | Mixed diffs | Separate concerns into individual changes |
| AP-04 | git add . | Use explicit `git add <file>` only |
| AP-05 | Backend without approval | STOP for Supabase/Auth/API changes |
| AP-06 | Package changes in UI task | Separate into tooling task |
| AP-07 | UI without screenshots | Capture Playwright evidence |
| AP-08 | SKIPPED = PASS | `SKIPPED` is not `PASS` |
| AP-09 | Raw translation keys | Replace with `t('key')` |
| AP-10 | Hardcoded visible text | Move to i18n messages |
| AP-11 | Killing all node.exe | Use targeted PID management |
| AP-12 | Parallel npm commands | Sequential execution only |
| AP-13 | Installing methodology repos | Use as reference only |
| AP-14 | AI Brain before Brand | Complete Brand Core first |
| AP-15 | Page-by-page without PageShell | Define shell first |
| AP-16 | Over-engineering | "Only changes directly requested" |

---

## Forbidden Use

❌ Never:
- Install `nidhinjs/prompt-master` repo
- Copy code from the repository
- Treat as product truth over AGENTS.md
- Apply blindly without SMS adaptation

---

## Cascade Application

### Memory Block Format

```markdown
## Context (carry forward)
- Current branch: {branch}
- Current HEAD: {hash} {message}
- Previous stage result: {status enum}
- What changed in the last task
- What must NOT be repeated
- Current task type: {type}
- Relation to previous: {new/extension/corrective/replacement}
```

### Stop Conditions

```markdown
## Stop Conditions
Stop and ask before:
- Deleting any file
- Adding any dependency
- Modifying database schema
- Touching anything outside Scope
- Staging or committing
```

### Output Contract

```markdown
## Final Output Contract
- Report path: `reports/workspace/{DESCRIPTIVE_NAME}.md`
- Validation results: [summary]
- Evidence: [screenshots, diffs, logs]
- Git isolation: [status]
- Final status enum: [one of the valid enums]
- Next action: [recommended step]
```

---

## Validation Requirements

Every Prompt Master-inspired command must:
- [ ] Include Memory Block
- [ ] Define allowed/forbidden files
- [ ] Specify validation gates
- [ ] Include stop conditions
- [ ] Define output contract
- [ ] Use binary success criteria where possible

---

*Methodology extracted from: Prompt Master SKILL.md, templates, patterns*
*Application: SMS Cascade commands*
*Status: Methodology reference only*
