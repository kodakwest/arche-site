# AGENTS.md — Arche Site (Marketing)

## Project Context

Arche is an AI agent orchestration platform. This repo is the **marketing site** — brand, roadmap, product pages, blog. Deployed to Cloudflare Pages at `agentarche.com` (Andrew's surface).

**Sister repos:**
- `kodakwest/arche-studio` (renamed from `kodakwest/agentflow`)
- `kodakwest/arche-chat-deck` (renamed from `kodakwest/agentflow-ai-chat-deck`)
- `kodakwest/arche-site` ← YOU ARE HERE

## Visual Conventions

### Brand Identity
- **Master Logo:** Arche Gateway — 24×24 icon (arch + routed beam + origin node)
- **Horizontal lockup:** Icon + "ARCHE" + tagline "BUILD SECURE AGENT WORKFLOWS"
- **Favicon:** Arche Gateway mark at 16px

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-deep` | `#08080a` | Deepest background (body) |
| `--bg-base` | `#0c0d0f` | Primary surface |
| `--panel` | `#111215` | Card/panel surface |
| `--surface` | `#17181c` | Raised surface (hover, active) |
| `--ink` | `#f2f0e8` | Primary text |
| `--ink-secondary` | `#a8a6a0` | Secondary/body text |
| `--ink-muted` | `#807e7a` | Disabled/muted text |
| `--border` | `rgba(255,255,255,0.06)` | Default border |
| `--accent-primary` | `#22d3ee` | Primary actions, links |
| `--accent-flows` | `#34d399` | Flows feature highlight |
| `--accent-workers` | `#818cf8` | Workers feature highlight |
| `--accent-guard` | `#f472b6` | Guard feature highlight |
| `--accent-registry` | `#fbbf24` | Registry feature highlight |
| `--accent-runtime` | `#fb923c` | Runtime feature highlight |
| `--accent-audit` | `#fb7185` | Audit feature highlight |

### Typography
- **Sans:** Inter (Google Fonts) — UI, body, headings
- **Mono:** JetBrains Mono (Google Fonts) — code, tokens

### Brand Assets Location
Brand SVGs are in `/home/tsrwest/workspace/arche-rebrand/assets/branding/`:
- `arche-icon.svg`, `arche-icon-white.svg`, `arche-icon-monochrome.svg`
- `arche-logo-horizontal.svg`, `arche-logo-vertical.svg`
- `arche-favicon.svg`

**Copy to this repo's `/public/` or `/assets/` directory during build.**

## Domain Strategy

| Domain | Role | Hosting |
|--------|------|---------|
| **agentarche.com** | Marketing site (YOU) | Cloudflare Pages |
| **app.agentarche.com** | Arche Studio (SPA) | Cloudflare Pages |
| **api.agentarche.com** | Engine/API Worker | Cloudflare Worker |
| **www.agentarche.com** | Redirects → root | Cloudflare Pages |
| **archework.ai** | Sidecar apps (parked) | Registrar only |
| **arche.ai** | Brand capture (backordered) | Registrar only |

## Product Ecosystem (to feature on site)

| Product | Accent | Pitch |
|---------|--------|-------|
| Arche Studio | Teal `#22d3ee` | Design & generate agent workflows |
| Arche Flows | Green `#34d399` | Stateful multi-step orchestration |
| Arche Workers | Violet `#818cf8` | Task-specific AI agents |
| Arche Guard | Rose `#f472b6` | Security, policy, approval gates |
| Arche Registry | Amber `#fbbf24` | Approved tools, agents, skills |
| Arche Runtime | Orange `#fb923c` | Execution engine, state, scheduling |
| Arche Audit | Coral `#fb7185` | Logs, artifacts, compliance |

## Tagline Variants
- Hero: **Build secure agent workflows.**
- CLI: Arche — agent workflow runtime
- Docs: Arche Docs — design, run, govern
- Auth: Your agent workspace
- Error: Something broke. Arche logs have the trail.

## Deployment
- **Platform:** Cloudflare Pages
- **Build:** Vite + React (or static HTML output)
- **URLs:** `agentarche.com` → CF Pages
- **Custom domain:** Set up in CF Pages dashboard after build

## Brand Voice
- **Tone:** Architectural, authoritative, precise
- **Temperature:** Professional but not corporate
- **Avoid:** Magic, wizards, brains, sparkles, "democratizing", robot mascots
- **Pronouns:** "We build. You govern."
- **Metaphors:** Architecture, governance, workshops, craft

## Output Requirements
- Responsive design (mobile-first, breakpoint at 980px)
- Dark theme throughout
- All links target="_blank" for external, same-tab for internal
- SEO: meta descriptions, OG tags, structured data on every page
- Blog posts: Google Preferred Sources button for credibility signal

## Branching, Staging, and Deployment Gate

**`main` is the production-ready branch.** Do not push unreviewed work directly to `main`.

### Branch Naming
All changes must start on a named branch:

- `feature/<scope>` — new product work
- `fix/<scope>` — bug fixes
- `chore/<scope>` — repo/process/brand work
- `docs/<scope>` — documentation-only changes
- `hotfix/<scope>` — urgent production fixes only

### Branching Model
A **branch** is a candidate lane. It becomes a **staging surface** only when deployed to a local preview, CI preview, or hosted preview environment. `main` is the deployable production line.

| Layer | Purpose | Risk |
|---|---|---|
| `main` | Production-ready source | High |
| `chore/*`, `feature/*`, `fix/*` | Work branches | Low |
| PR preview / local preview | UAT/staging surface | Medium |
| `staging` branch (optional) | Shared staging lane | Medium |

Do not add a permanent `staging` branch unless a long-lived shared staging URL is required. It adds process weight and is not needed until preview environments prove insufficient.

### Required Promotion Flow
1. Create branch from current `main`  
   `git checkout main && git pull && git checkout -b <type>/<scope>`
2. Commit intended changes only — verify with `git status --short` and `git diff --stat`
3. Push branch  
   `git push -u origin <branch-name>`
4. Open PR or review packet
5. Jules runs/generates unit + E2E tests for the changed surface
6. All tests pass
7. TARS verifies UAT against the preview build
8. Brand/compliance scan passes (when applicable)
9. Merge to `main`
10. Push `main` → `master` for production deploy  
    `git push origin main:master`

**No quick fixes, no direct deploys, no hot patches to production.** Every change follows the full promotion flow. If a fix is small enough to skip the gate, it's small enough to wait for the gate.

**Prompt changes are code changes** and follow the same process. No direct deploy from a dirty worktree. No merge without tests and UAT. No hidden prompt edits.

**Gate keeper:** Jules runs tests. TARS verifies UAT. No deploy without both green. Tests are not optional. UAT is not optional. Prompts are not copy — they are runtime behavior.

### Cloudflare Integration

Cloudflare Pages consumes the repo through the defined branch/deploy strategy. It does not drive the release process.

**GitHub controls truth. Cloudflare deploys approved truth.**

| Component | Role |
|---|---|
| GitHub | Source of truth + review ledger |
| Branches | Controlled change lanes |
| CI (tests/lint/build) | Automated quality gate |
| Cloudflare preview | Staging surface (UAT) |
| `main` branch | Integration branch, production-ready source |
| `master` branch | Cloudflare production deploy target |
| Cloudflare production | Deploy target |

**Cloudflare Pages branch deployment controls (recommended):**

- **Production branch:** `master` (push `git push origin main:master`)
- **Preview branches:** `main`, `staging`, `feature/*`, `fix/*`, `chore/*`, `docs/*`
- **Custom domain (future):** `staging.agentarche.com` → `staging` branch (when domains are ready)

**Full promotion pipeline:**

```
local change
  ↓
work branch
  ↓
PR (review container)
  ↓
CI checks (lint, build, unit, E2E)
  ↓
Cloudflare preview (staging surface)
  ↓
UAT verification
  ↓
merge to main
  ↓
Cloudflare production deploy
```

### Formal Standards

**1. Never treat `main` as a backup target.**

`main` is the production-ready branch. It is not a parking lot.

Bad:
```
git add .
git commit -m "stuff"
git push origin main
```

Good:
```
git checkout -b chore/<scope>
git add <intended files>
git commit -m "chore: <description>"
git push -u origin chore/<scope>
```

**2. Branches are candidate lanes.** A branch is not staging by itself. The Cloudflare preview deployment or local `npm run preview` is the staging surface.

**3. Cloudflare follows Git, not the reverse.** Define brand, branching, CI/CD, preview, and deployment gate before connecting cloud production. Otherwise the cloud becomes the place where architecture mistakes become public.
