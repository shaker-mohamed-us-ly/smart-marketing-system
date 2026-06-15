# External Tools Registry

## Purpose

This directory contains methodology documentation for external tools, frameworks, and references used by Cascade in the Smart Marketing System.

**Critical Principle:** All external sources are **methodology and reference only**. Cascade remains the sole implementation agent. No external tool directly modifies project files.

---

## Status: Internal Methodology Only

| Capability | Status |
|------------|--------|
| Live external advisor connected | **NO** |
| External API integration (OpenAI, Claude, etc.) | **NOT ACTIVE** |
| Windsurf Skills infrastructure | **YES** — Created |
| Windsurf Workflows | **YES** — Created |
| Internal methodology extraction | **YES** — Complete |

**Live external advisor connection requires future user approval and may involve:**
- MCP configuration changes
- API key setup
- Additional package installation
- IDE restart

---

## Current Supported Internal Methodology

| Methodology | Source | Application |
|-------------|--------|-------------|
| **Prompt Master** | `nidhinjs/prompt-master` | Intent extraction, templates, anti-patterns |
| **AI Website Cloner** | `JCodesMore/ai-website-cloner-template` | Visual analysis framework (8-step methodology) |
| **Visual QA** | SMS project + external references | Browser QA, screenshot validation, computed styles |
| **Self-Healing** | SMS Smart Repair OS | Tooling repair, system bug classification |
| **MCP Registry** | Project MCP config | Tool selection and routing |

---

## Safe Use Policy

### Allowed

✅ Reference external methodology for:
- Prompt quality patterns
- Visual analysis frameworks
- UX heuristics and principles
- Architecture patterns (adapted)
- Code structure concepts (pseudocode only)
- Design system references
- Animation principles

### Forbidden

❌ Never:
- Install external methodology repos as dependencies
- Clone external websites
- Copy external code, assets, fonts, or logos
- Copy UI layouts from competitor sites
- Use external API keys without explicit approval
- Modify MCP configuration without approval
- Paste code blocks from external sources without review
- Treat external sources as product truth over AGENTS.md

---

## Methodology Documents

| Document | Content |
|----------|---------|
| `prompt-master-methodology.md` | Intent extraction, 13 templates, 37 anti-patterns, SMS adaptation |
| `website-cloning-methodology.md` | 8-step visual analysis framework (design intelligence only) |
| `visual-qa-methodology.md` | Browser QA, screenshot validation, computed styles |
| `self-healing-methodology.md` | Smart Repair OS, failure classification, FIX stamps |
| `mcp-tool-registry.md` | MCP server status and recommendations |

---

## Future v2: Live Advisor Plan

### Phase 1: Infrastructure (COMPLETE)
- ✅ Skills created
- ✅ Workflows created
- ✅ Methodology docs extracted
- ✅ Safety filters defined

### Phase 2: Live Connection (FUTURE - REQUIRES APPROVAL)
Potential options:

| Option | Requirements |
|--------|--------------|
| **Sequential Thinking MCP** | IDE restart to activate |
| **Custom Advisor MCP** | MCP configuration, potential API key |
| **Context7 Enhancement** | Already available for docs |
| **OpenAI SDK Activation** | API key, explicit approval |

**User approval needed for:**
- Any MCP configuration changes
- Any API key or secret usage
- Any external service connection
- Any package installation

---

## Directory Structure

```
docs/cascade/external-tools/
├── README.md                    # This file
├── prompt-master-methodology.md # Prompt engineering methodology
├── website-cloning-methodology.md # Visual analysis methodology
├── visual-qa-methodology.md     # Browser QA methodology
├── self-healing-methodology.md  # Repair and recovery methodology
└── mcp-tool-registry.md         # MCP tool documentation
```

---

## Related Internal Infrastructure

| Component | Location |
|-----------|----------|
| SONIC External Advisor Skill | `.windsurf/skills/sonic-external-advisor-bridge/` |
| SONIC Task Workflow | `.windsurf/workflows/sonic-external-advisor-task.md` |
| Prompt Blueprints | `docs/cascade-prompt-blueprints/` |
| Project Rules | `.devin/rules/` |
| Project Identity | `AGENTS.md` |
| Smart Repair OS | `scripts/tooling/smart-repair-os.mjs` |

---

*Registry version: 1.0.0*
*Status: Internal methodology only — No live external advisor connected*
*Last updated: 2026-06-15*
