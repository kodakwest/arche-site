# Publishing Guide — Arche Site

How to add content and deploy to `agentarche.com`.

---

## Quick Reference

| Action | Command |
|---|---|
| Start dev server | `npm run docs:dev` |
| Build for production | `npm run docs:build` |
| Preview build output | `npm run docs:preview` |
| Create a new doc | Add `.md` to `docs/` |
| Create a new blog post | Add `.md` to `blog/` |

---

## Content Types

### Docs
Docs go in `/docs/` as markdown files with frontmatter:

```markdown
---
title: "Document Title"
description: Brief description for SEO
---

# Document Title

Content here...
```

After adding a new doc, update `.vitepress/config.mjs` to add it to the sidebar:

```js
sidebar: {
  '/docs/': [
    {
      text: 'Section Name',
      items: [
        { text: 'Page Title', link: '/docs/page-slug' }
      ]
    }
  ]
}
```

### Blog Posts
Blog posts go in `/blog/` as markdown files with frontmatter:

```markdown
---
title: "Post Title"
description: Brief description for SEO / preview
date: 2026-06-04
---

# Post Title

Content here...
```

After adding, update `blog/index.md` to add a link to the new post.

---

## Deployment Pipeline

The site is deployed via **Cloudflare Pages** from the `master` branch of `kodakwest/arche-site`.

### Full Promotion Flow

```
local change
  ↓
feature branch (feature/*, docs/*, chore/*)
  ↓
commit + push to GitHub
  ↓
PR + CI (npm run docs:build)
  ↓
Cloudflare preview (auto-generated per branch)
  ↓
UAT verification (check preview URL)
  ↓
merge to main
  ↓
git push origin main:master
  ↓
Cloudflare production deploy
```

### Step-by-Step

**1. Create a branch**

```bash
git checkout main
git pull
git checkout -b docs/new-page
```

**2. Write content**

Add/modify markdown files in `docs/` or `blog/`.

**3. Build and test locally**

```bash
npm run docs:build
npm run docs:preview
# Open http://localhost:4173 to verify
```

**4. Commit and push**

```bash
git add .
git commit -m "docs: add new page about X"
git push -u origin docs/new-page
```

**5. Check the preview**

Cloudflare Pages auto-deploys a preview at `https://<branch>.arche-site.pages.dev`.

**6. Open a PR**

On GitHub, open a PR to `main`. The PR description should include:
- What changed (files added/modified)
- Preview URL to verify
- Any content decisions worth noting

**7. Merge to main**

```bash
git checkout main
git pull
git merge docs/new-page
git push origin main
```

**8. Deploy to production**

```bash
git push origin main:master
```

Cloudflare Pages builds and deploys `master` branch to `agentarche.com`.

Wait 1-2 minutes, then verify:
```bash
curl -sI https://agentarche.com/docs/new-page | head -1
```

---

## Content Standards

- **Frontmatter required** on every new page: `title`, `description`
- **Dark theme** — don't override colors; use the CSS variables in `custom.css`
- **Images** go in `public/assets/` and reference as `/assets/filename.png`
- **External links** open in new tabs: `[text](url){target="_blank"}`
- **Internal links** use relative paths: `[Operating Model](/docs/operating-model)`
- **Date format** for blog posts: `YYYY-MM-DD`

---

## Writing Tips

- Keep it scannable. Use headings, tables, and bullet lists.
- Code blocks use triple backticks with language tag: ```yaml
- The operating model doc is the philosophical anchor — link back to it from other docs.
- Blog posts should be practical, not promotional. "Here's how we solved X."
- Google Preferred Sources button: only on blog posts intended as external credibility signals.

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---|---|---|
| Build fails with `module not found` | Missing dependencies | `npm install` |
| Page returns 404 | Not in sidebar or wrong path | Check sidebar config in `.vitepress/config.mjs` |
| Marketing page looks wrong | Build not re-run | `npm run docs:build` |
| Cloudflare deploy stuck | Build error in dashboard | Check CF Pages build logs |
| "Home" nav shows blank page | SPA routing issue | Ensure Home nav link has `target: '_self'` |
