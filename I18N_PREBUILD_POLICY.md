# I18N Prebuild Policy

## Version
**Version:** 1.0  
**Effective:** 2025-01-15  
**Status:** Documented (NOT connected to build yet)

## Purpose
This policy defines the prebuild checks that must be performed before building the Smart Marketing System to ensure i18n compliance. These checks prevent visible English strings in Arabic mode and ensure translation key consistency.

## Policy Statement

All builds must pass the following i18n quality gates before proceeding:

1. **Visible English Scan**: No visible English strings in client/control routes and components
2. **Translation Key Consistency**: All translation keys exist in both `ar.ts` and `en.ts`
3. **Translation Completeness**: All used translation keys have valid translations

## Prebuild Checks

### 1. Visible English Scan
**Script**: `npm run i18n:visible`  
**File**: `scripts/i18n-visible-english-scan.mjs`

**Purpose**: Detect hardcoded English strings that would be visible in Arabic mode.

**What it checks**:
- Hardcoded English strings in component files
- Fallback values with English text
- Suspicious English words in JSX

**Allowed English terms**:
- Brand names: WhatsApp, Instagram, TikTok, Facebook, Google, Meta, OpenAI, Leonardo, Ideogram, Flux, Kling, Runway, Nano, Banana
- Technical terms: API, ROI, UX, UI, DNA, DM, CTA, Reels, Ads, Next.js, React, Node, npm, npx, lucide
- See `PROJECT_I18N_CONTRACT.md` for complete list

**Pass criteria**: No visible English strings found in scanned directories.

**Fail action**: Build aborted. Fix hardcoded strings before retrying.

### 2. Translation Key Consistency Check
**Script**: `npm run i18n:keys`  
**File**: `scripts/i18n-keys-check.mjs`

**Purpose**: Ensure all translation keys exist in both English and Arabic message files.

**What it checks**:
- Keys present in `en.ts` but missing in `ar.ts`
- Keys present in `ar.ts` but missing in `en.ts`
- Keys used in code but missing from message files

**Pass criteria**: No missing keys between message files and code.

**Fail action**: Build aborted. Add missing translations before retrying.

### 3. Comprehensive i18n Audit
**Script**: `npm run i18n:audit`  
**File**: `scripts/i18n-audit.mjs`

**Purpose**: Scan for hardcoded text patterns that should be internationalized.

**What it checks**:
- JSX text content not wrapped in translation calls
- Hardcoded placeholder attributes
- Hardcoded title and aria-label attributes

**Pass criteria**: No hardcoded text issues found.

**Fail action**: Build aborted. Replace hardcoded text with translation keys before retrying.

## Integration with Build Process

**Current Status**: NOT CONNECTED

The prebuild checks are documented but NOT yet integrated into the build process. This is intentional to allow:

1. **Gradual Adoption**: Team can run checks manually before connecting to build
2. **Validation**: Verify checks work correctly before enforcing
3. **Adjustment**: Fine-tune check rules based on feedback

### Future Integration Plan

When ready to connect, add to `package.json`:

```json
{
  "scripts": {
    "prebuild": "npm run i18n:visible && npm run i18n:keys && npm run i18n:audit",
    "build": "next build"
  }
}
```

Or integrate with CI/CD pipeline:

```yaml
# Example GitHub Actions
- name: Run i18n checks
  run: |
    npm run i18n:visible
    npm run i18n:keys
    npm run i18n:audit
```

## Manual Usage

Until connected to build, developers should run checks manually:

```bash
# Run all i18n checks
npm run i18n:visible
npm run i18n:keys
npm run i18n:audit

# Or run individually
npm run i18n:visible  # Check for visible English
npm run i18n:keys    # Check translation key consistency
npm run i18n:audit   # Comprehensive audit
```

## Check Configuration

### Scan Directories
All checks scan the following directories:
- `src/app/client`
- `src/app/control`
- `src/components/client`
- `src/components/control`
- `src/components/layout`
- `src/components/shared`

### Excluded Directories
- `node_modules`
- `.next`
- `dist`
- `build`
- `.git`

### File Extensions
- `.tsx`
- `.ts`
- `.jsx`
- `.js`

## Troubleshooting

### Visible English Scan Fails
**Issue**: Scan detects visible English strings

**Solution**:
1. Review the output to see which files have issues
2. Replace hardcoded English with translation keys
3. Ensure fallback values use Arabic text
4. Run scan again to verify fix

### Translation Key Check Fails
**Issue**: Keys missing between message files

**Solution**:
1. Review the output to see which keys are missing
2. Add missing keys to both `ar.ts` and `en.ts`
3. Ensure keys used in code exist in message files
4. Run check again to verify fix

### Comprehensive Audit Fails
**Issue**: Hardcoded text patterns detected

**Solution**:
1. Review the output to see which files have issues
2. Replace hardcoded text with `t()` calls
3. Use translation keys for all user-facing text
4. Run audit again to verify fix

## Governance

### Enforcement
- **Current**: Manual enforcement (developers run checks before committing)
- **Future**: Automated enforcement (prebuild hook or CI/CD)

### Responsibility
- **Developers**: Run checks before committing code
- **Reviewers**: Verify i18n compliance in code reviews
- **CI/CD**: Enforce checks in automated pipeline (when connected)

### Updates to This Policy
- Changes require team consensus
- Update version number on changes
- Communicate changes to all developers
- Update related documentation

## Related Documentation

- `PROJECT_I18N_CONTRACT.md`: Full i18n governance and standards
- `PROJECT_UI_RULES.md`: UI development rules including i18n
- `I18N_BROWSER_QA_CHECKLIST.md`: Manual browser QA checklist
- `I18N_DEVELOPMENT_WORKFLOW.md`: Detailed development guide (PHASE 13)

## Scripts Reference

| Script | Purpose | NPM Command |
|--------|---------|-------------|
| `i18n-visible-english-scan.mjs` | Detect visible English strings | `npm run i18n:visible` |
| `i18n-keys-check.mjs` | Check translation key consistency | `npm run i18n:keys` |
| `i18n-audit.mjs` | Comprehensive i18n audit | `npm run i18n:audit` |
| `generate-i18n-page.mjs` | Generate i18n-compliant page | `npm run i18n:generate:page` |
| `generate-i18n-component.mjs` | Generate i18n-compliant component | `npm run i18n:generate:component` |

## Summary

This policy ensures:
- No visible English strings in Arabic mode
- Consistent translation keys across locales
- Complete translations for all used keys
- High-quality i18n implementation

**Every developer must follow this policy when building the application.**

---

**Policy Owner**: Development Team  
**Last Updated**: 2025-01-15  
**Next Review**: 2025-07-15  
**Integration Status**: Documented, NOT connected to build
