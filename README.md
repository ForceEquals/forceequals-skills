# forceequals-skills

Editor skills for ForceEquals. This repository is the source for those skills. The Node SDK does not carry the skill files.

## Governance scanner

Install the governance skill into the repository you have open:

```bash
npx skills add ForceEquals/forceequals-skills --skill governance-auditor -y
```

Already installed:

```bash
npx skills update governance-auditor -y
```

That copies `skills/governance-auditor/SKILL.md` into the project, at `.agents/skills/governance-auditor/SKILL.md` for Cursor and the other editors that share that folder, or `.claude/skills/governance-auditor/SKILL.md` for Claude Code.

The SDK is still installed separately. The skill does not need the SDK.

`skills/governance-auditor/SKILL.md` is the governance skill. The scan writes a readable `governance-gaps.json`. It does not lock or encrypt that file.

## Policy Architect

Install the Policy Architect skill into the repository you have open:

```bash
npx skills add ForceEquals/forceequals-skills --skill policy-architect -y
```

Already installed:

```bash
npx skills update policy-architect -y
```

That copies `skills/policy-architect/SKILL.md` the same way as the governance skill.

The skill writes two files at the repository root. `policy-architect.md` explains the agent and its policies in plain language, names the code line each policy came from, and links to a drafted agent in Momentum. `policy-architect.json` holds the agent and the policies only. Upload that JSON in Momentum under Tools, Policy Architect. The policies are saved in Policy Studio on the drafted agent.
