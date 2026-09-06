#!/bin/sh
set -eu
root=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
python3 - <<PY
import base64
from pathlib import Path
src = Path("$root") / "fonts-b64"
dest = Path("$root") / "app/fonts"
dest.mkdir(parents=True, exist_ok=True)
for path in src.glob("*.b64"):
    dest.joinpath(path.name[:-4]).write_bytes(base64.b64decode(path.read_text()))
print("restored", sorted(p.name for p in dest.iterdir()))
PY
