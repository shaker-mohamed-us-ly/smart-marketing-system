#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Allowed English terms (proper nouns, technical terms, provider names)
const ALLOWED_TERMS = new Set([
  'WhatsApp', 'Instagram', 'TikTok', 'Facebook', 'Google', 'Meta',
  'OpenAI', 'Leonardo', 'Ideogram', 'API', 'Next.js',
  'IBM', 'Plex', 'Sans', 'Arabic', 'Inter',
  'http', 'https', 'www', 'com', 'org', 'io', 'ai',
  'lucide', 'react', 'node', 'npm', 'npx',
  'Flux', 'Kling', 'Runway', 'Nano', 'Banana', 'DM', 'CTA',
  'ROI', 'UX', 'UI', 'Reels', 'Ads', 'DNA',
]);

// Common technical patterns to ignore
const IGNORE_PATTERNS = [
  /^https?:\/\//,           // URLs
  /^\/[a-z-]+$/,            // Route paths
  /^[a-z]+-[a-z]+$/,        // kebab-case technical IDs
  /^[A-Z][a-z]+$/,          // Single word proper nouns (likely icons)
  /^className$/,           // React prop
  /^class$/,                // HTML attribute
  /^id$/,                   // HTML attribute
  /^key$/,                  // React prop
  /^href$/,                 // HTML attribute
  /^src$/,                  // HTML attribute
  /^alt$/,                  // HTML attribute
  /^aria-[a-z-]+$/,         // ARIA attributes
  /^data-[a-z-]+$/,         // Data attributes
  /^on[A-Z][a-z]+$/,        // Event handlers
  /^[a-z]+\.[a-z]+$/,       // Property access (e.g., t.name)
  /^\d+$/,                  // Numbers
  /^\d+\.\d+$/,             // Decimals
  /^\$[\d,]+$/,             // Currency
  /^%$/,                    // Percent
  /^px$/,                   // CSS units
  /^rem$/,                  // CSS units
  /^em$/,                   // CSS units
  /^vh$/,                   // CSS units
  /^vw$/,                   // CSS units
  /^rgba?\([^)]+\)$/,       // CSS colors
  /^#[0-9a-fA-F]{3,8}$/,    // Hex colors
  /^[A-Z_]+$/,              // Constants (likely technical)
];

// Suspicious array/object names that likely contain visible data
const SUSPICIOUS_NAMES = new Set([
  'items', 'cards', 'metrics', 'options', 'stages', 'strategies',
  'campaigns', 'recommendations', 'directors', 'providers', 'alerts',
  'directors', 'concepts', 'actions', 'factors', 'models', 'types',
  'quickActions', 'campaignTypes', 'assetDirections', 'strategies',
  'factors', 'options', 'modes', 'stages', 'examples',
]);

