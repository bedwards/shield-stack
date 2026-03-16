# Shield Stack

A portfolio of 22 consumer protection products, each solving a specific universal pain point with zero-cost SEO distribution and revenue from day one.

## Products

| # | Product | Pain Point | Status |
|---|---------|-----------|--------|
| 1 | GhostBoard | Employer ghosting rate database | Not started |
| 2 | CliffCheck | Benefits cliff calculator | Not started |
| 3 | ScoreRebound | Student loan credit score recovery | Not started |
| 4 | HOAshield | HOA overreach defense | Not started |
| 5 | RecallRadar | Product recall barcode scanner | Not started |
| 6 | BillWatch | Utility bill anomaly detection | Not started |
| 7 | RepairFair | Appliance repair fair price estimator | Not started |
| 8 | ClearFile | Background check error disputes | Not started |
| 9 | ZoneAlert | Zoning & development alerts | Not started |
| 10 | LemonLens | Used car AI damage detection | Not started |
| 11 | SpeedProof | ISP speed accountability | Not started |
| 12 | NetCheck | In-network verification | Not started |
| 13 | ReceiptGuard | Grocery overcharge detection | Not started |
| 14 | SmallClaimsAI | Small claims court guide | Not started |
| 15 | TenantShield | Tenant habitability defense | Not started |
| 16 | MoverCheck | Moving company scam protection | Not started |
| 17 | SkimpWatch | Ingredient change tracker | Not started |
| 18 | SettleScan | Class action settlement matcher | Not started |
| 19 | FAFSAcopilot | FAFSA error catcher | Not started |
| 20 | CellScore | Cell plan finder with real coverage | Not started |
| 21 | ParkFight | Parking ticket dispute automation | Not started |
| 22 | AfterLoss | After-death estate settlement guide | Not started |

## Development Modes

**Mode 1: Interactive TUI** — Human orchestrator in Claude Code TUI spawning up to 15 background workers.

**Mode 2: Autonomous RALPH Loop** — `python3 ralph.py` runs a serial Research → Plan → Orchestrate → Implement → Review → Monitor loop.

## Quick Start

```bash
# Check RALPH status
python3 ralph.py --status

# Dry run (preview without executing)
python3 ralph.py --dry-run --max-loops 1

# Run focused on one product
python3 ralph.py --product hoashield --max-loops 3

# Full autonomous loop
python3 ralph.py
```
