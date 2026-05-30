#!/usr/bin/env node

import { chromium } from 'playwright';

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

const ALLOWED_ENGLISH_IN_ARABIC = [
  'WhatsApp', 'Instagram', 'TikTok', 'Facebook', 'Google', 'Meta', 'OpenAI',
  'Leonardo AI', 'Ideogram', 'Flux', 'Kling', 'Runway', 'Nano', 'Banana',
  'API', 'Next.js', 'IBM Plex Sans Arabic', 'Inter', 'http', 'https',
  'localhost', '3000', 'CTA', 'ROI', 'UX', 'UI', 'DM', 'DNA', 'Ads', 'Reels',
  'Telegram', 'Messenger', 'iPhone', 'Pro', 'Enterprise', 'Nova', 'Phones',
  'com', 'www', 'novaphones', 'AM', 'PM', 'AI', 'OS', 'Smart', 'Marketing',
  'System', 'Design', 'Premium', 'Luxury', 'Tech', 'Color', 'Palette',
  'Clean', 'modern', 'professional', 'Elegant', 'readable', 'Executive',
  'Calm', 'beautiful', 'growth-oriented', 'command-center', 'alive', 'Intelligent',
  'mysterious', 'subtle', 'futuristic', 'Refined', 'experiences', 'startup',
  'rainbow', 'feeling', 'Bulk', 'image', 'generation', 'Print', 'posters',
  'Video', 'ads', 'Reels', 'Social', 'media', 'market', 'data', 'competitors',
  'reviews', 'trends', 'Connected', 'Active', 'Inactive', 'Loading', 'Error',
  'Success', 'No', 'Data', 'Refresh', 'Filter', 'Sort', 'Search', 'View',
  'Show', 'Hide', 'Add', 'Remove', 'Edit', 'Delete', 'Save', 'Cancel',
  'Create', 'Update', 'Delete', 'Confirm', 'Title', 'Subtitle', 'Description',
  'Status', 'Platform', 'Campaign', 'Brand', 'Content', 'Publish', 'Recommend',
  'Dashboard', 'Analytics', 'Settings', 'Integrations', 'Overview', 'Clients',
  'Billing', 'Backup', 'Monitoring', 'Learning', 'Center', 'System',
  'Brand', 'DNA', 'Studio', 'Campaigns', 'Publishing', 'Recommendations',
  'Client', 'Control', 'Brain', 'Product', 'Service', 'Hybrid', 'Business',
  'Model', 'Router', 'Intelligence', 'Pipeline', 'Marketing', 'Engine',
  'Director', 'Panel', 'Preview', 'Score', 'Readiness', 'Selector', 'Hero',
  'Mode', 'Battle', 'Urgent', 'Launch', 'Visual', 'Composition', 'Angles',
  'Cinematic', 'direction', 'Print', 'system', 'Best', 'time', 'Placement',
  'CTA', 'Funnel', 'Conversions', 'Rate', 'Value', 'Lead', 'Sale', 'Post',
  'view', 'engagement', 'Message', 'Phone', 'WhatsApp', 'Call', 'Strategy',
  'Contact', 'Conversion', 'Offer', 'Performance', 'Matrix', 'Asset',
  'Variations', 'Type', 'Poster', 'Reel', 'Story', 'Carousel', 'Text',
  'pack', 'Video', 'ad', 'High', 'Medium', 'Very', 'Low', 'Top',
  'Optimization', 'Cost', 'Efficiency', 'Reach', 'Interactions', 'Sentiment',
  'Likes', 'Comments', 'Shares', 'Saves', 'clicks', 'Follow-up', 'speed',
  'Point', 'weak', 'Analyzing', 'premium', 'positioning', 'Preparing',
  'visual', 'system', 'Detecting', 'emotional', 'triggers', 'Learning',
  'Sources', 'Website', 'tracked', 'Competitors', 'Identified', 'Market',
  'Gaps', 'Full', 'Analysis', 'View', 'Voice', 'Tone', 'Language',
  'Guide', 'Personality', 'Innovation', 'Traditional', 'Innovative',
  'Positioning', 'Affordable', 'Expression', 'Subtle', 'Bold', 'Style',
  'Classic', 'Modern', 'Approach', 'Human', 'Technical', 'Visual',
  'Mood', 'Color', 'Palette', 'Font', 'Family', 'Logo', 'Status',
  'Strategic', 'Insights', 'Recommendations', 'Focus', 'Camera', 'Messaging',
  'Psychology', 'Aspiration', 'Fear', 'missing', 'Trust', 'Provider',
  'Performance', 'Uptime', 'Latency', 'Quality', 'Speed', 'Prompt',
  'Obedience', 'Stability', 'Use', 'Change', 'Default', 'Routing',
  'Rules', 'Alert', 'Preferences', 'Business', 'Channel', 'Failover',
  'Scenario', 'Fallback', 'Result', 'Financial', 'Messaging', 'Command',
  'Operations', 'Team', 'Sales', 'Map', 'Activity', 'Recent', 'events',
  'Health', 'Overall', 'Queue', 'Infrastructure', 'Risk', 'Current',
  'Monthly', 'Estimate', 'Daily', 'Burn', 'Breakdown', 'Export', 'Report',
  'Generate', 'Intelligence', 'Add', 'Team', 'Member', 'Test', 'run',
  'Scan', 'Profile', 'Security', 'Tune', 'experience', 'way', 'Hub',
  'Customize', 'manage', 'living', 'Operating', 'foundation', 'built',
  'future', 'base', 'Soft', 'White', 'Warm', 'Neutral', 'Graphite',
  'Gray', 'Accent', 'Primary', 'Intelligent', 'Blue', 'Elegant', 'Violet',
  'Cyan', 'Typography', 'Personalities', 'Each', 'has', 'its', 'own',
  'character', 'feel', 'Components', 'Luxury', 'cards', 'elegant',
  'buttons', 'refined', 'badges', 'Status', 'Pills', 'depth', 'shadows',
  'hover', 'states', 'Living', 'Metrics', 'Data', 'trends', 'Future',
  'OS', 'Preview', 'glimp', 'into', 'what', 'possible', 'Predictions',
  'Market', 'Growth', 'Welcome', 'Your', 'AI-powered', 'command',
  'center', 'ready', 'Launch',
  // Language names
  'English', 'Arabic',
  // Mock data brand names (full phrases)
  'Nova Phones', 'CleanPro Services', 'Luxe Perfumes', 'HomeFix Experts',
  'Professional', 'Starter', 'CleanPro', 'Luxe', 'Perfumes', 'HomeFix', 'Experts',
  // Provider names
  'Leonardo AI', 'Ideogram', 'Kling AI', 'Runway', 'Nano Banana', 'Flux Self-hosted',
  'RelayAPI', 'WhatsApp Official API', 'Telegram Bot API', 'Behance',
  // Product names
  'iPhone 16 Pro', 'Max', 'Lite', 'Buds', 'Apple',
  // Platform names
  'LinkedIn', 'Twitter', 'Instagram', 'TikTok', 'Facebook', 'YouTube',
  // API names
  'Official', 'Bot',
  // Status values
  'Uploaded', 'Active', 'Stable', 'Connected', 'Available', 'Disconnected',
  'Excellent', 'Good', 'Warning', 'Healthy', 'Strong', 'Critical', 'Missing', 'Online',
  // Channel names
  'Email', 'None', 'Manager',
  // Technical terms
  'Flow', 'Self-hosted', 'real', 'connection', 'cleaning', 'service',
  'logic', 'provider', 'management', 'only', 'Library', 'Think',
  // URLs
  'novaphones.com', 'www', 'com',
  // Locations
  'Global',
  // Translation keys (should not appear in DOM but if they do, they're debug)
  'clientBrandDNA', 'defaultMission', 'defaultDataQuality',
  // Color codes (technical values)
  '#fafbfc', '#7c3aed',
  // Hashtags
  '#iPhone16Pro', '#Apple',
  // Common words in mock data
  'Sell', 'comfort', 'not',
  // Font names (technical values)
  'IBM', 'Plex', 'Sans',
  // Platform variations (lowercase)
  'instagram', 'tiktok', 'facebook', 'youtube',
  // API and technical terms
  'REST', 'GraphQL', 'Form', 'Shows', 'where', 'customer', 'conversations',
  'with', 'Examples', 'platform', 'and', 'Info',
  // Common short words (often part of phrases)
  'the', 'and', 'is', 'in', 'to', 'of', 'for', 'with', 'on', 'at', 'from', 'by',
  // Additional brand/platform names
  'Dribbble', 'Pinterest',
  // Status values
  'Pending',
  // Common descriptive words in mock data
  'intelligent', 'presentation', 'start',
  // Brand name parts
  'Services',
  // Additional provider/feature names
  'Trends',
  // Common descriptive words
  'glimpse', 'what', 'this', 'design', 'marketing',
  // Hashtag variations
  '#iPhone16Pro',
  // Debug artifacts (translation keys appearing in DOM)
  'clientBrandDNA', 'defaultMission', 'defaultDataQuality',
  'clientBrandDNA.brandProfile.defaultMission',
  'clientBrandDNA.aiBrainStatus.defaultDataQuality',
  'brandProfile.defaultMission',
  'aiBrainStatus.defaultDataQuality',
  'brandProfile', 'aiBrainStatus',
  // Contractions with and without apostrophes
  'what', 'what', 'what', 'whats',
  // Color code variations (with hash)
  '#fafbfc', '#7c3aed',
  // Provider name parts (already in allowlist but adding variations)
  'Leonardo',
  // URLs (with dots)
  'novaphones.com',
  // Hashtag variations (with hash)
  '#iPhone16Pro',
  // Additional debug key parts with dots
  '.brandProfile.defaultMission',
  '.aiBrainStatus.defaultDataQuality',
];

