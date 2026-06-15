# AI Website Cloner Methodology

## Source

- **Repository:** `JCodesMore/ai-website-cloner-template`
- **Type:** Template repository + AI agent skill
- **Status:** **Methodology only — do not install, do not clone**

---

## Purpose

Use AI Website Cloner Template as **Design Intelligence** framework only:
- Analyze screenshots to detect visual defects
- Extract computed styles for geometry understanding
- Write component specs to document desired states
- Recommend micro-fixes based on visual evidence
- Validate fixes with before/after screenshots

---

## Safe Use: 8-Step Methodology

### Step 1: Inspect
Review existing UI state via screenshots.

### Step 2: Capture
Take authenticated screenshots with Playwright MCP.

### Step 3: Extract
Identify visual defects and extract computed styles.

### Step 4: Analyze
Compare against V8 design tokens and project standards.

### Step 5: Specify
Write component specs with desired geometry, colors, spacing.

### Step 6: Brainstorm
Consider multiple fix approaches; select smallest safe fix.

### Step 7: Implement
Apply micro-fix within scope.

### Step 8: Validate
Capture after screenshots; verify improvement.

---

## Visual Defect Categories

| Category | Detection | Fix Approach |
|----------|-----------|--------------|
| **Typography** | Font size, weight, line-height issues | Apply V8 token |
| **Spacing** | Padding, margin, gap inconsistencies | Use 4px/8px grid |
| **Color** | Token mismatch, contrast issues | Update to CSS vars |
| **Shadow** | Inconsistent opacity/blur | Apply V8 shadow tokens |
| **Icon** | Frame size, stroke width, centering | Uniform sizing |
| **Button** | Border-radius, padding, gradient | Geometry standards |
| **Motion** | Easing, duration issues | cubic-bezier fixes |
| **Responsive** | Breakpoint behavior | Media query updates |
| **RTL** | Logical property issues | Use `inset-inline-start`, etc. |

---

## Computed Style Extraction

Use Playwright MCP:

```javascript
// Example extraction
page.evaluate((selector) => {
  const el = document.querySelector(selector);
  const styles = getComputedStyle(el);
  return {
    width: styles.width,
    height: styles.height,
    padding: styles.padding,
    margin: styles.margin,
    borderRadius: styles.borderRadius,
    backgroundColor: styles.backgroundColor,
    color: styles.color,
    fontSize: styles.fontSize,
    fontWeight: styles.fontWeight,
  };
}, selector);
```

**Targets:**
- Topbar, Sidebar
- Brand capsule, Quick Action buttons
- Channel cards, Icon frames
- Main canvas, Page containers

---

## UI Gates Checklist

### Typography
- [ ] Font sizes follow token scale
- [ ] Font weights: 600 labels, 700 headings, 400-500 body
- [ ] Line heights: 1.2–1.5
- [ ] Letter spacing: 0.05em for uppercase

### Spacing
- [ ] 4px or 8px grid alignment
- [ ] Consistent margins within component families
- [ ] Gap values align with tokens
- [ ] No arbitrary magic numbers

### Golden Ratio
- [ ] Button height : border-radius ≈ 2:1
- [ ] Icon frame : icon size ≈ 1.6:1
- [ ] Card padding : radius ≈ 1:1
- [ ] Sidebar width : logo width ≈ 2:1 to 3:1

### Color
- [ ] CSS custom properties (not hardcoded hex)
- [ ] Dark mode tokens defined
- [ ] WCAG AA contrast (4.5:1 normal, 3:1 large)
- [ ] No gradient artifacts at edges

### Shadows
- [ ] Consistent opacity and blur
- [ ] Max 2 shadow layers per element
- [ ] Dark mode: darker, more diffuse
- [ ] No artifacts at border-radius corners

### Icons
- [ ] Consistent stroke width (1.75–2.0)
- [ ] Consistent frame size per family
- [ ] Recognizable platform glyphs
- [ ] Centered with flex or object-fit

### Buttons
- [ ] Primary: pill shape (44px → 22px radius)
- [ ] Secondary: rounded rect (12–14px radius)
- [ ] Mini/ghost: smaller (10–11px radius)
- [ ] No edge artifacts

### Motion
- [ ] Easing: `cubic-bezier(0.2, 0.8, 0.2, 1)`
- [ ] Duration: 140–220ms micro-interactions
- [ ] No will-change on static elements
- [ ] Respects `prefers-reduced-motion`

### Responsive
- [ ] Breakpoints: 640px, 768px, 1024px
- [ ] Sidebar handles mobile (collapses/drawer)
- [ ] Topbar controls accessible
- [ ] No horizontal scroll

### Accessibility
- [ ] Focus-visible: 2px outline, 2px offset
- [ ] ARIA attributes on interactive elements
- [ ] Color not sole state indicator
- [ ] Keyboard navigation works

### RTL/LTR
- [ ] Logical properties: `inset-inline-start`, `padding-inline`
- [ ] `[dir="rtl"]` selectors for asymmetrics
- [ ] Text alignment flips correctly
- [ ] Icon direction doesn't break layout

### i18n
- [ ] All strings use `next-intl` `t('key')`
- [ ] No hardcoded English/Arabic in JSX
- [ ] `i18n:visible` passes
- [ ] Titles don't expose PII

---

## Forbidden Use

❌ Never:
- Clone external websites
- Download external assets, images, fonts
- Copy code from cloned outputs
- Install the AI Website Cloner repo
- Paste code from external sources
- Mimic competitor branding verbatim

---

## Acceptance Rule

> **Screenshot is primary proof.**
> **Computed styles are secondary proof.**
> **Validation/build alone is NOT enough.**

A fix is **NOT accepted** unless:
1. Before screenshot shows defect clearly
2. After screenshot shows defect resolved
3. Computed styles match spec (±1px / ±1%)
4. TypeScript compiles without errors
5. No forbidden files modified

---

## Evidence Requirements

| Artifact | Path Pattern |
|----------|--------------|
| Before screenshot | `reports/dashboard/*-before-*.png` |
| After screenshot | `reports/dashboard/*-after-*.png` |
| Computed styles | `reports/dashboard/*-computed-*.json` |
| Audit report | `reports/dashboard/DESIGN_INTELLIGENCE_*.md` |
| Activation report | `reports/workspace/AI_WEBSITE_CLONER_*.md` |

---

*Methodology extracted from: AI Website Cloner Template pipeline*
*Application: SMS visual QA and UI repair*
*Status: Methodology only — no cloning, no copying*
