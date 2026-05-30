# I18N Browser QA Checklist

**Project:** Smart Marketing System  
**Purpose:** Browser-first visual audit of Arabic mode for visible English strings  
**Date:** 2025-05-29  
**Status:** IN PROGRESS

---

## Instructions

1. Run `npm run dev`
2. Switch to Arabic mode (العربية)
3. Navigate to each route listed below
4. Check each column for Arabic correctness
5. Mark PASS/FAIL/PENDING based on visual inspection
6. Add notes for any issues found

**Important:** Browser-visible English is the source of truth. If scripts report 0 but browser shows English, browser result wins.

---

## Client Platform Routes

| Route | Header Arabic | Sidebar Arabic | Page Title Arabic | Cards Arabic | Buttons Arabic | Status Arabic | Tables Arabic | No Generic English | No Raw Key Leakage | RTL OK | No Overflow | Navigation Fast | PASS/FAIL/PENDING | Notes |
|-------|---------------|----------------|------------------|-------------|---------------|---------------|---------------|-------------------|---------------------|--------|-------------|-----------------|------------------|-------|
| /client/dashboard | | | | | | | | | | | | | | |
| /client/campaigns | | | | | | | | | | | | | | |
| /client/analytics | | | | | | | | | | | | | | |
| /client/brand-dna | | | | | | | | | | | | | | |
| /client/content-studio | | | | | | | | | | | | | | |
| /client/publishing | | | | | | | | | | | | | | |
| /client/recommendations | | | | | | | | | | | | | | |
| /client/settings | | | | | | | | | | | | | | |

---

## Control / Admin Platform Routes

| Route | Header Arabic | Sidebar Arabic | Page Title Arabic | Cards Arabic | Buttons Arabic | Status Arabic | Tables Arabic | No Generic English | No Raw Key Leakage | RTL OK | No Overflow | Navigation Fast | PASS/FAIL/PENDING | Notes |
|-------|---------------|----------------|------------------|-------------|---------------|---------------|---------------|-------------------|---------------------|--------|-------------|-----------------|------------------|-------|
| /control/overview | | | | | | | | | | | | | |
| /control/ai-brain | | | | | | | | | | | | | |
| /control/integrations | | | | | | | | | | | | | |
| /control/monitoring | | | | | | | | | | | | | |
| /control/clients | | | | | | | | | | | | | |
| /control/billing | | | | | | | | | | | | | |
| /control/backup | | | | | | | | | | | | | |
| /control/system-settings | | | | | | | | | | | | | |
| /control/learning-center | | | | | | | | | | | | | |

---

## Checklist Criteria

### Header Arabic
- Greeting text is in Arabic
- Platform label is in Arabic
- Search placeholder is in Arabic

### Sidebar Arabic
- All navigation items are in Arabic
- Platform indicator is in Arabic
- System intelligence section is in Arabic

### Page Title Arabic
- Main page title is in Arabic
- Subtitle is in Arabic
- Hero section text is in Arabic

### Cards Arabic
- Card titles are in Arabic
- Card descriptions are in Arabic
- Card labels are in Arabic
- Card values are in Arabic

### Buttons Arabic
- Button labels are in Arabic
- Action text is in Arabic
- No English button text

### Status Arabic
- Status labels are in Arabic
- Active/inactive states are in Arabic
- Health indicators are in Arabic

### Tables Arabic
- Table headers are in Arabic
- Table row data is in Arabic
- Empty states are in Arabic

### No Generic English
- No visible English UI text
- Only allowed proper names: WhatsApp, Instagram, TikTok, Facebook, Google, Meta, OpenAI, Leonardo AI, Ideogram, API, Next.js, IBM Plex Sans Arabic, Inter
- No hardcoded English strings

### No Raw Key Leakage
- No raw translation keys visible in UI (e.g., "controlOverview.clientOverview.title")
- All text displays translated values, not key paths
- No dotted key patterns appearing as fallback text

### RTL OK
- Text direction is right-to-left
- Layout is mirrored correctly
- Icons and spacing are appropriate for RTL

### No Overflow
- No text overflow in cards
- No horizontal scrolling
- Long Arabic labels are properly contained

### Navigation Fast
- Page loads quickly
- No full page reload during navigation
- No unnecessary router.refresh calls
- Smooth transitions

---

## Allowed English Terms

The following English terms are allowed and should NOT be flagged:

- WhatsApp
- Instagram
- TikTok
- Facebook
- Google
- Meta
- OpenAI
- Leonardo AI
- Ideogram
- API
- Next.js
- IBM Plex Sans Arabic
- Inter
- URLs
- Route paths
- Technical IDs
- Currency/numbers

---

## Audit Notes

### Phase 1 Status
- Checklist created
- Ready for manual browser inspection
- Dev server must be running for visual QA

### Known Issues from Previous Scan
- Previous i18n:visible scan reported 0 issues
- However, browser QA may reveal English not caught by scripts
- Control Platform / Admin Dashboard is priority focus

### Next Steps
1. Start dev server: `npm run dev`
2. Switch to Arabic mode
3. Begin systematic route inspection
4. Update checklist with findings
5. Document any English found with exact location
