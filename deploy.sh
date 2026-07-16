#!/usr/bin/env bash
set -euo pipefail

REMOVED=(
  ".claude"
  ".agents"
  ".cursor"
  ".github"
  ".nuxt"
  ".output"
  "dest"
  "CLAUDE.md"
  "AGENTS.md"
  "Dockerfile.dev"
)

remove_paths() {
  for path in "$@"; do
    if [ -e "$path" ]; then
      rm -rf "$path"
      echo "removed: $path"
    else
      echo "skip: $path"
    fi
  done
}

PLATFORM="${1:-}"

if [ -n "${VERCEL:-}" ] || [ "$PLATFORM" = "vercel" ]; then
  echo "platform: vercel"
  remove_paths "${REMOVED[@]}"

elif [ -n "${RENDER:-}" ] || [ "$PLATFORM" = "render" ]; then
  echo "platform: render"
  remove_paths "${REMOVED[@]}"

elif [ "$PLATFORM" = "ec2" ]; then
  echo "platform: ec2"
  remove_paths "${REMOVED[@]}"

else
  echo "usage: $0 [vercel|render|ec2]"
  exit 1
fi

if [ -f scripts/clear-redis.js ]; then
  echo "Clearing Redis..."
  node scripts/clear-redis.js
fi

echo "Done."
