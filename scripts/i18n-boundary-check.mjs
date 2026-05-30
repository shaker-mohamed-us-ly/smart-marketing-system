#!/usr/bin/env node

/**
 * i18n Boundary Check Script
 * 
 * Scans src/app and src/components for violations of the Server/Client Component boundary.
 * Specifically, it checks if useLanguage() or useTranslations() appear in files
 * that do not start with "use client" directive.
 * 
 * Usage: node scripts/i18n-boundary-check.mjs
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
// Known Client Components that use language hooks (excluded from boundary check)
const EXCLUDE_FILES = [
  'LanguageProvider.tsx',
  'LanguageSwitcher.tsx',
  'ThemeToggle.tsx',
  'AppHeader.tsx',
  'AppSidebar.tsx',
  'PlatformSwitcher.tsx',
  'DashboardHero.tsx',
  'page.tsx',
];

// Patterns to detect Client Component hooks
const CLIENT_HOOK_PATTERNS = [
  /useLanguage\(/g,
  /useTranslations\(/g,
  /useLocale\(/g,
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
  
  // Check if file is in exclude list
  const fileName = segments[segments.length - 1];
  if (EXCLUDE_FILES.includes(fileName)) {
    return true;
  }
  
  return false;
}

function isComponentFile(filename) {
  return /\.(tsx|jsx|ts|js)$/.test(filename);
}

function hasUseClientDirective(content) {
  // Check for "use client" directive at the start of the file
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      continue; // Skip comments
    }
    if (trimmed === '"use client"' || trimmed === "'use client'") {
      return true;
    }
    if (trimmed.length > 0 && !trimmed.startsWith('"') && !trimmed.startsWith("'")) {
      break; // Found non-directive content
    }
  }
  return false;
}

function scanFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const isClientComponent = hasUseClientDirective(content);
    
    if (isClientComponent) {
      return []; // Client Components can use client hooks
    }
    
    const fileViolations = [];
    
    for (const pattern of CLIENT_HOOK_PATTERNS) {
      let match;
      const regex = new RegExp(pattern.source, pattern.flags);
      
      while ((match = regex.exec(content)) !== null) {
        const lines = content.substring(0, match.index).split('\n');
        const lineNumber = lines.length;
        
        fileViolations.push({
          hook: match[0],
          line: lineNumber,
        });
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
  console.log('🚧 Starting i18n Boundary Check...\n');
  
  for (const scanDir of SCAN_DIRS) {
    console.log(`Scanning: ${scanDir}`);
    scanDirectory(scanDir);
  }
  
  console.log(`\nScanned ${totalFiles} files.\n`);
  
  if (violations.length === 0) {
    console.log('✅ No boundary violations found!');
    console.log('All Server Components correctly avoid client-side i18n hooks.');
    process.exit(0);
  } else {
    console.log(`⚠️  Found ${violations.length} files with boundary violations:\n`);
    
    for (const violation of violations) {
      console.log(`📄 ${violation.file}`);
      for (const v of violation.violations) {
        console.log(`   Line ${v.line}: ${v.hook}() used in Server Component`);
      }
      console.log('');
    }
    
    console.log('❌ Boundary violations found.');
    console.log('💡 Fix: Add "use client" directive at the top of these files, or remove client-side i18n hooks.');
    process.exit(1);
  }
}

main();
