# Spec: Architect Chat + Prompt & Agent Workbench

## Overview
Two integrated capabilities that complete the Arche developer experience:
1. **Architect Chat** — An interactive agent that designs your agent architecture, then generates all the config files (AGENTS.md, .instructions.md, VS Code settings, copilot-instructions.md)
2. **Prompt & Agent Workbench** — A development environment for analyzing prompts, tracking agent performance metrics, and optimizing agent behavior

---

## Part 1: Architect Chat

### Purpose
Replace the manual 68-repeat AGENTS.md generation workflow with an interactive architect agent. Developer describes their project, Architect Chat asks clarifying questions, then outputs a complete agent-ready project configuration.

### Workflow
1. **Onboard** — Developer describes project: language, framework, domain, team size, tools
2. **Architect Chat asks:**
   - What agents will work on this? (Codex, agy, Jules, Copilot, custom?)
   - What's the build workflow? (spec-first, TDD, PR review?)
   - Where does data live? (local, cloud, hybrid?)
   - What are the security constraints?
   - Design system / visual conventions?
3. **Outputs generated:**
   - `AGENTS.md` — Project context, agent roles, conventions
   - `.instructions.md` — Copilot/GitHub agent instructions (if GHCP detected)
   - `.vscode/settings.json` — Editor config, lint rules, format-on-save
   - `.markdownlint.json` — Doc conventions
   - `.gitignore` — Project-specific ignores
   - `copilot-instructions.md` — GitHub Copilot custom instructions
   - Optional: `SKILL.md` templates for custom agent skills

### Key Features
- **Template library** — 20+ project archetypes (Node API, React SPA, Python CLI, Godot game, Rust crate, etc.)
- **Context-aware defaults** — Detects repo state, reads existing config, asks only what's missing
- **Diff preview** — Show what changed vs. what's new before writing files
- **Round-trips** — Update existing configs when project evolves, don't overwrite customizations

### Output Contract
```yaml
# Architect Chat generates:
files:
  - path: AGENTS.md
    template: archetype-agents
    vars: { project, domain, accent, agents, conventions }
  - path: .instructions.md
    template: copilot-instructions
    vars: { workflow, test-command, lint-command }
  - path: .vscode/settings.json
    template: vscode-settings
    vars: { format, lint, test }
```

---

## Part 2: Prompt & Agent Workbench

### Purpose
A development dashboard that brings the AI Engineer Coach capability directly into Arche. Analyze prompt quality, track session metrics, identify optimization opportunities — the things we learned from running Coach on our own workflow.

### Data Sources
- **Codex sessions** (Windows + WSL JSONL logs)
- **agy conversations** (Gemini CLI / Antigravity brain files)
- **Hermes session DB** (SQLite message store)
- **VS Code Coach extension** (if installed)

### Metrics Tracked
| Metric | What It Measures | Source |
|--------|-----------------|--------|
| Prompt Quality | File refs included? Context provided? Goal stated? | Session parser |
| Session Hygiene | Session length, task switching, abandoned sessions | Session parser |
| Code Review Score | Tests passing? Anti-patterns? Diff quality | Test runner + lint |
| Tool Mastery | Tool diversity, slash command usage, custom instructions | Session parser |
| Cost Burn | Tokens per session, model used, provider cost | Token counter |
| Runaway Loops | Sessions exceeding tool call threshold | Loop detector |

### Key Features
- **Workbench Dashboard** — Real-time metrics across all coding agents
- **Prompt Analyzer** — Paste a prompt, get a quality score + suggestions for improvement
- **Optimization Feed** — Automated suggestions: "You forgot file references in 3 of your last 5 prompts"
- **Session Explorer** — Browse past sessions, filter by agent, project, outcome
- **Skill Recommendations** — Based on patterns detected in your workflow
- **Agent Benchmark** — Run the same task across Codex, agy, Copilot, compare outputs

