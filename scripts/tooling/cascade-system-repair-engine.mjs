/**
 * Cascade System Repair Engine
 * ------------------------------
 * Safe diagnostic and repair engine for scoped system bugs.
 * Does NOT modify product code automatically during normal operation.
 * Policy-only execution during --self-test.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

export const ISSUE = {
  SAFE_I18N_FIX: 'SAFE_I18N_FIX',
  SAFE_TYPE_FIX: 'SAFE_TYPE_FIX',
  SAFE_VALIDATION_FIX: 'SAFE_VALIDATION_FIX',
  SAFE_UI_SCOPE_FIX: 'SAFE_UI_SCOPE_FIX',
  SAFE_TEST_FIX: 'SAFE_TEST_FIX',
  REQUIRES_APPROVAL_AUTH: 'REQUIRES_APPROVAL_AUTH',
  REQUIRES_APPROVAL_SUPABASE: 'REQUIRES_APPROVAL_SUPABASE',
  REQUIRES_APPROVAL_SCHEMA: 'REQUIRES_APPROVAL_SCHEMA',
  REQUIRES_APPROVAL_PACKAGE_ENV: 'REQUIRES_APPROVAL_PACKAGE_ENV',
  OUT_OF_SCOPE: 'OUT_OF_SCOPE',
};

const FORBIDDEN_FILES = [
  'package.json', 'package-lock.json', '.env', '.env.local', '.env.production',
  '.mcp.json', 'migrations', 'supabase', 'auth', 'dashboard',
];

// ----------------------------------------------------------------------------
// 1. classifySystemIssue(symptom)
// ----------------------------------------------------------------------------
export function classifySystemIssue(symptom) {
  const text = String(symptom).toLowerCase();

  // Approval-required (sensitive)
  if (/rls|row.level.security|supabase.schema|migration|storage.policy/.test(text)) return ISSUE.REQUIRES_APPROVAL_SUPABASE;
  if (/auth|oauth|session|callback|middleware|signin|signout/.test(text)) return ISSUE.REQUIRES_APPROVAL_AUTH;
  if (/package\.json|package-lock|npm.install|\.env|\.mcp\.json/.test(text)) return ISSUE.REQUIRES_APPROVAL_PACKAGE_ENV;
  if (/schema.change|db.migration|column|table|index/.test(text)) return ISSUE.REQUIRES_APPROVAL_SCHEMA;

  // Safe fixes
  if (/missing_message|missing.*key|wrong.namespace|raw.translation|intl.namespace/.test(text)) return ISSUE.SAFE_I18N_FIX;
  if (/typescript|type.mismatch|cannot.assign|incompatible.type/.test(text)) return ISSUE.SAFE_TYPE_FIX;
  if (/zod|validation|strip|schema.missing|invalid.input/.test(text)) return ISSUE.SAFE_VALIDATION_FIX;
  if (/ui.overflow|layout.break|margin|padding|width|height.*component/.test(text)) return ISSUE.SAFE_UI_SCOPE_FIX;
  if (/selector|locator|timeout|qa.script|test.assertion/.test(text)) return ISSUE.SAFE_TEST_FIX;

  return ISSUE.OUT_OF_SCOPE;
}

// ----------------------------------------------------------------------------
// 2. createRepairPlan(issue, scope)
// ----------------------------------------------------------------------------
export function createRepairPlan(issue, scope) {
  const plan = {
    filesToRead: [],
    proposedFilesToChange: [],
    forbiddenTouchpoints: [],
    validationsRequired: [],
    browserProofRequired: false,
    approvalRequired: false,
  };

  switch (issue) {
    case ISSUE.SAFE_I18N_FIX:
      plan.filesToRead = [path.join(scope, 'messages', 'ar.ts'), path.join(scope, 'messages', 'en.ts')];
      plan.proposedFilesToChange = ['src/i18n/messages/ar.ts', 'src/i18n/messages/en.ts'];
      plan.validationsRequired = ['i18n:visible', 'typecheck'];
      plan.browserProofRequired = false;
      break;
    case ISSUE.SAFE_TYPE_FIX:
      plan.filesToRead = [scope];
      plan.proposedFilesToChange = [scope];
      plan.validationsRequired = ['typecheck'];
      break;
    case ISSUE.SAFE_VALIDATION_FIX:
      plan.filesToRead = [path.join(scope, 'validation.ts'), path.join(scope, 'types.ts')];
      plan.proposedFilesToChange = ['src/lib/**/validation.ts', 'src/lib/**/types.ts'];
      plan.validationsRequired = ['typecheck', 'browser QA (save/reload)'];
      plan.browserProofRequired = true;
      break;
    case ISSUE.SAFE_UI_SCOPE_FIX:
      plan.filesToRead = [scope];
      plan.proposedFilesToChange = [scope];
      plan.validationsRequired = ['typecheck', 'ui:titles'];
      plan.browserProofRequired = true;
      break;
    case ISSUE.SAFE_TEST_FIX:
      plan.filesToRead = [scope];
      plan.proposedFilesToChange = [scope];
      plan.validationsRequired = ['self-test'];
      break;
    case ISSUE.REQUIRES_APPROVAL_AUTH:
    case ISSUE.REQUIRES_APPROVAL_SUPABASE:
    case ISSUE.REQUIRES_APPROVAL_SCHEMA:
    case ISSUE.REQUIRES_APPROVAL_PACKAGE_ENV:
      plan.approvalRequired = true;
      plan.forbiddenTouchpoints = ['auth routes', 'Supabase config', 'schema files', 'package/env'];
      break;
    default:
      plan.approvalRequired = true;
      plan.forbiddenTouchpoints = ['out of scope'];
  }

  return plan;
}