// Fallback patterns
const FALLBACK_PATTERNS = [
  /\?\?\s*["'`]([^"'`]+)["'`]/,   // ?? "fallback"
  /\|\|\s*["'`]([^"'`]+)["'`]/,   // || "fallback"
  /:\s*["'`]([^"'`]+)["'`]/,      // : "fallback" in defaults
];

// English words that are likely UI labels (not proper nouns)
const SUSPICIOUS_ENGLISH_WORDS = new Set([
  'Dashboard', 'Campaign', 'Analytics', 'Recommendation', 'Performance',
  'Engagement', 'Conversion', 'Audience', 'Revenue', 'Status', 'Ready',
  'Active', 'Complete', 'Completed', 'Pending', 'Excellent', 'Good',
  'Healthy', 'Warning', 'Critical', 'Connected', 'Online', 'Stable',
  'Thinking', 'Report', 'Export', 'Generate', 'Open', 'Settings',
  'Platform', 'Provider', 'Quality', 'Speed', 'Director', 'Brain',
  'Learning', 'Monitoring', 'Billing', 'Backup', 'Overview', 'System',
  'Client', 'Control', 'Brand', 'Content', 'Studio', 'Publishing',
  'Service', 'Product', 'Hybrid', 'Smart', 'Manual', 'Urgent',
  'Schedule', 'Launch', 'Create', 'Save', 'Delete', 'Edit', 'View',
  'Add', 'Remove', 'Update', 'Submit', 'Cancel', 'Confirm', 'Apply',
  'Title', 'Subtitle', 'Description', 'Name', 'Email', 'Phone',
  'Address', 'Date', 'Time', 'Price', 'Cost', 'Value', 'Score',
  'Rate', 'Ratio', 'Index', 'Level', 'Grade', 'Rank', 'Position',
  'Type', 'Category', 'Class', 'Group', 'Team', 'User', 'Admin',
  'Role', 'Permission', 'Access', 'Login', 'Logout', 'Register',
  'Sign', 'Up', 'In', 'Out', 'On', 'Off', 'Yes', 'No', 'True', 'False',
  'Enable', 'Disable', 'Activate', 'Deactivate', 'Start', 'Stop', 'Pause',
  'Resume', 'Continue', 'Finish', 'End', 'Begin', 'Proceed', 'Back',
  'Next', 'Previous', 'First', 'Last', 'Page', 'Page', 'of',
  'Search', 'Filter', 'Sort', 'Order', 'Group', 'Arrange', 'Organize',
  'List', 'Grid', 'Table', 'Chart', 'Graph', 'Map', 'Calendar',
  'Timeline', 'History', 'Log', 'Record', 'Archive', 'Trash', 'Bin',
  'Folder', 'File', 'Document', 'Image', 'Video', 'Audio', 'Media',
  'Link', 'Url', 'Path', 'Route', 'Destination', 'Source', 'Target',
  'From', 'To', 'By', 'With', 'For', 'At', 'In', 'On', 'Over', 'Under',
  'Before', 'After', 'Between', 'During', 'Since', 'Until', 'While',
  'When', 'Where', 'Why', 'How', 'What', 'Which', 'Who', 'Whose',
  'This', 'That', 'These', 'Those', 'It', 'Its', 'They', 'Their',
  'The', 'A', 'An', 'And', 'Or', 'But', 'If', 'Then', 'Else', 'When',
  'Because', 'Although', 'Though', 'However', 'Therefore', 'Thus',
  'Also', 'Too', 'Very', 'Quite', 'Rather', 'Somewhat', 'Almost',
  'About', 'Above', 'Across', 'After', 'Against', 'Along', 'Among',
  'Around', 'As', 'At', 'Before', 'Behind', 'Below', 'Beneath',
  'Beside', 'Between', 'Beyond', 'By', 'Down', 'During', 'Except',
  'For', 'From', 'In', 'Inside', 'Into', 'Like', 'Near', 'Of',
  'Off', 'On', 'Onto', 'Out', 'Outside', 'Over', 'Past', 'Since',
  'Through', 'Throughout', 'To', 'Toward', 'Under', 'Underneath',
  'Until', 'Up', 'Upon', 'With', 'Within', 'Without',
]);

// Directories to scan
const SCAN_DIRS = [
  path.join(projectRoot, 'src/app/client'),
  path.join(projectRoot, 'src/app/control'),
  path.join(projectRoot, 'src/components/client'),
  path.join(projectRoot, 'src/components/control'),
  path.join(projectRoot, 'src/components/layout'),
  path.join(projectRoot, 'src/components/shared'),
];

// File extensions to scan
const SCAN_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

function isAllowedTerm(text) {
  // Check if any allowed term is in the text
  for (const term of ALLOWED_TERMS) {
    if (text.includes(term)) {
      // If the text is just the allowed term or contains it as part of a proper noun
      const parts = text.split(/\s+/);
      if (parts.length === 1 && parts[0] === term) return true;
      if (parts.some(p => p === term)) {
        // Check if other parts are also allowed
        const otherParts = parts.filter(p => p !== term);
        if (otherParts.length === 0) return true;
        if (otherParts.every(p => ALLOWED_TERMS.has(p))) return true;
      }
    }
  }
  return false;
}

function shouldIgnore(text) {
  // Check ignore patterns
  for (const pattern of IGNORE_PATTERNS) {
    if (pattern.test(text)) return true;
  }
  
  // Check if it's an allowed term
  if (isAllowedTerm(text)) return true;
  
  // Check if it's purely numeric or currency
  if (/^[\d\s\.,%$€£¥]+$/.test(text)) return true;
  
  // Check if it's a single word that's likely a technical constant
  if (/^[A-Z_]{2,}$/.test(text)) return true;
  
  return false;
}

function containsSuspiciousEnglish(text) {
  // Check if text contains suspicious English words
  const words = text.split(/\s+/);
  for (const word of words) {
    // Clean the word
    const cleanWord = word.replace(/[^a-zA-Z]/g, '');
    if (cleanWord.length >= 3 && SUSPICIOUS_ENGLISH_WORDS.has(cleanWord)) {
      return true;
    }
  }
  return false;
}

function extractStringsFromCode(content) {
  const results = [];
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNumber = i + 1;
    
    // Match string literals (single and double quotes, backticks)
    const stringMatches = line.matchAll(/(["'`])(?:(?!\1)[^\\]|\\.)*\1/g);
    
    for (const match of stringMatches) {
      const quote = match[1];
      const stringContent = match[0].slice(1, -1); // Remove quotes
      
      // Skip empty strings
      if (!stringContent.trim()) continue;
      
      // Skip if should be ignored
      if (shouldIgnore(stringContent)) continue;
      
      // Skip if it's a CSS class or technical ID
      if (/^[a-z][a-z0-9-]*([A-Z][a-z0-9-]*)*$/.test(stringContent) && stringContent.length < 30) {
        continue;
      }
      
      // Check if it contains suspicious English
      if (containsSuspiciousEnglish(stringContent)) {
        results.push({
          line: lineNumber,
          text: stringContent,
          context: line.trim().substring(0, 100),
        });
      }
      
      // Check if it's a fallback pattern
      for (const pattern of FALLBACK_PATTERNS) {
        const fallbackMatch = stringContent.match(pattern);
        if (fallbackMatch && fallbackMatch[1]) {
          const fallbackText = fallbackMatch[1];
          if (!shouldIgnore(fallbackText) && containsSuspiciousEnglish(fallbackText)) {
            results.push({
              line: lineNumber,
              text: fallbackText,
              context: line.trim().substring(0, 100),
              type: 'fallback',
            });
          }
        }
      }
    }
  }
  
  return results;
}

