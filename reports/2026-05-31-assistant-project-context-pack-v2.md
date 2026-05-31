# Smart Marketing System - Assistant Project Context Pack V2

**Generated:** 2026-05-31  
**Project:** smart-marketing-system  
**Context Pack Version:** V2

---

## Project Identity

**Name:** Smart Marketing System  
**Type:** Dual-platform marketing intelligence application  
**Primary Users:** Marketing teams (Client platform), Administrators (Control platform)  
**Core Value Proposition:** AI-powered marketing insights, campaign management, and brand identity tools

**Project Status:** Frontend-complete, Backend-pending  
**Current Phase:** Audit and tooling preparation  
**Next Major Milestone:** Dashboard V8 Browser-first Prototype Reset

---

## Current Stack

### Framework & Core
- **Next.js:** 16.2.6 (Turbopack enabled)
- **React:** Latest (compatible with Next.js 16)
- **TypeScript:** Full type safety across codebase
- **Node.js:** Required environment

### Styling & UI
- **Tailwind CSS:** Utility-first CSS framework
- **Lucide React:** Icon library
- **Custom Design System:** Premium UI tokens (`src/lib/design/`)
- **Layout System:** Custom layout classes (`src/lib/layout/`)

### Internationalization
- **next-intl:** Comprehensive i18n solution
- **Supported Locales:** Arabic (ar), English (en)
- **Default Locale:** Arabic (ar)
- **Direction Support:** RTL (Arabic), LTR (English)

### Development Tools
- **MCP Servers:** next-devtools, playwright
- **TypeScript Compiler:** npx tsc --noEmit
- **Custom Scripts:** i18n validation, UI title checking

---

## Current State

### Architecture
- **Dual Platform:** Client (`/client/*`) and Control (`/control/*`) platforms
- **App Router:** Next.js 16 App Router with Server Components
- **Component Organization:** Shared components, platform-specific components
- **State Management:** React hooks (no global state library)
- **Data Flow:** Currently mock/static data (no backend integration)

### Dashboard State
- **Active Version:** V6.2 (currently in use)
- **V7.2 Status:** Visually rejected
- **V6.6:** Text fix to be preserved
- **Future Direction:** V8 Browser-first Prototype Reset
- **Namespace Recommendation:** `clientDashboard.premium.v8.*` or clean `v8` namespace
- **Do NOT use:** `clientDashboard.v6.*` as future namespace

### Backend State
- **Supabase:** Referenced but not implemented
- **Database:** No schema or migrations
- **API Routes:** None implemented
- **Data Persistence:** None (frontend-only)

### Codebase Health
- **TypeScript:** Clean (no errors)
- **Build:** Development build successful
- **Linting:** Configured
- **Testing:** No test coverage
- **Documentation:** Partial (some inline docs missing)

---

## Key Routes

### Client Platform (`/client/*`)
- `/client/dashboard` - Main client dashboard (V6.2 active)
- `/client/brand-dna` - Brand identity management
- `/client/campaigns` - Campaign studio
- `/client/content-studio` - Content creation
- `/client/analytics` - Performance analytics
- `/client/recommendations` - AI recommendations
- `/client/publishing` - Campaign publishing
- `/client/settings` - Client settings

### Control Platform (`/control/*`)
- `/control/overview` - System overview dashboard
- `/control/ai-brain` - AI brain monitoring
- `/control/monitoring` - Operations monitoring
- `/control/clients` - Client management
- `/control/billing` - Billing management

### Root
- `/` - Platform selection landing page

---

## Critical Files

### Configuration
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `.mcp.json` - MCP server configuration
- `package.json` - Dependencies and scripts

### Core Architecture
- `src/app/layout.tsx` - Root layout with i18n setup
- `src/i18n/config.ts` - i18n configuration
- `src/i18n/server.ts` - Server-side i18n utilities
- `src/components/layout/AppShell.tsx` - Main layout wrapper

### Design System
- `src/lib/design/tokens.ts` - Base design tokens
- `src/lib/design/premium-ui-system-tokens.ts` - Premium UI system tokens
- `src/lib/layout/layout-classes.ts` - Layout utility classes

### i18n
- `src/components/shared/LanguageSwitcher.tsx` - Language switcher component
- `src/i18n/messages/ar.ts` - Arabic translations
- `src/i18n/messages/en.ts` - English translations