// ----------------------------------------------------------------------------
// 3. assertScopeAllowed(filePath, allowedScope)
// ----------------------------------------------------------------------------
export function assertScopeAllowed(filePath, allowedScope) {
  const resolved = path.resolve(filePath);
  const scope = path.resolve(allowedScope);
  const allowed = resolved.startsWith(scope + path.sep) || resolved === scope;
  return { ok: allowed, blocked: !allowed, reason: allowed ? null : `OUT_OF_SCOPE: ${filePath} not inside ${allowedScope}` };
}

// ----------------------------------------------------------------------------
// 4. assertForbiddenNotTouched(diffFiles)
// ----------------------------------------------------------------------------
export function assertForbiddenNotTouched(diffFiles) {
  const touched = [];
  for (const f of diffFiles) {
    const base = path.basename(f).toLowerCase();
    const dir = path.dirname(f).toLowerCase();
    for (const forbidden of FORBIDDEN_FILES) {
      if (base === forbidden || dir.includes(forbidden.replace(/\//g, path.sep))) {
        touched.push(f);
      }
    }
  }
  return { ok: touched.length === 0, touched };
}

// ----------------------------------------------------------------------------
// 5. generateFixStamp(engine, area, bugType, action, evidence, status)
// ----------------------------------------------------------------------------
export function generateFixStamp(engine, area, bugType, action, evidence, status) {
  const stamp = `FIX::${engine}::${area}::${bugType}::${action}::${evidence}::${status}`;
  console.log(stamp);
  return stamp;
}

// ----------------------------------------------------------------------------
// 6. evidenceChecklist(issueType)
// ----------------------------------------------------------------------------
export function evidenceChecklist(issueType) {
  const base = ['source review', 'code diff audit', 'git isolation check'];
  const map = {
    [ISSUE.SAFE_I18N_FIX]: [...base, 'i18n:visible', 'ui:titles'],
    [ISSUE.SAFE_TYPE_FIX]: [...base, 'typecheck'],
    [ISSUE.SAFE_VALIDATION_FIX]: [...base, 'typecheck', 'browser QA', 'save/reload proof'],
    [ISSUE.SAFE_UI_SCOPE_FIX]: [...base, 'typecheck', 'ui:titles', 'browser screenshot'],
    [ISSUE.SAFE_TEST_FIX]: [...base, 'self-test'],
  };
  return map[issueType] || base;
}

// ----------------------------------------------------------------------------
// 7. shouldStopForApproval(issue)
// ----------------------------------------------------------------------------
export function shouldStopForApproval(issue) {
  return [
    ISSUE.REQUIRES_APPROVAL_AUTH,
    ISSUE.REQUIRES_APPROVAL_SUPABASE,
    ISSUE.REQUIRES_APPROVAL_SCHEMA,
    ISSUE.REQUIRES_APPROVAL_PACKAGE_ENV,
    ISSUE.OUT_OF_SCOPE,
  ].includes(issue);
}

// ----------------------------------------------------------------------------
// 8. systemRepairSelfTest()
// ----------------------------------------------------------------------------
export async function systemRepairSelfTest() {
  let passed = 0;
  let failed = 0;
  const log = (label, ok, detail = '') => {
    const status = ok ? 'PASS' : 'FAIL';
    console.log(`  [${status}] ${label}${detail ? ' — ' + detail : ''}`);
    if (ok) passed++; else failed++;
  };

  console.log('=== System Repair Engine Self-Test ===\n');

  // classifySystemIssue
  log('classify → SAFE_I18N_FIX', classifySystemIssue('missing_message details.save') === ISSUE.SAFE_I18N_FIX);
  log('classify → SAFE_VALIDATION_FIX', classifySystemIssue('zod schema stripping fields') === ISSUE.SAFE_VALIDATION_FIX);
  log('classify → REQUIRES_APPROVAL_SUPABASE', classifySystemIssue('supabase RLS denied') === ISSUE.REQUIRES_APPROVAL_SUPABASE);
  log('classify → REQUIRES_APPROVAL_PACKAGE_ENV', classifySystemIssue('package.json update needed') === ISSUE.REQUIRES_APPROVAL_PACKAGE_ENV);
  log('classify → OUT_OF_SCOPE', classifySystemIssue('random unknown issue') === ISSUE.OUT_OF_SCOPE);

  // createRepairPlan
  const plan = createRepairPlan(ISSUE.SAFE_I18N_FIX, 'src/i18n');
  log('repair plan has filesToRead', plan.filesToRead.length > 0);
  log('repair plan requires no browser', !plan.browserProofRequired);

  const planBlock = createRepairPlan(ISSUE.REQUIRES_APPROVAL_SUPABASE, 'src/lib');
  log('repair plan blocks approval', planBlock.approvalRequired);

  // assertScopeAllowed
  log('scope allowed', assertScopeAllowed(path.join(PROJECT_ROOT, 'src', 'components', 'brand', 'Button.tsx'), path.join(PROJECT_ROOT, 'src', 'components')).ok);
  log('scope blocked', !assertScopeAllowed(path.join(PROJECT_ROOT, 'package.json'), path.join(PROJECT_ROOT, 'src')).ok);

  // assertForbiddenNotTouched
  log('forbidden touched', !assertForbiddenNotTouched(['src/app/page.tsx', 'package.json']).ok);
  log('forbidden clean', assertForbiddenNotTouched(['src/app/page.tsx', 'src/components/Button.tsx']).ok);

  // generateFixStamp
  const stamp = generateFixStamp('SystemRepair', 'next-intl', 'MISSING_KEY', 'ADDED_KEY', 'RAW_KEYS_ZERO', 'PASS');
  log('FIX stamp format', /^FIX::/.test(stamp));

  // evidenceChecklist
  log('evidence checklist i18n', evidenceChecklist(ISSUE.SAFE_I18N_FIX).includes('i18n:visible'));

  // shouldStopForApproval
  log('stop for approval (auth)', shouldStopForApproval(ISSUE.REQUIRES_APPROVAL_AUTH));
  log('stop for approval (supabase)', shouldStopForApproval(ISSUE.REQUIRES_APPROVAL_SUPABASE));
  log('no stop for safe i18n', !shouldStopForApproval(ISSUE.SAFE_I18N_FIX));

  console.log(`\n=== Self-Test Results: ${passed} passed, ${failed} failed ===`);
  if (failed === 0) {
    console.log('SYSTEM_REPAIR_ENGINE_SELF_TEST_PASS');
    process.exit(0);
  } else {
    console.log('SYSTEM_REPAIR_ENGINE_SELF_TEST_FAIL');
    process.exit(1);
  }
}

// ----------------------------------------------------------------------------
// CLI
// ----------------------------------------------------------------------------
async function runCli() {
  const args = process.argv.slice(2);
  const has = (f) => args.includes(f);

  if (has('--self-test')) { await systemRepairSelfTest(); return; }

  if (has('--print-policy')) {
    console.log('=== System Repair Engine Policy ===');
    console.log('ISSUE TYPES:', ISSUE);
    console.log('FORBIDDEN FILES:', FORBIDDEN_FILES);
    console.log('SAFE AUTO-FIXES: i18n, TypeScript, Zod validation, UI scoped, test scripts');
    console.log('REQUIRES APPROVAL: Auth, Supabase/RLS, schema, package/env');
    return;
  }

  console.log('Use --self-test or --print-policy');
}

const isDirect = (() => {
  try {
    const invoked = process.argv[1] ? path.resolve(process.argv[1]) : '';
    return invoked && import.meta.url === `file://${invoked.replace(/\\/g, '/')}`;
  } catch { return false; }
})();

if (isDirect || process.argv.some((a) => a.startsWith('--'))) {
  runCli().catch((err) => {
    console.error('ENGINE_FATAL', err);
    process.exit(1);
  });
}
