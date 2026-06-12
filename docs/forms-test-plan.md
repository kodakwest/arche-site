---
title: "Arche Site Forms — Test Plan & Bug Analysis"
artifact_type: Implementation_Plan
domain: Cloudflare Pages; D1; Email
systems: arche-site; Cloudflare Pages; D1; Pages Functions; Email Routing
primary_entities: arche-site; forms pipeline; D1 binding; ctx scope
last_updated: 2026-06-04
status: ready
---

# Arche Site Forms — Test Plan

## Bug Analysis

### Bug 1: D1 binding scoped to `[env.production]` only

**Wrangler config** (`wrangler.toml`):
```toml
[env.production]
[[env.production.d1_databases]]
binding = "arche_leads"
database_name = "arche_leads"
database_id = "67770ef1-8b0f-47d6-a59a-2b530a55a4da"
```

The D1 binding is only defined under `[env.production]`. Cloudflare Pages **preview** deployments (non-production branches like `chore/email-lead-form`) do NOT get this binding. When the Pages Function calls `env.arche_leads.prepare(...)` at line 88, `env.arche_leads` is `undefined`, throwing a TypeError caught by the catch block at line 114 → returns 500.

**Evidence:**
- Both hero form (source='hero') and contact form (source='contact') return: `{"success":false,"error":"Something went wrong. Please try again."}`
- D1 query returns 0 rows — no test data made it through
- The production deployment (currently on `master` without the forms changes) doesn't have the function at all

### Bug 2: `ctx` not destructured in Pages Function handler

**Function signature** (`functions/api/forms/lead.ts`, line 18):
```typescript
export async function onRequestPost({ request, env }: { request: Request; env: Env }): Promise<Response>
```

**Line 104** (inside the contact form branch):
```typescript
ctx.waitUntil(sendNotification(body, env));
```

`ctx` is never destructured from the context param. Cloudflare Pages Functions pass `{ request, env, ctx, ... }` to the handler, but `ctx` isn't in the destructuring pattern. Calling `ctx.waitUntil(...)` throws a `ReferenceError`.

**Currently masked by Bug 1** — code never reaches this line because the D1 insert fails first. After fixing Bug 1, Bug 2 would surface on contact form submissions.

## Fix

### Fix 1: Move D1 binding to top level in wrangler.toml

Remove the D1 binding from `[env.production]` and place it at the top level so it's inherited by all environments (production + preview):

```toml
[[d1_databases]]
binding = "arche_leads"
database_name = "arche_leads"
database_id = "67770ef1-8b0f-47d6-a59a-2b530a55a4da"
```

If environment isolation is desired (preview data vs production data), configure a separate preview D1 binding in the Cloudflare Pages dashboard instead.

### Fix 2: Add `ctx` to function destructuring

```typescript
export async function onRequestPost({ request, env, ctx }: { request: Request; env: Env; ctx: EventContext<Env, string, Record<string, unknown>> }): Promise<Response>
```

## Test Cases

### Pre-Flight (Codex Fix Verification)

| # | Test | Action | Expected Result | Verification |
|---|------|--------|-----------------|-------------|
| 1 | wrangler config parse | `npx wrangler types` | No errors. D1 binding generated in types | CLI exit 0 |
| 2 | TypeScript compile | `npx tsc --noEmit` or check in `functions/` | No `ctx`-related errors | CLI exit 0 |

### Environment Tests (against preview URL)

