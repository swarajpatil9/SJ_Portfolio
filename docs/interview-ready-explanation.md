# Interview-Ready Explanation

## 1) 30-Second Project Pitch

I built a portfolio that behaves like a mini operating system instead of a static website. Users interact with dock apps, movable windows, file-system-like navigation, and routed blog articles. The key engineering focus was consistency: every window uses the same lifecycle model, shared controls, and centralized state handling.

## 2) Problem I Wanted to Solve

Most portfolio sites look polished but do not demonstrate product engineering depth. I wanted to prove I can design and ship a feature-rich frontend system with:

- Stateful interactions
- Architecture discipline
- Runtime safety
- Production-grade UX behavior

## 3) Architecture Decisions I’m Proud Of

### Config-driven window system

I modeled windows through IDs and config instead of ad hoc local component state. This made open/minimize/focus behavior deterministic and reusable.

### Shared WindowWrapper contract

Drag, resize, animation, z-index, and focus are all centralized. Every app window follows one contract, which cuts bugs and keeps UX consistent.

### Strict store access via hooks

Components consume narrow selectors and action bundles instead of broad global state reads. This reduces render churn and keeps responsibilities clear.

### Runtime-safe content flows

Finder and blog routing include guards and fallback states, so malformed data or bad URLs do not crash the app.

## 4) How the Main User Flows Work

### Desktop flow

- User clicks Dock icon
- Store toggles open/minimize state
- Wrapped window animates and gains focus

### Finder flow

- User navigates folders from data-driven location tree
- File handlers map file type to correct action/window
- Content payload is injected into viewer windows

### Blog flow

- Safari-style list renders from canonical catalog
- Slug route resolves article content safely
- Missing slug shows intentional fallback

## 5) Performance and Reliability

- Lazy loading for windows and route-level content
- Error boundaries around async-loaded surfaces
- Focused selectors to avoid broad re-renders
- Graceful loading and empty states for user trust

## 6) Quality Gates I Use

Before finalizing changes, I run:

- npm run lint
- npm run typecheck
- npm run build

This keeps architecture, typing assumptions, and production bundling healthy.

## 7) Tradeoffs and What I’d Improve Next

Tradeoffs:

- JSDoc typing provides strong safety but not full TypeScript guarantees.
- Some UI complexity in window interactions increases maintenance cost.

Next improvements:

- Full TypeScript migration
- Integration and interaction tests (window lifecycles, Finder handlers, route fallbacks)
- Accessibility hardening for keyboard and screen reader navigation

## 8) Strong Interview Talking Points

- Why centralized interaction systems are better than per-component behavior
- How config-driven design reduces regressions
- How fallback-first thinking improves production reliability
- How you balanced visual polish with maintainability and testability

## 9) If Asked: “What was the hardest part?”

The hardest part was maintaining behavior consistency while features expanded. The fix was to stop adding one-off logic and enforce shared contracts: WindowWrapper for all windows, centralized state actions, and explicit handler maps for file and route resolution.

## 10) If Asked: “Why should we hire you?”

This project shows I can do more than build screens. I can design frontend systems that are interactive, scalable, reliable, and maintainable, then ship them with production checks and consistency discipline.
