/**
 * Cascade Self-Healing Engine — Tooling Repair
 * -----------------------------------------------
 * Reusable tooling recovery engine for browser/CDP/Playwright/MCP/dev server
 * /Turbopack/test runner/npm validation/Git tooling repair.
 *
 * Safety principles:
 *  - Destructive actions GATED behind confirmDestructive.
 *  - NEVER global kills: only targeted PID stops of verified stale processes.
 *  - NEVER touch a Chrome profile inside the project tree.
 *  - NEVER use Google OAuth, never bypass OAuth, never copy cookies, never fake login.
 *  - Max 3 attempts per failure type, then exhaust.
 */

import fs from 'fs';
import os from 'os';
import path from 'path';
import http from 'http';
import { execSync, spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
export const WORKSPACE_DIR = path.join(PROJECT_ROOT, 'reports', 'workspace');
export const QUARANTINE_DIR = path.join(path.parse(PROJECT_ROOT).root, 'sms-browser-profile-quarantine');
export const CDP_PROFILE_DIR = path.join(path.parse(PROJECT_ROOT).root, 'sms-cdp-profiles', 'brand-vnext-auth-profile');
export const CDP_PORT = 9222;
export const CDP_URL = `http://127.0.0.1:${CDP_PORT}`;
export const BASE_URL = 'http://localhost:3000';
export const HEALING_LOG = path.join(WORKSPACE_DIR, 'BRAND_VNEXT_SELF_HEALING_LOG.md');

export const FAILURE = {
  TOOLING: 'TOOLING_FAILURE',
  TEST: 'TEST_FAILURE',
  PRODUCT: 'PRODUCT_BUG',
  INFRA: 'INFRA_OR_SECURITY_BLOCKER',
};

const attemptCounters = new Map();

// ----------------------------------------------------------------------------
// Core utilities
// ----------------------------------------------------------------------------

const CLASSIFY_RULES = [
  { type: FAILURE.INFRA, patterns: [
    'rls', 'row level security', 'service role', 'storage permission',
    'auth provider', 'oauth', 'missing env', '.env', 'migration', 'package install',
    'package update', '.mcp.json', 'data corruption', 'restore failure', 'direct db write',
    'supabase schema',
  ] },
  { type: FAILURE.PRODUCT, patterns: [
    'missing_message', 'missing message', 'could not resolve', 'namespace', 'intl',
    'snake_case', 'camelcase', 'save not persist', 'preview reads wrong', 'render crash',
    'rsc serialization', 'serialization error', 'hydration mismatch', 'undefined is not',
  ] },
  { type: FAILURE.TEST, patterns: [
    'selector', 'not found', 'no element', 'locator', 'arabic dom', 'not in edit mode',
    'reload verified too early', 'wrong tab', 'strict mode violation', 'waiting for selector',
  ] },
  { type: FAILURE.TOOLING, patterns: [
    'transport closed', 'transport error', 'mcp', 'cdp connect', ' econnrefused',
    'etimedout', 'timeout', 'profile corrupt', 'screenshot timeout', 'terminal command stuck',
    'powershell', 'glob', 'npm script hang', 'dev server not responding', 'turbopack panic',
    'turbopack', '.next stale', 'stale bundle', 'port conflict', 'eaddrinuse', 'file lock',
    'index.lock', 'git index', 'epipe', 'stream was destroyed',
  ] },
];

export function classifyFailure(errorOrSymptom) {
  const text = (typeof errorOrSymptom === 'string'
    ? errorOrSymptom
    : (errorOrSymptom && (errorOrSymptom.message || JSON.stringify(errorOrSymptom))) || ''
  ).toLowerCase();
  for (const rule of CLASSIFY_RULES) {
    if (rule.patterns.some((p) => text.includes(p))) return rule.type;
  }
  return FAILURE.TOOLING;
}

export function fixStamp(toolOrArea, failureType, actionTaken, evidence, status) {
  const stamp = `FIX::${toolOrArea}::${failureType}::${actionTaken}::${evidence}::${status}`;
  console.log(stamp);
  logHealingEvent({
    phase: 'fixStamp', failureType, exactSymptom: actionTaken,
    attemptedAction: actionTaken, result: status, fixStamp: stamp,
    approvalRequired: status === 'BLOCKED' ? 'yes' : 'no',
  });
  return stamp;
}

function ensureLogHeader() {
  if (!fs.existsSync(WORKSPACE_DIR)) fs.mkdirSync(WORKSPACE_DIR, { recursive: true });
  if (!fs.existsSync(HEALING_LOG)) {
    fs.writeFileSync(HEALING_LOG,
      '# Self-Healing Log\n\n' +
      'Append-only log of every recovery event.\n\n' +
      '| Timestamp | Phase | FailureType | Symptom | SourceUsed | Action | Attempt | Result | Continued | ApprovalRequired | FIX |\n' +
      '|-----------|-------|-------------|---------|------------|--------|---------|--------|-----------|------------------|-----|\n');
  }
}

export function logHealingEvent(event) {
  ensureLogHeader();
  const e = {
    timestamp: new Date().toISOString(),
    phase: '-', failureType: '-', exactSymptom: '-', sourceUsed: '-',
    attemptedAction: '-', attemptNumber: '-', result: '-',
    continued: 'no', approvalRequired: 'no', fixStamp: '-',
    ...event,
  };
  const cell = (v) => String(v == null ? '-' : v).replace(/\|/g, '\\|').replace(/\n/g, ' ');
  const row = `| ${cell(e.timestamp)} | ${cell(e.phase)} | ${cell(e.failureType)} | ${cell(e.exactSymptom)} | ${cell(e.sourceUsed)} | ${cell(e.attemptedAction)} | ${cell(e.attemptNumber)} | ${cell(e.result)} | ${cell(e.continued)} | ${cell(e.approvalRequired)} | ${cell(e.fixStamp)} |\n`;
  fs.appendFileSync(HEALING_LOG, row);
  return e;
}

export async function retryWithLimit(taskName, fn, maxAttempts = 3) {
  let lastErr;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    attemptCounters.set(taskName, attempt);
    try {
      const result = await fn(attempt);
      return { ok: true, result, attempts: attempt };
    } catch (err) {
      lastErr = err;
      const failureType = classifyFailure(err);
      logHealingEvent({ phase: taskName, failureType, exactSymptom: (err && err.message || String(err)).slice(0, 160),
        attemptedAction: 'retry', attemptNumber: `${attempt}/${maxAttempts}`, result: 'RETRY' });
      if (failureType === FAILURE.INFRA) {
        return stopIfForbiddenChangeNeeded(`INFRA blocker during ${taskName}: ${err && err.message}`);
      }
    }
  }
  console.log('AUTO_HEALING_ATTEMPTS_EXHAUSTED_DO_NOT_STAGE');
  logHealingEvent({ phase: taskName, failureType: classifyFailure(lastErr), exactSymptom: (lastErr && lastErr.message || '').slice(0, 160),
    attemptedAction: 'retryWithLimit', attemptNumber: `${maxAttempts}/${maxAttempts}`, result: 'EXHAUSTED', approvalRequired: 'yes' });
  return { ok: false, exhausted: true, status: 'AUTO_HEALING_ATTEMPTS_EXHAUSTED_DO_NOT_STAGE', error: lastErr && lastErr.message };
}