function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const strings = extractStringsFromCode(content);
    
    if (strings.length > 0) {
      return {
        file: filePath,
        strings,
      };
    }
  } catch (error) {
    // Skip files that can't be read
  }
  
  return null;
}

function scanDirectory(dirPath) {
  const results = [];
  
  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules and .next
        if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') {
          continue;
        }
        walk(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (SCAN_EXTENSIONS.includes(ext)) {
          const result = scanFile(fullPath);
          if (result) {
            results.push(result);
          }
        }
      }
    }
  }
  
  walk(dirPath);
  return results;
}

function main() {
  console.log('🔍 Starting Visible English Scan...\n');
  
  const allResults = [];
  
  for (const dir of SCAN_DIRS) {
    if (!fs.existsSync(dir)) {
      console.log(`⚠️  Directory not found: ${dir}`);
      continue;
    }
    
    console.log(`📂 Scanning: ${dir}`);
    const results = scanDirectory(dir);
    allResults.push(...results);
  }
  
  if (allResults.length === 0) {
    console.log('\n✅ No visible English strings found in scanned directories.');
    process.exit(0);
  }
  
  console.log(`\n📊 Found ${allResults.length} files with suspicious visible English strings:\n`);
  
  let totalStrings = 0;
  for (const result of allResults) {
    const relativePath = path.relative(projectRoot, result.file);
    console.log(`📄 ${relativePath}`);
    
    for (const str of result.strings) {
      totalStrings++;
      const typeLabel = str.type ? `[${str.type}]` : '';
      console.log(`   Line ${str.line}: ${typeLabel} "${str.text}"`);
      console.log(`   Context: ${str.context}`);
      console.log('');
    }
  }
  
  console.log(`\n📈 Summary:`);
  console.log(`   Files with visible English: ${allResults.length}`);
  console.log(`   Total strings: ${totalStrings}`);
  
  process.exit(1);
}

main();
