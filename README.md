# forceequals-skills

Editor skills for ForceEquals. This repository is the source for those skills. The Node SDK does not carry the skill files.

## Governance scanner

Install the governance skill into the repository you have open:

```bash
npx skills add ForceEquals/forceequals-skills --skill governance-gap-scanner -y
```

Already installed:

```bash
npx skills update governance-gap-scanner -y
```

That copies `skills/governance-gap-scanner/SKILL.md` into the project, at `.agents/skills/governance-gap-scanner/SKILL.md` for Cursor and the other editors that share that folder, or `.claude/skills/governance-gap-scanner/SKILL.md` for Claude Code.

The SDK is still installed separately. The skill does not need the SDK.

`skills/governance-gap-scanner/SKILL.md` is the governance skill. The scan writes a readable `governance-gaps.json`. It does not lock or encrypt that file.

## Code to Policy

Install the Code to Policy skill into the repository you have open:

```bash
npx skills add ForceEquals/forceequals-skills --skill code-to-policy -y
```

Already installed:

```bash
npx skills update code-to-policy -y
```

That copies `skills/code-to-policy/SKILL.md` the same way as the governance skill.

The skill writes two files at the repository root. `code-to-policy.md` explains the agent and its policies in plain language, links to a drafted agent in Momentum, and includes a prompt for each code issue plus one prompt for all of them. `code-to-policies.json` holds the agent and the policies only. Upload that JSON in Momentum under Tools, Code to Policy. The policies are saved in Policy Studio on the drafted agent.
