import http from "http";
import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..", "..");
const reportPath = join(root, "reports", "tooling", "axe-dashboard-smoke.json");

const DASHBOARD_URL = "http://localhost:3000/client/dashboard";

function checkServer(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      resolve(res.statusCode === 200);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(3000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function main() {
  const isRunning = await checkServer(DASHBOARD_URL);

  if (!isRunning) {
    const result = {
      status: "SKIPPED_DEV_SERVER_NOT_RUNNING",
      url: DASHBOARD_URL,
      timestamp: new Date().toISOString(),
      reason:
        "Dev server not detected. Start with 'npm run dev' and retry.",
      note: "SKIPPED does not equal PASS.",
    };
    console.log(JSON.stringify(result, null, 2));
    writeFileSync(reportPath, JSON.stringify(result, null, 2) + "\n", "utf-8");
    process.exit(0);
  }

  try {
    const { chromium } = await import("playwright");
    const { default: AxeBuilder } = await import("@axe-core/playwright");

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(DASHBOARD_URL, { waitUntil: "networkidle" });

    const axe = new AxeBuilder({ page });
    const results = await axe.analyze();

    const summary = {
      status: "SCANNED",
      url: DASHBOARD_URL,
      timestamp: new Date().toISOString(),
      violations: results.violations.length,
      passes: results.passes.length,
      incomplete: results.incomplete.length,
      inapplicable: results.inapplicable.length,
      note: "Review violations; do not assume PASS.",
    };

    console.log(JSON.stringify(summary, null, 2));
    writeFileSync(reportPath, JSON.stringify({ summary, details: results }, null, 2) + "\n", "utf-8");

    await browser.close();
  } catch (err) {
    const result = {
      status: "SCAN_ERROR",
      url: DASHBOARD_URL,
      timestamp: new Date().toISOString(),
      error: err.message,
      note: "Check that Playwright and @axe-core/playwright are installed.",
    };
    console.log(JSON.stringify(result, null, 2));
    writeFileSync(reportPath, JSON.stringify(result, null, 2) + "\n", "utf-8");
    process.exit(0);
  }
}

main();
