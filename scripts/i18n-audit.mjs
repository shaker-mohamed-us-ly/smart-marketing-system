#!/usr/bin/env node

/**
 * i18n Audit Script
 * 
 * Scans component files for hardcoded English text that should be internationalized.
 * This helps catch UI text that bypasses the translation system.
 * 
 * Usage: node scripts/i18n-audit.mjs
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

// Configuration
const SRC_DIR = join(__dirname, '..');
const EXCLUDE_DIRS = ['node_modules', '.next', 'dist', 'build', '.git'];
const EXCLUDE_FILES = ['i18n-audit.mjs', 'i18n-keys-check.mjs'];

// Patterns to detect hardcoded text
const HARDCODED_PATTERNS = [
  // JSX text content (not wrapped in {} or t())
  />\s*([A-Z][a-zA-Z\s]{4,})\s*</g,
  // Button labels, headings, etc.
  />([A-Z][a-zA-Z\s]{4,})</g,
  // Placeholder attributes
  /placeholder="([A-Z][a-zA-Z\s]{4,})"/g,
  // Title attributes
  /title="([A-Z][a-zA-Z\s]{4,})"/g,
  // aria-label attributes
  /aria-label="([A-Z][a-zA-Z\s]{4,})"/g,
];

// Patterns to exclude (false positives)
const EXCLUDE_PATTERNS = [
  // Component names (PascalCase)
  /<[A-Z][a-zA-Z]+/g,
  // CSS class names
  /className="[^"]*"/g,
  // File paths
  /["']\/?[\w\/\-\.]+["']/g,
  // URLs
  /https?:\/\/[^\s]+/g,
  // Common technical terms
  /\b(API|URL|HTML|CSS|JS|TS|JSON|XML|SQL|HTTP|HTTPS|DOM|SSR|CSR)\b/g,
  // Error messages that might be intentionally hardcoded
  /console\.(log|error|warn)\([^)]*\)/g,
  // throw statements
  /throw\s+new\s+Error\([^)]*\)/g,
];

let totalFiles = 0;
let filesWithIssues = 0;
let totalIssues = 0;

function shouldExclude(path) {
  const relativePath = relative(SRC_DIR, path);
  const segments = relativePath.split(/[/\\]/);
  
  // Check if any parent directory is in exclude list
  for (const segment of segments) {
    if (EXCLUDE_DIRS.includes(segment)) {
      return true;
    }
  }
  
  // Check if file is in exclude list
  if (EXCLUDE_FILES.includes(segments[segments.length - 1])) {
    return true;
  }
  
  return false;
}

function isComponentFile(filename) {
  return /\.(tsx|jsx|ts|js)$/.test(filename);
}

function scanFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const issues = [];
    
    for (const pattern of HARDCODED_PATTERNS) {
      let match;
      const regex = new RegExp(pattern.source, pattern.flags);
      
      while ((match = regex.exec(content)) !== null) {
        const text = match[1] || match[0];
        
        // Skip if matches exclusion patterns
        let isExcluded = false;
        for (const excludePattern of EXCLUDE_PATTERNS) {
          const excludeRegex = new RegExp(excludePattern.source, excludePattern.flags);
          if (excludeRegex.test(text)) {
            isExcluded = true;
            break;
          }
        }
        
        if (!isExcluded && text.length > 4) {
          // Get line number
          const lines = content.substring(0, match.index).split('\n');
          const lineNumber = lines.length;
          
          issues.push({
            text: text.trim(),
            line: lineNumber,
            pattern: pattern.source,
          });
        }
      }
    }
    
    return issues;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return [];
  }
}

function scanDirectory(dir) {
  const results = [];
  
  try {
    const entries = readdirSync(dir);
    
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      
      if (shouldExclude(fullPath)) {
        continue;
      }
      
      if (stat.isDirectory()) {
        results.push(...scanDirectory(fullPath));
      } else if (stat.isFile() && isComponentFile(entry)) {
        totalFiles++;
        const issues = scanFile(fullPath);
        
        if (issues.length > 0) {
          filesWithIssues++;
          totalIssues += issues.length;
          results.push({
            file: relative(SRC_DIR, fullPath),
            issues,
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message);
  }
  
  return results;
}

function main() {
  console.log('🔍 Starting i18n Audit...\n');
  console.log(`Scanning: ${SRC_DIR}\n`);
  
  const results = scanDirectory(SRC_DIR);
  
  if (results.length === 0) {
    console.log('✅ No hardcoded text issues found!');
    console.log(`\nScanned ${totalFiles} files.`);
  } else {
    console.log(`⚠️  Found ${totalIssues} potential hardcoded text issues in ${filesWithIssues} files:\n`);
    
    for (const result of results) {
      console.log(`📄 ${result.file}`);
      for (const issue of result.issues) {
        console.log(`   Line ${issue.line}: "${issue.text}"`);
      }
      console.log('');
    }
    
    console.log(`\nTotal files scanned: ${totalFiles}`);
    console.log(`Files with issues: ${filesWithIssues}`);
    console.log(`Total issues: ${totalIssues}`);
    console.log('\n💡 Tip: Review these files and replace hardcoded text with t() calls or dictionary keys.');
  }
}

main();
