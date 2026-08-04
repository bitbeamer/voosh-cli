import { copyFile } from "node:fs/promises";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";

const repoRoot = resolve(import.meta.dirname, "..");
const sourcePath = resolve(process.argv[2] ?? "../voosh/docs/api/openapi.yaml");
const targetPath = resolve(repoRoot, "openapi/openapi.yaml");

await copyFile(sourcePath, targetPath);
console.log(`Copied ${sourcePath} to ${targetPath}`);
execFileSync("yarn", ["generate"], { cwd: repoRoot, stdio: "inherit" });
