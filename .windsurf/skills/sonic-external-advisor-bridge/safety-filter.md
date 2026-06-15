# External Advisor Safety Filter

## Purpose

Classify every external advisor suggestion before implementation. Cascade applies this filter to ensure project safety rules are never violated.

---

## Classification Categories

| Classification | Meaning | Action |
|----------------|---------|--------|
| **ACCEPT** | Suggestion is safe, within scope, aligns with project rules | Implement as suggested |
| **ADAPT** | Directionally correct but needs SMS-specific modification | Implement with adaptations |
| **REJECT** | Violates project rules or is unsafe | Do not implement; document reason |
| **STOP_AND_REQUEST_USER_APPROVAL** | Requires forbidden action or significant scope change | Stop execution; ask user |

---

## Auto-REJECT Triggers

REJECT any suggestion that:

### File System Violations
- [ ] Touches forbidden files (`supabase/migrations/`, `src/lib/supabase/`, `src/app/auth/`, `src/app/api/`)
- [ ] Modifies `middleware.ts` without approval
- [ ] Edits `.env*` files
- [ ] Changes `.mcp.json` or MCP configuration
- [ ] Modifies `package.json` or `package-lock.json`
- [ ] Stages files with `git add .` or `git add -A`
- [ ] Commits or pushes without explicit permission

### Security Violations
- [ ] Requires API keys, tokens, or secrets
- [ ] Suggests service role key usage
- [ ] Proposes OAuth or authentication changes
- [ ] Recommends RLS policy modifications
- [ ] Suggests storage bucket changes

### Code Integrity Violations
- [ ] Copies code from external repositories
- [ ] Copies UI layouts from competitor sites
- [ ] Downloads external assets, fonts, or logos
- [ ] Installs methodology repos as dependencies
- [ ] Adds fake API/OAuth/bot/analytics integrations

### Quality Violations
- [ ] Ignores i18n/RTL/LTR requirements
- [ ] Proposes hardcoded visible text
- [ ] Suggests raw translation key exposure
- [ ] Claims PASS without evidence
- [ ] Allows `SKIPPED` to be treated as `PASS`

### Scope Violations
- [ ] Expands scope beyond original task
- [ ] Suggests over-engineering (unrequested features)
- [ ] Recommends changes outside current task scope
- [ ] Proposes "fix everything" approaches

---

## Auto-ADAPT Triggers

ADAPT suggestions that:

### Architecture Patterns
- External component patterns → SMS Card/IconFrame primitives
- Generic state management → Zustand (existing SMS pattern)
- Generic styling → Tailwind + V8 tokens

### Design References
- External color suggestions → Map to V8 token values
- Generic spacing → 4px/8px grid system
- Animation curves → `cubic-bezier(0.2, 0.8, 0.2, 1)`

### i18n/Text
- English placeholder text → Arabic-first via next-intl
- Inline strings → `t('key')` with messages update

### File Paths
- Generic component paths → SMS component hierarchy
- Generic style locations → CSS modules adjacent to components

---

## STOP Conditions

STOP and request user approval when:

1. **Forbidden File Required** — Cannot complete without touching Supabase/auth/API/package/env
2. **Package Installation Needed** — New dependency required
3. **API Key/Token Required** — External service connection needed
4. **Backend Change Required** — Schema, RLS, or auth modification needed
5. **Git Operations Required** — Staging, commit, or push needed
6. **External Code Copy Suggested** — Direct code copying proposed
7. **Scope Expansion Beyond Original Task** — Task growing uncontrollably
8. **Validation Fails Repeatedly** — Cannot achieve PASS within scope

---

## Filter Decision Tree

```
Suggestion received
    |
    v
+-----------------------------------+
| Does it touch forbidden files?    |
+-----------------------------------+
    | Yes
    v
REJECT + STOP

    | No
    v
+-----------------------------------+
| Does it require secrets/API keys?   |
+-----------------------------------+
    | Yes
    v
STOP_AND_REQUEST_USER_APPROVAL

    | No
    v
+-----------------------------------+
| Does it copy external code/assets?  |
+-----------------------------------+
    | Yes
    v
REJECT

    | No
    v
+-----------------------------------+
| Does it expand scope beyond task?   |
+-----------------------------------+
    | Yes
    v
STOP_AND_REQUEST_USER_APPROVAL

    | No
    v
+-----------------------------------+
| Does it need SMS adaptation?        |
+-----------------------------------+
    | Yes
    v
ADAPT

    | No
    v
ACCEPT
```

---

## Rejection Documentation

When REJECTING a suggestion, document:

```markdown
## Rejected Suggestion
**Source:** [External advisor / Self / Tool]
**Suggestion:** [Brief description]
**Reason:** [Which rule violated]
**Action Taken:** [What Cascade did instead]
**Alternative:** [If applicable, adapted approach]
```

---

## Examples

### Example 1: REJECT — Forbidden File

**Suggestion:** "Modify `src/lib/supabase/client.ts` to add new query method."

**Filter Result:** REJECT

**Reason:** `src/lib/supabase/*` is forbidden without explicit approval per AGENTS.md.

**Action:** Document rejection; ask user if backend change is truly required; if yes, STOP for approval.

---

### Example 2: ADAPT — External Design Pattern

**Suggestion:** "Use a 12-column grid system with 24px gutters."

**Filter Result:** ADAPT

**Adaptation:** Map to SMS V8 tokens:
- Grid: Use existing Tailwind grid
- Gutters: `gap-6` (24px) aligns with V8 spacing
- Component: Use existing Card primitives

---

### Example 3: ACCEPT — Safe Implementation

**Suggestion:** "Apply `border-radius: 18px` to match V8 card spec."

**Filter Result:** ACCEPT

**Verification:** `src/lib/design/v8-tokens.css` defines card radius as 18px.

**Implementation:** Use existing token via `var(--card-radius)`.

---

### Example 4: STOP — Package Required

**Suggestion:** "Install `chart-library` for analytics dashboard."

**Filter Result:** STOP_AND_REQUEST_USER_APPROVAL

**Reason:** Package installation requires explicit user approval per AGENTS.md Rule 3.

**Action:** STOP; document need; present justification; wait for user decision.

---

*Filter version: 1.0.0*
*Applies to: All external advisor suggestions*
