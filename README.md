# forceequals-skills

Editor skills for ForceEquals. This repository is the source for those skills. The Node SDK does not carry the skill file.

Install the governance skill into the repository you have open:

```bash
npx skills add ForceEquals/forceequals-skills --skill governance-scanner -y
```

Already installed:

```bash
npx skills update governance-scanner -y
```

That copies `skills/governance-scanner/SKILL.md` into the project, at `.agents/skills/governance-scanner/SKILL.md` for Cursor and the other editors that share that folder, or `.claude/skills/governance-scanner/SKILL.md` for Claude Code.

The SDK is still installed separately. The skill does not need the SDK.

`skills/governance-scanner/SKILL.md` is the only skill file. The scan writes a readable `governance-gaps.json`. It does not lock or encrypt that file.
