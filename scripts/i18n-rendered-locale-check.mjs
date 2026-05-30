#!/usr/bin/env node

/**
 * i18n-rendered-locale-check.mjs
 * 
 * Scans actual rendered HTML for wrong-language text in BOTH locales.
 * Requires dev server at http://localhost:3000.
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

// Configuration
const BASE_URL = 'http://localhost:3000';
const ROUTES = [
  '/',
  '/client/dashboard',
  '/client/campaigns',
  '/client/analytics',
  '/client/brand-dna',
  '/client/content-studio',
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

// Allowed English terms in Arabic mode
const ALLOWED_ENGLISH_AR = new Set([
  'WhatsApp', 'Instagram', 'TikTok', 'Facebook', 'Google', 'Meta',
  'OpenAI', 'Leonardo AI', 'Ideogram', 'Flux', 'Kling', 'Runway',
  'Nano', 'Banana', 'API', 'Next.js', 'React', 'Node', 'npm',
  'npx', 'TypeScript', 'TS', 'JS', 'TSX', 'IBM Plex Sans Arabic',
  'Inter', 'CTA', 'ROI', 'UX', 'UI', 'DM', 'DNA', 'Ads', 'Reels',
  'English', // Language switch label only
  'System', // Brand name in "Smart Marketing System"
  'Smart', // Brand name in "Smart Marketing System"
  'Marketing', // Brand name in "Smart Marketing System"
  // Design system technical terms
  'design', 'system', 'center', 'growth', 'oriented',
  'Active', 'Inactive', 'Pending', 'Success', 'Error', 'Warning', 'Info',
  'No', 'Premium', 'living', 'AI-native', 'foundation', 'Elegant',
  'Executive', 'command-center', 'alive', 'Intelligent', 'mystique',
]);

// Allowed Arabic terms in English mode
const ALLOWED_ARABIC_EN = new Set([
  'العربية', // Language switch label only
  'IBM Plex Sans Arabic', // Font name
]);

// Suspicious English words for Arabic mode
const SUSPICIOUS_ENGLISH = [
  'Dashboard', 'Campaign', 'Analytics', 'Brand', 'Content', 'Studio',
  'Publishing', 'Recommendations', 'Settings', 'Overview', 'Brain',
  'Integrations', 'Monitoring', 'Clients', 'Billing', 'Backup',
  'System', 'Learning', 'Center', 'Design', 'System',
  'Title', 'Subtitle', 'Description', 'Status', 'Active', 'Inactive',
  'Loading', 'Error', 'Success', 'Warning', 'Info',
  'Save', 'Cancel', 'Delete', 'Edit', 'Create', 'Update',
  'Yes', 'No', 'OK', 'Close', 'Open', 'View',
  'Total', 'Revenue', 'Growth', 'Performance', 'Activity',
  'Recent', 'Top', 'Best', 'Featured', 'Popular',
  'New', 'Old', 'All', 'Filter', 'Sort', 'Search',
  'Page', 'of', 'Next', 'Previous', 'First', 'Last',
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
  'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
  'Today', 'Yesterday', 'Tomorrow', 'Week', 'Month', 'Year',
  'Hour', 'Minute', 'Second', 'Day',
  'ago', 'from now',
];

// Raw translation key patterns
const RAW_KEY_PATTERNS = [
  /common\.\w+/g,
  /clientDashboard\.\w+(\.\w+)*/g,
  /clientCampaigns\.\w+(\.\w+)*/g,
  /clientAnalytics\.\w+(\.\w+)*/g,
  /clientBrandDNA\.\w+(\.\w+)*/g,
  /clientContentStudio\.\w+(\.\w+)*/g,
  /clientPublishing\.\w+(\.\w+)*/g,
  /clientRecommendations\.\w+(\.\w+)*/g,
  /clientSettings\.\w+(\.\w+)*/g,
  /controlOverview\.\w+(\.\w+)*/g,
  /controlAIBrain\.\w+(\.\w+)*/g,
  /controlIntegrations\.\w+(\.\w+)*/g,
  /controlMonitoring\.\w+(\.\w+)*/g,
  /controlBilling\.\w+(\.\w+)*/g,
  /controlClients\.\w+(\.\w+)*/g,
  /controlBackup\.\w+(\.\w+)*/g,
  /controlSystemSettings\.\w+(\.\w+)*/g,
  /controlLearningCenter\.\w+(\.\w+)*/g,
  /designSystem\.\w+(\.\w+)*/g,
  /\w+\.\w+\.\w+/g, // Generic dotted pattern
];

