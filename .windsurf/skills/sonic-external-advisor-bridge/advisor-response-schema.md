# Advisor Response Schema

## YAML Response Format

```yaml
summary: "Brief executive summary"
intent: "Confirmed understanding"
recommended_scope: "What should be touched"
allowed_files: ["paths"]
forbidden_files: ["paths"]
backend_notes: "Backend guidance"
frontend_notes: "Frontend guidance"
ui_ux_notes: "UI/UX recommendations"
motion_notes: "Animation guidance"
security_notes: "Security considerations"
source_research_notes: "Suggested references"
code_suggestions: "Pseudocode/patterns only"
template_suggestions: "Architecture templates"
implementation_phases: ["Phase list"]
validation_plan: "How to verify"
browser_qa_plan: "Visual validation"
repair_advice: "Failure handling"
stop_conditions: "When to pause"
what_not_to_do: "Anti-patterns"
confidence: "high/medium/low"
open_questions: ["Questions"]
```

## Field Descriptions

### summary
- 2-3 sentences maximum
- Executive summary of advisory response
- What will be advised

### intent  
- Confirmation of task understanding
- Restate core objective in advisor's words

### recommended_scope
- Clear description of what SHOULD be touched
- Specific file categories or components
- Advisory only; Cascade validates against project rules

### allowed_files / forbidden_files
- Lists of file paths or patterns
- Advisory only; actual boundaries in AGENTS.md

### backend_notes
- Safe boundaries
- Required approvals
- Data flow considerations
- RLS implications

### frontend_notes
- Component structure recommendations
- State management approach
- Server/Client boundaries
- Type definitions (conceptual)

### ui_ux_notes
- Visual design guidance
- Layout recommendations
- Spacing, color, typography
- Component composition

### motion_notes
- Purposeful motion recommendations
- Easing and duration guidance
- Reduced motion considerations

### security_notes
- Data handling guidance
- Client/server boundary safety
- Secret exposure risks

### source_research_notes
- Methodology sources
- Design references
- Technical documentation
- Best practice guides

### code_suggestions
**PSEUDOCODE AND PATTERNS ONLY**

Provide:
- Architecture patterns
- Component structure concepts
- Type definition concepts
- Error handling patterns

Do NOT provide:
- Production-ready code
- Direct copy-paste implementations
- Code from external repositories

### template_suggestions
- Component composition templates
- State management patterns
- Error boundary patterns
- Loading state patterns

### implementation_phases
Break into sequential phases:
- Phase name
- Scope
- Deliverables
- Validation criteria

### validation_plan
Required checks:
- TypeScript, i18n, lint
- Evidence requirements
- Screenshot requirements (if UI)

### browser_qa_plan
If UI task:
- Viewports (desktop, tablet, mobile)
- Modes (RTL, LTR, dark, light)
- Screenshot requirements

### repair_advice
Common failure scenarios:
- If typecheck fails
- If i18n fails  
- If Browser QA fails
- Smart Repair OS triggers

### stop_conditions
When to pause and ask:
- Forbidden file required
- Package installation needed
- Validation fails
- Scope expansion needed

### what_not_to_do
Explicit anti-patterns to avoid

### confidence
high: Clear task, well-defined scope
medium: Some ambiguity
low: Significant unknowns

### open_questions
Any clarifications needed from user

---

## Cascade Safety Filter

After receiving response, Cascade classifies:

| Classification | Action |
|----------------|--------|
| ACCEPT | Safe, within scope, aligns with rules |
| ADAPT | Correct direction, needs SMS modification |
| REJECT | Violates project rules |
| STOP | Requires forbidden action |

---

*Schema version: 1.0.0*
