import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { installSkill, skillDirectory, skillSourcePath } from "../install.mjs";

const source = fs.readFileSync(skillSourcePath(), "utf8");
assert.match(source, /^---\r?\nname: governance-scanner\r?\n/);

const root = fs.mkdtempSync(path.join(os.tmpdir(), "fe-skill-"));
const dest = path.join(root, ".agents", "skills", "governance-scanner", "SKILL.md");
const claudeDest = path.join(root, ".claude", "skills", "governance-scanner", "SKILL.md");

const editorEnv = {};
assert.equal(skillDirectory(editorEnv), ".agents");
assert.equal(skillDirectory({ CLAUDECODE: "1" }), ".claude");
assert.equal(skillDirectory({ CLAUDECODE: "1", CURSOR_AGENT: "1" }), ".agents");
assert.equal(skillDirectory({ CLAUDECODE: "1", CURSOR_AGENT: "1", CLAUDE_CODE_CHILD_SESSION: "1" }), ".claude");

const first = installSkill({ cwd: root, env: editorEnv });
assert.equal(first.status, "installed");
assert.equal(fs.readFileSync(dest, "utf8"), source);
assert.equal(fs.existsSync(claudeDest), false);

const second = installSkill({ cwd: root, env: editorEnv });
assert.equal(second.status, "present");

fs.writeFileSync(dest, "custom\n");
const kept = installSkill({ cwd: root, env: editorEnv });
assert.equal(kept.status, "kept");
assert.equal(fs.readFileSync(dest, "utf8"), "custom\n");

const forced = installSkill({ cwd: root, env: editorEnv, force: true });
assert.equal(forced.status, "installed");
assert.equal(fs.readFileSync(dest, "utf8"), source);

const claudeRoot = fs.mkdtempSync(path.join(os.tmpdir(), "fe-skill-claude-"));
const claudeOnly = installSkill({ cwd: claudeRoot, env: { CLAUDECODE: "1" } });
assert.equal(claudeOnly.status, "installed");
assert.equal(fs.existsSync(path.join(claudeRoot, ".agents", "skills", "governance-scanner", "SKILL.md")), false);
assert.equal(fs.readFileSync(path.join(claudeRoot, ".claude", "skills", "governance-scanner", "SKILL.md"), "utf8"), source);

console.log("skill install ok");
