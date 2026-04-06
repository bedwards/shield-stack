#!/bin/bash
# Authoritative RALPH liveness check.
# Never trust .ralph/status.json's self-report — verify pid + heartbeat freshness.
# Exit 0 = ALIVE, exit 1 = DEAD (with reason on stdout).

cd "$(dirname "$0")/.."
python3 ralph.py --status 2>/dev/null | python3 -c '
import json, sys
data = json.load(sys.stdin)
liveness = data.get("liveness", {})
verdict = liveness.get("verdict", "UNKNOWN")
pid = liveness.get("pid")
alive = liveness.get("pid_alive")
stale = liveness.get("stale_seconds")
print(f"verdict={verdict} pid={pid} pid_alive={alive} stale_seconds={stale}")
sys.exit(0 if verdict == "ALIVE" else 1)
'
