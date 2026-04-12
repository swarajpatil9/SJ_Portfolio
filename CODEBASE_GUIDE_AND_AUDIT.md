# Portfolio Site: Codebase Guide and Audit

Last updated: 2026-04-09

## 1) What this project is

This is a React + Vite portfolio app that mimics a macOS desktop experience.

Core UX idea:

- A desktop wallpaper background with draggable app icons.
- A dock that opens/minimizes windows.
- Multiple app-like windows (Finder, Safari-like blog list, Terminal-like tech stack, Contact, Resume PDF, file/image viewers).
- A dedicated route for full blog articles at /blog/:slug.

## 2) Tech stack

- React 19 + Vite 7
- Zustand + Immer for app state
- GSAP + Draggable for motion and drag behavior
- Tailwind CSS v4
- react-router-dom for routing
- react-pdf for resume rendering

## 3) High-level architecture

Entry and app shell:

- src/main.jsx mounts app.
- src/App.jsx defines routes.

UI components:

- src/components/Navbar.jsx: top system bar + nav shortcuts.
- src/components/Dock.jsx: dock icon interactions and window toggles.
- src/components/Home.jsx: desktop project icons and drag persistence.
- src/components/Welcome.jsx: animated title screen.
- src/components/WindowControls.jsx: traffic-light controls for each window.

Window system:

- src/hoc/WindowWrapper.jsx: shared behavior for all windows.
  - open/close/minimize/maximize animations
  - z-index focus management
  - drag and resize handling
- src/windows/\*.jsx: app-specific window contents.

State layer:

- src/store/window.jsx: central window states and actions.
- src/store/location.jsx: active Finder location state.

Data/constants:

- src/constants/index.js: dock definitions, location tree, and WINDOW_CONFIG.
- src/constants/blogData.js: article metadata keyed by slug.

Styling:

- src/index.css contains global Tailwind-driven styles and per-window IDs.

## 4) Runtime flow summary

1. User clicks dock icon in Dock.
2. Dock calls window store actions (open/minimize/unminimize).
3. WindowWrapper reads the relevant key from window store and animates/mounts window.
4. Finder items can open specialized windows:
   - txtfile for text-based project notes
   - imgfile for image previews
   - resume for PDF
   - external links for url/fig entries
5. Blog list is in Safari window and links to /blog/:slug route, rendered by BlogArticle.

## 5) Confirmed issues, errors, and risks

Severity legend:

- Critical: currently breaks quality gates or can break runtime behavior.
- High: strong correctness/portability risk.
- Medium: user-visible bug or maintainability/perf issue.
- Low: cleanup and robustness improvements.

### Critical

1. Lint failure: reading ref.current during render

- File: src/hoc/WindowWrapper.jsx
- Lines: 291, 292 (eslint output)
- Problem: customSize.current is read while rendering inline style.
- Why it matters: eslint react-hooks/refs rule fails; current lint command exits non-zero.
- Suggested fix:
  - Store width/height in React state (or derive once in effect) and read state in render.
  - Keep refs for imperative drag/resize operations only.

### High

2. Case-sensitive GSAP Draggable import

- Files:
  - src/components/Home.jsx (line 4)
  - src/hoc/WindowWrapper.jsx (line 6)
- Current import: gsap/Draggable
- Problem: TypeScript/JS tooling reports casing mismatch against draggable.d.ts.
- Why it matters: cross-platform build/type issues, especially on Linux CI.
- Suggested fix: import from gsap/draggable consistently.

3. Photos app is configured but not implemented/rendered

- Files:
  - src/constants/index.js (dockApps includes photos, WINDOW_CONFIG includes photos)
  - src/App.jsx (no Photos window mounted)
  - src/windows/index.js (no Photos export)
- Problem: clicking Gallery toggles photos state, but no corresponding window exists.
- User impact: dock indicates behavior that cannot display any window.
- Suggested fix:
  - Add src/windows/Photos.jsx + mount/export it, or
  - Remove photos entries from dock and window config until ready.

### Medium

4. Resume always renders page 1

- File: src/windows/Resume.jsx
- Line: 37
- Current code: pageNumber={Math.min(1, numPages || 1)}
- Problem: Math.min(1, N) always yields 1.
- Suggested fix: set explicit target page (1) or correct formula depending on intended behavior.

5. Deprecated TypeScript option warning

- File: jsconfig.json
- Line: 3
- Problem: baseUrl flagged deprecated for TS 7.
- Suggested fix: add compiler option ignoreDeprecations: "6.0" now, then migrate config as needed.

6. Production debug logs in window controls

- File: src/components/WindowControls.jsx
- Lines: 9, 16, 23
- Problem: console logs fire on every close/minimize/maximize click.
- Suggested fix: remove logs or guard by environment.

7. Invalid input type value typo

- File: src/windows/Safari.jsx
- Line: 50
- Problem: type="text " includes trailing whitespace.
- Impact: browser fallback to text still works, but this is malformed and noisy.
- Suggested fix: change to type="text".

8. Fragile store actions with no missing-key guard

- File: src/store/window.jsx
- Affected actions: closeWindow, minimizeWindow, unminimizeWindow, maximizeWindow, focusWindow
- Problem: unlike openWindow, these do not check if the window key exists before mutation.
- Impact: future calls with unknown keys would throw.
- Suggested fix: add early return if target window does not exist in each action.

### Low

9. Navbar icon alt text interpolation bug

- File: src/components/Navbar.jsx
- Line: 26
- Problem: alt={'icon-${id}'} is a literal string, not template interpolation.
- Suggested fix: alt={`icon-${id}`} or better descriptive alt text.

10. Stale backup source file in repo

- File: src/hoc/WindowWrapper.jsx.bak
- Problem: duplicate legacy implementation increases confusion during maintenance.
- Suggested fix: remove if not needed.

11. Bundle size warning in production build

- Source: vite build output
- Problem: generated JS chunk ~866 kB before gzip warning threshold.
- Suggested fix:
  - code-split non-critical windows/routes via dynamic import
  - use manualChunks in vite config if needed

## 6) Validation commands and outcomes

- npm run lint
  - Result: failed (2 errors in src/hoc/WindowWrapper.jsx at lines 291-292).

- npm run build
  - Result: successful.
  - Warning: chunk size exceeds recommended threshold.

## 7) File map for onboarding

- src/App.jsx
  - Router and top-level composition.

- src/store/window.jsx
  - Window lifecycle state machine.

- src/hoc/WindowWrapper.jsx
  - Most important file for behavior consistency across all windows.

- src/windows/Finder.jsx
  - Bridge between location data tree and window opening behavior.

- src/constants/index.js
  - Central data model: dock items, location hierarchy, window config.

- src/index.css
  - Visual identity and per-window layout behavior.

## 8) Recommended fix order

1. Fix WindowWrapper lint failure (critical quality gate).
2. Normalize GSAP draggable imports to lowercase.
3. Decide Photos behavior: implement or remove.
4. Fix Resume pageNumber logic.
5. Add guards in window store mutation actions.
6. Remove debug logs and Safari input typo.
7. Address bundle size with lazy loading/manual chunking.
8. Clean stale .bak file.

## 9) Notes for future contributors

- Any new window should have all three:
  - entry in WINDOW_CONFIG
  - wrapped component via WindowWrapper
  - mounted in App (or loaded via route/lazy mechanism)
- Keep window keys consistent across constants, store actions, and window ids.
- Prefer defensive guards in shared state actions.
