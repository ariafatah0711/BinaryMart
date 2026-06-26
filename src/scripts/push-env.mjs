import fs from "fs";
import { execSync } from "child_process";

const file = process.argv[2] || ".env";
const target = process.argv[3] || "production";

const content = fs.readFileSync(file, "utf-8");
const env = {};

for (const line of content.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIdx = trimmed.indexOf("=");
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  const val = trimmed.slice(eqIdx + 1).trim();
  if (key) env[key] = val;
}

for (const [key, value] of Object.entries(env)) {
  console.log(`Uploading ${key}...`);
  execSync(`echo "${value}" | vercel env add ${key} ${target}`, {
    stdio: "inherit",
    shell: true,
  });
}
