#!/bin/sh
set -eu
root=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
python3 - <<PY
import base64
from pathlib import Path

root = Path(r"""$root""")
src = root / "fonts-b64"
dests = [root / "app/fonts", root / "public/fonts"]
for dest in dests:
    dest.mkdir(parents=True, exist_ok=True)

def decode(text: str) -> bytes:
    compact = "".join(text.split())
    compact += "=" * ((4 - len(compact) % 4) % 4)
    return base64.b64decode(compact)

if not src.exists():
    raise SystemExit(f"missing {src}")

for path in src.glob("*.b64"):
    data = decode(path.read_text())
    name = path.name[:-4]
    for dest in dests:
        dest.joinpath(name).write_bytes(data)
print("restored", sorted(p.name for p in dests[0].iterdir()))
PY
