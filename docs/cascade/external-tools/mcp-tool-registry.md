# MCP Tool Registry

## Status

**Live external advisor connected: NO**

This registry documents MCP server status and recommendations for future advisor integration.

---

## Current MCP Servers

### Active (IDE-Integrated)

| Server | Status | Safe? | Needs Credentials? | Use Case |
|--------|--------|-------|-------------------|----------|
| **Playwright MCP** (`devin/mcp-playwright`) | Active | Yes | No | UI QA, screenshots, computed styles |
| **Context7 MCP** (`devin/context7`) | Active (transport may need restart) | Yes | No | Technical documentation lookup |

### Configured (in `.mcp.json`)

| Server | Status | Needs Restart? | Safe? | Use Case |
|--------|--------|---------------|-------|----------|
| **next-devtools** | Configured | No | Yes | Next.js framework inspection |
| **sequential-thinking** | Configured | **Yes** | Yes | Structured reasoning (NOT ACTIVE) |

### Not Configured

| Server | Status | Needs Credentials? | Risk | Recommendation |
|--------|--------|-------------------|------|----------------|
| **GitHub MCP** | Not configured | PAT token | Medium | Cautious — needs security review |
| **Supabase MCP** | Not configured | Service role key | **High** | Forbidden per AGENTS.md |
| **Vercel MCP** | Not configured | API token | Medium | Cautious — needs security review |
| **Filesystem MCP** | Not configured | No | Low | Safe to add later |
| **Browser MCP** | Not configured | No | Low | Playwright MCP is stronger |

---

## `.mcp.json` Current Configuration

```json
{
  "mcpServers": {
    "next-devtools": {
      "command": "npx",
      "args": ["-y", "next-devtools-mcp@latest"]
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}
```

---

## Tool Routing

### For UI Tasks

| Tool | Use | Skip When |
|------|-----|-----------|
| **Playwright MCP** | Screenshots, computed styles, console logs | Dev server down (document fallback) |
| **axe-core** | Accessibility scan | `SKIPPED_DEV_SERVER_NOT_RUNNING` |

### For Technical Decisions

| Tool | Use | Skip When |
|------|-----|-----------|
| **Context7** | Fresh docs for Next.js, React, Tailwind | Transport is down |
| **next-devtools** | Next.js framework inspection | Non-Next.js issues |

### For Complex Reasoning

| Tool | Status | Note |
|------|--------|------|
| **Sequential Thinking** | Configured, NOT ACTIVE | Requires IDE restart to activate |

---

## Future MCP Options (Require Approval)

### Option 1: Activate Sequential Thinking

**Requirements:**
- IDE restart
- May break current transport

**Use:**
- Structured reasoning for complex tasks
- Multi-step planning

**Risk:** Low (already configured)

---

### Option 2: Add Filesystem MCP

**Requirements:**
- `.mcp.json` modification (needs approval)
- No credentials needed

**Use:**
- Direct file read/write

**Risk:** Low

---

### Option 3: Add GitHub MCP

**Requirements:**
- `.mcp.json` modification
- Personal Access Token

**Use:**
- PR review
- Issue management

**Risk:** Medium (token security)

---

### Option 4: Custom Advisor MCP

**Requirements:**
- Custom MCP server development
- Potential API key (OpenAI/Claude)
- `.mcp.json` modification

**Use:**
- Live external advisor consultation
- Complex task guidance

**Risk:** Medium-High (depends on implementation)

---

## MCP Safety Rules

### Allowed

✅ Use existing active MCPs:
- Playwright MCP for UI QA
- Context7 for docs (when transport working)

✅ Reference configured MCPs:
- next-devtools for Next.js inspection
- sequential-thinking (if activated)

### Forbidden

❌ Never without explicit approval:
- Modify `.mcp.json`
- Add new MCP servers
- Activate sequential-thinking without restart plan
- Use Supabase MCP (forbidden per AGENTS.md)
- Expose API keys in MCP config

---

## Current Recommendation

**Do NOT modify MCP configuration in this step.**

Internal methodology (Prompt Master extraction, AI Website Cloner methodology) is sufficient for current needs.

**Future activation of live advisor requires:**
1. User explicit approval
2. Security review of MCP config
3. API key management plan
4. IDE restart coordination
5. Fallback plan if transport breaks

---

## No MCP Changes Policy

This Step 2 (SONIC_INTERNAL_SKILL_WORKFLOW_BUILD) explicitly:
- Does NOT modify `.mcp.json`
- Does NOT add new MCP servers
- Does NOT activate sequential-thinking
- Does NOT connect live external advisor
- Uses internal methodology only

---

*Registry version: 1.0.0*
*Status: Documentation only — No MCP config changes*
*Last updated: 2026-06-15*
