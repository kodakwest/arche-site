---
title: "VitePress Docs & Blog — Implementation Plan"
artifact_type: Implementation_Plan
domain: Static Site; Documentation; Cloudflare Pages
systems: VitePress; Node.js; Cloudflare Pages; Drift Design System
primary_entities: Arche Site; VitePress; docs; blog; operating-model; Cloudflare Pages
last_updated: 2026-06-04
status: ready
---

# VitePress Docs & Blog — Implementation Plan

> **For Codex:** Implement this plan task-by-task. Branch: `feature/vitepress-docs-blog`.

**Goal:** Add VitePress to the arche-site repo to turn `docs/` and `blog/` markdown content into a navigable documentation site AND blog, while preserving all existing static marketing pages.

**Architecture:** Hybrid site. Existing static HTML marketing pages move to VitePress's `public/` directory (copied verbatim to build output). New markdown content in `docs/` and `blog/` directories gets auto-rendered with VitePress. Single build step, single deploy. VitePress dark theme customized to match the Drift Design System brand.

**Tech Stack:** VitePress (latest), Node.js 22, npm, Cloudflare Pages

---

### Task 1: Initialize VitePress

**Objective:** Install VitePress and set up the config skeleton.

**Files:**
- Create: `package.json`
- Create: `.vitepress/config.mjs`
- Create: `.vitepress/theme/index.js`
- Create: `.vitepress/theme/custom.css`

**Step 1: Init package.json and install VitePress**

Run from repo root:
```bash
cd /mnt/s/Projects/arche-site
npm init -y
npm install --save-dev vitepress vue
```

**Step 2: Create VitePress config**

Create `.vitepress/config.mjs` with:
- `title: "AgentArche Docs"`
- `description: "Build secure agent workflows. Run where data lives."`
- `outDir: 'dist'` (relative to project root)
- `srcExclude: ['node_modules/**', 'public/**', '.git/**', '.wrangler/**', 'cache/**']`
- `cleanUrls: true`
- `lastUpdated: true`
- `appearance: 'dark'` (force dark theme)
- Custom nav structure:
  ```
  nav:
    - text: Docs
      link: /docs/operating-model
    - text: Blog
      link: /blog/
    - text: Home
      link: /
  ```
- `sidebar` for docs section with operating model as the first entry
- `socialLinks` (GitHub link to repo)
- `base: '/'`

**Step 3: Create custom theme**

Create `.vitepress/theme/index.js`:
```js
import DefaultTheme from 'vitepress/theme'
import './custom.css'
export default DefaultTheme
```

Create `.vitepress/theme/custom.css` with Drift Design System overrides:
- Backgrounds: `--bg-deep: #0B0B12`, `--bg-base: #0c0d0f`, `--panel: #111215`
- Ink: `--ink: #f2f0e8`, `--ink-secondary: #a8a6a0`
- Accent: `--accent-primary: #22d3ee`, `--accent-secondary: #34d399`
- Fonts: 'Inter' (sans), 'JetBrains Mono' (mono)
- Load Google Fonts in the head via `transformHead` in config

Target the VitePress CSS custom properties for full theming:
```css
:root {
  --vp-c-bg: #0B0B12;
  --vp-c-bg-alt: #0c0d0f;
  --vp-c-bg-elv: #111215;
  --vp-c-text: #f2f0e8;
  --vp-c-text-2: #a8a6a0;
  --vp-c-brand: #22d3ee;
  --vp-c-brand-dark: #22d3ee;
  --vp-c-brand-light: #67e8f9;
  --vp-font-family-base: 'Inter', system-ui, sans-serif;
  --vp-font-family-mono: 'JetBrains Mono', monospace;
  /* ... more overrides */
}
```

**Step 4: Add build scripts to package.json**

```json
{
  "scripts": {
    "docs:dev": "vitepress dev",
    "docs:build": "vitepress build",
    "docs:preview": "vitepress preview"
  }
}
```

**Step 5: Test the build**

```bash
cd /mnt/s/Projects/arche-site
npm run docs:build
```

Expected: Build succeeds with no errors, creates `dist/` directory.

---

### Task 2: Move Existing Static Pages to public/

**Objective:** All existing HTML marketing pages and their assets go into `public/` so VitePress copies them verbatim to the build output.