export function stopIfForbiddenChangeNeeded(reason) {
  console.log('AUTO_HEALING_BLOCKED_REQUIRES_USER_APPROVAL');
  fixStamp('Engine', FAILURE.INFRA, 'FORBIDDEN_CHANGE_NEEDED', String(reason).slice(0, 160), 'BLOCKED');
  return { ok: false, blocked: true, status: 'AUTO_HEALING_BLOCKED_REQUIRES_USER_APPROVAL', reason };
}

export function isPathInsideProject(filePath, projectRoot = PROJECT_ROOT) {
  const resolved = path.resolve(filePath);
  const root = path.resolve(projectRoot);
  return resolved.startsWith(root + path.sep) || resolved === root;
}

export function getChromeExternalProfilePath(projectName = 'sms') {
  const root = path.parse(PROJECT_ROOT).root;
  return path.join(root, `${projectName}-cdp-profiles`, 'brand-vnext-auth-profile');
}

// ----------------------------------------------------------------------------
// Low-level helpers
// ----------------------------------------------------------------------------
function httpGet(url, timeoutMs = 4000) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', (c) => { data += c; });
      res.on('end', () => resolve({ ok: true, status: res.statusCode, body: data }));
    });
    req.on('error', (err) => resolve({ ok: false, error: err.message }));
    req.setTimeout(timeoutMs, () => { req.destroy(); resolve({ ok: false, error: 'TIMEOUT' }); });
  });
}

