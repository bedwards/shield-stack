#!/bin/bash
# Domain availability check via whois.
# NOT authoritative — Cloudflare dashboard is ground truth.
# Reports: AVAILABLE | TAKEN | UNKNOWN per slug+TLD.

set -u
SLUGS=(scorerebound billwatch ghostboard afterloss cellscore \
       cliffcheck hoashield recallradar repairfair \
       clearfile zonealert lemonlens speedproof netcheck \
       receiptguard smallclaimsai tenantshield movercheck skimpwatch \
       settlescan fafsacopilot parkfight)
TLDS=(com app io)

# whois "available" patterns (case-insensitive)
AVAIL_PATTERNS="No match|NOT FOUND|Domain not found|is available|No Data Found|no entries found|Status: free|Status: AVAILABLE"

check() {
  local domain="$1"
  local out
  out=$(whois "$domain" 2>/dev/null)
  if [ -z "$out" ]; then
    echo "UNKNOWN"
    return
  fi
  if echo "$out" | grep -qiE "$AVAIL_PATTERNS"; then
    echo "AVAILABLE"
  elif echo "$out" | grep -qiE "Registry Expiry Date|Creation Date|Registrar:|Domain Name:"; then
    echo "TAKEN"
  else
    echo "UNKNOWN"
  fi
}

printf "%-20s %-10s %-10s %-10s\n" "SLUG" ".com" ".app" ".io"
printf "%-20s %-10s %-10s %-10s\n" "----" "----" "----" "---"

for slug in "${SLUGS[@]}"; do
  printf "%-20s" "$slug"
  for tld in "${TLDS[@]}"; do
    result=$(check "${slug}.${tld}")
    printf " %-10s" "$result"
    sleep 1  # rate-limit politeness
  done
  printf "\n"
done
