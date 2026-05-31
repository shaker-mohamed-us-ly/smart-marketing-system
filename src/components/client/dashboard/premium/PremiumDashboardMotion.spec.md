# Premium Dashboard Motion Language V4.6

## Motion Philosophy

Motion must be purposeful, sharp, enjoyable, and performant. Every animation serves a specific function: feedback, orientation, attention, or causality. No decorative motion without state meaning.

---

## 6 Core Principles

### 1. Purposeful
Every animation must explain state, feedback, hierarchy, or causality. No motion exists without a clear purpose.

### 2. Fast
- Essential feedback: under 200ms
- Reveals: 220ms–300ms
- No essential motion above 400ms

### 3. Directional
Motion guides the user's eye. Use consistent RTL-aware entrance direction where possible.

### 4. Tactile
Buttons, icons, and interactive chips feel pressable through scale, opacity, and light.

### 5. Respectful
No motion harms accessibility. Respects prefers-reduced-motion.

### 6. Mobile-Ready
Every hover motion has a tap/focus equivalent. No interaction meaning relies on hover alone.

---

## Motion Anatomy

For every motion, define:

- **Trigger**: What initiates the motion
- **Rules**: What the motion does
- **Feedback**: What the user perceives
- **Loop/Mode**: Whether it repeats or is one-time
- **Duration**: How long it takes
- **Easing**: The timing curve
- **CSS Properties**: What animates
- **Reduced-Motion Behavior**: Fallback for accessibility
- **Mobile/Tap Equivalent**: Non-hover interaction

---

## Motion Catalog

### Card Enter (motion-card-enter)
- **Purpose**: Orientation + reveal
- **Trigger**: Component mount
- **Rules**: opacity 0 → 1, transform translateY(8px) → translateY(0)
- **Feedback**: Content fades in with subtle lift
- **Loop/Mode**: One-time
- **Duration**: 260ms
- **Easing**: cubic-bezier(0.2, 0.8, 0.2, 1)
- **CSS Properties**: opacity, transform
- **Reduced-Motion**: Instant opacity only, no transform
- **Mobile/Tap**: Same as desktop

### Card Hover (motion-card-hover)
- **Purpose**: Subtle interactivity
- **Trigger**: hover/focus
- **Rules**: transform translateY(-1px)
- **Feedback**: Card lifts slightly
- **Loop/Mode**: Reversible
- **Duration**: 180ms
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **CSS Properties**: transform
- **Reduced-Motion**: No transform, opacity only
- **Mobile/Tap**: No hover, tap uses button-press

### Button Press (motion-button-press)
- **Purpose**: Tactile feedback
- **Trigger**: active/tap
- **Rules**: transform scale(0.985) translateY(1px)
- **Feedback**: Button compresses
- **Loop/Mode**: Reversible
- **Duration**: 140ms
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **CSS Properties**: transform
- **Reduced-Motion**: Instant only
- **Mobile/Tap**: Same as desktop

### Liquid Sweep (motion-liquid-sweep)
- **Purpose**: Primary CTA personality + feedback
- **Trigger**: hover on primary CTA
- **Rules**: Liquid wave moves inside button only
- **Feedback**: Premium wave effect
- **Loop/Mode**: Reversible
- **Duration**: 220ms hover, 140ms active burst
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **CSS Properties**: transform, opacity
- **Reduced-Motion**: Disabled, solid color only
- **Mobile/Tap**: Active burst only on tap

### Aurora Border (motion-aurora-border)
- **Purpose**: Secondary CTA attention
- **Trigger**: hover on secondary CTA
- **Rules**: Aurora glow behind button border only
- **Feedback**: Subtle border glow
- **Loop/Mode**: Reversible
- **Duration**: 220ms hover, 140ms active
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **CSS Properties**: opacity, scale
- **Reduced-Motion**: Disabled
- **Mobile/Tap**: Active brightness only

### Status Breathe (motion-status-breathe)
- **Purpose**: Connection state feedback
- **Trigger**: connection state is active
- **Rules**: Status dot ring pulse
- **Feedback**: Breathing green dot
- **Loop/Mode**: Continuous 2.1s
- **Duration**: 2.1s
- **Easing**: ease-in-out
- **CSS Properties**: opacity, scale
- **Reduced-Motion**: Static solid dot
- **Mobile/Tap**: Same as desktop

### Unread Pulse (motion-unread-pulse)
- **Purpose**: Attention for unread/latest activity
- **Trigger**: Latest/unread item
- **Rules**: Subtle pulse
- **Feedback**: Soft attention marker
- **Loop/Mode**: Continuous 2.2s
- **Duration**: 2.2s
- **Easing**: ease-in-out
- **CSS Properties**: opacity, scale
- **Reduced-Motion**: Static solid dot
- **Mobile/Tap**: Same as desktop

