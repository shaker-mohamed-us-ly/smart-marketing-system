#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log('🚀 I18N Page Generator\n');
  
  const platform = await question('Platform (client/control): ');
  const pageName = await question('Page name (kebab-case, e.g., my-page): ');
  const titleEn = await question('Page title (English): ');
  const titleAr = await question('Page title (Arabic): ');
  const subtitleEn = await question('Page subtitle (English, optional): ') || '';
  const subtitleAr = await question('Page subtitle (Arabic, optional): ') || '';
  
  const keyPrefix = platform === 'client' ? 'client' : 'control';
  const camelCaseName = pageName.split('-').map((word, i) => 
    i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
  ).join('');
  
  // Generate page file
  const pageDir = path.join(projectRoot, 'src/app', platform, pageName);
  const pageFile = path.join(pageDir, 'page.tsx');
  
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }
  
  const pageContent = `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shared/Card";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("${keyPrefix}${camelCaseName}.title"),
    description: t("${keyPrefix}${camelCaseName}.subtitle"),
  };
}

export default async function ${camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1)}Page() {
  const t = await getTranslations();

  const labels = {
    title: t("${keyPrefix}${camelCaseName}.title"),
    subtitle: t("${keyPrefix}${camelCaseName}.subtitle"),
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card variant="glass" className="max-w-lg w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold mb-2">{labels.title}</CardTitle>
          <CardDescription className="text-base">
            {labels.subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">
            Page content goes here
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
`;
  
  fs.writeFileSync(pageFile, pageContent);
  console.log(`✅ Created page: ${pageFile}`);
  
  // Update English translations
  const enFile = path.join(projectRoot, 'src/i18n/messages/en.ts');
  const enContent = fs.readFileSync(enFile, 'utf-8');
  
  const enKey = `  ${keyPrefix}${camelCaseName}: {
    title: "${titleEn}",
    subtitle: "${subtitleEn}",
  },`;
  
  // Find the end of the export default object
  const enLines = enContent.split('\n');
  let insertIndex = enLines.length - 1; // Before the closing brace
  
  for (let i = enLines.length - 1; i >= 0; i--) {
    if (enLines[i].trim() === '};') {
      insertIndex = i;
      break;
    }
  }
  
  enLines.splice(insertIndex, 0, enKey);
  fs.writeFileSync(enFile, enLines.join('\n'));
  console.log(`✅ Updated English translations: ${enFile}`);
  
  // Update Arabic translations
  const arFile = path.join(projectRoot, 'src/i18n/messages/ar.ts');
  const arContent = fs.readFileSync(arFile, 'utf-8');
  
  const arKey = `  ${keyPrefix}${camelCaseName}: {
    title: "${titleAr}",
    subtitle: "${subtitleAr}",
  },`;
  
  const arLines = arContent.split('\n');
  let arInsertIndex = arLines.length - 1;
  
  for (let i = arLines.length - 1; i >= 0; i--) {
    if (arLines[i].trim() === '};') {
      arInsertIndex = i;
      break;
    }
  }
  
  arLines.splice(arInsertIndex, 0, arKey);
  fs.writeFileSync(arFile, arLines.join('\n'));
  console.log(`✅ Updated Arabic translations: ${arFile}`);
  
  console.log('\n🎉 Page generated successfully!');
  console.log(`\nNext steps:`);
  console.log(`1. Review the page at: src/app/${platform}/${pageName}/page.tsx`);
  console.log(`2. Add page content and components`);
  console.log(`3. Run npm run i18n:visible to verify no visible English`);
  console.log(`4. Test in both English and Arabic modes`);
  
  rl.close();
}

main().catch(console.error);
