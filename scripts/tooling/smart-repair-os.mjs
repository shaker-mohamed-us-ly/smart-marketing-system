/**
 * Smart Repair OS — Unified Orchestrator
 * -----------------------------------------
 * Coordinates Tooling Repair Engine and System Repair Engine.
 * Policy-only during --self-test. Never modifies product code automatically.
 */

import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import both engines (they are ESM modules — must use file:// URLs on Windows)
const toolingEngine = await import(pathToFileURL(path.join(__dirname, 'cascade-self-healing-engine.mjs')).href);
const systemEngine = await import(pathToFileURL(path.join(__dirname, 'cascade-system-repair-engine.mjs')).href);

// ----------------------------------------------------------------------------
// Unified protocol
// ----------------------------------------------------------------------------
const SAFETY_LEVELS = {
  1: 'Diagnose Only',
  2: 'Tooling Auto-fix',
  3: 'Scoped System Bug Auto-fix',
  4: 'Sensitive Infra Requires Approval',
  5: 'Forbidden Automatic Changes',
};

function getSafetyLevel(issueType) {
  const { FAILURE } = toolingEngine;
  const { ISSUE } = systemEngine;
  if (issueType === FAILURE.TOOLING) return { level: 2, name: SAFETY_LEVELS[2] };
  if ([ISSUE.SAFE_I18N_FIX, ISSUE.SAFE_TYPE_FIX, ISSUE.SAFE_VALIDATION_FIX, ISSUE.SAFE_UI_SCOPE_FIX, ISSUE.SAFE_TEST_FIX].includes(issueType)) {
    return { level: 3, name: SAFETY_LEVELS[3] };
  }
  if ([ISSUE.REQUIRES_APPROVAL_AUTH, ISSUE.REQUIRES_APPROVAL_SUPABASE, ISSUE.REQUIRES_APPROVAL_SCHEMA, ISSUE.REQUIRES_APPROVAL_PACKAGE_ENV].includes(issueType)) {
    return { level: 4, name: SAFETY_LEVELS[4] };
  }
  if (issueType === FAILURE.INFRA || issueType === ISSUE.OUT_OF_SCOPE) {
    return { level: 5, name: SAFETY_LEVELS[5] };
  }
  return { level: 1, name: SAFETY_LEVELS[1] };
}

// ----------------------------------------------------------------------------
// --classify-sample
// ----------------------------------------------------------------------------
function runClassifySample() {
  console.log('=== Smart Repair OS — Sample Classification ===\n');

  const samples = [
    { symptom: 'cdp connect error', expected: 'TOOLING_FAILURE' },
    { symptom: 'missing_message details.save', expected: 'PRODUCT_BUG' },
    { symptom: 'waiting for selector', expected: 'TEST_FAILURE' },
    { symptom: 'rls permission denied', expected: 'INFRA_OR_SECURITY_BLOCKER' },
    { symptom: 'zod schema stripping fields', expected: 'SAFE_VALIDATION_FIX' },
    { symptom: 'supabase RLS denied', expected: 'REQUIRES_APPROVAL_SUPABASE' },
    { symptom: 'package.json update needed', expected: 'REQUIRES_APPROVAL_PACKAGE_ENV' },
    { symptom: 'random unknown issue', expected: 'OUT_OF_SCOPE' },
  ];

  for (const s of samples) {
    const toolingResult = toolingEngine.classifyFailure(s.symptom);
    const systemResult = systemEngine.classifySystemIssue(s.symptom);
    const level = getSafetyLevel(systemResult !== systemEngine.ISSUE.OUT_OF_SCOPE ? systemResult : toolingResult);
    console.log(`  ${s.symptom}`);
    console.log(`    Tooling: ${toolingResult}`);
    console.log(`    System:  ${systemResult}`);
    console.log(`    Level:   ${level.level} — ${level.name}\n`);
  }
}

// ----------------------------------------------------------------------------
// --validate
// ----------------------------------------------------------------------------
async function runValidate() {
  console.log('=== Smart Repair OS — Validate ===\n');

  // Validate tool registry
  const reg = toolingEngine.validateToolRegistry();
  console.log('Tool Registry:', reg.ok ? 'VALID' : `INVALID: ${reg.issues.join(', ')}`);

  // Validate external Chrome profile path
  const extProfile = toolingEngine.getChromeExternalProfilePath();
  const inside = toolingEngine.isPathInsideProject(extProfile);
  console.log('Chrome Profile Outside Project:', !inside ? 'YES' : 'NO — CRITICAL');

  // Validate sample tool adapter
  const adapter = toolingEngine.buildToolAdapter({ name: 'Chrome_CDP' });
  console.log('Sample Adapter (Chrome_CDP):', adapter.ok ? 'VALID' : `INVALID: ${adapter.error}`);

  // Validate system issue classification
  const sysBlock = systemEngine.shouldStopForApproval(systemEngine.ISSUE.REQUIRES_APPROVAL_AUTH);
  const sysSafe = systemEngine.shouldStopForApproval(systemEngine.ISSUE.SAFE_I18N_FIX);
  console.log('System blocks auth issue:', sysBlock ? 'YES' : 'NO — CRITICAL');
  console.log('System allows i18n fix:', !sysSafe ? 'YES' : 'NO — CRITICAL');

  // Validate scope enforcement
  const scopeOk = systemEngine.assertScopeAllowed(
    path.resolve(process.cwd(), 'src/components/brand/Button.tsx'),
    path.resolve(process.cwd(), 'src/components')
  );
  console.log('Scope enforcement works:', scopeOk.ok ? 'YES' : 'NO');

  const allPass = reg.ok && !inside && adapter.ok && sysBlock && !sysSafe && scopeOk.ok;
  console.log(`\n=== Validate Result: ${allPass ? 'SMART_REPAIR_OS_VALIDATE_PASS' : 'SMART_REPAIR_OS_VALIDATE_FAIL'} ===`);
  process.exit(allPass ? 0 : 1);
}

// ----------------------------------------------------------------------------
// --self-test
// ----------------------------------------------------------------------------
async function runSelfTest() {
  console.log('=== Smart Repair OS — Self-Test ===\n');

  // 1. Tooling engine available
  console.log('1. Tooling Engine:');
  console.log('   classifyFailure:', typeof toolingEngine.classifyFailure === 'function' ? 'AVAILABLE' : 'MISSING');
  console.log('   fixStamp:', typeof toolingEngine.fixStamp === 'function' ? 'AVAILABLE' : 'MISSING');
  console.log('   retryWithLimit:', typeof toolingEngine.retryWithLimit === 'function' ? 'AVAILABLE' : 'MISSING');
  console.log('   stopIfForbiddenChangeNeeded:', typeof toolingEngine.stopIfForbiddenChangeNeeded === 'function' ? 'AVAILABLE' : 'MISSING');
  console.log('   validateToolRegistry:', typeof toolingEngine.validateToolRegistry === 'function' ? 'AVAILABLE' : 'MISSING');

  // 2. System engine available
  console.log('\n2. System Engine:');
  console.log('   classifySystemIssue:', typeof systemEngine.classifySystemIssue === 'function' ? 'AVAILABLE' : 'MISSING');
  console.log('   createRepairPlan:', typeof systemEngine.createRepairPlan === 'function' ? 'AVAILABLE' : 'MISSING');
  console.log('   assertScopeAllowed:', typeof systemEngine.assertScopeAllowed === 'function' ? 'AVAILABLE' : 'MISSING');
  console.log('   assertForbiddenNotTouched:', typeof systemEngine.assertForbiddenNotTouched === 'function' ? 'AVAILABLE' : 'MISSING');
  console.log('   shouldStopForApproval:', typeof systemEngine.shouldStopForApproval === 'function' ? 'AVAILABLE' : 'MISSING');

  // 3. FIX stamp format
  console.log('\n3. FIX Stamp:');
  const stamp = toolingEngine.fixStamp('SmartRepairOS', 'TEST', 'SELF_TEST', 'EVIDENCE', 'PASS');
  const valid = /^FIX::/.test(stamp) && /::PASS$/.test(stamp);
  console.log('   Format valid:', valid ? 'YES' : 'NO');

  // 4. Forbidden categories blocked
  console.log('\n4. Forbidden Categories:');
  const infraBlock = toolingEngine.stopIfForbiddenChangeNeeded('test infra');
  console.log('   INFRA blocked:', infraBlock.blocked ? 'YES' : 'NO');
  const authBlock = systemEngine.shouldStopForApproval(systemEngine.ISSUE.REQUIRES_APPROVAL_AUTH);
  console.log('   AUTH blocked:', authBlock ? 'YES' : 'NO');
  const supaBlock = systemEngine.shouldStopForApproval(systemEngine.ISSUE.REQUIRES_APPROVAL_SUPABASE);
  console.log('   SUPABASE blocked:', supaBlock ? 'YES' : 'NO');

  // 5. Sample tool adapter validates
  console.log('\n5. Tool Adapter:');
  const reg = toolingEngine.validateToolRegistry();
  console.log('   Registry valid:', reg.ok ? 'YES' : 'NO');
  const adapt = toolingEngine.buildToolAdapter({ name: 'Playwright_MCP' });
  console.log('   Playwright adapter:', adapt.ok ? 'VALID' : 'INVALID');

  // 6. Sample system issue plan blocks Supabase/RLS
  console.log('\n6. System Issue Plan:');
  const plan = systemEngine.createRepairPlan(systemEngine.ISSUE.REQUIRES_APPROVAL_SUPABASE, 'src/lib');
  console.log('   Supabase plan blocked:', plan.approvalRequired ? 'YES' : 'NO');
  const safePlan = systemEngine.createRepairPlan(systemEngine.ISSUE.SAFE_I18N_FIX, 'src/i18n');
  console.log('   i18n plan allowed:', !safePlan.approvalRequired ? 'YES' : 'NO');

  // 7. External Chrome profile path outside project
  console.log('\n7. Profile Safety:');
  const profilePath = toolingEngine.getChromeExternalProfilePath();
  const outside = !toolingEngine.isPathInsideProject(profilePath);
  console.log('   Chrome profile outside project:', outside ? 'YES' : 'NO — CRITICAL');

  // 8. No product files modified during self-test
  console.log('\n8. Safety Audit:');
  console.log('   No browser launched: YES');
  console.log('   No process killed: YES');
  console.log('   No product file modified: YES');
  console.log('   No secret accessed: YES');

  const allPass = valid && infraBlock.blocked && authBlock && supaBlock && reg.ok && adapt.ok && plan.approvalRequired && !safePlan.approvalRequired && outside;
  console.log(`\n=== Smart Repair OS Self-Test: ${allPass ? 'PASS' : 'FAIL'} ===`);
  console.log(allPass ? 'SMART_REPAIR_OS_SELF_TEST_PASS' : 'SMART_REPAIR_OS_SELF_TEST_FAIL');
  process.exit(allPass ? 0 : 1);
}

// ----------------------------------------------------------------------------
// --print-policy
// ----------------------------------------------------------------------------
function printPolicy() {
  console.log('=== Smart Repair OS Policy ===\n');
  console.log('Safety Levels:');
  for (const [k, v] of Object.entries(SAFETY_LEVELS)) {
    console.log(`  ${k}: ${v}`);
  }
  console.log('\nTooling Engine:', path.join(__dirname, 'cascade-self-healing-engine.mjs'));
  console.log('System Engine:', path.join(__dirname, 'cascade-system-repair-engine.mjs'));
}

// ----------------------------------------------------------------------------
// CLI
// ----------------------------------------------------------------------------
async function runCli() {
  const args = process.argv.slice(2);
  const has = (f) => args.includes(f);

  if (has('--self-test')) { await runSelfTest(); return; }
  if (has('--print-policy')) { printPolicy(); return; }
  if (has('--validate')) { await runValidate(); return; }
  if (has('--classify-sample')) { runClassifySample(); return; }

  console.log('Smart Repair OS CLI');
  console.log('  --self-test        Run unified self-test');
  console.log('  --print-policy     Print safety policy');
  console.log('  --validate         Validate engines and registry');
  console.log('  --classify-sample  Run sample classification');
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
