import { execSync } from "child_process";
import { existsSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..", "..");

const gitleaksPath =
  "C:\\Users\\phantompc\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gitleaks.Gitleaks_Microsoft.Winget.Source_8wekyb3d8bbwe\\gitleaks.exe";

const summaryPath = join(root, "reports", "tooling", "gitleaks-summary.txt");

if (!existsSync(gitleaksPath)) {
  const msg = [
    "GITLEAKS_NEEDS_PATH_REFRESH",
    `Expected gitleaks at: ${gitleaksPath}`,
    "Winget installed Gitleaks but the current shell does not see it.",
    "Restart shell or update PATH, then retry.",
    "",
    "Status: SKIPPED (not PASS)",
  ].join("\n");

  console.log(msg);
  writeFileSync(summaryPath, msg + "\n", "utf-8");
  process.exit(0);
}

try {
  const output = execSync(
    `"${gitleaksPath}" detect --no-git --redact --source .`,
    {
      cwd: root,
      encoding: "utf-8",
      timeout: 120000,
      stdio: ["pipe", "pipe", "pipe"],
    }
  );

  const msg = [
    "GITLEAKS_SCAN_COMPLETED",
    "Command: gitleaks detect --no-git --redact --source .",
    "Secrets redacted: YES (--redact used)",
    "",
    "--- OUTPUT ---",
    output,
    "",
    "Status: COMPLETED (review findings; do not assume PASS)",
  ].join("\n");

  console.log(msg);
  writeFileSync(summaryPath, msg + "\n", "utf-8");
} catch (err) {
  let stderr = "";
  if (err.stderr) stderr = err.stderr.toString();
  if (err.stdout) stderr += "\n" + err.stdout.toString();

  const noLeaks = stderr.toLowerCase().includes("no leaks found");

  const msg = [
    noLeaks ? "GITLEAKS_NO_LEAKS_FOUND" : "GITLEAKS_SCAN_COMPLETED_WITH_FINDINGS",
    `Exit code: ${err.status ?? "unknown"}`,
    "",
    "--- OUTPUT (redacted) ---",
    stderr || "(no output)",
    "",
    "Status: COMPLETED (review findings; do not assume PASS)",
  ].join("\n");

  console.log(msg);
  writeFileSync(summaryPath, msg + "\n", "utf-8");
  process.exit(0);
}
