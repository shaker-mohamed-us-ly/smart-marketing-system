import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..", "..");

const message = [
  "OSV_SCANNER_DEFERRED",
  "",
  "Do not run reports/tooling/osv-scanner.exe.",
  "The downloaded binary is blocked by Windows SmartScreen/MOTW.",
  "Install OSV-Scanner officially later (e.g., via go install or winget).",
  "",
  "Status: DEFERRED (not PASS)",
  "Exit code: 0 (to avoid breaking tool:security:all chain)",
].join("\n");

console.log(message);

const summaryPath = join(root, "reports", "tooling", "osv-summary.txt");
writeFileSync(summaryPath, message + "\n", "utf-8");
