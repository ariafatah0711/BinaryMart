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
  let key = trimmed.slice(0, eqIdx).trim();
  let val = trimmed.slice(eqIdx + 1).trim();
  if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
  if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
  if (key) env[key] = val;
}

for (const [key, value] of Object.entries(env)) {
  console.log(`Uploading ${key}...`);
  const tmp = `env-${key}.tmp`;
  fs.writeFileSync(tmp, value, "utf-8");
  execSync(`type ${tmp} | vercel env add ${key} ${target} --force`, {
    stdio: "inherit",
    shell: true,
  });
  fs.unlinkSync(tmp);
}
