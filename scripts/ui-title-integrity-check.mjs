#!/usr/bin/env node

/**
 * UI Title Integrity Check
 * 
 * Detects missing or blank titles in rendered UI.
 * Checks both Arabic and English modes.
 */

import http from 'http';

const BASE_URL = 'http://localhost:3000';
const ROUTES = [
  '/',
  '/client/dashboard',
  '/client/brand-dna',
  '/client/content-studio',
  '/client/campaigns',
  '/client/analytics',
  '/client/publishing',
  '/client/recommendations',
  '/client/settings',
  '/control/overview',
  '/control/ai-brain',
  '/control/integrations',
  '/control/monitoring',
  '/control/clients',
  '/control/billing',
  '/control/backup',
  '/control/system-settings',
  '/control/learning-center',
  '/design-system',
];

const LOCALES = ['ar', 'en'];
const STRICT_MODE = process.argv.includes('--strict');

// Patterns that indicate raw translation keys
const RAW_KEY_PATTERNS = [
  /[a-z]+\.[a-z]+\.[a-z]+/i,  // namespace.key.subkey
  /[a-z]+\.[a-z]+/i,           // namespace.key
  /^common\./i,                 // common.prefix
  /^client\./i,                 // client.prefix
  /^control\./i,                // control.prefix
];

// Patterns that indicate generic placeholder titles
const PLACEHOLDER_PATTERNS = [
  /^title$/i,
  /^card title$/i,
  /^untitled$/i,
  /^placeholder$/i,
  /^lorem ipsum$/i,
  /^test title$/i,
  /^sample title$/i,
  /^default title$/i,
];

// Classes that indicate hidden or visually-hidden elements
const HIDDEN_CLASS_PATTERNS = [
  /visually-hidden/i,
  /sr-only/i,
  /hidden/i,
  /opacity-0/i,
  /display-none/i,
];

function checkDevServer() {
  return new Promise((resolve) => {
    const req = http.get(`${BASE_URL}/`, (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(5000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

function fetchPage(route, locale) {
  return new Promise((resolve) => {
    const url = `${BASE_URL}${route}`;
    const headers = {
      'Cookie': `NEXT_LOCALE=${locale}; locale=${locale}`,
      'Accept-Language': locale === 'ar' ? 'ar-SA' : 'en-US',
    };
    
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      headers,
    };

    const req = http.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ success: true, data, statusCode: res.statusCode }));
    });
    req.on('error', (error) => resolve({ success: false, error: error.message }));
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({ success: false, error: 'Timeout' });
    });
  });
}

function extractTitles(html) {
  const issues = [];
  
  // Extract h1, h2, h3 tags with more context
  const headingRegex = /<h([1-6])[^>]*class="([^"]*)"[^>]*>(.*?)<\/h\1>/gi;
  let match;
  
  while ((match = headingRegex.exec(html)) !== null) {
    const level = match[1];
    const className = match[2];
    const content = match[3].trim();
    
    // Skip if hidden (visually-hidden, sr-only, etc.)
    const isHidden = HIDDEN_CLASS_PATTERNS.some(pattern => pattern.test(className));
    if (isHidden) continue;
    
    // Check for empty headings
    if (!content || content === '') {
      // Get surrounding context (200 chars before and after)
      const start = Math.max(0, match.index - 200);
      const end = Math.min(html.length, match.index + match[0].length + 200);
      const context = html.substring(start, end);
      
      issues.push({
        type: 'empty-heading',
        level: `h${level}`,
        className: className,
        content: content || '(empty)',
        raw: match[0],
        context: context,
      });
    }
    
    // Check for raw translation keys
    for (const pattern of RAW_KEY_PATTERNS) {
      if (pattern.test(content)) {
        issues.push({
          type: 'raw-key',
          level: `h${level}`,
          content: content,
        });
        break;
      }
    }
    
    // Check for object rendering
    if (content.includes('[object Object]')) {
      issues.push({
        type: 'object-render',
        level: `h${level}`,
        content: content,
      });
    }
    
    // Check for placeholder titles
    for (const pattern of PLACEHOLDER_PATTERNS) {
      if (pattern.test(content)) {
        issues.push({
          type: 'placeholder-title',
          level: `h${level}`,
          content: content,
        });
        break;
      }
    }
  }
  
  // Check for card title patterns
  const cardTitleRegex = /<[^>]*class="([^"]*card-title[^"]*)"[^>]*>(.*?)<\/[^>]*>/gi;
  while ((match = cardTitleRegex.exec(html)) !== null) {
    const className = match[1];
    const content = match[2].trim();
    
    // Skip if hidden
    const isHidden = HIDDEN_CLASS_PATTERNS.some(pattern => pattern.test(className));
    if (isHidden) continue;
    
    if (!content || content === '') {
      issues.push({
        type: 'empty-card-title',
        className: className,
        content: content || '(empty)',
      });
    }
    
    // Check for placeholder titles in cards
    for (const pattern of PLACEHOLDER_PATTERNS) {
      if (pattern.test(content)) {
        issues.push({
          type: 'placeholder-card-title',
          className: className,
          content: content,
        });
        break;
      }
    }
  }
  
  // Check for integration-specific title patterns
  // Look for cards in /control/integrations that might have missing titles
  const integrationCardRegex = /<[^>]*class="([^"]*integration[^"]*card[^"]*)"[^>]*>(.*?)<\/[^>]*>/gi;
  while ((match = integrationCardRegex.exec(html)) !== null) {
    const className = match[1];
    const content = match[2].trim();
    
    // Skip if hidden
    const isHidden = HIDDEN_CLASS_PATTERNS.some(pattern => pattern.test(className));
    if (isHidden) continue;
    
    // Check if the card has a title element
    const hasTitle = /<h[1-6][^>]*>.*?<\/h[1-6]>/.test(content) || 
                    /class="[^"]*title[^"]*"[^>]*>.*?</.test(content);
    
    if (!hasTitle) {
      issues.push({
        type: 'integration-card-missing-title',
        className: className,
        content: content.substring(0, 100),
      });
    }
  }
  
  return issues;
}