### Dashboard
- `src/components/client/dashboard/v6/ClientDashboardV6.tsx` - Active dashboard (V6.2)
- `src/app/client/dashboard/page.tsx` - Dashboard page

### Shared Components
- `src/components/shared/Card.tsx` - Card component
- `src/components/shared/Button.tsx` - Button component

---

## Known Issues

### High Priority
1. **No Backend Integration:** Application is frontend-only with no data persistence
2. **Missing Supabase Implementation:** Referenced but not implemented
3. **Codebase Clutter:** 30+ untracked report files polluting repository
4. **RTL/LTR Inconsistency:** Limited use of logical CSS properties

### Medium Priority
1. **Multiple Dashboard Versions:** V6, V7, premium versions create maintenance burden
2. **Legacy Code:** Deprecated LanguageProvider still present
3. **No API Routes:** No backend API layer for data operations
4. **Mock Data:** All data is hardcoded, not scalable

### Low Priority
1. **Console Warning:** Non-critical warning in browser
2. **Documentation Gaps:** Some components lack inline documentation
3. **Test Coverage:** No test files detected

---

## Current Risks

### Technical Risks
- **Backend Gap:** No data persistence or API layer
- **Scalability:** Mock data not scalable for production
- **Maintenance:** Multiple dashboard versions increase complexity
- **RTL Quality:** Arabic interface needs refinement

### Project Risks
- **Direction Clarity:** Need to confirm V8 approach before implementation
- **Resource Allocation:** Backend integration requires focused effort
- **Timeline:** 6-7 weeks estimated to production-ready

### Process Risks
- **Codebase Clutter:** Development artifacts need cleanup
- **Git Hygiene:** Uncommitted changes and untracked files
- **Test Coverage:** No automated quality assurance

---

## Decisions Not to Violate

### Dashboard Direction
- ❌ **DO NOT** use V6.2 as final dashboard target
- ❌ **DO NOT** use `clientDashboard.v6.*` as future namespace
- ✅ **DO** preserve V6.6 text fix
- ✅ **DO** plan for V8 Browser-first Prototype Reset
- ✅ **DO** use `clientDashboard.premium.v8.*` or clean `v8` namespace

### Codebase Safety
- ❌ **DO NOT** modify `/client/dashboard` without approval
- ❌ **DO NOT** modify `/client/publishing` without approval
- ❌ **DO NOT** touch Supabase, backend, auth, storage, RLS, migrations
- ❌ **DO NOT** touch API routes or sensitive routes
- ❌ **DO NOT** delete, move, archive, or rename app/source files
- ❌ **DO NOT** delete existing reports

### Implementation Safety
- ❌ **DO NOT** implement Supabase from scratch before Dashboard V8 decision
- ❌ **DO NOT** apply recommendations from previous audit without approval
- ❌ **DO NOT** commit anything without approval
- ❌ **DO NOT** install packages without approval
- ❌ **DO NOT** add secrets or API keys

---

## Correct Unified Neural API Card Concept

### Concept Name
**Unified Neural Integration Card / Unified Neural API Card**

### Architecture Type
**Open Connector System** (NOT an API health/status card)

### Supported Capabilities
- **Built-in Presets:** OpenAI, RelayAPI, WhatsApp API, Meta API, TikTok API, Behance, SerpApi, Creatomate, Supabase
- **Custom Connector Mode:** Add as Custom Connector
- **Smart Scraper Source:** Web scraping capabilities
- **Webhook Source:** Webhook-based data ingestion
- **Manual Knowledge Source:** Manual data entry
- **Hybrid Connector:** Multiple source combination
- **Request Official Support:** Support request workflow
- **Save as Draft:** Draft saving capability
- **integration_requests:** Integration request management
- **integration_addons / Add-on Registry:** Add-on marketplace
- **Capability Mapping to AI Brain:** AI Brain integration
- **UX Messaging:** Never blocks with "unsupported" only - always gives a practical next path

### Roadmap Position
- **Phase:** After Dashboard V8 and Brand Module stabilization
- **Priority:** High after UI foundation is stable
- **Status:** Not implemented - planned for future phase

### Implementation Notes
- Must be documented as Open Connector System
- Must support all listed capabilities
- UX messaging must always provide practical next path
- Never block with "unsupported" message only

---

