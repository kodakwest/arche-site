# Arche Brand Guidelines

> Canonical brand assets and usage rules for the Arche ecosystem.
> This file lives at `assets/branding/BRAND.md` in every Arche repo.

## Master Logo: Arche Gateway

The Arche Gateway icon is the primary brand mark — an arch with a routed beam and origin node.

**Icon variations:**

| File | Usage |
|------|-------|
| `arche-icon.svg` | Full color — primary use on dark backgrounds |
| `arche-icon-white.svg` | Solid white — light/dynamic backgrounds |
| `arche-icon-monochrome.svg` | Single-color — favicon, avatar, constrained spaces |
| `arche-icon-gateway.svg` | Gateway mark (arch + beam + node) — canonical icon |
| `arche-icon-flowmark.svg` | Flows product icon mark |
| `arche-icon-guard.svg` | Guard product icon mark |

**Logo lockups:**

| File | Usage |
|------|-------|
| `arche-logo-horizontal.svg` | Header, navigation, docs — preferred lockup |
| `arche-logo-vertical.svg` | Hero sections, splash screens |

**Reference:**

| File | Usage |
|------|-------|
| `arche-logo-contact-sheet.html` | All logo variations in one view |

## Product Ecosystem Badges

Product badges use a consistent arch silhouette with product-specific accent colors.

| Badge | Accent | Hex |
|-------|--------|-----|
| `arche-badge-studio.svg` | Teal | `#22d3ee` |
| `arche-badge-flows.svg` | Emerald | `#34d399` |
| `arche-badge-workers.svg` | Violet | `#818cf8` |
| `arche-badge-guard.svg` | Rose | `#f472b6` |
| `arche-badge-registry.svg` | Amber | `#fbbf24` |
| `arche-badge-runtime.svg` | Orange | `#fb923c` |
| `arche-badge-audit.svg` | Coral | `#fb7185` |
| `arche-badge-engine.svg` | Emerald | `#10b981` |

## Color Palette

### Dark Theme (default)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-deep` | `#0B0B12` | Deepest background (body) |
| `--bg-base` | `#0c0d0f` | Primary surface |
| `--panel` | `#111215` | Card/panel surface |
| `--surface` | `#17181c` | Raised surface (hover, active) |
| `--ink` | `#f2f0e8` | Primary text |
| `--ink-secondary` | `#a8a6a0` | Secondary/body text |
| `--ink-muted` | `#6b6a66` | Disabled/muted text |
| `--border-panel` | `rgba(255,255,255,0.05)` | Default border |
| `--accent-primary` | `#22d3ee` | Primary actions, links |
| `--accent-tertiary` | `#818cf8` | Secondary/violet accent |
| `--glass-bg` | `rgba(17,18,21,0.75)` | Glass panel background |
| `--glass-border` | `rgba(34,211,238,0.15)` | Glass panel border |
| `--glass-blur` | `16px` | Glass backdrop-filter |

### Light Theme

| Token | Value |
|-------|-------|
| `--bg-base` | `#f0ede8` |
| `--panel` | `#ffffff` |
| `--ink` | `#1a1a1a` |
| `--accent-primary` | `#0ea5e9` |
| `--glass-bg` | `rgba(255,255,255,0.8)` |

## Typography

| Role | Font | Weight |
|------|------|--------|
| UI / Body | Inter (sans-serif) | 400, 500, 600, 700 |
| Code / Tokens | JetBrains Mono (monospace) | 400, 500, 600 |

## Brand Voice

| Attribute | Standard |
|-----------|----------|
| Tone | Architectural, authoritative, precise |
| Temperature | Professional but not corporate |
| Avoid | Magic, wizards, brains, sparkles, "democratizing", robot mascots |
| Pronouns | "We build. You govern." |
| Metaphors | Architecture, governance, workshops, craft |
| Tagline | **Build secure agent workflows.** |

## Dos and Don'ts

### Do
- Use the Gateway icon as the primary mark
- Prefer horizontal lockup for navigation and headers
- Maintain the teal accent as primary interactive color
- Use glass panels for elevated UI surfaces
- Keep dark theme as default

### Don't
- Stretch or distort the Gateway icon
- Replace the icon with a generic arch or AI symbol
- Use AgentFlow name or assets anywhere
- Mix accent colors without purpose (each accent maps to a product)
- Use light theme as default (dark is primary)

## Directory Structure

Every Arche repo MUST have this branding structure:

```
assets/branding/
├── BRAND.md                    # This file
├── arche-icon.svg              # Full color icon
├── arche-icon-white.svg        # White icon
├── arche-icon-monochrome.svg   # Monochrome icon
├── arche-icon-gateway.svg      # Gateway mark
├── arche-icon-flowmark.svg     # Flowmark icon
├── arche-icon-guard.svg        # Guard icon
├── arche-logo-horizontal.svg   # Horizontal lockup
├── arche-logo-vertical.svg     # Vertical lockup
├── arche-favicon.svg           # Favicon
├── arche-logo-contact-sheet.html  # Logo reference
├── arche-badge-studio.svg      # Product badge
├── arche-badge-flows.svg       # Product badge
├── arche-badge-workers.svg     # Product badge
├── arche-badge-guard.svg       # Product badge
├── arche-badge-registry.svg    # Product badge
├── arche-badge-runtime.svg     # Product badge
├── arche-badge-audit.svg       # Product badge
└── arche-badge-engine.svg      # Product badge
```

## Canonical Source

The master brand asset source is at:
`/home/tsrwest/workspace/arche-rebrand/assets/branding/`

Copy from there when updating any repo's `assets/branding/`.
