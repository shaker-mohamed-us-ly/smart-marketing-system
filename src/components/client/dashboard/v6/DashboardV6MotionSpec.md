# Dashboard V6.2 Motion Specification

## Source References

- Adobe Animation in Design Systems
- Val Head - Designing Interface Animation
- Microinteractions Toolkit
- Google Material Design 3 Motion

## Motion Tokens

### Duration Tokens (Material Design 3)

| Token | Value | Use Case |
|-------|-------|----------|
| motion.duration.press | 120ms–150ms | Tactile feedback (button tap, icon tap) |
| motion.duration.hover | 160ms–220ms | Hover response (card hover, icon hover) |
| motion.duration.reveal | 220ms–300ms | Content reveal (card enter, row enter) |
| motion.duration.status | 1800ms–2400ms | Status breathing (connected pulse, unread pulse) |

### Easing Tokens (Material Design 3)

| Token | Value | Use Case |
|-------|-------|----------|
| motion.ease.standard | cubic-bezier(0.4, 0, 0.2, 1) | Standard transitions |
| motion.ease.enter | cubic-bezier(0.2, 0.8, 0.2, 1) | Emphasized entry (card reveal) |
| motion.ease.press | cubic-bezier(0.34, 1.56, 0.64, 1) | Tactile press (button tap) |

## Motion Classes

### Hero Panel

| Class | Trigger | Rules | Feedback | Loop/Mode | Duration |
|-------|---------|-------|---------|-----------|----------|
| v6-hero-enter | Page load | Opacity 0→1, translateY 12px→0 | Hero appears | Once | 280ms |

### Metric Cards

| Class | Trigger | Rules | Feedback | Loop/Mode | Duration |
|-------|---------|-------|---------|-----------|----------|
| v6-metric-enter | Page load (staggered) | Opacity 0→1, translateY 16px→0, scale 0.98→1 | Metrics appear | Once | 260ms |
| v6-signal-reveal | Card enter | scaleX 0→1 | Signal state revealed | Once | 280ms |

### Operations Board

| Class | Trigger | Rules | Feedback | Loop/Mode | Duration |
|-------|---------|-------|---------|-----------|----------|
| v6-ops-row-enter | Page load (staggered) | Opacity 0→1, translateY 8px→0 | Rows appear | Once | 220ms |
| v6-unread-pulse | Unread state | scale 1→1.5, opacity 0.3→0 | Attention to unread | Loop 2.2s | 2.2s |

### Channel Dock

| Class | Trigger | Rules | Feedback | Loop/Mode | Duration |
|-------|---------|-------|---------|-----------|----------|
| v6-channel-enter | Page load (staggered) | Opacity 0→1, translateY 12px→0 | Channels appear | Once | 240ms |
| v6-connected-breathe | Connected state | scale 1→1.6, opacity 0.4→0 | Connection alive | Loop 2.1s | 2.1s |
| v6-syncing-pulse | Syncing state | scale 1→1.4, opacity 0.5→0.2 | Sync in progress | Loop 1.8s | 1.8s |

### Buttons

| Class | Trigger | Rules | Feedback | Loop/Mode | Duration |
|-------|---------|-------|---------|-----------|----------|
| v6-button-press | Tap/click | scale 1→0.985, translateY 0→1px | Tactile response | Once | 140ms |
| v6-liquid-sweep | Hover on primary | translateX -120%→120%, opacity 0→1 | Liquid sweep effect | Once | 220ms |
| v6-aurora-border | Hover on secondary | opacity 0→0.6, scale 1→1.02 | Aurora border glow | Once | 220ms |

### Icons

| Class | Trigger | Rules | Feedback | Loop/Mode | Duration |
|-------|---------|-------|---------|-----------|----------|
| v6-icon-micro | Hover/focus | translateY 0→-1px, translateX 0→1px, opacity 1→0.9 | Icon feedback | Once | 180ms |
| v6-icon-frame | Hover/focus | scale 1→1.02 | Frame glow | Once | 180ms |
| v6-icon-tap | Tap/click | scale 1→0.96 | Tactile response | Once | 120ms |

### Insight Rail

| Class | Trigger | Rules | Feedback | Loop/Mode | Duration |
|-------|---------|-------|---------|-----------|----------|
| v6-insight-enter | Page load (staggered) | Opacity 0→1, translateY 10px→0 | Insights appear | Once | 240ms |

## Reduced Motion Support

All motion classes respect `@media (prefers-reduced-motion: reduce)`:

- Pulse loops disabled (status-breathe, unread-pulse, syncing-pulse)
- Transform movement disabled (enter animations, hover effects)
- Instant opacity only for reveals
- Liquid sweep and aurora border hidden
- Icon hover uses color/opacity only, no movement
- Tap effects instant only

## Microinteraction Anatomy Examples

### Primary CTA Button
- **Trigger:** Hover, focus, tap/click
- **Rules:** Slight press, liquid sweep inside button only
- **Feedback:** Tactile response and brightness burst
- **Loop/Mode:** No idle loop
- **Duration:** 140ms click, 220ms hover
- **Reduced motion:** Color/opacity only

### Connected Channel Status
- **Trigger:** Connection active
- **Rules:** Emerald dot + active rail
- **Feedback:** Breathing pulse
- **Loop/Mode:** Subtle continuous status loop
- **Reduced motion:** Static dot

### Unread Activity Item
- **Trigger:** Unread/latest state
- **Rules:** Unread dot breathes softly
- **Feedback:** User notices new item without distraction
- **Loop/Mode:** Subtle loop until read state exists later
- **Reduced motion:** Static dot

### Metric Signal Rail
- **Trigger:** Card appears
- **Rules:** Semantic rail reveals with scaleX
- **Feedback:** Score/status becomes understandable
- **Loop/Mode:** Reveal once
- **Duration:** 260ms–300ms
- **Reduced motion:** Show final rail instantly
