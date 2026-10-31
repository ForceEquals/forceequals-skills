#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const SKILL_NAME = "governance-gap-scanner";
const SKILL_FILE = "SKILL.md";

export function skillSourcePath() {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), "skills", SKILL_NAME, SKILL_FILE);
}

export function skillDirectory(env = process.env) {
  const claudeChild = env.CLAUDE_CODE_CHILD_SESSION === "1";
  const claude = claudeChild || env.CLAUDECODE === "1";
  const cursor = Boolean(env.CURSOR_AGENT || env.CURSOR_TRACE_ID || env.CURSOR_SESSION_ID);
  if (claudeChild || (claude && !cursor)) return ".claude";
  return ".agents";
}

function place(dest, body, force) {
  if (fs.existsSync(dest)) {
    const current = fs.readFileSync(dest, "utf8");
    if (current === body) return { status: "present", path: dest };
    if (!force) return { status: "kept", path: dest };
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, body, "utf8");
  return { status: "installed", path: dest };
}

export function installSkill({ cwd = process.cwd(), force = false, env = process.env } = {}) {
  const source = skillSourcePath();
  if (!fs.existsSync(source)) {
    throw new Error(`Skill is missing: ${source}`);
  }
  const dest = path.join(path.resolve(cwd), skillDirectory(env), "skills", SKILL_NAME, SKILL_FILE);
  return place(dest, fs.readFileSync(source, "utf8"), force);
}

function isDirectRun() {
  const entry = process.argv[1];
  if (!entry) return false;
  return pathToFileURL(path.resolve(entry)).href === import.meta.url;
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes("-h") || args.includes("--help")) {
    console.log("Usage: npx github:ForceEquals/forceequals-skills [--dir PATH] [--force]");
    console.log("Copies the governance skill into this repository.");
    return 0;
  }

  let cwd = process.cwd();
  const dirFlag = args.indexOf("--dir");
  if (dirFlag !== -1) {
    if (!args[dirFlag + 1]) {
      console.error("--dir needs a path");
      return 1;
    }
    cwd = path.resolve(args[dirFlag + 1]);
  }

  let result;
  try {
    result = installSkill({ cwd, force: args.includes("--force") });
  } catch (err) {
    console.error(err?.message || err);
    return 1;
  }

  if (result.status === "installed") console.log(`Installed governance skill at ${result.path}`);
  else if (result.status === "present") console.log(`Governance skill already installed at ${result.path}`);
  else {
    console.log(`Left existing skill in place at ${result.path}`);
    console.log("Run with --force to replace it.");
  }
  return 0;
}

if (isDirectRun()) {
  process.exit(main());
}