function ps(command) {
  const tmp = path.join(os.tmpdir(), `sms-ps-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2)}.ps1`);
  try {
    fs.writeFileSync(tmp, command, 'utf8');
    return execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${tmp}"`,
      { encoding: 'utf8', timeout: 20000 }).trim();
  } catch (err) {
    return `__PS_ERROR__:${err.message}`;
  } finally {
    try { fs.unlinkSync(tmp); } catch { /* ignore */ }
  }
}

function findCdpChromePid() {
  const out = ps(`(Get-NetTCPConnection -LocalPort ${CDP_PORT} -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty OwningProcess)`);
  if (!out || out.startsWith('__PS_ERROR__')) return null;
  return out.trim() || null;
}

// ----------------------------------------------------------------------------
// Exported function placeholders (filled in by subsequent chunks)
// ----------------------------------------------------------------------------
export const TOOL_ADAPTERS = {
  Playwright_MCP: {
    purpose: 'UI screenshots, snapshots, console/network logs, computed styles, accessibility checks',
    safeFixes: ['screenshotWithFallback', 'page navigation retry', 'context refresh'],
    forbiddenFixes: ['cookie injection', 'OAuth bypass', 'fake login'],
    evidence: ['screenshot path', 'page URL', 'console messages'],
  },
  Chrome_CDP: {
    purpose: 'Chrome DevTools Protocol for authenticated browser automation',
    safeFixes: ['recoverCDP with external profile', 'checkCDP probe'],
    forbiddenFixes: ['kill all Chrome processes', 'modify Chrome internals', 'copy profiles into project'],
    evidence: ['CDP /json/version response', 'profile path outside project'],
  },
  DevServer_NextJS: {
    purpose: 'Next.js dev server on localhost:3000',
    safeFixes: ['checkDevServer probe', 'targeted PID stop + restart (gated)'],
    forbiddenFixes: ['global node kill', 'delete .next/ without approval', 'modify next.config'],
    evidence: ['HTTP status', 'PID list', 'restart success'],
  },
  Turbopack: {
    purpose: 'Next.js bundler/watcher',
    safeFixes: ['dev server restart (gated)'],
    forbiddenFixes: ['modify Turbopack internals', 'force webpack fallback'],
    evidence: ['dev server responsive', 'bundle status'],
  },
  next_intl: {
    purpose: 'i18n message management',
    safeFixes: [],
    forbiddenFixes: ['auto-edit i18n messages without approval'],
    evidence: ['i18n scan results'],
  },
  Git: {
    purpose: 'Version control operations',
    safeFixes: ['detect index.lock', 'report status'],
    forbiddenFixes: ['auto git reset', 'auto git clean', 'auto commit/push', 'broad git add'],
    evidence: ['git status output', 'git diff --stat'],
  },
  Context7: {
    purpose: 'Library documentation lookup',
    safeFixes: ['retry after transport recovery', 'fallback to web docs'],
    forbiddenFixes: ['modify .mcp.json', 'kill Context7 process without PID check'],
    evidence: ['transport test result', 'fallback used'],
  },
  Visual_Analyzer_Generic: {
    purpose: 'Visual QA and screenshot analysis',
    safeFixes: ['fallback screenshot methods'],
    forbiddenFixes: ['auto-edit CSS without approval', 'auto-edit product code'],
    evidence: ['screenshot path', 'method used'],
  },
  AI_Website_Cloner_Methodology: {
    purpose: 'UI hierarchy and design pattern methodology only',
    safeFixes: ['methodology reference only'],
    forbiddenFixes: ['clone external website', 'install cloner repo', 'copy external assets'],
    evidence: ['methodology step checklist'],
  },
};

