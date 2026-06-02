# Arche Ecosystem Shell — Design Brief

## Objective
Update the Arche marketing site into a product ecosystem hub. Add navigation to all Arche surfaces (Chat Deck, Workbench, Control Plane, Docs), design new Control Plane and Workbench pages using the existing Drift design system, and apply the new brand identity.

## Brand Identity
- Name: **Arche**
- Tagline: *Build Secure Agent Workflows*
- Domain: arche.agentarche.ai (Cloudflare Pages)
- Visual identity: Dark theme, teal (#22d3ee) / violet (#818cf8) accents, Inter sans + JetBrains Mono

## Design System (Drift v2)
Use existing CSS custom properties from the current `arche-site/index.html`:
- `--bg-deep: #0B0B12`, `--bg-base: #0c0d0f`, `--panel: #111215`, `--surface: #17181c`
- `--ink: #f2f0e8`, `--ink-secondary: #a8a6a0`, `--ink-muted: #6b6a66`
- `--accent-primary: #22d3ee` (teal), `--accent-tertiary: #818cf8` (violet)
- `--border-panel: rgba(255,255,255,0.05)`
- Glassmorphism: `--glass-bg: rgba(17,18,21,0.7)`, `--glass-blur: 16px`

## Pages / Views

### 1. Site Navigation (Ecosystem Hub)
The existing marketing site gets a new nav that connects all surfaces:

| Item | Route | Description |
|------|-------|-------------|
| Home | `/` | Marketing page (existing, add ecosystem callouts) |
| Chat Deck | `/chat-deck` | Landing page for the dual-model adversarial chat tool |
| Workbench | `/workbench` | Prompt analysis, session metrics, optimization feed |
| Control Plane | `/control` | Engine management, session explorer, config |
| Docs | `/docs` | Documentation hub |

Nav design: Dark sidebar or top nav with icons. Active state uses accent-primary glow. Glassmorphism for the nav bar.

### 2. Control Plane (`/control`)
Engine management dashboard. Shows:
- **Status strip** at top: Engine status (green/red dot), sessions processed today, active DB size, uptime
- **Metrics row**: 4 stat cards — Sessions Total, Avg Prompt Quality, Cost Burn (today/week/month), Loop Count
- **Session table**: Scrollable table with columns: ID, Source, Model, Tokens, Cost, Date, Loop Severity
- **Actions panel**: Start/Stop engine, DB path config, export buttons
- Color coding: teal for primary actions, rose for warnings/loops, emerald for healthy status

### 3. Workbench (`/workbench`)
Prompt & Agent Workbench (per architect-workbench-spec.md). Shows:
- **Metric cards** row: Prompt Quality, Session Hygiene, Code Review Score, Tool Mastery, Cost Burn, Runaway Loops
- **Prompt Analyzer**: Text area to paste a prompt + "Analyze" button → returns quality score, file ref rate, specificity, recommendations
- **Session Explorer**: Filterable/faceted browser — filter by agent (Codex, agy, Hermes, Chat Deck), date range, project, outcome
- **Optimization Feed**: Scrollable timeline of automated suggestions ("Add file references to 3 prompts", "Session exceeded 100K tokens")
- **Trend chart**: Sparkline/bar for prompt quality over last 7/14/30 days
- **Format options**: Toggle between Summary / Detail / Raw views. Export buttons for JSON, Markdown, PDF.

### 4. Chat Deck Landing (`/chat-deck`)
Marketing page for the dual-model adversarial conversation tool:
- Feature highlights: dual-model comparison, cost tracking, local-first, multi-provider
- Screenshot/mockup of the chat deck in action
- "Launch Chat Deck" CTA button

## Design Notes
- All mockups should be self-contained HTML files using the Drift design system variables
- Responsive: desktop first, tablet-friendly at 980px breakpoint
- No build step — pure HTML/CSS/JS
- Mockups show designed state with sample data (use realistic-looking dummy data for sessions, metrics, etc.)
- Interactive elements can be static in mockups (show the designed state, don't need full JS)

## Deliverables
- `shell-mockup.html` — Ecosystem nav hub with all page mockups in one file (tabbed or multi-section)
- Or separate files per page: `control-plane.html`, `workbench.html`, `chat-deck-landing.html`