// Blocklist: Strings that must never appear in rendered output (both modes)
const BLOCKLIST_STRINGS = [
  'clientBrandDNA.brandProfile.defaultMission',
  'clientBrandDNA.aiBrainStatus.defaultDataQuality',
];

// Blocklist: English words that must not appear in Arabic mode only
const ARABIC_MODE_BLOCKLIST = [
  // I10 regression strings
  'Premium cleaning service',
  'Sell comfort, not cleaning',
  'No real connection logic. Visual provider management only.',
  'No real logic. Visual provider switching only.',
  // I11 regression strings
  'Uploaded',
  'Excellent',
  'Shows where real customer conversations start.',
  'High',
  'Medium',
  'low',
  // I12 regression strings
  'AI Operations Manager',
  // I14.1 regression strings
  'Online',
  // I14.2 regression strings
  'Global',
];

// Check if dev server is running
async function checkDevServer() {
  try {
    const response = await fetch(BASE_URL, {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Fetch page with locale cookies
async function fetchPage(route, locale) {
  const url = `${BASE_URL}${route}`;
  const headers = {
    'Cookie': `NEXT_LOCALE=${locale}; locale=${locale}`,
    'Accept-Language': locale,
  };
  
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    throw new Error(`Failed to fetch ${route} for locale ${locale}: ${error.message}`);
  }
}

// Strip script and style tags
function stripScripts(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '');
}

// Extract visible text from HTML
function extractVisibleText(html) {
  const stripped = stripScripts(html);
  // Remove HTML tags but keep text content
  const text = stripped
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
  return text;
}

// Check for Arabic Unicode text
function hasArabic(text) {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
}

// Check for generic English text in Arabic mode
function checkEnglishInArabic(text) {
  const violations = [];
  
  for (const word of SUSPICIOUS_ENGLISH) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = text.match(regex);
    if (matches) {
      for (const match of matches) {
        if (!ALLOWED_ENGLISH_AR.has(match)) {
          violations.push({
            text: match,
            type: 'english-in-arabic',
          });
        }
      }
    }
  }
  
  return violations;
}

// Check for Arabic text in English mode
function checkArabicInEnglish(text) {
  const violations = [];
  const arabicWords = text.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+/g) || [];
  
  for (const word of arabicWords) {
    if (!ALLOWED_ARABIC_EN.has(word)) {
      violations.push({
        text: word,
        type: 'arabic-in-english',
      });
    }
  }
  
  return violations;
}

// Check for raw translation keys
function checkRawKeys(text) {
  const violations = [];

  for (const pattern of RAW_KEY_PATTERNS) {
    const matches = text.match(pattern);
    if (matches) {
      for (const match of matches) {
        violations.push({
          text: match,
          type: 'raw-key',
        });
      }
    }
  }

  return violations;
}

// Check for blocklisted strings
function checkBlocklisted(text, locale) {
  const violations = [];

  // Always check universal blocklist (both modes)
  for (const blocked of BLOCKLIST_STRINGS) {
    if (text.includes(blocked)) {
      violations.push({
        text: blocked,
        type: 'blocklisted',
      });
    }
  }

  // Check Arabic-mode blocklist only in Arabic mode
  if (locale === 'ar') {
    for (const blocked of ARABIC_MODE_BLOCKLIST) {
      if (text.includes(blocked)) {
        violations.push({
          text: blocked,
          type: 'blocklisted',
        });
      }
    }
  }

  return violations;
}

