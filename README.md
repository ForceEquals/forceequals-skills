# forceequals-skills

Editor skills for ForceEquals. This repository is the source for those skills. The Python and Node SDKs do not carry the skill file.

Install the governance skill into the repository you have open.

Node is available:

```bash
npx skills add ForceEquals/forceequals-skills --skill forceequals -y
```

Python only, with no Node on the machine:

```bash
pip install forceequals-skills
forceequals-skills
```

Run that second command inside the project. It writes `.agents/skills/forceequals/SKILL.md` for Cursor and the other editors that share that folder, or `.claude/skills/forceequals/SKILL.md` for Claude Code.

The Node or Python SDK is still installed separately. The skill does not need the SDK.

`skills/forceequals/SKILL.md` is the only skill file. The installer copies that file into the project.
