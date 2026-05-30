const fs = require('fs');

const filePath = 'D:\\smart-marketing-system\\src\\i18n\\messages\\en.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Remove duplicate clientAnalytics and clientCampaigns sections at the end
content = content.replace(/  clientAnalytics: \{[^}]+\},\s*\},?\s*clientCampaigns: \{[^}]+\},\s*\},?\s*cards:/, '  cards:');

// Add contentPerformanceMatrix to existing clientAnalytics section
content = content.replace(
  /(      missing: "Missing",\s*\},\s*\},)/,
  '$1    contentPerformanceMatrix: {\n      assetType: "Asset Type",\n      engagement: "Engagement",\n      conversion: "Conversion",\n      costEfficiency: "Cost Efficiency",\n      bestPlatform: "Best Platform",\n    },'
);

// Add readiness, schedulePublish, and urgentLaunch to existing clientCampaigns section
content = content.replace(
  /(      targeting: "Targeting",\s*ready: "Ready",\s*\},)/,
  '$1    readiness: {\n      ready: "Ready",\n    },\n    schedulePublish: {\n      saveDraft: "Save Draft",\n      publishCampaign: "Publish Campaign",\n    },\n    urgentLaunch: {\n      launchNow: "Launch Now",\n    },'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed en.ts');
