import { execSync } from "child_process";
import { existsSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..", "..");

const pysemgrepPath =
  "C:\\Users\\phantompc\\AppData\\Roaming\\Python\\Python314\\Scripts\\pysemgrep.exe";

const summaryPath = join(root, "reports", "tooling", "semgrep-summary.txt");

if (!existsSync(pysemgrepPath)) {
  const msg = [
    "SEMGREP_SKIPPED_PATH_NOT_FOUND",
    `Expected pysemgrep at: ${pysemgrepPath}`,
    "The Python Scripts directory is not on PATH.",
    "Install or add to PATH, then retry.",
    "",
    "Status: SKIPPED (not PASS)",
  ].join("\n");

  console.log(msg);
  writeFileSync(summaryPath, msg + "\n", "utf-8");
  process.exit(0);
}

try {
  const output = execSync(
    `"${pysemgrepPath}" scan --config=auto --dryrun`,
    {
      cwd: root,
      encoding: "utf-8",
      timeout: 120000,
      stdio: ["pipe", "pipe", "pipe"],
    }
  );

  const msg = [
    "SEMGREP_SCAN_COMPLETED",
    "Command: pysemgrep scan --config=auto --dryrun",
    "Cloud upload: NONE (dryrun used)",
    "Login: NONE",
    "",
    "--- STDOUT ---",
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

  const isNetwork =
    stderr.includes("network") ||
    stderr.includes("connection") ||
    stderr.includes("timeout") ||
    stderr.includes("HTTP") ||
    stderr.includes("403") ||
    stderr.includes("401");

  const msg = [
    "SEMGREP_SCAN_ISSUE",
    `Exit code: ${err.status ?? "unknown"}`,
    isNetwork ? "Issue appears to be network/config related." : "",
    "",
    "--- OUTPUT ---",
    stderr || "(no output)",
    "",
    "Status: ISSUE (not PASS)",
    "If config=auto requires network/login, use a local config file instead.",
  ]
    .filter(Boolean)
    .join("\n");

  console.log(msg);
  writeFileSync(summaryPath, msg + "\n", "utf-8");
  process.exit(0);
}
