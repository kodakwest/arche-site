# Arche Brand UAT — Mockup Compliance Check

## Canonical Brand Source

The single source of truth is at:
`S:\Projects\_shared-arche-assets\branding\`

Read these in order:

1. `BRAND.md` — full guidelines: icons, colors, typography, voice
2. `arche-icon.svg` — the canonical Gateway icon (arch + routed beam + origin node)
3. `arche-logo-horizontal.svg` — preferred logo lockup
4. `arche-brand-contact-sheet.html` — full brand reference viewer

## Mockups to UAT

### 1. Studio Drift Mockup
Path: `S:\Projects\arche\studio\docs\studio-drift-mockup.html`

Check against brand standard:
- Gateway icon: should match `arche-icon.svg` (arch `M3.5 22 L3.5 10 C3.5 3 20.5 3 20.5 10 L20.5 22`, horizontal beam, origin circle at top, active node at center)
- Color palette: Drift v2 tokens (`--bg-deep: #0B0B12`, `--accent-primary: #22d3ee`, etc.)
- Typography: Inter + JetBrains Mono
- Product badge: "STUDIO" badge in teal `#22d3ee`

### 2. Site Mockups
Paths in `S:\Projects\arche-site\`:
- `index.html` (main marketing page)
- `docs/redesign-mockup-v2.html` (legacy mockup)

Check against brand standard:
- No "AgentFlow" text anywhere
- Gateway icon is the arch+routed beam+node mark, not a simple triangle
- Color palette uses Drift v2 tokens, not `#0e0f0d`/`#56b6a7`/`#d7a928`
- Logo lockups use correct SVG paths

## UAT Process

For each mockup:
1. Open the HTML file in browser
2. Visually compare against brand contact sheet (`arche-brand-contact-sheet.html`)
3. Note any mismatches: wrong icon, wrong colors, stale naming, missing badges
4. Fix the mockup to match the brand standard
5. Re-check

## What to Fix

Run this for each mockup:

```bash
grep -n "AgentFlow\|agentflow\|#0e0f0d\|#171713\|#56b6a7\|#d7a928" <path-to-mockup>
```

For any match, replace:
- "AgentFlow" → "Arche"
- "#0e0f0d" → "#0B0B12"
- "#171713" → "#111215"
- "#56b6a7" → "#22d3ee"
- "#d7a928" → "" (remove, deprecated)

If the icon uses a different SVG path than the canonical Gateway icon, replace it with:
```svg
<path d="M3.5 22 L3.5 10 C3.5 3 20.5 3 20.5 10 L20.5 22" stroke="#22d3ee" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M3.5 14 L20.5 14" stroke="#22d3ee" stroke-width="1.5" stroke-linecap="round"/>
<circle cx="12" cy="3.5" r="1.5" fill="#22d3ee"/>
```

## Deliverable

Report: for each mockup, list what was fixed and confirm it now matches the brand standard.
