#!/usr/bin/env bash
set -u

printf '\nAI Fullstack Interview · Environment Check\n'
printf '%s\n' '----------------------------------------'

missing=0

check_required() {
  local cmd="$1"
  local label="$2"
  if command -v "$cmd" >/dev/null 2>&1; then
    printf '[OK]   %-10s %s\n' "$label" "$("$cmd" --version 2>&1 | head -n 1)"
  else
    printf '[MISS] %-10s not found\n' "$label"
    missing=1
  fi
}

check_required java Java
check_required mvn Maven
check_required node Node
check_required npm npm

if command -v docker >/dev/null 2>&1; then
  printf '[OPT]  %-10s %s\n' Docker "$(docker --version 2>&1)"
else
  printf '[OPT]  %-10s not found (only needed for fallback startup)\n' Docker
fi

printf '\n'
if [ "$missing" -eq 0 ]; then
  printf 'Required tools are available. You can start the project.\n'
else
  printf 'One or more required tools are missing. Docker can be used as a fallback, or ask the interviewer for environment help.\n'
fi

exit "$missing"