### Architecture
```
┌─────────────────────────────┐
│      Workbench UI            │
│  (React / VS Code Webview)  │
├─────────────────────────────┤
│      Parser Pipeline         │
│  ├── Codex Parser           │
│  ├── agy Parser             │
│  ├── Hermes Parser          │
│  └── Coach Importer         │
├─────────────────────────────┤
│      Analysis Engine         │
│  ├── Prompt Quality Scorer  │
│  ├── Session Hygiene Calc   │
│  ├── Cost Tracker           │
│  └── Loop Detector          │
├─────────────────────────────┤
│      Storage (SQLite / D1)  │
└─────────────────────────────┘
```

---

## VS Code Integration

### Extension Capabilities
1. **Architect Chat panel** — Webview in sidebar, chat interface for project setup
2. **Workbench tab** — Session metrics, prompt analyzer, optimization feed
3. **AGENTS.md preview** — Live preview of generated config files before writing
4. **Inline diagnostics** — Highlight weak prompts in chat/notebook interfaces
5. **Status bar** — Quick metrics: prompt quality trend, session count today, cost burn

### Config Files Generated
| File | Purpose | Applied To |
|------|---------|-----------|
| `AGENTS.md` | Project context for all AI agents | Repo root |
| `.instructions.md` | GitHub Copilot behavior | Repo root |
| `.vscode/settings.json` | Editor + lint + format settings | `.vscode/` |
| `.vscode/extensions.json` | Recommended extensions | `.vscode/` |
| `.markdownlint.json` | Markdown conventions | Repo root |
| `copilot-instructions.md` | GHCP custom instructions | `.github/` |
| `SKILL.md` (optional) | Hermes agent skill definition | Skills dir |

---

## Agent Orchestration Standards (Reference)

### Core Principles (from our production experience)
1. **Spec-first** — No multi-file change starts without a written spec
2. **Context bootstrap** — Every coding session gets a context packet with file refs
3. **Tool gate** — Tools classified by access level (0-4), enforced per agent role
4. **Loop guard** — 12+ tool calls triggers reframe, not retry
5. **Review gate** — Every diff gets a review pass before merge
6. **Cost guard** — Premium models for one-shot, cheap models for agents
7. **Fresh sessions** — 100K token soft cap, /new when context drags

### Multi-Agent Routing
| Pattern | When | Example |
|---------|------|---------|
| Sequential | Work must happen in order | Build → Test → Review |
| Concurrent | Read-only research | Two research agents in parallel |
| Handoff | Specialized expertise | Planner → Implementer → Reviewer |
| Critic Loop | Output needs review | Builder → Reviewer cycle |

---

## Acceptance Criteria
- [ ] Architect Chat generates valid AGENTS.md for any archetype
- [ ] Architect Chat generates .vscode/settings.json with lint/format/test config
- [ ] Architect Chat generates .instructions.md for Copilot
- [ ] Architect Chat supports round-trip updates (read existing → merge changes)
- [ ] Workbench parses Codex session logs and displays prompt quality
- [ ] Workbench detects runaway loops (>12 tool calls)
- [ ] Workbench tracks cost burn per session
- [ ] VS Code extension shows workbench panel
- [ ] VS Code extension has Architect Chat sidebar
- [ ] All generated configs pass their respective validators (json, markdownlint)

---

## Non-Goals
- No runtime plugin system (that's issue #10, separate)
- No cloud sync for workbench data initially (local SQLite only)
- No real-time session streaming (batch analysis)
- No multi-user workspaces

---

## Work Packages
| ID | Agent | Task | Files | Done When |
|----|-------|------|-------|-----------|
| WP1 | Spec | Write Architect Chat spec + archetype templates | Spec doc + 20 archetype stubs | Spec reviewed |
| WP2 | agy | Build Architect Chat UI (VS Code webview) | Extension src | Chat generates files |
| WP3 | agy | Build Workbench dashboard (VS Code webview) | Extension src | Dashboard renders metrics |
| WP4 | Codex | Build parser pipeline (Codex, agy, Hermes parsers) | Parser lib | All 3 parsers working |
| WP5 | Codex | Build analysis engine (scorer, detector, tracker) | Engine lib | Scores match manual audit |
| WP6 | TARS | Integration test: Architect Chat → generated files → validate | Test scripts | All ACs pass |

---

## Rollback Plan
- Each generated file gets a `.bak` timestamp before overwrite
- Workbench data stored in append-only log, can replay to any point
- VS Code extension versions tagged in CHANGELOG
