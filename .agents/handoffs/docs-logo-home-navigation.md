# Deployment Handoff: Docs Logo Home Navigation

## Branch

`fix/docs-logo-home-navigation`

## Purpose

Fix a transient VitePress client-side 404 when users click the `Arche Docs` logo/title from the docs surface.

## User-Observed Issue

On `https://agentarche.com/docs/`, clicking the `Arche Docs` logo/title navigates to `https://agentarche.com/`, but the VitePress app renders `404 | Arche`.

Refreshing the browser resolves the issue and loads the canonical homepage, which indicates this is not a true origin/server 404. It is a client-side routing issue.

## Root Cause

The VitePress logo/title link points to `/`. When clicked inside the docs app, VitePress intercepts the internal navigation and attempts to resolve `/` as a VitePress Markdown route.

The marketing homepage is a static page from `public/index.html`, not a VitePress Markdown route, so the client router shows the VitePress 404. A hard page load works because Cloudflare serves the static homepage directly.

## Change

Updated `.vitepress/config.mjs`:

```js
logoLink: { link: '/', target: '_self' },
```

This keeps the logo/title destination as `/` but forces a normal document navigation, matching the existing `Home` nav link behavior.

## Files Changed

- `.vitepress/config.mjs`
- `.agents/handoffs/docs-logo-home-navigation.md`

## Local Verification

Commands run:

```powershell
npm ci
npm run docs:build
```

Result:

```text
vitepress v1.6.4
build complete
```

Browser/plugin verification was performed through the LAN-IP workaround because the Codex browser plugin could not reach Windows loopback URLs in this session:

```powershell
npm run docs:preview -- --host 0.0.0.0 --port 4174
```

Verified flow:

1. Opened `http://192.168.50.98:4174/docs/`
2. Clicked the `Arche Docs` logo/title
3. Browser landed on `http://192.168.50.98:4174/`
4. Page title was `AgentArche Studio | Turn Prompts Into Pipelines`

## Cloudflare Preview UAT Checklist

After branch push and preview creation:

1. Open the Cloudflare preview URL for `fix/docs-logo-home-navigation`.
2. Navigate to `/docs/`.
3. Click the `Arche Docs` logo/title in the top-left nav.
4. Confirm the browser lands on `/`.
5. Confirm the homepage renders immediately without showing `404 | Arche`.
6. Refresh `/` and confirm the homepage still renders.
7. Repeat from `/docs/operating-model` and `/docs/publishing-guide`.
8. Confirm the regular `Home` nav link still works.
9. Confirm docs sidebar links still route normally inside the docs app.

## Promotion Notes

This is a narrow fix. It does not change content, homepage assets, routing rules, Cloudflare config, or the static marketing page.

Follow the repository gate:

1. Push branch.
2. Open PR or review packet.
3. Jules runs build/tests.
4. Cloudflare preview becomes the staging surface.
5. TARS verifies UAT against preview.
6. Merge to `main`.
7. Push `main` to `master` for production deploy.

