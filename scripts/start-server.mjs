import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

/**
 * Parse .env / .env.local files so PORT, PROXY_PORT, HOSTNAME, and ALLOWED_HOSTS
 * are strictly controlled by .env before Next.js binds to a port.
 */
function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eqIdx = line.indexOf("=");
    if (eqIdx === -1) continue;
    const key = line.slice(0, eqIdx).trim();
    let val = line.slice(eqIdx + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = val;
    }
  }
}

const rootDir = process.cwd();
loadEnvFile(path.join(rootDir, ".env.local"));
loadEnvFile(path.join(rootDir, ".env"));

const mode = process.argv[2] === "dev" ? "dev" : "start";
const port = process.env.PORT || process.env.PROXY_PORT || "3000";
const hostname = process.env.HOSTNAME || process.env.HOST || "0.0.0.0";

const nextBin = path.join(
  rootDir,
  "node_modules",
  "next",
  "dist",
  "bin",
  "next"
);

console.log(
  `[env-server] Starting Next.js (${mode}) on http://${hostname}:${port} (configured via .env)`
);

const child = spawn(
  process.execPath,
  [nextBin, mode, "-p", String(port), "-H", String(hostname)],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      PORT: String(port),
      HOSTNAME: String(hostname),
    },
  }
);

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
