#!/usr/bin/env node

/**
 * i18n Arabic Quality Check Script
 * 
 * Scans src/i18n/messages/ar.ts for generic English UI words that should be translated.
 * This helps ensure Arabic translations are complete and not using English fallbacks.
 * 
 * Usage: node scripts/i18n-arabic-quality-check.mjs
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

// Configuration
const ARABIC_MESSAGES_FILE = join(__dirname, '..', 'src', 'i18n', 'messages', 'ar.ts');

// Allowed English terms (brand names, technical terms, etc.)
const ALLOWED_TERMS = new Set([
  // Brand names
  'WhatsApp', 'Instagram', 'TikTok', 'Facebook', 'Google', 'Meta', 'OpenAI',
  'Leonardo AI', 'Leonardo', 'Ideogram', 'Flux', 'Kling', 'Runway', 'Nano', 'Banana',
  // Technical terms
  'API', 'Next.js', 'React', 'Node', 'npm', 'npx', 'TypeScript', 'TS', 'JS', 'TSX',
  'IBM Plex Sans Arabic', 'Inter',
  // URLs and routes (will be filtered separately)
  'http', 'https', 'www', 'com', 'org', 'net',
  // Common allowed terms
  'DNA', 'DM', 'CTA', 'ROI', 'UX', 'UI', 'Reels', 'Ads',
  'AI', 'SSR', 'CSR', 'DOM', 'HTML', 'CSS', 'JSON', 'XML', 'SQL', 'HTTP', 'HTTPS',
]);

// Generic English UI words that should be translated to Arabic
const SUSPICIOUS_ENGLISH_WORDS = [
  'Title', 'Subtitle', 'Description', 'Label', 'Button', 'Link', 'Text',
  'Name', 'Email', 'Password', 'Username', 'Login', 'Logout', 'Sign',
  'Save', 'Cancel', 'Delete', 'Edit', 'Create', 'Update', 'Add', 'Remove',
  'Yes', 'No', 'OK', 'Confirm', 'Submit', 'Reset', 'Clear',
  'Search', 'Filter', 'Sort', 'View', 'Show', 'Hide',
  'Loading', 'Error', 'Warning', 'Success', 'Info',
  'Page', 'Dashboard', 'Settings', 'Profile', 'Account', 'Admin',
  'Active', 'Inactive', 'Enabled', 'Disabled', 'Online', 'Offline',
  'Total', 'Count', 'Amount', 'Price', 'Cost', 'Value',
  'Date', 'Time', 'Year', 'Month', 'Day', 'Hour', 'Minute',
  'List', 'Grid', 'Table', 'Card', 'Panel', 'Modal',
  'Menu', 'Navigation', 'Header', 'Footer', 'Sidebar',
  'Client', 'Server', 'Database', 'Network', 'System',
  'User', 'Admin', 'Guest', 'Member', 'Team',
  'Status', 'State', 'Type', 'Category', 'Tag',
  'Open', 'Close', 'Expand', 'Collapse',
  'Previous', 'Next', 'First', 'Last',
  'Increase', 'Decrease', 'Higher', 'Lower',
  'All', 'None', 'Any', 'Some',
  'Public', 'Private', 'Shared',
  'Read', 'Write', 'Execute',
  'Upload', 'Download', 'Import', 'Export',
  'Copy', 'Paste', 'Cut', 'Undo', 'Redo',
  'Bold', 'Italic', 'Underline',
  'Left', 'Right', 'Center', 'Justify',
  'Top', 'Bottom', 'Middle',
  'Small', 'Medium', 'Large',
  'Light', 'Dark', 'Theme',
  'Language', 'Locale', 'Region',
  'Currency', 'Symbol',
  'Phone', 'Address', 'City', 'Country',
  'Zip', 'Postal', 'Code',
  'Message', 'Notification', 'Alert',
  'File', 'Folder', 'Directory',
  'Image', 'Video', 'Audio', 'Document',
  'Format', 'Size', 'Quality',
  'Version', 'Build', 'Release',
  'Feature', 'Option', 'Preference',
  'History', 'Log', 'Record',
  'Backup', 'Restore', 'Archive',
  'Security', 'Privacy', 'Policy',
  'Terms', 'Conditions', 'Agreement',
  'License', 'Copyright', 'Trademark',
  'Support', 'Help', 'FAQ',
  'Contact', 'About', 'Home',
];

function extractStringValues(obj, prefix = '') {
  const results = [];
  
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      results.push(...extractStringValues(obj[key], fullKey));
    } else if (typeof obj[key] === 'string') {
      results.push({
        key: fullKey,
        value: obj[key],
      });
    }
  }
  
  return results;
}

function isEnglishWord(word) {
  // Check if word contains mostly Latin characters
  const latinChars = word.match(/[a-zA-Z]/g);
  if (!latinChars) return false;
  
  const latinRatio = latinChars.length / word.length;
  return latinRatio > 0.5;
}

function containsSuspiciousEnglish(text) {
  const words = text.split(/\s+/);
  
  for (const word of words) {
    const cleanWord = word.replace(/[^\w]/g, '');
    
    // Skip if it's an allowed term
    if (ALLOWED_TERMS.has(cleanWord) || ALLOWED_TERMS.has(word)) {
      continue;
    }
    
    // Skip if it's a URL
    if (word.startsWith('http') || word.includes('://') || word.includes('/')) {
      continue;
    }
    
    // Skip if it's a route path
    if (word.startsWith('/') || word.includes('{') || word.includes('}')) {
      continue;
    }
    
    // Skip very short words (likely abbreviations)
    if (cleanWord.length <= 2) {
      continue;
    }
    
    // Check if it's an English word
    if (isEnglishWord(cleanWord)) {
      // Check if it's a suspicious UI word
      for (const suspicious of SUSPICIOUS_ENGLISH_WORDS) {
        if (cleanWord.toLowerCase() === suspicious.toLowerCase()) {
          return true;
        }
      }
    }
  }
  
  return false;
}

function main() {
  console.log('🔍 Starting Arabic Quality Check...\n');
  
  try {
    const content = readFileSync(ARABIC_MESSAGES_FILE, 'utf-8');
    
    // Simple approach: scan for string literals and check for suspicious English
    const lines = content.split('\n');
    const issues = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Match string literals: "text" or 'text'
      const stringMatches = line.match(/["']([^"']+)["']/g);
      if (!stringMatches) continue;
      
      for (const match of stringMatches) {
        const value = match.slice(1, -1); // Remove quotes
        
        // Skip if it's a key name (before colon)
        const colonIndex = line.indexOf(':');
        const matchIndex = line.indexOf(match);
        if (colonIndex !== -1 && matchIndex < colonIndex) continue;
        
        // Skip if it's a type annotation
        if (line.includes(': string') || line.includes(': number') || line.includes(': boolean')) continue;
        
        // Check for suspicious English
        if (containsSuspiciousEnglish(value)) {
          issues.push({
            line: i + 1,
            value,
          });
        }
      }
    }
    
    if (issues.length === 0) {
      console.log('✅ No suspicious English words found in Arabic translations!');
      console.log('All translations appear to be properly localized.');
      process.exit(0);
    } else {
      console.log(`⚠️  Found ${issues.length} potential issues:\n`);
      
      for (const issue of issues) {
        console.log(`📄 Line ${issue.line}`);
        console.log(`   Value: "${issue.value}"`);
        console.log('');
      }
      
      console.log('💡 Review these translations and ensure they are properly localized to Arabic.');
      console.log('ℹ️  Some English may be intentional (brand names, technical terms).');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