export function buildToolAdapter(toolConfig) {
  const base = TOOL_ADAPTERS[toolConfig.name];
  if (!base) return { ok: false, error: `UNKNOWN_ADAPTER:${toolConfig.name}` };
  return { ok: true, adapter: { ...base, ...toolConfig.overrides } };
}

export function validateToolRegistry(registry = TOOL_ADAPTERS) {
  const issues = [];
  for (const [name, cfg] of Object.entries(registry)) {
    if (!cfg.purpose) issues.push(`${name}: missing purpose`);
    if (!Array.isArray(cfg.safeFixes)) issues.push(`${name}: safeFixes must be array`);
    if (!Array.isArray(cfg.forbiddenFixes)) issues.push(`${name}: forbiddenFixes must be array`);
    if (!Array.isArray(cfg.evidence)) issues.push(`${name}: evidence must be array`);
  }
  return { ok: issues.length === 0, issues };
}
export async function checkCDP() {
  const res = await httpGet(`${CDP_URL}/json/version`, 4000);
  if (res.ok && res.status === 200) {
    let browser = 'unknown';
    try { browser = JSON.parse(res.body).Browser; } catch { /* ignore */ }
    return { up: true, browser };
  }
  return { up: false, error: res.error };
}

export async function checkDevServer(routePath = '/', timeoutMs = 20000) {
  const res = await httpGet(`${BASE_URL}${routePath}`, timeoutMs);
  return { responsive: res.ok && res.status && res.status < 500, status: res.status, error: res.error };
}

export function findNextDevPids() {
  const out = ps([
    "Get-CimInstance Win32_Process -Filter \"Name='node.exe'\" |",
    "Where-Object { $_.CommandLine -match 'next' -and ($_.CommandLine -match 'start-server' -or $_.CommandLine -match 'dist[\\\\/]+bin[\\\\/]+next' -or $_.CommandLine -match 'next dev') } |",
    "ForEach-Object { $_.ProcessId.ToString() + '|' + $_.CommandLine }",
  ].join('\n'));
  if (out.startsWith('__PS_ERROR__')) return [];
  return out.split(/\r?\n/).filter(Boolean).map((line) => {
    const i = line.indexOf('|');
    return { pid: line.slice(0, i).trim(), cmd: line.slice(i + 1).trim() };
  });
}

export function quarantineProjectChromeProfiles() {
  const moved = [];
  const PATTERNS = [/\.brand-.*profile/i, /\.brand-.*auth/i, /\.brand-.*qa/i];
  if (!fs.existsSync(WORKSPACE_DIR)) return { moved, found: 0 };

  const entries = fs.readdirSync(WORKSPACE_DIR, { withFileTypes: true });
  const candidates = entries.filter((d) => d.isDirectory() && PATTERNS.some((re) => re.test(d.name)));

  if (candidates.length === 0) {
    return { moved, found: 0, note: 'NO_IN_TREE_CHROME_PROFILES_FOUND' };
  }
  if (!fs.existsSync(QUARANTINE_DIR)) fs.mkdirSync(QUARANTINE_DIR, { recursive: true });

  for (const c of candidates) {
    const from = path.join(WORKSPACE_DIR, c.name);
    const to = path.join(QUARANTINE_DIR, `${c.name}-${Date.now()}`);
    try {
      fs.renameSync(from, to);
      moved.push({ from, to });
    } catch (err) {
      const r = ps(`Move-Item -LiteralPath '${from}' -Destination '${to}' -Force`);
      if (!r.startsWith('__PS_ERROR__')) moved.push({ from, to });
      else logHealingEvent({ phase: 'quarantine', failureType: FAILURE.TOOLING, exactSymptom: `move failed: ${c.name}`, attemptedAction: 'Move-Item', result: 'FAILED' });
    }
  }
  return { moved, found: candidates.length };
}

