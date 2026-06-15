# Visual QA Methodology

## Purpose

Systematic browser-based quality assurance using Playwright MCP for screenshot evidence, computed styles, and visual validation.

---

## Tool: Playwright MCP

**MCP Server:** `devin/mcp-playwright`  
**Status:** IDE-integrated, active  
**Capabilities:** Screenshots, snapshots, console logs, network requests, computed styles

---

## Screenshot Requirements

### For Every UI Change

| Type | Required | Purpose |
|------|----------|---------|
| Before | Yes | Baseline for comparison |
| After | Yes | Proof of change |
| Desktop (1280px+) | Yes | Primary viewport |
| Tablet (768px) | Yes | Responsive check |
| Mobile (375px) | Yes | Mobile experience |
| RTL | Yes | Arabic mode validation |
| LTR | Yes | English mode validation |
| Dark | Yes | Dark theme validation |
| Light | Yes | Light theme validation |

### Screenshot Checklist

```markdown
## Browser QA Evidence

### Desktop (1280px)
- [ ] Screenshot captured: [path]
- [ ] Console errors: [none/list]
- [ ] Network failures: [none/list]

### Tablet (768px)
- [ ] Screenshot captured: [path]
- [ ] Layout intact: [yes/no]

### Mobile (375px)
- [ ] Screenshot captured: [path]
- [ ] No horizontal scroll: [yes/no]

### RTL Mode
- [ ] Screenshot captured: [path]
- [ ] Text alignment correct: [yes/no]
- [ ] Icon direction correct: [yes/no]

### Dark Mode
- [ ] Screenshot captured: [path]
- [ ] Contrast acceptable: [yes/no]
```

---

## Computed Style Extraction

Use Playwright MCP `browser_evaluate` to extract styles:

```javascript
// Computed style extraction pattern
const styles = await page.evaluate((selector) => {
  const el = document.querySelector(selector);
  if (!el) return null;
  const computed = getComputedStyle(el);
  return {
    // Geometry
    width: computed.width,
    height: computed.height,
    padding: computed.padding,
    margin: computed.margin,
    
    // Visual
    backgroundColor: computed.backgroundColor,
    color: computed.color,
    borderRadius: computed.borderRadius,
    border: computed.border,
    boxShadow: computed.boxShadow,
    
    // Typography
    fontSize: computed.fontSize,
    fontWeight: computed.fontWeight,
    lineHeight: computed.lineHeight,
    
    // Layout
    display: computed.display,
    position: computed.position,
    gap: computed.gap,
  };
}, selector);
```

### Key Elements to Extract

| Element | Selector Pattern |
|---------|-----------------|
| Topbar | `header`, `[class*="topbar"]` |
| Sidebar | `aside`, `[class*="sidebar"]` |
| Brand capsule | `[class*="brandCapsule"]` |
| Quick Action button | `[class*="btnPrimary"]` |
| Channel card | `[class*="channelCard"]` |
| Icon frame | `[class*="iconFrame"]` |
| Main canvas | `main`, `[class*="mainCanvas"]` |

---

## Console Log Validation

Check for errors after each UI change:

```javascript
// Console messages check
const logs = await page.evaluate(() => {
  return window.consoleLogs || [];
});

// Must be empty or only warnings (no errors)
```

**Stop conditions:**
- Red console errors → Fix before proceeding
- Warnings → Document, fix if related to change

---

## axe-core Accessibility

Use `@axe-core/playwright` when dev server running:

```bash
npm run tool:a11y:dashboard
```

**Note:** `SKIPPED_DEV_SERVER_NOT_RUNNING` is **not** PASS.

---

## Visual Comparison

### Before/After Criteria

| Aspect | Tolerance | Action if Exceeded |
|--------|-----------|-------------------|
| Width/Height | ±1px | Verify intentional |
| Padding/Margin | ±1px | Verify matches spec |
| Font size | ±0.5px | Verify token compliance |
| Colors | Exact match | Must match tokens |
| Border radius | ±1px | Verify geometry |

### Defect Classification

| Severity | Definition | Example |
|----------|-----------|---------|
| **Blocker** | Breaks functionality, blocks release | Component doesn't render |
| **Critical** | Major visual defect, obvious to users | Misaligned hero, broken layout |
| **Major** | Noticeable defect, affects experience | Wrong spacing, color mismatch |
| **Minor** | Small defect, may not be noticed | Slight misalignment |
| **Trivial** | Cosmetic, barely noticeable | 1px difference in padding |

---

## Validation Gates

### UI Task Must Pass

| Gate | Command | Threshold |
|------|---------|-----------|
| TypeScript | `npm run typecheck` | 0 errors |
| i18n visible | `npm run i18n:visible` | 0 hardcoded strings |
| UI titles | `npm run ui:titles` | 0 empty headings |
| Screenshots | Playwright MCP | All viewports captured |
| Console | Browser logs | 0 errors |
| axe-core | `npm run tool:a11y:dashboard` | 0 violations (if dev server running) |

---

## Safe Use

✅ Always:
- Capture before/after screenshots
- Test all viewports
- Test RTL and LTR
- Test dark and light themes
- Extract computed styles for key elements
- Check console for errors
- Document visual defects with screenshots

---

## Forbidden

❌ Never:
- Claim UI PASS without screenshots
- Skip responsive testing
- Ignore console errors
- Treat `SKIPPED` as `PASS`
- Rely on visual inspection alone

---

## Evidence Storage

| Evidence Type | Location Pattern |
|---------------|-----------------|
| Screenshots | `reports/dashboard/*-{before,after}-{viewport}.png` |
| Computed styles | `reports/dashboard/*-computed-{before,after}.json` |
| Console logs | `reports/dashboard/*-console.json` |
| Network logs | `reports/dashboard/*-network.json` |
| QA reports | `reports/workspace/*_BROWSER_QA_*.md` |

---

## Stop Conditions

STOP visual QA if:
1. Playwright MCP unavailable and no fallback possible
2. Dev server down for required axe-core scan
3. Screenshot capture fails repeatedly
4. Console shows persistent errors outside scope

Apply Smart Repair OS for tooling issues.

---

*Methodology: SMS Visual QA + Playwright MCP*
*Standards: V8 Design System, RTL/LTR mandatory, Arabic-first*
