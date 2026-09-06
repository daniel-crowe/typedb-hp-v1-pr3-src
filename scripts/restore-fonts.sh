#!/usr/bin/env bash
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
src="$root/fonts-b64"
dest="$root/app/fonts"
mkdir -p "$dest"
shopt -s nullglob
for f in "$src"/*.b64; do
  name="$(basename "$f" .b64)"
  base64 -d "$f" > "$dest/$name"
done