**Files to move** (from repo root → `public/`):
- `index.html` → `public/index.html`
- `chat-deck-landing.html` → `public/chat-deck-landing.html`
- `control-plane.html` → `public/control-plane.html`
- `roadmap.html` → `public/roadmap.html`
- `workbench.html` → `public/workbench.html`
- `drift.css` → `public/drift.css`
- `drift-brand-catalogue.html` → `public/drift-brand-catalogue.html`
- `drift-chat-mockup.html` → `public/drift-chat-mockup.html`
- `drift-chat-suite.html` → `public/drift-chat-suite.html`
- `drift-design-guide.html` → `public/drift-design-guide.html`
- `drift-chat-deck-phase2-design.md` → `public/drift-chat-deck-phase2-design.md`
- `architect-workbench-spec.md` → `public/architect-workbench-spec.md`
- `ecosystem-mockup-brief.md` → `public/ecosystem-mockup-brief.md`
- Entire `assets/` directory → `public/assets/`
- Entire `diagrams/` directory → `public/diagrams/`
- `.deploy-trigger` → `public/.deploy-trigger`

**NOT moved** (stay at root):
- `.vitepress/` (VitePress config)
- `docs/` (markdown content)
- `blog/` (blog content)
- `node_modules/`
- `.git/`, `.agents/`, `.codex/`, `.wrangler/`
- `AGENTS.md`
- `package.json`, `package-lock.json`
- `.gitignore`

**Step 1: Create public/ and move files**

```bash
cd /mnt/s/Projects/arche-site
mkdir -p public
git mv index.html public/
git mv chat-deck-landing.html public/
git mv control-plane.html public/
git mv roadmap.html public/
git mv workbench.html public/
git mv drift.css public/
git mv drift-brand-catalogue.html public/
git mv drift-chat-mockup.html public/
git mv drift-chat-suite.html public/
git mv drift-design-guide.html public/
git mv "drift-chat-deck-phase2-design.md" public/
git mv architect-workbench-spec.md public/
git mv ecosystem-mockup-brief.md public/
git mv .deploy-trigger public/
git mv assets/ public/
git mv diagrams/ public/
```

**Step 2: Update .gitignore**

Ensure `node_modules/`, `dist/`, and `.vitepress/cache/` are in `.gitignore`.

**Step 3: Test the build**

```bash
cd /mnt/s/Projects/arche-site
npm run docs:build
```

Expected: Build succeeds. Verify `dist/index.html` is the marketing page (from public/), and `dist/drift.css` exists.

---

### Task 3: Create Docs Section

**Objective:** Set up the docs content structure with the operating model as the first entry.

**Files:**
- Keep: `docs/operating-model.md` (already exists)
- Create: `docs/index.md` (docs landing page)

**Step 1: Create docs landing page**

Create `docs/index.md`:
```markdown
# Arche Docs

Design, run, and govern agent workflows.

## Getting Started

- [From AI Tools to AI Operations](/docs/operating-model) — The philosophy behind AgentArche
- [Arche Command Spec](/docs/arche-command) — Governance layer architecture (coming soon)
- [Arche Studio Guide](/docs/studio) — Using the web UI (coming soon)

## Key Concepts

- **Routing** — Send work to the right agent, model, or workflow
- **Governance** — Control what agents can access and do
- **Observability** — Trace every decision, tool call, and cost
- **Approval Gates** — Human-in-the-loop for sensitive actions
- **Deployment Discipline** — Safe promotion from experiment to production
```

**Step 2: Configure VitePress sidebar**

In `.vitepress/config.mjs`, add sidebar config for the docs section:

```js
sidebar: {
  '/docs/': [
    {
      text: 'Operating Model',
      items: [
        { text: 'From AI Tools to AI Operations', link: '/docs/operating-model' }
      ]
    },
    {
      text: 'Architecture',
      items: [
        { text: 'Arche Command (coming soon)', link: '/docs/arche-command' },
        { text: 'Studio Guide (coming soon)', link: '/docs/studio' }
      ]
    }
  ]
}
```

**Step 3: Test build**

```bash
cd /mnt/s/Projects/arche-site
npm run docs:build
```

Expected: Build succeeds. `dist/docs/index.html` and `dist/docs/operating-model.html` exist.

---

### Task 4: Set Up Blog Infrastructure

**Objective:** Create the blog structure so posts can be written in markdown and auto-rendered.

