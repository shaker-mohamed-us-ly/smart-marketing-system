#!/usr/bin/env node

/**
 * i18n Keys Check Script
 * 
 * Validates that all translation keys used in code exist in both ar.ts and en.ts message files.
 * This helps catch missing translations that would cause fallback to key names.
 * 
 * Usage: node scripts/i18n-keys-check.mjs
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

// Configuration
const SRC_DIR = join(__dirname, '..');
const MESSAGES_DIR = join(SRC_DIR, 'src', 'i18n', 'messages');
const EXCLUDE_DIRS = ['node_modules', '.next', 'dist', 'build', '.git'];

// Load and parse message files safely without eval
// Note: This parser has known limitations with complex TypeScript syntax
function loadMessageFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    
    // Find the object pattern: either "const en = {" or "export default {"
    const constMatch = content.match(/const\s+\w+\s*=\s*\{/);
    const exportDefaultMatch = content.match(/export default\s*\{/);
    
    let startIndex = -1;
    
    if (constMatch) {
      startIndex = constMatch.index + constMatch[0].length - 1; // Include the {
    } else if (exportDefaultMatch) {
      startIndex = exportDefaultMatch.index + exportDefaultMatch[0].length - 1; // Include the {
    } else {
      console.error(`Could not find object pattern in ${filePath}`);
      return {};
    }
    
    if (startIndex === -1) {
      console.error(`Could not find opening brace in ${filePath}`);
      return {};
    }
    
    // Match braces to find the complete object
    let braceCount = 1; // Start with 1 since we're at the opening brace
    let endIndex = startIndex;
    
    for (let i = startIndex + 1; i < content.length; i++) {
      if (content[i] === '{') braceCount++;
      if (content[i] === '}') braceCount--;
      if (braceCount === 0) {
        endIndex = i + 1;
        break;
      }
    }
    
    const objectString = content.substring(startIndex, endIndex);
    
    // Parse the object string safely by converting to JSON-like format
    // Remove TypeScript type annotations
    const cleanString = objectString
      .replace(/:\s*string/g, '')
      .replace(/:\s*number/g, '')
      .replace(/:\s*boolean/g, '')
      .replace(/:\s*{[^}]+}/g, '')
      // Remove trailing commas
      .replace(/,(\s*[}\]])/g, '$1')
      // Remove comments
      .replace(/\/\/.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Use Function constructor as a safer alternative to eval
    try {
      const parseFn = new Function(`return ${cleanString};`);
      return parseFn();
    } catch (parseError) {
      console.error(`Error parsing object from ${filePath}:`, parseError.message);
      // Fallback: try to parse as JSON
      try {
        return JSON.parse(cleanString);
      } catch (jsonError) {
        console.error(`JSON parse also failed for ${filePath}:`, jsonError.message);
        return {};
      }
    }
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error.message);
    return {};
  }
}

const arMessages = loadMessageFile(join(MESSAGES_DIR, 'ar.ts'));
const enMessages = loadMessageFile(join(MESSAGES_DIR, 'en.ts'));

// Extract all keys from a nested object
function extractKeys(obj, prefix = '') {
  const keys = [];
  
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys.push(...extractKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}

const arKeys = new Set(extractKeys(arMessages));
const enKeys = new Set(extractKeys(enMessages));

// Find keys present in one but not the other
const missingInAr = [...enKeys].filter(k => !arKeys.has(k));
const missingInEn = [...arKeys].filter(k => !enKeys.has(k));

// Patterns to find t() calls in code
const T_CALL_PATTERNS = [
  /t\(["']([^"']+)["']\)/g,
  /t\(`([^`]+)`\)/g,
  /t\(["']([^"']+)["']/g,
];

let totalFiles = 0;
let filesWithTCalls = 0;
const usedKeys = new Set();

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

function scanFileForTCalls(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const foundKeys = [];
    
    for (const pattern of T_CALL_PATTERNS) {
      let match;
      const regex = new RegExp(pattern.source, pattern.flags);
      
      while ((match = regex.exec(content)) !== null) {
        const key = match[1];
        if (key && !key.includes('${')) { // Skip template literals with interpolation
          foundKeys.push(key);
          usedKeys.add(key);
        }
      }
    }
    
    return foundKeys;
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
        const keys = scanFileForTCalls(fullPath);
        
        if (keys.length > 0) {
          filesWithTCalls++;
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message);
  }
}

function main() {
  console.log('🔑 Starting i18n Keys Check...\n');
  
  // Check if parsing succeeded
  if (Object.keys(arMessages).length === 0) {
    console.error('❌ Failed to parse Arabic message file. Parser may have limitations.');
    console.log('ℹ️  This check has known parser limitations. Manual verification recommended.');
    process.exit(1);
  }
  
  if (Object.keys(enMessages).length === 0) {
    console.error('❌ Failed to parse English message file. Parser may have limitations.');
    console.log('ℹ️  This check has known parser limitations. Manual verification recommended.');
    process.exit(1);
  }
  
  // Compare message files
  console.log('Comparing translation keys between ar.ts and en.ts...');
  console.log(`Arabic keys: ${arKeys.size}`);
  console.log(`English keys: ${enKeys.size}\n`);
  
  const missingInAr = [...enKeys].filter(k => !arKeys.has(k));
  const missingInEn = [...arKeys].filter(k => !enKeys.has(k));
  
  if (missingInAr.length > 0) {
    console.log(`⚠️  Keys missing in Arabic (${missingInAr.length}):`);
    missingInAr.forEach(key => console.log(`   - ${key}`));
    console.log('');
  }
  
  if (missingInEn.length > 0) {
    console.log(`⚠️  Keys missing in English (${missingInEn.length}):`);
    missingInEn.forEach(key => console.log(`   - ${key}`));
    console.log('');
  }
  
  // Scan source code for t() calls
  console.log('Scanning source code for t() calls...');
  scanDirectory(SRC_DIR);
  console.log(`Scanned ${totalFiles} files, found t() calls in ${filesWithTCalls} files.\n`);
  
  // Check if used keys exist in message files
  const missingKeys = [...usedKeys].filter(k => !arKeys.has(k) || !enKeys.has(k));
  if (missingKeys.length > 0) {
    console.log(`⚠️  Keys used in code but missing from message files (${missingKeys.length}):`);
    missingKeys.forEach(key => console.log(`   - ${key}`));
    console.log('');
  }
  
  if (missingInAr.length === 0 && missingInEn.length === 0 && missingKeys.length === 0) {
    console.log('✅ All translation keys are consistent!');
    process.exit(0);
  } else {
    console.log('❌ Translation key inconsistencies found.');
    console.log('ℹ️  Note: This parser has known limitations. Manual verification recommended for accuracy.');
    process.exit(1);
  }
}

main();
