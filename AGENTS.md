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
| **agentarche.ai** | Platform infra (DNS root) | Cloudflare DNS |
| **arche.agentarche.ai** | Main platform (app) | Cloudflare DNS (CNAME) |
| **archework.ai** | Sidecar apps | Cloudflare Pages |

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