**Files:**
- Create: `blog/index.md` (blog listing page)
- Create: `blog/.vitepress/config.mjs` — NO, config is shared from root
- Create: `blog/first-post.md` (optional — first blog post template)

**Step 1: Create blog listing page**

Create `blog/index.md`:
```markdown
---
title: "Arche Blog"
---

# Blog

Thoughts on agent orchestration, governance, and building AI systems that survive contact with real work.
```

**Step 2: Configure VitePress blog nav**

In `.vitepress/config.mjs`, add blog to nav and optionally set up a blog theme.

For v0, keep it simple — no blog plugin. VitePress's default theme handles markdown files in `blog/` fine. We'll use a manual index for now.

**Step 3: Create a template first post**

Create `blog/getting-started-with-agent-governance.md`:
```markdown
---
title: "Getting Started with Agent Governance"
date: 2026-06-04
author: Arche Team
---

# Getting Started with Agent Governance

*Coming soon — placeholder for the first real post.*
```

**Step 4: Add blog to sidebar config**

```js
sidebar: {
  '/blog/': [
    {
      text: 'Posts',
      items: [
        { text: 'Getting Started with Agent Governance', link: '/blog/getting-started-with-agent-governance' }
      ]
    }
  ]
}
```

**Step 5: Test build**

```bash
cd /mnt/s/Projects/arche-site
npm run docs:build
```

Expected: Build succeeds. `dist/blog/index.html` and `dist/blog/getting-started-with-agent-governance.html` exist.

---

### Task 5: Update Cloudflare Pages Build Config

**Objective:** Update the Cloudflare Pages build settings to run VitePress and serve from `dist/`.

**Step 1: Configure Cloudflare Pages build**

Cloudflare Pages dashboard settings (via wrangler or dashboard):
- **Build command:** `npm run docs:build`
- **Build output directory:** `dist`
- **Root directory:** `/` (project root)

These settings can't be committed as code to this repo unless we add a `wrangler.toml`. For now, note that they need to be set in the Cloudflare Pages dashboard.

**Step 2: Verify local build**

```bash
cd /mnt/s/Projects/arche-site
npm run docs:build
ls dist/
```

Expected: `dist/` contains index.html (marketing page), drift.css, docs/, blog/, assets/, diagrams/, and all other static files.

**Step 3: Test the build output**

```bash
cd /mnt/s/Projects/arche-site
npx serve dist/
```

Open in browser and verify:
- `http://localhost:5000/` → marketing landing page renders correctly with drift.css
- `http://localhost:5000/docs/operating-model` → doc page renders with dark theme
- `http://localhost:5000/blog/` → blog listing renders
- `http://localhost:5000/roadmap.html` → roadmap page still works

---

### Task 6: Update AGENTS.md

**Objective:** Document the new build process and architecture.

**Files:**
- Modify: `AGENTS.md`

Add a section covering:
- VitePress is the static site generator for docs and blog
- Existing marketing HTML pages live in `public/` and get copied verbatim
- Build command: `npm run docs:build`
- Dev server: `npm run docs:dev`
- Preview: `npm run docs:preview`
- New content goes in `docs/` or `blog/` as markdown with frontmatter

---

### Task 7: Commit and Push

**Objective:** All changes committed on feature branch and pushed.

```bash
cd /mnt/s/Projects/arche-site
git add -A
git status --short
git commit -m "feat: add VitePress for docs and blog with hybrid static site architecture"
git push -u origin feature/vitepress-docs-blog
```

---

## Verification

After deploy:

1. **`agentarche.com/`** — Marketing page loads with all styles and assets
2. **`agentarche.com/docs/operating-model`** — Doc page renders with dark theme
3. **`agentarche.com/blog/`** — Blog listing shows
4. **`agentarche.com/roadmap.html`** — Old marketing pages still work
5. **Mobile** — Check docs/blog at 375px width
6. **Search** — VitePress built-in search works on docs pages

## Edge Cases

- **No index.md at root** — public/index.html takes precedence; VitePress copies it to dist/index.html during build (public/ files override generated ones)
- **Relative asset paths in old HTML** — paths like `href="drift.css"` and `src="assets/..."` remain valid because public/ contents go to dist/ root
- **Existing docs/operating-model.md already in git** — it's already tracked; VitePress will pick it up and render it
- **Inter-page links between marketing pages** — `<a href="roadmap.html">` still works since both pages are at dist/ root
