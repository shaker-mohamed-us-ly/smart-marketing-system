# Source Consultation Matrix

## Principle

**Internal sources = Product truth.**  
**External sources = Methodology, benchmark, inspiration, quality standard.**

---

## Internal Sources (Product Truth)

| Source | Why Consult It | Safe Use | Forbidden Use |
|--------|---------------|----------|---------------|
| **AGENTS.md** | Project identity, core rules, tooling protocol | Read before every task; reference in reports | Do not modify without explicit approval |
| **CASCADE_PROJECT_RULES.md** | 20 permanent rules (Arabic) | Reference for all decisions | Do not treat as optional |
| **CASCADE_TOOLS_AUDIT.md** | Tool inventory and recommendations | Select appropriate tools for task | Do not install unapproved tools |
| **EXTERNAL_AI_TOOLING_AUDIT.md** | External tool analysis and safety | Reference for methodology extraction | Do not install forbidden tools |
| **PROJECT_CONTEXT_REPORT.md** | Comprehensive project context | Understand architecture and state | Do not treat as code specification |
| **PROJECT_CONTEXT_REPORT_SUMMARY.md** | Quick project overview | Initial orientation | Do not replace detailed context |
| **.devin/rules/cascade-prompt-quality.md** | Prompt Master adaptation | Apply to command quality | Do not override AGENTS.md |
| **.devin/rules/tooling-protocol.md** | Tool selection guidance | Choose appropriate tools | Do not bypass safety checks |
| **.devin/rules/ui-quality.md** | UI validation standards | Validate UI implementations | Do not skip for speed |
| **.devin/rules/backend-safety.md** | Backend modification rules | Know forbidden boundaries | Do not bypass for convenience |
| **.devin/rules/git-safety.md** | Git operation rules | Safe git practices | Do not stage/commit without permission |
| **.devin/rules/self-healing-engine-protocol.md** | Tooling repair guidance | Use for CDP/dev server issues | Do not auto-fix product code |
| **.devin/rules/smart-repair-os-protocol.md** | Repair governance | Classify and repair safely | Do not bypass approval gates |
| **.devin/rules/ui-ux-source-routing.md** | UI/UX source methodology | Reference for design decisions | Do not copy external layouts |
| **docs/cascade-prompt-blueprints/** | Reusable command templates | Adapt for similar tasks | Do not use blindly; adapt context |
| **reports/workspace/** | Task history and decisions | Learn from previous work | Do not repeat failed approaches |
| **reports/dashboard/** | Visual QA evidence | Compare before/after | Do not assume without viewing |
| **src/lib/design/v8-tokens.css** | Design system tokens | Apply to all UI | Do not create new arbitrary values |
| **src/app/globals.css** | Global styles | Understand base styles | Do not modify without design review |
| **src/i18n/messages/ar.ts** | Arabic translations | Source of truth for AR | Do not leave English in AR mode |
| **src/i18n/messages/en.ts** | English translations | Source of truth for EN | Do not leave Arabic in EN mode |
| **src/lib/brand/** | Brand Module patterns | Follow established patterns | Do not diverge without reason |
| **src/lib/core/** | Core utilities | Use existing utilities | Do not duplicate functionality |

---

## External Methodology Sources (Reference Only)

| Source | Consult For | Safe Use | Forbidden Use |
|--------|-------------|----------|---------------|
| **Prompt Master** | Intent extraction, templates, anti-patterns | Extract methodology concepts | Do not install as dependency |
| **AI Website Cloner** | Visual analysis framework | 8-step methodology for UI audit | Do not clone websites |
| **Mobbin** | UI inspiration, patterns | Reference for inspiration only | Do not copy layouts |
| **Godly** | Premium UI references | Reference for quality standards | Do not copy designs |
| **SaaSFrame** | SaaS UI patterns | Reference for patterns | Do not copy implementations |
| **Muzli** | Design inspiration | Reference for trends | Do not copy assets |
| **NN/g (Nielsen Norman Group)** | UX heuristics | Apply UX principles | Do not copy code |
| **Laws of UX** | UX laws and principles | Apply to design decisions | Do not copy implementations |
| **IxDF (Interaction Design Foundation)** | UX methodology | Reference for processes | Do not copy code |
| **WCAG** | Accessibility standards | Implement a11y correctly | Do not copy polyfills |
| **WAI-ARIA** | ARIA patterns | Implement accessibility | Do not copy without testing |
| **MDN** | Web API documentation | Understand behavior | Do not copy code blocks |
| **Apple HIG** | Design system reference | Reference for patterns | Do not copy components |
| **Material Design** | Design system reference | Reference for patterns | Do not copy components |
| **Fluent UI** | Design system reference | Reference for patterns | Do not copy components |
| **Carbon Design** | Design system reference | Reference for patterns | Do not copy components |
| **Polaris** | Design system reference | Reference for patterns | Do not copy components |
| **Atlassian Design** | Design system reference | Reference for patterns | Do not copy components |
| **Animation in Design Systems** | Motion principles | Apply motion theory | Do not copy animations |
| **Designing Interface Animation** | Motion patterns | Apply motion patterns | Do not copy implementations |
| **Design for Motion** | Motion theory | Understand motion purpose | Do not copy code |
| **Microinteractions Toolkit** | Micro-interaction patterns | Apply interaction patterns | Do not copy code |
| **Hook Point** | Growth/marketing psychology | Apply to marketing features | Do not copy implementations |
| **Growth Hacker Marketing** | Growth strategies | Apply to product strategy | Do not copy code |
| **ChatGPT/Claude/Kimi research** | Technical explanations | Understand concepts | Do not copy code blindly |

---

## Evidence Hierarchy

When sources conflict, priority order:

1. **AGENTS.md** and **CASCADE_PROJECT_RULES.md** — Always wins
2. **.devin/rules/*** — Specific domain rules
3. **Internal source code** — Actual implementation truth
4. **Project reports** — Documented decisions
5. **External methodology** — Guidance and patterns
6. **External benchmarks** — Inspiration only

---

## Source Consultation Checklist

Before implementation, verify:

- [ ] AGENTS.md read and rules acknowledged
- [ ] Relevant .devin/rules/ consulted
- [ ] Design system (v8-tokens.css) reviewed
- [ ] i18n messages checked for existing keys
- [ ] Similar components in src/ reviewed for patterns
- [ ] Previous reports reviewed for lessons learned
- [ ] External sources used only as methodology (not code)

---

## Forbidden Practices

Never:
- Copy code from external repositories
- Copy layouts from competitor sites
- Copy assets, fonts, or logos
- Use external code blocks without understanding
- Treat external sources as product truth
- Ignore internal sources for external convenience

---

*Matrix version: 1.0.0*
*Last updated: 2026-06-15*