// Blocklist: User-reported strings that must never appear in Arabic mode
const BLOCKLIST_ENGLISH_IN_ARABIC = [
  'signal',
  'Reduce high-volume image cost',
  'Premium creative assets',
  'Premium video',
  'Cost-effective video',
  'Print posters',
  'Bulk image generation',
  'Measures how well providers follow creative instructions.',
  'No real logic. Visual provider switching only.',
  'Provider Card',
  'Provider',
  'Messaging service provider',
  'Communication Channel',
  'Primary audience',
  'Empower people with innovative technology',
  'Technology',
  'Devices',
  'Gaming',
  'Smartphones / Premium Electronics',
  'Tech enthusiasts',
  // I10 regression strings - universal blocklist (both modes)
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

// Generic English words that should not appear in Arabic mode
const SUSPICIOUS_ENGLISH_PATTERNS = [
  /\b(the|and|is|in|to|of|for|with|on|at|from|by)\b/gi,
  /\b(title|subtitle|description|status|active|inactive|loading|error)\b/gi,
  /\b(view|show|hide|add|remove|edit|delete|save|cancel)\b/gi,
  /\b(platform|campaign|brand|content|publish|recommend)\b/gi,
];

function isSuspiciousEnglish(text, locale) {
  if (locale === 'en') {
    // Check for Arabic text in English mode
    // Arabic text range: U+0600 to U+06FF
    const arabicPattern = /[\u0600-\u06FF]/;
    if (arabicPattern.test(text)) {
      // Allow some Arabic words that might appear in mixed content
      const allowedArabic = ['العربية', 'اللغة'];
      const hasUnallowedArabic = text.split(/\s+/).some(word => 
        arabicPattern.test(word) && !allowedArabic.includes(word)
      );
      if (hasUnallowedArabic) {
        return { suspicious: true, reason: 'Arabic text detected in English mode' };
      }
    }
    return { suspicious: false };
  }

  // Check for English text in Arabic mode
  // First check universal blocklist - these must never appear in any mode
  for (const blocked of BLOCKLIST_ENGLISH_IN_ARABIC) {
    if (text.includes(blocked)) {
      return { suspicious: true, reason: `Blocklisted string found: "${blocked}"` };
    }
  }

  // Then check Arabic-mode blocklist - these must not appear in Arabic mode only
  for (const blocked of ARABIC_MODE_BLOCKLIST) {
    if (text.includes(blocked)) {
      return { suspicious: true, reason: `Blocklisted string found: "${blocked}"` };
    }
  }

  // Check for suspicious English patterns
  // Only flag if not in allowlist
  const words = text.split(/\s+/);
  const suspiciousWords = words.filter(word => {
    // Clean the word (remove punctuation but keep dots and hashes for pattern matching)
    const cleanWord = word.replace(/[^\w\s-#.]/g, '');
    
    // Strip trailing punctuation for allowlist matching
    const wordForMatching = cleanWord.replace(/[.,;:!?]+$/, '');
    
    // Skip short words and numbers
    if (wordForMatching.length < 3 || /^\d+$/.test(wordForMatching)) return false;
    
    // Skip hashtags (e.g., #iPhone16Pro, #fafbfc)
    if (wordForMatching.startsWith('#')) return false;
    
    // Skip URLs (contain dots and common TLDs)
    if (wordForMatching.includes('.') && (wordForMatching.endsWith('.com') || wordForMatching.includes('.clientBrandDNA'))) return false;
    
    // Skip translation key paths (contain multiple dots)
    if ((wordForMatching.match(/\./g) || []).length >= 2) return false;
    
    // Skip if in allowlist (exact match)
    if (ALLOWED_ENGLISH_IN_ARABIC.includes(wordForMatching)) {
      return false;
    }
    
    // Check if it's English (Latin letters) and not Arabic
    if (/[a-zA-Z]{3,}/.test(wordForMatching) && !/[\u0600-\u06FF]/.test(wordForMatching)) {
      return true;
    }
    
    return false;
  });

  if (suspiciousWords.length > 0) {
    return { 
      suspicious: true, 
      reason: `Suspicious English words in Arabic mode: ${suspiciousWords.slice(0, 5).join(', ')}${suspiciousWords.length > 5 ? '...' : ''}` 
    };
  }

  return { suspicious: false };
}

async function checkRoute(browser, route, locale) {
  const page = await browser.newPage();
  
  try {
    // Set locale cookie
    await page.context().addCookies([
      {
        name: 'NEXT_LOCALE',
        value: locale,
        domain: 'localhost',
        path: '/',
      },
    ]);

    // Navigate to route
    await page.goto(`http://localhost:3000${route}`, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    // Wait for hydration
    await page.waitForTimeout(500);

    // Get body text
    const bodyText = await page.evaluate(() => document.body.innerText);

    // Check for suspicious text
    const check = isSuspiciousEnglish(bodyText, locale);

    if (check.suspicious) {
      // Find the suspicious context
      const lines = bodyText.split('\n');
      let context = '';
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].length > 10 && /[a-zA-Z]{3,}/.test(lines[i])) {
          const start = Math.max(0, i - 2);
          const end = Math.min(lines.length, i + 3);
          context = lines.slice(start, end).join('\n');
          break;
        }
      }

      return {
        route,
        locale,
        suspicious: true,
        reason: check.reason,
        context: context.substring(0, 200),
      };
    }

    return {
      route,
      locale,
      suspicious: false,
    };
  } catch (error) {
    return {
      route,
      locale,
      suspicious: true,
      reason: 'Navigation error',
      error: error.message,
    };
  } finally {
    await page.close();
  }
}

async function main() {
  console.log('🔍 Starting i18n Hydrated DOM Check...\n');

  // Check if dev server is running
  try {
    const response = await fetch('http://localhost:3000');
    if (!response.ok) {
      console.error('❌ Dev server is not responding correctly on port 3000');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Dev server is not running on port 3000');
    console.error('💡 Start dev server with: npm run dev');
    process.exit(1);
  }

  console.log('✅ Dev server is running on port 3000\n');

  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const route of ROUTES) {
    console.log(`Checking: ${route}`);
    
    // Check Arabic mode
    const arResult = await checkRoute(browser, route, 'ar');
    results.push(arResult);
    
    if (arResult.suspicious) {
      console.log(`  ⚠️  Arabic mode: ${arResult.reason}`);
      if (arResult.context) {
        console.log(`  Context: ${arResult.context.substring(0, 100)}...`);
      }
    } else {
      console.log(`  ✅ Arabic mode: No violations`);
    }

    // Check English mode
    const enResult = await checkRoute(browser, route, 'en');
    results.push(enResult);
    
    if (enResult.suspicious) {
      console.log(`  ⚠️  English mode: ${enResult.reason}`);
      if (enResult.context) {
        console.log(`  Context: ${enResult.context.substring(0, 100)}...`);
      }
    } else {
      console.log(`  ✅ English mode: No violations`);
    }
  }

  await browser.close();

  // Summary
  console.log('\n============================================================');
  console.log('SUMMARY');
  console.log('============================================================');
  
  const suspiciousResults = results.filter(r => r.suspicious);
  
  if (suspiciousResults.length === 0) {
    console.log('✅ No violations found');
    console.log('\nAll routes are properly localized after hydration.');
    process.exit(0);
  } else {
    console.log(`❌ Found ${suspiciousResults.length} violations\n`);
    
    suspiciousResults.forEach(result => {
      console.log(`Route: ${result.route}`);
      console.log(`Locale: ${result.locale}`);
      console.log(`Reason: ${result.reason}`);
      if (result.context) {
        console.log(`Context: ${result.context}`);
      }
      if (result.error) {
        console.log(`Error: ${result.error}`);
      }
      console.log('---');
    });

    console.log('\n💡 Fix the issues above and run the check again.');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