function findChromeExe() {
  const known = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  ];
  for (const p of known) if (fs.existsSync(p)) return p;
  return null;
}

export async function recoverCDP({ confirmDestructive = false } = {}) {
  const status = await checkCDP();
  if (status.up) {
    fixStamp('Chrome_CDP', FAILURE.TOOLING, 'CDP_ALREADY_LISTENING', `PORT_${CDP_PORT}_${status.browser}`, 'PASS');
    return { ok: true, launched: false, ...status };
  }
  if (!confirmDestructive) {
    fixStamp('Chrome_CDP', FAILURE.TOOLING, 'CDP_DOWN_LAUNCH_REQUIRES_APPROVAL', `WOULD_LAUNCH_PROFILE_${CDP_PROFILE_DIR}`, 'BLOCKED');
    return { ok: false, blocked: true, reason: 'CDP_DOWN_LAUNCH_REQUIRES_APPROVAL' };
  }
  const chrome = findChromeExe();
  if (!chrome) {
    fixStamp('Chrome_CDP', FAILURE.TOOLING, 'CHROME_EXE_NOT_FOUND', 'NO_KNOWN_CHROME_PATH', 'FAILED');
    return { ok: false, error: 'CHROME_EXE_NOT_FOUND' };
  }
  if (!fs.existsSync(CDP_PROFILE_DIR)) fs.mkdirSync(CDP_PROFILE_DIR, { recursive: true });
  const child = spawn(chrome, [
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${CDP_PROFILE_DIR}`,
    '--no-first-run', '--no-default-browser-check',
    BASE_URL,
  ], { detached: true, stdio: 'ignore' });
  child.unref();
  for (let i = 0; i < 15; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    const s = await checkCDP();
    if (s.up) {
      fixStamp('Chrome_CDP', FAILURE.TOOLING, 'LAUNCHED_CHROME_EXTERNAL_PROFILE', `CDP_PORT_${CDP_PORT}_READY`, 'PASS');
      return { ok: true, launched: true, ...s };
    }
  }
  fixStamp('Chrome_CDP', FAILURE.TOOLING, 'LAUNCHED_CHROME_BUT_CDP_NOT_READY', 'CDP_STILL_DOWN', 'FAILED');
  return { ok: false, error: 'CDP_NOT_READY_AFTER_LAUNCH' };
}

export async function recoverDevServer({ confirmDestructive = false } = {}) {
  const root = await checkDevServer('/', 20000);
  if (root.responsive) {
    fixStamp('DevServer', FAILURE.TOOLING, 'DEV_SERVER_RESPONSIVE', `STATUS_${root.status}`, 'PASS');
    return { ok: true, restarted: false, status: root.status };
  }
  const pids = findNextDevPids();
  void findCdpChromePid;

  if (!confirmDestructive) {
    fixStamp('DevServer', FAILURE.TOOLING, 'DEV_SERVER_UNRESPONSIVE_RESTART_REQUIRES_APPROVAL',
      `STALE_PIDS_${pids.map((p) => p.pid).join(',') || 'unknown'}`, 'BLOCKED');
    return { ok: false, blocked: true, reason: 'DEV_SERVER_UNRESPONSIVE_RESTART_REQUIRES_APPROVAL', pids };
  }

  for (const p of pids) {
    const r = ps(`Stop-Process -Id ${p.pid} -Force -ErrorAction SilentlyContinue`);
    logHealingEvent({ phase: 'recoverDevServer', failureType: FAILURE.TOOLING,
      exactSymptom: `stale next dev pid ${p.pid}`, attemptedAction: `Stop-Process -Id ${p.pid}`,
      result: r.startsWith('__PS_ERROR__') ? 'FAILED' : 'STOPPED', approvalRequired: 'no' });
  }
  const child = spawn('cmd.exe', ['/c', 'npm', 'run', 'dev'],
    { cwd: PROJECT_ROOT, detached: true, stdio: 'ignore' });
  child.unref();
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 3000));
    const s = await checkDevServer('/', 8000);
    if (s.responsive) {
      fixStamp('DevServer', FAILURE.TOOLING, 'RESTARTED_NEXT_DEV_TARGETED_PID', `LOCALHOST_3000_${s.status}`, 'PASS');
      return { ok: true, restarted: true, status: s.status };
    }
  }
  fixStamp('DevServer', FAILURE.TOOLING, 'RESTARTED_BUT_STILL_UNRESPONSIVE', 'DEV_STILL_DOWN', 'FAILED');
  return { ok: false, error: 'DEV_NOT_RESPONSIVE_AFTER_RESTART' };
}

export async function screenshotWithFallback(page, name) {
  const out = path.join(WORKSPACE_DIR, name.endsWith('.png') ? name : `${name}.png`);
  const attempts = [
    { label: 'viewport', fn: () => page.screenshot({ path: out }) },
    { label: 'fullPage', fn: () => page.screenshot({ path: out, fullPage: true }) },
    { label: 'clip', fn: async () => {
        const vp = page.viewportSize() || { width: 1440, height: 900 };
        return page.screenshot({ path: out, clip: { x: 0, y: 0, width: vp.width, height: vp.height } });
      } },
    { label: 'jpeg', fn: () => page.screenshot({ path: out.replace(/\.png$/, '.jpg'), type: 'jpeg', quality: 80 }) },
    { label: 'animations-disabled', fn: () => page.screenshot({ path: out, animations: 'disabled' }) },
    { label: 'raw-cdp', fn: async () => {
        const client = await page.context().newCDPSession(page);
        const { data } = await client.send('Page.captureScreenshot', { format: 'png', fromSurface: true });
        fs.writeFileSync(out, Buffer.from(data, 'base64'));
      } },
  ];
  let lastErr;
  for (let i = 0; i < attempts.length; i++) {
    try {
      await attempts[i].fn();
      if (i > 0) fixStamp('Playwright', 'SCREENSHOT_TIMEOUT', `USED_${attempts[i].label.toUpperCase()}_FALLBACK`, `CAPTURED_${name}`, 'PASS');
      return { ok: true, path: out, method: attempts[i].label };
    } catch (err) { lastErr = err; }
  }
  fixStamp('Playwright', 'SCREENSHOT_TIMEOUT', 'ALL_FALLBACKS_EXHAUSTED', `FAILED_${name}`, 'FAILED');
  return { ok: false, error: lastErr && lastErr.message };
}

export async function handleAuthRecovery(page) {
  await page.goto(`${BASE_URL}/login?returnTo=/client/brand`, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
  const url = page.url();
  if (url.includes('accounts.google.com')) {
    fixStamp('Auth', FAILURE.INFRA, 'GOOGLE_OAUTH_DETECTED', url, 'BLOCKED');
    return { ok: false, status: 'GOOGLE_OAUTH_WRONG_PATH_STOP' };
  }
  console.log('LOGIN_WITH_EMAIL_PASSWORD_ONLY_NOT_GOOGLE');
  return { ok: true, status: 'AWAITING_USER_EMAIL_PASSWORD_LOGIN', url };
}

// ----------------------------------------------------------------------------
// CLI dispatcher
// ----------------------------------------------------------------------------
function printProtocol() {
  console.log('=== Self-Healing Engine Protocol ===');
  console.log(JSON.stringify(FAILURE, null, 2));
}

async function runSelfTest() {
  let passed = 0;
  let failed = 0;
  const log = (label, ok, detail = '') => {
    const status = ok ? 'PASS' : 'FAIL';
    console.log(`  [${status}] ${label}${detail ? ' — ' + detail : ''}`);
    if (ok) passed++; else failed++;
  };

  console.log('=== Self-Healing Engine Self-Test ===\n');

  // classifyFailure
  log('classifyFailure → INFRA (rls)', classifyFailure('rls permission denied') === FAILURE.INFRA);
  log('classifyFailure → PRODUCT (missing message)', classifyFailure('missing_message details.save') === FAILURE.PRODUCT);
  log('classifyFailure → TEST (selector)', classifyFailure('waiting for selector') === FAILURE.TEST);
  log('classifyFailure → TOOLING (cdp)', classifyFailure('cdp connect error') === FAILURE.TOOLING);
  log('classifyFailure default → TOOLING', classifyFailure('random unknown thing') === FAILURE.TOOLING);

  // fixStamp format
  const stamp = fixStamp('TestArea', 'TEST_BUG', 'TEST_ACTION', 'TEST_EVIDENCE', 'PASS');
  log('fixStamp format valid', /^FIX::/.test(stamp) && /::PASS$/.test(stamp), stamp);

  // isPathInsideProject
  log('isPathInsideProject true', isPathInsideProject(path.join(PROJECT_ROOT, 'src', 'app', 'page.tsx')));
  log('isPathInsideProject false', !isPathInsideProject('C:/Windows'));

  // getChromeExternalProfilePath
  const extProfile = getChromeExternalProfilePath();
  log('getChromeExternalProfilePath outside project', !isPathInsideProject(extProfile), extProfile);

  // buildToolAdapter
  const adapter = buildToolAdapter({ name: 'Chrome_CDP' });
  log('buildToolAdapter Chrome_CDP', adapter.ok && adapter.adapter.purpose.includes('DevTools'));
  log('buildToolAdapter unknown', !buildToolAdapter({ name: 'UnknownTool' }).ok);

  // validateToolRegistry
  const regCheck = validateToolRegistry();
  log('validateToolRegistry', regCheck.ok, regCheck.issues.length ? `issues: ${regCheck.issues.join(', ')}` : 'all adapters valid');

  // retryWithLimit
  const r1 = await retryWithLimit('self-test-pass', () => Promise.resolve('ok'));
  log('retryWithLimit success', r1.ok && r1.result === 'ok');
  const r2 = await retryWithLimit('self-test-fail', () => Promise.reject(new Error('always fails')), 2);
  log('retryWithLimit exhausted', !r2.ok && r2.exhausted);

  // stopIfForbiddenChangeNeeded
  const block = stopIfForbiddenChangeNeeded('test reason');
  log('stopIfForbiddenChangeNeeded blocked', block.blocked && block.status === 'AUTO_HEALING_BLOCKED_REQUIRES_USER_APPROVAL');

  console.log(`\n=== Self-Test Results: ${passed} passed, ${failed} failed ===`);
  if (failed === 0) {
    console.log('SELF_HEALING_ENGINE_SELF_TEST_PASS');
    process.exit(0);
  } else {
    console.log('SELF_HEALING_ENGINE_SELF_TEST_FAIL');
    process.exit(1);
  }
}

async function runCli() {
  const args = process.argv.slice(2);
  const has = (f) => args.includes(f);

  if (has('--self-test')) { runSelfTest(); return; }
  if (has('--print-protocol')) { printProtocol(); return; }
  if (has('--validate-registry')) {
    const r = validateToolRegistry();
    console.log(JSON.stringify(r, null, 2));
    process.exit(r.ok ? 0 : 1);
  }

  console.log('=== Cascade Self-Healing Engine ===');
  console.log('Use --self-test, --print-protocol, or --validate-registry');
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
