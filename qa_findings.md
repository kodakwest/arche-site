## Brand Compliance QA Findings

I have reviewed the preview deployment for the `chore/brand-compliance` branch and ran tests across the marketing site pages.

### 1. Verification of Branding
The Arche branding successfully renders correctly on all primary pages (Home, Chat Deck, Workbench, Control Plane).

### 2. Nav Overlap Issue on Home Hero (Bug Fix)
**Issue:** On the homepage (`index.html`), the `.hero-mesh` and `.hero-glow` elements have negative z-indices within `.hero-section`. Because `.hero-section` did not establish its own stacking context, these elements leaked into the document root context and incorrectly positioned themselves over the sticky navigation header, making the gateway icon and labels unclickable/partially hidden.
**Required Fix:** Adding `isolation: isolate;` to the `.hero-section` CSS class fixes the z-index/stacking context conflict.

```css
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  isolation: isolate; /* <-- Fix for nav overlap */
}
```

### 3. AgentFlow & OG Brand References
- **AgentFlow Branding:** Successfully removed from all user-facing live HTML content. The only remaining references are correctly scoped to historical/UAT documentation files.
- **OG Tags:** Confirmed `<meta property="og:url" content="https://agentarche.com">` is present and consistent on `index.html`.

### 4. Responsive Layout Checks
Screenshots generated at 375px (mobile) and 980px (desktop) breakpoints for:
- Home (`index.html`)
- Chat Deck (`chat-deck-landing.html`)
- Workbench (`workbench.html`)
- Control Plane (`control-plane.html`)
Layouts degrade gracefully and content remains readable without unexpected horizontal overflow.

### 5. SVG Console Errors
Automated headless browser checks (Playwright) attached console listeners across all marketing pages. **No console errors** were detected regarding SVG parsing, broken references, or handling of the new Drift v2 color tokens.
