#!/bin/sh
set -eu
rm -rf /tmp/typedb-site
git clone --depth 1 --branch main https://github.com/daniel-crowe/typedb-hp-v1-pr3-src.git /tmp/typedb-site
python3 <<'PY'
import base64, shutil
from pathlib import Path

def decode(text):
    compact = "".join(text.split())
    compact += "=" * ((4 - len(compact) % 4) % 4)
    return base64.b64decode(compact)

def decode_monaco(text):
    compact = "".join(text.split())
    # GitHub file API inserted one extra O at stripped index 23161 (24013 vs 24012).
    if len(compact) == 24013 and compact[23155:23170] == "rgN3ysOOOgrDnnM":
        compact = compact[:23161] + compact[23162:]
    compact += "=" * ((4 - len(compact) % 4) % 4)
    return base64.b64decode(compact)

clone = Path("/tmp/typedb-site")
src = clone / "fonts-b64"
for dest in (clone / "app/fonts", clone / "public/fonts"):
    dest.mkdir(parents=True, exist_ok=True)
    for path in src.glob("*.b64"):
        raw = path.read_text()
        data = decode_monaco(raw) if path.name == "Monaco.woff2.b64" else decode(raw)
        dest.joinpath(path.name[:-4]).write_bytes(data)

skip = {"clone-build.sh", ".git", "monaco.b64"}
cwd = Path.cwd()
for item in clone.iterdir():
    if item.name in skip:
        continue
    target = cwd / item.name
    if target.exists():
        if target.is_dir():
            shutil.rmtree(target)
        else:
            target.unlink()
    if item.is_dir():
        shutil.copytree(item, target)
    else:
        shutil.copy2(item, target)

monaco_b64 = Path("monaco.b64")
if monaco_b64.exists() and monaco_b64.stat().st_size > 1000:
    data = decode_monaco(monaco_b64.read_text())
    for dest in (Path("app/fonts"), Path("public/fonts")):
        dest.mkdir(parents=True, exist_ok=True)
        dest.joinpath("Monaco.woff2").write_bytes(data)
    print("wrote stub Monaco", len(data))

monaco = Path("public/fonts/Monaco.woff2").read_bytes()
print("monaco bytes", len(monaco), "magic", monaco[:4])
if len(monaco) != 18008 or monaco[:4] != b"wOF2":
    raise SystemExit("Monaco.woff2 is not the known-good 18008-byte woff2")
print("fonts", sorted(p.name for p in Path("public/fonts").iterdir()))
print("app files", sorted(p.name for p in Path("app").iterdir()))
PY
export NPM_CONFIG_PRODUCTION=false
export NODE_ENV=development
npm ci --include=dev
NODE_ENV=production npx next build

# ndx8 FAIL: Vercel Next onBuildComplete only packaged App routes
# (/ , /use-cases, /_not-found). The iframe needs the literal file at
# /instruments/pass-b-chat-v4.1.html on the static root (`out/`).
python3 <<'PY'
import hashlib, shutil
from pathlib import Path

want = "9496ed04b6b2f3c2014176f21a0c65ae7acdba0e29f337cf075e62d589b19229"
src = Path("public/instruments/pass-b-chat-v4.1.html")
if not src.is_file():
    raise SystemExit(f"missing locked instrument {src}")
html = src.read_bytes()
digest = hashlib.sha256(html).hexdigest()
if digest != want or len(html) != 40249:
    raise SystemExit(f"locked instrument hash/size mismatch {len(html)} {digest}")

out = Path("out/instruments/pass-b-chat-v4.1.html")
out.parent.mkdir(parents=True, exist_ok=True)
out.write_bytes(html)

root = Path("instruments/pass-b-chat-v4.1.html")
root.parent.mkdir(parents=True, exist_ok=True)
root.write_bytes(html)

vercel_static = Path(".vercel/output/static")
if Path("/vercel/output").exists() or True:
    vercel_static.mkdir(parents=True, exist_ok=True)
    # Serve the Next static export as the Vercel static root.
    if Path("out").is_dir():
        for item in Path("out").iterdir():
            dest = vercel_static / item.name
            if dest.exists():
                if dest.is_dir():
                    shutil.rmtree(dest)
                else:
                    dest.unlink()
            if item.is_dir():
                shutil.copytree(item, dest)
            else:
                shutil.copy2(item, dest)
    instrument = vercel_static / "instruments" / "pass-b-chat-v4.1.html"
    instrument.parent.mkdir(parents=True, exist_ok=True)
    instrument.write_bytes(html)
    Path(".vercel/output/config.json").write_text('{"version":3}\n')

for path in (src, out, root, vercel_static / "instruments" / "pass-b-chat-v4.1.html"):
    body = path.read_bytes()
    print("EMIT", path, len(body), hashlib.sha256(body).hexdigest())
    if hashlib.sha256(body).hexdigest() != want:
        raise SystemExit(f"emit mismatch {path}")
print("instrument route ready: /instruments/pass-b-chat-v4.1.html")
PY
ls -la out/instruments/
ls -la instruments/
ls -la .vercel/output/static/instruments/
