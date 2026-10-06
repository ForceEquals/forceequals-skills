# forceequals-skills

Editor skills for ForceEquals. This repository is the source for those skills. The Python and Node SDKs do not carry the skill file.

Install the governance skill into the repository you have open:

```bash
npx skills add ForceEquals/forceequals-skills --skill forceequals -y
```

That uses the public `skills` installer. This repository does not need its own npm package. `-y` skips the agent picker. `npx skills update forceequals -y` replaces an older copy.

The Node or Python SDK is still installed separately. The agent uses it to seal `governance-gaps.json`.

`skills/forceequals/SKILL.md` is the only skill file. The installer copies that file into the project.