### Signal Reveal (motion-signal-reveal)
- **Purpose**: Metric state reveal
- **Trigger**: Card mount
- **Rules**: transform scaleX(0 → 1)
- **Feedback**: Progress bar fills
- **Loop/Mode**: One-time
- **Duration**: 300ms
- **Easing**: cubic-bezier(0.2, 0.8, 0.2, 1)
- **CSS Properties**: transform
- **Reduced-Motion**: Instant final state
- **Mobile/Tap**: Same as desktop

### Time Chip Arrive (motion-time-chip-arrive)
- **Purpose**: Time metadata appearance
- **Trigger**: Row mount
- **Rules**: opacity + translateY(2px)
- **Feedback**: Time chip fades in
- **Loop/Mode**: One-time
- **Duration**: 180ms
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **CSS Properties**: opacity, transform
- **Reduced-Motion**: Instant opacity
- **Mobile/Tap**: Same as desktop

### Ellipsis Affordance (motion-ellipsis-affordance)
- **Purpose**: Show expandable text affordance
- **Trigger**: Text truncation detected
- **Rules**: opacity + translateX/translateY 1px max
- **Feedback": Subtle affordance appears
- **Loop/Mode**: Reversible
- **Duration**: 160ms
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **CSS Properties**: opacity, transform
- **Reduced-Motion**: Instant opacity
- **Mobile/Tap**: Same as desktop

### Icon Soft Vector (motion-icon-soft-vector)
- **Purpose**: Premium icon feedback
- **Trigger**: hover/focus/tap
- **Rules**: 
  - Icon translates 1px–2px toward semantic direction
  - Icon opacity increases slightly
  - Optional tiny scale 1.04 max
  - Optional micro blur/unblur only if it does NOT reduce clarity
- **Feedback**: Icon feels alive
- **Loop/Mode**: Reversible
- **Duration**: 160ms–200ms
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **CSS Properties**: transform, opacity, filter
- **Reduced-Motion**: Color/opacity only, no movement
- **Mobile/Tap**: Active scale 0.96

### Icon Frame Glow (motion-icon-frame-glow)
- **Purpose**: Make icon frame feel alive without card glow
- **Trigger**: hover/focus
- **Rules**: 
  - Icon frame border/background subtly strengthens
  - No glow behind card
  - Glow remains inside icon frame only
- **Feedback**: Frame brightens
- **Loop/Mode**: Reversible
- **Duration**: 180ms
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **CSS Properties**: opacity, transform, background/border
- **Reduced-Motion**: Color only, no transform
- **Mobile/Tap**: Active scale 0.96

### Icon Tap Pop (motion-icon-tap-pop)
- **Purpose**: Mobile/tap feedback
- **Trigger**: active/tap
- **Rules**: Active scale 0.96 then return
- **Feedback**: Tactile press
- **Loop/Mode**: Reversible
- **Duration**: 120ms
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **CSS Properties**: transform
- **Reduced-Motion**: Instant only
- **Mobile/Tap**: Same as desktop

---

## Reduced Motion Support

@media (prefers-reduced-motion: reduce) {
  - Disable pulse loops
  - Disable translate/scale movement
  - Keep instant opacity only if needed
  - No liquid sweep
  - No aurora movement
  - No signal reveal motion; show final state
  - Icon hover uses color/opacity only, no movement
}

---

## Mobile/Tap Equivalents

Every hover motion must have a non-hover equivalent:

- **Card hover**: No mobile equivalent (cards don't hover on mobile)
- **Button hover**: Active/tap state provides same feedback
- **Icon hover**: Active/tap scale 0.96
- **Status pulse**: Same as desktop (continuous)
- **Signal reveal**: Same as desktop (one-time)
- **Time chip**: Same as desktop (one-time)

---

## Duration Tokens

- Productive (common): 100ms–220ms
- Expressive (key moments): 220ms–300ms
- Status loops: 1.8s–2.4s
- No essential motion above 400ms

---

## Easing Tokens

- Smooth: cubic-bezier(0.4, 0, 0.2, 1)
- Snappy: cubic-bezier(0.34, 1.56, 0.64, 1)
- Linear: linear (for status loops)

---

## Motion Hierarchy

1. **Productive Motion** (default)
   - Card hover, row hover, mini button hover
   - Time chips, channel status, icon micro-motion
   - Timing: 100ms–220ms
   - Feel: Fast, quiet, functional

2. **Expressive Motion** (key moments)
   - Primary CTA liquid press
   - Secondary CTA aurora border
   - Metric signal reveal
   - Initial section reveal
   - Timing: 220ms–300ms
   - Feel: Premium, controlled, memorable

**Rule**: Expressive motion cannot be used on every card. Productive motion is default.
