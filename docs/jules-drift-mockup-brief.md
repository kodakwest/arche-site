# Arche Studio — Drift v2 Look & Feel Refresh

## Context

Arche is an AI agent orchestration platform. The studio app at `arche.agentarche.ai` (repo `kodakwest/arche-studio`) is a React/Zustand/Vite/TypeScript SPA with Architect Chat, Agent Builder, Control Plane, Workbench, and Settings modules.

The app was recently rebranded from AgentFlow to Arche. The brand is set (Gateway icon, Arche name, teal/violet accents). What's missing is the **visual refresh** — the App currently uses an older dark theme (`#0e0f0d` base, `#171713` panels, `#56b6a7` teal) that needs upgrading to the **Drift v2** design language.

## Design References (in this repo)

| File | What |
|---|---|
| `AGENTS.md` | Brand identity, color tokens, product ecosystem, typography |
| `drift.css` | **Drift v2 canonical design system** — glassmorphism, all CSS custom properties, animation patterns, light/dark theme |
| `ecosystem-mockup-brief.md` | Previous ecosystem shell design brief (Control Plane, Workbench pages) |
| `assets/branding/` | Arche brand SVGs — Gateway icon, horizontal/vertical logos, favicon |
| `docs/redesign-mockup-v2.html` | **Previous mockup** (made pre-rebrand, pre-Drift) — shows the layout we're refreshing |

## What To Produce

Create a **self-contained HTML mockup file** at `docs/studio-drift-mockup.html` that shows the Arche Studio app redesigned with Drift v2:

### Design Direction

**Drift v2 Dark Shell:**
- Use Drift CSS variables from `drift.css` (copy the `:root` block into the mockup)
- Background: `--bg-deep: #0B0B12`, `--bg-base: #0c0d0f`, `--panel: #111215`, `--surface: #17181c`
- Ink: `--ink: #f2f0e8`, `--ink-secondary: #a8a6a0`, `--ink-muted: #6b6a66`
- Accent: Primary `#22d3ee` (teal/cyan), Tertiary `#818cf8` (violet)
- **Glass panels** — `--glass-bg: rgba(17, 18, 21, 0.75)`, `--glass-border: rgba(34, 211, 238, 0.15)`, `--glass-blur: 16px`
- Subtle grain texture overlay (`--grain-opacity: 0.035`)
- Card shadows: `0 4px 20px rgba(0,0,0,0.3)` resting, `0 10px 30px rgba(34,211,238,0.1)` hover
- Fonts: Inter (UI), JetBrains Mono (code)

**Arche Branding:**
- Replace "AgentFlow" → "Arche" everywhere
- Use the Arche Gateway icon (from `assets/branding/arche-icon-gateway.svg`) as the primary logo mark
- Apply the horizontal lockup (icon + "ARCHE" + tagline) where appropriate
- Product ecosystem accent palette from AGENTS.md:
  - Studio = Teal `#22d3ee`, Flows = Emerald `#34d399`, Workers = Violet `#818cf8`, Guard = Rose `#f472b6`, Registry = Amber `#fbbf24`, Runtime = Orange `#fb923c`, Audit = Coral `#fb7185`

**Layout (based on redesign-mockup-v2.html structure but denser):**

The mockup should show the Studio app with:

1. **Sidebar** — glass-effect sidebar with Arche Gateway icon at top, nav items for all core modules (Architect Chat, Agent Builder, Control Plane, Workbench, Prompt Library, Knowledge Hub, History, Settings). Active nav item glows teal. Nav items grouped: Agent Design (Chat, Builder), Orchestration (Control Plane, Workbench), Knowledge (Library, Hub), System (History, Settings).

2. **Top bar** — thin glass header with breadcrumb, search, user avatar, and status indicator.

3. **Dashboard/Home screen** — 3×2 metric card grid showing:
   - Sessions Today (large number + trend arrow)
   - Agents Active (with colored dots by ecosystem accent)
   - Avg Prompt Quality (sparkline)
   - Tokens Consumed (with cost)
   - Engine Status (green/amber/red with uptime)
   - Recent Activity (compact feed)

4. **Architect Chat screen** — dual-panel layout: prompt input area with glass card styling, response panel streaming in with typewriter effect. Suggested prompts as glass chips below input.

5. **Product badge** — small ecosystem badge showing which Arche product this is (Studio = teal)

### Interaction Notes
- Mockup is static HTML/CSS only — no JS needed
- Show designed state with realistic dummy data
- Use sample agent names, session IDs, token counts
- Responsive to viewport, but optimize for desktop (1200px+)
- Navigation tabs are clickable to show different screens
- Use data-driven visual hierarchy — denser dashboards, tighter whitespace

## Constraints

- **Single self-contained HTML file** — all CSS inline, no external deps except Google Fonts
- **No build step** — must work opened directly in browser
- **Use Drift v2 CSS variable names** (from drift.css) so the design tokens are consistent
- **Do NOT modify any existing app source code** — this is a mockup/prototype only
- **File goes in `docs/studio-drift-mockup.html`**

## Deliverable

`docs/studio-drift-mockup.html` — a single HTML file that serves as the visual spec for the Arche Studio Drift v2 look/feel refresh. Open it in browser to see the design.
