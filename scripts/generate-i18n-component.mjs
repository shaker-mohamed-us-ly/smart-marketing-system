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
  console.log('🚀 I18N Component Generator\n');
  
  const platform = await question('Platform (client/control/shared): ');
  const category = await question('Category (e.g., dashboard, analytics, monitoring): ');
  const componentName = await question('Component name (PascalCase, e.g., MyComponent): ');
  const titleEn = await question('Component title/label (English): ');
  const titleAr = await question('Component title/label (Arabic): ');
  
  const keyPrefix = platform === 'shared' ? 'common' : platform;
  const camelCaseName = componentName.charAt(0).toLowerCase() + componentName.slice(1);
  
  // Generate component file
  const componentDir = path.join(projectRoot, 'src/components', platform, category);
  const componentFile = path.join(componentDir, `${componentName}.tsx`);
  
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }
  
  const componentContent = `import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";

export interface ${componentName}Props extends HTMLAttributes<HTMLDivElement> {
  labels?: {
    title: string;
    subtitle?: string;
  };
}

export function ${componentName}({ 
  labels,
  className, 
  ...props 
}: ${componentName}Props) {
  const l = labels || {
    title: "${titleAr}",
    subtitle: "",
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            {/* Add icon here */}
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>
        {l.subtitle && (
          <p className="text-sm text-muted-foreground">{l.subtitle}</p>
        )}
        {/* Component content goes here */}
      </div>
    </StaticCard>
  );
}
`;
  
  fs.writeFileSync(componentFile, componentContent);
  console.log(`✅ Created component: ${componentFile}`);
  
  // Update English translations
  const enFile = path.join(projectRoot, 'src/i18n/messages/en.ts');
  const enContent = fs.readFileSync(enFile, 'utf-8');
  
  const enKey = `  ${keyPrefix}${category.charAt(0).toUpperCase() + category.slice(1)}: {
    ${camelCaseName}: {
      title: "${titleEn}",
    },
  },`;
  
  // Find the end of the export default object
  const enLines = enContent.split('\n');
  let insertIndex = enLines.length - 1;
  
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
  
  const arKey = `  ${keyPrefix}${category.charAt(0).toUpperCase() + category.slice(1)}: {
    ${camelCaseName}: {
      title: "${titleAr}",
    },
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
  
  console.log('\n🎉 Component generated successfully!');
  console.log(`\nNext steps:`);
  console.log(`1. Review the component at: src/components/${platform}/${category}/${componentName}.tsx`);
  console.log(`2. Add component content and icon`);
  console.log(`3. Import and use the component in your page`);
  console.log(`4. Run npm run i18n:visible to verify no visible English`);
  console.log(`5. Test in both English and Arabic modes`);
  
  rl.close();
}

main().catch(console.error);
