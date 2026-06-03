# Arche Brand System

> Canonical brand source for all Arche repos.
> **This directory** (`_shared-arche-assets/branding/`) is the single source of truth.
> Copy from here when updating any repo's `assets/branding/`.

## Master Mark: Gateway Icon

The Arche Gateway icon is an architectural arch forming an 'A', with a routed execution beam, origin point, and active execution node.

### Icon Files

| File | Description | Color |
|------|-------------|-------|
| `arche-icon.svg` | Master Gateway icon, full color | Teal `#22d3ee` on transparent |
| `arche-icon-white.svg` | Light mode variant | Dark `#1a1a1a` for light backgrounds |
| `arche-icon-monochrome.svg` | Dark bg variant | Ink `#f2f0e8` for dark backgrounds |
| `arche-icon-gateway.svg` | Standalone Gateway mark | Teal `#22d3ee` |
| `arche-favicon.svg` | 16px optimized | Teal `#22d3ee` |

### Logo Lockups

| File | Description |
|------|-------------|
| `arche-logo-horizontal.svg` | Icon + "ARCHE" + tagline "BUILD SECURE AGENT WORKFLOWS" |
| `arche-logo-vertical.svg` | Icon stacked above "ARCHE" + tagline |

### Reference

| File | Description |
|------|-------------|
| `arche-brand-contact-sheet.html` | Full brand system: all logos, colors, typography in one HTML view |

## Product Ecosystem Badges

8 product badges using a consistent arch silhouette with product-specific accent colors.

| Badge | Product | Accent | Hex |
|-------|---------|--------|-----|
| `arche-badge-studio.svg` | Studio | Teal | `#22d3ee` |
| `arche-badge-flows.svg` | Flows | Emerald | `#34d399` |
| `arche-badge-workers.svg` | Workers | Violet | `#818cf8` |
| `arche-badge-guard.svg` | Guard | Rose | `#f472b6` |
| `arche-badge-registry.svg` | Registry | Amber | `#fbbf24` |
| `arche-badge-runtime.svg` | Runtime | Orange | `#fb923c` |
| `arche-badge-audit.svg` | Audit | Coral | `#fb7185` |
| `arche-badge-engine.svg` | Engine | Emerald | `#10b981` |

## Color Palette — Drift v2

### Dark Theme (default)

| Token | Value | Role |
|-------|-------|------|
| `--bg-deep` | `#0B0B12` | Deepest background |
| `--bg-base` | `#0c0d0f` | Primary surface |
| `--bg-alt` | `#030712` | Alt background |
| `--panel` | `#111215` | Card/panel surface |
| `--surface` | `#17181c` | Raised surface |
| `--border-panel` | `rgba(255,255,255,0.05)` | Default border |
| `--ink` | `#f2f0e8` | Primary text |
| `--ink-secondary` | `#a8a6a0` | Secondary text |
| `--ink-muted` | `#6b6a66` | Disabled text |
| `--accent-primary` | `#22d3ee` | Primary accent |
| `--accent-secondary` | `#34d399` | Secondary accent |
| `--accent-tertiary` | `#818cf8` | Tertiary/violet accent |
| `--glass-bg` | `rgba(17,18,21,0.75)` | Glass panel bg |
| `--glass-border` | `rgba(34,211,238,0.15)` | Glass panel border |
| `--glass-blur` | `16px` | Glass blur radius |

### Light Theme

| Token | Value |
|-------|-------|
| `--bg-base` | `#f0ede8` |
| `--panel` | `#ffffff` |
| `--ink` | `#1a1a1a` |
| `--accent-primary` | `#0ea5e9` |
| `--glass-bg` | `rgba(255,255,255,0.8)` |

### Product Accent Colors

| Product | Color | Hex |
|---------|-------|-----|
| Studio | Teal | `#22d3ee` |
| Flows | Emerald | `#34d399` |
| Workers | Violet | `#818cf8` |
| Guard | Rose | `#f472b6` |
| Registry | Amber | `#fbbf24` |
| Runtime | Orange | `#fb923c` |
| Audit | Coral | `#fb7185` |
| Engine | Emerald | `#10b981` |

## Typography

| Role | Font | Usage |
|------|------|-------|
| UI / Body | Inter (sans-serif) | All UI text, headings, labels |
| Code / Tokens | JetBrains Mono (monospace) | Code blocks, agent prompts, session IDs |

## Brand Voice

| Attribute | Rule |
|-----------|------|
| Tone | Architectural, authoritative, precise |
| Temperature | Professional but not corporate |
| Avoid | Magic, wizards, brains, sparkles, "democratizing", robot mascots |
| Pronouns | "We build. You govern." |
| Tagline | **Build secure agent workflows.** |
| Metaphors | Architecture, governance, workshops, craft |

## Directory Standard

Every Arche repo MUST mirror this structure at `assets/branding/`:

```
assets/branding/
├── BRAND.md
├── arche-icon.svg
├── arche-icon-white.svg
├── arche-icon-monochrome.svg
├── arche-icon-gateway.svg
├── arche-favicon.svg
├── arche-logo-horizontal.svg
├── arche-logo-vertical.svg
├── arche-brand-contact-sheet.html
├── arche-badge-studio.svg
├── arche-badge-flows.svg
├── arche-badge-workers.svg
├── arche-badge-guard.svg
├── arche-badge-registry.svg
├── arche-badge-runtime.svg
├── arche-badge-audit.svg
└── arche-badge-engine.svg
```

## Drift CSS Integration

The Drift v2 CSS design system lives at `arche-site/drift.css`. Brand icons SHOULD be embedded as inline SVGs in CSS via data URIs where possible, for zero-network design system delivery.