## Rejected API Health Card Concept

### Rejected Concept
**Old "API & Integrations Health Card"**

### Reason for Rejection
- Too limited in scope
- Not aligned with Open Connector vision
- Does not support required capabilities
- UX model too restrictive

### Correct Alternative
Use **Unified Neural Integration Card / Open Connector System** concept instead

---

## Next Recommended Command

### For Development
```bash
npm run dev
```

### For Type Checking
```bash
npx tsc --noEmit
```

### For Building
```bash
npm run build
```

### For Linting
```bash
npm run lint
```

### For i18n Validation (if dev server running)
```bash
npm run i18n:visible
```

### For UI Title Validation (if dev server running)
```bash
npm run ui:titles
```

---

## Do-Not-Touch Zones

### Protected Directories
- `/client/dashboard` - Dashboard implementation
- `/client/publishing` - Publishing implementation
- Any Supabase-related code
- Any backend/API route code
- Any authentication code
- Any storage implementation
- Any RLS (Row Level Security) code
- Any database migration code

### Protected Files
- All existing report files
- All configuration files (without approval)
- All package files (without approval)

### Protected Operations
- Deleting files
- Moving files
- Archiving files
- Renaming files
- Committing changes
- Installing packages
- Adding secrets/API keys

---

## Quality Gates

### TypeScript
- **Status:** ✅ Pass (npx tsc --noEmit exit code 0)
- **Requirement:** No TypeScript errors
- **Current:** Clean

### Build
- **Status:** ✅ Pass (Development build successful)
- **Requirement:** Successful build
- **Current:** Turbopack build working

### Linting
- **Status:** ⚠️ Configured but not tested
- **Requirement:** No lint errors
- **Current:** next lint configured

### Testing
- **Status:** ❌ Fail (No test coverage)
- **Requirement:** Test coverage >80%
- **Current:** No tests implemented

### i18n
- **Status:** ✅ Pass (Functional validation script)
- **Requirement:** i18n keys visible and used
- **Current:** Script functional

---

## Report File Paths

### Required Reports
- `d:\smart-marketing-system\reports\2026-05-31-project-intelligence-audit-v2-report.md`
- `d:\smart-marketing-system\reports\2026-05-31-assistant-project-context-pack-v2.md`
- `d:\smart-marketing-system\reports\2026-05-31-project-intelligence-evidence-index-v2.md`

### Previous Audit Reports (Root Level)
- `d:\smart-marketing-system\AUDIT_TECHNICAL_REPORT.md`
- `d:\smart-marketing-system\AUDIT_RECOMMENDATIONS.md`
- `d:\smart-marketing-system\AUDIT_EXECUTIVE_SUMMARY.md`

### Development Report Files (30+ files)
- Various `CLIENT_DASHBOARD_*.md` files in root
- Various `PREMIUM_UI_SYSTEM_*.md` files in root
- `FINAL_UI_UX_*.md` file in root

---

## Open Questions

### Dashboard V8
- What are the specific requirements for V8 Browser-first Prototype Reset?
- Should we use `clientDashboard.premium.v8.*` or clean `v8` namespace?
- What is the timeline for V8 implementation?
- What are the success criteria for V8?

### Backend Integration
- When should Supabase integration begin (after V8 decision)?
- What is the database schema for brands, campaigns, analytics?
- What are the API route requirements?
- Should we use real-time subscriptions?

### Unified Neural Integration Card
- What is the priority order for connector implementations?
- How should integration_requests workflow work?
- What is the Add-on Registry structure?
- How should capability mapping to AI Brain work?

### Codebase Cleanup
- Should the 30+ report files be archived or deleted?
- Should legacy LanguageProvider be removed?
- Should dashboard v7/premium be archived?
- What .gitignore rules should be added?

---

## Additional Context

### Project History
- Multiple dashboard iterations (V6, V7, premium)
- Premium design system development
- Comprehensive i18n implementation
- Strong TypeScript foundation

### Current Focus
- Audit and tooling preparation
- Dashboard V8 planning
- Backend integration planning
- Codebase cleanup planning

### Team Considerations
- Frontend-heavy team
- Strong TypeScript skills
- Good design system understanding
- Backend integration experience needed

---

**Context Pack Version:** V2  
**Last Updated:** 2026-05-31  
**Next Review:** After Dashboard V8 decision
