#!/usr/bin/env node

/**
 * i18n Key Leak Check Script
 * 
 * Detects raw translation keys that may appear in UI or component fallbacks.
 * Scans for suspicious dotted i18n key patterns that could leak into the UI.
 * 
 * Usage: node scripts/i18n-key-leak-check.mjs
 * Usage with strict mode: node scripts/i18n-key-leak-check.mjs --strict
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

// Configuration
const SRC_DIR = join(__dirname, '..');
const SCAN_DIRS = [
  join(SRC_DIR, 'src', 'app'),
  join(SRC_DIR, 'src', 'components'),
];
const EXCLUDE_DIRS = ['node_modules', '.next', 'dist', 'build', '.git'];

// Suspicious i18n key patterns (dotted paths that should not appear as raw strings)
const SUSPICIOUS_KEY_PATTERNS = [
  // Common prefixes
  /^common\./,
  /^clientDashboard\./,
  /^clientCampaigns\./,
  /^clientAnalytics\./,
  /^clientBrandDNA\./,
  /^clientContentStudio\./,
  /^clientPublishing\./,
  /^clientRecommendations\./,
  /^clientSettings\./,
  /^controlOverview\./,
  /^controlAIBrain\./,
  /^controlIntegrations\./,
  /^controlMonitoring\./,
  /^controlBilling\./,
  /^controlClients\./,
  /^controlBackup\./,
  /^controlSystemSettings\./,
  /^controlLearningCenter\./,
  /^designSystem\./,
  // Generic patterns
  /^[a-z][a-zA-Z0-9]*\.[a-z][a-zA-Z0-9]*\.[a-z][a-zA-Z0-9]*/, // something.something.something
  /^[a-z][a-zA-Z0-9]*\.[a-z][a-zA-Z0-9]*$/, // something.something
];

// Ignore patterns (these are legitimate uses)
const IGNORE_PATTERNS = [
  /t\(["'].*["']\)/, // t("key") calls
  /getTranslations\(["'].*["']\)/, // getTranslations("key") calls
  /import.*from.*["'].*["']/, // import statements
  /\/\/.*$/, // comments
  /\/\*[\s\S]*?\*\//, // block comments
  /["']\/.*["']/, // route paths
  /["']https?:\/\/.*["']/, // URLs
  /["'][a-zA-Z0-9-]+\.[a-zA-Z]{2,}["']/, // domain names like "novaphones.com"
];

let totalFiles = 0;
let violations = [];

function shouldExclude(path) {
  const relativePath = relative(SRC_DIR, path);
  const segments = relativePath.split(/[/\\]/);
  
  for (const segment of segments) {
    if (EXCLUDE_DIRS.includes(segment)) {
      return true;
    }
  }
  
  return false;
}

function isComponentFile(filename) {
  return /\.(tsx|jsx|ts|js)$/.test(filename);
}

function scanFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const fileViolations = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNumber = i + 1;
      
      // Skip if line matches ignore patterns
      let shouldSkip = false;
      for (const pattern of IGNORE_PATTERNS) {
        if (pattern.test(line)) {
          shouldSkip = true;
          break;
        }
      }
      if (shouldSkip) continue;
      
      // Extract string literals from the line
      const stringMatches = line.match(/["']([^"']+)["']/g);
      if (!stringMatches) continue;
      
      for (const match of stringMatches) {
        const value = match.slice(1, -1); // Remove quotes
        
        // Check if it matches suspicious key patterns
        for (const pattern of SUSPICIOUS_KEY_PATTERNS) {
          if (pattern.test(value)) {
            fileViolations.push({
              line: lineNumber,
              value,
            });
            break;
          }
        }
      }
    }
    
    return fileViolations;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return [];
  }
}

function scanDirectory(dir) {
  try {
    const entries = readdirSync(dir);
    
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      
      if (shouldExclude(fullPath)) {
        continue;
      }
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (stat.isFile() && isComponentFile(entry)) {
        totalFiles++;
        const fileViolations = scanFile(fullPath);
        
        if (fileViolations.length > 0) {
          violations.push({
            file: relative(SRC_DIR, fullPath),
            violations: fileViolations,
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message);
  }
}

function main() {
  console.log('🔍 Starting i18n Key Leak Check...\n');
  
  for (const scanDir of SCAN_DIRS) {
    console.log(`Scanning: ${scanDir}`);
    scanDirectory(scanDir);
  }
  
  console.log(`\nScanned ${totalFiles} files.\n`);
  
  if (violations.length === 0) {
    console.log('✅ No raw i18n key leaks found!');
    console.log('All translation keys are properly wrapped in t() calls.');
    process.exit(0);
  } else {
    console.log(`⚠️  Found ${violations.length} files with potential key leaks:\n`);
    
    for (const violation of violations) {
      console.log(`📄 ${violation.file}`);
      for (const v of violation.violations) {
        console.log(`   Line ${v.line}: "${v.value}"`);
      }
      console.log('');
    }
    
    console.log('❌ Raw i18n key leaks detected.');
    console.log('💡 Fix: Wrap these keys in t() calls or verify they are not visible in the UI.');
    process.exit(1);
  }
}

main();