// Get context around a match
function getContext(text, match, contextLength = 50) {
  const index = text.indexOf(match);
  if (index === -1) return '';
  const start = Math.max(0, index - contextLength);
  const end = Math.min(text.length, index + match.length + contextLength);
  return text.substring(start, end);
}

// Main check function
async function checkRoute(route) {
  const results = {
    route,
    arabic: { violations: [], issues: [] },
    english: { violations: [], issues: [] },
  };
  
  // Check Arabic mode
  try {
    const arabicHtml = await fetchPage(route, 'ar');
    const arabicText = extractVisibleText(arabicHtml);
    
    const englishViolations = checkEnglishInArabic(arabicText);
    const rawKeyViolations = checkRawKeys(arabicText);
    const blocklistedViolations = checkBlocklisted(arabicText, 'ar');
    
    for (const v of englishViolations) {
      results.arabic.violations.push({
        ...v,
        context: getContext(arabicText, v.text),
      });
    }
    
    for (const v of rawKeyViolations) {
      results.arabic.violations.push({
        ...v,
        context: getContext(arabicText, v.text),
      });
    }
    
    for (const v of blocklistedViolations) {
      results.arabic.violations.push({
        ...v,
        context: getContext(arabicText, v.text),
      });
    }
  } catch (error) {
    results.arabic.issues.push(error.message);
  }
  
  // Check English mode
  try {
    const englishHtml = await fetchPage(route, 'en');
    const englishText = extractVisibleText(englishHtml);
    
    const arabicViolations = checkArabicInEnglish(englishText);
    const rawKeyViolations = checkRawKeys(englishText);
    const blocklistedViolations = checkBlocklisted(englishText, 'en');
    
    for (const v of arabicViolations) {
      results.english.violations.push({
        ...v,
        context: getContext(englishText, v.text),
      });
    }
    
    for (const v of rawKeyViolations) {
      results.english.violations.push({
        ...v,
        context: getContext(englishText, v.text),
      });
    }
    
    for (const v of blocklistedViolations) {
      results.english.violations.push({
        ...v,
        context: getContext(englishText, v.text),
      });
    }
  } catch (error) {
    results.english.issues.push(error.message);
  }
  
  return results;
}

// Main function
async function main() {
  console.log('🔍 Starting i18n Rendered Locale Check...\n');
  
  // Check if dev server is running
  console.log('Checking dev server...');
  const serverRunning = await checkDevServer();
  if (!serverRunning) {
    console.error('❌ Dev server is not running at', BASE_URL);
    console.error('Please run: npm run dev');
    process.exit(1);
  }
  console.log('✅ Dev server is running\n');
  
  const allResults = [];
  let totalViolations = 0;
  
  for (const route of ROUTES) {
    console.log(`Checking: ${route}`);
    try {
      const result = await checkRoute(route);
      allResults.push(result);
      
      const arabicCount = result.arabic.violations.length;
      const englishCount = result.english.violations.length;
      totalViolations += arabicCount + englishCount;
      
      if (arabicCount > 0 || englishCount > 0) {
        console.log(`  ⚠️  Arabic mode: ${arabicCount} violations`);
        console.log(`  ⚠️  English mode: ${englishCount} violations`);
        
        for (const v of result.arabic.violations) {
          console.log(`    - [AR] ${v.type}: "${v.text}"`);
          console.log(`      Context: "...${v.context}..."`);
        }
        
        for (const v of result.english.violations) {
          console.log(`    - [EN] ${v.type}: "${v.text}"`);
          console.log(`      Context: "...${v.context}..."`);
        }
      } else {
        console.log('  ✅ No violations');
      }
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total routes checked: ${ROUTES.length}`);
  console.log(`Total violations: ${totalViolations}`);
  
  if (totalViolations > 0) {
    console.log('\n❌ FAILED: Found wrong-language text in rendered pages');
    process.exit(1);
  } else {
    console.log('\n✅ PASSED: All rendered pages show correct language');
    process.exit(0);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