| # | Test | Action | Expected Result | Verification |
|---|------|--------|-----------------|-------------|
| 3 | Hero form — valid email | POST to `/api/forms/lead` with `{"email":"test@example.com","source":"hero"}` | HTTP 200, `{"success":true,"message":"You're on the list!"}` | curl response |
| 4 | Hero form — missing email | POST with `{"source":"hero"}` | HTTP 400, `{"success":false,"error":"Email and source are required."}` | curl response |
| 5 | Hero form — bad email format | POST with `{"email":"notanemail","source":"hero"}` | HTTP 400, `{"success":false,"error":"Invalid email format."}` | curl response |
| 6 | Contact form — full submission | POST with `{"email":"test@example.com","name":"Test User","source":"contact","message":"Test consulting inquiry"}` | HTTP 200, `{"success":true,"message":"Message received."}` | curl response |
| 7 | Contact form — missing source | POST with `{"email":"test@example.com"}` | HTTP 400, `{"success":false,"error":"Email and source are required."}` | curl response |
| 8 | Contact form — invalid source | POST with `{"email":"test@example.com","source":"invalid"}` | HTTP 400, `{"success":false,"error":"Invalid source."}` | curl response |
| 9 | D1 — lead persisted | `SELECT * FROM leads ORDER BY id DESC LIMIT 5` | 2+ rows (hero + contact), correct email/source/message | `npx wrangler d1 execute arche_leads --command="SELECT * FROM leads ORDER BY id DESC;" --remote` |
| 10 | CORS — OPTIONS preflight | OPTIONS to `/api/forms/lead` | HTTP 204 with CORS headers | curl -X OPTIONS |

### UI Tests

| # | Test | Action | Expected Result | Verification |
|---|------|--------|-----------------|-------------|
| 11 | Hero form UI — valid email | Open preview, type email, click Get Early Access | Button shows "✓ Access Granted", input shows "Transmission logged" | Visual check at 375px + 980px |
| 12 | Hero form UI — network error | Disconnect network, submit | Button shows "✗ Connection failed" | DevTools offline mode |
| 13 | Contact form UI — full submit | Fill all fields, click Submit Inquiry | Card shows "[Transmission Received]" with success message | Visual check at 375px + 980px |
| 14 | Contact form UI — server error | POST returns error (inject via network conditions) | Card shows "Something went wrong. Please email us..." | Visual check |

### Production Deploy

| # | Test | Action | Expected Result | Verification |
|---|------|--------|-----------------|-------------|
| 15 | Production deploy | Merge → push main:master | CF Pages production build succeeds | Dashboard |
| 16 | Production smoke | Repeat tests 3-10 against agentarche.com | Same results | curl + visual |
| 17 | Email notification | Submit contact form | Email arrives at CONTACT_EMAIL_TO | Andrew/Mike check inbox |

## Edge Cases & Failure Modes

- **Turnstile not configured** — Pages Function handles this gracefully (no secret key → skip verification). Add Turnstile as a separate follow-up if desired.
- **Multiple rapid submissions from same IP** — No rate limiting implemented yet. Low risk for early access but worth noting.
- **D1 write contention** — Auto-increment handles concurrent inserts. No conflict risk.
- **MailChannels deliverability** — Free tier has no SLA. If emails don't arrive, MailChannels may be rate-limiting. Noisy failure (console.error caught, form still accepts).

## Deployment Gate

Same as standard:

```
Branch (chore/email-lead-form)
  → PR
  → CI checks (lint, build)
  → Preview deploy (auto)
  → UAT verification (tests 3-14 pass)
  → Merge to main
  → Push main:master (production deploy)
  → Production UAT (tests 15-17)
```

## Graph Seed: Entity Relationships

arche-leads-form -> posts to -> pages-function-lead
pages-function-lead -> inserts into -> d1-arche-leads
d1-binding -> scoped to -> production-environment (bug)
pages-function-lead -> references -> ctx (not destructured, bug)
fix-1 -> moves d1-binding to -> top-level wrangler config
fix-2 -> adds ctx to -> function destructuring

## Retrieval Keywords

arche site forms, d1 binding, pages function, ctx waituntil, wrangler config, test plan, lead capture, contact form, email notification, preview environment

## Boundary Notes

This test plan covers the forms pipeline on arche-site only. It does not cover Arche Studio, Arche Command, or the Control Plane. Email Routing (andrew@ forwarding) is a separate concern tracked in the session handoff.
