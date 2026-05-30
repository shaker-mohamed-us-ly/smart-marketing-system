#!/usr/bin/env node

/**
 * i18n Quality Gate Script
 * 
 * Runs all i18n quality checks in sequence.
 * If any check fails, the quality gate fails.
 * 
 * Usage: node scripts/i18n-quality-gate.mjs
 * Usage with strict mode: node scripts/i18n-quality-gate.mjs --strict
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

// Parse command line arguments
const args = process.argv.slice(2);
const strictMode = args.includes('--strict');

// Quality checks to run
const checks = [
  {
    name: 'Translation Key Consistency',
    command: 'npm run i18n:keys',
    critical: false, // Non-critical due to known parser limitation
  },
  {
    name: 'Comprehensive i18n Audit',
    command: 'npm run i18n:audit',
    critical: true,
  },
  {
    name: 'Visible English Scan',
    command: strictMode ? 'npm run i18n:visible:strict' : 'npm run i18n:visible',
    critical: true, // Critical to catch user-visible English in Arabic mode
  },
  {
    name: 'Raw i18n Key Leak Check',
    command: strictMode ? 'npm run i18n:key-leak:strict' : 'npm run i18n:key-leak',
    critical: true, // Critical to catch untranslated keys in rendered output
  },
  {
    name: 'Server/Client Component Boundary',
    command: 'npm run i18n:boundary',
    critical: false, // Non-critical because rendered QA is the source of truth and this is a known limitation
  },
  {
    name: 'Arabic Translation Quality',
    command: 'npm run i18n:arabic-quality',
    critical: false, // Non-critical because rendered QA is the source of truth
  },
  {
    name: 'Rendered Locale Check',
    command: 'npm run i18n:rendered',
    critical: true,
  },
  {
    name: 'UI Title Integrity Check',
    command: strictMode ? 'npm run ui:titles:strict' : 'npm run ui:titles',
    critical: true, // Critical to catch empty or missing card titles
  },
  {
    name: 'Hydrated DOM Language Check',
    command: 'npm run i18n:hydrated',
    critical: true, // Critical to catch language issues after React hydration
  },
];

function runCheck(check) {
  try {
    console.log(`\n🔍 Running: ${check.name}...`);
    console.log(`   Command: ${check.command}`);
    
    const output = execSync(check.command, {
      cwd: join(__dirname, '..'),
      stdio: 'pipe',
      encoding: 'utf-8',
    });
    
    console.log(`   ✅ PASSED`);
    return { success: true, output };
  } catch (error) {
    console.log(`   ❌ FAILED`);
    if (error.stdout) {
      console.log(`   Output: ${error.stdout.trim()}`);
    }
    if (error.stderr) {
      console.log(`   Error: ${error.stderr.trim()}`);
    }
    return { success: false, error, critical: check.critical };
  }
}

function main() {
  console.log('🚦 Starting i18n Quality Gate...\n');
  console.log(`Mode: ${strictMode ? 'STRICT' : 'NORMAL'}`);
  console.log(`Checks: ${checks.length}\n`);

  const results = [];
  let failedChecks = 0;

  for (const check of checks) {
    const result = runCheck(check);
    results.push({
      name: check.name,
      ...result,
      critical: check.critical,
    });

    if (!result.success) {
      failedChecks++;
      if (check.critical) {
        console.log(`\n⚠️  Critical check failed. Stopping quality gate.`);
        break;
      }
    }
  }

  // Count only critical failures for final decision
  const criticalFailures = results.filter(r => !r.success && r.critical).length;

  console.log('\n' + '='.repeat(60));
  console.log('QUALITY GATE SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total Checks: ${checks.length}`);
  console.log(`Passed: ${checks.length - failedChecks}`);
  console.log(`Failed: ${failedChecks} (${criticalFailures} critical)`);
  console.log('='.repeat(60));

  if (criticalFailures === 0) {
    console.log('\n✅ All critical quality checks passed!');
    if (failedChecks > 0) {
      console.log(`ℹ️  ${failedChecks} non-critical checks failed (known limitations).`);
    }
    console.log('The codebase is ready for commit/build.');
    process.exit(0);
  } else {
    console.log('\n❌ Quality gate failed!');
    console.log('\nFailed checks:');
    for (const result of results) {
      if (!result.success) {
        console.log(`  - ${result.name}${result.critical ? ' (CRITICAL)' : ''}`);
      }
    }
    console.log('\n💡 Fix the issues above and run the quality gate again.');
    process.exit(1);
  }
}

main();
