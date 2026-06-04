# UI Quality Rules

## Verification Requirements

- **Playwright screenshots** before and after any UI change.
- **Computed styles** check for critical elements.
- **Console logs** checked for errors and warnings.
- **Network requests** checked for failures.

## Responsive Breakpoints

Validate at minimum:
- Desktop (1280px+)
- Tablet (768px)
- Mobile (375px)

## Language Modes

- **RTL mode (Arabic):** No visible English text. All headings, buttons, labels must be Arabic.
- **LTR mode (English):** No visible Arabic text. All headings, buttons, labels must be English.
- **No raw translation keys** exposed anywhere.

## Theme Modes

- **Dark mode:** Graphite/Charcoal palette.
- **Light mode:** Warm gray / off-white palette.
- Both modes must be validated with screenshots.

## Design Language

- **Premium Centered Canvas** layout.
- No cramped spacing.
- No misaligned elements.
- No broken icons.

## Accessibility

- Use `@axe-core/playwright` smoke scan when dev server is running.
- Check color contrast.
- Check focus states.
- Check keyboard navigation.

## No Assumed PASS

Every UI claim must be backed by:
- Screenshot evidence, OR
- Playwright snapshot evidence, OR
- axe-core scan results