async function main() {
  console.log('🔍 Starting UI Title Integrity Check...\n');
  
  // Check dev server
  console.log('Checking dev server...');
  const serverRunning = await checkDevServer();
  
  if (!serverRunning) {
    console.error('❌ Dev server is not running on http://localhost:3000');
    console.error('Please run: npm run dev');
    
    if (STRICT_MODE) {
      process.exit(1);
    } else {
      console.warn('\n⚠️  Continuing in degraded mode (may miss issues)\n');
    }
  } else {
    console.log('✅ Dev server is running\n');
  }
  
  if (!serverRunning && !STRICT_MODE) {
    console.log('⚠️  Skipping page checks - dev server required\n');
    console.log('============================================================');
    console.log('SUMMARY');
    console.log('============================================================');
    console.log('Dev server not running - cannot check titles');
    console.log('Status: ⚠️  SKIPPED (dev server required)');
    process.exit(0);
  }
  
  let totalIssues = 0;
  const allIssues = [];
  
  for (const locale of LOCALES) {
    console.log(`\n🌐 Checking ${locale.toUpperCase()} mode...\n`);
    
    for (const route of ROUTES) {
      process.stdout.write(`Checking: ${route} ... `);
      
      const result = await fetchPage(route, locale);
      
      if (!result.success) {
        console.log(`❌ Failed (${result.error})`);
        allIssues.push({
          route,
          locale,
          type: 'fetch-error',
          error: result.error,
        });
        totalIssues++;
        continue;
      }
      
      if (result.statusCode !== 200) {
        console.log(`❌ HTTP ${result.statusCode}`);
        allIssues.push({
          route,
          locale,
          type: 'http-error',
          statusCode: result.statusCode,
        });
        totalIssues++;
        continue;
      }
      
      const issues = extractTitles(result.data);
      
      if (issues.length === 0) {
        console.log('✅ No violations');
      } else {
        console.log(`⚠️  ${issues.length} issue(s)`);
        totalIssues += issues.length;
        
        for (const issue of issues) {
          allIssues.push({
            route,
            locale,
            ...issue,
          });
        }
      }
    }
  }
  
  console.log('\n============================================================');
  console.log('SUMMARY');
  console.log('============================================================');
  console.log(`Total routes checked: ${ROUTES.length * LOCALES.length}`);
  console.log(`Total issues found: ${totalIssues}`);
  
  if (totalIssues > 0) {
    console.log('\n❌ FAILED: Found title integrity issues\n');
    
    // Group by type
    const byType = {};
    for (const issue of allIssues) {
      if (!byType[issue.type]) {
        byType[issue.type] = [];
      }
      byType[issue.type].push(issue);
    }
    
    for (const [type, issues] of Object.entries(byType)) {
      console.log(`\n${type.toUpperCase()} (${issues.length}):`);
      for (const issue of issues.slice(0, 10)) {
        console.log(`  - [${issue.locale}] ${issue.route}: ${issue.content || issue.error || issue.statusCode}`);
        if (issue.raw) {
          console.log(`    Raw: ${issue.raw.substring(0, 100)}...`);
        }
        if (issue.className) {
          console.log(`    Class: ${issue.className}`);
        }
        if (issue.context) {
          console.log(`    Context: ${issue.context.substring(0, 200)}...`);
        }
      }
      if (issues.length > 10) {
        console.log(`  ... and ${issues.length - 10} more`);
      }
    }
    
    process.exit(1);
  } else {
    console.log('\n✅ PASSED: No title integrity issues found');
    process.exit(0);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
