"""Copy the governance skill into the repository the editor has open."""

from __future__ import annotations

import os
import sys
from pathlib import Path

SKILL_NAME = "forceequals"
SKILL_FILE = "SKILL.md"


def skill_source() -> Path:
    packaged = Path(__file__).resolve().parent / SKILL_FILE
    if packaged.is_file():
        return packaged
    return Path(__file__).resolve().parents[1] / "skills" / SKILL_NAME / SKILL_FILE


def skill_directory(env: dict | None = None) -> str:
    values = env if env is not None else os.environ
    claude_child = values.get("CLAUDE_CODE_CHILD_SESSION") == "1"
    claude = claude_child or values.get("CLAUDECODE") == "1"
    cursor = any(values.get(name) for name in ("CURSOR_AGENT", "CURSOR_TRACE_ID", "CURSOR_SESSION_ID"))
    if claude_child or (claude and not cursor):
        return ".claude"
    return ".agents"


def install_skill(cwd: Path | None = None, force: bool = False, env: dict | None = None) -> dict:
    source = skill_source()
    if not source.is_file():
        raise FileNotFoundError(f"Skill is missing: {source}")
    root = Path(cwd or Path.cwd()).resolve()
    dest = root / skill_directory(env) / "skills" / SKILL_NAME / SKILL_FILE
    body = source.read_text(encoding="utf-8")
    if dest.is_file():
        current = dest.read_text(encoding="utf-8")
        if current == body:
            return {"status": "present", "path": dest}
        if not force:
            return {"status": "kept", "path": dest}
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(body, encoding="utf-8")
    return {"status": "installed", "path": dest}


def main(argv: list[str] | None = None) -> int:
    args = list(sys.argv[1:] if argv is None else argv)
    if args and args[0] in {"-h", "--help", "help"}:
        print("Usage: forceequals-skills [--dir PATH] [--force]")
        return 0
    force = "--force" in args
    directory = Path.cwd()
    if "--dir" in args:
        index = args.index("--dir")
        if index + 1 >= len(args):
            print("--dir needs a path")
            return 1
        directory = Path(args[index + 1])
    try:
        result = install_skill(directory, force=force)
    except FileNotFoundError as exc:
        print(str(exc))
        return 1
    path = result["path"]
    if result["status"] == "installed":
        print(f"Installed governance skill at {path}")
    elif result["status"] == "present":
        print(f"Governance skill already installed at {path}")
    else:
        print(f"Left existing skill in place at {path}")
        print("Run with --force to replace it.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
