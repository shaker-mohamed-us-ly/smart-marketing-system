# External Advisor Request Template

## Project

**Name:** Smart Marketing System (نظام التسويق الذكي)  
**Type:** Arabic-first AI-powered Marketing Operating System  
**Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, Supabase, next-intl  
**Design System:** V8 Tokens, Graphite/Charcoal dark, warm gray/off-white light  
**Layout:** Premium Centered Canvas, RTL/LTR mandatory, Arabic-first

---

## Task

**Precise Task:** [Describe the specific action needed]

**Task Type:** [implementation / audit / debug / architecture / recovery]

**Complexity Level:** [simple / moderate / complex / multi-phase]

---

## Current Context

**Branch:** [current branch name]

**HEAD:** [commit hash and message]

**Previous Stage Result:** [status enum from last task]

**Relevant Files/Reports:**
- [List any relevant existing reports]
- [List any relevant existing code files]

**Current State:**
- [Describe what exists now]
- [Describe what's working]
- [Describe what's broken/missing]

---

## Approval Mode

**Current Mode:** NORMAL_TASK_SAFE

**Explicit Approvals Needed For:**
- Supabase/Auth/API/RLS/migrations changes
- Package installation or modification
- .env or MCP configuration changes
- Git staging/commit/push
- External API key usage

---

## Forbidden Areas

**Absolute Prohibitions (No exceptions without explicit approval):**

| Area | Paths | Reason |
|------|-------|--------|
| Environment | `.env*`, `.env.local`, `.env.production` | Secrets protection |
| MCP Config | `.mcp.json`, `mcp_config.json` | Tooling stability |
| Package Management | `package.json`, `package-lock.json` | Dependency safety |
| Database Migrations | `supabase/migrations/*.sql` | Schema integrity |
| Supabase Client | `src/lib/supabase/*` | Service role risk |
| Auth Routes | `src/app/auth/*` | Authentication integrity |
| API Routes | `src/app/api/*` | API contract stability |
| Middleware | `middleware.ts` | Request flow integrity |
| Git Operations | staging, commit, push without permission | Version control safety |

**Additional Constraints:**
- No service role key usage
- No OAuth/authentication system changes
- No RLS policy modifications
- No storage bucket changes
- No fake API/OAuth/bot/analytics integrations

---

## Allowed Scope

**Explicitly Allowed:**
- `src/components/client/**` — Client UI components
- `src/components/shared/**` — Shared UI primitives
- `src/app/client/**` — Client-facing pages
- `src/lib/design/**` — Design tokens and utilities
- `src/i18n/messages/*.ts` — Translation files
- `docs/cascade/**` — Project documentation
- `reports/workspace/**` — Task reports
- `scripts/**` — Utility scripts

**Read-Only For Reference:**
- `src/lib/supabase/*` — For understanding existing patterns
- `supabase/migrations/*` — For understanding schema
- `src/app/api/*` — For understanding existing APIs

---

## Needed From Advisor

### 1. Intent Extraction
Confirm understanding of:
- [ ] Specific action required
- [ ] Target output format
- [ ] Success criteria (binary where possible)

### 2. Risk Analysis
Identify:
- [ ] Backend/security risks
- [ ] i18n/RTL risks
- [ ] UI/UX risks
- [ ] Performance risks
- [ ] Scope creep risks

### 3. Backend Notes
If task touches backend-adjacent areas:
- [ ] Safe boundaries
- [ ] Required approvals
- [ ] Data flow considerations
- [ ] RLS implications (if any)

### 4. Frontend Notes
- [ ] Component architecture suggestions
- [ ] State management approach
- [ ] Server/Client component boundaries

### 5. UI/UX Notes
- [ ] Visual design guidance
- [ ] Layout recommendations
- [ ] Component composition patterns
- [ ] Responsive behavior guidance

### 6. Motion/Animation Notes
- [ ] Purposeful motion recommendations
- [ ] Easing and duration guidance
- [ ] Reduced motion considerations

### 7. Security Notes
- [ ] Data handling considerations
- [ ] Client/server boundary safety
- [ ] Secret exposure risks

### 8. Suggested Implementation Phases
Break complex tasks into phases:
- [ ] Phase 1: [scope]
- [ ] Phase 2: [scope]
- [ ] Phase 3: [scope]

### 9. Suggested Code Patterns or Pseudocode
Provide **advisory patterns only** — no direct implementation:
- [ ] Architecture patterns
- [ ] Component structure pseudocode
- [ ] Type definitions (conceptual)
- [ ] Error handling patterns

### 10. Source/Research Suggestions
Recommend external references:
- [ ] Methodology sources
- [ ] Design references
- [ ] Technical documentation
- [ ] Best practice guides

### 11. Validation Plan
Define gates for completion:
- [ ] TypeScript checks
- [ ] i18n checks
- [ ] UI quality checks
- [ ] Evidence requirements

### 12. Browser QA Plan (if UI)
Define visual validation:
- [ ] Required screenshots
- [ ] Viewports to test
- [ ] RTL/LTR requirements
- [ ] Dark/light requirements

### 13. Stop Conditions
Define when to pause and ask:
- [ ] Forbidden file encountered
- [ ] Validation failure
- [ ] Scope expansion needed
- [ ] External dependency required

### 14. What Not To Do
Explicit negative guidance:
- [ ] Anti-patterns to avoid
- [ ] Scope limitations
- [ ] Implementation traps

---

## Advisor Rules

### Advisory Only
- Provide guidance, methodology, and patterns
- Do not write production code
- Do not suggest direct file modifications

### No Copied External Code
- Do not provide code from external repositories
- Do not suggest copying layouts from competitor sites
- Do not recommend asset/font/logo copying

### No Dependency Installation
- Do not suggest npm packages without explicit permission flow
- Do not recommend configuration changes to package.json

### No Secrets
- Never request or use API keys, tokens, or service role keys
- Do not suggest .env modifications

### No Fake PASS
- Do not claim success without validation evidence
- Do not suggest marking tasks complete without proof

### Structured Response Required
Return response using the schema defined in `advisor-response-schema.md`.

---

## Cascade Responsibilities

After receiving advisor response, Cascade must:

1. **Safety Filter:** Classify each suggestion as ACCEPT/ADAPT/REJECT/STOP
2. **Internal Source Consultation:** Verify against AGENTS.md and project rules
3. **Scope Enforcement:** Ensure no forbidden files are touched
4. **Implementation:** Make changes only within allowed scope
5. **Validation:** Run all quality gates
6. **Evidence Capture:** Screenshots, diffs, logs as required
7. **Self-Healing:** Use Smart Repair OS for any failures
8. **Reporting:** Document in `reports/workspace/`

---

## Response Format Reminder

Advisor must return response in YAML schema format per `advisor-response-schema.md`:

```yaml
summary: "Brief summary"
intent: "Confirmed understanding"
recommended_scope: "What should be touched"
allowed_files: ["list"]
forbidden_files: ["list"]
backend_notes: "Backend considerations"
frontend_notes: "Frontend guidance"
ui_ux_notes: "UI/UX recommendations"
motion_notes: "Animation guidance"
security_notes: "Security considerations"
source_research_notes: "Suggested references"
code_suggestions: "Pseudocode/patterns only"
template_suggestions: "Architecture templates"
implementation_phases: ["Phase 1", "Phase 2"]
validation_plan: "How to verify"
browser_qa_plan: "Visual validation plan"
repair_advice: "What to do if things fail"
stop_conditions: "When to pause"
what_not_to_do: "Anti-patterns and traps"
confidence: "high/medium/low"
open_questions: ["Any clarifications needed"]
```

---

*Template version: 1.0.0*
*For use with sonic-external-advisor-bridge skill*
